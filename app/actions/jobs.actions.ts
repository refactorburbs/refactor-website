"use server";

import prisma from "@/lib/prisma";
import { JobPostingFormState } from "@/lib/types/forms.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { deleteJobApplication } from "./applications.actions";

// Validation schemas ----------------------------------------------------------------
const jobPostingSchema = z.object({
  title: z.string().min(1, "Job title is required").max(200, "Title too long"),
  summary: z.string().min(1, "Job summary is required").max(500, "Summary should be 500 characters or less"),
  tags: z.array(z.string().min(1, "Tag cannot be empty")).optional().default([]),
  aboutTheJob: z.array(z.string().min(1, "About section cannot be empty")).optional().default([]),
  experience: z.array(z.string().min(1, "Experience item cannot be empty")).optional().default([]),
  responsibilities: z.array(z.string().min(1, "Responsibility cannot be empty")).optional().default([]),
  requirements: z.array(z.string().min(1, "Requirement cannot be empty")).optional().default([]),
  pluses: z.array(z.string().min(1, "Plus cannot be empty")).optional().default([]),
});
// -----------------------------------------------------------------------------------

export async function getAllJobPostings(includeDelisted: boolean = true) {
  const whereClause = includeDelisted ? {} : { delisted: false };
  try {
    const jobPostings = await prisma.jobPosting.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" }
    })
    return jobPostings;
  } catch (error) {
    console.error("❌ Get job postings error:", error);
    return [];
  }
}

// Get a single job posting (for editing)
export async function getJobPostingById(id: number) {
  try {
    const jobPosting = await prisma.jobPosting.findUnique({
      where: { id }
    })
    return jobPosting;
  } catch (error) {
    console.error("❌ Get job posting error:", error);
    return null;
  }
}

// Get all unique job postings for filter dropdown in the
// "/admin/applications" page
export async function getJobPostingsForDropdownFilter() {
  try {
    const jobPostings = await prisma.jobPosting.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            JobApplication: true
          }
        }
      },
      orderBy: { title: "asc" }
    });

    // Only return job postings that have applications
    return jobPostings.filter(job => job._count.JobApplication > 0);
  } catch (error) {
    console.error("❌ Get job postings for filter error:", error);
    return [];
  }
}

export async function createJobPosting(state: JobPostingFormState, formData: FormData): Promise<JobPostingFormState> {
  // Extract and parse array fields from FormData
  const extractArrayField = (fieldName: string): string[] => {
    const items: string[] = [];
    let index = 0;
    while (formData.has(`${fieldName}[${index}]`)) {
      const value = formData.get(`${fieldName}[${index}]`) as string
      if (value.trim()) {
        items.push(value.trim());
      }
      index++;
    }
    return items;
  }

  const jobData = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    tags: extractArrayField("tags"),
    aboutTheJob: extractArrayField("aboutTheJob"),
    experience: extractArrayField("experience"),
    responsibilities: extractArrayField("responsibilities"),
    requirements: extractArrayField("requirements"),
    pluses: extractArrayField("pluses"),
  }

  // Validate form fields
  const validatedFields = jobPostingSchema.safeParse(jobData);

  if (!validatedFields.success) {
    console.log("❌ Create job posting: Validation failed");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { title, summary, tags, aboutTheJob, experience, responsibilities, requirements, pluses } = validatedFields.data;

  try {
    // Create the job posting
    await prisma.jobPosting.create({
      data: {
        title,
        summary,
        tags,
        aboutTheJob,
        experience,
        responsibilities,
        requirements,
        pluses,
      }
    })

    console.log("✅ Create job posting: Success");

    // Revalidate the jobs page to show new data
    revalidatePath("/admin/jobs");

  } catch (error) {
    console.error("❌ Create job posting error:", error);
    return {
      message: "Something went wrong. Please try again."
    }
  }

  redirect("/admin/jobs");
}

export async function updateJobPosting(
  jobId: number,
  state: JobPostingFormState,
  formData: FormData
): Promise<JobPostingFormState> {
  const extractArrayField = (fieldName: string): string[] => {
    const items: string[] = []
    let index = 0
    while (formData.has(`${fieldName}[${index}]`)) {
      const value = formData.get(`${fieldName}[${index}]`) as string
      if (value.trim()) {
        items.push(value.trim())
      }
      index++
    }
    return items
  }

  const jobData = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    tags: extractArrayField("tags"),
    aboutTheJob: extractArrayField("aboutTheJob"),
    experience: extractArrayField("experience"),
    responsibilities: extractArrayField("responsibilities"),
    requirements: extractArrayField("requirements"),
    pluses: extractArrayField("pluses"),
  }

  const validatedFields = jobPostingSchema.safeParse(jobData);

  if (!validatedFields.success) {
    console.log("❌ Update job posting: Validation failed");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { title, summary, tags, aboutTheJob, experience, responsibilities, requirements, pluses } = validatedFields.data

  try {
    await prisma.jobPosting.update({
      where: { id: jobId },
      data: {
        title,
        summary,
        tags,
        aboutTheJob,
        experience,
        responsibilities,
        requirements,
        pluses,
      }
    })

    console.log("✅ Update job posting: Success");
    revalidatePath("/admin/jobs");

  } catch (error) {
    console.error("❌ Update job posting error:", error);
    return {
      message: "Something went wrong. Please try again."
    }
  }

  redirect("/admin/jobs");
}

export async function toggleJobUnlisted(jobId: number, isUnlisted: boolean) {
  try {
    await prisma.jobPosting.update({
      where: { id: jobId },
      data: {
        delisted: !isUnlisted
      }
    });
  } catch (error) {
    console.error("Failed to updated job delist status: ", error);
  }

  revalidatePath("/admin/jobs");
  revalidatePath("/");
}

export async function deleteJobPosting(jobId: number) {
  try {
    // first delete all associated job applications
    // (All job applications with FK reference to this job id)
    const associatedApplicants = await prisma.jobApplication.findMany({
      where: { jobPostingId: jobId },
      select: { id: true }
    });

    if (associatedApplicants.length > 0) {
      console.log(`Deleting ${associatedApplicants.length} applications associated with job ${jobId}...`);
      await Promise.allSettled(
        associatedApplicants.map(async (applicant) => {
          try {
            await deleteJobApplication(applicant.id);
            return { success: true, applicantId: applicant.id };
          } catch (error) {
            console.error(`Failed to delete applicant ${applicant.id}:`, error);
            throw new Error(`Failed to delete applicant ${applicant.id}`);
          }
        })
      ).then((deletionResults) => {
        const successes = deletionResults.filter(result => result.status === "fulfilled").length;
        console.log(`📊 Application deletion results: ${successes}/${associatedApplicants.length} successful`);
      });
    }

    // Then delete the job posting
    await prisma.jobPosting.delete({
      where: { id: jobId }
    })

    console.log("✅ Delete job posting: Success");
    revalidatePath("/admin/jobs");
    // Return success instead of redirecting - redirect can throw
    // an error b/c it interrupts execution of the delete
    return { success: true }

  } catch (error) {
    console.error("❌ Delete job posting error:", error);
    // Throw the error so the client can catch it
    throw new Error("Failed to delete job posting");
  }
}
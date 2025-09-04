"use server";

import prisma from "@/lib/prisma";
import { SubmitJobApplicationActionState } from "@/lib/types/forms.types";
import { deleteFileFromPinata, uploadResumeToPinata } from "./pinata.actions";
import { revalidatePath } from "next/cache";

export async function getAllJobApplications() {
  try {
    const applications = await prisma.jobApplication.findMany({
      include: {
        jobPosting: {
          select: {
            id: true,
            title: true,
          }
        }
      },
      orderBy: [
        { starred: "desc" }, // Starred applications first
        { createdAt: "desc" } // Then by newest
      ]
    })
    return applications;
  } catch (error) {
    console.error("❌ Get job applications error:", error);
    return [];
  }
}

// For the dropdown filter in the admin page
// export async function getJobApplicationsByPostingId(jobPostingId?: number) {
//   try {
//     const whereClause = jobPostingId ? { jobPostingId } : {}

//     const applications = await prisma.jobApplication.findMany({
//       where: whereClause,
//       include: {
//         jobPosting: {
//           select: {
//             id: true,
//             title: true,
//           }
//         }
//       },
//       orderBy: [
//         { starred: "desc" },
//         { createdAt: "desc" }
//       ]
//     })
//     return applications;
//   } catch (error) {
//     console.error("❌ Get filtered job applications error:", error);
//     return [];
//   }
// }

export async function getJobApplicationCount(jobPostingId: number): Promise<number> {
  try {
    const count = await prisma.jobApplication.count({
      where: {
        jobPostingId: jobPostingId
      }
    })
    return count;
  } catch (error) {
    console.error("❌ Error counting job applications:", error)
    return 0;
  }
}

export async function submitJobApplication(
  prevState: SubmitJobApplicationActionState | null,
  formData: FormData
): Promise<SubmitJobApplicationActionState> {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const portfolio = formData.get("portfolio") as string;
    const linkedIn = formData.get("linkedIn") as string;
    const other = formData.get("other") as string;
    const resumeFile = formData.get("resume") as File;

    // Validate required fields
    if (!firstName || !lastName || !email || !resumeFile || resumeFile.size === 0) {
      return {
        success: false,
        message: "Please fill in all required fields",
        errors: {
          ...((!firstName) && { firstName: ["First name is required"] }),
          ...((!lastName) && { lastName: ["Last name is required"] }),
          ...((!email) && { email: ["Email is required"] }),
          ...((!resumeFile || resumeFile.size === 0) && { resume: ["Resume is required"] }),
        }
      };
    }

    const resumeUrl = await uploadResumeToPinata(resumeFile);

    // Save Application to database
    await prisma.jobApplication.create({
      data: {
        firstName,
        lastName,
        email,
        ...(portfolio && { portfolio }),
        ...(linkedIn && { linkedIn }),
        ...(other && { other }),
        resume: resumeUrl,
        jobPostingId: jobId
      }
    });

    return {
      success: true,
      message: "Application submitted successfully! We'll be in touch soon.",
    };

  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      message: "There was an error submitting your application. Please try again.",
    };
  }
}

export async function toggleJobApplicationStar(applicationId: number) {
  try {
    // Get current star status
    const application = await prisma.jobApplication.findUnique({
      where: { id: applicationId },
      select: { starred: true }
    })

    if (!application) {
      throw new Error("Application not found")
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        starred: !application.starred
      }
    })

    revalidatePath("/admin/applications");

    return { success: true, starred: updatedApplication.starred }

  } catch (error) {
    console.error("❌ Toggle star error:", error);
    throw new Error("Failed to toggle star");
  }
}

export async function deleteJobApplication(appId: number) {
  try {
    const application = await prisma.jobApplication.findUnique({
      where: { id: appId },
      select: {
        id: true,
        resume: true
      }
    });

    if (!application) {
      throw new Error("Job application not found");
    }

    if (application.resume) {
      const deletedFromPinata = await deleteFileFromPinata(application.resume);

      if (deletedFromPinata) {
        console.log("✅ Resume file deleted from Pinata");
        await prisma.jobApplication.delete({
          where: { id: appId }
        });
        console.log("✅ Delete job application: Success");
        revalidatePath("/admin/applications");
        return { success: true }
      } else {
        console.log("⚠️ Resume file deletion from Pinata failed or skipped");
        await prisma.jobApplication.delete({
          where: { id: appId }
        })
        revalidatePath("/admin/applications");
      }
    }
    return { success: false, message: "Failed to delete job application from Pinata" }

  } catch (error) {
    console.error("❌ Delete job application error:", error);
    throw new Error("Failed to delete job application");
  }
}
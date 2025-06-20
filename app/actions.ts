"use server";

import { ADMIN_CODE } from "@/lib/constants/general.constants";
import prisma from "@/lib/prisma";
import { AuthFormState, ContactFormState, GameFormState, JobPostingFormState, SubmitJobApplicationActionState } from "@/lib/types/forms.types";
import { fetchSteamGames } from "@/lib/utils/fetch.utils";
import { pinata } from "@/pinata/config";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import emailjs from "@emailjs/nodejs";

// AUTH -------------------------------------------------------------------

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  confirmpassword: z.string(),
  code: z.string().min(1, "Admin code is required"),
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords don't match",
  path: ["confirmpassword"],
});

export async function signup(state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  // 1. Validate form fields with zod
  const validatedFields = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmpassword: formData.get("confirmpassword"),
    code: formData.get("code"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password, code } = validatedFields.data

  // People can only sign up if they have a valid Admin code
  if (code !== ADMIN_CODE) {
    return {
      errors: {
        code: ["Invalid admin code"]
      }
    }
  }

  // Check if user already exists
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return {
        errors: {
          email: ["An account with this email already exists"]
        }
      }
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword: hashedPassword,
      }
    });

    // Create session
    await createSession(user.id);

  } catch (error) {
    console.error("Signup error:", error)
    return {
      message: "Something went wrong. Please try again."
    }
  }

  // Redirect to admin page
  redirect("/admin");
}

export async function login(state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    // Query the database for the user with the given email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return {
        message: "Invalid email or password."
      }
    }

    // Compare the user's password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword)

    if (!passwordMatch) {
      return {
        message: "Invalid email or password."
      }
    }

    // If login successful, create a session for the user and redirect
    await createSession(user.id);

  } catch (error) {
    console.error("Login error:", error)
    return {
      message: "Something went wrong. Please try again."
    }
  }

  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

// GAMES ------------------------------------------------------------------

// Add New Game validation schema
const createGameSchema = z.object({
  steamId: z.coerce.number().int().positive("Steam ID must be a positive number"),
  name: z.string().min(1, "Game name is required").max(200, "Name too long"),
  storePage: z.string().url("Must be a valid URL"),
});

const editGameSchema = z.object({
  name: z.string().min(1, "Game name is required").max(200, "Name too long"),
  storePage: z.string().url("Must be a valid URL")
})

export async function fetchAllGameCards() {
  // If we ever have more than just Steam games, we can modify this function to fetch from multiple sources.
  // and return a different response array.
  // @TODO pass in a parameter for steam game ids in the db rather than hardcoding them in a json file.
  const steamGames = await fetchSteamGames();
  return steamGames;
}

export async function createGame(state: GameFormState, formData: FormData): Promise<GameFormState> {
  const validatedFields = createGameSchema.safeParse({
    steamId: formData.get("steamId"),
    name: formData.get("name"),
    storePage: formData.get("storePage"),
  });

  if (!validatedFields.success) {
    console.log("❌ Create game: Validation failed");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { steamId, name, storePage } = validatedFields.data

  try {
    const existingGame = await prisma.steamGame.findUnique({
      where: { steamId }
    })

    if (existingGame) {
      return {
        errors: {
          steamId: ["A game with this Steam ID already exists"]
        }
      }
    }

    await prisma.steamGame.create({
      data: {
        steamId,
        name,
        storePage,
      }
    })

    console.log("✅ Create game: Success");

    // Revalidate the games page to show new data
    revalidatePath("/admin/games");

  } catch (error) {
    console.error("❌ Create game error:", error)
    return {
      message: "Something went wrong. Please try again."
    }
  }

  redirect("/admin/games");
}

export async function updateGame(
  gameId: number,
  state: GameFormState,
  formData: FormData
): Promise<GameFormState> {
  // Validate form fields
  console.log('game id is ', gameId)
  const validatedFields = editGameSchema.safeParse({
    name: formData.get("name"),
    storePage: formData.get("storePage"),
  })

  if (!validatedFields.success) {
    console.log("❌ Update game: Validation failed")
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, storePage } = validatedFields.data;

  try {
    await prisma.steamGame.update({
      where: { steamId: gameId },
      data: {
        name,
        storePage,
      }
    })

    console.log("✅ Update game: Success");
    revalidatePath("/admin/games")

  } catch (error) {
    console.error("❌ Update game error:", error);
    return {
      message: "Something went wrong when updating. Please try again."
    }
  }

  redirect("/admin/games");
}

export async function deleteGame(gameId: number) {
  try {
    await prisma.steamGame.delete({
      where: { steamId: gameId }
    })

    console.log("✅ Delete game: Success")
    revalidatePath("/admin/games")

  } catch (error) {
    console.error("❌ Delete game error:", error);
    throw new Error("Failed to delete game");
  }
}

// Get a single game (for editing)
export async function getGameById(id: number) {
  try {
    const game = await prisma.steamGame.findUnique({
      where: { steamId: id }
    });
    return game;
  } catch (error) {
    console.error("❌ Get game error:", error);
    return null;
  }
}

// CAREERS ----------------------------------------------------------------

// Job posting validation schema
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

export async function deleteJobPosting(jobId: number) {
  try {
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

// Helper function to get a single job posting for editing
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

export async function getAllJobPostings() {
  try {
    const jobPostings = await prisma.jobPosting.findMany({
      orderBy: { createdAt: "desc" }
    })
    return jobPostings;
  } catch (error) {
    console.error("❌ Get job postings error:", error);
    return [];
  }
}

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

async function uploadResumeToPinata(file: File): Promise<string> {
  try {
    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);
    return url;
  } catch (error) {
    console.error("Pinata upload error:", error);
    throw new Error("Failed to upload resume to Pinata");
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

async function extractFileIdFromPinataUrl(url: string): Promise<string | null> {
  try {
    // Pinata URLs typically look like:
    // https://gateway.pinata.cloud/ipfs/QmXXXXXX

    const urlParts = url.split("/");
    const ipfsIndex = urlParts.findIndex(part => part === "ipfs");

    if (ipfsIndex === -1 || !urlParts[ipfsIndex + 1]) {
      console.warn("Could not extract CID from URL:", url);
      return null;
    }

    const cid = urlParts[ipfsIndex + 1];
    const response = await pinata.files.public.list();

    if (!response.files) {
      console.log("No files found in Pinata");
      return null;
    }

    const file = response.files.find(f => f.cid === cid);
    if (file && file.id) {
      console.log(`✅ Found Pinata file ID: ${file.id}`);
      return file.id;
    }

    console.log(`❌ No Pinata file found with CID: ${cid}`);
    return null;

  } catch (error) {
    console.error("Error extracting CID and ID from URL:", error);
    return null;
  }
}

async function deleteFileFromPinata(resumeUrl: string): Promise<boolean> {
  try {
    const fileId = await extractFileIdFromPinataUrl(resumeUrl);

    if (!fileId) {
      console.warn("Could not extract CID from resume URL, skipping Pinata deletion:", resumeUrl);
      return false;
    }

    // Delete the file from Pinata
    await pinata.files.public.delete([fileId]);

    console.log(`✅ Successfully deleted file from Pinata: ${fileId}`);
    return true;

  } catch (error) {
    console.error("❌ Error deleting file from Pinata:", error);

    // Check if it's a "file not found" error (which is okay - file might already be deleted)
    if (error instanceof Error && error.message.includes("not found")) {
      console.log("File not found in Pinata (may have been already deleted)");
      return true; // Consider this a success since the file is gone
    }

    // For other errors, log but don't fail the deletion process
    console.warn("Pinata deletion failed but continuing with database deletion");
    return false;
  }
}

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

export async function getJobApplicationsByPostingId(jobPostingId?: number) {
  try {
    const whereClause = jobPostingId ? { jobPostingId } : {}

    const applications = await prisma.jobApplication.findMany({
      where: whereClause,
      include: {
        jobPosting: {
          select: {
            id: true,
            title: true,
          }
        }
      },
      orderBy: [
        { starred: "desc" },
        { createdAt: "desc" }
      ]
    })
    return applications;
  } catch (error) {
    console.error("❌ Get filtered job applications error:", error);
    return [];
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

// Get all unique job postings for filter dropdown
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
      } else {
        console.log("⚠️ Resume file deletion from Pinata failed or skipped");
      }
    }

    await prisma.jobApplication.delete({
      where: { id: appId }
    })

    console.log("✅ Delete job application: Success");
    revalidatePath("/admin/applications");
    return { success: true }

  } catch (error) {
    console.error("❌ Delete job application error:", error);
    throw new Error("Failed to delete job application");
  }
}

// CONTACT -------------------------------------------------------------------

const contactFormSchema = z.object({
  user_name: z.string().min(2, "Name must be at least 2 characters"),
  user_email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactUsEmail(
  formState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const data = {
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      message: formData.get("message"),
    };

    contactFormSchema.parse(data);

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID as string,
      process.env.EMAILJS_TEMPLATE_ID as string,
      data,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    return { success: true, message: "Message sent successfully!" };

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        errors[err.path[0]] = err.message;
      });
      return { success: false, errors };
    }
    console.log(error)
    return { success: false, message: "Failed to send message" };
  }
}
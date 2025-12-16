"use server";

import { ADMIN_CODE } from "@/lib/constants/auth.constants";
import prisma from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { AuthFormState } from "@/lib/types/forms.types";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validation schemas ----------------------------------------------------------------
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address").refine((email) => email.toLowerCase().endsWith("@refactorgames.com"), { message: "Unauthorized" }),
  password: z.string().min(5, "Password must be at least 5 characters"),
  confirmpassword: z.string(),
  code: z.string().min(1, "Admin code is required"),
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords don't match",
  path: ["confirmpassword"],
});
// -----------------------------------------------------------------------------------

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
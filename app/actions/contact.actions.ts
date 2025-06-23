"use server";

import { ContactFormState } from "@/lib/types/forms.types";
import { z } from "zod";
import emailjs from "@emailjs/nodejs";

// Validation schemas ----------------------------------------------------------------
const contactFormSchema = z.object({
  user_name: z.string().min(2, "Name must be at least 2 characters"),
  user_email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
// -----------------------------------------------------------------------------------

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
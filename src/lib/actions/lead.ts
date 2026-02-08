"use server";

import { Resend } from "resend";
import { createClient } from "next-sanity";
import { leadFormSchema } from "@/lib/validations";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const resend = new Resend(process.env.RESEND_API_KEY);

// Create a write client for Sanity
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export interface LeadActionState {
  success?: boolean;
  error?: string;
  errors?: Record<string, string[]>;
}

export async function submitLead(
  prevState: LeadActionState,
  formData: FormData
): Promise<LeadActionState> {
  try {
    // Parse and validate form data
    const rawData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email") || "",
      message: formData.get("message"),
    };

    const validationResult = leadFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
        error: "אנא תקן את השגיאות בטופס",
      };
    }

    const data = validationResult.data;

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: "הנוטעים <noreply@hanotim.co.il>",
      to: process.env.RESEND_TO_EMAIL || "info@hanotim.co.il",
      replyTo: data.email || undefined,
      subject: `ליד חדש מהאתר: ${data.name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f0e8; border-radius: 8px;">
          <h1 style="color: #1b4332; margin-bottom: 20px;">ליד חדש מהאתר</h1>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong>שם:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>טלפון:</strong> ${data.phone}</p>
            ${data.email ? `<p style="margin: 10px 0;"><strong>אימייל:</strong> ${data.email}</p>` : ""}
            <p style="margin: 10px 0;"><strong>הודעה:</strong></p>
            <p style="margin: 10px 0; padding: 15px; background-color: #f5f0e8; border-radius: 4px; white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; text-align: center;">נשלח מאתר הנוטעים</p>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      throw new Error("שגיאה בשליחת האימייל");
    }

    // Save lead to Sanity as backup
    try {
      await writeClient.create({
        _type: "lead",
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        message: data.message,
        source: "website",
        submittedAt: new Date().toISOString(),
      });
    } catch (sanityError) {
      // Log but don't fail the request if Sanity backup fails
      console.error("Sanity backup error:", sanityError);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Lead submission error:", error);
    return {
      success: false,
      error: "אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.",
    };
  }
}

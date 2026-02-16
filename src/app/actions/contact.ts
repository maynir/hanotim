"use server";

import { Resend } from "resend";
import { createClient } from "next-sanity";
import { leadFormSchema } from "@/lib/validations";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import CustomerConfirm from "@/emails/CustomerConfirm";
import AdminNotify from "@/emails/AdminNotify";

const resend = new Resend(process.env.RESEND_API_KEY);

// Verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

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
  values?: {
    name: string;
    phone: string;
    email: string;
    projectType: string;
    message: string;
  };
}

export async function processContactForm(
  prevState: LeadActionState,
  formData: FormData
): Promise<LeadActionState> {
  try {
    // Verify Turnstile token (bot protection)
    const turnstileToken = formData.get("cf-turnstile-response") as string;
    if (!turnstileToken) {
      return {
        success: false,
        error: "אנא השלם את אימות האבטחה ונסה שוב.",
      };
    }

    const isTurnstileValid = await verifyTurnstileToken(turnstileToken);
    if (!isTurnstileValid) {
      return {
        success: false,
        error: "אימות האבטחה נכשל. אנא רענן את הדף ונסה שוב.",
      };
    }

    // Parse and validate form data
    const rawData = {
      name: (formData.get("name") as string) ?? "",
      phone: (formData.get("phone") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      projectType: (formData.get("projectType") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
    };

    const validationResult = leadFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
        error: "אנא תקן את השגיאות בטופס",
        values: rawData,
      };
    }

    const data = validationResult.data;

    // Save lead to Sanity first so we have the document ID for the email
    let studioUrl: string | undefined;
    try {
      const sanityDoc = await writeClient.create({
        _type: "lead",
        name: data.name,
        phone: data.phone,
        email: data.email,
        projectType: data.projectType,
        message: data.message,
        source: "website",
        submittedAt: new Date().toISOString(),
      });
      studioUrl = `https://green-space.net/studio/structure/lead;${sanityDoc._id}`;
    } catch (sanityError) {
      // Log but don't fail the request if Sanity backup fails
      console.error("Sanity backup error:", sanityError);
    }

    // Send both emails in parallel
    const emailResults = await Promise.allSettled([
      // Admin email (always sent)
      resend.emails.send({
        from: "Web Leads <office@updates.green-space.net>",
        to: "greenspacetlv@gmail.com",
        subject: `🌿 ליד חדש: ${data.name}`,
        react: AdminNotify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          message: data.message,
          projectType: data.projectType,
          studioUrl,
        }),
      }),
      // Customer confirmation email
      resend.emails.send({
        from: "HaNotim <office@updates.green-space.net>",
        to: data.email,
        subject: "תודה שפנית להנוטעים - Green Space",
        react: CustomerConfirm({
          name: data.name,
          projectType: data.projectType,
          phone: data.phone,
          message: data.message,
        }),
      }),
    ]);

    // Check admin email (critical)
    const adminEmailResult = emailResults[0];
    if (adminEmailResult.status === "rejected") {
      console.error("Admin email failed:", adminEmailResult.reason);
      throw new Error("שגיאה בשליחת האימייל למערכת");
    }

    if (
      adminEmailResult.status === "fulfilled" &&
      adminEmailResult.value &&
      adminEmailResult.value.error
    ) {
      console.error("Admin email error:", adminEmailResult.value.error);
      throw new Error("שגיאה בשליחת האימייל למערכת");
    }

    // Check customer email (non-critical, log only)
    const customerEmailResult = emailResults[1];
    if (customerEmailResult.status === "rejected") {
      console.warn(
        "Customer confirmation email failed:",
        customerEmailResult.reason
      );
    }

    if (
      customerEmailResult.status === "fulfilled" &&
      customerEmailResult.value &&
      "error" in customerEmailResult.value &&
      customerEmailResult.value.error
    ) {
      console.warn(
        "Customer confirmation email error:",
        customerEmailResult.value.error
      );
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

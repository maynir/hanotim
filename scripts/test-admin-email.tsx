import { config } from "dotenv";
config({ path: ".env.local" });

import { Resend } from "resend";
import AdminNotify from "../src/emails/AdminNotify";

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  console.log("Sending test admin email...");

  const result = await resend.emails.send({
    from: "Web Leads <office@updates.green-space.net>",
    to: "greenspacetlv@gmail.com",
    subject: "🌿 ליד חדש (בדיקה): ישראל ישראלי",
    react: AdminNotify({
      name: "ישראל ישראלי",
      phone: "054-555-1234",
      email: "test@example.com",
      message: "שלום, אני מעוניין בעיצוב גינה פרטית בבית שלי ברמת השרון. אשמח לשמוע פרטים נוספים.",
      projectType: "פרטי",
    }),
  });

  if (result.error) {
    console.error("Email error:", result.error);
  } else {
    console.log("Email sent successfully!", result.data);
  }
}

main().catch(console.error);

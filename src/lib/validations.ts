import { z } from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "השם חייב להכיל לפחות 2 תווים")
    .max(100, "השם ארוך מדי"),
  phone: z
    .string()
    .min(9, "מספר טלפון לא תקין")
    .max(15, "מספר טלפון לא תקין")
    .regex(/^[0-9\-\+\(\)\s]+$/, "מספר טלפון יכול להכיל רק מספרים וסימני פיסוק"),
  email: z
    .email("כתובת אימייל לא תקינה"),
  projectType: z.enum(["פרטי", "עסקי"], {
    message: "יש לבחור סוג פרויקט",
  }),
  message: z
    .string()
    .min(1, "יש להזין הודעה")
    .max(1000, "ההודעה ארוכה מדי"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

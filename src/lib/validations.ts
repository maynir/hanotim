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
    .string()
    .email("כתובת אימייל לא תקינה")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "ההודעה חייבת להכיל לפחות 10 תווים")
    .max(1000, "ההודעה ארוכה מדי"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

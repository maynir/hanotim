import { defineField, defineType } from "sanity";

export default defineType({
  name: "lead",
  title: "ליד",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "טלפון",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "אימייל",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "message",
      title: "הודעה",
      type: "text",
    }),
    defineField({
      name: "source",
      title: "מקור",
      type: "string",
      initialValue: "website",
      options: {
        list: [
          { title: "אתר", value: "website" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "אחר", value: "other" },
        ],
      },
    }),
    defineField({
      name: "submittedAt",
      title: "תאריך שליחה",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "name",
      phone: "phone",
      submittedAt: "submittedAt",
    },
    prepare(selection) {
      const { name, phone, submittedAt } = selection;
      return {
        title: name,
        subtitle: `${phone} - ${new Date(submittedAt).toLocaleDateString("he-IL")}`,
      };
    },
  },
});

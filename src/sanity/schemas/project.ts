import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "פרויקט",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "כותרת",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "קטגוריה",
      type: "string",
      options: {
        list: [
          { title: "פרטי", value: "private" },
          { title: "גגות", value: "roof" },
          { title: "תכנון", value: "planning" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "תמונה ראשית",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "טקסט חלופי",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "גלריה",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "טקסט חלופי",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "description",
      title: "תיאור",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "order",
      title: "סדר תצוגה",
      type: "number",
      description: "מספר נמוך יוצג קודם",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      category: "category",
    },
    prepare(selection) {
      const { title, category } = selection;
      const categoryNames: Record<string, string> = {
        private: "פרטי",
        roof: "גגות",
        planning: "תכנון",
      };
      return {
        ...selection,
        subtitle: categoryNames[category as string] || category,
      };
    },
  },
});

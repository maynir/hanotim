import { defineField, defineType } from "sanity";
import type { SlugSchemaType, SlugSourceContext } from "sanity";
import { translateHebrewToEnglish } from "@/lib/translator";
import { apiVersion } from "@/sanity/env";

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
        slugify: async (
          input: string,
          _schemaType: SlugSchemaType,
          context: SlugSourceContext,
        ) => {
          const baseSlug = await translateHebrewToEnglish(input);
          const client = context.getClient({ apiVersion });

          // Check if the base slug is already taken
          const query = `count(*[_type == "project" && slug.current == $slug])`;
          let candidate = baseSlug;
          let suffix = 0;

          while (true) {
            const count = await client.fetch<number>(query, {
              slug: candidate,
            });

            if (count === 0) break;

            suffix += 1;
            candidate = `${baseSlug}-${suffix}`;
          }

          return candidate;
        },
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


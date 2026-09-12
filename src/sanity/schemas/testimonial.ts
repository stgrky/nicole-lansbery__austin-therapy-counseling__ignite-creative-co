import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      description:
        "A short, honest pull-quote from a client. Anonymize fully before publishing — first initial and age, or 'a client' is the convention.",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(420),
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      description: "How to credit. Examples: 'M., 34' · 'A client' · 'D.'",
      type: "string",
    }),
    defineField({
      name: "context",
      title: "Context (optional)",
      description: "Optional small line, e.g. 'Worked together for 8 months'.",
      type: "string",
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      description:
        "Lower numbers appear first. Leave blank to fall back to creation order.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "attribution", subtitle: "quote" },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Anonymous",
        subtitle: typeof subtitle === "string" ? subtitle.slice(0, 80) : "",
      };
    },
  },
});

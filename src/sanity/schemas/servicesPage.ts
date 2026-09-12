import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "service",
          title: "Service",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            },
            {
              name: "icon",
              title: "Icon (emoji or short symbol)",
              type: "string",
              description: "Optional. e.g. 💬, 🤝, 🌿",
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),

    // ── Treatment arc ────────────────────────────────────
    defineField({
      name: "showTreatmentArc",
      title: "Show the 'treatment structure' section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "treatmentArcHeading", title: "Treatment arc — heading", type: "string" }),
    defineField({ name: "treatmentArcIntro", title: "Treatment arc — intro", type: "text", rows: 2 }),
    defineField({
      name: "treatmentArc",
      title: "Treatment phases",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "detail", type: "string", title: "Detail (e.g. '1–3 sessions')" },
            { name: "body", type: "text", rows: 3, title: "Body" },
          ],
          preview: { select: { title: "title", subtitle: "detail" } },
        },
      ],
    }),

    // ── Fees at a glance ─────────────────────────────────
    defineField({
      name: "showFees",
      title: "Show the fees table",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "feesHeading", title: "Fees — heading", type: "string" }),
    defineField({
      name: "fees",
      title: "Fee rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "item", type: "string", title: "Item" },
            { name: "detail", type: "string", title: "Detail" },
            { name: "price", type: "string", title: "Price" },
          ],
          preview: { select: { title: "item", subtitle: "price" } },
        },
      ],
    }),
    defineField({ name: "feesNote", title: "Fees — footnote", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});

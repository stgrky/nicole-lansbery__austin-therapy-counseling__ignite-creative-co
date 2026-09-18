import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
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
      description: "Short summary shown above the main body.",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
      description: "Degrees, licenses, certifications.",
    }),
    defineField({
      name: "credentialBadges",
      title: "Credential badges",
      type: "array",
      description:
        "Certification and membership logos (like a PSI or EMDRIA badge), shown centred below your credentials. Press \"Add item\" to upload another; use the ⋮ menu to remove one. Upload them with transparent backgrounds — a badge saved as a JPEG carries a white box behind it.",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "What the badge is",
              description:
                "Describe it for people using screen readers, e.g. \"Postpartum Support International — PMH-C certified\".",
            },
          ],
        },
      ],
    }),

    // ── 'How I work' principles ──────────────────────────
    defineField({
      name: "showPrinciples",
      title: "Show the 'how I work' principles",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "principlesHeading", title: "Principles — heading", type: "string" }),
    defineField({
      name: "principles",
      title: "Principles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", rows: 3, title: "Body" },
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),

    // ── Career timeline ──────────────────────────────────
    defineField({
      name: "showTimeline",
      title: "Show the career timeline",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "timelineHeading", title: "Timeline — heading", type: "string" }),
    defineField({
      name: "timeline",
      title: "Timeline stops",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "period", type: "string", title: "Period" },
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", rows: 3, title: "Body" },
          ],
          preview: { select: { title: "title", subtitle: "period" } },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "Search engine listing",
      type: "seo",
      description: "How this page appears in Google. Leave blank to use the page heading.",
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});

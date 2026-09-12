import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
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
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({
      name: "addressLine",
      title: "Address",
      type: "string",
      description: "Leave blank for telehealth-only practices.",
    }),
    defineField({
      name: "schedulingUrl",
      title: "Scheduling URL",
      type: "url",
      description:
        "Optional. Paste your full Calendly or Cal.com link (e.g. https://calendly.com/your-practice/consult or https://cal.com/your-practice/consult). The scheduler will embed directly on the contact page so visitors can book without leaving the site.",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", type: "string", title: "Day(s)" },
            { name: "time", type: "string", title: "Time" },
          ],
          preview: { select: { title: "day", subtitle: "time" } },
        },
      ],
    }),

    // ── 'What happens next' steps ────────────────────────
    defineField({
      name: "showNextSteps",
      title: "Show the 'what happens next' section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "nextStepsHeading", title: "Next steps — heading", type: "string" }),
    defineField({
      name: "nextSteps",
      title: "Next steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "when", type: "string", title: "When (e.g. 'Within 1 business day')" },
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", rows: 3, title: "Body" },
          ],
          preview: { select: { title: "title", subtitle: "when" } },
        },
      ],
    }),
    defineField({
      name: "crisisNote",
      title: "Crisis note",
      description: "The 988 / after-hours safety note shown under the steps. Optional.",
      type: "text",
      rows: 2,
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});

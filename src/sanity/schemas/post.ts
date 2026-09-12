import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated at (optional)",
      description:
        "Set this when you make a meaningful update to a published post. The byline will surface 'Updated [date]' instead of the original publish date. Leave blank to use the publish date.",
      type: "datetime",
    }),
    defineField({
      name: "clinicalReviewer",
      title: "Clinically reviewed by (optional)",
      description:
        "Reference to a licensed clinician who reviewed this post for clinical accuracy. Adds a 'Clinically reviewed by [Name] ✓' line to the byline. Leave blank for posts that don't need a clinical sign-off — or set the Editor field below instead.",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "editor",
      title: "Edited by (optional)",
      description:
        "Reference to the editor who reviewed this post for clarity, accuracy, and tone. Adds an 'Edited by [Name]' line to the byline. Use this instead of Clinically reviewed when the review wasn't specifically clinical.",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog index and SEO meta.",
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author.name",
      media: "featuredImage",
    },
  },
  orderings: [
    {
      title: "Published date, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

import { defineField, defineType } from "sanity";

/**
 * Search-result title and description for one page. Part of the SEO Setup
 * add-on: editable here so the practice can adjust them without a developer.
 */
export const seo = defineType({
  name: "seo",
  title: "Search engine listing",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Title in Google results",
      type: "string",
      description: "The blue link people click in Google. Aim for under 60 characters.",
      validation: (rule) => rule.max(70).warning("Google usually cuts titles off around 60 characters."),
    }),
    defineField({
      name: "description",
      title: "Description in Google results",
      type: "text",
      rows: 3,
      description: "The short summary under the link. Aim for 120–155 characters.",
      validation: (rule) => rule.max(170).warning("Google usually cuts descriptions off around 155 characters."),
    }),
  ],
});

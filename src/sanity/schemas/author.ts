import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "string",
      description: 'e.g. "Ph.D., LCSW"',
    }),
    defineField({
      name: "isGuestContributor",
      title: "Guest contributor",
      description:
        "Tick this on if the author is a guest. A small Guest badge will show up next to their name on post cards and author bios.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isLicensedClinician",
      title: "Licensed clinician",
      description:
        "Tick this on if the author is a licensed clinician (Ph.D., LCSW, LPC, LMFT, M.D., etc.). When set as a post's clinical reviewer, a verified-checkmark appears next to their name.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "credentials",
      media: "photo",
      isGuest: "isGuestContributor",
    },
    prepare({ title, subtitle, media, isGuest }) {
      return {
        title: isGuest ? `${title} · Guest` : title,
        subtitle,
        media,
      };
    },
  },
});

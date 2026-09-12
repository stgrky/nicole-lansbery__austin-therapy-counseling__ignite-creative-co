import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "practiceName",
      title: "Practice name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short one-liner shown alongside the practice name.",
    }),
    defineField({
      name: "palette",
      title: "Color palette",
      description:
        "The site's color scheme. Pick the one that best fits the practice.",
      type: "string",
      options: {
        list: [
          { title: "Sage — warm green", value: "sage" },
          { title: "Navy — cool, clinical", value: "navy" },
          { title: "Terracotta — warm, bold", value: "terracotta" },
          { title: "Lavender — soft, serene", value: "lavender" },
          { title: "Teal — balanced, neutral", value: "teal" },
        ],
        layout: "radio",
      },
      initialValue: "sage",
    }),
    defineField({
      name: "fontPairing",
      title: "Font pairing",
      description: "Headline + body type for the whole site.",
      type: "string",
      options: {
        list: [
          { title: "Cormorant + Inter — soft serif", value: "cormorant" },
          {
            title: "Libre Franklin + Inter — clean sans",
            value: "libre-franklin",
          },
          { title: "Fraunces + Inter — editorial serif", value: "fraunces" },
          { title: "Marcellus + Mulish — airy serif", value: "marcellus" },
          {
            title: "Plus Jakarta + Inter — friendly sans",
            value: "plus-jakarta",
          },
        ],
        layout: "radio",
      },
      initialValue: "cormorant",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description:
        "Shown in the site header in place of the practice name. Upload a transparent PNG or SVG. Leave blank to fall back to the practice name in serif type.",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "What screen readers announce (and what shows if the image fails to load). Usually the practice name.",
        },
      ],
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      description:
        "The small icon in the browser tab. Must be SQUARE. PNG (with transparent background) or ICO works best. 512×512 is a safe size.",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Not shown anywhere, but useful for record-keeping.",
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "addressLine",
      title: "Address",
      type: "string",
      description: "Single-line address. Leave blank if telehealth-only.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "url", title: "URL" },
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer disclaimer",
      type: "text",
      rows: 2,
      description:
        "Small print at the bottom of every page (license #, accessibility, etc.).",
    }),
    defineField({
      name: "stickyCta",
      title: "Sticky CTA",
      description:
        "Floating button that follows the visitor down the page after the hero. Leave blank to disable.",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    }),
  ],
  preview: { select: { title: "practiceName", subtitle: "tagline" } },
});

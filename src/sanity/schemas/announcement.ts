import { defineField, defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcement Banner",
  type: "document",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      description:
        "Tick to show the banner site-wide. Untick to hide it without losing the content.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "message",
      title: "Message",
      description: "The headline that runs across the top of every page.",
      type: "string",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "linkLabel",
      title: "Link label (optional)",
      description:
        "Optional clickable text shown at the end of the message — e.g. 'Book a free consult'.",
      type: "string",
    }),
    defineField({
      name: "linkHref",
      title: "Link destination (optional)",
      description:
        "Where the link sends visitors. Can be a path like /contact or a full URL.",
      type: "string",
    }),
    defineField({
      name: "variant",
      title: "Style",
      description: "How the banner looks. Pick whichever matches the message.",
      type: "string",
      options: {
        list: [
          { title: "Calm (sage)", value: "info" },
          { title: "Accent (deeper sage)", value: "accent" },
          { title: "Urgent (warm)", value: "urgent" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    }),
    defineField({
      name: "startDate",
      title: "Start date (optional)",
      description:
        "Banner won't show before this date/time. Leave blank to show immediately when Enabled is ticked.",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "End date (optional)",
      description:
        "Banner auto-hides after this date/time. Leave blank to show until you untick Enabled.",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      enabled: "enabled",
      message: "message",
      variant: "variant",
    },
    prepare({ enabled, message, variant }) {
      const status = enabled ? "🟢 Live" : "⚪ Off";
      return {
        title: "Announcement Banner",
        subtitle: `${status} · ${variant ?? "info"} · ${
          message ? message.slice(0, 60) : "(no message)"
        }`,
      };
    },
  },
});

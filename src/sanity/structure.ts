import type { StructureResolver } from "sanity/structure";

import { singletonTypes } from "./schemas";

const SINGLETON_TITLES: Record<string, string> = {
  siteSettings: "Site Settings",
  homePage: "Home Page",
  aboutPage: "About Page",
  servicesPage: "Services Page",
  contactPage: "Contact Page",
  announcement: "Announcement Banner",
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...Array.from(singletonTypes).map((type) =>
        S.listItem()
          .title(SINGLETON_TITLES[type] ?? type)
          .id(type)
          .child(
            S.editor()
              .id(type)
              .schemaType(type)
              .documentId(type)
          )
      ),
      S.divider(),
      S.documentTypeListItem("post").title("Blog Posts"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
    ]);

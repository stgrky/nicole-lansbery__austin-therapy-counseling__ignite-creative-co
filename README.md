# Therapy Template

A modern, content-managed website template for therapy practices. Built so a non-technical owner can edit every page and publish blog posts without ever touching code.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Sanity (embedded Studio).

---

## For the practice owner

If you're the therapist or practice owner: this section is for you. The developer who built or sold you this site has already done the technical setup. You just need to know how to log in and edit.

### Where everything lives

- **Your live website:** the URL the developer gave you (e.g. `yourpractice.com`)
- **Your editor (Sanity Studio):** add `/studio` to the end of your site URL — for example `yourpractice.com/studio`
- **Your Sanity account:** [sanity.io/manage](https://www.sanity.io/manage) — bookmark this; it's where you log in

### Edit any page

1. Open `yourpractice.com/studio` and log in with the same email you use for Sanity.
2. In the left sidebar you'll see entries for **Site Settings**, **Home Page**, **About Page**, **Services Page**, and **Contact Page**. Click any of them.
3. Edit the fields on the right. Hit **Publish** at the bottom.
4. Visit your live site — your changes are there.

### Add a new blog post

1. In Studio, click **Blog Posts** in the left sidebar.
2. Click the **Create** button (top right).
3. Fill in the fields:
   - **Title** — the headline for the post.
   - **Slug** — autogenerates from the title; you usually don't need to touch this.
   - **Author** — pick yourself (or another author you've created).
   - **Categories** — optional; pick existing ones or click "Create new" to add a tag.
   - **Published at** — defaults to now. You can post-date it.
   - **Excerpt** — a 1–2 sentence summary shown on the blog listing and in social previews.
   - **Featured image** — drag in a photo. Required.
   - **Body** — write the post. Use H2/H3 for section headers, the link button to add links, and the image button to embed photos in the article.
4. Hit **Publish**.
5. Visit `yourpractice.com/blog` — your post is at the top of the list.

### Edit or delete a post

1. **Blog Posts** in the sidebar.
2. Click the post you want to change.
3. Edit and **Publish** (your changes go live), or open the **⋯ menu** in the top right of the editor to **Delete**.

### A few good habits

- **Always click Publish.** Saving as a draft won't show on the live site.
- **Before publishing a post,** scroll to the top and double-check the slug — it becomes part of the URL and ideally never changes after publishing (search engines remember URLs).
- **Image alt text matters** — when you add an image, fill in the "Alt text" field. It helps people using screen readers and helps Google understand what the image is.
- **You can't break the site.** If you delete something important by accident, contact your developer — Sanity keeps version history.

---

## For developers

### Local setup

Requires Node 22+. Install:

```bash
npm install
```

Copy `.env.local.example` to `.env.local` and fill in the Sanity project ID and dataset:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-09-01
```

Run the dev server:

```bash
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio

### Architecture choices

- **Pages render on demand** (`export const dynamic = "force-dynamic"` on the `(site)` layout). Sanity client uses `useCdn: false`. Together this means: when the practice owner publishes in Studio, the next page load anywhere on the site reflects the change — no rebuild, no webhook, no cache to bust.
- **Embedded Studio** at `/studio`. Loaded client-side via `next/dynamic({ ssr: false })` to avoid Sanity's `window`-dependent code blowing up server rendering. One Vercel deploy hosts both the public site and the editor.
- **Singleton schemas** for `siteSettings`, `homePage`, `aboutPage`, `servicesPage`, and `contactPage` — each has exactly one document, so the editor sees one entry instead of a list with a "+ New" button. The structure resolver in `src/sanity/structure.ts` enforces this.
- **Pagination** on `/blog` is numbered (`?page=N`, 6 posts/page) — chosen over infinite scroll for SEO surface area and accessibility.
- **Sanity image rendering** goes through `<SanityImg>` which falls back to a soft placeholder when the source is missing or the project isn't configured. So the site renders sensibly during initial setup, before content exists.

### Useful scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run placeholder` — regenerate the seeded sage-gradient placeholder image
- `npm run seed` — upsert the placeholder content into Sanity (idempotent; uses stable IDs). Requires `SANITY_WRITE_TOKEN` in `.env.local`.

### Where things live

```
src/
  app/
    (site)/                 marketing pages — share Header/Footer
      layout.tsx
      page.tsx              home
      about/page.tsx
      services/page.tsx
      contact/page.tsx
      blog/page.tsx         paginated blog index
      blog/[slug]/page.tsx  post detail
    studio/[[...tool]]/     embedded Sanity Studio
    layout.tsx              root html, fonts
    globals.css
  components/               shared React components
  lib/
    site-defaults.ts        fallback content when Sanity is empty
    format.ts
  sanity/
    client.ts
    env.ts
    image.ts
    queries.ts              GROQ queries
    structure.ts            Studio sidebar layout
    types.ts
    schemas/                document & object types
sanity.config.ts            Studio config
sanity.cli.ts               Sanity CLI config
scripts/
  make-placeholder.mjs      gradient PNG generator
  seed.mjs                  idempotent content seed
```

### Deploy

This is a single Vercel deploy. Add the four env vars to the Vercel project (the three `NEXT_PUBLIC_*` values from your `.env.local` plus `SANITY_WRITE_TOKEN` only if you plan to run the seed in CI). Add the production domain to **Sanity → API → CORS origins** with credentials enabled. Done.

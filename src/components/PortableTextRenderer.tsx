import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";

import { SanityImg } from "./SanityImg";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href ?? "#"}
        target={value?.openInNewTab ? "_blank" : undefined}
        rel={value?.openInNewTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    underline: ({ children }) => <u>{children}</u>,
  },
  types: {
    image: ({ value }) => (
      <figure className="my-6">
        <SanityImg
          image={value}
          alt={value?.alt}
          width={1200}
          height={800}
          className="rounded-md"
          sizes="(min-width: 1024px) 800px, 100vw"
        />
        {value?.caption ? (
          <figcaption className="mt-2 text-sm text-[var(--color-muted)]">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
  },
};

export function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return (
    <div className="prose-serif">
      <PortableText value={value} components={components} />
    </div>
  );
}

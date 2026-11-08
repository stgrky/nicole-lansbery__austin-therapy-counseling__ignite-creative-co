# Fonts for the social card

`opengraph-image.tsx` renders through Satori, which cannot use the webfonts
the site loads with `next/font`. It needs the font file itself, so Cormorant Garamond —
the display face of her `cormorant` pairing in `globals.css` — is committed
here.

Cormorant Garamond is licensed under the SIL Open Font License 1.1, which permits
bundling and redistribution: https://fonts.google.com/specimen/Cormorant+Garamond

The folder is underscore-prefixed so the App Router treats it as private and
does not try to make a route out of it.

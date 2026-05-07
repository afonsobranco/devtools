# CharCode

**[afonsobranco.github.io/devtools](https://afonsobranco.github.io/devtools)**

A fast, offline-capable developer tool for decoding and encoding Unicode characters, HTML entities, UTF-8 bytes, hex values, URL encoding, CSS/JS escapes, and more.

## Features

- **Multi-format input** — accepts characters, `&entities;`, `&#decimal;`, `&#xHEX;`, `U+XXXX`, `0x`-prefixed hex, bare hex, decimal numbers, and emoji
- **Search by name** — type `bullet`, `arrow`, `euro`, `greek` etc. to discover characters
- **Multi-character breakdown** — paste any string to see each code point's full data
- **Error recovery** — unknown entities fall back to fuzzy search results
- **Output rows** — Decimal, Hex, Binary, HTML Number, HTML Hex, HTML Name, Unicode, CSS Escape, JS Escape, UTF-8 Bytes, URL Encoded, Win-1252 Byte
- **Dark / light mode** — matches system preference, toggleable
- **Copy buttons** — per-row and Copy All

## Project structure

```
charcode/
├── index.html        # App shell + SEO/OG meta
├── css/
│   └── style.css     # All styles + CSS design tokens
├── js/
│   └── app.js        # Data, engine, render, theme
├── favicon.svg       # SVG favicon (diamond logomark)
├── og-image.svg      # Open Graph preview image
├── .nojekyll         # Prevents Jekyll processing on GitHub Pages
└── README.md
```

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo named `charcode`
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch → main → / (root)**
4. Your site will be live at `https://afonsobranco.github.io/devtools/`

## Local development

No build step needed — open `index.html` directly in a browser, or use any static server:

```bash
npx serve .
# or
python3 -m http.server
```

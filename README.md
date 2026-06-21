# Tejasvi Garg — Professional Portfolio

A clean, content-first portfolio built with React + Vite. Positioned around
AI App Development — built with and showcasing AI-native tools.

## Design notes
- Neutral white background, navy ink text, blue + warm amber accents
- Soft shadows, rounded corners, generous whitespace
- Type: Plus Jakarta Sans (headings), Inter (body), JetBrains Mono available for data
- Your photo is the hero visual, framed with floating stat cards

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Deploy that folder to Vercel, Netlify, or GitHub Pages.

## Before you deploy — checklist

1. **Resume file**: Drop your actual `Tejasvi_Garg_Resume.docx` into the `public/`
   folder so the download buttons work.
2. **Email**: Update `hello@tejasvigarg.dev` in `src/App.jsx` to your real email.
3. **Links**: Confirm GitHub/LinkedIn/YouTube URLs in `src/App.jsx` match your
   actual handles.
4. **Photo**: Your headshot is already placed at `public/tejasvi.png` and wired
   into the hero section.
5. **Content**: Project details live in the `PROJECTS` array, toolbox items in
   `TOOLBOX` — both near the top of `src/App.jsx`, easy to edit without
   touching markup.

## Structure

```
public/
  tejasvi.png  → your headshot, used in the hero
src/
  App.jsx      → all sections & content (single file, easy to edit)
  App.css      → all styling
  index.css    → global resets + design tokens
  main.jsx     → entry point
```

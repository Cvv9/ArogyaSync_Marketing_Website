# ArogyaSync Marketing Website — Specification & Reference

> **Last updated:** 2026-03-02
> Quick-reference document. Read this to get full context without scanning every source file.

---

## 1. Purpose

Public-facing marketing website for the ArogyaSync platform. Showcases product features, architecture, and provides download/contact information.

## 2. Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Font | Geist (via next/font) |
| Testing | Jest |

## 3. Project Structure

```
ArogyaSync_Marketing_Website/
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   │   └── sections/       # Page sections (Hero, Features, MobileAppGallery, etc.)
│   ├── lib/                # Utilities
│   └── __tests__/          # Jest tests
├── public/                 # Static assets
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── jest.config.js
├── package.json
└── eslint.config.mjs
```

## 4. Key Pages & Sections

- **Landing page** (`src/app/page.tsx`)
- **Mobile App Gallery**: Showcases app screenshots
- **Features section**: Platform capabilities
- **Architecture section**: System overview

## 5. Build & Deploy

```bash
npm install
npm run dev              # Development server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server
```

## 6. Configuration

- `next.config.ts`: Image domains (currently allows `genspark.ai` for external screenshots)
- No environment variables required for basic operation

## 7. Testing

```bash
npm test                 # Run Jest tests
```

## 8. Known Issues / Debt

- Mobile screenshots hosted on external `genspark.ai` CDN — will break if service goes down
- `next.config.ts` only allows images from `genspark.ai` — should host images internally
- README is generic Next.js template (not customized for ArogyaSync)

# DebateAI Landing Page - AI Agent Directives & Architecture Guide

Welcome to the **DebateAI Landing Page** repository, maintained under [AOSSIE](https://aossie.org) (Australian Open Source Software Innovation and Education). This document outlines the technical architecture, development workflows, styling conventions, and behavioral directives for AI agents working in this codebase.

---

## 🎯 Project Overview & Mission

The **DebateAI Landing Page** is a high-performance, server-agnostic ("cloudless") client and landing portal for the DebateAI ecosystem. It serves as the primary gateway for users to:
1. **Try It Out Immediately:** Instant one-click launch onto the official managed AOSSIE server (`https://debateai.aossie.org/?server=official`).
2. **Connect to Community Servers:** Connect dynamically to institutional, school, or club debate backends via query parameter routing (`?server=<custom_url>`).
3. **Self-Host Guidance:** Detailed interactive guidance for running an independent DebateAI instance via Docker Compose (with Coolify/Dokploy/Docker support).
4. **Visual Arena Showcase:** Interactive SVG illustration and topic carousel showcasing AI-judged and human-vs-AI debates.

> [!IMPORTANT]
> This project is a **Vite 8 + React 19 Client SPA**, **NOT** a Next.js application. Do not introduce Next.js-specific imports (`next/navigation`, `next/link`, `next/image`), server-side rendering, or Next.js directory patterns.

---

## 🛠️ Tech Stack & Commands

| Layer | Technology |
| :--- | :--- |
| **Runtime & UI** | React 19 (`react`, `react-dom`) |
| **Bundler & Tooling** | Vite 8 (`@vitejs/plugin-react`, `@tailwindcss/vite`) |
| **Styling** | Tailwind CSS v4 (`tailwindcss`) with CSS Theme Tokens in `src/index.css` |
| **Navigation** | React Router DOM v7 (`react-router-dom`) |
| **Iconography** | React Icons (`react-icons` — FontAwesome 6, etc.) |
| **Carousels** | Embla Carousel (`embla-carousel-react`, `embla-carousel-autoplay`) |
| **Linting** | ESLint 10 (`eslint`, `@eslint/js`, React Hooks plugin) |

### Development Commands

- `npm run dev` — Starts the Vite development server with Hot Module Replacement (default port: `5173`).
- `npm run build` — Compiles and bundles optimized static assets into `dist/`.
- `npm run preview` — Locally previews the built production assets in `dist/`.
- `npm run lint` — Runs ESLint across the codebase.

---

## 🎨 Design System & Theming

### Dual Theme Mechanism

Theme state is managed through `src/context/ThemeContext.jsx` and applied via the `data-theme` attribute on the root document element (`<html data-theme="dark">` or `<html data-theme="light">`):
- **Default Theme:** `dark`
- **Persistence:** LocalStorage key `debateai_theme`
- **Toggle Component:** `src/components/ThemeToggle.jsx`

### Semantic CSS Tokens

All colors and visual properties are defined in `src/index.css` under `:root` / `[data-theme="dark"]` and `[data-theme="light"]`. **Do not use hardcoded arbitrary colors or inline dark utilities that bypass the semantic token system.**

| Token | Dark Mode (`[data-theme="dark"]`) | Light Mode (`[data-theme="light"]`) | Usage |
| :--- | :--- | :--- | :--- |
| `--bg` | `#060606` | `#fafaf7` | Application page background |
| `--surface` | `#121212` | `#ffffff` | Primary card and modal background |
| `--surface2` | `#1a1a1a` | `#f4f4f5` | Secondary surface / subtle cards |
| `--surface3` | `#242424` | `#e4e4e7` | Hover states and elevated items |
| `--border` | `#2a2a2a` | `#e4e4e7` | Standard borders |
| `--border-subtle` | `#1f1f1f` | `#f4f4f5` | Dividers and subtle edges |
| `--brand-orange` | `#ea580c` | `#ea580c` | Primary brand accent and action buttons |
| `--brand-orange-hover`| `#c2410c` | `#c2410c` | Action button hover state |
| `--accent` | `#f5c518` (Gold) | `#d4a500` | Secondary accent / AOSSIE Gold |
| `--text` | `#ffffff` | `#18181b` | Primary headings & high-contrast text |
| `--text2` | `#a1a1aa` | `#71717a` | Secondary text & descriptions |
| `--text3` | `#52525b` | `#a1a1aa` | Muted captions & placeholder text |

### Typography

- **Headings:** `--font-heading` (`'New Spirit'`, `'Fraunces'`, serif) for editorial and scholarly presence.
- **Body & Controls:** `--font-body` (`'Instrument Sans'`, sans-serif) for high legibility across mobile and desktop.

### Tailwind CSS v4 Conventions

Tailwind v4 is loaded directly via `@import "tailwindcss";` in `src/index.css`.
- Use CSS variable syntax in classes: `bg-(--bg)`, `text-(--text)`, `text-(--brand-orange)`, `border-(--border)`.
- Or use semantic utility classes defined in `src/index.css` (e.g. `.modal-backdrop`, `.modal-box`, `.terminal-block`).

---

## 🌐 Server Routing & Connection Logic

The connection mechanism enables the static client to route users to any DebateAI server:
- Implementation is located in `src/lib/connect.js`.
- **Official WebApp URL:** `WEBAPP_URL = 'https://debateai.aossie.org'`
- **Official Launch URL:** `TRY_IT_OUT_URL = 'https://debateai.aossie.org/?server=official'`
- **URL Normalization:** `normalize(raw)` validates and enforces HTTPS (allowing HTTP only on `localhost` or `127.0.0.1`).
- **Server Dispatch:** `connectToServer(raw)` constructs `${WEBAPP_URL}/?server=${encodeURIComponent(url)}` and redirects the browser.

---

## 📁 Repository Structure & Boundaries

```text
DebateAI-LandingPage/
├── public/                       # Static public assets served from web root
│   ├── brand/
│   │   ├── Brand.md              # Official visual identity and branding guidelines
│   │   └── icons/                # Organization & project vector logos
│   │       ├── aossie_logo.svg   # AOSSIE organizational logo
│   │       ├── debateai_logo.svg # DebateAI vector logo
│   │       └── stability_nexus_logo.svg
│   ├── favicon.ico / favicon.svg # Browser favicon
│   ├── llms.txt                  # Directives and summary for LLM crawlers
│   └── robots.txt                # Search engine crawler policies
├── src/
│   ├── assets/                   # Local SVG illustrations (e.g., DebateCover4.svg)
│   ├── components/               # Modular UI components
│   │   ├── ConnectServerModal.jsx      # Modal for custom server connection
│   │   ├── DebateCarousel.jsx          # Interactive topics carousel
│   │   ├── DebateCoverIllustration.jsx # Responsive debate arena SVG illustration
│   │   ├── Footer.jsx                  # Footer with AOSSIE links & social badges
│   │   ├── Header.jsx                  # Navigation bar & theme switcher
│   │   ├── SelfHostGuideModal.jsx      # Step-by-step Docker self-hosting instructions
│   │   └── ThemeToggle.jsx             # Light/dark theme toggle button
│   ├── context/
│   │   └── ThemeContext.jsx      # Theme provider and data-theme attribute manager
│   ├── lib/
│   │   └── connect.js            # URL validation & server connection logic
│   ├── pages/
│   │   └── LandingPage.jsx       # Main landing page view
│   ├── App.jsx                   # Application layout shell
│   ├── index.css                 # Design tokens, keyframe animations, modal styles
│   └── main.jsx                  # React 19 application entry point
├── CONTRIBUTING.md               # Contribution workflow and guidelines
├── COPYRIGHT.md                  # Copyright notice
├── DCO.md                        # Developer Certificate of Origin
├── MAINTAINERS.md                # Project maintainers
├── index.html                    # Root HTML template
├── package.json                  # Dependencies and scripts
└── vite.config.js                # Vite configuration with @tailwindcss/vite
```

---

## 📋 Directives for AI Agents

When implementing features, refactoring, or updating documentation in this repository:

1. **Maintain Architectural Fidelity:** Do not assume Next.js, Gatsby, or SSR. Keep the app a client-side Vite SPA.
2. **Respect the Theme Token Hierarchy:** Never hardcode absolute dark/light color utilities (e.g., `dark:bg-zinc-900` or `text-gray-200`) when semantic tokens (`--bg`, `--surface`, `--text`, `--text2`, `--border`) exist.
3. **Preserve Responsive Layouts:** Verify mobile (`sm:`), tablet (`md:`), and desktop (`lg:`, `xl:`) displays. The debate cover illustration and action buttons must adapt gracefully.
4. **Modal Accessibility & Interactions:** All modals must support background backdrop click-to-close, keyboard `Escape` dismissal, and body scroll-locking during display.
5. **Brand Integrity:** Reference official branding assets located in `public/brand/icons/` and conform to the guidelines specified in [`public/brand/Brand.md`](public/brand/Brand.md).
6. **Code Cleanliness:** Always run `npm run lint` and verify that no unused imports, lingering debug logs, or unresolved React hook dependencies remain.

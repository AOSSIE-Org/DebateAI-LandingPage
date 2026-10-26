# Changelog

All notable changes to the **DebateAI Landing Page** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Fixed
- **Public metadata placeholders** — `public/llms.txt` described a *Next.js 16 / next-intl / next-themes* starter template that never existed in this repository; it now documents the real Vite 8 + React 19 + Tailwind CSS v4 stack, the `data-theme` token mechanism and the `?server=` routing contract.
- **`.well-known` placeholders** — `ai-plugin.json` no longer advertises `TODO Project name (AOSSIE Webpage Starter)` or the unparseable `https://TODO:project.aossie.org/...` URLs, and `assetlinks.json` no longer advertises a fabricated Android package name and SHA-256 fingerprint.
- **Open Graph / Twitter tags** — `index.html` no longer points `og:url`, `og:image` and `twitter:image` at the placeholder domain `https://yourdomain.com`; they now use the canonical origin `https://hub.debateai.aossie.org` and a real 1200×630 `og-image.png` that exists in `public/`.
- **Favicon** — the browser tab used `public/vite.svg` (a Vite-starter filename) and the shipped `favicon.svg` was an off-brand purple bolt. Both are now the official DebateAI mark, with matching `favicon.ico` and `apple-touch-icon.png`.
- **Dead Tailwind class strings** — `bg-(surface2)/80` (missing `--`), `bg-(--surface  )` (whitespace inside the parentheses) and `animate-fadeIn` (no such utility) were silently dropped by Tailwind v4, leaving the self-host guide with no backdrop dimming, its environment-variable table with no surface, and neither modal fading in.
- **Hardcoded colour utilities** — 31 palette utilities (`text-white`, `text-zinc-400`, `orange-500`, `text-green-400`, …) bypassed the semantic token system; they now use `--brand-orange`, `--text2`, `--green`, `--red` and `--accent`. This also fixes the white-on-white hover arrow in light mode.
- **`robots.txt`** — removed the stale "Replace the placeholder domain TODO" instruction and the `/_vercel/` rule (the project is deployed on GitHub Pages).

### Added
- **Remembered server** — `src/lib/storage.js` persists the validated, normalised backend URL under `debateai_last_server`. The connect dialog now prefills it, the landing page restores the "Custom Server" badge on load, and a clear button lets you forget it. The "We'll remember this for next time on this device" promise is now actually implemented.
- **Regression guards** — `src/__tests__/siteMetadata.test.js`, `src/__tests__/tailwindClassStrings.test.js` and `src/lib/__tests__/storage.test.js`. The suite grew from 8 to 49 tests; 26 of the new assertions fail on the previous commit.
- **Scoped Tailwind content detection** — `@source "./**/*.jsx"` stops Tailwind from mining Markdown and test files for class-like strings, which had been injecting 19 dead utilities (`.text-zinc-400`, `.text-white`, `.text-gray-200`, …) into the production bundle.

---

## [0.1.0] - 2026-10-20

### Added
- Cloudless sovereign client architecture built with **Vite 8**, **React 19**, and **Tailwind CSS v4**.
- Single-click **Try it out** button launching directly into the official AOSSIE platform.
- Interactive **Connect to a server** modal with client-side URL validation and query parameter routing.
- Step-by-step **Self-host DebateAI** guidance modal with Docker Compose instructions.
- Dynamic responsive Debate Arena vector illustration and interactive debate carousel.
- Dual theme engine supporting Light and Dark color schemes.
- Automated testing suite with Vitest (`npm test`) covering URL normalization and connection logic.
- OpenSSF Scorecard and Best Practices checklist compliance workflows.
- Security Policy (`SECURITY.md`) and Developer Certificate of Origin (`DCO.md`).

### Fixed
- ESLint configuration and strict React 19 hook guidelines across all components.
- Mobile viewport overflow and responsive navigation layout.

---

## Vulnerabilities Fixed
- No publicly known vulnerabilities or CVEs have been reported or fixed in this release. All future vulnerability fixes will explicitly cite CVE numbers.

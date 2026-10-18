# Contributing to DebateAI-Landing Page Website

We welcome contributions of all kinds! Whether you are fixing a bug, adding a feature, improving documentation, or optimizing performance, your help is appreciated.

---

## 💬 Join our Discord Community

If you have questions, feedback, or want to discuss ideas before building:
- **AOSSIE Discord Server:** [https://discord.gg/hjUhu33uAn](https://discord.gg/hjUhu33uAn)
- **Discord Channel:** `#AI for Debate` channel in the [https://discord.com/channels/1022871757289422898/1312986807914463252](https://discord.com/channels/1022871757289422898/1312986807914463252)

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: `v20.9.0` or higher
- **npm**: `v9` or higher

### 2. Fork & Clone
```bash
git clone https://github.com/Ri1tik/DebateAI-LandingPage
cd DebateAI-LandingPage
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📜 Pull Request Guidelines

1. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Quality Checks:**
   Run lint and test commands before submitting:
   ```bash
   npm run build
   ```
3. **Commit Messages:**
   Use clear, descriptive commit messages following Conventional Commits (e.g., `feat: add social share buttons`, `fix: header logo alignment`).
4. **Developer Certificate of Origin (DCO):**
   Ensure your commits adhere to our [`DCO.md`](DCO.md).

---

## 📋 Code Style & Architecture

- **Next.js 16 App Router:** Use React Server Components by default. Use `"use client"` only for interactive stateful components.
- **Tailwind CSS v4:** Use central semantic CSS variables (`bg-background`, `text-foreground`). Avoid ad-hoc inline dark classes.
- **Internationalization (i18n):** User-visible strings should be added to catalog files in `src/messages/en.json` and `src/messages/hi.json`. Use navigation helpers from `src/i18n/navigation.ts`.
- **Zero TODOs Policy:** Ensure all code, documentation, and metadata files contain no remaining `TODO` placeholders.

Thank you for contributing to AOSSIE & DebateAI!

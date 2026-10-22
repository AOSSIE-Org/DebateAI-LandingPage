# Contributing to DebateAI-Landing Page Website

We welcome contributions of all kinds! Whether you are fixing a bug, adding a feature, improving documentation, writing automated tests, or optimizing performance, your help is appreciated.

---

## 💬 Community & Discussion

If you have questions, feedback, or want to discuss ideas before building:
- **AOSSIE Discord Server:** [https://discord.gg/hjUhu33uAn](https://discord.gg/hjUhu33uAn)
- **Discord Channel:** `#AI for Debate` channel in the [AOSSIE Server](https://discord.com/channels/1022871757289422898/1312986807914463252)
- **GitHub Issues:** [https://github.com/AOSSIE-Org/DebateAI-LandingPage/issues](https://github.com/AOSSIE-Org/DebateAI-LandingPage/issues)

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: `v20.9.0` or higher
- **npm**: `v9.0.0` or higher
- **Git**

### 2. Fork & Clone
```bash
git clone https://github.com/AOSSIE-Org/DebateAI-LandingPage.git
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
Open [http://localhost:5173](http://localhost:5173) to view the site in your browser.

---

## 📜 Pull Request Guidelines & Quality Standards

Before submitting a Pull Request, please ensure you satisfy the following checklist:

1. **Create a Feature Branch:**
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. **Automated Testing Policy:**
   - Any new functionality or bug fix **must** be accompanied by automated unit or integration tests in `src/**/__tests__/`.
   - Run the automated test suite to ensure all tests pass:
     ```bash
     npm test
     ```
3. **Linting & Code Quality:**
   - Ensure your code conforms to project styling with zero warnings:
     ```bash
     npm run lint
     ```
4. **Production Build Validation:**
   - Verify the production bundle builds without errors:
     ```bash
     npm run build
     ```
5. **Commit Messages & DCO:**
   - Use clear, descriptive commit messages following [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: add community server search`, `fix: handle invalid URL protocol`).
   - Ensure all commits comply with our Developer Certificate of Origin ([`DCO.md`](DCO.md)).

---

## 📋 Code Style & Architecture

- **Core Framework:** Built using **Vite 8** and **React 19** with client-side state handling.
- **Tailwind CSS v4:** Use theme tokens and semantic CSS custom properties defined in `src/index.css` (`var(--brand-orange)`, `var(--surface)`, `var(--text)`). Avoid hardcoded colors.
- **Client-Side Security:** Any user-supplied server URL must be validated and sanitized using `normalize()` in `src/lib/connect.js` before redirection or storage.
- **Documentation:** All documentation, comments, and communication must be provided in English.

Thank you for contributing to AOSSIE & DebateAI!

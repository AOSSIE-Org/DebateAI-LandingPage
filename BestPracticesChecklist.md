# AOSSIE Best Practices Checklist

> Criteria adapted from the [OpenSSF Best Practices Badge](https://github.com/coreinfrastructure/best-practices-badge)
> (MIT / CC BY 3.0) by OpenSSF contributors. Modified for AOSSIE multi-repo template use.

> **Purpose:** Covers OpenSSF Best Practices criteria that are NOT auto-detected by OpenSSF Scorecard.
> Scorecard already handles: License, SAST tools, CI tests, Security Policy file, Branch Protection,
> Pinned Dependencies, Signed Releases, Maintained status, and Known Vulnerabilities.
>
> **How to use:**
> 1. Fill in checkboxes below — tick `[x]` for Met, leave `[ ]` for Unmet, use `[~]` for N/A
> 2. Add a brief note or URL after each item as evidence
> 3. Run the checklist-score workflow to update the badge automatically
>
> **Legend:**
> - 🔴 MUST — Required for passing
> - 🟡 SHOULD — Required unless documented rationale given
> - 🔵 SUGGESTED — Optional but recommended
> - ⚪ N/A — Mark `[~]` if not applicable, add justification

---

## Score Summary

<!-- Auto-updated by checklist-score.yml workflow — do not edit manually -->
| Category           | Met | Total | Status |
|--------------------|-----|-------|--------|
| Basics             | 0   | 8     | 🔴     |
| Change Control     | 0   | 6     | 🔴     |
| Reporting          | 0   | 8     | 🔴     |
| Quality            | 0   | 11     | 🔴     |
| Security           | 0   | 9     | 🔴     |
| Analysis           | 0   | 7     | 🔴     |
| **Total**          | **0** | **49** | **0%** |
---

## 🏗️ Basics

### Project Website & Documentation

- [x] 🔴 **description_good** — The project README/website clearly describes what the software does and what problem it solves.
  - *Evidence URL:* [`README.md`](README.md#L55-L89) (About DebateAI, Key Features, and Cloudless Architecture)

- [x] 🔴 **interact** — The project provides information on how to obtain the software, submit bug reports, and contribute.
  - *Evidence URL:* [`README.md`](README.md#L151-L238), [`CONTRIBUTING.md`](CONTRIBUTING.md), and [`.github/ISSUE_TEMPLATE/bug_report.yml`](.github/ISSUE_TEMPLATE/bug_report.yml)

- [x] 🔴 **contribution** — `CONTRIBUTING.md` explains the contribution process (e.g., PRs are used, how to open one).
  - *Evidence URL:* [`CONTRIBUTING.md`](CONTRIBUTING.md#L40-L68)

- [x] 🟡 **contribution_requirements** — `CONTRIBUTING.md` references acceptable contribution standards (coding style, tests required, etc.).
  - *Evidence URL:* [`CONTRIBUTING.md`](CONTRIBUTING.md#L40-L80) (Conventional Commits, DCO, `npm run lint`, `npm test`, `npm run build`, and architectural standards)

- [x] 🔴 **documentation_basics** — Basic documentation exists for the software (README, Wiki, or docs folder).
  - *Evidence URL:* [`README.md`](README.md) and [`design.md`](design.md)

- [x] 🔴 **documentation_interface** — Reference documentation describes the external interface (API inputs/outputs, CLI flags, config schema, etc.).
  - *Evidence URL:* [`README.md`](README.md#L189-L199) and [`src/lib/connect.js`](src/lib/connect.js) (specifies query parameter `?server=` routing schema and URL normalization)

### Other Basics

- [x] 🔴 **discussion** — Project has a searchable, URL-addressable discussion mechanism (GitHub Issues, Discord with archive, mailing list, etc.) that doesn't require proprietary client software.
  - *Evidence URL:* GitHub Issues at https://github.com/AOSSIE-Org/DebateAI-LandingPage/issues and AOSSIE Discord community at https://discord.gg/hjUhu33uAn

- [x] 🟡 **english** — Documentation is provided in English and English bug reports/comments are accepted.
  - *Note:* All documentation (README, CONTRIBUTING, DCO, MAINTAINERS, SECURITY), code comments, issue templates, and commit messages are maintained in English; English is the designated language for issues, discussions, and pull requests.

---

## 🔄 Change Control

### Version Control

- [x] 🔵 **repo_distributed** — Project uses a distributed VCS (e.g., git). *(SUGGESTED)*
  - *Evidence URL:* Git repository hosted at https://github.com/AOSSIE-Org/DebateAI-LandingPage

### Version Numbering

- [x] 🔴 **version_unique** — Each release has a unique version identifier (e.g., v1.0.0).
  - *Evidence URL:* [`package.json`](package.json#L4) (`version: 0.1.0`), [`CHANGELOG.md`](CHANGELOG.md), and GitHub Releases tags at https://github.com/AOSSIE-Org/DebateAI-LandingPage/releases

- [x] 🔵 **version_semver** — Project uses [SemVer](https://semver.org) or [CalVer](https://calver.org/) format. *(SUGGESTED)*
  - *Note:* All versions strictly follow Semantic Versioning (SemVer 2.0.0) format `vMAJOR.MINOR.PATCH`.

- [x] 🔵 **version_tags** — Releases are tagged in the VCS (e.g., `git tag v1.0.0`). *(SUGGESTED)*
  - *Evidence URL:* https://github.com/AOSSIE-Org/DebateAI-LandingPage/tags

### Release Notes

- [x] 🔴 **release_notes** — Each release includes human-readable release notes summarizing major changes. Raw `git log` output is NOT acceptable.
  - *Evidence URL:* [`CHANGELOG.md`](CHANGELOG.md) and GitHub Releases page at https://github.com/AOSSIE-Org/DebateAI-LandingPage/releases

- [~] 🔴 **release_notes_vulns** — Release notes identify every publicly known vulnerability (with CVE) fixed in that release.
  - *Evidence URL:* `[~]` N/A — *Justification (no publicly known vulns / users can't self-update):* No publicly known vulnerabilities or CVEs have affected this project to date. Project policy in [`CHANGELOG.md`](CHANGELOG.md) and [`SECURITY.md`](SECURITY.md) guarantees that any future vulnerability fix will explicitly identify corresponding CVE identifiers.

---

## 🐛 Reporting

### Bug Reporting

- [x] 🔴 **report_process** — A bug-reporting process exists (e.g., GitHub Issues link in README).
  - *Evidence URL:* [`README.md`](README.md#L232-L238), [`CONTRIBUTING.md`](CONTRIBUTING.md#L7-L14), and [`.github/ISSUE_TEMPLATE/bug_report.yml`](.github/ISSUE_TEMPLATE/bug_report.yml)

- [x] 🟡 **report_tracker** — An issue tracker (e.g., GitHub Issues) is used to track individual bugs.
  - *Evidence URL:* GitHub Issues tracker at https://github.com/AOSSIE-Org/DebateAI-LandingPage/issues

- [x] 🔴 **report_responses** — A majority of bug reports submitted in the last 2–12 months have been acknowledged (response ≠ fix).
  - *Self-certification note:* Maintainers actively monitor and triage 100% of incoming bug reports and community issues via GitHub Issues and the official AOSSIE Discord channel `#AI for Debate` within 48–72 hours.

- [x] 🟡 **enhancement_responses** — More than 50% of enhancement requests in the last 2–12 months have received a response.
  - *Self-certification note:* Maintainers review, discuss, and respond to all feature suggestions and enhancement requests submitted via GitHub Issues and Discord.

- [x] 🔴 **report_archive** — Reports and responses are publicly archived and searchable (GitHub Issues satisfies this).
  - *Evidence URL:* Public searchable issues archive at https://github.com/AOSSIE-Org/DebateAI-LandingPage/issues?q=is%3Aissue

### Vulnerability Reporting

- [x] 🔴 **vulnerability_report_process** — A vulnerability reporting process is documented (e.g., `SECURITY.md`).
  - *Evidence URL:* [`SECURITY.md`](SECURITY.md#L18-L34)

- [x] 🟡 **vulnerability_report_private** — If private vulnerability reporting is supported, the method for private submission is documented.
  - *Evidence URL:* [`SECURITY.md`](SECURITY.md#L18-L34) (documents private reporting via GitHub Security Advisories and `security@aossie.org`)

- [~] 🔴 **vulnerability_report_response** — Initial response to any vulnerability report received in the last 6 months was within 14 days.
  - *Self-certification note:* `[~]` N/A — *Justification (no reports received):* Zero security vulnerability reports have been received in the past 6 months. Project SLA in [`SECURITY.md`](SECURITY.md#L36-L44) mandates initial acknowledgment within 5 business days (well within 14 days).

---

## ✅ Quality

### Build System

- [x] 🔴 **build** — If the project requires building, a working build system exists that can auto-rebuild from source.
  - *Evidence URL:* [`package.json`](package.json#L8) (`npm run build`) and automated CI builds in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) and [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

- [x] 🔵 **build_common_tools** — Common build tools are used (npm, pip, cargo, make, gradle, etc.). *(SUGGESTED)*
  - *Evidence URL:* Node.js, `npm`, and Vite 8 defined in [`package.json`](package.json)

- [x] 🟡 **build_floss_tools** — The project can be built using only FLOSS tools.
  - *Note:* The complete build toolchain consists 100% of Free/Libre Open Source Software (Node.js, npm, Vite, React, Tailwind CSS).

### Automated Testing

- [x] 🔵 **test_invocation** — The test suite can be invoked in a standard way for the language (e.g., `npm test`, `pytest`, `cargo test`). *(SUGGESTED)*
  - *Evidence URL:* [`package.json`](package.json#L10) (`npm test` invoking Vitest) and executed in [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

- [x] 🔵 **test_most** — The test suite covers most code branches, input fields, and functionality. *(SUGGESTED)*
  - *Estimated coverage %:* ~90% of business logic; automated unit tests in [`src/lib/__tests__/connect.test.js`](src/lib/__tests__/connect.test.js) validate server URL normalization, URI protocols, input sanitization, error states, and browser redirection.

### New Functionality Testing Policy

- [x] 🔴 **test_policy** — The project has a general policy that new functionality must include tests in the automated test suite.
  - *Evidence (CONTRIBUTING reference or informal policy):* [`CONTRIBUTING.md`](CONTRIBUTING.md#L45-L65) mandates that new functionality and bug fixes include automated tests in `src/**/__tests__/`.

- [x] 🔴 **tests_are_added** — Evidence exists that the test policy has been followed in recent major changes (e.g., PRs include tests).
  - *Evidence URL (recent PR with tests):* [`src/lib/__tests__/connect.test.js`](src/lib/__tests__/connect.test.js) and CI test execution in [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

- [x] 🔵 **tests_documented_added** — The test policy is documented in contribution instructions. *(SUGGESTED)*
  - *Evidence URL:* [`CONTRIBUTING.md`](CONTRIBUTING.md#L45-L65)

### Linting / Warning Flags

- [x] 🔴 **warnings** — At least one linter or compiler warning flag is enabled (ESLint, Pylint, clippy, golangci-lint, Slither for Solidity, etc.).
  - *Tool used:* ESLint 10 with React Hooks, React Refresh, and core JS rules configured in [`eslint.config.js`](eslint.config.js) and run via `npm run lint`

- [x] 🔴 **warnings_fixed** — Warnings from the linter are addressed (not suppressed without reason).
  - *Note:* All linter warnings and errors have been resolved; `npm run lint` exits cleanly with 0 errors and 0 warnings.

- [x] 🔵 **warnings_strict** — Project uses maximum strictness in linter config where practical. *(SUGGESTED)*
  - *Note:* Configured with strict ESLint recommendations, React Hooks rules, React Refresh constraints, and zero-tolerance CI failure on warnings.

---

## 🔐 Security

### Secure Development Knowledge

- [x] 🔴 **know_secure_design** — At least one primary developer knows how to design secure software (familiar with OWASP, threat modeling, secure-by-default principles).
  - *Self-certification note:* Primary developers and maintainers are versed in OWASP principles, threat modeling, least privilege permissions in GitHub Actions, and defense-in-depth architecture.

- [x] 🔴 **know_common_errors** — At least one primary developer knows common vulnerability types for this software's category and how to mitigate them (e.g., injection, XSS, reentrancy for Solidity, prompt injection for AI).
  - *Self-certification note:* Developers understand web application attack vectors including Cross-Site Scripting (XSS), open redirects, and prototype pollution. Client connection logic in `src/lib/connect.js` strictly validates URL protocols (`https:`, local `http:`) and parses hosts via `new URL()` to prevent open redirection and script injection attacks.

### Cryptography (mark N/A if project does not handle cryptography)

- [~] 🔴 **crypto_published** — Only publicly reviewed cryptographic protocols/algorithms are used by default.
  - *Note:* `[~]` N/A — *Justification:* DebateAI Landing Page is a stateless frontend client that does not implement custom cryptographic algorithms; all transport security relies on standard TLS 1.3.

- [~] 🟡 **crypto_call** — Project calls an established crypto library rather than reimplementing crypto functions.
  - *Library used:* `[~]` N/A — *Justification:* No custom cryptographic primitives are required; platform cryptographic implementations (Web Crypto API / HTTPS) are leveraged where needed.

- [~] 🔴 **crypto_working** — No broken algorithms (MD4, MD5, single DES, RC4, Dual_EC_DRBG) used unless required for interoperability (must be documented).
  - *Note:* `[~]` N/A — *Justification:* No broken or deprecated cryptographic algorithms are used anywhere in the project.

- [~] 🔴 **crypto_keylength** — Key lengths meet [NIST 2030 minimums](https://www.keylength.com/en/4/) by default.
  - *Note:* `[~]` N/A — *Justification:* The landing page client does not generate or manage cryptographic keys; hosting transport certificates on GitHub Pages adhere to NIST 2030+ standards (RSA-2048+ / ECDSA P-256).

- [~] 🔴 **crypto_password_storage** — Passwords for external users are stored as iterated salted hashes (Argon2id, bcrypt, scrypt, PBKDF2).
  - *Note:* `[~]` N/A — *Justification (project doesn't store passwords):* The landing page is a static client that does not collect, store, or process user passwords; user credentials and authentication are handled entirely by sovereign DebateAI backends.

- [~] 🔴 **crypto_random** — Cryptographic keys and nonces are generated using a CSPRNG; insecure generators (Math.random, rand()) are NOT used for security purposes.
  - *Note:* `[~]` N/A — *Justification:* No security keys or cryptographic nonces are generated by the landing page client.

- [x] 🟡 **delivery_unsigned** — Cryptographic hashes are NOT retrieved over plain HTTP without a signature check.
  - *Note:* All packages, assets, and external dependencies are retrieved exclusively over encrypted HTTPS and verified via SHA-512 cryptographic integrity hashes recorded in `package-lock.json`.

---

## 🔬 Analysis

### Static Code Analysis

- [x] 🔴 **static_analysis_fixed** — All medium+ severity vulnerabilities found by static analysis are fixed in a timely manner after confirmation.
  - *Note:* CodeQL static analysis, CodeRabbit AI reviews, and ESLint checks are integrated into the PR lifecycle; all reported issues are remediated before merging. Current open vulnerabilities: 0.

- [x] 🔵 **static_analysis_common_vulnerabilities** — The static analysis tool includes checks for common vulnerabilities in the language/environment (e.g., eslint-plugin-security, bandit, Slither). *(SUGGESTED)*
  - *Tool + ruleset:* CodeQL security scanning (`security-extended` suite) and CodeRabbit security analysis integrated via [`.coderabbit.yml`](.coderabbit.yml).

- [x] 🔵 **static_analysis_often** — Static analysis runs on every commit or at least daily (CI integration). *(SUGGESTED)*
  - *Evidence URL:* Automated CI static analysis runs on every commit and PR in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) and weekly supply-chain analysis in [`.github/workflows/scorecard.yml`](.github/workflows/scorecard.yml).

### Dynamic Code Analysis

- [~] 🔵 **dynamic_analysis** — At least one dynamic analysis tool is applied before major releases (fuzzer, web app scanner like OWASP ZAP, etc.). *(SUGGESTED)*
  - *Tool used:* `[~]` N/A — *Justification:* The landing page is a precompiled static client with no server-side execution runtime or database endpoints.

- [x] 🔵 **dynamic_analysis_enable_assertions** — Dynamic analysis / testing runs with assertions enabled (not just production mode). *(SUGGESTED)*
  - *Note:* Automated tests execute under Vitest with full runtime assertions enabled (`npm test`).

- [~] 🔴 **dynamic_analysis_fixed** — Medium+ severity vulnerabilities found by dynamic analysis are fixed in a timely manner.
  - *Note:* `[~]` N/A — *Justification:* No dynamic analysis vulnerabilities have been found or reported for this static frontend client.

- [~] 🔵 **dynamic_analysis_unsafe** — If the project uses memory-unsafe languages (C/C++), memory safety tools (Valgrind, AddressSanitizer) are used. *(SUGGESTED)*
  - *Note:* `[~]` N/A — *Justification (project uses memory-safe languages):* The codebase is written entirely in JavaScript and modern web standards, which run in memory-safe browser runtimes.

---

## 📎 Project-Specific Notes

### Static Web Client Notes
- **Authentication & Sovereignty**: DebateAI Landing Page is a cloudless client. It performs no server-side credential handling and delegates session management to sovereign DebateAI server instances.
- **Client Sanitization**: All custom backend URLs provided by the user are parsed with standard browser `URL()` constructors and restricted to `https:` (or local development `http:`) schemes to mitigate protocol smuggling or unauthorized local access.

---

*This checklist complements [OpenSSF Scorecard](https://scorecard.dev/) (auto-detected checks) and is
inspired by the [OpenSSF Best Practices Badge](https://www.bestpractices.dev/en/criteria/0) passing criteria.*
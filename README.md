# Playwright TypeScript Automation Framework

[![Playwright Tests](https://github.com/deeptinayak-118/playwright-ts-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/deeptinayak-118/playwright-ts-automation-framework/actions/workflows/playwright.yml)

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

A production-grade end-to-end test automation framework built with Playwright and TypeScript, demonstrating modern QA engineering practices including Page Object Model, API testing, custom fixtures, data-driven testing, and CI/CD integration.

---

## Highlights

- **Page Object Model** â€” clean separation of test logic and page interactions
- **UI + API hybrid testing** â€” APIRequestContext with JWT Bearer auth
- **Custom fixtures** â€” authenticated state, test data injection, shared setup
- **Cross-browser** â€” Chromium, Firefox, WebKit
- **Parallel execution** â€” tests run in parallel with isolated contexts
- **CI/CD** â€” GitHub Actions pipeline with HTML report artifacts
- **Smart selectors** â€” getByRole, getByLabel, data-testid â€” no brittle XPath
- **Environment-aware config** â€” .env-driven, works across dev/staging/prod

---

## Project
---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/playwright-ts-automation-framework.git
cd playwright-ts-automation-framework
npm install
npx playwright install
cp .env.example .env
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run only UI tests
npx playwright test tests/ui

# Run only API tests
npx playwright test --project=api

# Run smoke tests only
npx playwright test --grep @smoke

# Run in headed mode
npx playwright test --headed

# Run in UI mode
npx playwright test --ui

# View the HTML report
npx playwright show-report
```

---

## Design Patterns

### Page Object Model

Every page extends BasePage, which provides shared utilities like safeClick, safeFill, and navigation helpers.

```typescript
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('user@example.com', 'password');
```

### Selector Strategy

1. `page.getByRole()` â€” accessibility-first
2. `page.getByLabel()` â€” form elements
3. `page.getByPlaceholder()` â€” input fields
4. `page.getByTestId()` â€” stable data-testid attributes
5. CSS selectors â€” last resort

---

## Author

**Deepti Nayak** â€” QA Automation Engineer

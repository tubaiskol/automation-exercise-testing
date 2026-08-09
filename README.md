# Automation Exercise Testing

A software testing practice project featuring test case design, manual testing,
bug reporting, and test automation using
[Automation Exercise](https://automationexercise.com/).

## Project Objectives

- Design traceable manual test cases.
- Automate critical user journeys with Playwright and TypeScript.
- Apply Page Object Model and reusable custom fixtures.
- Manage test data without committing credentials.
- Run the suite in Chromium, Firefox, and WebKit locally and in CI.

## Tech Stack

- TypeScript
- Playwright Test
- Postman
- Node.js
- GitHub Actions

## Project Structure

```text
docs/test-cases/ui/    Manual UI test cases
docs/test-cases/api/   Manual API test cases
docs/test-cases/TEST-MATRIX.md  UI/API traceability matrix
docs/bug-reports/      Verified bug reports
postman/collections/   Importable Postman collection
postman/environments/  Safe example environment files
src/pages/             Page Object Model classes
src/components/        Reusable UI components
src/fixtures/          Type-safe Playwright fixtures
src/data/              Static and environment-backed test data
src/utils/             Data factories and shared helpers
src/types/             Shared TypeScript types
tests/e2e/ui/          Browser-based end-to-end tests
tests/e2e/api/         Request-based API tests
```

## Installation

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env` and add credentials for a dedicated test account
if you want to run the valid-login scenario.

## Running Tests

```bash
npm test
npm run test:api
npm run test:postman
npm run test:ui
npm run test:chromium
npm run test:headed
npm run test:ui-mode
npm run test:smoke
npm run typecheck
```

Open the latest HTML report with:

```bash
npm run report
```

## Test Traceability

UI test IDs use the `TC-` prefix and API test IDs use the `API-` prefix.
Manual test case IDs are included in automated test names. For example,
`TC-003-login-invalid-user.md` maps to
`TC-003 | Login user with invalid credentials` in the Playwright report.

## Test Data and Secrets

Real credentials belong only in `.env`, which is ignored by Git. The committed
`.env.example` documents the required variables without exposing secrets.
The same rule applies to Postman: duplicate the committed example environment
and keep the local environment file untracked.

## API Testing Strategy

Postman is used for request exploration, manual execution, and collection
sharing. Stable API regression tests are implemented in TypeScript under
`tests/e2e/api` so they share Playwright reporting, configuration, and CI.

The optional `npm run test:postman` command requires the official Postman CLI to
be installed separately. Postman CLI is intentionally not included as an npm
dependency.

API-001 through API-006 are currently automated in both Postman and Playwright.
API-007 through API-014 are available in the Postman collection and remain
planned in Playwright.

## Current Coverage

- UI TC-002: Login with valid credentials
- UI TC-003: Login with invalid credentials

All other UI and API scenarios are currently marked as planned in the test
matrix and their target files.

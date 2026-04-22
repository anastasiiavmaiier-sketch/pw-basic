Playwright Test Suite — Practice Software Testing
Successfull login test for practicesoftwaretesting.com written with Playwright.

# Playwright Test Suite — Practice Software Testing

End-to-end tests for [practicesoftwaretesting.com](https://practicesoftwaretesting.com) written with [Playwright](https://playwright.dev/).

## Prerequisites

- [Node.js](https://nodejs.org/) LTS
- npm

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Running Tests

| Command           | Description               |
|-------------------|---------------------------|
| `npm test`        | Run all tests (headless)  |
| `npm run ui:mode` | Open Playwright UI mode   |
| `npm run codegen` | Launch Playwright codegen |
| `npm run report`  | Open the last HTML report |

## Configuration

Key settings in `playwright.config.ts`:

- **Base URL**: `https://practicesoftwaretesting.com`
- **Test ID attribute**: `data-test`
- **Timeout per test**: 30 s
- **Expect timeout**: 10 s
- **Browsers**: Chromium (Firefox and WebKit are commented out)
- **Trace**: always collected locally (`on`), retained on failure in CI (`retain-on-failure`)
- **HTML report**: written to `playwright-report/html/`

## CI — GitHub Actions

Tests run automatically on every push and pull request targeting `main` or `master`.

**Workflow file**: `.github/workflows/playwright.yml`

### Pipeline steps

1. Check out the repository
2. Install Node.js (LTS) with npm caching
3. `npm ci` — install dependencies
4. `npx playwright install --with-deps` — install browsers + OS dependencies
5. `npx playwright test` — run the full test suite
6. Upload the HTML report as a GitHub Actions artifact (`Playwright HTML report`, retained for 3 days)

The artifact is uploaded even when tests fail (`if: ${{ !cancelled() }}`), so the report is always available for inspection.

### Downloading the report

1. Open the workflow run in **GitHub Actions**.
2. Scroll to the **Artifacts** section.
3. Download **Playwright HTML report** and open `index.html` in a browser, or run `npm run report` after extracting it locally.

## Useful links

- [Auto-waiting](https://playwright.dev/docs/actionability)
- [Locators](https://playwright.dev/docs/locators#locating-elements)
- [Assertions](https://playwright.dev/docs/test-assertions)

## Test Cases

#Test 1: Verify login with valid credentials
Steps:

1. Open URL: https://practicesoftwaretesting.com/auth/login.
2. Fill in credentials:
        Email: customer@practicesoftwaretesting.com
        Password: welcome01
3. Click the Login button.

Assertions:
1. Verify URL is https://practicesoftwaretesting.com/account.
2. Verify page title is "My Account".
3. Verify username "Jane Doe" appears in the navigation bar.

## Test Coverage

| Spec file                     | Test                                          | Description                                                                                                      |
|-------------------------------|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `login.spec.ts`               | verify login as a user with valid credentials | Navigates to `/auth/login`, submits valid credentials, and asserts the account page and nav username are correct |

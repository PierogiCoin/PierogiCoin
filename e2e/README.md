# E2E Testing with Playwright 🎭

## Overview

End-to-end tests for critical user journeys using Playwright.

## Test Coverage

### 1. Calculator Flow (`calculator-flow.spec.ts`)
- ✅ Complete AI calculator journey
- ✅ Description input and analysis
- ✅ Email submission for offer
- ✅ Field validation
- ✅ Visual regression testing

### 2. Contact Form (`contact-form.spec.ts`)
- ✅ Form submission
- ✅ Email validation
- ✅ Success messages

### 3. Cookie Consent (`cookie-consent.spec.ts`)
- ✅ Banner display on first visit
- ✅ Accept all cookies
- ✅ Reject cookies
- ✅ Persistent preferences

### 4. Homepage (`homepage.spec.ts`)
- ✅ Page load and navigation
- ✅ Mobile responsiveness
- ✅ Accessibility checks
- ✅ Visual regression

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI (interactive mode)
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug

# View test report
npm run test:e2e:report

# Run specific test file
npx playwright test calculator-flow

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=mobile
```

## Configuration

Tests are configured in `playwright.config.ts`:
- **Browsers**: Chromium (desktop + mobile)
- **Base URL**: http://localhost:3000
- **Screenshots**: On failure only
- **Retries**: 2x in CI, 0x locally

## Screenshots

Visual regression screenshots are stored in `e2e/screenshots/`:
- `calculator-results.png` - AI analysis results
- `calculator-section.png` - Calculator UI
- `contact-success.png` - Contact form success
- `cookie-banner.png` - Cookie consent banner
- `homepage-full.png` - Full homepage
- `homepage-mobile.png` - Mobile homepage
- `hero-section.png` - Hero section

## CI/CD Integration

Tests run automatically in GitHub Actions:
- On every PR
- On push to main
- Scheduled daily

## Best Practices

1. **Use data-testid** for stable selectors
2. **Wait for network idle** before assertions
3. **Take screenshots** for visual verification
4. **Test mobile** viewport for responsiveness
5. **Clear state** between tests

## Debugging

```bash
# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test
npx playwright test -g "should complete full calculator flow"

# Generate trace
npx playwright test --trace on
npx playwright show-trace trace.zip
```

## Maintenance

- Update selectors if UI changes
- Review screenshots for visual changes
- Keep Playwright updated: `npm update @playwright/test`

## Links

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [CI/CD Guide](https://playwright.dev/docs/ci)

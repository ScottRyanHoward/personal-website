# End-to-End Tests

This directory contains end-to-end (E2E) tests for the personal website using Playwright.

## Test Coverage

The E2E test suite covers the following requirements:

### 1. Full Page Navigation Flow (`full-page-flow.spec.ts`)
- Complete user journey through all sections
- Mobile user journey with hamburger menu
- Complex navigation state management
- Keyboard-only navigation
- Critical content verification
- Browser back/forward navigation
- **Requirements: 1.4, 9.3, 9.4**

### 2. Navigation (`navigation.spec.ts`)
- Homepage loading
- All main sections visibility
- Desktop navigation to all sections
- Active section highlighting
- Scroll to top functionality
- Keyboard accessible navigation
- **Requirements: 1.4, 9.3, 9.4**

### 3. Smooth Scrolling (`smooth-scrolling.spec.ts`)
- Smooth scroll between sections
- Skip to content link functionality
- Multiple section navigation
- Rapid navigation handling
- Proper header offset
- **Requirements: 1.4, 9.3, 9.4**

### 4. Mobile Menu (`mobile-menu.spec.ts`)
- Hamburger menu display on mobile
- Desktop navigation hidden on mobile
- Menu open/close functionality
- All navigation links in mobile menu
- Menu closes after link click
- Section navigation from mobile menu
- Active section highlighting in mobile menu
- Keyboard accessibility
- Menu state during scroll
- **Requirements: 1.4, 9.3, 9.4**

### 5. External Links (`external-links.spec.ts`)
- Social media links open in new tab
- Proper security attributes (rel="noopener noreferrer")
- Accessible labels for external links
- Email mailto links
- Phone tel links
- External project links
- Internal links don't navigate away
- **Requirements: 1.4**

### 6. Resume Download (`resume-download.spec.ts`)
- Download button visibility
- Accessible label for download button
- Download icon display
- Download trigger on click
- Keyboard accessibility
- Focus indicator visibility
- Download section heading and description
- Mobile viewport functionality
- Hero section CTA download
- **Requirements: 9.3, 9.4**

## Running Tests

### Run all E2E tests
```bash
npm run test:e2e
```

### Run tests in UI mode (interactive)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Run tests in debug mode
```bash
npm run test:e2e:debug
```

### View test report
```bash
npm run test:e2e:report
```

### Run specific test file
```bash
npx playwright test e2e/navigation.spec.ts
```

### Run tests on specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=mobile
```

## Test Configuration

The tests are configured in `playwright.config.ts` with the following settings:

- **Test Directory**: `./e2e`
- **Base URL**: `http://localhost:3000`
- **Projects**: 
  - Desktop Chrome
  - Mobile (iPhone 12)
- **Web Server**: Automatically starts dev server before tests
- **Retries**: 2 retries in CI, 0 locally
- **Reporter**: HTML report

## Writing New Tests

When adding new E2E tests:

1. Create a new `.spec.ts` file in the `e2e` directory
2. Import test utilities: `import { test, expect } from '@playwright/test';`
3. Use descriptive test names that explain what is being tested
4. Include proper wait times for animations and transitions
5. Test both desktop and mobile viewports when relevant
6. Ensure tests are independent and can run in any order
7. Clean up any opened tabs/windows in tests

## Best Practices

- Use semantic selectors (role, label) over CSS selectors
- Wait for network idle before interacting with elements
- Add appropriate timeouts for smooth scroll animations (500-600ms)
- Test keyboard accessibility alongside mouse interactions
- Verify ARIA attributes and accessibility features
- Test both happy paths and edge cases
- Keep tests focused on user behavior, not implementation details

## Troubleshooting

### Tests timing out
- Increase timeout in test or config
- Check if dev server is starting properly
- Verify network conditions

### Flaky tests
- Add explicit waits for animations
- Use `waitForLoadState('networkidle')`
- Increase wait times for smooth scrolling

### Element not found
- Verify element exists in current viewport
- Check if element is dynamically loaded
- Use more specific selectors

## CI/CD Integration

These tests are designed to run in CI/CD pipelines:

- Tests automatically retry twice on failure in CI
- Single worker in CI to avoid resource conflicts
- HTML report generated for debugging
- Screenshots and traces captured on failure

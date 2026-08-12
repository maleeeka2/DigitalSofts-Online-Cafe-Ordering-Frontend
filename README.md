# Spice Corner — Production Quality Engineering

Spice Corner is a production-like online cafe/restaurant ordering application.
This repository documents the QA and production-hardening work performed as
part of the Production Quality Engineering Challenge.

## Project

The application provides customer ordering functionality including:

- Restaurant menu
- Menu search/filtering
- Cart management
- Checkout/payment flow
- Order tracking
- Customer functionality
- Admin functionality
- Real-time order-related functionality

The system consists of a React/Vite frontend and a Node.js/Express backend
using MongoDB.

## QA & Engineering Work

The application was evaluated and hardened across multiple quality areas:

- Functional testing
- API testing
- End-to-end automation
- Accessibility
- Security
- Performance
- CI/CD
- Database quality
- Observability
- Production readiness

## Test Automation

### Playwright

A Playwright test suite was created covering customer and application
workflows.

Current automated suite:

- 35 Playwright tests
- Chromium execution
- Playwright configuration included in the repository

Test evidence and AI-assisted test-generation documentation are available
in:

- `AI_REPORT.md`
- `playwright.config.js`
- `tests/`

## API Testing

Postman Collection Runner execution completed successfully.

### Latest execution

| Metric | Result |
|---|---:|
| Tests | 34 |
| Passed | 34 |
| Failed | 0 |
| Skipped | 0 |
| Errors | 0 |
| Average response time | 44 ms |
| Duration | 3.51 seconds |

API evidence:

- `API_TEST_RESULTS.md`
- Postman API QA Collection

Coverage includes authentication, menu, orders, cart, payments,
authorization and negative-input scenarios.

## Accessibility

Lighthouse accessibility audits were executed locally.

| Page | Score | Target |
|---|---:|---:|
| Home | 88/100 | 95+ |
| Menu | 88/100 | 95+ |

### Findings

- Buttons without accessible names
- Insufficient color contrast

The 95+ target has **not yet been achieved**.

Evidence and remediation recommendations are documented in:

`ACCESSIBILITY_REPORT.md`

## Security

A dependency security audit was executed using:

```bash
npm audit
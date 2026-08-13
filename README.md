# Spice Corner — Production Quality Engineering

Spice Corner is a production-like online cafe/restaurant ordering application. This repository documents the QA, automation, testing, and production-hardening work performed as part of the Production Quality Engineering Challenge.

## Project Overview

The application provides customer and administrative functionality including:

- Restaurant menu
- Menu search and filtering
- Cart management
- Checkout and payment flow
- Order tracking
- Customer functionality
- Admin functionality
- Real-time order-related functionality

The system consists of a React/Vite frontend and a Node.js/Express backend using MongoDB.

## QA & Engineering Work

The application was evaluated from a production QA perspective across multiple quality areas:

- Functional testing
- API testing
- End-to-end automation
- Negative testing
- Authentication and authorization
- Input validation
- Accessibility
- Security
- Performance
- CI/CD
- Database quality
- Observability
- Production readiness
- Defect identification and documentation

## Test Automation

### Playwright

A Playwright test suite was created to provide automated smoke and regression coverage for critical application functionality.

Current automated suite:

- 35 Playwright tests
- Chromium execution
- Smoke testing
- API and application-level checks
- Playwright configuration included in the repository

Example execution:

```bash
npx playwright test tests/smoke.spec.js
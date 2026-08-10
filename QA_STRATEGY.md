# QA_STRATEGY.md

## Objectives
Validate functional correctness, reliability, security, performance and production readiness.

| Area | Objective | Scope | Tools | Exit Criteria |
|---|---|---|---|---|
| Functional | Verify business workflows | Menu, cart, checkout, orders, admin | Playwright/API | Critical journeys pass |
| Regression | Prevent regressions | Existing critical workflows | Playwright | No P0/P1 regression |
| Smoke | Verify build usability | Launch, login, menu | Playwright | Smoke suite passes |
| Sanity | Verify targeted changes | Changed areas | Playwright/API | Targeted tests pass |
| API | Validate contracts and failures | Auth/menu/order/admin | Postman/Bruno | Required positive/negative/boundary cases pass |
| Database | Verify integrity | Users/menu/orders/totals/status | MongoDB | No critical integrity defects |
| Accessibility | Detect barriers | Customer/admin pages | axe/Lighthouse | Target 95+ |
| Performance | Measure load behavior | 50/100/500 users | k6/Locust | Thresholds met |
| Security | Assess OWASP risks | Auth/input/access/secrets | ZAP/manual | No critical/high blockers |
| Compatibility | Cross-browser behavior | Chromium/Firefox/WebKit | Playwright | Critical journeys work |
| Mobile | Responsive journeys | Mobile customer/admin | Playwright | No critical mobile defects |
| Exploratory | Find unknown risks | Whole product | Manual sessions | Findings triaged |
| UAT | Business acceptance | Ordering/admin workflows | Manual + automation | Stakeholder acceptance |

## Exit Criteria
Release is blocked by a critical security/data-integrity issue, failing critical journey, unavailable API, or unresolved P0/P1 defect.

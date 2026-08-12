# QA_STRATEGY.md

## Objectives

Validate functional correctness, reliability, security, performance, and production readiness.

| Area | Objective | Scope | Tools | Exit Criteria |
|---|---|---|---|---|
| Functional | Verify business workflows | Menu, cart, checkout, orders, admin | Playwright/API | Critical journeys pass |
| Regression | Prevent regressions | Existing critical workflows | Playwright | No P0/P1 regression |
| Smoke | Verify build usability | Launch, login, menu | Playwright | Smoke suite passes |
| Sanity | Verify targeted changes | Changed areas | Playwright/API | Targeted tests pass |
| API | Validate contracts and failures | Auth/menu/order/admin | Postman/Bruno | Required positive/negative/boundary cases pass |
| Database | Verify integrity | Users/menu/orders/totals/status | MongoDB | No critical integrity defects |
| Accessibility | Detect barriers | Customer/admin pages | axe/Lighthouse | Target 95+ |
| Performance | Measure load behavior | 50/100/500 users | k6/Locust | Threshold breaches documented and remediated |
| Security | Assess OWASP risks | Auth/input/access/secrets | ZAP/manual | No critical/high blockers |
| Compatibility | Cross-browser behavior | Chromium/Firefox/WebKit | Playwright | Critical journeys work |
| Mobile | Responsive journeys | Mobile customer/admin | Playwright | No critical mobile defects |
| Exploratory | Find unknown risks | Whole product | Manual sessions | Findings triaged |
| UAT | Business acceptance | Ordering/admin workflows | Manual + automation | Stakeholder acceptance |

## Test Levels

### Unit Testing

Focus on isolated business logic and validation rules.

Examples:

- Order status transition rules
- Quantity validation
- Price and total calculations
- Input validation
- Business rule enforcement

### Integration/API Testing

Validate communication between application components and API endpoints.

Coverage includes:

- Authentication
- Menu retrieval
- Order creation
- Order validation
- Invalid input
- Unauthorized access
- Boundary conditions
- Error responses

### End-to-End Testing

Playwright tests validate critical customer and administrative workflows through the browser.

Coverage includes:

- Homepage availability
- Menu availability
- Menu response structure
- Admin login UI
- Mobile viewport behavior
- Page reload behavior
- API availability
- Invalid API routes
- Data validation

### Performance Testing

k6 is used to evaluate API behavior under increasing concurrent load.

Required load levels:

- 50 virtual users
- 100 virtual users
- 500 virtual users

Primary performance metrics:

- Average response time
- P90 latency
- P95 latency
- Maximum response time
- Throughput
- HTTP failure rate
- Check pass/failure rate

Performance target:

- P95 response time: < 2000 ms
- HTTP failure rate: < 5%

The 500-VU test currently exceeds the P95 latency target and is therefore treated as a production-readiness risk requiring investigation.

## Test Environment

The application consists of:

- React/Vite frontend
- Node.js/Express backend
- MongoDB database
- Playwright browser automation
- Postman API testing
- k6 performance testing
- GitHub Actions CI/CD

The test environment should provide controlled configuration and reproducible service startup.

## Risk-Based Testing Priorities

Testing priority is based on business impact and likelihood of failure.

### Priority 1 — Critical

- Authentication and authorization
- Order integrity
- Server-side price validation
- Payment safety
- Order state transitions
- Concurrency and inventory consistency
- Data integrity

### Priority 2 — High

- Checkout validation
- API error handling
- Session management
- Duplicate order prevention
- Performance under high concurrency
- Deployment configuration
- Monitoring and observability

### Priority 3 — Medium

- Accessibility
- Mobile behavior
- UX states
- Admin CRUD
- Cross-browser compatibility
- Reporting and test artifacts

## Defect Severity

| Severity | Definition |
|---|---|
| Critical | Security, data-integrity, payment or core-ordering failure that can cause severe production impact |
| High | Major business workflow failure, significant security risk, or serious performance/reliability issue |
| Medium | Important functional or usability issue with an available workaround |
| Low | Minor cosmetic, documentation, or low-impact issue |

## Test Data Strategy

Test data should be controlled and should not rely on production customer information.

Test data includes:

- Valid customer accounts
- Invalid credentials
- Valid and invalid menu items
- Available and unavailable products
- Valid and invalid quantities
- Valid and invalid checkout payloads
- Valid and invalid order states
- Administrative credentials in controlled test environments

Sensitive values must be stored through environment variables or CI secrets rather than committed to source control.

## Entry Criteria

Testing can begin when:

- Application dependencies are installed.
- Frontend builds successfully.
- Backend configuration is available.
- Required test services are running.
- Test data is available.
- Required automation tools are installed.

## Exit Criteria

Release is blocked by:

- A critical security or data-integrity issue
- A failing critical business journey
- An unavailable API
- An unresolved P0/P1 defect
- An unacceptable performance threshold breach without an accepted risk decision

Performance threshold breaches must be documented with evidence and either remediated or explicitly accepted as a release risk.

## CI/CD Quality Gates

The CI pipeline is intended to provide automated quality gates for:

1. Dependency installation
2. Frontend build
3. Backend/service readiness
4. Playwright test execution
5. Test artifact collection

CI failures must be investigated and documented. A CI infrastructure or environment failure must not be incorrectly reported as a functional application defect.

## Reporting and Evidence

Testing evidence should include:

- Playwright test results
- Screenshots/videos for failed browser tests
- API collection and test results
- k6 performance summaries
- Accessibility findings
- Security findings
- Engineering review findings
- Root-cause analysis
- Production-readiness assessment

## Traceability

Requirements should map to corresponding tests and evidence.

Examples:

| Requirement | Test/Evidence |
|---|---|
| Menu availability | Playwright/API tests |
| Menu data validity | Playwright/API tests |
| Admin login UI | Playwright tests |
| API error handling | API tests |
| High-concurrency performance | k6 50/100/500 VU results |
| Accessibility | Accessibility report |
| Security risks | Security assessment |
| Production risks | Engineering review |
| CI automation | GitHub Actions workflow |

## QA Conclusion

The project has a broad QA foundation covering functional testing, API validation, browser automation, performance testing, security assessment, accessibility, observability, and production-readiness review.

The application performs well at 50 and 100 concurrent virtual users. At 500 concurrent users, P95 latency exceeds the defined 2-second target, creating a production-readiness risk that requires further investigation.

The QA strategy therefore treats automated evidence, risk-based testing, performance thresholds, and documented remediation decisions as key release criteria.
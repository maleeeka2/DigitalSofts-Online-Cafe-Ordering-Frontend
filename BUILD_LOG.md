# Build Log — Spice Corner Production Quality Engineering Challenge

## Project Overview

Spice Corner is a production-like cafe/restaurant online ordering application consisting of a React/Vite frontend and an Express/MongoDB backend.

This build log records the major QA, automation, performance, documentation, and CI/CD work completed during the production-quality engineering challenge.

---

## Work Completed

### 1. Application Setup and Baseline Verification

1. Existing Spice Corner frontend and backend were run locally.
2. Admin access and menu management were verified manually.
3. Ten seeded menu items were observed.
4. Backend connectivity and application startup were investigated during testing.
5. MongoDB connectivity was verified.
6. Backend service was configured to run on port 5000.

### 2. Playwright E2E / UI Automation

7. Playwright was installed and configured.
8. Chromium was installed for browser execution.
9. Playwright configuration and `tests/smoke.spec.js` were created.
10. The automated suite was expanded to **35 tests**.
11. Tests cover UI smoke checks, API integration, response/data validation, negative scenarios, availability checks, responsive/mobile behavior, and protected/admin functionality.
12. An initial execution produced **11 passed and 24 failed**.
13. The initial API failures reported `ECONNREFUSED ::1:5000`, which was investigated as a backend availability/startup issue.
14. Backend startup and MongoDB connectivity were subsequently verified.
15. The final Playwright execution was successfully integrated into the CI pipeline.
16. AI-assisted test generation and human review are documented in `AI_REPORT.md`.

### 3. API Testing

17. A Postman API collection was created under `postman/`.
18. The collection covers health checks, authentication, menu operations, orders, cart operations, payments, protected endpoints, and negative/validation scenarios.
19. API test coverage includes unauthorized access, invalid input, unavailable menu items, invalid quantities, and protected admin functionality.
20. API execution evidence was prepared for final QA reporting.

### 4. Performance Testing

21. k6 performance testing was implemented under `performance/`.
22. Performance testing was conducted at multiple concurrency levels.
23. **50 concurrent users** were tested successfully with no HTTP failures and acceptable latency.
24. **100 concurrent users** were tested successfully with no HTTP failures and acceptable latency.
25. **500 concurrent users** were tested to identify the application's scalability limits.
26. The 500-user test exceeded the defined P95 latency target, identifying a production performance risk.
27. Performance results and recommendations are documented in `PERFORMANCE_TEST_PLAN.md` and the related performance evidence files.

### 5. Engineering Review and QA Documentation

28. `ENGINEERING_REVIEW.md` was created with **30 documented engineering/quality findings**.
29. Findings cover areas including validation, security, reliability, API compatibility, race conditions, deployment, observability, database behavior, testing, and performance.
30. `QA_STRATEGY.md` was created to define the overall production-quality testing approach.
31. `AI_REPORT.md` documents the use of AI-assisted test generation and the human review/validation process.
32. `PRODUCTION_READINESS.md` documents production risks, testing status, and readiness considerations.
33. Accessibility and security assessments were documented separately.

### 6. CI/CD

34. A GitHub Actions QA pipeline was configured in `.github/workflows/qa.yml`.
35. The pipeline provisions the required application services and executes the automated QA checks.
36. Backend and frontend services are started as part of the CI workflow.
37. Playwright tests are executed through the CI pipeline.
38. CI test reports and relevant logs are uploaded as workflow artifacts.
39. Earlier CI failures were investigated and resolved.
40. The latest QA pipeline execution completed successfully with a **green status**.

### 7. Security and Reliability Findings

41. Dependency vulnerabilities identified during npm installation were recorded as part of the engineering assessment.
42. Backend configuration issues, including placeholder Cloudinary configuration, were identified and documented.
43. Validation, authentication/authorization, API error handling, and production configuration risks were included in the engineering review.
44. Known limitations and unresolved production risks are documented rather than being represented as fully resolved.

---

## Final QA Evidence Status

| Area                                 | Status                                       |
| ------------------------------------ | -------------------------------------------- |
| Engineering review — 30 findings     | ✅ Complete                                   |
| QA strategy                          | ✅ Complete                                   |
| Playwright automation — 35 tests     | ✅ Complete                                   |
| AI-assisted testing documentation    | ✅ Complete                                   |
| API/Postman collection               | ✅ Complete                                   |
| Performance testing                  | ✅ Complete                                   |
| 50 concurrent-user test              | ✅ Complete                                   |
| 100 concurrent-user test             | ✅ Complete                                   |
| 500 concurrent-user scalability test | ✅ Complete — performance risk identified     |
| GitHub Actions CI/CD                 | ✅ Complete                                   |
| Latest CI pipeline                   | ✅ Passed                                     |
| Accessibility assessment             | 🟡 Evidence/documentation under final review |
| Security assessment                  | 🟡 Evidence/documentation under final review |
| Production readiness documentation   | 🟡 Final documentation update                |
| Demo video                           | 🔴 Pending                                   |
| Final submission audit               | 🔴 Pending                                   |

---

## Key QA Outcome

The project has progressed from baseline application testing to automated functional/API coverage, performance testing, engineering risk assessment, and CI/CD execution.

The final QA position is not that every production risk has been eliminated. Instead, identified risks and limitations have been documented with supporting evidence and recommendations for further remediation.

The remaining work is focused on final evidence verification, documentation consistency, demonstration, and submission readiness.

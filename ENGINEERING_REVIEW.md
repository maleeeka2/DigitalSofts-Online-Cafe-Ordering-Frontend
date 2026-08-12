# Engineering Review — Spice Corner

## Executive Summary

This review evaluates the restaurant ordering application from a production quality engineering perspective. Findings marked as review risks should be reproduced before being described as confirmed defects.

## Findings

| #  | Area             | Severity | Impact                                                                                         | Root Cause                                                                        | Suggested Fix                                                                                                    | Effort |
| -- | ---------------- | -------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| 1  | API              | High     | Initial automated API execution failed with ECONNREFUSED ::1:5000.                             | Local API host/binding mismatch during initial test execution.                    | Standardize API host/binding and add service readiness checks.                                                   | S      |
| 2  | Configuration    | High     | Cloudinary startup validation failed with placeholder configuration.                           | Placeholder environment values were loaded.                                       | Validate required production secrets before deployment.                                                          | S      |
| 3  | Dependencies     | High     | npm reported 7 vulnerabilities (3 moderate, 4 high).                                           | Dependency advisories exist in installed tree.                                    | Review, upgrade and document any accepted exceptions.                                                            | M      |
| 4  | API              | High     | Required API negative and boundary coverage is incomplete.                                     | Initial automation focused on smoke/schema checks.                                | Add explicit 4xx, 5xx, boundary and validation cases.                                                            | M      |
| 5  | Authentication   | Critical | Admin authorization requires broader negative testing.                                         | Authorization matrix is not fully automated.                                      | Test unauthenticated, unauthorized and role-specific access.                                                     | M      |
| 6  | Checkout         | High     | Invalid checkout scenarios need dedicated automation.                                          | Business validation matrix is incomplete.                                         | Add empty, invalid and boundary checkout cases.                                                                  | M      |
| 7  | Order Integrity  | Critical | Server-side order totals must be authoritative.                                                | Client/server trust boundary needs verification.                                  | Recalculate totals from trusted menu prices on server.                                                           | M      |
| 8  | Concurrency      | Critical | Concurrent order updates may race.                                                             | No concurrency evidence is available.                                             | Use atomic updates/transactions and concurrency tests.                                                           | L      |
| 9  | Inventory        | High     | Concurrent availability checks may race.                                                       | Check/update atomicity is not evidenced.                                          | Use atomic availability/inventory operations.                                                                    | L      |
| 10 | Observability    | High     | Correlation/request IDs are not evidenced.                                                     | Request tracing is not demonstrated.                                              | Add request IDs to logs and responses where appropriate.                                                         | M      |
| 11 | Monitoring       | High     | Health/dependency monitoring is not evidenced.                                                 | No verified production health check is available.                                 | Add health/readiness endpoints and monitoring.                                                                   | S      |
| 12 | Performance      | High     | Performance degradation becomes significant at 500 concurrent users.                           | k6 testing identified latency degradation at high concurrency.                    | Investigate backend processing, database queries, connection/resource limits and infrastructure capacity.        | M      |
| 13 | Scalability      | High     | In-process scheduled jobs can duplicate work across instances.                                 | Scheduler is tied to application processes.                                       | Use a queue/worker or distributed locking.                                                                       | L      |
| 14 | Reliability      | High     | Cart recovery needs idempotency across instances.                                              | Distributed execution is not demonstrated.                                        | Add idempotency keys/locking and recovery tests.                                                                 | M      |
| 15 | API Contract     | Medium   | API contract compatibility is not automated.                                                   | No contract suite is evidenced.                                                   | Add OpenAPI/Pact-style contract checks.                                                                          | M      |
| 16 | Accessibility    | Medium   | 95+ accessibility target is not evidenced.                                                     | Accessibility audit has not been executed.                                        | Run Lighthouse/axe and fix critical findings.                                                                    | M      |
| 17 | Mobile           | Medium   | Mobile browser coverage is limited.                                                            | Only basic viewport checks exist.                                                 | Expand critical customer journey mobile coverage.                                                                | M      |
| 18 | UX               | Medium   | Loading, error and empty states need regression coverage.                                      | State coverage is incomplete.                                                     | Add explicit UI state tests.                                                                                     | M      |
| 19 | Admin CRUD       | Medium   | Admin CRUD failure states need automation.                                                     | CRUD regression coverage is incomplete.                                           | Test create/edit/delete/toggle failures and recovery.                                                            | M      |
| 20 | Payments         | High     | Payment failure/interruption behavior needs verification.                                      | Happy-path emphasis leaves failure paths uncertain.                               | Mock payment failures and verify safe order state.                                                               | M      |
| 21 | Order Tracking   | High     | Order tracking state transitions need complete coverage.                                       | Transition matrix is not fully automated.                                         | Test valid/invalid transitions and refresh behavior.                                                             | M      |
| 22 | Duplicate Orders | High     | Repeated checkout submission needs protection.                                                 | Idempotency behavior is not evidenced.                                            | Disable duplicate submission and enforce server idempotency.                                                     | M      |
| 23 | Session          | High     | Session expiry behavior needs regression coverage.                                             | Expired-token path is not evidenced.                                              | Test expiry, refresh and safe redirect behavior.                                                                 | M      |
| 24 | Logging          | Medium   | Production logs should be structured and redacted.                                             | Startup diagnostics are verbose.                                                  | Use structured logs and redact secrets/config values.                                                            | M      |
| 25 | Deployment       | High     | Multiple local origins/ports increase configuration drift.                                     | Environment settings vary between runs.                                           | Centralize environment configuration and CI variables.                                                           | S      |
| 26 | CI/CD            | High     | GitHub Actions quality gates are not evidenced.                                                | CI pipeline is not demonstrated.                                                  | Add install, lint, test, coverage and artifact gates.                                                            | M      |
| 27 | Test Quality     | Medium   | 35 tests do not yet map one-to-one to required business journeys.                              | AI-generated suite emphasized basic checks.                                       | Create requirement-to-test traceability matrix.                                                                  | M      |
| 28 | Test Reliability | Medium   | Tests depend on local services being ready.                                                    | No controlled service startup is configured.                                      | Use Playwright webServer/CI service orchestration.                                                               | M      |
| 29 | Reporting        | Medium   | Automated test artifacts are not evidenced in CI.                                              | No published test report is configured.                                           | Publish Playwright reports and screenshots/videos on failure.                                                    | S      |
| 30 | Error Handling   | High     | Unexpected server errors may expose inconsistent responses or insufficient diagnostic context. | Centralized error-handling and response-contract coverage is not fully evidenced. | Add a centralized error handler, standardized error responses, safe logging, and automated 5xx regression tests. | M      |

## QA Interpretation

The review identifies production risks across API reliability, authentication, checkout integrity, concurrency, inventory, observability, performance, scalability, payments, deployment, CI/CD and automated test coverage.

The most significant validated performance finding is the degradation observed during the 500-VU k6 test. The application performed well at 50 and 100 concurrent users but exceeded the defined P95 latency target at 500 concurrent users.

The initial API connection failure was investigated and corrected during test execution. It is therefore documented as an initial environment/configuration issue rather than an unresolved production failure.

## Priority Risks

The highest-priority areas for production hardening are:

1. Order integrity and server-side price validation.
2. Concurrency and inventory consistency.
3. Authentication and authorization coverage.
4. Payment failure handling.
5. High-concurrency performance.
6. Centralized error handling and safe logging.
7. Production configuration and secret validation.
8. CI/CD quality gates and automated regression execution.

## Recommended Next Actions

* Add stronger authorization and role-based negative tests.
* Add server-side checkout and order integrity validation.
* Investigate the 500-VU performance bottleneck.
* Add concurrency and idempotency testing.
* Implement centralized error handling and structured logging.
* Add CI quality gates for automated tests.
* Improve business-journey coverage beyond smoke and schema validation.
* Add production readiness and dependency monitoring.

## Conclusion

The application has a functional automated QA foundation, including API automation, Playwright automation and performance testing. However, several production-hardening risks remain, particularly around high-concurrency performance, concurrency safety, authorization, order integrity, error handling and operational readiness.

The review contains **30 documented engineering findings** and provides recommended remediation actions and priorities for production hardening.

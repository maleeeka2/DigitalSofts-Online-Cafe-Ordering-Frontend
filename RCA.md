# RCA.md

## RCA-01 — API Connectivity Failure
**Timeline:** Playwright full run → API requests failed → backend was started/reported healthy.  
**Root cause:** API requests resolved to `::1:5000` and the connection was refused during the recorded test run.  
**Why missed:** Service readiness was not enforced as a test precondition.  
**Prevention:** Standardize host binding/base URL and add readiness checks.

## RCA-02 — Cloudinary Configuration
**Root cause:** Placeholder Cloudinary values were loaded and the connection check failed.  
**Why missed:** Configuration validation was not a deployment gate.  
**Prevention:** Validate required production secrets before release.

## RCA-03 — Incomplete Journey Coverage
**Root cause:** Initial AI suite emphasized smoke/schema checks.  
**Why missed:** Requirements were not converted into a traceability matrix before generation.  
**Prevention:** Map every acceptance journey to one or more tests.

## RCA-04 — Dependency Vulnerabilities
**Root cause:** npm audit reported 7 vulnerabilities.  
**Why missed:** Dependency security was not an enforced CI gate.  
**Prevention:** Add dependency scanning and documented exception handling.

## RCA-05 — Environment Drift
**Root cause:** Local frontend/API ports varied during troubleshooting.  
**Why missed:** Environment configuration was not centralized.  
**Prevention:** Use explicit environment variables and CI service configuration.

# PROJECT_MANAGEMENT.md

## Sprint Plan
1. Engineering audit
2. QA strategy and traceability
3. UI/API automation
4. Performance/security/accessibility
5. Hardening and production-readiness review

## Risk Register
| Risk | Impact | Mitigation |
|---|---|---|
| API environment mismatch | High | Standardize host/base URL |
| Invalid cloud configuration | High | Secret validation |
| Authorization defect | Critical | Authorization matrix |
| Performance bottleneck | High | k6/Locust |
| Data inconsistency | Critical | Database integrity checks |
| CI failure | High | CI/local parity |

## Release Checklist
- [ ] Critical journeys pass
- [ ] API tests pass
- [ ] Security checks pass
- [ ] Accessibility >=95
- [ ] Performance evidence complete
- [ ] CI green
- [ ] Monitoring ready
- [ ] Rollback tested

## Go/No-Go
Current decision: **NO-GO** until required evidence and quality gates are complete.

## Rollback
Deploy last known-good build → restore compatible configuration → health check → smoke test.

## Incident Response
Detect → assign owner → preserve logs → reproduce → mitigate → verify → RCA → prevention.

# AI-Assisted Test Generation

## Overview

AI tools were used to accelerate the initial Playwright test scaffolding and generate ideas for functional, API, validation, and responsive test coverage.

AI assistance was treated as a development aid rather than a replacement for QA review. All generated tests were reviewed, adapted where necessary, and executed against the running application.

## AI-Generated Test Areas

AI assistance was used to generate and structure tests covering:

- Homepage smoke checks
- Homepage response and content validation
- Admin login page and form-field checks
- Menu API availability
- Menu response structure and data validation
- Menu field validation
- Negative API route handling
- Mobile/responsive smoke checks
- Repeated API request behaviour
- Basic performance-related response-time checks

## Human QA Review

The generated tests were manually reviewed to ensure that:

- Test URLs matched the actual local frontend and backend configuration.
- Playwright configuration used the correct frontend URL.
- API requests targeted the correct backend port.
- Assertions reflected the application's actual response structure.
- Negative tests expected appropriate HTTP error responses.
- Tests were deterministic and executable in the local environment.
- Duplicate or low-value coverage was avoided where possible.

An initial execution exposed a local API connectivity/configuration issue (`ECONNREFUSED ::1:5000`). The configuration and API address were corrected during QA review.

## Final Execution Evidence

The final Playwright execution was successfully verified against the running application.

- Test framework: Playwright
- Browser: Chromium
- Total tests: 35
- Passed: 35
- Failed: 0
- Execution time: 27.5 seconds
- Workers: 1

Final command:

```bash
npx playwright test
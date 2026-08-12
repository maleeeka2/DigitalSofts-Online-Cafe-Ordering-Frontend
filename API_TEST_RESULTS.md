# API Test Execution Results

## Execution

- Tool: Postman Collection Runner
- Collection: Spice Corner API QA Collection
- Date: 2026-08-12
- Base URL: http://localhost:5000
- Iterations: 1

## Results

| Metric | Result |
|---|---:|
| Tests executed | 34 |
| Passed tests | 34 |
| Failed tests | 0 |
| Skipped tests | 0 |
| Errors | 0 |
| Average response time | 44 ms |
| Total duration | 3.51 seconds |

## Coverage

The collection includes API validation for:

- Health endpoint
- Customer authentication
- Admin authentication
- Menu retrieval
- Menu response validation
- Unauthorized menu modification
- Invalid menu update
- Invalid order quantity
- Invalid order tracking
- Unauthorized order access
- Unauthorized cart access
- Unauthorized cart modification
- Unauthorized payment access
- Unauthorized current-user access
- Unauthorized user profile access
- Unauthorized rider access
- Unauthorized delivery access

## Negative and Authorization Testing

The collection includes negative API scenarios such as:

- Invalid customer credentials
- Invalid admin credentials
- Unauthorized resource access
- Invalid input values
- Invalid order quantities
- Unauthorized modification attempts
- Unauthorized payment access

Expected error responses were validated through Postman test assertions.

## Result

**PASS — 34/34 Postman tests passed with 0 failures and 0 errors.**

Average response time during this execution was **44 ms**.

## Evidence

The Postman Collection Runner execution on 2026-08-12 reported:

- 34 total tests
- 34 passed
- 0 failed
- 0 skipped
- 0 errors
- 1 iteration
- 3.51 second total duration
# Performance Test Plan

## Objective

Evaluate API performance and stability under increasing concurrent user load and identify the point at which latency or failures become a production risk.

## Required Load Levels

- 50 concurrent virtual users
- 100 concurrent virtual users
- 500 concurrent virtual users

## Test Scenarios

The high-concurrency test uses safe read-oriented customer endpoints:

- `GET /api/health`
- `GET /api/menu`

State-changing operations such as order creation were intentionally excluded from the high-concurrency test to avoid creating large volumes of persistent test data. These workflows are covered separately through functional/API testing.

## Tool

- k6 v2.2.0
- Local Node.js/Express backend
- MongoDB-backed application

## Metrics

- Average response time
- P90 latency
- P95 latency
- Maximum response time
- Throughput
- HTTP failure rate
- Check pass/failure rate
- Completed iterations
- Virtual users

## Performance Target

- P95 response time: `< 2000 ms`
- HTTP failure rate: `< 5%`

## Actual Results

| Load | Avg Response | P95 | Max Response | Throughput | HTTP Failure Rate |
|---|---:|---:|---:|---:|---:|
| 50 VUs | 41.5 ms | 106.8 ms | 547.5 ms | 91.45 req/s | 0% |
| 100 VUs | 39.1 ms | 88.3 ms | 649.2 ms | 183.60 req/s | 0% |
| 500 VUs | 1217.5 ms | 3133.0 ms | 12705.8 ms | 282.93 req/s | 0.85% |

## Findings

### 50 VUs

The application remained responsive. P95 latency was approximately 106.8 ms and no HTTP request failures were observed.

### 100 VUs

The application continued to perform well. P95 latency was approximately 88.3 ms with no HTTP request failures observed.

### 500 VUs

Performance degradation became significant. P95 latency increased to approximately 3.13 seconds, exceeding the 2-second target. Maximum observed latency was approximately 12.7 seconds and the HTTP failure rate was approximately 0.85%.

This indicates that the application currently has a high-concurrency performance risk.

## QA Conclusion

The application performs well at 50 and 100 concurrent virtual users but does not currently meet the defined P95 latency target at 500 concurrent users.

The 500-user result should therefore be treated as a production-readiness risk requiring further investigation into backend processing, database queries, connection/resource limits and infrastructure capacity.

## Evidence

- `performance/k6-summary-50.json`
- `performance/k6-summary-100.json`
- `performance/k6-summary-500.json`
- `performance/k6-summary-ramping-50-100-500.json`
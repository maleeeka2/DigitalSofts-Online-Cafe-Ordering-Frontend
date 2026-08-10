# PERFORMANCE_TEST_PLAN.md

## Required Loads
- 50 concurrent users
- 100 concurrent users
- 500 concurrent users

## Scenarios
Browse menu, authentication, cart activity, checkout/order creation, order tracking and admin status updates.

## Metrics
Latency, p95 latency, throughput, failure rate, database bottlenecks and memory usage.

## Rule
Do not invent measurements. Attach actual k6/Locust output after execution.

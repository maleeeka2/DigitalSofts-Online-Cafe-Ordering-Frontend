# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> 33 Prices are finite
- Location: tests\smoke.spec.js:175:1

# Error details

```
Error: apiRequestContext.get: connect ECONNREFUSED ::1:5000
Call log:
  - → GET http://localhost:5000/api/menu
    - user-agent: Playwright/1.62.1 (x64; windows 10.0) node/24.19
    - accept: */*
    - accept-encoding: gzip,deflate,br

```
# AI_REPORT.md

## AI-Assisted Test Generation
AI was used to accelerate the initial Playwright test scaffolding.

### AI-generated areas
- Homepage smoke checks
- Admin login field checks
- Menu API/schema checks
- Basic negative route checks
- Mobile smoke checks

### Human review
The generated tests were reviewed and the Playwright configuration was corrected for the local frontend port. Execution evidence showed 35 tests were created; the recorded run had 11 passing and 24 API tests failing with `ECONNREFUSED ::1:5000`.

### Limitation
The initial generated suite did not fully map to every required business journey. Human review is therefore required before accepting AI-generated tests.

### Recommendation
Use AI for ideas/scaffolding, but require requirement traceability, human review and real execution evidence.

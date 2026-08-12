# ACCESSIBILITY_REPORT.md

## Tooling

- Chrome Lighthouse
- axe-based Lighthouse accessibility checks
- Manual review of reported failing elements

## Scope

Customer:
- Home
- Menu

Planned:
- Cart
- Checkout
- Order tracking
- Admin login
- Admin dashboard
- Admin menu
- Admin order screens

## Target

Accessibility score: 95+

## Results

| Page | Accessibility Score | Target | Status |
|---|---:|---:|---|
| Home `/` | 88/100 | 95+ | FAIL |
| Menu `/menu` | 88/100 | 95+ | FAIL |

## Findings

### 1. Buttons without accessible names

Lighthouse identified buttons without accessible names.

Affected controls include icon-only controls such as:
- Navigation/menu button
- Voice/microphone button
- Camera button
- Chat button

These controls should have meaningful accessible names using appropriate
accessible labels/ARIA attributes.

### 2. Insufficient color contrast

Lighthouse identified foreground/background combinations that do not meet
the required contrast ratio.

## Accessibility Status

**PARTIAL / NOT PASSING**

The required 95+ accessibility target has not yet been achieved.

The findings should be remediated and the affected pages re-audited before
production release.

## Evidence

Lighthouse baseline audits were executed locally against:

- `http://localhost:5174/`
- `http://localhost:5174/menu`

Both returned an accessibility score of **88/100**.
# DATABASE_QUALITY.md

## Required Checks
- Duplicate orders
- Orphan records
- Invalid prices
- Incorrect totals
- Invalid status values/transitions
- Missing customers

## Status
Checks are required but execution evidence is not yet available.

Example MongoDB checks should be adapted to the actual schema before execution:
```js
db.menu.find({price: {$lt: 0}})
db.orders.find({user: {$exists: false}})
```

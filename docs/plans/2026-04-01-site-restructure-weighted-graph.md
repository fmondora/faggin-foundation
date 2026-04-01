# Site Restructure & Weighted Graph — April 2026

## Navigation
Reduced from 7 to 5 items:

**Home | Chi siamo | Postulati | Pubblicazioni | Eventi**

- "Concetti" renamed to "Postulati" in nav (route stays `/concetti`)
- Biography merged into Publications page
- News removed from nav
- Chi siamo moved to second position

## Homepage — Weighted Graph

### Concept filtering
- Homepage shows only concepts with `sortOrder ≤ 4` (~12 nodes, ~4 per space)
- Full `/concetti` page keeps all 50 concepts

### Size scale
Continuous scale replacing 3 discrete steps:
```
size = 1.5 - ((sortOrder - 1) / (maxSort - 1)) * 0.75
```
- sortOrder 1 → size 1.5 (largest)
- sortOrder 4 → size ~1.05

### Connection weights
Derived from endpoint importance:
```
weight = 1 / (sortOrderA + sortOrderB)
```
- Two top concepts (1+1=2) → weight 0.5 (most visible)
- Two minor concepts (4+4=8) → weight 0.125 (less visible)
- Weight maps to opacity: `0.04 + weight * 0.4`
- Only connections between visible nodes shown in homepage

## Chi siamo
- Video di Federico da YouTube (TBD)

## Pubblicazioni
- Biography section (timeline + awards) added above books

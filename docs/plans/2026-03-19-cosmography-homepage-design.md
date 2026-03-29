# Design: Cosmografia Interattiva — Homepage Faggin Foundation

**Data:** 2026-03-19
**Stato:** Approvato
**Riferimento visivo:** https://50-jahre-hitparade.ch/

## Contesto

Faggin ha approvato il progetto complessivo ma ha chiesto che la homepage non promuova la vendita dei libri (aspetto marginale) ma faccia conoscere il suo pensiero sulla coscienza in modo catchy e immediato. Ha apprezzato l'idea di una home "molto grafica" stile 50-jahre-hitparade.ch.

## Concetto

"Cosmografia interattiva" — sfondo cosmico scuro con 3 cerchi concentrici che rappresentano gli spazi ontologici del pensiero di Faggin:

- **C** (nucleo) = Coscienza — mondo interiore, qualia, significato
- **I** (intermedio) = Informazione — livello simbolico, comunicazione tra seity
- **F** (esterno) = Fisico — spazio-tempo, materia, particelle

Particelle luminose (le seity) fluttuano attraverso i tre strati. Ogni spazio rivela concetti cliccabili che portano a video o approfondimenti.

## Layout

### Above the fold (100vh)

- Sfondo: gradiente scuro (#0a0a1a → #1a0a2e)
- Centro: 3 cerchi concentrici con glow colorato
  - F (esterno): blu/indaco #3498DB
  - I (intermedio): viola #9B59B6
  - C (nucleo): oro/ambra #F5A623, pulsante
- Particelle luminose (seity) che fluttuano tra gli strati
- Label minimali: "Fisico", "Informazione", "Coscienza" (fade-in dopo 1-2s)
- Citazione Faggin in dissolvenza: "Noi siamo luce, dobbiamo solo aprire gli occhi"
- Header trasparente sovrapposto
- Freccia "Esplora" animata in basso

### Below the fold

1. PurposeSection (riadattata come ponte testuale, non più hero)
2. VideoGridPreview (invariata)
3. StorySection (invariata)
4. BooksGrid (spostata in fondo, ruolo marginale)
5. Footer

## Interazioni

### Hover/tap su spazio

- Il cerchio si espande leggermente, glow si intensifica
- Appaiono 4-6 nodi/concetti sul perimetro (come pianeti in orbita)
- Gli altri cerchi si attenuano (opacity 0.3)

### Elementi per spazio

| Spazio | Nodi |
|--------|------|
| C (Coscienza) | Qualia · Libero arbitrio · Uno · Postulato dell'Essere |
| I (Informazione) | Informazione quantistica · Entanglement · Nousym · Simboli |
| F (Fisico) | Spazio-tempo · Materia · Microprocessore · Fisica quantistica |

### Click su nodo → Overlay

- Titolo del concetto
- Breve spiegazione (2-3 frasi dai libri)
- Video embed di Faggin (se disponibile)
- Link "Approfondisci →" a pagina dedicata
- Backdrop-blur della cosmografia dietro

### Particelle (seity)

- Decorative, non cliccabili
- Accelerano nello spazio attivo
- Tooltip opzionale: "Le seity sono entità coscienti che attraversano tutti gli spazi"

### Mobile

- Tap invece di hover
- Tap cerchio → espande nodi
- Tap nodo → overlay fullscreen
- Particelle ridotte per performance

## Architettura tecnica

### Componenti

```
CosmographyHero/
  ├─ CosmographyCanvas    — SVG + Canvas overlay
  ├─ OntologicalRing      — singolo cerchio (C/F/I)
  ├─ ConceptNode           — nodo cliccabile sul perimetro
  ├─ SeityParticles        — sistema particellare (Canvas 2D)
  ├─ ConceptOverlay        — modal con video + testo
  └─ CosmographyQuote      — citazione con fade-in
```

### Stack

- Cerchi e nodi: **SVG** (scalabile, accessibile)
- Particelle: **Canvas 2D** sovrapposto (~50-80 particelle a 30fps)
- Animazioni: **Framer Motion** (spring physics)
- Glow: CSS `filter: drop-shadow` + `box-shadow`
- **No Three.js/WebGL** — troppo pesante per il caso d'uso

### Palette

| Spazio | Colore | Glow | Semantica |
|--------|--------|------|-----------|
| C | #F5A623 oro/ambra | warm pulse | calore della coscienza |
| I | #9B59B6 viola | medium glow | ponte visibile/invisibile |
| F | #3498DB blu/indaco | cool shimmer | freddezza della materia |

### Strapi — content type `concept`

```
concept:
  name: string
  space: enum [C, I, F]
  shortDescription: text (2-3 frasi)
  video: relation → video (opzionale)
  deepLinkPage: string
  sortOrder: number
```

Endpoint: `GET /api/concepts?populate=video&sort=sortOrder`
Fallback hardcoded nel frontend (~12 concetti).

### Performance

- Canvas a 30fps con requestAnimationFrame throttled
- Lazy load video nell'overlay
- `prefers-reduced-motion`: particelle ferme, no pulse

### Accessibilità

- SVG con `role="img"` e `aria-label`
- Nodi come `<button>` con label
- Overlay: focus trap + Escape
- Tab navigation tra nodi

## Cosa cambia rispetto a oggi

- BooksGrid scende in fondo alla homepage
- PurposeSection diventa ponte testuale (non più hero)
- Header: bg-transparent sopra cosmografia, colore solido allo scroll
- Nessuna altra pagina cambia
- Nuovo content type `concept` in Strapi

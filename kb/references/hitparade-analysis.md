# Analisi: 50-jahre-hitparade.ch — Stile Visionario

## Cosa fa bene (da replicare)

### Esperienza immersiva fullscreen
- Canvas WebGL a schermo intero — NESSUN scroll tradizionale
- UI sovrapposta al canvas con z-index layering
- Gradiente navy → burgundy (#050129 → #811a4c)
- Font: Avenir 500/900, tutto uppercase, spaziatura ampia

### Animazioni d'ingresso staged
- Logo: slide da -50% translateY con 0.75s easing
- Nav: fade-in 0.5s
- Anno centrale: prospettiva 3D (10vw translateZ → 0)
- Testo tutorial: glow pulsante (text-shadow keyframe)

### Interazione minimalista
- Pochissimo testo visibile — l'esperienza è visiva
- Overlay modale per contenuti testuali (About, Help)
- Backdrop blur 15px quando overlay attivo
- Close button con rotazione animata

### Cosa adattare per Faggin
- WebGL canvas → CosmographyHero (già simile!)
- Anno centrale → citazione centrale rotante
- Nodi musicali → concetti ontologici cliccabili
- Help overlay → spiegazione della cosmografia
- Palette: mantenere navy/viola ma con oro (coscienza)

## Pattern chiave
```
[Canvas fullscreen] → [Quote flottante] → [Nodi interattivi] → [Overlay concetto]
```
Zero scroll. Tutto accade in una schermata. Il visitatore esplora, non scorre.

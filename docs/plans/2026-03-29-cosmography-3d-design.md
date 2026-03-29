# Design: Cosmografia 3D — esperienza immersiva

**Data**: 2026-03-29
**Branch**: A-b
**Ispirazione**: 50-jahre-hitparade.ch
**Stato**: approvato

## Obiettivo

Ricostruire l'esperienza interattiva di hitparade.ch dentro il progetto Faggin Foundation, sostituendo i nodi musicali con i 12 concetti ontologici di Faggin. Esperienza fullscreen, immersiva, 3D.

## Scena 3D

Spazio cosmico scuro (gradiente navy → viola). 12 concetti come sfere luminose su 3 orbite concentriche:

### Orbita esterna — Fisico (F, blu #3498DB)
- Spazio-tempo
- Materia
- Microprocessore
- Fisica quantistica

### Orbita media — Informazione (I, viola #9B59B6)
- Informazione quantistica
- Entanglement
- Nousym
- Simboli

### Orbita interna — Coscienza (C, oro #F5A623)
- Qualia
- Libero arbitrio
- Uno
- Postulato dell'Essere

### Connessioni
Linee luminose tra concetti correlati (es. Qualia↔Info quantistica, Libero arbitrio↔Fisica quantistica, Uno↔Entanglement).

## Interazione

- **Camera orbitale**: rotazione/zoom con mouse/touch (OrbitControls)
- **Hover nodo**: ingrandisce, mostra nome + label, glow intensificato
- **Click nodo**: smooth zoom verso il nodo → overlay modale HTML con descrizione, citazione, video
- **ESC / click fuori**: torna alla vista d'insieme

## Elementi ambientali

- Particelle 3D fluttuanti colorate per spazio ontologico
- Citazione Faggin flottante (HTML overlay, rotazione automatica)
- Etichette orbite semi-trasparenti

## Stack tecnico

```
@react-three/fiber     → React renderer per Three.js
@react-three/drei      → OrbitControls, Text, Float, Stars
three                  → engine 3D
```

Componente principale: `CosmographyScene3D`
Posizione: `frontend/src/components/cosmography3d/`

## Responsive

- Desktop: camera distante, tutti i nodi visibili, orbita libera
- Mobile: camera più vicina, tocco per ruotare, tap per selezionare, nodi più grandi

## Decisione tecnica

Opzione A (Three.js) scelta per massima fedeltà all'esperienza hitparade.ch.
Opzioni B (Canvas 2D) e C (CSS 3D) scartate per minore impatto visivo.

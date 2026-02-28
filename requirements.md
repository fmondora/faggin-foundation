# Faggin Foundation - Requisiti Sito Web

## 1. Visione e Obiettivo

**Perche'**: Federico Faggin vuole raggiungere il maggior numero di persone per condividere
la sua esperienza e aiutarle a comprendere come arrivare alla consapevolezza della realta'.

**Mezzo**: Un sito web che presenta lo scopo della fondazione, la biografia di Faggin,
i suoi tre libri e una serie di video di approfondimento, con rimando ai social.

**Riferimento stilistico**: [reinventingorganizations.com](https://www.reinventingorganizations.com/)
senza le funzionalita' di Purchase e Pay-what-feels-right.

---

## 2. Struttura del Sito

### Navigazione principale
`HOME | ABOUT | VIDEO SERIE | EVENTI | RICERCA E SVILUPPO`

### HOME (single-page scrollabile)

| Sezione | Descrizione |
|---|---|
| Header | "FAGGIN FOUNDATION" - sfondo texture blu/grigio |
| Scopo | Testo sullo scopo della fondazione (da definire) |
| 3 Libri | Silicio, Irriducibile, Oltre l'Invisibile affiancati, ciascuno con bottone "Video Presentazione" |
| La Mia Storia | Video YouTube embedded + breve biografia |
| Video Serie | Griglia di video dal canale YouTube della fondazione |
| Footer | Link social: sito web, Facebook, Instagram, YouTube |

### ABOUT
Biografia estesa di Federico Faggin.

### VIDEO SERIE
Pagina dedicata con griglia di video di approfondimento dai canali YouTube.

### EVENTI
Lista semplice di:
- Eventi passati (con link ai video relativi)
- Eventi futuri (solo informativo)

**No** booking, **no** calendario interattivo.

### RICERCA E SVILUPPO
Sezione con:
- Descrizione attivita' di ricerca della fondazione (da definire)
- **Sistema di voto temi** (vedi sezione 5)

---

## 3. Lingue

Il sito deve essere disponibile in **4 lingue**:

| Lingua | Priorita' |
|---|---|
| Italiano | Primaria |
| Inglese | Alta |
| Tedesco | Media |
| Spagnolo | Media |

### Traduzioni libri disponibili

| Libro | IT | EN | DE | ES |
|---|---|---|---|---|
| Silicio (2019) | si | Silicon (2021) | - | - |
| Irriducibile (2022) | si | Irreducible (2024) | si | si |
| Oltre l'Invisibile (2024) | si | - | si | - |

Nota: per le lingue in cui un libro non e' tradotto, si puo' linkare all'edizione originale
italiana o omettere il bottone di acquisto/link.

---

## 4. Funzionalita' Base

- [x] Pagine statiche con contenuto editoriale (Ghost CMS)
- [x] Embed video YouTube
- [x] Link ai social media (Facebook, Instagram, YouTube)
- [x] Lista eventi semplice
- [x] Newsletter (Ghost nativo)
- [x] Registrazione utenti / membership (Ghost nativo)
- [x] Design responsive (mobile + desktop)

---

## 5. Funzionalita' Avanzata: Raccolta Feedback e Voto Temi

**Scopo**: Gli utenti registrati possono votare i temi su cui vogliono approfondimenti
futuri (interviste, podcast, video, articoli).

**Regole**:
- Utente deve essere registrato (membership Ghost)
- 1 voto per utente per tema
- I temi sono proposti dalla fondazione (admin)
- Visualizzazione risultati (classifica temi piu' votati)

**Implementazione**: widget custom o integrazione esterna (non nativa in Ghost).

---

## 6. Piattaforma Tecnica: Ghost CMS

### Pro
- Editor di contenuti elegante e facile da usare
- Membership e newsletter nativi
- API REST per integrazioni custom
- Temi personalizzabili (Handlebars)
- Ottimo per il volume previsto (~20 utenti concorrenti)

### Limiti da gestire
- **Multilingua non nativo**: richiede workaround (vedi opzioni sotto)
- **Voting non nativo**: richiede sviluppo custom

### Opzioni multilingua con Ghost

| Opzione | Pro | Contro |
|---|---|---|
| **A) 1 istanza per lingua** (raccomandato Ghost) | Semplice, indipendente | 4 istanze da mantenere, 4x costi hosting |
| **B) Singola istanza + tag lingua** | 1 sola istanza | Hack, UX non ottimale, manutenzione difficile |
| **C) Ghost headless + frontend custom** | Massima flessibilita', 1 istanza | Richiede sviluppo frontend (Next.js/Astro) |

**Raccomandazione**: Opzione C - Ghost come headless CMS + frontend statico (Astro o Next.js).
Permette multilingua nativo nel frontend, una sola istanza Ghost, e massima flessibilita'
per il widget di voting.

---

## 7. Architettura Proposta (Opzione C)

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│          (Astro / Next.js - SSG/SSR)            │
│                                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │  IT  │ │  EN  │ │  DE  │ │  ES  │          │
│  └──────┘ └──────┘ └──────┘ └──────┘          │
│                                                  │
│  Pagine statiche + i18n routing                 │
│  Embed YouTube                                   │
│  Widget Voting (custom)                          │
└───────────────┬─────────────────────────────────┘
                │
        Ghost Content API
                │
┌───────────────┴─────────────────────────────────┐
│              Ghost CMS (headless)                │
│                                                  │
│  - Contenuti editoriali (post/pagine)           │
│  - Membership / registrazione utenti            │
│  - Newsletter                                    │
│  - Admin panel per gestione contenuti           │
└─────────────────────────────────────────────────┘
                │
┌───────────────┴─────────────────────────────────┐
│         Microservizio Voting (opzionale)         │
│         (API lightweight - es. Hono/Express)     │
│                                                  │
│  - CRUD temi (admin)                            │
│  - POST /vote (1 per utente, autenticato)       │
│  - GET /results (classifica)                    │
│  - DB: SQLite o Postgres                        │
└─────────────────────────────────────────────────┘
```

---

## 8. Piano di Rilascio a Fasi

### Fase 0 - MVP Stasera (2-3 ore)
- [ ] Ghost CMS installato (Ghost Pro o Docker locale)
- [ ] Tema base configurato
- [ ] Home page: solo italiano
- [ ] Contenuti placeholder
- [ ] 3 libri con link video
- [ ] Embed video biografia
- [ ] Link social nel footer

### Fase 1 - Sito Base Completo (1-2 settimane)
- [ ] Tutte le 5 pagine completate
- [ ] Design custom allineato alla bozza
- [ ] Contenuti definitivi (testi, video)
- [ ] Newsletter attiva
- [ ] Membership base
- [ ] Deploy su hosting definitivo + dominio

### Fase 2 - Multilingua (1-2 settimane)
- [ ] Frontend custom (se opzione C) o istanze aggiuntive
- [ ] Traduzioni contenuti EN, DE, ES
- [ ] Language switcher
- [ ] SEO multilingua (hreflang)

### Fase 3 - Voting / Ricerca e Sviluppo (1 settimana)
- [ ] Widget/microservizio voting
- [ ] Integrazione con membership Ghost
- [ ] Pagina "Ricerca e Sviluppo" con classifica temi
- [ ] Admin panel per gestione temi

---

## 9. Quotazione (da dettagliare)

### Versione Base (Fasi 0-2)
- Setup Ghost CMS
- 5 pagine in 4 lingue
- Design custom
- Newsletter + Membership
- Deploy + dominio

### Versione Base + Feedback (Fasi 0-3)
- Tutto il base +
- Sistema voting custom
- Pagina Ricerca e Sviluppo interattiva

### Costi ricorrenti stimati
- Ghost Pro: $9-25/mese (oppure self-hosted ~$5-10/mese VPS)
- Dominio: ~$15/anno
- CDN/hosting frontend (se opzione C): $0-20/mese (Vercel/Netlify free tier possibile)

---

## 10. Contenuti da Ricevere

- [ ] Testo "Scopo della fondazione"
- [ ] Biografia estesa (pagina About)
- [ ] URL video presentazione per ciascun libro
- [ ] Lista video per la sezione "Video Serie"
- [ ] Lista eventi (passati + futuri)
- [ ] Testo per "Ricerca e Sviluppo"
- [ ] Logo / assets grafici (se diversi da quelli nella bozza)
- [ ] Traduzioni dei testi in EN, DE, ES
- [ ] Account social media (URL)

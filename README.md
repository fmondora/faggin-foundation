# Faggin Foundation Website

Website for the Federico and Elvia Faggin Foundation — sharing Federico Faggin's experience and research on the science of consciousness.

## Overview

A multilingual website (IT, EN, DE, ES) built with Strapi headless CMS and Next.js, featuring:

- Foundation purpose and Federico Faggin's biography
- Three books with video presentations
- Curated video series from YouTube
- Events listing (past and upcoming)
- Research section with community voting on future topics
- User registration with magic link authentication
- Newsletter subscription

**Design reference:** [reinventingorganizations.com](https://www.reinventingorganizations.com/) (without Purchase/Pay-what-feels-right features).

## Architecture

```
┌──────────────────────────────────────────────────┐
│              Frontend (Next.js 15)                │
│         App Router + next-intl (4 locales)        │
│                                                   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│  │  IT  │ │  EN  │ │  DE  │ │  ES  │           │
│  └──────┘ └──────┘ └──────┘ └──────┘           │
│                                                   │
│  Tailwind CSS 4 · React 19 · TypeScript          │
└────────────┬──────────────────┬───────────────────┘
             │                  │
     Strapi REST API    GoTrue Auth API
             │                  │
┌────────────┴──────┐  ┌───────┴───────────────────┐
│  Strapi v5 CMS    │  │  Supabase GoTrue          │
│  15 content types │  │  Magic link (OTP)          │
│  i18n plugin      │  │  Email via MailHog (dev)   │
│  Custom vote API  │  │                            │
└────────────┬──────┘  └───────┬───────────────────┘
             │                  │
        ┌────┴──────────────────┴────┐
        │     PostgreSQL 16          │
        │  strapi DB + supabase_auth │
        └────────────────────────────┘
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| CMS | Strapi v5 (headless) |
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| i18n | next-intl v4 (IT, EN, DE, ES) |
| Auth | Supabase GoTrue (magic link / OTP) |
| Database | PostgreSQL 16 |
| Dev Email | MailHog |
| Orchestration | Docker Compose |

## Site Structure

| Page | Path (IT) | Path (EN) | Description |
|------|-----------|-----------|-------------|
| Home | `/` | `/en` | Purpose, books, story video, video preview |
| About | `/about` | `/en/about` | Biography ("Four Lives") + awards |
| Video Series | `/video-serie` | `/en/video-series` | Themed video collections |
| Events | `/eventi` | `/en/events` | Past and upcoming events |
| Research | `/ricerca-e-sviluppo` | `/en/research` | Research areas + topic voting |

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for seeding)

### 1. Clone and configure

```bash
git clone git@github.com:fmondora/faggin-foundation.git
cd faggin-foundation
cp .env.example .env
```

### 2. Start all services

```bash
docker compose up -d
```

This starts 5 services:

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Next.js dev server |
| Strapi Admin | http://localhost:1337/admin | CMS admin panel |
| GoTrue | http://localhost:9999 | Auth API |
| MailHog | http://localhost:8025 | Dev email inbox |
| PostgreSQL | localhost:5432 | Database |

Strapi admin credentials (auto-created): `admin@faggin.local` / `Admin1234!`

### 3. Seed content (optional)

```bash
npm install
npm run seed
```

This populates Strapi with content in all 4 languages (books, events, bio sections, awards, topics, videos, etc.).

## Development

### Project Structure

```
faggin-foundation/
├── frontend/                 # Next.js 15 application
│   ├── src/
│   │   ├── app/[locale]/     # Pages (home, about, eventi, video-serie, ricerca-e-sviluppo)
│   │   ├── app/api/          # API routes (newsletter, auth callback)
│   │   ├── app/auth/         # GoTrue auth proxy
│   │   ├── components/       # React components
│   │   ├── lib/              # Strapi client, i18n config, Supabase client
│   │   ├── messages/         # Translation files (it/en/de/es.json)
│   │   └── styles/           # Global CSS + Tailwind
│   └── Dockerfile
├── strapi/                   # Strapi v5 CMS
│   ├── src/
│   │   ├── api/              # 15 content types + custom vote routes
│   │   └── index.js          # Bootstrap (admin user + permissions)
│   ├── config/               # Database, server, plugins, middlewares
│   └── Dockerfile
├── scripts/
│   ├── init-db.sh            # PostgreSQL init (creates supabase_auth DB)
│   └── seed-strapi.ts        # Content seeding script
├── docker-compose.yml
└── .env.example
```

### Content Types (Strapi)

**Collection types:** Book, Video, VideoTheme, Event, BioSection, Award, Topic, Vote, SocialLink

**Single types:** HomePage, AboutPage, VideoPage, EventsPage, ResearchPage, SiteConfig

### Custom API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/votes/topics-with-counts` | Topics with vote counts |
| POST | `/api/votes/cast` | Cast a vote (requires email) |
| DELETE | `/api/votes/remove/:topicId` | Remove a vote |

### i18n Routing

The default locale is Italian (`it`) with `localePrefix: 'as-needed'`:
- Italian: `/`, `/about`, `/eventi`, `/video-serie`, `/ricerca-e-sviluppo`
- English: `/en`, `/en/about`, `/en/events`, `/en/video-series`, `/en/research`
- German: `/de`, `/de/about`, `/de/veranstaltungen`, `/de/videoreihe`, `/de/forschung`
- Spanish: `/es`, `/es/acerca-de`, `/es/eventos`, `/es/serie-de-videos`, `/es/investigacion`

### Auth Flow

1. User clicks "Sign up" in the header
2. Enters email in the login modal
3. GoTrue sends a magic link email (via MailHog in dev)
4. User clicks the link → redirected to `/api/auth/callback`
5. Session established, user can vote on topics

## Languages & Book Translations

| Book | IT | EN | DE | ES |
|------|----|----|----|----|
| Silicio (2019) | Mondadori | Silicon (2021) | — | — |
| Irriducibile (2022) | Mondadori | Irreducible (2024) | Yes | Yes |
| Oltre l'Invisibile (2024) | Mondadori | — | Jenseits des Unsichtbaren | — |

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Description |
|----------|-------------|
| `POSTGRES_*` | PostgreSQL connection |
| `STRAPI_*` | Strapi app keys, JWT secrets |
| `GOTRUE_*` | GoTrue auth config, SMTP |
| `NEXT_PUBLIC_STRAPI_URL` | Strapi URL (browser-side) |
| `NEXT_PUBLIC_SUPABASE_URL` | Auth URL (browser-side) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous JWT |

## Deployment

The project is designed to run with Docker Compose. For production deployment, consider:

- **[Coolify](https://coolify.io/)** on a VPS (Hetzner) — self-hosted PaaS with Docker Compose support
- Add a reverse proxy (Caddy/Traefik) for HTTPS
- Use a managed PostgreSQL or add automated backups
- Replace MailHog with a real SMTP provider (Postal, Resend, etc.)
- Generate secure values for all secrets in `.env`

## License

All rights reserved — Federico and Elvia Faggin Foundation.

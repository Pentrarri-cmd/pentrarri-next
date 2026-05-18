# Pentrarri Next — Etappe A: Setup, Designsystem, Home-Mockup

## Kontext (lies das zuerst)

**Wer:** Michael Grigorchuk, Solo-Gründer Pentrarri Group, Butzbach. Kein Coder. Du (Claude Code) bist der ausführende Builder.

**Was Pentrarri jetzt ist (Rebrand!):**
Pentrarri baut **Webseiten und SaaS für Unternehmen** mit Premium-Anspruch. Zusätzlich gibt es einen **Hochzeit-Showcase-Bereich** (Showcase-Demos für Hochzeitsseiten, kein Hauptgeschäft mehr).

**Wichtig:** Das ist KEIN Update der bestehenden Pentrarri-Seite. Das ist ein **kompletter Stack-Switch und Re-Brand**.

- Alte Pentrarri-Seite: `Pentrarri-cmd/pentrarri-2026` (Vanilla HTML/CSS/JS), live auf `pentrarri.com` via Cloudflare Pages. **Bleibt unberührt**, läuft weiter bis Cutover.
- Neue Pentrarri-Seite: Du baust sie in einem neuen Ordner und neuem Repo (siehe Phase 1). Deploy initial auf `pentrarri-next.pages.dev`. Domain-Cutover passiert später, nicht jetzt.

**Lokaler Pfad neu:** `~/Desktop/pentrarri-next/`
**Repo neu:** `Pentrarri-cmd/pentrarri-next`

**Tonalität:** Sie-Form. Premium/Edel. Sprache: "Digitale Produkte mit Anspruch." Keine Tech-Bro-Locker-Sprache, keine Buzzwords-Salate, kein "wir disrupten". Eher: präzise, ruhig, selbstbewusst.

---

## Stack (verbindlich, NICHT diskutieren)

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3.4+
- Framer Motion (für alle Scroll- und Hover-Animationen)
- `@cloudflare/next-on-pages` **gepinnt auf 1.13.15** (kompatibel mit Next 14.2)
- Schriften via `next/font/google` (self-hosted bei Build): Instrument Serif, Geist Sans, Geist Mono
- Node 20 LTS
- Package Manager: npm (kein pnpm, kein yarn)

---

## Aufgabe in 6 Phasen

Arbeite die Phasen sauber von oben nach unten. Commit nach jeder Phase einzeln mit Conventional Commit Message auf Deutsch.

---

### Phase 1 — Ordner anlegen, Next.js initialisieren

1. Prüfe ob `~/Desktop/pentrarri-next/` existiert. Falls nein, lege es an und `cd` rein.
2. Initialisiere Next.js mit folgenden Optionen (NICHT interaktiv, alles über Flags):
   ```bash
   npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbo
   ```
   Falls `create-next-app` Backslash-Slash beim `.` als Pfad meckert, mach es so:
   ```bash
   cd ~/Desktop && npx create-next-app@14 pentrarri-next --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbo && cd pentrarri-next
   ```
3. Verifiziere dass folgende Dateien existieren:
   - `src/app/page.tsx`
   - `src/app/layout.tsx`
   - `src/app/globals.css`
   - `tailwind.config.ts`
   - `package.json`

4. Git initialisieren (falls noch nicht durch `create-next-app` geschehen):
   ```bash
   git init
   git add .
   git commit -m "chore: initial commit aus create-next-app"
   ```

5. **GitHub-Repo:** Frag Michael NICHT, ob er das Repo angelegt hat. Versuche stattdessen:
   ```bash
   gh repo create Pentrarri-cmd/pentrarri-next --public --source=. --remote=origin --push
   ```
   Falls `gh` nicht authentifiziert ist oder fehlschlägt, gib Michael am Ende dieser Phase eine kurze Anleitung wie er das Repo selbst auf github.com anlegt und dann pusht. Nicht abbrechen — fahre mit den nächsten Phasen fort.

---

### Phase 2 — Dependencies installieren

```bash
npm install framer-motion
npm install -D @cloudflare/next-on-pages@1.13.15 wrangler@latest vercel@latest
```

**Wichtig:** `@cloudflare/next-on-pages` MUSS exakt auf `1.13.15` gepinnt sein. Spätere Versionen brechen mit Next 14.2. Verifiziere in `package.json` dass dort `"@cloudflare/next-on-pages": "1.13.15"` steht (ohne `^` davor).

Falls `^` davor steht, ändere es manuell zu exakter Version und `npm install` nochmal.

Commit: `chore: dependencies installieren (framer-motion, cloudflare-adapter)`

---

### Phase 3 — Cloudflare-Adapter & Wrangler-Setup

#### 3.1 — `next.config.js`

Erstelle `next.config.js` im Root mit folgendem Inhalt:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Cloudflare Pages handhabt Bilder selbst
  },
};

module.exports = nextConfig;
```

Falls `next.config.mjs` existiert, lösche es.

#### 3.2 — `wrangler.toml`

Erstelle `wrangler.toml` im Root:

```toml
name = "pentrarri-next"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

#### 3.3 — `package.json` Scripts erweitern

In `package.json`, im `"scripts"`-Block:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "pages:build": "npx @cloudflare/next-on-pages@1.13.15",
    "preview": "npm run pages:build && wrangler pages dev",
    "deploy": "npm run pages:build && wrangler pages deploy"
  }
}
```

#### 3.4 — `.gitignore` erweitern

Füge zu `.gitignore` hinzu (falls nicht schon drin):

```
.vercel
.wrangler
```

Commit: `chore: cloudflare-adapter und wrangler konfigurieren`

---

### Phase 4 — Designsystem (Tailwind Config + globale Styles + Schriften)

#### 4.1 — Schriften: `src/app/fonts.ts`

Erstelle `src/app/fonts.ts`:

```typescript
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google';

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

#### 4.2 — Tailwind Config: `tailwind.config.ts`

Ersetze den Inhalt von `tailwind.config.ts` mit:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          elevated: '#141414',
          soft: '#1c1c1c',
        },
        ink: {
          DEFAULT: '#f5f5f5',
          muted: '#888888',
          soft: '#555555',
        },
        gold: {
          DEFAULT: '#d4af37',
          glow: '#f0d878',
        },
        glow: {
          purple: '#6b46c1',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // Editorial-große Display-Sizes für Hero
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.875rem, 3vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        'mono-label': '0.18em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glowPulse 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

#### 4.3 — Globale Styles: `src/app/globals.css`

Ersetze den Inhalt komplett:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg text-ink font-sans antialiased;
    font-feature-settings: 'ss01', 'ss02', 'cv11';
  }

  ::selection {
    @apply bg-gold/30 text-ink;
  }
}

@layer components {
  /* Mono-Label: kleine Uppercase-Labels über Sektionen */
  .label-mono {
    @apply font-mono text-xs uppercase tracking-mono-label text-ink-muted;
  }

  /* Editorial Italic Akzent: für Wörter in Display-Headlines */
  .display-italic {
    @apply font-display italic text-gold;
  }

  /* Gold-Glow Radial Background: für Hero-Atmosphäre */
  .glow-gold {
    background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
  }

  .glow-purple {
    background: radial-gradient(circle at 50% 50%, rgba(107, 70, 193, 0.18) 0%, transparent 70%);
  }
}

/* Custom Scrollbar (subtil) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #2a2a2a;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3a3a3a;
}
```

#### 4.4 — Root Layout: `src/app/layout.tsx`

Ersetze den Inhalt komplett:

```typescript
import type { Metadata } from 'next';
import { instrumentSerif, geistSans, geistMono } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pentrarri — Digitale Produkte mit Anspruch',
  description: 'Pentrarri baut Webseiten und SaaS für Unternehmen mit Premium-Anspruch. Aus Butzbach, für ganz Deutschland.',
  metadataBase: new URL('https://pentrarri-next.pages.dev'),
  openGraph: {
    title: 'Pentrarri — Digitale Produkte mit Anspruch',
    description: 'Webseiten und SaaS für Unternehmen mit Anspruch.',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

Commit: `feat: designsystem (tokens, schriften, globale styles, layout)`

---

### Phase 5 — Layout-Komponenten

#### 5.1 — Container: `src/components/Container.tsx`

```typescript
import { ReactNode } from 'react';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
```

#### 5.2 — Header: `src/components/Header.tsx`

Sticky-Header mit Wordmark links, minimaler Nav rechts. Wordmark: "Pentrarri" in Geist Sans Medium, normal-case. Klein, zurückhaltend. **Kein Logo-Bild in Etappe A.** Pferd-Logo etc. kommt später.

```typescript
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from './Container';

const navItems = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Kontakt', href: '#kontakt' },
];

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-ink-soft/20 bg-bg/80 backdrop-blur-xl"
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="font-sans text-base font-medium tracking-tight text-ink">
            Pentrarri
          </Link>
          <ul className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#kontakt"
            className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-sm text-gold transition-all hover:border-gold hover:bg-gold/20"
          >
            Anfrage
          </Link>
        </nav>
      </Container>
    </motion.header>
  );
}
```

#### 5.3 — Footer: `src/components/Footer.tsx`

```typescript
import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-t border-ink-soft/20 py-12">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-sans text-base font-medium text-ink">Pentrarri Group</p>
            <p className="mt-1 text-sm text-ink-muted">
              Digitale Produkte mit Anspruch. Aus Butzbach.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-ink-muted">
            <Link href="/impressum" className="hover:text-ink">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-ink">Datenschutz</Link>
          </div>
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-mono-label text-ink-soft">
          © {new Date().getFullYear()} Pentrarri Group
        </p>
      </Container>
    </footer>
  );
}
```

Commit: `feat: layout-komponenten (container, header, footer)`

---

### Phase 6 — Home-Mockup (Hero + Drei Linien)

Das ist das **erste visuelle Statement**. Hier muss der Vibe rüberkommen: edel, abgefahren, dunkel-mit-Glow, Editorial-Italic-Akzent in der Headline.

#### 6.1 — Hero-Komponente: `src/components/Hero.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-32 md:pt-48 md:pb-40">
      {/* Gold Glow Hintergrund */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[600px] -translate-x-1/2 glow-gold animate-glow-pulse" />
      {/* Purple Glow rechts oben subtil */}
      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-[400px] w-[400px] glow-purple opacity-50" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="label-mono mb-8">
            <span className="text-gold">●</span> Webseiten · SaaS · Showcase
          </p>

          <h1 className="text-display-xl font-sans font-light text-ink">
            Digitale Produkte{' '}
            <span className="display-italic">mit Anspruch.</span>
          </h1>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            Pentrarri baut Webseiten und Software für Unternehmen,
            die mehr wollen als ein Template. Aus Butzbach. Für ganz Deutschland.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#kontakt"
              className="rounded-full bg-gold px-8 py-4 font-sans text-sm font-medium text-bg transition-all hover:bg-gold-glow"
            >
              Projekt anfragen
            </a>
            <a
              href="#leistungen"
              className="rounded-full border border-ink-soft px-8 py-4 font-sans text-sm font-medium text-ink transition-all hover:border-ink-muted hover:bg-ink/5"
            >
              Was wir bauen
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
```

#### 6.2 — Drei-Linien-Sektion: `src/components/Services.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

const services = [
  {
    number: '01',
    title: 'Webseiten',
    description:
      'Maßgeschneiderte Webseiten für Unternehmen — von Single-Page-Statements bis zu mehrseitigen Auftritten mit Editorial-Anspruch.',
    tags: ['Next.js', 'Performance', 'SEO'],
  },
  {
    number: '02',
    title: 'SaaS',
    description:
      'Software auf Anfrage. Dashboards, Tools, interne Systeme. Wir bauen das, was Sie nirgendwo fertig kaufen können.',
    tags: ['Custom Build', 'TypeScript', 'Edge'],
  },
  {
    number: '03',
    title: 'Showcase',
    description:
      'Demonstrationen unserer Arbeit — darunter Hochzeitsseiten, SaaS-Mockups und Editorial-Projekte. Zum Ansehen, zum Erkunden.',
    tags: ['Demos', 'Interactive', 'Live'],
  },
];

export function Services() {
  return (
    <section id="leistungen" className="relative py-32 md:py-40">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-3xl"
        >
          <p className="label-mono mb-6">Leistungen</p>
          <h2 className="text-display-lg font-sans font-light text-ink">
            Drei Linien.{' '}
            <span className="display-italic">Ein Anspruch.</span>
          </h2>
        </motion.div>

        <div className="grid gap-px bg-ink-soft/20 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-bg p-10 transition-colors duration-500 hover:bg-bg-elevated md:p-12"
            >
              <p className="font-mono text-sm text-gold">{service.number}</p>
              <h3 className="mt-6 font-display text-4xl text-ink">{service.title}</h3>
              <p className="mt-6 text-base leading-relaxed text-ink-muted">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink-soft/40 px-3 py-1 font-mono text-xs uppercase tracking-mono-label text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

#### 6.3 — Home-Page: `src/app/page.tsx`

```typescript
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
    </>
  );
}
```

Commit: `feat: home-mockup (hero, services-drei-linien)`

---

## Phase 7 — Lokal testen & Schluss-Bericht

```bash
npm run dev
```

Server soll auf `http://localhost:3000` laufen.

**Selbst-Prüfen vor Schluss-Bericht:**

| Check | Erwartet |
|---|---|
| Server startet ohne Errors | ✅ |
| Hero ist groß, dunkel, Italic-"mit Anspruch."-Akzent in Gold sichtbar | ✅ |
| Gold-Glow im Hero-Hintergrund pulsiert subtil | ✅ |
| Drei Service-Karten in Reihe mit Nummern 01/02/03 | ✅ |
| Header bleibt beim Scrollen sichtbar (sticky, blur) | ✅ |
| Buttons im Hero (gold + outline) funktionieren visuell | ✅ |
| Mobile (Browser DevTools Mobile-Mode 375px): alles responsive, nix bricht | ✅ |
| Console: keine roten Fehler | ✅ |

**WICHTIG — Build-Test:**

```bash
npm run build
```

muss durchlaufen ohne TypeScript- oder Build-Errors. Wenn nicht: fix bevor du Schluss-Bericht schreibst.

Bonus-Test (kann fehlschlagen, ist okay falls Wrangler-Auth fehlt):
```bash
npm run pages:build
```

Sollte `.vercel/output/static/` erzeugen. Falls ja: perfekt, das ist was Cloudflare später baut.

---

## PROGRESS.md anlegen

Im Repo-Root:

```markdown
# Pentrarri Next — Fortschritt

## Etappe A — Setup, Designsystem, Home-Mockup
**Status:** ✅ Abgeschlossen am [DATUM]

- Next.js 14 + TypeScript + Tailwind + Framer Motion aufgesetzt
- Cloudflare-Adapter `@cloudflare/next-on-pages@1.13.15` konfiguriert
- Wrangler eingerichtet mit `nodejs_compat`
- Designsystem implementiert: Schwarz/Anthrazit + metallic Gold, Instrument Serif + Geist
- Layout-Komponenten: Header, Footer, Container
- Home-Mockup: Hero (Gold-Glow), Drei-Linien-Services-Sektion

**Nächste Etappe (B):** Cloudflare Pages live deployen + visuelles Feedback einarbeiten
```

Commit: `docs: progress-tracker etappe a`

---

## Push am Ende

```bash
git push -u origin main
```

Falls der Remote noch nicht existiert (gh-CLI hat das Repo nicht angelegt), gib Michael am Ende eine Mini-Anleitung. Sonst: push und fertig.

---

## Schluss-Bericht (an Michael)

Gib am Ende einen strukturierten Bericht mit:

1. **Was gebaut wurde** — kurze Bullet-Liste der Phasen
2. **Commits** — wieviele, mit Messages
3. **Server-URL lokal** — `http://localhost:3000` (lass den Server laufen!)
4. **Was schiefging** — ehrlich, auch Kleinkram
5. **Was Michael testen soll** — Desktop + echtes Handy (nicht nur Mac DevTools-Mobile!)
6. **GitHub-Repo-Status** — angelegt + gepusht, oder muss Michael manuell anlegen?
7. **Nächste Schritte** — Michael muss Cloudflare Pages manuell verbinden (Anleitung folgt von ihm separat)

---

## Was du NICHT in Etappe A tust

- ❌ Keine Hochzeit-Demos (Anna&Tim, Lisa&Jonas) bauen — kommt später
- ❌ Keine SaaS-Demo-Mockups bauen — kommt später (eigene Etappe)
- ❌ Kein Kontaktformular bauen — kommt mit eigener Etappe (Cloudflare Worker + Resend)
- ❌ Keine Impressum/Datenschutz-Seiten — Texte fehlen, kommen später
- ❌ Keine SEO-Redirects (`/hochzeit/*`) konfigurieren — Bestand ist noch im alten Repo, Redirects kommen erst beim Domain-Cutover
- ❌ Keine Cloudflare-Pages-Verbindung herstellen — das macht Michael manuell nach deinem Schluss-Bericht
- ❌ Keine Texte über Pentrarri-Pakete oder Preise — alles ist "auf Anfrage", keine Listenpreise
- ❌ Keine Logos einbauen (kein Pferd, keine Wordmark-SVG) — Wordmark "Pentrarri" als Text reicht für Etappe A

---

## Verhaltensregeln (gilt für alle Etappen)

- **Stelle Rückfragen NUR bei echter Mehrdeutigkeit.** Bei Designs-Kleinigkeiten entscheide selbst nach den Token-Werten und der Premium/Edel-Tonalität.
- **Niemals erfundene Inhalte.** Wenn dir ein Wert fehlt, nutze Platzhalter und markiere klar in der Console oder im Schluss-Bericht.
- **Conventional Commits auf Deutsch.** Z.B. `feat: drei-linien-services-komponente`.
- **Nicht pushen wenn Build failed.** Erst fix, dann push.
- **Server am Ende laufen lassen** auf Port 3000, damit Michael direkt testen kann.

Los geht's. Saubere Arbeit, Schritt für Schritt.

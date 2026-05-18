# Pentrarri Next — Etappe C: Wordmark, Polish, Routing, SaaS-Mockup "Sartoria Hub"

## Kontext

Etappe B ist live auf `pentrarri-next.pages.dev`. Michael hat Feedback gegeben:

1. **Logo war missverstanden:** Pferd-Logo soll raus. Stattdessen eleganter Wordmark "Pentrarri — GROUP" inline mit Gold-Akzent auf "GROUP".
2. **Polish-Tweaks** (kleine Sachen): bg-elevated noch etwas heller, Mono-Stats-Separatoren verbessern.
3. **Erste Showcase-Demo bauen:** Fiktives SaaS-Mockup "Sartoria Hub" für die fiktive Maßatelier "Falcone Sartoria". Soll begehbar und edel-tech wirken — der Differenzierungs-Move für die SaaS-Positionierung.

Etappe C ist die erste **Inhalts-Etappe** — wir bauen tatsächlichen Showcase-Content, nicht nur Infrastruktur.

---

## Was bleibt unangetastet

- Stack (Next.js 14 + TS + Tailwind + Framer Motion + Cloudflare Edge)
- Designsystem (Farben, Schriften — Inter + JetBrains Mono — bleiben)
- Layout-Komponenten (Container, Footer)
- Hero (Mono-Stats, TextReveal, Parallax)
- Services-Sektion
- Custom Cursor

---

## Phasen

7 Phasen, sauber von oben nach unten. Commit nach jeder Phase einzeln.

---

### Phase 1 — Wordmark-Refactor + Polish-Tweaks

#### 1.1 — Header: Wordmark statt Logo-Bild

`src/components/Header.tsx` — den `<Link>` mit dem Logo komplett ersetzen durch einen typografischen Wordmark:

```typescript
<Link
  href="/"
  className="group flex items-center gap-3 transition-opacity hover:opacity-80"
>
  <span className="font-sans text-base font-medium tracking-tight text-ink">
    Pentrarri
  </span>
  <span className="font-mono text-xs text-ink-muted transition-colors group-hover:text-ink-muted">
    —
  </span>
  <span className="font-mono text-xs font-medium uppercase tracking-mono-label text-gold transition-colors group-hover:text-gold-glow">
    Group
  </span>
</Link>
```

**Wichtig:**
- Das alte `<Image src="/logo.webp" ...>` und der `<div className="relative h-7 w-7">` Wrapper komplett raus
- `import Image from 'next/image';` Zeile in `Header.tsx` entfernen (sonst Lint-Warning unused import)
- `public/logo.webp` lassen wir liegen — kann später wieder gebraucht werden, ist nur 11kb

#### 1.2 — bg-elevated noch heller

In `tailwind.config.ts`, im `colors`-Block:

```typescript
bg: {
  DEFAULT: '#0a0a0a',
  elevated: '#1a1a1a',  // war #161616 — noch heller für sichtbarere Sektionsabgrenzung
  soft: '#202020',
},
```

#### 1.3 — Mono-Stats-Leiste mit klareren Separators

`src/components/Hero.tsx` — die Mono-Stats-Leiste am Ende ersetzen durch eine Version mit `·` zwischen jedem Stat statt nur Whitespace:

Suche den Block:

```tsx
<motion.div ... className="... border-t border-ink-soft/30 pt-8 ...">
  <div className="flex items-center gap-2">
    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
    Live aus Butzbach
  </div>
  <div>
    <span className="text-ink">99.9%</span> Uptime
  </div>
  ...
</motion.div>
```

Ersetze den **inneren Inhalt** (die vier `<div>`-Blöcke) durch:

```tsx
<div className="flex items-center gap-2">
  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
  <span>Live aus Butzbach</span>
</div>
<span className="text-ink-soft">·</span>
<div>
  <span className="text-ink">99.9%</span> Uptime
</div>
<span className="text-ink-soft">·</span>
<div>
  <span className="text-ink">Edge</span> Performance
</div>
<span className="text-ink-soft">·</span>
<div>
  <span className="text-ink">DSGVO</span> Self-Hosted
</div>
```

Die `·`-Separators als eigene `<span>` Elemente — dann sind die Stats klar getrennt, nicht als zwei-Wort-Begriffe interpretierbar.

Commit: `feat: wordmark pentrarri group inline + polish-tweaks (bg-elevated, mono-separators)`

---

### Phase 2 — Routing-Setup für Showcase

#### 2.1 — Ordnerstruktur anlegen

```
src/app/showcase/
├── page.tsx                      ← Showcase-Übersicht
└── sartoria-hub/
    └── page.tsx                  ← Erste Demo
```

#### 2.2 — Showcase-Übersicht: `src/app/showcase/page.tsx`

```typescript
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/Container';

export const metadata: Metadata = {
  title: 'Showcase — Pentrarri',
  description: 'Live-Demonstrationen unserer Arbeit. SaaS-Mockups, Webseiten, Editorial-Projekte.',
};

const demos = [
  {
    slug: 'sartoria-hub',
    label: 'SaaS · Internal Tool',
    title: 'Sartoria Hub',
    subtitle: 'Order Management für eine fiktive Maßmanufaktur.',
    description:
      'Internes Tool für eine fiktive Premium-Maßatelier. Pipeline-Management, Kundenakten, Stoff-Inventar. Begehbar, interaktiv, mit Mock-Daten.',
    tech: ['Next.js', 'TypeScript', 'Edge'],
    status: 'Live',
  },
  // Platzhalter für kommende Demos
];

export default function ShowcasePage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-32 md:pt-40">
        <Container>
          <p className="label-mono mb-6">
            <span className="text-gold">●</span>{' '}
            <span className="text-ink-muted">SHOWCASE · DEMOS</span>
          </p>
          <h1 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Begehbare Demos. <span className="display-accent">Klickbar, scrollbar.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Statt Folien zeigen wir lieber das Produkt. Hier finden Sie fiktive Tools
            und Webseiten, die unsere Arbeitsweise sichtbar machen.
          </p>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            {demos.map((demo) => (
              <Link
                key={demo.slug}
                href={`/showcase/${demo.slug}`}
                className="group block border-t border-ink-soft/30 pt-8 transition-colors hover:border-gold/40"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-mono-label text-gold">
                    {demo.label}
                  </p>
                  <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    {demo.status}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  {demo.title}
                </h2>
                <p className="mt-3 text-base text-ink-muted">
                  {demo.subtitle}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                  {demo.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {demo.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink-soft/50 bg-bg-soft px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-ink-muted transition-colors group-hover:text-gold">
                    Demo öffnen
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
```

Commit: `feat: showcase-uebersicht-seite unter /showcase`

---

### Phase 3 — Mock-Daten für Sartoria Hub

Neue Datei `src/data/sartoria-hub.ts`:

```typescript
export const sartoriaData = {
  brand: {
    name: 'Falcone Sartoria',
    tagline: 'Maßatelier · Anzüge · Lederwaren',
    location: 'Mailand · München · Berlin',
  },
  kpis: [
    { label: 'Aktive Aufträge', value: '47', delta: '+12%', period: 'vs. Q3', positive: true },
    { label: 'Umsatz Q4', value: '€384.200', delta: '+8.4%', period: 'vs. Q3', positive: true },
    { label: 'Ø Lieferzeit', value: '5.2 Wo', delta: '-0.8 Wo', period: 'vs. Q3', positive: true },
    { label: 'Kundenzufriedenheit', value: '98%', delta: '+2 pp', period: 'vs. Q3', positive: true },
  ],
  pipeline: [
    {
      status: 'Beratung',
      count: 8,
      orders: [
        { id: 'A-2026-184', customer: 'Klaus Berger', item: '2-Reiher Anzug', fabric: 'Loro Piana Wool 120s', updated: 'vor 2h' },
        { id: 'A-2026-185', customer: 'Sophie Wallenberg', item: 'Mantel', fabric: 'Holland & Sherry Cashmere', updated: 'vor 5h' },
        { id: 'A-2026-186', customer: 'Friedrich Brandt', item: 'Smoking', fabric: 'Reda Super 150s', updated: 'gestern' },
      ],
    },
    {
      status: 'Erstmaß',
      count: 6,
      orders: [
        { id: 'A-2026-178', customer: 'Maximilian von Hertzberg', item: '3-Teiler', fabric: 'Loro Piana Vicuña', updated: 'vor 1h' },
        { id: 'A-2026-179', customer: 'Anna Linde', item: 'Hosenanzug', fabric: 'Solbiati Linen', updated: 'gestern' },
      ],
    },
    {
      status: 'In Produktion',
      count: 18,
      orders: [
        { id: 'A-2026-152', customer: 'Heinrich Maier', item: 'Sakko', fabric: 'Ariston Wool', updated: 'vor 3h' },
        { id: 'A-2026-153', customer: 'Cornelia Reinhardt', item: 'Aktentasche', fabric: 'Alcantara Leder', updated: 'vor 1h' },
        { id: 'A-2026-154', customer: 'Stefan Hofmann', item: '2-Reiher', fabric: 'VBC Super 130s', updated: 'gestern' },
      ],
    },
    {
      status: 'Probe',
      count: 9,
      orders: [
        { id: 'A-2026-140', customer: 'Dr. Wolfgang Krenz', item: 'Anzug', fabric: 'Drago Sigaro', updated: 'vor 4h' },
        { id: 'A-2026-141', customer: 'Birgit Stadler', item: 'Kostüm', fabric: 'Loro Piana Tasmanian', updated: 'gestern' },
      ],
    },
    {
      status: 'Auslieferung',
      count: 6,
      orders: [
        { id: 'A-2026-128', customer: 'Andreas Köhler', item: '3-Teiler', fabric: 'Holland & Sherry Sherry Tweed', updated: 'vor 30min' },
      ],
    },
  ],
  activity: [
    { time: '14:32', actor: 'Sophie Wallenberg', action: 'Anprobe-Termin gebucht', target: 'A-2026-185', tone: 'info' as const },
    { time: '13:18', actor: 'Atelier München', action: 'Maßnahme abgeschlossen', target: 'A-2026-184', tone: 'success' as const },
    { time: '12:45', actor: 'Klaus Berger', action: 'Stoffauswahl bestätigt', target: 'A-2026-184', tone: 'success' as const },
    { time: '11:20', actor: 'System', action: 'Zahlungseingang verbucht', target: 'A-2026-152', tone: 'success' as const },
    { time: '09:58', actor: 'Anna Linde', action: 'Hat Termin verschoben', target: 'A-2026-179', tone: 'warning' as const },
    { time: '08:14', actor: 'Atelier Berlin', action: 'Bestellung freigegeben', target: 'A-2026-178', tone: 'info' as const },
  ],
};

export type SartoriaData = typeof sartoriaData;
```

Commit: `feat: mock-daten fuer sartoria-hub demo`

---

### Phase 4 — Sartoria Hub: Layout (Sidebar + TopBar + Demo-Banner)

#### 4.1 — Demo-Banner: `src/components/showcase/DemoBanner.tsx`

```typescript
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface DemoBannerProps {
  demoLabel: string;
  brandName: string;
}

export function DemoBanner({ demoLabel, brandName }: DemoBannerProps) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-gold/20 bg-bg/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-mono-label">
          <span className="rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-gold">
            DEMO
          </span>
          <span className="text-ink-muted">Pentrarri Showcase</span>
          <span className="hidden text-ink-soft md:inline">·</span>
          <span className="hidden text-ink md:inline">{demoLabel}</span>
        </div>
        <Link
          href="/showcase"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-mono-label text-ink-muted transition-colors hover:text-gold"
        >
          <span>←</span>
          <span className="hidden sm:inline">Zurück zur Übersicht</span>
          <span className="sm:hidden">Zurück</span>
        </Link>
      </div>
    </motion.div>
  );
}
```

#### 4.2 — Sidebar: `src/components/showcase/SartoriaSidebar.tsx`

```typescript
'use client';

import { useState } from 'react';
import { sartoriaData } from '@/data/sartoria-hub';

const navItems = [
  { icon: '▣', label: 'Dashboard', active: true },
  { icon: '⌗', label: 'Aufträge' },
  { icon: '○', label: 'Kunden' },
  { icon: '▦', label: 'Sartoria' },
  { icon: '◷', label: 'Termine' },
  { icon: '↗', label: 'Analytics' },
  { icon: '⚙', label: 'Einstellungen' },
];

export function SartoriaSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <aside className="hidden w-60 shrink-0 border-r border-ink-soft/30 lg:block">
      <div className="sticky top-12 px-6 py-8">
        {/* Brand Header */}
        <div className="mb-10">
          <div className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
            Falcone Sartoria
          </div>
          <div className="mt-1 text-xs text-ink-muted">
            {sartoriaData.brand.tagline}
          </div>
        </div>

        {/* Nav */}
        <nav>
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li key={item.label}>
                <button
                  onClick={() => setActiveIndex(i)}
                  className={`group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
                    i === activeIndex
                      ? 'bg-bg-elevated text-ink'
                      : 'text-ink-muted hover:bg-bg-elevated/50 hover:text-ink'
                  }`}
                >
                  <span
                    className={`font-mono text-base ${
                      i === activeIndex ? 'text-gold' : 'text-ink-soft group-hover:text-ink-muted'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-12 border-t border-ink-soft/30 pt-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gold/20 ring-1 ring-gold/40 flex items-center justify-center font-mono text-xs text-gold">
              SF
            </div>
            <div>
              <div className="text-sm font-medium text-ink">Sara Falcone</div>
              <div className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
                Atelier · München
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

#### 4.3 — TopBar: `src/components/showcase/SartoriaTopBar.tsx`

```typescript
'use client';

export function SartoriaTopBar() {
  return (
    <div className="sticky top-12 z-40 border-b border-ink-soft/30 bg-bg/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-6 md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-base font-medium text-ink md:text-lg">Dashboard</h1>
            <span className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
              · Mittwoch, 18.05.2026
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:block rounded-md border border-ink-soft/40 bg-bg-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted transition-colors hover:border-ink-muted hover:text-ink">
            ⌘ K · Suche
          </button>
          <button className="relative rounded-md p-2 text-ink-muted transition-colors hover:bg-bg-elevated hover:text-ink">
            <span className="block h-4 w-4">◷</span>
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          </button>
          <button className="rounded-md bg-gold px-4 py-1.5 text-sm font-medium text-bg transition-all hover:bg-gold-glow">
            + Neuer Auftrag
          </button>
        </div>
      </div>
    </div>
  );
}
```

Commit: `feat: sartoria hub layout (sidebar, topbar, demo-banner)`

---

### Phase 5 — Sartoria Hub: Dashboard-Inhalt

#### 5.1 — KPI-Cards: `src/components/showcase/SartoriaKpis.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { sartoriaData } from '@/data/sartoria-hub';

export function SartoriaKpis() {
  return (
    <div className="grid grid-cols-2 gap-px bg-ink-soft/30 lg:grid-cols-4">
      {sartoriaData.kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="group bg-bg p-6 transition-colors hover:bg-bg-elevated md:p-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
            {kpi.label}
          </p>
          <p className="mt-4 text-3xl font-light tracking-tight text-ink md:text-4xl">
            {kpi.value}
          </p>
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-mono-label">
            <span className={kpi.positive ? 'text-gold' : 'text-red-400'}>
              {kpi.delta}
            </span>
            <span className="text-ink-soft">{kpi.period}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

#### 5.2 — Pipeline-Kanban: `src/components/showcase/SartoriaPipeline.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { sartoriaData } from '@/data/sartoria-hub';

export function SartoriaPipeline() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
            Pipeline
          </p>
          <h2 className="mt-1 text-xl font-medium tracking-tight text-ink">
            Aktuelle Aufträge
          </h2>
        </div>
        <button className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted transition-colors hover:text-gold">
          Alle ansehen →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {sartoriaData.pipeline.map((column, columnIndex) => (
          <motion.div
            key={column.status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: columnIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between border-b border-ink-soft/30 pb-3">
              <span className="font-mono text-[10px] uppercase tracking-mono-label text-ink">
                {column.status}
              </span>
              <span className="rounded-full bg-bg-elevated px-2 py-0.5 font-mono text-[10px] text-ink-muted">
                {column.count}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2">
              {column.orders.map((order) => (
                <button
                  key={order.id}
                  className="group rounded-lg border border-ink-soft/30 bg-bg-elevated p-4 text-left transition-all hover:border-gold/30 hover:bg-bg-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                      {order.id}
                    </span>
                    <span className="font-mono text-[10px] text-ink-soft">
                      {order.updated}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-ink">
                    {order.customer}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">
                    {order.item}
                  </div>
                  <div className="mt-3 border-t border-ink-soft/20 pt-2 font-mono text-[10px] uppercase tracking-mono-label text-ink-soft transition-colors group-hover:text-ink-muted">
                    {order.fabric}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

#### 5.3 — Activity-Timeline: `src/components/showcase/SartoriaActivity.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { sartoriaData } from '@/data/sartoria-hub';

const toneColors = {
  success: 'bg-gold',
  warning: 'bg-amber-400',
  info: 'bg-ink-muted',
};

export function SartoriaActivity() {
  return (
    <div>
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
          Aktivität
        </p>
        <h2 className="mt-1 text-xl font-medium tracking-tight text-ink">
          Letzte Ereignisse
        </h2>
      </div>

      <div className="rounded-xl border border-ink-soft/30 bg-bg-elevated/50">
        {sartoriaData.activity.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`flex items-start gap-4 p-4 transition-colors hover:bg-bg-elevated ${
              i !== sartoriaData.activity.length - 1 ? 'border-b border-ink-soft/20' : ''
            }`}
          >
            <div className="flex flex-col items-center pt-1.5">
              <span
                className={`h-2 w-2 rounded-full ${toneColors[event.tone]}`}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm text-ink">{event.actor}</span>
                <span className="font-mono text-[10px] text-ink-soft">
                  {event.time}
                </span>
              </div>
              <div className="mt-0.5 text-xs text-ink-muted">
                {event.action}{' '}
                <span className="font-mono text-gold">{event.target}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

#### 5.4 — Demo-Page zusammenstecken: `src/app/showcase/sartoria-hub/page.tsx`

```typescript
import type { Metadata } from 'next';
import { DemoBanner } from '@/components/showcase/DemoBanner';
import { SartoriaSidebar } from '@/components/showcase/SartoriaSidebar';
import { SartoriaTopBar } from '@/components/showcase/SartoriaTopBar';
import { SartoriaKpis } from '@/components/showcase/SartoriaKpis';
import { SartoriaPipeline } from '@/components/showcase/SartoriaPipeline';
import { SartoriaActivity } from '@/components/showcase/SartoriaActivity';

export const metadata: Metadata = {
  title: 'Sartoria Hub · Demo — Pentrarri Showcase',
  description: 'Fiktives Order-Management-Tool für die Maßmanufaktur Falcone Sartoria. Begehbare Pentrarri-Demo.',
};

export default function SartoriaHubPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <DemoBanner demoLabel="Sartoria Hub" brandName="Falcone Sartoria" />

      <div className="flex">
        <SartoriaSidebar />

        <main className="flex-1 min-w-0">
          <SartoriaTopBar />

          <div className="space-y-12 p-6 pb-20 md:p-10">
            <SartoriaKpis />
            <SartoriaPipeline />
            <SartoriaActivity />
          </div>
        </main>
      </div>
    </div>
  );
}
```

**Wichtig:** Diese Seite hat **keinen Header** und **keinen Footer** von Pentrarri — sie ist eine Demo, die wie eine echte App wirken soll. Der `DemoBanner` oben ist der einzige Pentrarri-Bezug.

**Auch wichtig:** Custom Cursor läuft auf dieser Seite NICHT von selbst — er ist nur auf der Home eingebunden. Das ist okay, eine Software-Demo darf einen normalen Cursor haben. **Nicht** den Custom Cursor auf der Demo-Seite einbinden.

Commit: `feat: sartoria hub dashboard (kpis, pipeline, activity)`

---

### Phase 6 — Showcase-Preview-Sektion auf Home

#### 6.1 — Neue Komponente: `src/components/Showcase.tsx`

```typescript
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from './Container';

const featuredDemo = {
  slug: 'sartoria-hub',
  label: 'SaaS · Internal Tool',
  title: 'Sartoria Hub',
  subtitle: 'Order Management für eine fiktive Maßmanufaktur.',
  description:
    'Pipeline, Kundenakten, Stoff-Inventar — alles begehbar. Sehen Sie wie ein internes Tool für ein Premium-Atelier aussehen könnte.',
};

export function Showcase() {
  return (
    <section
      id="showcase"
      className="relative border-t border-ink-soft/20 py-32 md:py-40"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl"
        >
          <p className="label-mono mb-6">
            <span className="text-gold">●</span>{' '}
            <span className="text-ink-muted">SHOWCASE · BEGEHBAR</span>
          </p>
          <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Statt Folien.{' '}
            <span className="display-accent">Klickbare Demos.</span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink-muted">
            Wir zeigen lieber das Produkt als das Versprechen. Erkunden Sie ein
            fiktives Tool, das wir für eine Premium-Maßmanufaktur gebaut haben.
          </p>
        </motion.div>

        {/* Featured Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/showcase/${featuredDemo.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-ink-soft/30 bg-bg-elevated transition-all hover:border-gold/40"
          >
            {/* Visual area - Mock-Preview des Dashboards */}
            <div className="relative aspect-[16/9] overflow-hidden border-b border-ink-soft/30">
              {/* Background-Glow */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-2/3 glow-gold opacity-50" />

              {/* Mock Dashboard Preview */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-2xl space-y-4">
                  {/* Mini KPIs */}
                  <div className="grid grid-cols-4 gap-2">
                    {['47', '€384k', '5.2 Wo', '98%'].map((v, i) => (
                      <div
                        key={i}
                        className="rounded-md border border-ink-soft/40 bg-bg/60 p-3 backdrop-blur-sm"
                      >
                        <div className="text-base font-light text-ink md:text-lg">
                          {v}
                        </div>
                        <div className="mt-1 font-mono text-[8px] uppercase tracking-mono-label text-gold">
                          ↑ +12%
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mini Pipeline */}
                  <div className="grid grid-cols-5 gap-1.5">
                    {['Beratung', 'Erstmaß', 'Produktion', 'Probe', 'Lieferung'].map(
                      (s, i) => (
                        <div
                          key={i}
                          className="rounded border border-ink-soft/30 bg-bg/40 p-2 backdrop-blur-sm"
                        >
                          <div className="font-mono text-[8px] uppercase tracking-mono-label text-ink-muted">
                            {s}
                          </div>
                          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-bg-soft">
                            <div
                              className="h-full bg-gold/60"
                              style={{ width: `${30 + i * 10}%` }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Info area */}
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-mono-label text-gold">
                  {featuredDemo.label}
                </p>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                  Live · Begehbar
                </span>
              </div>
              <h3 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                {featuredDemo.title}
              </h3>
              <p className="mt-3 text-base text-ink-muted">
                {featuredDemo.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {featuredDemo.description}
              </p>
              <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-mono-label text-gold transition-all group-hover:gap-5">
                <span>Demo öffnen</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Link zur Übersicht */}
        <div className="mt-12 text-center">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-ink-muted transition-colors hover:text-gold"
          >
            <span>Alle Demos ansehen</span>
            <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

#### 6.2 — In `src/app/page.tsx` einbinden

Zwischen `<Services />` und `<Footer />`:

```typescript
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Showcase } from '@/components/Showcase';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Services />
        <Showcase />
      </main>
      <Footer />
    </>
  );
}
```

Commit: `feat: showcase-preview-sektion auf home`

---

### Phase 7 — Build + Test + Push

```bash
npm run build
npm run pages:build
```

Beide müssen sauber durchlaufen. Falls TypeScript-Errors: fix die Imports und Types, dann nochmal.

**Selbst-Test-Checkliste:**

| Check | Erwartet |
|---|---|
| Wordmark im Header: "Pentrarri — GROUP" mit "GROUP" in Gold-Mono | ✅ |
| Kein Pferd-Logo mehr im Header | ✅ |
| Hero-Mono-Stats hat `·`-Separators zwischen Stats | ✅ |
| bg-elevated etwas heller → Services-Sektion deutlicher abgesetzt | ✅ |
| Showcase-Sektion auf Home: Mock-Preview-Card mit "Sartoria Hub" | ✅ |
| Klick auf Preview-Card → `/showcase/sartoria-hub` öffnet sich | ✅ |
| Auf `/showcase`: Übersichtsseite mit der einen Demo-Card | ✅ |
| Auf `/showcase/sartoria-hub`: Demo-Banner oben, Sidebar links, Dashboard rechts | ✅ |
| KPIs animiert reinfaden | ✅ |
| Pipeline-Karten zeigen Auftragsnummern, Namen, Stoffe | ✅ |
| Activity-Timeline mit farbigen Status-Dots | ✅ |
| "Zurück zur Übersicht" im Demo-Banner führt zu `/showcase` | ✅ |
| Mobile (DevTools 375px): Sidebar verschwindet (`lg:block`), Layout responsive | ✅ |
| Build & pages:build beide grün | ✅ |

**PROGRESS.md ergänzen:**

```markdown

## Etappe C — Wordmark, Polish, Showcase-Routing, SaaS-Mockup Sartoria Hub
**Status:** ✅ Abgeschlossen am [DATUM]

- Wordmark "Pentrarri — GROUP" inline mit Gold-Akzent ersetzt Pferd-Logo
- Polish: bg-elevated heller (#1a1a1a), Mono-Stats-Separators in Hero
- Routing-Setup für /showcase/* mit Übersichtsseite
- Demo-Banner-Komponente für alle künftigen Showcase-Demos
- Erste Showcase-Demo: "Sartoria Hub" — fiktives Order-Management für Falcone Sartoria (Maßmanufaktur)
  - Sidebar mit Navigation
  - TopBar mit Datum, Suche, Notifications, "+ Neuer Auftrag"
  - 4 KPI-Cards mit Mock-Daten
  - Pipeline-Kanban mit 5 Status-Spalten und 11 Aufträgen
  - Activity-Timeline mit 6 Events
- Mock-Daten in `src/data/sartoria-hub.ts`
- Showcase-Preview-Sektion auf Home mit Mock-Dashboard-Vorschau

**Nächste Etappe (D):** Nach Michaels Feedback — vermutlich Hochzeit-Demos rüberziehen oder weitere SaaS-Demo
```

**Push:**

```bash
git add -A
git commit -m "docs: progress-tracker etappe c"
git push
```

---

## Schluss-Bericht-Spezifikation

1. **Was gebaut wurde** — Phasen 1-7 kurz
2. **Wordmark-Status** — Pferd raus, Wordmark drin, sieht's gut aus?
3. **Sartoria-Hub-Status** — Sidebar + TopBar + KPIs + Pipeline + Activity alle gebaut + sichtbar?
4. **Commits** — Anzahl + Messages
5. **Build-Status**
6. **Push-Status**
7. **Was schiefging**
8. **Was Michael testen soll** — `localhost:3001` UND `pentrarri-next.pages.dev` nach Deploy

---

## Was du NICHT in Etappe C tust

- ❌ Keine echten Hochzeit-Demos (Anna&Tim, Lisa&Jonas) — kommt in Etappe D oder E
- ❌ Kein Kontaktformular bauen
- ❌ Keine zweite Showcase-Demo bauen
- ❌ Custom Cursor NICHT auf der Sartoria-Hub-Seite einbinden — die Demo soll wie eine echte App wirken, mit normalem Cursor
- ❌ Kein echtes Backend / keine echte API für die Demo — alles Mock-Daten

---

## Verhaltensregeln

- Bei Detail-Mehrdeutigkeit (welcher Icon, welche Spacing-Werte): entscheide nach Premium/Edel-Tonalität und Pentrarri-Designsystem
- Bei TypeScript-Errors: lieber Type strict halten als `any` benutzen
- Conventional Commits auf Deutsch
- Nicht pushen wenn Build fehlschlägt
- Server am Ende laufen lassen
- **WICHTIG:** Bevor du eine Komponente importierst, stelle sicher dass sie im selben oder vorherigen Commit angelegt wurde (damit kein "broken state"-Commit entsteht wie bei Etappe B)

Los geht's.

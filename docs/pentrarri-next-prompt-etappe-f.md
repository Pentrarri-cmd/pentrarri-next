# Pentrarri Next — Etappe F: Apple-Style Test-Landingpage unter `/v2`

## Kontext

Etappe E hat die Landingpage mit allen Story-Sektionen fertig gemacht. Michael findet das aktuelle Design "sehr nice" aber möchte eine **Test-Version mit aufwendigen Scroll-Animationen wie bei Apple**.

**Wichtig:** Die existierende `/`-Page bleibt **komplett unangetastet**. Alles Neue passiert in einer separaten Route `/v2` und einem neuen Unterordner `src/components/v2/`. So bleiben beide Versionen vergleichbar.

**Ziel:** Eine cinematic Erfahrung wo Scroll zur Bühne wird. 7 Sektionen, alle gepinnt mit `position: sticky`, jede mit eigener Scroll-Choreographie. Apple-Style: User scrollt, aber statt die Page nach oben zu schieben, transformiert sich der Inhalt der gepinnten Sektion.

---

## Technische Patterns (kritisch — lies das zuerst)

### Pinning-Pattern

Eine "lange" Sektion mit einem stuck Inner-Container:

```typescript
'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export function SectionV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });
  
  return (
    <section ref={ref} className="relative min-h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Inhalt der gepinnt bleibt */}
      </div>
    </section>
  );
}
```

`min-h-[300vh]` = User scrollt 3 Viewport-Heights, während Inner-Container 1 Viewport-Height bleibt gepinnt. Das gibt dem User Scroll-Zeit für die Choreographie.

### Horizontal-Scroll-Pattern

```typescript
const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

<motion.div style={{ x }} className="flex gap-8">
  {/* 4 Items side-by-side */}
</motion.div>
```

User scrollt vertikal, Items bewegen sich horizontal.

### Multi-Value-Transform

```typescript
// Card 1 ist sichtbar von Progress 0-0.4, fadet dann raus
const card1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
const card1Scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
```

### Wichtige Stolperfallen

- **Translate-Konflikt:** Wenn du `motion.div` mit `style={{ x, y }}` nutzt, NIEMALS gleichzeitig Tailwind `-translate-x-1/2 -translate-y-1/2` setzen. Stattdessen mit Flex-Parent zentrieren.
- **Overflow:** Pin-Container braucht `overflow-hidden` damit horizontal-scroll-Content nicht raus quillt.
- **Performance:** Maximal 2-3 simultane `useTransform`-Werte pro Element. Sonst läuft's auf weniger leistungsstarken Macs ruckelig.

---

## Phasen

8 Phasen, sauber von oben nach unten. Conventional Commits auf Deutsch. Bevor du eine Komponente importierst, stelle sicher dass sie im selben oder vorherigen Commit existiert (Stub-Strategie wie in Etappe D — Stub mit `return null` und korrekten Props).

---

### Phase 1 — Route + Skeleton + Stubs

#### 1.1 — Route anlegen

Neue Datei `src/app/v2/page.tsx`:

```typescript
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { HeroV2 } from '@/components/v2/HeroV2';
import { ServicesV2 } from '@/components/v2/ServicesV2';
import { WhyPentrarriV2 } from '@/components/v2/WhyPentrarriV2';
import { HowWeWorkV2 } from '@/components/v2/HowWeWorkV2';
import { ShowcaseV2 } from '@/components/v2/ShowcaseV2';
import { BehindPentrarriV2 } from '@/components/v2/BehindPentrarriV2';
import { ContactV2 } from '@/components/v2/ContactV2';

export const metadata: Metadata = {
  title: 'Pentrarri V2 · Cinematic Preview',
  description: 'Apple-Style Test-Version der Pentrarri Landingpage.',
};

export default function V2Page() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <HeroV2 />
        <ServicesV2 />
        <WhyPentrarriV2 />
        <HowWeWorkV2 />
        <ShowcaseV2 />
        <BehindPentrarriV2 />
        <ContactV2 />
      </main>
      <Footer />
    </>
  );
}
```

#### 1.2 — Stub-Files für alle 7 V2-Komponenten

In `src/components/v2/` jeweils:

```typescript
// HeroV2.tsx, ServicesV2.tsx, etc.
'use client';

export function HeroV2() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-bg">
      <p className="font-mono text-xs uppercase tracking-mono-label text-ink-muted">
        HeroV2 · Coming
      </p>
    </section>
  );
}
```

Pro Stub: gleiche Struktur, anderer Komponenten-Name. Damit Build sofort grün ist und Route /v2 erreichbar.

Commit: `feat: v2-route-skeleton mit stubs fuer alle sieben sektionen`

---

### Phase 2 — HeroV2 (pinned mit Scroll-Reveal-Text + Glow-Expansion)

`src/components/v2/HeroV2.tsx` ersetzen:

```typescript
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export function HeroV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // Eyebrow: schnell rein, schnell raus
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.45], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0, 0.1], [20, 0]);

  // Wort 1: "Digitale" - kommt von links
  const word1X = useTransform(scrollYProgress, [0.1, 0.25], ['-100px', '0px']);
  const word1Opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.85], [0, 1, 1, 0]);

  // Wort 2: "Produkte" - kommt von rechts
  const word2X = useTransform(scrollYProgress, [0.2, 0.35], ['100px', '0px']);
  const word2Opacity = useTransform(scrollYProgress, [0.2, 0.35, 0.7, 0.85], [0, 1, 1, 0]);

  // Wort 3: "mit Anspruch." (gold accent) - kommt von unten
  const word3Y = useTransform(scrollYProgress, [0.3, 0.5], [60, 0]);
  const word3Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.85], [0, 1, 1, 0]);

  // Body-Text: kommt zuletzt
  const bodyOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 0.95], [0, 1, 1, 0]);
  const bodyY = useTransform(scrollYProgress, [0.5, 0.65], [30, 0]);

  // CTAs: ganz am Ende
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.75, 0.85, 1], [0, 1, 1, 0.3]);
  const ctaY = useTransform(scrollYProgress, [0.6, 0.75], [20, 0]);

  // Glow: expandiert mit Progress
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 2.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.2]);

  return (
    <section ref={ref} className="relative min-h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Expanding Gold Glow */}
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute h-[600px] w-[600px] glow-gold"
        />
        {/* Purple Glow rechts subtil */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] glow-purple"
        />

        <div className="relative z-10 w-full max-w-5xl px-6 text-center md:px-10">
          {/* Eyebrow */}
          <motion.p
            style={{ opacity: eyebrowOpacity, y: eyebrowY }}
            className="label-mono mb-10 inline-flex"
          >
            <span className="text-gold">●</span>
            <span className="ml-2 text-ink-muted">PENTRARRI · 2026</span>
          </motion.p>

          {/* Headline mit 3 Words die nacheinander reveal'd werden */}
          <h1 className="text-display-xl font-sans font-light tracking-tighter text-ink">
            <motion.span
              style={{ x: word1X, opacity: word1Opacity }}
              className="inline-block"
            >
              Digitale
            </motion.span>{' '}
            <motion.span
              style={{ x: word2X, opacity: word2Opacity }}
              className="inline-block"
            >
              Produkte
            </motion.span>
            <br />
            <motion.span
              style={{ y: word3Y, opacity: word3Opacity }}
              className="display-accent inline-block"
            >
              mit Anspruch.
            </motion.span>
          </h1>

          {/* Body */}
          <motion.p
            style={{ opacity: bodyOpacity, y: bodyY }}
            className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
          >
            Pentrarri baut Webseiten und Software für Unternehmen, die mehr wollen
            als ein Template. Aus Butzbach. Für ganz Deutschland.
          </motion.p>

          {/* CTAs */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
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
              Was wir bauen →
            </a>
          </motion.div>
        </div>

        {/* Scroll-Hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted"
        >
          ↓ Scrollen
        </motion.div>
      </div>
    </section>
  );
}
```

Commit: `feat: hero-v2 mit pinned scroll-reveal und expandierendem glow`

---

### Phase 3 — ServicesV2 (pinned mit Card-Cycling)

`src/components/v2/ServicesV2.tsx`:

```typescript
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const services = [
  {
    number: '01',
    label: 'Webseiten',
    title: 'Maßgeschneidert.',
    description: 'Editorial-Anspruch, Performance-optimiert, Edge-deployed. Single-Page bis Multi-Page.',
    tags: ['Next.js', 'TypeScript', 'Edge'],
  },
  {
    number: '02',
    label: 'SaaS',
    title: 'Software auf Anfrage.',
    description: 'Dashboards, Tools, Custom-Plattformen. Wir bauen, was Sie nirgendwo fertig kaufen können.',
    tags: ['Custom Build', 'Realtime', 'API'],
  },
  {
    number: '03',
    label: 'Showcase',
    title: 'Demos zum Erkunden.',
    description: 'Live-Demonstrationen unserer Arbeit. Klicken, scrollen, ausprobieren.',
    tags: ['Live Demos', 'Interactive', 'Open'],
  },
];

export function ServicesV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // Section-Headline: zu Beginn sichtbar, fadet später raus
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);

  // Card 1: aktiv zwischen 0.15 und 0.4
  const c1Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.4, 0.45], [0, 1, 1, 0]);
  const c1Scale = useTransform(scrollYProgress, [0.15, 0.2, 0.4, 0.45], [0.85, 1, 1, 0.85]);

  // Card 2: aktiv zwischen 0.45 und 0.7
  const c2Opacity = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const c2Scale = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0.85, 1, 1, 0.85]);

  // Card 3: aktiv zwischen 0.75 und 1.0
  const c3Opacity = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 0.6]);
  const c3Scale = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0.85, 1, 1, 0.9]);

  const opacities = [c1Opacity, c2Opacity, c3Opacity];
  const scales = [c1Scale, c2Scale, c3Scale];

  return (
    <section id="leistungen" ref={ref} className="relative min-h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-bg-elevated">
        {/* Section-Headline */}
        <motion.div
          style={{ opacity: headlineOpacity }}
          className="absolute top-32 left-0 right-0 px-6 text-center md:px-10"
        >
          <p className="label-mono mb-4 inline-flex">
            <span className="text-gold">●</span>
            <span className="ml-2 text-ink-muted">LEISTUNGEN · DREI LINIEN</span>
          </p>
          <h2 className="text-display-md font-sans font-light tracking-tighter text-ink">
            Drei Linien. <span className="display-accent">Ein Anspruch.</span>
          </h2>
        </motion.div>

        {/* Cards stacked absolute, eine zur Zeit visible */}
        <div className="relative w-full max-w-3xl px-6 md:px-10">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              style={{ opacity: opacities[i], scale: scales[i] }}
              className="absolute inset-x-6 top-1/2 -translate-y-1/2 md:inset-x-10"
            >
              <div className="rounded-2xl border border-ink-soft/30 bg-bg p-12 md:p-16">
                <p className="font-mono text-7xl font-light text-gold/40 md:text-8xl">
                  {service.number}
                </p>
                <p className="mt-4 font-mono text-xs uppercase tracking-mono-label text-gold">
                  {service.label}
                </p>
                <h3 className="mt-6 text-3xl font-medium tracking-tight text-ink md:text-5xl">
                  {service.title}
                </h3>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
                  {service.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ink-soft/50 bg-bg-soft px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress-Indicator unten */}
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{ opacity: opacities[i] }}
              className="h-0.5 w-12 rounded-full bg-gold"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

Commit: `feat: services-v2 mit pinned card-cycling (eine card zur zeit)`

---

### Phase 4 — WhyPentrarriV2 (Horizontal Scroll Inside Vertical)

`src/components/v2/WhyPentrarriV2.tsx`:

```typescript
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'Maßgeschneidert.',
    description: 'Jede Zeile Code ist auf Ihr Unternehmen zugeschnitten. Kein gekaufter Theme, keine Drag-and-Drop-Lösung.',
  },
  {
    number: '02',
    title: 'Eine Person verantwortlich.',
    description: 'Sie sprechen direkt mit dem Builder. Keine Account-Manager, keine Übersetzer, keine Telefon-Schleifen.',
  },
  {
    number: '03',
    title: 'Webseite und Software vereint.',
    description: 'Marketing-Site und internes Tool? Beides aus einer Hand. Konsistente Codebasis, ein Ansprechpartner.',
  },
  {
    number: '04',
    title: 'Premium-Stack mit langer Halbwertszeit.',
    description: 'Next.js, TypeScript, Cloudflare Edge. Performance-optimiert, DSGVO-konform, gebaut für die nächsten fünf Jahre.',
  },
];

export function WhyPentrarriV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // Map vertikalen Scroll zu horizontaler Translation
  // 4 Pillars, jede 80vw breit, also Translation von 0 zu -240vw (3 Pillars weit)
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-240vw']);
  
  // Header bleibt sichtbar fast die ganze Zeit
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.3]);

  return (
    <section id="warum" ref={ref} className="relative min-h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-bg">
        {/* Sticky Header oben */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-32 left-0 right-0 px-6 text-center md:px-10 z-10"
        >
          <p className="label-mono mb-4 inline-flex">
            <span className="text-gold">●</span>
            <span className="ml-2 text-ink-muted">WARUM PENTRARRI · VIER GRÜNDE</span>
          </p>
          <h2 className="text-display-md font-sans font-light tracking-tighter text-ink">
            Anders als die <span className="display-accent">Standard-Agentur.</span>
          </h2>
        </motion.div>

        {/* Horizontal scrollender Container */}
        <div className="flex flex-1 items-center">
          <motion.div style={{ x }} className="flex shrink-0">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="flex h-screen w-screen shrink-0 items-center justify-center px-12 md:px-24"
              >
                <div className="max-w-3xl">
                  <p className="font-mono text-7xl font-light text-gold/30 md:text-9xl">
                    {pillar.number}
                  </p>
                  <h3 className="mt-8 text-4xl font-medium tracking-tight text-ink md:text-6xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress Bar unten */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-0.5 w-32 overflow-hidden rounded-full bg-ink-soft/30">
          <motion.div
            style={{ scaleX: scrollYProgress, originX: 0 }}
            className="h-full w-full bg-gold"
          />
        </div>
      </div>
    </section>
  );
}
```

Commit: `feat: warum-pentrarri-v2 mit horizontal-scroll im pinned-container`

---

### Phase 5 — HowWeWorkV2 (Number-Morph)

`src/components/v2/HowWeWorkV2.tsx`:

```typescript
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const steps = [
  { number: '01', duration: '30-45 Minuten', title: 'Anfrage & Erstgespräch', description: 'Sie schildern Ihr Vorhaben. Wir hören zu, fragen nach, klären den Rahmen. Kostenfrei, unverbindlich.' },
  { number: '02', duration: '3-5 Werktage', title: 'Konzept & Festpreis', description: 'Schriftliche Empfehlung: Stack, Sektionen, Lieferdatum, Festpreis. Keine Stunden-Abrechnung.' },
  { number: '03', duration: '2-8 Wochen', title: 'Sprint-Bau in Etappen', description: 'Wir bauen in 1-2-Wochen-Sprints. Live-Vorschau nach jeder Etappe, Feedback, Iteration.' },
  { number: '04', duration: '1-2 Tage', title: 'Launch & Übergabe', description: 'Domain, Hosting, Dokumentation. Voller Quellcode-Zugriff. Keine Abhängigkeit.' },
  { number: '05', duration: 'Optional', title: 'Support & Iteration', description: 'Bei Bedarf bleiben wir dran — Updates, neue Features, neue Sprints.' },
];

export function HowWeWorkV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // 5 Steps gleichmäßig verteilt: jeder Step bekommt 0.2 Progress
  const opacities = steps.map((_, i) => {
    const start = i * 0.18;
    const peak1 = start + 0.04;
    const peak2 = start + 0.16;
    const end = start + 0.2;
    return useTransform(scrollYProgress, [start, peak1, peak2, end], [0, 1, 1, 0]);
  });

  const ys = steps.map((_, i) => {
    const start = i * 0.18;
    const peak = start + 0.04;
    return useTransform(scrollYProgress, [start, peak], [40, 0]);
  });

  return (
    <section id="prozess" ref={ref} className="relative min-h-[500vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-bg-elevated">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          {/* Section-Header oben statisch */}
          <div className="absolute top-32 left-0 right-0 px-6 text-center md:px-10">
            <p className="label-mono mb-4 inline-flex">
              <span className="text-gold">●</span>
              <span className="ml-2 text-ink-muted">PROZESS · FÜNF SCHRITTE</span>
            </p>
            <h2 className="text-display-md font-sans font-light tracking-tighter text-ink">
              Wie wir arbeiten. <span className="display-accent">Transparent.</span>
            </h2>
          </div>

          {/* Steps absolute - eine zur Zeit visible */}
          <div className="relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                style={{ opacity: opacities[i], y: ys[i] }}
                className="absolute inset-0 grid grid-cols-12 items-center gap-6"
              >
                {/* Giant Number links */}
                <div className="col-span-12 md:col-span-5">
                  <p className="font-mono text-[180px] font-light leading-none text-gold/40 md:text-[260px]">
                    {step.number}
                  </p>
                </div>

                {/* Content rechts */}
                <div className="col-span-12 md:col-span-7">
                  <p className="font-mono text-xs uppercase tracking-mono-label text-gold">
                    {step.duration}
                  </p>
                  <h3 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
                    {step.title}
                  </h3>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress-Pills unten */}
          <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-2">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                style={{ opacity: opacities[i] }}
                className="h-0.5 w-8 rounded-full bg-gold"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

Commit: `feat: how-we-work-v2 mit number-morph und sequential step-reveal`

---

### Phase 6 — ShowcaseV2 (Card Scale-on-Scroll)

`src/components/v2/ShowcaseV2.tsx`:

```typescript
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';

export function ShowcaseV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // Card scaled from 0.5 (zoomed out) → 1.0 (final) → leicht zurück
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.95]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [25, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.6]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section id="showcase" ref={ref} className="relative min-h-[250vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-bg">
        {/* Header */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-32 left-0 right-0 px-6 text-center md:px-10"
        >
          <p className="label-mono mb-4 inline-flex">
            <span className="text-gold">●</span>
            <span className="ml-2 text-ink-muted">SHOWCASE · BEGEHBAR</span>
          </p>
          <h2 className="text-display-md font-sans font-light tracking-tighter text-ink">
            Statt Folien. <span className="display-accent">Klickbare Demos.</span>
          </h2>
        </motion.div>

        {/* Card flying in with 3D */}
        <motion.div
          style={{ scale, rotateX, opacity, perspective: 1200 }}
          className="w-full max-w-4xl px-6 md:px-10"
        >
          <Link
            href="/showcase/sartoria-hub"
            className="group relative block overflow-hidden rounded-2xl border border-ink-soft/30 bg-bg-elevated transition-colors hover:border-gold/40"
          >
            {/* Mock dashboard preview */}
            <div className="relative aspect-[16/9] overflow-hidden border-b border-ink-soft/30">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-2/3 glow-gold opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-2xl space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {['47', '€384k', '5.2 Wo', '98%'].map((v, i) => (
                      <div key={i} className="rounded-md border border-ink-soft/40 bg-bg/60 p-3 backdrop-blur-sm">
                        <div className="text-base font-light text-ink md:text-lg">{v}</div>
                        <div className="mt-1 font-mono text-[8px] uppercase tracking-mono-label text-gold">↑ +12%</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['Beratung', 'Erstmaß', 'Produktion', 'Probe', 'Lieferung'].map((s, i) => (
                      <div key={i} className="rounded border border-ink-soft/30 bg-bg/40 p-2 backdrop-blur-sm">
                        <div className="font-mono text-[8px] uppercase tracking-mono-label text-ink-muted">{s}</div>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-bg-soft">
                          <div className="h-full bg-gold/60" style={{ width: `${30 + i * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-mono-label text-gold">
                SaaS · Internal Tool
              </p>
              <h3 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Sartoria Hub
              </h3>
              <p className="mt-3 text-base text-ink-muted">
                Order Management für eine fiktive Maßmanufaktur.
              </p>
              <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-mono-label text-gold transition-all group-hover:gap-5">
                <span>Demo öffnen</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

Commit: `feat: showcase-v2 mit card-3d-scale-on-scroll`

---

### Phase 7 — BehindPentrarriV2 + ContactV2

#### 7.1 — BehindPentrarriV2 (Sentence-by-Sentence Reveal)

`src/components/v2/BehindPentrarriV2.tsx`:

```typescript
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const sentences = [
  'Ich bin Michael Grigorchuk, Gründer und Builder hinter Pentrarri.',
  'Seit 2019 baue ich Webseiten und Software aus Butzbach heraus — für Unternehmen, die mehr wollen als ein Template.',
  'Pentrarri ist mein Versuch, eine andere Art Software-Agentur zu sein.',
  'Ich arbeite alleine — nicht weil mir das Budget für ein Team fehlt, sondern weil Premium-Arbeit durch direkte Beziehungen entsteht.',
  'Wenn Sie mich beauftragen, sprechen Sie mit der Person, die Ihren Code schreibt.',
];

export function BehindPentrarriV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0.3]);

  // Jeder Satz hat einen eigenen Reveal-Bereich
  const sentenceOpacities = sentences.map((_, i) => {
    const start = 0.1 + i * 0.13;
    return useTransform(scrollYProgress, [start, start + 0.05], [0.15, 1]);
  });

  const sentenceScales = sentences.map((_, i) => {
    const start = 0.1 + i * 0.13;
    return useTransform(scrollYProgress, [start, start + 0.05], [0.95, 1]);
  });

  return (
    <section id="ueber" ref={ref} className="relative min-h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-bg">
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-32 left-0 right-0 px-6 text-center md:px-10"
        >
          <p className="label-mono mb-4 inline-flex">
            <span className="text-gold">●</span>
            <span className="ml-2 text-ink-muted">HINTER PENTRARRI · DIE PERSON</span>
          </p>
          <h2 className="text-display-md font-sans font-light tracking-tighter text-ink">
            Eine Person. <span className="display-accent">Nicht eine Agentur.</span>
          </h2>
        </motion.div>

        <div className="w-full max-w-4xl px-6 md:px-10">
          <div className="space-y-6">
            {sentences.map((sentence, i) => (
              <motion.p
                key={i}
                style={{ opacity: sentenceOpacities[i], scale: sentenceScales[i] }}
                className={
                  i === 0
                    ? 'text-2xl text-ink md:text-3xl'
                    : 'text-lg leading-relaxed text-ink-muted md:text-xl'
                }
              >
                {sentence}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### 7.2 — ContactV2 (Glow-Expansion + slide-in CTAs)

`src/components/v2/ContactV2.tsx`:

```typescript
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export function ContactV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1.5, 2.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.4]);

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0.8]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.1, 0.5], [0.9, 1, 1.05]);

  const emailX = useTransform(scrollYProgress, [0.3, 0.55], ['-100%', '0%']);
  const emailOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

  const phoneX = useTransform(scrollYProgress, [0.4, 0.65], ['100%', '0%']);
  const phoneOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);

  const footerOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  return (
    <section id="kontakt" ref={ref} className="relative min-h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-bg-elevated">
        {/* Massive Glow */}
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute h-[600px] w-[600px] glow-gold"
        />

        <div className="relative z-10 w-full max-w-4xl px-6 text-center md:px-10">
          <motion.div style={{ opacity: headlineOpacity, scale: headlineScale }}>
            <p className="label-mono mb-6 inline-flex">
              <span className="text-gold">●</span>
              <span className="ml-2 text-ink-muted">KONTAKT · BEREIT WENN SIE ES SIND</span>
            </p>
            <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
              Lassen Sie uns über Ihr{' '}
              <span className="display-accent">Projekt sprechen.</span>
            </h2>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-3xl gap-4 md:grid-cols-2">
            <motion.a
              href="mailto:info@pentrarri.com"
              style={{ x: emailX, opacity: emailOpacity }}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-ink-soft/30 bg-bg p-8 text-left transition-all hover:border-gold/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                Per E-Mail
              </p>
              <div className="flex items-center gap-3 text-xl font-medium text-ink md:text-2xl">
                <span>info@pentrarri.com</span>
                <span className="text-gold transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.a>

            <motion.a
              href="tel:+4915233874863"
              style={{ x: phoneX, opacity: phoneOpacity }}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-ink-soft/30 bg-bg p-8 text-left transition-all hover:border-gold/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                Per Telefon
              </p>
              <div className="flex items-center gap-3 text-xl font-medium text-ink md:text-2xl">
                <span>+49 152 3387 4863</span>
                <span className="text-gold transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.a>
          </div>

          <motion.p
            style={{ opacity: footerOpacity }}
            className="mt-16 font-mono text-xs uppercase tracking-mono-label text-ink-muted"
          >
            Aus Butzbach · Für ganz Deutschland · DSGVO-konform
          </motion.p>
        </div>
      </div>
    </section>
  );
}
```

Commit: `feat: behind-v2 sentence-reveal und contact-v2 glow-expansion`

---

### Phase 8 — Build, PROGRESS.md, Push

```bash
npm run build
npm run pages:build
```

Beide grün-Pflicht.

**Selbst-Test-Checkliste:**

| Check | Erwartet |
|---|---|
| `/` rendert weiter normal mit allen V1-Sektionen | ✅ |
| `/v2` rendert komplette cinematic Version | ✅ |
| Hero V2: 3 Wörter sliden nacheinander rein, Glow expandiert | ✅ |
| Services V2: 3 Cards cyclen durch, eine zur Zeit zentriert | ✅ |
| Warum V2: Pillars scrollen horizontal beim vertikalen Scroll | ✅ |
| Prozess V2: Riesige Numbers wechseln 01→02→03→04→05 | ✅ |
| Showcase V2: Card "fliegt rein" mit 3D-Rotation | ✅ |
| Behind V2: Sätze faden nacheinander rein/heller | ✅ |
| Kontakt V2: Glow expandiert massiv, CTAs sliden von links/rechts | ✅ |
| Gesamte Page scrollt ~12-15 Viewport-Heights | ✅ |
| Keine horizontale Scrollbar (außer in Why-Section internal) | ✅ |
| Build durch ohne TypeScript-Fehler | ✅ |

**PROGRESS.md ergänzen:**

```markdown

## Etappe F — Apple-Style Cinematic Test-Version unter /v2
**Status:** ✅ Abgeschlossen am [DATUM]

- Komplette zweite Landingpage-Variante unter `/v2` parallel zur produktiven `/`
- 7 Sektionen, alle gepinnt mit position:sticky und Scroll-Choreographie
- HeroV2: 3 Wörter sliden nacheinander rein, Glow expandiert
- ServicesV2: Card-Cycling, eine Service-Card zur Zeit zentriert
- WhyPentrarriV2: Horizontal-Scroll innerhalb vertikalem Pinning
- HowWeWorkV2: Sequential Step-Reveal mit gigantischen Mono-Numbers
- ShowcaseV2: Sartoria-Hub-Card mit 3D-Scale-Effekt
- BehindPentrarriV2: Sentence-by-Sentence Reveal
- ContactV2: Massiv expandierender Glow + slide-in CTAs

**Limitations:**
- Mobile-Verhalten nicht optimiert — Pinning + Horizontal-Scroll auf iOS Safari kann unsauber sein
- Reduced-Motion-Fallback noch nicht implementiert

**Nächste Etappe (G):** Nach Michaels Feedback — entweder /v2 Polish, Mobile-Optimierung, oder zurück zu /-Polish/Formular
```

**Push:**

```bash
git add -A
git commit -m "docs: progress-tracker etappe f"
git push
```

Server laufen lassen.

---

## Schluss-Bericht (an Michael)

1. **Was gebaut wurde** — Phasen 1-8 kurz
2. **Route-Status** — `/v2` erreichbar? `/` unverändert?
3. **Animation-Highlights** — was funktioniert besonders smooth, was wirkt eventuell unfertig
4. **Commits** — Anzahl + Messages
5. **Build-Status**
6. **Push-Status**
7. **Was schiefging** — auch Kleinkram, besonders Performance-Beobachtungen
8. **Was Michael testen soll** — **LANGSAM SCROLLEN** durch beide Pages, vergleichen. Desktop priorisieren, Mobile nicht garantiert sauber.

---

## Was du NICHT in Etappe F tust

- ❌ V1-Sektionen unter `/` anfassen (komplett unangetastet lassen)
- ❌ Reduced-Motion-Fallback implementieren (kommt in eigener Etappe falls /v2 angenommen wird)
- ❌ Mobile-Optimierung perfektionieren (Apple-Style funktioniert auf Mobile eh anders, kommt später)
- ❌ Three.js, Frame-by-Frame-Sequenzen, WebGL-Effekte
- ❌ Neue Sektionen erfinden — Inhalt bleibt 1:1 wie auf V1, nur Präsentation ändert sich

---

## Verhaltensregeln

- **WICHTIG:** Niemals `style={{ x, y }}` mit Tailwind `-translate-x-1/2 -translate-y-1/2` mischen (siehe Memory: Framer Motion + Tailwind Translate-Konflikt). Stattdessen Flex-Parent oder absolute Position.
- Bei Detail-Mehrdeutigkeit (Easing-Werte, Scroll-Trigger-Points): entscheide selbst — wir wollen "smooth Apple-Feel", nicht "ruckartig spannend"
- Conventional Commits auf Deutsch
- Nicht pushen wenn Build fehlschlägt
- Komponenten zuerst, dann Imports (kein "broken state"-Commit)
- Server am Ende laufen lassen
- Falls TypeScript meckert wegen `useTransform`-Type-Issues: pragmatisch mit `as any` arbeiten, strict-types-Refactor kommt in eigener Etappe

Los geht's. Das wird die ambitionierteste Etappe — gönn dir Zeit, mach es sauber. Es ist OK wenn nicht alles perfekt smooth läuft beim ersten Mal — es ist eine Test-Version.

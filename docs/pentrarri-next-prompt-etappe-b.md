# Pentrarri Next — Etappe B: Schriftwechsel, Apple-Animation, Logo, Polish

## Kontext

Etappe A ist live auf `pentrarri-next.pages.dev`. Michael hat sich die Seite angeschaut und drei klare Punkte gegeben:

1. **Schriften wechseln** auf Tech-Modern (Inter + JetBrains Mono, **keine Italic-Serif mehr** — Instrument Serif raus)
2. **Animation aufdrehen** auf Apple-poliert (Custom Cursor, Text-Reveal, Parallax, Smooth Scroll Transforms)
3. **Logo einbauen** (Pferd-Logo aus altem Pentrarri-Repo, links oben kombiniert mit Wordmark)
4. **Plus Polish** den ich (Claude) auch sehe: Body-Text-Kontrast, größere Card-Numbers, Sektionsabgrenzung

Etappe B ist eine **gezielte Fix-Iteration**, kein Neubau. Bestehende Architektur bleibt.

---

## Stack-Updates

- **Raus:** `geist` Paket, Instrument Serif von `next/font/google`
- **Rein:** Inter + JetBrains_Mono via `next/font/google`

---

## Phasen

Arbeite Phase 1-7 von oben nach unten. Commit nach jeder Phase einzeln mit Conventional Commit auf Deutsch.

---

### Phase 1 — Schriften komplett wechseln

#### 1.1 — Geist-Paket entfernen

```bash
npm uninstall geist
```

#### 1.2 — Neue `src/app/fonts.ts`

Ersetze den Inhalt komplett:

```typescript
import { Inter, JetBrains_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

#### 1.3 — `src/app/layout.tsx` anpassen

Imports ändern auf `inter, jetbrainsMono`. Im `<html>` className:

```typescript
<html
  lang="de"
  className={`${inter.variable} ${jetbrainsMono.variable}`}
>
```

(Instrument Serif, Geist Sans, Geist Mono Imports und Variablen raus.)

#### 1.4 — `tailwind.config.ts` anpassen

Im `fontFamily`-Block:

```typescript
fontFamily: {
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace'],
},
```

(`display` und `sans` zeigen jetzt beide auf Inter — keine Serif mehr. Die Optical Size kommt durch Größe und Weight, nicht durch andere Schrift.)

#### 1.5 — `globals.css` aufräumen

Im `@layer components` Block:
- `.display-italic` Klasse **komplett entfernen**
- Neue Klasse `.display-accent` hinzufügen:

```css
.display-accent {
  @apply text-gold;
  font-feature-settings: 'ss01', 'cv11';
}
```

Commit: `feat: schriftwechsel auf inter + jetbrains mono (instrument serif raus)`

---

### Phase 2 — Designsystem-Token-Updates (Kontrast & Hierarchie)

#### 2.1 — `tailwind.config.ts` — Farb-Tokens aktualisieren

Im `colors`-Block:

```typescript
colors: {
  bg: {
    DEFAULT: '#0a0a0a',
    elevated: '#161616',  // war #141414 — heller für besseres Layering
    soft: '#202020',      // war #1c1c1c
  },
  ink: {
    DEFAULT: '#f5f5f5',
    muted: '#a0a0a0',     // war #888888 — heller für besseren Body-Kontrast
    soft: '#666666',      // war #555555 — heller für sichtbarere Borders
  },
  gold: {
    DEFAULT: '#d4af37',
    glow: '#f0d878',
    dim: '#8a7228',       // NEU: gedämpftes Gold für dezente Akzente
  },
  glow: {
    purple: '#6b46c1',
  },
},
```

#### 2.2 — Display-Sizes etwas zurückdrehen

Im `fontSize`-Block:

```typescript
fontSize: {
  'display-xl': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
  'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
  'display-md': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
},
```

(Tighter letter-spacing für Inter = Premium-Tech-Feel. Größen etwas kleiner = nicht mehr "Hochzeitsmagazin-Riesig".)

Commit: `style: designsystem-token-updates fuer kontrast und hierarchie`

---

### Phase 3 — Logo aus altem Repo holen + einbauen

#### 3.1 — Logo kopieren

```bash
# Vom Etappe-A-Setup aus, im pentrarri-next Root:
mkdir -p public

# Versuche zuerst das WebP-Logo:
if [ -f ~/Desktop/pentrarri-2026/assets/img/logo.webp ]; then
  cp ~/Desktop/pentrarri-2026/assets/img/logo.webp public/logo.webp
elif [ -f ~/Desktop/pentrarri-2026/assets/img/logo.svg ]; then
  cp ~/Desktop/pentrarri-2026/assets/img/logo.svg public/logo.svg
else
  # Liste auf was im img-Ordner liegt, damit Michael Bescheid weiß
  echo "Logo nicht gefunden in ~/Desktop/pentrarri-2026/assets/img/ — verfügbare Dateien:"
  ls -la ~/Desktop/pentrarri-2026/assets/img/ 2>/dev/null || echo "Ordner existiert nicht."
fi
```

**Falls kein Logo gefunden wird:** Erstelle einen SVG-Platzhalter unter `public/logo.svg` mit einem simplen geometrischen P-Symbol (24x24 viewBox, weiße fill, kann mit `currentColor` getintet werden):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M5 4h7a5 5 0 0 1 0 10H8v6H5V4zm3 3v4h4a2 2 0 0 0 0-4H8z"/>
</svg>
```

Notiere im Schluss-Bericht klar: "Logo-Platzhalter verwendet, weil Original nicht gefunden — Michael muss ggf. echtes Logo nachliefern."

#### 3.2 — Header refactor mit Logo

`src/components/Header.tsx` komplett ersetzen:

```typescript
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from './Container';

const navItems = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Kontakt', href: '#kontakt' },
];

export function Header() {
  const { scrollY } = useScroll();
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(10, 10, 10, 0.6)', 'rgba(10, 10, 10, 0.85)']);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
        backgroundColor: headerBg,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-ink-soft/30"
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo + Wordmark links */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="relative h-7 w-7">
              <Image
                src="/logo.webp"
                alt="Pentrarri Group"
                width={28}
                height={28}
                className="object-contain transition-all duration-500 group-hover:rotate-12"
                onError={(e) => {
                  // Fallback auf SVG wenn webp nicht da
                  (e.target as HTMLImageElement).src = '/logo.svg';
                }}
              />
            </div>
            <span className="font-sans text-base font-medium tracking-tight text-ink">
              Pentrarri
            </span>
          </Link>

          {/* Nav mitte */}
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

          {/* Anfrage-Button rechts */}
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

**Wichtige Anpassung:** Falls Logo `.webp` nicht existiert aber `.svg` schon, ändere `src="/logo.webp"` zu `src="/logo.svg"` direkt — das ist sauberer als die Fallback-Logik.

Commit: `feat: pentrarri-logo im header einbauen mit scroll-blur`

---

### Phase 4 — Hero refactor (neue Typo, Größen, weniger Schwung)

`src/components/Hero.tsx` komplett ersetzen:

```typescript
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Container } from './Container';
import { TextReveal } from './TextReveal';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Subtle parallax: Inhalt scrollt etwas langsamer als Page
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Glow scrollt schneller (Tiefe-Effekt)
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Gold Glow Hintergrund - parallax */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[600px] -translate-x-1/2 glow-gold animate-glow-pulse"
      />
      {/* Purple Glow rechts subtil */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute right-0 top-20 -z-10 h-[400px] w-[400px] glow-purple opacity-40"
      />

      <Container>
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="mx-auto max-w-5xl"
        >
          {/* Mono Eyebrow links-aligned, nicht zentriert */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="label-mono mb-10"
          >
            <span className="text-gold">●</span>{' '}
            <span className="text-ink-muted">PENTRARRI · 2026</span>
          </motion.p>

          {/* Headline mit Text-Reveal pro Wort */}
          <h1 className="text-display-xl font-sans font-light tracking-tighter text-ink">
            <TextReveal>
              Digitale Produkte mit
            </TextReveal>{' '}
            <span className="display-accent">
              <TextReveal delay={0.4}>Anspruch.</TextReveal>
            </span>
          </h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
          >
            Pentrarri baut Webseiten und Software für Unternehmen, die mehr wollen
            als ein Template. Aus Butzbach. Für ganz Deutschland.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#kontakt"
              className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 font-sans text-sm font-medium text-bg transition-all hover:bg-gold-glow"
            >
              <span className="relative z-10">Projekt anfragen</span>
              <span className="absolute inset-0 -z-0 translate-x-[-100%] bg-gold-glow transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#leistungen"
              className="rounded-full border border-ink-soft px-8 py-4 font-sans text-sm font-medium text-ink transition-all hover:border-ink-muted hover:bg-ink/5"
            >
              Was wir bauen →
            </a>
          </motion.div>

          {/* Mono-Stats als Tech-Anker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 flex flex-wrap items-center gap-8 border-t border-ink-soft/30 pt-8 text-xs font-mono uppercase tracking-mono-label text-ink-muted"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              Live aus Butzbach
            </div>
            <div>
              <span className="text-ink">99.9%</span> Uptime
            </div>
            <div>
              <span className="text-ink">Edge</span> Performance
            </div>
            <div>
              <span className="text-ink">DSGVO</span> · Self-Hosted
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
```

**Was sich geändert hat:**
- Eyebrow ist jetzt links-aligned und sagt `PENTRARRI · 2026` statt `WEBSEITEN · SAAS · SHOWCASE` (das wandert in die Services-Sektion als Heading)
- Headline ist `font-light tracking-tighter` (Inter ExtraLight wäre noch tighter — falls Inter ExtraLight verfügbar ist, nutze `font-extralight`)
- "Anspruch." in Gold mit `display-accent`, nicht mehr Italic-Serif
- Text-Reveal-Animation auf der Headline (Buchstabe-für-Buchstabe)
- Parallax: Content scrollt langsam mit, Glows schneller (Tiefe)
- **Neu: Mono-Stats-Leiste** unten als Tech-Anker. Das ist der "Tech-Builder-Beweis" der vorher fehlte.

Commit: `feat: hero refactor mit text-reveal, parallax, mono-stats`

---

### Phase 5 — TextReveal-Komponente

Neue Datei `src/components/TextReveal.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
  children: string;
  delay?: number;
}

export function TextReveal({ children, delay = 0 }: TextRevealProps) {
  const words = children.split(' ');

  return (
    <span className="inline-flex flex-wrap gap-x-[0.25em]">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + wordIndex * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
```

(Wort-für-Wort statt Buchstabe-für-Buchstabe — sieht polierter aus, weniger nervös, mehr Apple.)

Commit: `feat: text-reveal komponente mit mask-animation`

---

### Phase 6 — Services refactor (große Numbers, mehr Anker)

`src/components/Services.tsx` komplett ersetzen:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

const services = [
  {
    number: '01',
    label: 'Webseiten',
    title: 'Maßgeschneidert. Editorial.',
    description:
      'Webseiten für Unternehmen — von Single-Page-Statements bis zu mehrseitigen Auftritten mit Anspruch. Performance-optimiert, SEO-ready, Edge-deployed.',
    tags: ['Next.js', 'TypeScript', 'Edge'],
  },
  {
    number: '02',
    label: 'SaaS',
    title: 'Software auf Anfrage.',
    description:
      'Dashboards, interne Tools, Custom-Plattformen. Wir bauen, was Sie nirgendwo fertig kaufen können — exakt für Ihre Prozesse.',
    tags: ['Custom Build', 'Realtime', 'API'],
  },
  {
    number: '03',
    label: 'Showcase',
    title: 'Demos zum Erkunden.',
    description:
      'Live-Demonstrationen unserer Arbeit. Hochzeitsseiten, SaaS-Mockups, Editorial-Projekte. Klicken, scrollen, ausprobieren.',
    tags: ['Live Demos', 'Interactive', 'Open'],
  },
];

export function Services() {
  return (
    <section
      id="leistungen"
      className="relative border-t border-ink-soft/20 bg-bg-elevated py-32 md:py-40"
    >
      {/* Subtle gradient overlay top für weichen Übergang */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 max-w-3xl"
        >
          <p className="label-mono mb-6">
            <span className="text-gold">●</span>{' '}
            <span className="text-ink-muted">LEISTUNGEN · DREI LINIEN</span>
          </p>
          <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Drei Linien. <span className="display-accent">Ein Anspruch.</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-0">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative border-t border-ink-soft/30 py-12 md:border-l md:border-t-0 md:px-10 md:py-0 md:first:border-l-0"
            >
              {/* Riesige Number als Anker */}
              <p className="font-mono text-7xl font-light text-gold/30 transition-colors duration-700 group-hover:text-gold/60 md:text-8xl">
                {service.number}
              </p>

              {/* Mono-Label */}
              <p className="mt-4 font-mono text-xs uppercase tracking-mono-label text-gold">
                {service.label}
              </p>

              {/* Titel */}
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {service.title}
              </h3>

              {/* Beschreibung */}
              <p className="mt-6 text-base leading-relaxed text-ink-muted">
                {service.description}
              </p>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink-soft/50 bg-bg-soft px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted transition-colors group-hover:border-gold/30 group-hover:text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Subtle hover indicator */}
              <div className="mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-ink-muted opacity-0 transition-opacity group-hover:opacity-100">
                <span>Mehr erfahren</span>
                <span className="text-gold">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

**Was sich geändert hat:**
- Sektions-Hintergrund ist jetzt `bg-bg-elevated` (heller) mit Gradient-Übergang oben → klare visuelle Trennung zum Hero
- Karten sind nicht mehr in einer Grid-Box, sondern mit `border-l` getrennt (cleaner)
- **Numbers (01/02/03) sind jetzt RIESIG** (`text-7xl` bis `text-8xl`) und in dezentem Gold/30, beim Hover Gold/60 — das ist der visuelle Anker den's vorher nicht gab
- Mono-Labels (Webseiten/SaaS/Showcase) als kleine Identifier in Gold
- Titles sind jetzt "Maßgeschneidert. Editorial.", "Software auf Anfrage.", "Demos zum Erkunden." — kürzer, statementhafter
- Tags sind kleiner und stylischer, mit Hover-Effekt
- Hover-Indikator "Mehr erfahren →" fadet rein beim Hover

Commit: `feat: services refactor mit grossen numbers, sektionsabgrenzung, mono-anker`

---

### Phase 7 — Custom Cursor (Apple-Polish)

Neue Datei `src/components/CustomCursor.tsx`:

```typescript
'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Touch device detection — auf Touch keinen Custom Cursor
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    // Reduced motion — kein Custom Cursor
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    // Hover detection für interaktive Elemente
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        opacity: isVisible ? (isHovering ? 0.5 : 0.9) : 0,
      }}
      transition={{ scale: { duration: 0.2 }, opacity: { duration: 0.3 } }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-4 w-4 rounded-full bg-gold md:block"
    />
  );
}
```

In `src/app/page.tsx` einbinden:

```typescript
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
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
      </main>
      <Footer />
    </>
  );
}
```

**Wichtig:** Custom Cursor wird auf Touch-Geräten + Reduced-Motion-Settings automatisch unterdrückt. Der native Cursor bleibt sichtbar (kein `cursor: none` Override) — der Custom-Cursor ist ein zusätzlicher Gold-Dot der dem nativen folgt. Apple-mäßig, nicht ersetzend.

Commit: `feat: custom cursor (apple-polish, touch-safe)`

---

## Phase 8 — Lokal testen + Build + Push

```bash
npm run dev
```

**Selbst-Prüfen:**

| Check | Erwartet |
|---|---|
| Server startet ohne Errors auf Port 3000 oder 3001 | ✅ |
| Schriften sind Inter (Sans) und JetBrains Mono — kein Serif mehr | ✅ |
| Hero-Headline: "Digitale Produkte mit **Anspruch.**" mit "Anspruch." in Gold (nicht Italic-Cursive) | ✅ |
| Text-Reveal beim Laden: Wörter floaten von unten rein | ✅ |
| Mono-Stats-Leiste unter dem Hero ("Live aus Butzbach · 99.9% Uptime · Edge · DSGVO") | ✅ |
| Beim Scrollen: Hero parallax langsam, Glows schneller | ✅ |
| Header: Logo links neben "Pentrarri"-Text | ✅ |
| Header: blur intensiviert beim Scrollen | ✅ |
| Services: GROSSE 01/02/03 in dezentem Gold, beim Hover Gold heller | ✅ |
| Services: andere Sektion-Helligkeit als Hero (Layering sichtbar) | ✅ |
| Custom Cursor: kleiner Gold-Dot folgt Cursor mit Spring | ✅ |
| Custom Cursor: wird größer + transparenter bei Hover auf Links/Buttons | ✅ |
| Mobile DevTools (375px): nix bricht, alles responsive, kein Custom Cursor | ✅ |
| Browser Console: keine roten Fehler | ✅ |

**Build-Test:**

```bash
npm run build
npm run pages:build
```

Beide müssen sauber durchlaufen.

**PROGRESS.md ergänzen:**

Füge unten dran:

```markdown

## Etappe B — Schriftwechsel, Apple-Animation, Logo, Polish
**Status:** ✅ Abgeschlossen am [DATUM]

- Schriften gewechselt: Inter + JetBrains Mono (Geist + Instrument Serif raus)
- Designsystem-Tokens für Kontrast aktualisiert (ink-muted heller, bg-elevated heller)
- Display-Sizes etwas zurückgedreht für ausgewogenere Hierarchie
- Logo aus altem pentrarri-2026-Repo übernommen, im Header links eingebaut
- Hero refactor: Text-Reveal-Animation, Parallax, Mono-Stats-Tech-Anker
- Services refactor: GROSSE 01/02/03 als Anker, Sektionsabgrenzung mit bg-Wechsel, kompaktere Tags
- Apple-Polish: Custom Cursor mit Spring-Physics (touch-safe + reduced-motion-safe)
- Header bekommt smooth Scroll-Blur-Transition

**Nächste Etappe (C):** Nach Michaels Feedback — vermutlich Detail-Polish + Showcase-Bereich
```

**Commit & Push:**

```bash
git add -A
git commit -m "docs: progress-tracker etappe b"
git push
```

Cloudflare baut automatisch — Michael sieht es dann auf `pentrarri-next.pages.dev`.

Server am Ende laufen lassen für Michaels lokales Re-Test.

---

## Schluss-Bericht-Spezifikation

Gib Michael am Ende:

1. **Was gebaut wurde** — Phasen 1-8 kurz
2. **Logo-Status** — Original gefunden + kopiert, oder Platzhalter verwendet? Falls Platzhalter: ehrlich sagen
3. **Commits** — Anzahl + Messages
4. **Build-Status** — `npm run build` und `npm run pages:build` durch?
5. **Push-Status** — gepusht, Cloudflare baut?
6. **Was schiefging** — alles, auch Kleinkram
7. **Was Michael testen soll** — `localhost:3000` (oder 3001) **+ Live-URL nach Cloudflare-Deploy** + echtes Handy

---

## Was du NICHT in Etappe B tust

- ❌ Keine neuen Seiten bauen (`/hochzeit/*`, `/showcase/*`, `/kontakt`) — kommt in Etappe C+
- ❌ Keine SaaS-Demo-Mockups — kommt in eigener Etappe
- ❌ Kein Kontaktformular bauen
- ❌ Keine Three.js / 3D / Particle-Systeme — Michael hat "Apple-poliert" gewählt, nicht "AI-experimental". Wir bleiben polished, nicht overdone.
- ❌ Kein neues Logo erfinden — bestehendes aus altem Repo nutzen, sonst Platzhalter

---

## Verhaltensregeln

- Bei Detail-Mehrdeutigkeit: entscheide selbst nach Apple-Premium-Tonalität, nicht fragen
- Wenn Logo nicht gefunden wird im alten Repo: nutze SVG-Platzhalter aus Phase 3.1, sag es klar im Schluss-Bericht
- Conventional Commits auf Deutsch
- Nicht pushen wenn Build fehlschlägt
- Server am Ende laufen lassen

Los geht's.

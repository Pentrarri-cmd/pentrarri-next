# Pentrarri Next — Etappe E: Story-Sektionen für die Landingpage

## Kontext

Etappe D (Sartoria-Hub-Interaktivität) wurde aufgeschoben. Fokus jetzt auf die Landingpage — die ist Pentrarri's wichtigstes Verkaufs-Asset. Michael will mehr Storytelling-Sektionen, weniger reine Service-Beschreibung.

**Was gebaut wird:**
1. **Warum Pentrarri** — 4 Pillars (Differenzierungs-Argumente)
2. **Wie wir arbeiten** — 5 Prozess-Steps (Vertrauensaufbau)
3. **Hinter Pentrarri** — Michael als Gesicht, Hybrid-Sprache (sonst "Wir", hier "Ich")
4. **Kontakt-Sektion** — Anker `#kontakt`, Email + Phone CTAs (kein Formular, das kommt in Etappe F)

Plus: Section-Reihenfolge auf Home neu sortieren, Header-Nav um "Prozess" erweitern.

**Was bleibt:**
- Pentrarri Designsystem (Farben, Schriften)
- Bestehende Komponenten (Hero, Services, Showcase, Header, Footer, CustomCursor) — werden nicht angefasst
- Sartoria Hub Demo bleibt wie sie ist

**Tonalität-Regel:**
- Default = "Wir", "unser Anspruch", "wir bauen" — wirkt professioneller, Team-mäßig
- **AUSNAHME: Sektion "Hinter Pentrarri"** spricht in "Ich" — Michael als Person, ehrliche Note
- Premium/Edel-Sprache überall, keine Tech-Bro-Buzzwords

---

## Phasen

6 Phasen, Conventional Commits auf Deutsch. Komponenten ZUERST bauen, dann in Page importieren (kein "broken state"-Commit).

---

### Phase 1 — WhyPentrarri-Komponente

Neue Datei `src/components/WhyPentrarri.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

const pillars = [
  {
    number: '01',
    title: 'Maßgeschneidert.',
    description:
      'Jede Zeile Code ist auf Ihr Unternehmen zugeschnitten. Kein gekaufter Theme, keine Drag-and-Drop-Lösung. Was Sie bekommen, gibt es nirgends sonst.',
  },
  {
    number: '02',
    title: 'Eine Person verantwortlich.',
    description:
      'Sie sprechen direkt mit dem Builder. Keine Account-Manager, keine Übersetzer, keine Telefon-Schleifen. Direkte Linie, kurze Wege.',
  },
  {
    number: '03',
    title: 'Webseite und Software vereint.',
    description:
      'Marketing-Site und internes Tool? Beides aus einer Hand. Konsistente Codebasis, ein Ansprechpartner, weniger Schnittstellen.',
  },
  {
    number: '04',
    title: 'Premium-Stack mit langer Halbwertszeit.',
    description:
      'Next.js, TypeScript, Cloudflare Edge. Performance-optimiert, DSGVO-konform, gebaut für die nächsten fünf Jahre.',
  },
];

export function WhyPentrarri() {
  return (
    <section
      id="warum"
      className="relative py-32 md:py-40"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-3xl"
        >
          <p className="label-mono mb-6">
            <span className="text-gold">●</span>{' '}
            <span className="text-ink-muted">WARUM PENTRARRI · VIER GRÜNDE</span>
          </p>
          <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Anders als die <span className="display-accent">Standard-Agentur.</span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink-muted">
            Premium-Software entsteht nicht durch Templates und Account-Manager-Karussells.
            Sondern durch direkten Bau, präzise Kommunikation und einen Stack, der hält.
          </p>
        </motion.div>

        <div className="grid gap-px bg-ink-soft/30 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group bg-bg p-10 transition-colors duration-500 hover:bg-bg-elevated md:p-12"
            >
              <p className="font-mono text-5xl font-light text-gold/30 transition-colors duration-700 group-hover:text-gold/60 md:text-6xl">
                {pillar.number}
              </p>
              <h3 className="mt-8 text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-ink-muted">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

Commit: `feat: warum-pentrarri-sektion mit vier differenzierungs-pillars`

---

### Phase 2 — HowWeWork-Komponente

Neue Datei `src/components/HowWeWork.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

const steps = [
  {
    number: '01',
    duration: '30-45 Minuten',
    title: 'Anfrage & Erstgespräch',
    description:
      'Sie schildern Ihr Vorhaben. Wir hören zu, fragen nach, klären den Rahmen. Kostenfrei, unverbindlich, ohne Verkaufs-Pitch.',
  },
  {
    number: '02',
    duration: '3-5 Werktage',
    title: 'Konzept & Festpreis',
    description:
      'Sie bekommen eine schriftliche Empfehlung: Technischer Stack, Sektionen, Lieferdatum, Festpreis. Keine Stunden-Abrechnung, keine Überraschungen.',
  },
  {
    number: '03',
    duration: '2-8 Wochen',
    title: 'Sprint-Bau in Etappen',
    description:
      'Wir bauen in 1-2-Wochen-Sprints. Nach jeder Etappe sehen Sie eine Live-Vorschau, geben Feedback, wir iterieren. Keine Black Box, keine bösen Überraschungen am Ende.',
  },
  {
    number: '04',
    duration: '1-2 Tage',
    title: 'Launch & Übergabe',
    description:
      'Domain-Konfiguration, Hosting-Setup, vollständige Dokumentation. Sie bekommen vollen Quellcode-Zugriff. Sie sind nicht von uns abhängig.',
  },
  {
    number: '05',
    duration: 'Optional',
    title: 'Support & Iteration',
    description:
      'Bei Bedarf bleiben wir dran — für Updates, neue Features oder einen weiteren Sprint. Sie entscheiden, was Sie brauchen.',
  },
];

export function HowWeWork() {
  return (
    <section
      id="prozess"
      className="relative border-t border-ink-soft/20 bg-bg-elevated py-32 md:py-40"
    >
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
            <span className="text-ink-muted">PROZESS · FÜNF SCHRITTE</span>
          </p>
          <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Wie wir arbeiten. <span className="display-accent">Transparent.</span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink-muted">
            Vom ersten Gespräch bis zum Launch — und darüber hinaus. Sie wissen
            an jedem Punkt, wo Ihr Projekt steht.
          </p>
        </motion.div>

        <div className="space-y-px bg-ink-soft/30">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group grid grid-cols-12 gap-6 bg-bg-elevated p-8 transition-colors duration-500 hover:bg-bg-soft md:gap-12 md:p-12"
            >
              <div className="col-span-12 md:col-span-2">
                <p className="font-mono text-6xl font-light text-gold/30 transition-colors duration-700 group-hover:text-gold/60 md:text-7xl">
                  {step.number}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted md:mt-4">
                  {step.duration}
                </p>
              </div>
              <div className="col-span-12 md:col-span-10">
                <h3 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:mt-6 md:text-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

Commit: `feat: wie-wir-arbeiten-sektion mit fuenf prozess-steps`

---

### Phase 3 — BehindPentrarri-Komponente (Michael als Gesicht, "Ich"-Sprache)

Neue Datei `src/components/BehindPentrarri.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

const stats = [
  { label: 'Solo seit', value: '2019' },
  { label: 'Standort', value: 'Butzbach' },
  { label: 'Modus', value: 'Direkt erreichbar' },
];

export function BehindPentrarri() {
  return (
    <section
      id="ueber"
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
            <span className="text-ink-muted">HINTER PENTRARRI · DIE PERSON</span>
          </p>
          <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Eine Person. <span className="display-accent">Nicht eine Agentur.</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Linke Seite: Statement-Block in "Ich"-Sprache */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="space-y-6 text-base leading-relaxed text-ink-muted md:text-lg">
              <p className="text-xl text-ink md:text-2xl">
                Ich bin Michael Grigorchuk, Gründer und Builder hinter Pentrarri.
              </p>
              <p>
                Seit 2019 baue ich Webseiten und Software aus Butzbach heraus —
                für Unternehmen, die mehr wollen als ein Template.
              </p>
              <p>
                Pentrarri ist mein Versuch, eine andere Art Software-Agentur zu sein.
                Ich arbeite alleine — nicht weil mir das Budget für ein Team fehlt,
                sondern weil ich überzeugt bin: Premium-Arbeit entsteht durch direkte
                Beziehungen. Nicht durch Account-Manager-Lottos. Nicht durch Telefon-Schleifen.
              </p>
              <p>
                Wenn Sie mich beauftragen, sprechen Sie mit der Person, die Ihren
                Code schreibt. Keine Übersetzer dazwischen.
              </p>
            </div>

            <a
              href="#kontakt"
              className="mt-12 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-mono-label text-gold transition-all hover:gap-5"
            >
              <span>Reden wir</span>
              <span>→</span>
            </a>
          </motion.div>

          {/* Rechte Seite: Stats + Mono-Akzent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-ink-soft/30 bg-bg-elevated p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                Eckdaten
              </p>
              <dl className="mt-8 space-y-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-baseline justify-between border-b border-ink-soft/30 pb-6 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-mono-label text-ink-muted">
                      {stat.label}
                    </dt>
                    <dd className="text-2xl font-light tracking-tight text-ink md:text-3xl">
                      {stat.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>

              <div className="mt-10 border-t border-ink-soft/30 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-pulse align-middle mr-2" />
                  Antwortet meist innerhalb von 24h
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
```

Commit: `feat: hinter-pentrarri-sektion mit ich-sprache und eckdaten`

---

### Phase 4 — Contact-Komponente (Anker, Email + Phone)

Neue Datei `src/components/Contact.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

export function Contact() {
  return (
    <section
      id="kontakt"
      className="relative border-t border-ink-soft/20 bg-bg-elevated py-32 md:py-40"
    >
      {/* Subtle gold glow background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 glow-gold opacity-50" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="label-mono mb-6 justify-center inline-flex">
            <span className="text-gold">●</span>{' '}
            <span className="text-ink-muted ml-2">KONTAKT · BEREIT WENN SIE ES SIND</span>
          </p>
          <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Lassen Sie uns über Ihr{' '}
            <span className="display-accent">Projekt sprechen.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Schicken Sie uns eine kurze Nachricht oder rufen Sie an. Wir antworten
            innerhalb von 24 Stunden mit konkreten nächsten Schritten — kein
            Verkaufs-Pitch, kein Druck.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 grid max-w-3xl gap-4 md:grid-cols-2"
        >
          {/* Email */}
          <a
            href="mailto:info@pentrarri.com"
            className="group flex flex-col items-start gap-4 rounded-2xl border border-ink-soft/30 bg-bg p-8 transition-all hover:border-gold/40 hover:bg-bg-soft"
          >
            <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
              Per E-Mail
            </p>
            <div className="flex items-center gap-3 text-xl font-medium text-ink md:text-2xl">
              <span>info@pentrarri.com</span>
              <span className="text-gold transition-transform group-hover:translate-x-1">→</span>
            </div>
            <p className="text-sm text-ink-muted">
              Beste Wahl für ausführliche Anfragen. Kurze Beschreibung Ihres Vorhabens reicht.
            </p>
          </a>

          {/* Phone */}
          <a
            href="tel:+4915233874863"
            className="group flex flex-col items-start gap-4 rounded-2xl border border-ink-soft/30 bg-bg p-8 transition-all hover:border-gold/40 hover:bg-bg-soft"
          >
            <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
              Per Telefon
            </p>
            <div className="flex items-center gap-3 text-xl font-medium text-ink md:text-2xl">
              <span>+49 152 3387 4863</span>
              <span className="text-gold transition-transform group-hover:translate-x-1">→</span>
            </div>
            <p className="text-sm text-ink-muted">
              Lieber direkt? Werktags 9-18 Uhr. Außerhalb gerne kurze Nachricht.
            </p>
          </a>
        </motion.div>

        {/* Footer-Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center font-mono text-xs uppercase tracking-mono-label text-ink-muted"
        >
          Aus Butzbach · Für ganz Deutschland · DSGVO-konform
        </motion.p>
      </Container>
    </section>
  );
}
```

Commit: `feat: kontakt-sektion mit email- und phone-cta`

---

### Phase 5 — Page-Reihenfolge + Header-Nav

#### 5.1 — Header-Nav um "Prozess" erweitern

In `src/components/Header.tsx`, im `navItems`-Array:

```typescript
const navItems = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Prozess', href: '#prozess' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Kontakt', href: '#kontakt' },
];
```

(Vorher waren es 3 Items, jetzt 4. Auf Desktop passt das, Mobile hat eh kein Nav-Menü sichtbar.)

#### 5.2 — Page-Reihenfolge

`src/app/page.tsx` komplett ersetzen:

```typescript
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { WhyPentrarri } from '@/components/WhyPentrarri';
import { HowWeWork } from '@/components/HowWeWork';
import { Showcase } from '@/components/Showcase';
import { BehindPentrarri } from '@/components/BehindPentrarri';
import { Contact } from '@/components/Contact';
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
        <WhyPentrarri />
        <HowWeWork />
        <Showcase />
        <BehindPentrarri />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

#### 5.3 — Anker auf bestehenden Sektionen prüfen

Die bestehenden Sektionen müssen folgende `id`-Attribute haben (sollten schon, aber doublecheck):

| Komponente | Datei | Erwartetes `id` |
|---|---|---|
| Services | `src/components/Services.tsx` | `id="leistungen"` |
| Showcase | `src/components/Showcase.tsx` | `id="showcase"` |

Falls eines davon nicht den richtigen Anker hat, setzen.

Commit: `feat: home-page-reihenfolge mit allen story-sektionen + nav-update`

---

### Phase 6 — Build, Test, PROGRESS.md, Push

```bash
npm run build
npm run pages:build
```

Beide müssen sauber durchlaufen.

**Selbst-Test-Checkliste:**

| Check | Erwartet |
|---|---|
| Home rendert alle 7 Sektionen in richtiger Reihenfolge (Hero → Services → Warum → Prozess → Showcase → Hinter Pentrarri → Kontakt) | ✅ |
| Header-Nav zeigt 4 Items: Leistungen · Prozess · Showcase · Kontakt | ✅ |
| Klick "Prozess" im Nav → scrollt zu Wie-wir-arbeiten-Sektion | ✅ |
| Klick "Kontakt" im Nav → scrollt zu Kontakt-Sektion | ✅ |
| WhyPentrarri: 4 Pillars in 2x2 Grid, große Mono-Numbers in dezentem Gold | ✅ |
| HowWeWork: 5 Steps vertikal, Mono-Numbers links + Duration-Label, Content rechts | ✅ |
| BehindPentrarri: Asymmetrisches Layout — links Statement in "Ich"-Sprache, rechts Eckdaten-Card | ✅ |
| Contact: zentriert, Email- + Phone-CTA als Cards mit Hover-Effekt | ✅ |
| Klick auf Email-CTA → öffnet Mail-App (mailto:) | ✅ |
| Klick auf Phone-CTA → öffnet Telefon-App (tel:) | ✅ |
| Hero "Projekt anfragen"-Button → scrollt jetzt korrekt zu Kontakt-Sektion (Anker existiert) | ✅ |
| Hero "Was wir bauen"-Button → scrollt zu Leistungen | ✅ |
| Section-Layering: Hero (bg) → Services (bg-elevated) → Warum (bg) → Prozess (bg-elevated) → Showcase (bg) → Hinter (bg) → Kontakt (bg-elevated) | ✅ |
| Mobile (375px): alles stackt sauber, keine horizontale Scrollbars | ✅ |
| Custom Cursor läuft weiter (auf Desktop) auf der ganzen Home | ✅ |
| `npm run build` und `npm run pages:build` beide grün | ✅ |

**PROGRESS.md ergänzen:**

```markdown

## Etappe E — Story-Sektionen für die Landingpage
**Status:** ✅ Abgeschlossen am [DATUM]

- WhyPentrarri-Sektion: 4 Differenzierungs-Pillars (Maßgeschneidert / Eine Person / Webseite+Software / Premium-Stack)
- HowWeWork-Sektion: 5 Prozess-Steps mit Duration-Labels (Anfrage → Konzept → Sprint-Bau → Launch → Support)
- BehindPentrarri-Sektion: Michael als Gesicht in "Ich"-Sprache, asymmetrisches Layout mit Eckdaten-Card
- Contact-Sektion: Email- und Phone-CTA mit Hover-Effekten, Glow-Background, kein Formular (kommt in Etappe F)
- Header-Nav um "Prozess" erweitert (jetzt 4 Items)
- Section-Reihenfolge auf Home: Hero → Services → Warum → Prozess → Showcase → Hinter Pentrarri → Kontakt

**Nächste Etappe (F):** Vermutlich Kontaktformular mit Cloudflare Worker + Resend (jetzt wo die Sektion und der Anker stehen)
```

**Push:**

```bash
git add -A
git commit -m "docs: progress-tracker etappe e"
git push
```

Server am Ende laufen lassen für Michaels lokales Re-Test.

---

## Schluss-Bericht (an Michael)

1. **Was gebaut wurde** — Phasen 1-6 kurz, mit Hinweis auf Tonalität-Wechsel in BehindPentrarri
2. **Section-Reihenfolge final** — wie sieht der Storytelling-Flow aus?
3. **Texte** — sind alle Texte aus der Spec übernommen? Falls Text-Anpassungen nötig waren (z.B. Typo-Korrekturen): erwähnen.
4. **Commits** — Anzahl + Messages
5. **Build-Status**
6. **Push-Status**
7. **Was schiefging** — auch Kleinkram
8. **Was Michael testen soll** — Klick-Test der Nav-Items + CTAs + visueller Flow durch alle Sektionen + Mobile

---

## Was du NICHT in Etappe E tust

- ❌ Kein Kontaktformular bauen (mailto:/tel: Links reichen für jetzt — Formular ist Etappe F)
- ❌ Keine Cloudflare Worker / Resend-Integration
- ❌ Keine echten Testimonials oder Logos (haben wir nicht)
- ❌ Kein Foto von Michael (haben wir nicht, "Ich"-Sektion lebt von Typografie)
- ❌ Sartoria Hub nicht anfassen — bleibt wie sie ist
- ❌ Keine Hochzeit-Demos
- ❌ Keine FAQ-Sektion (kann in Etappe G kommen)
- ❌ Keine Texte von Pentrarri-Pakete oder Preise — alles bleibt "auf Anfrage"

---

## Verhaltensregeln

- **Tonalität:** Default "Wir" — nur BehindPentrarri ist "Ich" (Michael). Sehr wichtig dass das konsistent bleibt.
- Bei Detail-Mehrdeutigkeit (Spacing, Farb-Nuancen): entscheide nach Premium/Edel-Tonalität, halte Pentrarri-Designsystem konsistent
- Conventional Commits auf Deutsch
- Nicht pushen wenn Build fehlschlägt
- **WICHTIG:** Bevor du eine Komponente importierst, stelle sicher dass sie im selben oder vorherigen Commit angelegt wurde (kein "broken state"-Commit)
- Server am Ende laufen lassen

Los geht's. Saubere Storytelling-Etappe — die Landingpage wird damit zum echten Verkaufs-Asset.

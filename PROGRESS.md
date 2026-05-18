# Pentrarri Next — Fortschritt

## Etappe A — Setup, Designsystem, Home-Mockup
**Status:** ✅ Abgeschlossen am 2026-05-18

- Next.js 14 + TypeScript + Tailwind + Framer Motion aufgesetzt
- Cloudflare-Adapter `@cloudflare/next-on-pages@1.13.15` konfiguriert
- Wrangler eingerichtet mit `nodejs_compat`
- Designsystem implementiert: Schwarz/Anthrazit + metallic Gold, Instrument Serif + Geist
- Layout-Komponenten: Header, Footer, Container
- Home-Mockup: Hero (Gold-Glow), Drei-Linien-Services-Sektion

**Nächste Etappe (B):** Cloudflare Pages live deployen + visuelles Feedback einarbeiten

## Etappe B — Schriftwechsel, Apple-Animation, Logo, Polish
**Status:** ✅ Abgeschlossen am 2026-05-18

- Schriften gewechselt: Inter + JetBrains Mono (Geist + Instrument Serif raus)
- Designsystem-Tokens für Kontrast aktualisiert (ink-muted heller, bg-elevated heller)
- Display-Sizes etwas zurückgedreht für ausgewogenere Hierarchie
- Logo aus altem pentrarri-2026-Repo übernommen, im Header links eingebaut
- Hero refactor: Text-Reveal-Animation, Parallax, Mono-Stats-Tech-Anker
- Services refactor: GROSSE 01/02/03 als Anker, Sektionsabgrenzung mit bg-Wechsel, kompaktere Tags
- Apple-Polish: Custom Cursor mit Spring-Physics (touch-safe + reduced-motion-safe)
- Header bekommt smooth Scroll-Blur-Transition

**Nächste Etappe (C):** Nach Michaels Feedback — vermutlich Detail-Polish + Showcase-Bereich

## Etappe C — Wordmark, Polish, Showcase-Routing, SaaS-Mockup Sartoria Hub
**Status:** ✅ Abgeschlossen am 2026-05-18

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

## Etappe D — Sartoria Hub voll interaktiv
**Status:** ✅ Abgeschlossen am 2026-05-19

- Mock-Daten erweitert: Auftragsdetails (Timeline, Notizen, Termin, totalPrice, paid), 11 Kunden mit Profilen
- State-Architektur: Client-Wrapper SartoriaHubApp mit useState für View / Selected Order / Modal
- Sidebar controlled: 3 echte Views switching + 4 Coming-Soon-Placeholder
- Dashboard-View extrahiert, Pipeline und Activity klickbar
- OrderDetailPanel: Slide-in von rechts mit Timeline, Termin, Notizen, Status-Verlauf, ESC + Click-Outside
- Aufträge-View: Vollansicht mit 6 Status-Filter-Tabs (Tabellen-Layout)
- Kunden-View: 11 Cards mit Tier-Filter (Alle/VIP/Aktiv/Neu)
- NewOrderModal: 3-Step-Form (Kunde → Item/Stoff → Bestätigen) mit Success-State
- "Alle ansehen →" Wire zur Aufträge-View
- Activity-Items wires Side-Panel

**Nächste Etappe (E):** Nach Michaels Feedback — vermutlich Hochzeit-Demo rüberziehen oder Kontaktformular

## Etappe E — Story-Sektionen für die Landingpage
**Status:** ✅ Abgeschlossen am 2026-05-19

- WhyPentrarri-Sektion: 4 Differenzierungs-Pillars (Maßgeschneidert / Eine Person / Webseite+Software / Premium-Stack)
- HowWeWork-Sektion: 5 Prozess-Steps mit Duration-Labels (Anfrage → Konzept → Sprint-Bau → Launch → Support)
- BehindPentrarri-Sektion: Michael als Gesicht in "Ich"-Sprache, asymmetrisches Layout mit Eckdaten-Card
- Contact-Sektion: Email- und Phone-CTA mit Hover-Effekten, Glow-Background, kein Formular (kommt in Etappe F)
- Header-Nav um "Prozess" erweitert (jetzt 4 Items)
- Section-Reihenfolge auf Home: Hero → Services → Warum → Prozess → Showcase → Hinter Pentrarri → Kontakt
- Tonalität-Wechsel: Default "Wir", nur BehindPentrarri spricht in "Ich"

**Nächste Etappe (F):** Vermutlich Kontaktformular mit Cloudflare Worker + Resend (jetzt wo die Sektion und der Anker stehen)

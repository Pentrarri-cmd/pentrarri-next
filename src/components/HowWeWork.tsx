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
            Vom ersten Gespräch bis zum Launch — und darüber hinaus. Sie wissen an
            jedem Punkt, wo Ihr Projekt steht.
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

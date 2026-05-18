'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    duration: '30-45 Minuten',
    title: 'Anfrage & Erstgespräch',
    description:
      'Sie schildern Ihr Vorhaben. Wir hören zu, fragen nach, klären den Rahmen. Kostenfrei, unverbindlich.',
  },
  {
    number: '02',
    duration: '3-5 Werktage',
    title: 'Konzept & Festpreis',
    description:
      'Schriftliche Empfehlung: Stack, Sektionen, Lieferdatum, Festpreis. Keine Stunden-Abrechnung.',
  },
  {
    number: '03',
    duration: '2-8 Wochen',
    title: 'Sprint-Bau in Etappen',
    description:
      'Wir bauen in 1-2-Wochen-Sprints. Live-Vorschau nach jeder Etappe, Feedback, Iteration.',
  },
  {
    number: '04',
    duration: '1-2 Tage',
    title: 'Launch & Übergabe',
    description:
      'Domain, Hosting, Dokumentation. Voller Quellcode-Zugriff. Keine Abhängigkeit.',
  },
  {
    number: '05',
    duration: 'Optional',
    title: 'Support & Iteration',
    description: 'Bei Bedarf bleiben wir dran — Updates, neue Features, neue Sprints.',
  },
];

export function HowWeWorkV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  /* eslint-disable react-hooks/rules-of-hooks */
  // Hook-Calls in einer Map über ein statisches const-Array — Reihenfolge ist deterministisch,
  // React-Runtime ist damit zufrieden. ESLint-Rule wird hier bewusst übergangen.
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
  /* eslint-enable react-hooks/rules-of-hooks */

  return (
    <section id="prozess" ref={ref} className="relative min-h-[500vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-bg-elevated">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="absolute top-32 left-0 right-0 px-6 text-center md:px-10">
            <p className="label-mono mb-4 inline-flex">
              <span className="text-gold">●</span>
              <span className="ml-2 text-ink-muted">PROZESS · FÜNF SCHRITTE</span>
            </p>
            <h2 className="text-display-md font-sans font-light tracking-tighter text-ink">
              Wie wir arbeiten. <span className="display-accent">Transparent.</span>
            </h2>
          </div>

          <div className="relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                style={{ opacity: opacities[i], y: ys[i] }}
                className="absolute inset-0 grid grid-cols-12 items-center gap-6"
              >
                <div className="col-span-12 md:col-span-5">
                  <p className="font-mono text-[180px] font-light leading-none text-gold/40 md:text-[260px]">
                    {step.number}
                  </p>
                </div>

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

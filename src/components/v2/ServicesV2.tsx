'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const services = [
  {
    number: '01',
    label: 'Webseiten',
    title: 'Maßgeschneidert.',
    description:
      'Editorial-Anspruch, Performance-optimiert, Edge-deployed. Single-Page bis Multi-Page.',
    tags: ['Next.js', 'TypeScript', 'Edge'],
  },
  {
    number: '02',
    label: 'SaaS',
    title: 'Software auf Anfrage.',
    description:
      'Dashboards, Tools, Custom-Plattformen. Wir bauen, was Sie nirgendwo fertig kaufen können.',
    tags: ['Custom Build', 'Realtime', 'API'],
  },
  {
    number: '03',
    label: 'Showcase',
    title: 'Demos zum Erkunden.',
    description:
      'Live-Demonstrationen unserer Arbeit. Klicken, scrollen, ausprobieren.',
    tags: ['Live Demos', 'Interactive', 'Open'],
  },
];

export function ServicesV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15, 0.2],
    [0, 1, 1, 0],
  );

  const c1Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.4, 0.45], [0, 1, 1, 0]);
  const c1Scale = useTransform(scrollYProgress, [0.15, 0.2, 0.4, 0.45], [0.85, 1, 1, 0.85]);

  const c2Opacity = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const c2Scale = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0.85, 1, 1, 0.85]);

  const c3Opacity = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 0.6]);
  const c3Scale = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0.85, 1, 1, 0.9]);

  const opacities = [c1Opacity, c2Opacity, c3Opacity];
  const scales = [c1Scale, c2Scale, c3Scale];

  return (
    <section id="leistungen" ref={ref} className="relative min-h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-bg-elevated">
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

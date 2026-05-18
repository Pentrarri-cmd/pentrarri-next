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
              <p className="font-mono text-7xl font-light text-gold/30 transition-colors duration-700 group-hover:text-gold/60 md:text-8xl">
                {service.number}
              </p>

              <p className="mt-4 font-mono text-xs uppercase tracking-mono-label text-gold">
                {service.label}
              </p>

              <h3 className="mt-6 text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {service.title}
              </h3>

              <p className="mt-6 text-base leading-relaxed text-ink-muted">
                {service.description}
              </p>

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

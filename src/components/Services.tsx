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

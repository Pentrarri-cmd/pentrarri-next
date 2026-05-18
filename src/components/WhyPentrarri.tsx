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
    <section id="warum" className="relative py-32 md:py-40">
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
            Premium-Software entsteht nicht durch Templates und
            Account-Manager-Karussells. Sondern durch direkten Bau, präzise
            Kommunikation und einen Stack, der hält.
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

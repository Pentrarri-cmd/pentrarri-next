'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-32 md:pt-48 md:pb-40">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[600px] -translate-x-1/2 glow-gold animate-glow-pulse" />
      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-[400px] w-[400px] glow-purple opacity-50" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="label-mono mb-8">
            <span className="text-gold">●</span> Webseiten · SaaS · Showcase
          </p>

          <h1 className="text-display-xl font-sans font-light text-ink">
            Digitale Produkte{' '}
            <span className="display-italic">mit Anspruch.</span>
          </h1>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            Pentrarri baut Webseiten und Software für Unternehmen,
            die mehr wollen als ein Template. Aus Butzbach. Für ganz Deutschland.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
              Was wir bauen
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

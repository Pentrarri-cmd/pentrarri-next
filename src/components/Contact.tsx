'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

export function Contact() {
  return (
    <section
      id="kontakt"
      className="relative border-t border-ink-soft/20 bg-bg-elevated py-32 md:py-40"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 glow-gold opacity-50" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="label-mono mb-6 inline-flex justify-center">
            <span className="text-gold">●</span>{' '}
            <span className="ml-2 text-ink-muted">
              KONTAKT · BEREIT WENN SIE ES SIND
            </span>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 grid max-w-3xl gap-4 md:grid-cols-2"
        >
          <a
            href="mailto:info@pentrarri.com"
            className="group flex flex-col items-start gap-4 rounded-2xl border border-ink-soft/30 bg-bg p-8 transition-all hover:border-gold/40 hover:bg-bg-soft"
          >
            <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
              Per E-Mail
            </p>
            <div className="flex items-center gap-3 text-xl font-medium text-ink md:text-2xl">
              <span>info@pentrarri.com</span>
              <span className="text-gold transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
            <p className="text-sm text-ink-muted">
              Beste Wahl für ausführliche Anfragen. Kurze Beschreibung Ihres
              Vorhabens reicht.
            </p>
          </a>

          <a
            href="tel:+4915233874863"
            className="group flex flex-col items-start gap-4 rounded-2xl border border-ink-soft/30 bg-bg p-8 transition-all hover:border-gold/40 hover:bg-bg-soft"
          >
            <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
              Per Telefon
            </p>
            <div className="flex items-center gap-3 text-xl font-medium text-ink md:text-2xl">
              <span>+49 152 3387 4863</span>
              <span className="text-gold transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
            <p className="text-sm text-ink-muted">
              Lieber direkt? Werktags 9-18 Uhr. Außerhalb gerne kurze Nachricht.
            </p>
          </a>
        </motion.div>

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

'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export function ContactV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1.5, 2.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.4]);

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0.8]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.1, 0.5], [0.9, 1, 1.05]);

  const emailX = useTransform(scrollYProgress, [0.3, 0.55], ['-100%', '0%']);
  const emailOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

  const phoneX = useTransform(scrollYProgress, [0.4, 0.65], ['100%', '0%']);
  const phoneOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);

  const footerOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  return (
    <section id="kontakt" ref={ref} className="relative min-h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-bg-elevated">
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute h-[600px] w-[600px] glow-gold"
        />

        <div className="relative z-10 w-full max-w-4xl px-6 text-center md:px-10">
          <motion.div style={{ opacity: headlineOpacity, scale: headlineScale }}>
            <p className="label-mono mb-6 inline-flex">
              <span className="text-gold">●</span>
              <span className="ml-2 text-ink-muted">
                KONTAKT · BEREIT WENN SIE ES SIND
              </span>
            </p>
            <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
              Lassen Sie uns über Ihr{' '}
              <span className="display-accent">Projekt sprechen.</span>
            </h2>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-3xl gap-4 md:grid-cols-2">
            <motion.a
              href="mailto:info@pentrarri.com"
              style={{ x: emailX, opacity: emailOpacity }}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-ink-soft/30 bg-bg p-8 text-left transition-all hover:border-gold/40"
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
            </motion.a>

            <motion.a
              href="tel:+4915233874863"
              style={{ x: phoneX, opacity: phoneOpacity }}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-ink-soft/30 bg-bg p-8 text-left transition-all hover:border-gold/40"
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
            </motion.a>
          </div>

          <motion.p
            style={{ opacity: footerOpacity }}
            className="mt-16 font-mono text-xs uppercase tracking-mono-label text-ink-muted"
          >
            Aus Butzbach · Für ganz Deutschland · DSGVO-konform
          </motion.p>
        </div>
      </div>
    </section>
  );
}

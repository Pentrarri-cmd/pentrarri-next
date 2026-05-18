'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export function HeroV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.45], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0, 0.1], [20, 0]);

  const word1X = useTransform(scrollYProgress, [0.1, 0.25], ['-100px', '0px']);
  const word1Opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.85], [0, 1, 1, 0]);

  const word2X = useTransform(scrollYProgress, [0.2, 0.35], ['100px', '0px']);
  const word2Opacity = useTransform(scrollYProgress, [0.2, 0.35, 0.7, 0.85], [0, 1, 1, 0]);

  const word3Y = useTransform(scrollYProgress, [0.3, 0.5], [60, 0]);
  const word3Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.85], [0, 1, 1, 0]);

  const bodyOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 0.95], [0, 1, 1, 0]);
  const bodyY = useTransform(scrollYProgress, [0.5, 0.65], [30, 0]);

  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.75, 0.85, 1], [0, 1, 1, 0.3]);
  const ctaY = useTransform(scrollYProgress, [0.6, 0.75], [20, 0]);

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 2.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.2]);

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute h-[600px] w-[600px] glow-gold"
        />
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] glow-purple"
        />

        <div className="relative z-10 w-full max-w-5xl px-6 text-center md:px-10">
          <motion.p
            style={{ opacity: eyebrowOpacity, y: eyebrowY }}
            className="label-mono mb-10 inline-flex"
          >
            <span className="text-gold">●</span>
            <span className="ml-2 text-ink-muted">PENTRARRI · 2026</span>
          </motion.p>

          <h1 className="text-display-xl font-sans font-light tracking-tighter text-ink">
            <motion.span
              style={{ x: word1X, opacity: word1Opacity }}
              className="inline-block"
            >
              Digitale
            </motion.span>{' '}
            <motion.span
              style={{ x: word2X, opacity: word2Opacity }}
              className="inline-block"
            >
              Produkte
            </motion.span>
            <br />
            <motion.span
              style={{ y: word3Y, opacity: word3Opacity }}
              className="display-accent inline-block"
            >
              mit Anspruch.
            </motion.span>
          </h1>

          <motion.p
            style={{ opacity: bodyOpacity, y: bodyY }}
            className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
          >
            Pentrarri baut Webseiten und Software für Unternehmen, die mehr wollen
            als ein Template. Aus Butzbach. Für ganz Deutschland.
          </motion.p>

          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
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
              Was wir bauen →
            </a>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted"
        >
          ↓ Scrollen
        </motion.div>
      </div>
    </section>
  );
}

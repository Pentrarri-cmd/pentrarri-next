'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Container } from './Container';
import { TextReveal } from './TextReveal';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
    >
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[600px] -translate-x-1/2 glow-gold animate-glow-pulse"
      />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute right-0 top-20 -z-10 h-[400px] w-[400px] glow-purple opacity-40"
      />

      <Container>
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="mx-auto max-w-5xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="label-mono mb-10"
          >
            <span className="text-gold">●</span>{' '}
            <span className="text-ink-muted">PENTRARRI · 2026</span>
          </motion.p>

          <h1 className="text-display-xl font-sans font-light tracking-tighter text-ink">
            <TextReveal>Digitale Produkte mit</TextReveal>{' '}
            <span className="display-accent">
              <TextReveal delay={0.4}>Anspruch.</TextReveal>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
          >
            Pentrarri baut Webseiten und Software für Unternehmen, die mehr wollen
            als ein Template. Aus Butzbach. Für ganz Deutschland.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#kontakt"
              className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 font-sans text-sm font-medium text-bg transition-all hover:bg-gold-glow"
            >
              <span className="relative z-10">Projekt anfragen</span>
              <span className="absolute inset-0 -z-0 translate-x-[-100%] bg-gold-glow transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#leistungen"
              className="rounded-full border border-ink-soft px-8 py-4 font-sans text-sm font-medium text-ink transition-all hover:border-ink-muted hover:bg-ink/5"
            >
              Was wir bauen →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 flex flex-wrap items-center gap-8 border-t border-ink-soft/30 pt-8 text-xs font-mono uppercase tracking-mono-label text-ink-muted"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span>Live aus Butzbach</span>
            </div>
            <span className="text-ink-soft">·</span>
            <div>
              <span className="text-ink">99.9%</span> Uptime
            </div>
            <span className="text-ink-soft">·</span>
            <div>
              <span className="text-ink">Edge</span> Performance
            </div>
            <span className="text-ink-soft">·</span>
            <div>
              <span className="text-ink">DSGVO</span> Self-Hosted
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

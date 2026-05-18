'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';

export function ShowcaseV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.95]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [25, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.6]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section id="showcase" ref={ref} className="relative min-h-[250vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-bg">
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-32 left-0 right-0 px-6 text-center md:px-10"
        >
          <p className="label-mono mb-4 inline-flex">
            <span className="text-gold">●</span>
            <span className="ml-2 text-ink-muted">SHOWCASE · BEGEHBAR</span>
          </p>
          <h2 className="text-display-md font-sans font-light tracking-tighter text-ink">
            Statt Folien. <span className="display-accent">Klickbare Demos.</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ scale, rotateX, opacity, perspective: 1200 }}
          className="w-full max-w-4xl px-6 md:px-10"
        >
          <Link
            href="/showcase/sartoria-hub"
            className="group relative block overflow-hidden rounded-2xl border border-ink-soft/30 bg-bg-elevated transition-colors hover:border-gold/40"
          >
            <div className="relative aspect-[16/9] overflow-hidden border-b border-ink-soft/30">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-2/3 glow-gold opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-2xl space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {['47', '€384k', '5.2 Wo', '98%'].map((v, i) => (
                      <div
                        key={i}
                        className="rounded-md border border-ink-soft/40 bg-bg/60 p-3 backdrop-blur-sm"
                      >
                        <div className="text-base font-light text-ink md:text-lg">{v}</div>
                        <div className="mt-1 font-mono text-[8px] uppercase tracking-mono-label text-gold">
                          ↑ +12%
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['Beratung', 'Erstmaß', 'Produktion', 'Probe', 'Lieferung'].map(
                      (s, i) => (
                        <div
                          key={i}
                          className="rounded border border-ink-soft/30 bg-bg/40 p-2 backdrop-blur-sm"
                        >
                          <div className="font-mono text-[8px] uppercase tracking-mono-label text-ink-muted">
                            {s}
                          </div>
                          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-bg-soft">
                            <div
                              className="h-full bg-gold/60"
                              style={{ width: `${30 + i * 10}%` }}
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-mono-label text-gold">
                SaaS · Internal Tool
              </p>
              <h3 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Sartoria Hub
              </h3>
              <p className="mt-3 text-base text-ink-muted">
                Order Management für eine fiktive Maßmanufaktur.
              </p>
              <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-mono-label text-gold transition-all group-hover:gap-5">
                <span>Demo öffnen</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

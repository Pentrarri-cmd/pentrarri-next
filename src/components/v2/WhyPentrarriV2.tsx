'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'Maßgeschneidert.',
    description:
      'Jede Zeile Code ist auf Ihr Unternehmen zugeschnitten. Kein gekaufter Theme, keine Drag-and-Drop-Lösung.',
  },
  {
    number: '02',
    title: 'Eine Person verantwortlich.',
    description:
      'Sie sprechen direkt mit dem Builder. Keine Account-Manager, keine Übersetzer, keine Telefon-Schleifen.',
  },
  {
    number: '03',
    title: 'Webseite und Software vereint.',
    description:
      'Marketing-Site und internes Tool? Beides aus einer Hand. Konsistente Codebasis, ein Ansprechpartner.',
  },
  {
    number: '04',
    title: 'Premium-Stack mit langer Halbwertszeit.',
    description:
      'Next.js, TypeScript, Cloudflare Edge. Performance-optimiert, DSGVO-konform, gebaut für die nächsten fünf Jahre.',
  },
];

export function WhyPentrarriV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-240vw']);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.3]);

  return (
    <section id="warum" ref={ref} className="relative min-h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-bg">
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-32 left-0 right-0 z-10 px-6 text-center md:px-10"
        >
          <p className="label-mono mb-4 inline-flex">
            <span className="text-gold">●</span>
            <span className="ml-2 text-ink-muted">WARUM PENTRARRI · VIER GRÜNDE</span>
          </p>
          <h2 className="text-display-md font-sans font-light tracking-tighter text-ink">
            Anders als die <span className="display-accent">Standard-Agentur.</span>
          </h2>
        </motion.div>

        <div className="flex flex-1 items-center">
          <motion.div style={{ x }} className="flex shrink-0">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="flex h-screen w-screen shrink-0 items-center justify-center px-12 md:px-24"
              >
                <div className="max-w-3xl">
                  <p className="font-mono text-7xl font-light text-gold/30 md:text-9xl">
                    {pillar.number}
                  </p>
                  <h3 className="mt-8 text-4xl font-medium tracking-tight text-ink md:text-6xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 h-0.5 w-32 -translate-x-1/2 overflow-hidden rounded-full bg-ink-soft/30">
          <motion.div
            style={{ scaleX: scrollYProgress, originX: 0 }}
            className="h-full w-full bg-gold"
          />
        </div>
      </div>
    </section>
  );
}

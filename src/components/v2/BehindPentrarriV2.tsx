'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const sentences = [
  'Ich bin Michael Grigorchuk, Gründer und Builder hinter Pentrarri.',
  'Seit 2019 baue ich Webseiten und Software aus Butzbach heraus — für Unternehmen, die mehr wollen als ein Template.',
  'Pentrarri ist mein Versuch, eine andere Art Software-Agentur zu sein.',
  'Ich arbeite alleine — nicht weil mir das Budget für ein Team fehlt, sondern weil Premium-Arbeit durch direkte Beziehungen entsteht.',
  'Wenn Sie mich beauftragen, sprechen Sie mit der Person, die Ihren Code schreibt.',
];

export function BehindPentrarriV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0.3]);

  /* eslint-disable react-hooks/rules-of-hooks */
  const sentenceOpacities = sentences.map((_, i) => {
    const start = 0.1 + i * 0.13;
    return useTransform(scrollYProgress, [start, start + 0.05], [0.15, 1]);
  });

  const sentenceScales = sentences.map((_, i) => {
    const start = 0.1 + i * 0.13;
    return useTransform(scrollYProgress, [start, start + 0.05], [0.95, 1]);
  });
  /* eslint-enable react-hooks/rules-of-hooks */

  return (
    <section id="ueber" ref={ref} className="relative min-h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-bg">
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-32 left-0 right-0 px-6 text-center md:px-10"
        >
          <p className="label-mono mb-4 inline-flex">
            <span className="text-gold">●</span>
            <span className="ml-2 text-ink-muted">HINTER PENTRARRI · DIE PERSON</span>
          </p>
          <h2 className="text-display-md font-sans font-light tracking-tighter text-ink">
            Eine Person. <span className="display-accent">Nicht eine Agentur.</span>
          </h2>
        </motion.div>

        <div className="w-full max-w-4xl px-6 md:px-10">
          <div className="space-y-6">
            {sentences.map((sentence, i) => (
              <motion.p
                key={i}
                style={{ opacity: sentenceOpacities[i], scale: sentenceScales[i] }}
                className={
                  i === 0
                    ? 'text-2xl text-ink md:text-3xl'
                    : 'text-lg leading-relaxed text-ink-muted md:text-xl'
                }
              >
                {sentence}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

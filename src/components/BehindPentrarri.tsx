'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';

const stats = [
  { label: 'Solo seit', value: '2019' },
  { label: 'Standort', value: 'Butzbach' },
  { label: 'Modus', value: 'Direkt erreichbar' },
];

export function BehindPentrarri() {
  return (
    <section
      id="ueber"
      className="relative border-t border-ink-soft/20 py-32 md:py-40"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl"
        >
          <p className="label-mono mb-6">
            <span className="text-gold">●</span>{' '}
            <span className="text-ink-muted">HINTER PENTRARRI · DIE PERSON</span>
          </p>
          <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Eine Person. <span className="display-accent">Nicht eine Agentur.</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="space-y-6 text-base leading-relaxed text-ink-muted md:text-lg">
              <p className="text-xl text-ink md:text-2xl">
                Ich bin Michael Grigorchuk, Gründer und Builder hinter Pentrarri.
              </p>
              <p>
                Seit 2019 baue ich Webseiten und Software aus Butzbach heraus — für
                Unternehmen, die mehr wollen als ein Template.
              </p>
              <p>
                Pentrarri ist mein Versuch, eine andere Art Software-Agentur zu sein.
                Ich arbeite alleine — nicht weil mir das Budget für ein Team fehlt,
                sondern weil ich überzeugt bin: Premium-Arbeit entsteht durch direkte
                Beziehungen. Nicht durch Account-Manager-Lottos. Nicht durch
                Telefon-Schleifen.
              </p>
              <p>
                Wenn Sie mich beauftragen, sprechen Sie mit der Person, die Ihren Code
                schreibt. Keine Übersetzer dazwischen.
              </p>
            </div>

            <a
              href="#kontakt"
              className="mt-12 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-mono-label text-gold transition-all hover:gap-5"
            >
              <span>Reden wir</span>
              <span>→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-ink-soft/30 bg-bg-elevated p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                Eckdaten
              </p>
              <dl className="mt-8 space-y-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-baseline justify-between border-b border-ink-soft/30 pb-6 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-mono-label text-ink-muted">
                      {stat.label}
                    </dt>
                    <dd className="text-2xl font-light tracking-tight text-ink md:text-3xl">
                      {stat.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>

              <div className="mt-10 border-t border-ink-soft/30 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle animate-pulse" />
                  Antwortet meist innerhalb von 24h
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from './Container';

const featuredDemo = {
  slug: 'sartoria-hub',
  label: 'SaaS · Internal Tool',
  title: 'Sartoria Hub',
  subtitle: 'Order Management für eine fiktive Maßmanufaktur.',
  description:
    'Pipeline, Kundenakten, Stoff-Inventar — alles begehbar. Sehen Sie wie ein internes Tool für ein Premium-Atelier aussehen könnte.',
};

export function Showcase() {
  return (
    <section
      id="showcase"
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
            <span className="text-ink-muted">SHOWCASE · BEGEHBAR</span>
          </p>
          <h2 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Statt Folien.{' '}
            <span className="display-accent">Klickbare Demos.</span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink-muted">
            Wir zeigen lieber das Produkt als das Versprechen. Erkunden Sie ein
            fiktives Tool, das wir für eine Premium-Maßmanufaktur gebaut haben.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/showcase/${featuredDemo.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-ink-soft/30 bg-bg-elevated transition-all hover:border-gold/40"
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
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-mono-label text-gold">
                  {featuredDemo.label}
                </p>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                  Live · Begehbar
                </span>
              </div>
              <h3 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                {featuredDemo.title}
              </h3>
              <p className="mt-3 text-base text-ink-muted">{featuredDemo.subtitle}</p>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {featuredDemo.description}
              </p>
              <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-mono-label text-gold transition-all group-hover:gap-5">
                <span>Demo öffnen</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-ink-muted transition-colors hover:text-gold"
          >
            <span>Alle Demos ansehen</span>
            <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

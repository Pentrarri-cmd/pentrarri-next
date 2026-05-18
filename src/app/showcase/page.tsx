import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/Container';

export const metadata: Metadata = {
  title: 'Showcase — Pentrarri',
  description:
    'Live-Demonstrationen unserer Arbeit. SaaS-Mockups, Webseiten, Editorial-Projekte.',
};

const demos = [
  {
    slug: 'sartoria-hub',
    label: 'SaaS · Internal Tool',
    title: 'Sartoria Hub',
    subtitle: 'Order Management für eine fiktive Maßmanufaktur.',
    description:
      'Internes Tool für eine fiktive Premium-Maßatelier. Pipeline-Management, Kundenakten, Stoff-Inventar. Begehbar, interaktiv, mit Mock-Daten.',
    tech: ['Next.js', 'TypeScript', 'Edge'],
    status: 'Live',
  },
];

export default function ShowcasePage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-32 md:pt-40">
        <Container>
          <p className="label-mono mb-6">
            <span className="text-gold">●</span>{' '}
            <span className="text-ink-muted">SHOWCASE · DEMOS</span>
          </p>
          <h1 className="text-display-lg font-sans font-light tracking-tighter text-ink">
            Begehbare Demos.{' '}
            <span className="display-accent">Klickbar, scrollbar.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Statt Folien zeigen wir lieber das Produkt. Hier finden Sie fiktive Tools
            und Webseiten, die unsere Arbeitsweise sichtbar machen.
          </p>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            {demos.map((demo) => (
              <Link
                key={demo.slug}
                href={`/showcase/${demo.slug}`}
                className="group block border-t border-ink-soft/30 pt-8 transition-colors hover:border-gold/40"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-mono-label text-gold">
                    {demo.label}
                  </p>
                  <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    {demo.status}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  {demo.title}
                </h2>
                <p className="mt-3 text-base text-ink-muted">{demo.subtitle}</p>
                <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                  {demo.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {demo.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink-soft/50 bg-bg-soft px-3 py-1 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-ink-muted transition-colors group-hover:text-gold">
                    Demo öffnen
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

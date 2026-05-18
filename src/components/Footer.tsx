import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-t border-ink-soft/20 py-12">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-sans text-base font-medium text-ink">Pentrarri Group</p>
            <p className="mt-1 text-sm text-ink-muted">
              Digitale Produkte mit Anspruch. Aus Butzbach.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-ink-muted">
            <Link href="/impressum" className="hover:text-ink">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-ink">
              Datenschutz
            </Link>
          </div>
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-mono-label text-ink-soft">
          © {new Date().getFullYear()} Pentrarri Group
        </p>
      </Container>
    </footer>
  );
}

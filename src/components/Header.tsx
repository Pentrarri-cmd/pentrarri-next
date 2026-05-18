'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from './Container';

const navItems = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Kontakt', href: '#kontakt' },
];

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-ink-soft/20 bg-bg/80 backdrop-blur-xl"
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="font-sans text-base font-medium tracking-tight text-ink">
            Pentrarri
          </Link>
          <ul className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#kontakt"
            className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-sm text-gold transition-all hover:border-gold hover:bg-gold/20"
          >
            Anfrage
          </Link>
        </nav>
      </Container>
    </motion.header>
  );
}

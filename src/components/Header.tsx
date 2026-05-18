'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from './Container';

const navItems = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Kontakt', href: '#kontakt' },
];

export function Header() {
  const { scrollY } = useScroll();
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0.6)', 'rgba(10, 10, 10, 0.85)'],
  );
  const backdropFilter = useTransform(headerBlur, (v) => `blur(${v}px)`);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backdropFilter,
        backgroundColor: headerBg,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-ink-soft/30"
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="relative h-7 w-7">
              <Image
                src="/logo.webp"
                alt="Pentrarri Group"
                width={28}
                height={28}
                className="object-contain transition-all duration-500 group-hover:rotate-12"
              />
            </div>
            <span className="font-sans text-base font-medium tracking-tight text-ink">
              Pentrarri
            </span>
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

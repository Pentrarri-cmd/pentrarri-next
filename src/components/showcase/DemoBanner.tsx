'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface DemoBannerProps {
  demoLabel: string;
  brandName: string;
}

export function DemoBanner({ demoLabel, brandName }: DemoBannerProps) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-gold/20 bg-bg/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-mono-label">
          <span className="rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-gold">
            DEMO
          </span>
          <span className="text-ink-muted">Pentrarri Showcase</span>
          <span className="hidden text-ink-soft md:inline">·</span>
          <span className="hidden text-ink md:inline">{demoLabel}</span>
          <span className="sr-only">{brandName}</span>
        </div>
        <Link
          href="/showcase"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-mono-label text-ink-muted transition-colors hover:text-gold"
        >
          <span>←</span>
          <span className="hidden sm:inline">Zurück zur Übersicht</span>
          <span className="sm:hidden">Zurück</span>
        </Link>
      </div>
    </motion.div>
  );
}

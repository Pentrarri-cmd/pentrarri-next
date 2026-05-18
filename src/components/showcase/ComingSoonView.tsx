'use client';

import { motion } from 'framer-motion';

interface ComingSoonViewProps {
  title: string;
}

export function ComingSoonView({ title }: ComingSoonViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[60vh] items-center justify-center"
    >
      <div className="max-w-md text-center">
        <div className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
          {title}
        </div>
        <h2 className="mt-4 text-3xl font-light tracking-tight text-ink">
          Coming Soon
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Diese Ansicht ist Teil der Demo-Roadmap und in Vorbereitung. In der
          Live-Version würde hier{' '}
          <span className="text-ink">{title}</span> mit voller Funktionalität verfügbar sein.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink-soft/40 bg-bg-elevated px-4 py-2 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          In Entwicklung
        </div>
      </div>
    </motion.div>
  );
}

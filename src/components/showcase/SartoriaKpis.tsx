'use client';

import { motion } from 'framer-motion';
import { sartoriaData } from '@/data/sartoria-hub';

export function SartoriaKpis() {
  return (
    <div className="grid grid-cols-2 gap-px bg-ink-soft/30 lg:grid-cols-4">
      {sartoriaData.kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="group bg-bg p-6 transition-colors hover:bg-bg-elevated md:p-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
            {kpi.label}
          </p>
          <p className="mt-4 text-3xl font-light tracking-tight text-ink md:text-4xl">
            {kpi.value}
          </p>
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-mono-label">
            <span className={kpi.positive ? 'text-gold' : 'text-red-400'}>
              {kpi.delta}
            </span>
            <span className="text-ink-soft">{kpi.period}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

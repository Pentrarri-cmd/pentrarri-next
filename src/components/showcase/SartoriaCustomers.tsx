'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { sartoriaCustomers, type SartoriaCustomer } from '@/data/sartoria-hub';

const tierLabels: Record<SartoriaCustomer['tier'], string> = {
  vip: 'VIP',
  aktiv: 'Aktiv',
  neu: 'Neu',
};

const tierStyles: Record<SartoriaCustomer['tier'], string> = {
  vip: 'border-gold/40 bg-gold/10 text-gold',
  aktiv: 'border-ink-soft/40 bg-bg-soft text-ink-muted',
  neu: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
};

const tierFilters: Array<{ label: string; value: 'all' | SartoriaCustomer['tier'] }> = [
  { label: 'Alle', value: 'all' },
  { label: 'VIP', value: 'vip' },
  { label: 'Aktiv', value: 'aktiv' },
  { label: 'Neu', value: 'neu' },
];

export function SartoriaCustomers() {
  const [filter, setFilter] = useState<'all' | SartoriaCustomer['tier']>('all');

  const filtered =
    filter === 'all'
      ? sartoriaCustomers
      : sartoriaCustomers.filter((c) => c.tier === filter);

  return (
    <div>
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
          Kunden · {filtered.length}
        </p>
        <h2 className="mt-1 text-xl font-medium tracking-tight text-ink">Kundenstamm</h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tierFilters.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-mono-label transition-all ${
              filter === t.value
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-ink-soft/40 bg-bg-elevated text-ink-muted hover:border-ink-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group rounded-xl border border-ink-soft/30 bg-bg-elevated p-6 transition-all hover:border-gold/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 font-mono text-xs text-gold ring-1 ring-gold/40">
                  {customer.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">{customer.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
                    {customer.location}
                  </div>
                </div>
              </div>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-mono-label ${tierStyles[customer.tier]}`}
              >
                {tierLabels[customer.tier]}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-soft/30 pt-4">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-mono-label text-ink-soft">
                  Aufträge
                </div>
                <div className="mt-1 text-lg font-light text-ink">{customer.orders}</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-mono-label text-ink-soft">
                  Umsatz
                </div>
                <div className="mt-1 text-lg font-light text-ink">{customer.spent}</div>
              </div>
            </div>

            <div className="mt-4 border-t border-ink-soft/30 pt-4">
              <div className="font-mono text-[9px] uppercase tracking-mono-label text-ink-soft">
                Stil
              </div>
              <div className="mt-1 text-xs text-ink-muted">{customer.style}</div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-ink-soft/30 pt-4 font-mono text-[10px] uppercase tracking-mono-label">
              <span className="text-ink-soft">Seit {customer.since}</span>
              <span className="text-ink-muted">{customer.lastContact}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

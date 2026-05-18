'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { sartoriaData } from '@/data/sartoria-hub';

interface SartoriaOrdersProps {
  onOrderClick: (orderId: string) => void;
}

const statusFilters = [
  'Alle',
  'Beratung',
  'Erstmaß',
  'In Produktion',
  'Probe',
  'Auslieferung',
];

export function SartoriaOrders({ onOrderClick }: SartoriaOrdersProps) {
  const [activeFilter, setActiveFilter] = useState<string>('Alle');

  const allOrders = sartoriaData.pipeline.flatMap((column) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    column.orders.map((order: any) => ({ ...order, status: column.status })),
  );

  const filtered =
    activeFilter === 'Alle'
      ? allOrders
      : allOrders.filter((o) => o.status === activeFilter);

  return (
    <div>
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
          Aufträge · {filtered.length}
        </p>
        <h2 className="mt-1 text-xl font-medium tracking-tight text-ink">
          Alle aktuellen Aufträge
        </h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-mono-label transition-all ${
              activeFilter === filter
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-ink-soft/40 bg-bg-elevated text-ink-muted hover:border-ink-muted hover:text-ink'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="hidden border-b border-ink-soft/30 pb-3 md:grid md:grid-cols-12 md:gap-4 md:px-4">
        <div className="col-span-2 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
          Auftrag
        </div>
        <div className="col-span-3 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
          Kunde
        </div>
        <div className="col-span-2 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
          Item
        </div>
        <div className="col-span-3 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
          Stoff
        </div>
        <div className="col-span-2 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
          Status
        </div>
      </div>

      <div className="divide-y divide-ink-soft/20">
        {filtered.map((order, i) => (
          <motion.button
            key={order.id}
            onClick={() => onOrderClick(order.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group grid w-full grid-cols-1 gap-2 px-4 py-4 text-left transition-colors hover:bg-bg-elevated md:grid-cols-12 md:gap-4 md:py-3"
          >
            <div className="col-span-2 font-mono text-xs text-gold">{order.id}</div>
            <div className="col-span-3 text-sm font-medium text-ink">{order.customer}</div>
            <div className="col-span-2 text-sm text-ink-muted">{order.item}</div>
            <div className="col-span-3 font-mono text-[11px] uppercase tracking-mono-label text-ink-muted">
              {order.fabric}
            </div>
            <div className="col-span-2 flex items-center justify-between">
              <span className="rounded-full border border-ink-soft/40 bg-bg-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
                {order.status}
              </span>
              <span className="text-ink-soft transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-dashed border-ink-soft/30 py-12 text-center text-ink-muted">
          <p className="text-sm">Keine Aufträge mit Status &quot;{activeFilter}&quot;</p>
        </div>
      )}
    </div>
  );
}

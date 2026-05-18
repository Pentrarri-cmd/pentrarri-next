'use client';

import { motion } from 'framer-motion';
import { sartoriaData } from '@/data/sartoria-hub';

interface SartoriaPipelineProps {
  onOrderClick: (orderId: string) => void;
  onShowAll: () => void;
}

export function SartoriaPipeline({ onOrderClick, onShowAll }: SartoriaPipelineProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
            Pipeline
          </p>
          <h2 className="mt-1 text-xl font-medium tracking-tight text-ink">
            Aktuelle Aufträge
          </h2>
        </div>
        <button
          onClick={onShowAll}
          className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted transition-colors hover:text-gold"
        >
          Alle ansehen →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {sartoriaData.pipeline.map((column, columnIndex) => (
          <motion.div
            key={column.status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: columnIndex * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between border-b border-ink-soft/30 pb-3">
              <span className="font-mono text-[10px] uppercase tracking-mono-label text-ink">
                {column.status}
              </span>
              <span className="rounded-full bg-bg-elevated px-2 py-0.5 font-mono text-[10px] text-ink-muted">
                {column.count}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {column.orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => onOrderClick(order.id)}
                  className="group rounded-lg border border-ink-soft/30 bg-bg-elevated p-4 text-left transition-all hover:border-gold/30 hover:bg-bg-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                      {order.id}
                    </span>
                    <span className="font-mono text-[10px] text-ink-soft">
                      {order.updated}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-ink">{order.customer}</div>
                  <div className="mt-1 text-xs text-ink-muted">{order.item}</div>
                  <div className="mt-3 border-t border-ink-soft/20 pt-2 font-mono text-[10px] uppercase tracking-mono-label text-ink-soft transition-colors group-hover:text-ink-muted">
                    {order.fabric}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

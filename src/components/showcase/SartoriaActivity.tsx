'use client';

import { motion } from 'framer-motion';
import { sartoriaData } from '@/data/sartoria-hub';

const toneColors = {
  success: 'bg-gold',
  warning: 'bg-amber-400',
  info: 'bg-ink-muted',
};

interface SartoriaActivityProps {
  onOrderClick: (orderId: string) => void;
}

export function SartoriaActivity({ onOrderClick }: SartoriaActivityProps) {
  return (
    <div>
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
          Aktivität
        </p>
        <h2 className="mt-1 text-xl font-medium tracking-tight text-ink">
          Letzte Ereignisse
        </h2>
      </div>

      <div className="overflow-hidden rounded-xl border border-ink-soft/30 bg-bg-elevated/50">
        {sartoriaData.activity.map((event, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => onOrderClick(event.target)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`flex w-full cursor-pointer items-start gap-4 p-4 text-left transition-colors hover:bg-bg-elevated ${
              i !== sartoriaData.activity.length - 1 ? 'border-b border-ink-soft/20' : ''
            }`}
          >
            <div className="flex flex-col items-center pt-1.5">
              <span className={`h-2 w-2 rounded-full ${toneColors[event.tone]}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm text-ink">{event.actor}</span>
                <span className="font-mono text-[10px] text-ink-soft">{event.time}</span>
              </div>
              <div className="mt-0.5 text-xs text-ink-muted">
                {event.action}{' '}
                <span className="font-mono text-gold">{event.target}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

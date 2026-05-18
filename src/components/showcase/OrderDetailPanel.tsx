'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { sartoriaData, sartoriaCustomers } from '@/data/sartoria-hub';

interface OrderDetailPanelProps {
  orderId: string;
  onClose: () => void;
}

export function OrderDetailPanel({ orderId, onClose }: OrderDetailPanelProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let foundOrder: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let foundColumn: any = null;
  for (const column of sartoriaData.pipeline) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const match = column.orders.find((o: any) => o.id === orderId);
    if (match) {
      foundOrder = match;
      foundColumn = column;
      break;
    }
  }

  const customer = foundOrder
    ? sartoriaCustomers.find((c) => c.id === foundOrder.customerId)
    : null;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!foundOrder) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-bg/70 backdrop-blur-sm"
      />

      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-ink-soft/30 bg-bg shadow-2xl md:max-w-lg"
      >
        <div className="flex items-start justify-between border-b border-ink-soft/30 p-6 md:p-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                {foundOrder.id}
              </span>
              <span className="rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-mono-label text-gold">
                {foundColumn.status}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-medium tracking-tight text-ink">
              {foundOrder.customer}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">{foundOrder.item}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-ink-muted transition-colors hover:bg-bg-elevated hover:text-ink"
            aria-label="Schließen"
          >
            <span className="block text-lg">×</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <section className="border-b border-ink-soft/30 p-6 md:p-8">
            <h3 className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
              Übersicht
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Stoff</dt>
                <dd className="text-right text-ink">{foundOrder.fabric}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Item</dt>
                <dd className="text-right text-ink">{foundOrder.item}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Letzte Aktualisierung</dt>
                <dd className="text-right font-mono text-xs text-ink-muted">
                  {foundOrder.updated}
                </dd>
              </div>
              {foundOrder.totalPrice && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">Auftragswert</dt>
                  <dd className="text-right text-ink">{foundOrder.totalPrice}</dd>
                </div>
              )}
              {typeof foundOrder.paid === 'boolean' && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">Zahlung</dt>
                  <dd
                    className={`text-right font-mono text-xs uppercase tracking-mono-label ${
                      foundOrder.paid ? 'text-gold' : 'text-amber-400'
                    }`}
                  >
                    {foundOrder.paid ? 'Eingegangen' : 'Offen'}
                  </dd>
                </div>
              )}
              {customer && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">Kunde seit</dt>
                  <dd className="text-right text-ink">{customer.since}</dd>
                </div>
              )}
            </dl>
          </section>

          {foundOrder.timeline && (
            <section className="border-b border-ink-soft/30 p-6 md:p-8">
              <h3 className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                Status-Verlauf
              </h3>
              <ol className="mt-4 space-y-3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {foundOrder.timeline.map((step: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                        step.current
                          ? 'bg-gold text-bg'
                          : step.completed
                            ? 'bg-gold/30 text-gold'
                            : 'border border-ink-soft/40 bg-bg-elevated text-ink-soft'
                      }`}
                    >
                      {step.completed ? '✓' : ''}
                    </span>
                    <div className="flex flex-1 items-baseline justify-between gap-4">
                      <span
                        className={`text-sm ${
                          step.current
                            ? 'font-medium text-ink'
                            : step.completed
                              ? 'text-ink'
                              : 'text-ink-muted'
                        }`}
                      >
                        {step.status}
                      </span>
                      <span className="font-mono text-[10px] text-ink-soft">
                        {step.date ?? '—'}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {foundOrder.nextAppointment && (
            <section className="border-b border-ink-soft/30 p-6 md:p-8">
              <h3 className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                Nächster Termin
              </h3>
              <div className="mt-4 rounded-lg border border-ink-soft/30 bg-bg-elevated p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-ink">{foundOrder.nextAppointment.type}</span>
                  <span className="font-mono text-xs text-gold">
                    {foundOrder.nextAppointment.date}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-mono-label text-ink-muted">
                  <span>{foundOrder.nextAppointment.location}</span>
                  <span>{foundOrder.nextAppointment.time}</span>
                </div>
              </div>
            </section>
          )}

          {foundOrder.notes && (
            <section className="border-b border-ink-soft/30 p-6 md:p-8">
              <h3 className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                Notizen
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {foundOrder.notes}
              </p>
            </section>
          )}
        </div>

        <div className="border-t border-ink-soft/30 p-6 md:p-8">
          <div className="flex gap-3">
            <button className="flex-1 rounded-md border border-ink-soft/40 bg-bg-elevated px-4 py-2 text-sm text-ink-muted transition-all hover:border-ink-muted hover:text-ink">
              Notiz hinzufügen
            </button>
            <button className="flex-1 rounded-md bg-gold px-4 py-2 text-sm font-medium text-bg transition-all hover:bg-gold-glow">
              Status ändern
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

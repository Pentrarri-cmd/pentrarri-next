'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sartoriaCustomers } from '@/data/sartoria-hub';

interface NewOrderModalProps {
  onClose: () => void;
}

const items = [
  '2-Reiher Anzug',
  '3-Teiler',
  'Smoking',
  'Sakko',
  'Mantel',
  'Hosenanzug',
  'Kostüm',
  'Aktentasche',
  'Schuhe (Maß)',
];

const fabrics = [
  'Loro Piana Wool 120s',
  'Loro Piana Vicuña',
  'Loro Piana Tasmanian',
  'Holland & Sherry Cashmere',
  'Holland & Sherry Tweed',
  'Drago Sigaro',
  'Reda Super 150s',
  'VBC Super 130s',
  'Solbiati Linen',
  'Ariston Wool',
  'Alcantara Leder',
];

export function NewOrderModal({ onClose }: NewOrderModalProps) {
  const [step, setStep] = useState(1);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [item, setItem] = useState<string | null>(null);
  const [fabric, setFabric] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const customer = customerId
    ? sartoriaCustomers.find((c) => c.id === customerId)
    : null;
  const canProceed =
    (step === 1 && !!customerId) ||
    (step === 2 && !!item && !!fabric) ||
    step === 3;

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => onClose(), 2000);
  };

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

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-ink-soft/30 bg-bg-elevated shadow-2xl"
      >
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-16 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-3xl text-gold ring-2 ring-gold/40">
              ✓
            </div>
            <h2 className="mt-6 text-2xl font-medium tracking-tight text-ink">
              Auftrag erfasst
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              {customer?.name} · {item} · {fabric}
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-mono-label text-ink-soft">
              Modal schließt automatisch …
            </p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-start justify-between border-b border-ink-soft/30 p-6 md:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                  Schritt {step} / 3
                </p>
                <h2 className="mt-2 text-2xl font-medium tracking-tight text-ink">
                  {step === 1 && 'Kunde wählen'}
                  {step === 2 && 'Item & Stoff'}
                  {step === 3 && 'Bestätigen'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-ink-muted transition-colors hover:bg-bg-soft hover:text-ink"
                aria-label="Schließen"
              >
                <span className="block text-lg">×</span>
              </button>
            </div>

            <div className="flex gap-2 px-6 pt-6 md:px-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-0.5 flex-1 rounded-full transition-colors ${
                    s <= step ? 'bg-gold' : 'bg-ink-soft/30'
                  }`}
                />
              ))}
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6 md:p-8">
              {step === 1 && (
                <div>
                  <p className="mb-4 text-sm text-ink-muted">
                    Wählen Sie einen bestehenden Kunden oder legen Sie einen neuen an.
                  </p>
                  <div className="max-h-80 space-y-2 overflow-y-auto pr-2">
                    {sartoriaCustomers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCustomerId(c.id)}
                        className={`flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-all ${
                          customerId === c.id
                            ? 'border-gold bg-gold/5'
                            : 'border-ink-soft/30 bg-bg hover:border-ink-muted'
                        }`}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 font-mono text-xs text-gold ring-1 ring-gold/40">
                          {c.initials}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-ink">{c.name}</div>
                          <div className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
                            {c.orders} Aufträge · {c.spent}
                          </div>
                        </div>
                        {customerId === c.id && <span className="text-gold">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-mono-label text-gold">
                      Item
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((i) => (
                        <button
                          key={i}
                          onClick={() => setItem(i)}
                          className={`rounded-full border px-4 py-2 text-sm transition-all ${
                            item === i
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-ink-soft/40 bg-bg text-ink-muted hover:border-ink-muted hover:text-ink'
                          }`}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-mono-label text-gold">
                      Stoff
                    </p>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {fabrics.map((f) => (
                        <button
                          key={f}
                          onClick={() => setFabric(f)}
                          className={`rounded-md border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-mono-label transition-all ${
                            fabric === f
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-ink-soft/40 bg-bg text-ink-muted hover:border-ink-muted hover:text-ink'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-ink-muted">
                    Bitte prüfen Sie die Angaben und bestätigen Sie den neuen Auftrag.
                  </p>
                  <div className="rounded-lg border border-ink-soft/30 bg-bg p-6">
                    <dl className="space-y-4 text-sm">
                      <div className="flex justify-between border-b border-ink-soft/20 pb-3">
                        <dt className="text-ink-muted">Kunde</dt>
                        <dd className="text-right text-ink">{customer?.name}</dd>
                      </div>
                      <div className="flex justify-between border-b border-ink-soft/20 pb-3">
                        <dt className="text-ink-muted">Item</dt>
                        <dd className="text-right text-ink">{item}</dd>
                      </div>
                      <div className="flex justify-between border-b border-ink-soft/20 pb-3">
                        <dt className="text-ink-muted">Stoff</dt>
                        <dd className="text-right text-ink">{fabric}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-ink-muted">Status</dt>
                        <dd className="text-right">
                          <span className="rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-mono-label text-gold">
                            Beratung
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-ink-soft/30 p-6 md:p-8">
              <button
                onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
                className="font-mono text-[11px] uppercase tracking-mono-label text-ink-muted transition-colors hover:text-ink"
              >
                {step > 1 ? '← Zurück' : 'Abbrechen'}
              </button>
              <button
                onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
                disabled={!canProceed}
                className={`rounded-md px-6 py-2 text-sm font-medium transition-all ${
                  canProceed
                    ? 'bg-gold text-bg hover:bg-gold-glow'
                    : 'cursor-not-allowed bg-bg-soft text-ink-soft'
                }`}
              >
                {step < 3 ? 'Weiter →' : 'Auftrag bestätigen'}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

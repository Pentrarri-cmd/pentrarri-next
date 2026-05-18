'use client';

interface SartoriaTopBarProps {
  title: string;
  onNewOrder: () => void;
}

export function SartoriaTopBar({ title, onNewOrder }: SartoriaTopBarProps) {
  return (
    <div className="sticky top-12 z-40 border-b border-ink-soft/30 bg-bg/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-medium text-ink md:text-lg">{title}</h1>
          <span className="hidden font-mono text-[10px] uppercase tracking-mono-label text-ink-muted md:inline">
            · Mittwoch, 18.05.2026
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden rounded-md border border-ink-soft/40 bg-bg-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted transition-colors hover:border-ink-muted hover:text-ink md:block">
            ⌘ K · Suche
          </button>
          <button className="relative rounded-md p-2 text-ink-muted transition-colors hover:bg-bg-elevated hover:text-ink">
            <span className="block h-4 w-4">◷</span>
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          </button>
          <button
            onClick={onNewOrder}
            className="rounded-md bg-gold px-4 py-1.5 text-sm font-medium text-bg transition-all hover:bg-gold-glow"
          >
            + Neuer Auftrag
          </button>
        </div>
      </div>
    </div>
  );
}

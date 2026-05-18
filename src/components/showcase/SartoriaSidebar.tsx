'use client';

import { sartoriaData } from '@/data/sartoria-hub';
import type { ViewId } from './SartoriaHubApp';

const navItems: Array<{ id: ViewId; icon: string; label: string }> = [
  { id: 'dashboard', icon: '▣', label: 'Dashboard' },
  { id: 'orders', icon: '⌗', label: 'Aufträge' },
  { id: 'customers', icon: '○', label: 'Kunden' },
  { id: 'sartoria', icon: '▦', label: 'Sartoria' },
  { id: 'appointments', icon: '◷', label: 'Termine' },
  { id: 'analytics', icon: '↗', label: 'Analytics' },
  { id: 'settings', icon: '⚙', label: 'Einstellungen' },
];

interface SartoriaSidebarProps {
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
}

export function SartoriaSidebar({ activeView, onViewChange }: SartoriaSidebarProps) {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-ink-soft/30 lg:block">
      <div className="sticky top-12 px-6 py-8">
        <div className="mb-10">
          <div className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
            {sartoriaData.brand.name}
          </div>
          <div className="mt-1 text-xs text-ink-muted">
            {sartoriaData.brand.tagline}
          </div>
        </div>

        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
                    activeView === item.id
                      ? 'bg-bg-elevated text-ink'
                      : 'text-ink-muted hover:bg-bg-elevated/50 hover:text-ink'
                  }`}
                >
                  <span
                    className={`font-mono text-base ${
                      activeView === item.id
                        ? 'text-gold'
                        : 'text-ink-soft group-hover:text-ink-muted'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 border-t border-ink-soft/30 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-mono text-xs text-gold ring-1 ring-gold/40">
              SF
            </div>
            <div>
              <div className="text-sm font-medium text-ink">Sara Falcone</div>
              <div className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
                Atelier · München
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

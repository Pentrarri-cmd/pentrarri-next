# Pentrarri Next — Etappe D: Sartoria Hub voll interaktiv

## Kontext

Etappe C ist live: Sartoria Hub als statische Demo unter `/showcase/sartoria-hub`. Michael hat richtig erkannt — die Demo sieht aus wie eine App, ist aber tot bei Klicks. Etappe D macht sie **begehbar**.

**Ziel:** Drei echte Views (Dashboard / Aufträge / Kunden), Side-Panel für Auftragsdetails, 3-Step-Modal für "Neuer Auftrag", "Alle ansehen"-Wires.

**Was bleibt unangetastet:**
- Pentrarri Hauptseite, Header, Footer, Custom Cursor
- Pentrarri Designsystem (Farben, Schriften)
- Sartoria Hub Mock-Daten-Basis (wird nur erweitert, nicht ersetzt)
- DemoBanner, KPIs, Activity-Komponente (Activity wird nur um Klick-Handler erweitert)

---

## Phasen

8 Phasen, Conventional Commits auf Deutsch, sauber von oben nach unten. Bevor du eine Komponente importierst, stelle sicher dass sie im selben oder vorherigen Commit existiert (kein "broken state" wie in Etappe B).

---

### Phase 1 — Mock-Daten erweitern

#### 1.1 — `src/data/sartoria-hub.ts` erweitern

Behalte alles Bestehende, ergänze folgende neue Felder pro Auftrag in `pipeline[].orders[]` (für ALLE 11 Aufträge):

```typescript
// Neue Felder pro Auftrag:
customerId: string;        // 'C-001' bis 'C-011' (siehe Kunden-Liste unten)
notes: string;             // Freitext, 1-2 Sätze (siehe Beispiele unten)
nextAppointment?: {        // Optional, nur bei Aufträgen die einen Termin haben
  date: string;            // '22.05.2026'
  time: string;            // '14:00'
  type: string;            // 'Erstmaß', 'Anprobe', 'Abschluss-Anpassung', etc.
  location: string;        // 'München', 'Berlin', 'Mailand'
};
timeline: Array<{          // Status-Timeline pro Auftrag
  status: string;
  date: string | null;     // null wenn noch nicht erreicht
  completed: boolean;
  current?: boolean;       // true für den aktuellen Schritt
}>;
totalPrice?: string;       // '€8.400' — optional
paid?: boolean;            // optional
```

**Beispiele für `notes`** (variiere realistisch über alle 11):
- "Kunde wünscht klassischen italienischen Schnitt, leichte Schulterpolster."
- "Anpassung am Bauchumfang bei nächster Probe besprechen."
- "Stoff aus Sonderkollektion — Lieferung bestätigt für 24.05."
- "VIP-Kunde, Sonderpreis vereinbart."
- "Erste Bestellung in dieser Saison — Maßdaten aktualisiert."
- "Reklamation Vorgängerauftrag berücksichtigt, doppelte Probe geplant."
- "Sehr empfindlich am Schulterbereich, vorsichtig anprobieren."

**Beispiele für `timeline`** (5-7 Stufen, je nach aktuellem Status):

```typescript
// Beispiel für einen Auftrag in "In Produktion":
timeline: [
  { status: 'Anfrage', date: '02.05.2026', completed: true },
  { status: 'Beratung', date: '05.05.2026', completed: true },
  { status: 'Erstmaß', date: '12.05.2026', completed: true },
  { status: 'In Produktion', date: '15.05.2026', completed: true, current: true },
  { status: 'Probe', date: null, completed: false },
  { status: 'Anpassung', date: null, completed: false },
  { status: 'Auslieferung', date: null, completed: false },
]
```

#### 1.2 — Neue Sektion `customers` in derselben Datei

```typescript
export const sartoriaCustomers = [
  { id: 'C-001', name: 'Klaus Berger', initials: 'KB', tier: 'aktiv', location: 'München', since: '2023', orders: 7, spent: '€42.300', lastContact: 'vor 2h', email: 'k.berger@beispiel.de', preferredFabrics: ['Loro Piana', 'Holland & Sherry'], style: 'Italienisch klassisch' },
  { id: 'C-002', name: 'Sophie Wallenberg', initials: 'SW', tier: 'vip', location: 'Berlin', since: '2020', orders: 12, spent: '€89.700', lastContact: 'vor 5h', email: 's.wallenberg@beispiel.de', preferredFabrics: ['Holland & Sherry', 'Drago'], style: 'Modern minimalistisch' },
  { id: 'C-003', name: 'Friedrich Brandt', initials: 'FB', tier: 'neu', location: 'München', since: '2026', orders: 1, spent: '€6.200', lastContact: 'gestern', email: 'f.brandt@beispiel.de', preferredFabrics: ['Reda'], style: 'Klassisch zurückhaltend' },
  { id: 'C-004', name: 'Maximilian von Hertzberg', initials: 'MH', tier: 'vip', location: 'München', since: '2017', orders: 18, spent: '€156.400', lastContact: 'vor 1h', email: 'm.hertzberg@beispiel.de', preferredFabrics: ['Loro Piana Vicuña', 'Holland & Sherry'], style: 'Britisch elegant' },
  { id: 'C-005', name: 'Anna Linde', initials: 'AL', tier: 'aktiv', location: 'Hamburg', since: '2022', orders: 4, spent: '€18.900', lastContact: 'gestern', email: 'a.linde@beispiel.de', preferredFabrics: ['Solbiati', 'Loro Piana'], style: 'Tailored Hosenanzüge' },
  { id: 'C-006', name: 'Heinrich Maier', initials: 'HM', tier: 'aktiv', location: 'Frankfurt', since: '2021', orders: 5, spent: '€24.500', lastContact: 'vor 3h', email: 'h.maier@beispiel.de', preferredFabrics: ['Ariston', 'VBC'], style: 'Modern italienisch' },
  { id: 'C-007', name: 'Cornelia Reinhardt', initials: 'CR', tier: 'vip', location: 'München', since: '2018', orders: 14, spent: '€78.200', lastContact: 'vor 1h', email: 'c.reinhardt@beispiel.de', preferredFabrics: ['Alcantara Leder'], style: 'Lederwaren-Spezialistin' },
  { id: 'C-008', name: 'Stefan Hofmann', initials: 'SH', tier: 'aktiv', location: 'Berlin', since: '2024', orders: 3, spent: '€12.800', lastContact: 'gestern', email: 's.hofmann@beispiel.de', preferredFabrics: ['VBC Super 130s'], style: 'Business klassisch' },
  { id: 'C-009', name: 'Dr. Wolfgang Krenz', initials: 'WK', tier: 'vip', location: 'München', since: '2015', orders: 23, spent: '€198.400', lastContact: 'vor 4h', email: 'w.krenz@beispiel.de', preferredFabrics: ['Drago', 'Loro Piana'], style: 'Konservativ premium' },
  { id: 'C-010', name: 'Birgit Stadler', initials: 'BS', tier: 'aktiv', location: 'München', since: '2023', orders: 2, spent: '€9.400', lastContact: 'gestern', email: 'b.stadler@beispiel.de', preferredFabrics: ['Loro Piana Tasmanian'], style: 'Kostüme & Hosenanzüge' },
  { id: 'C-011', name: 'Andreas Köhler', initials: 'AK', tier: 'vip', location: 'München', since: '2019', orders: 9, spent: '€67.300', lastContact: 'vor 30min', email: 'a.koehler@beispiel.de', preferredFabrics: ['Holland & Sherry Tweed'], style: 'British country' },
];

export type SartoriaCustomer = (typeof sartoriaCustomers)[number];
```

**Wichtig:** Die `customerId` in den `pipeline[].orders[]` muss zu diesen Kunden-IDs matchen (C-001 für Klaus Berger, C-002 für Sophie Wallenberg, usw. — gleiche Reihenfolge wie in den Customer-Daten).

Commit: `feat: mock-daten erweitern (auftragsdetails + kunden)`

---

### Phase 2 — State-Architektur + Client-Wrapper

#### 2.1 — Page wird Server-Shell

`src/app/showcase/sartoria-hub/page.tsx` komplett ersetzen:

```typescript
import type { Metadata } from 'next';
import { SartoriaHubApp } from '@/components/showcase/SartoriaHubApp';

export const metadata: Metadata = {
  title: 'Sartoria Hub · Demo — Pentrarri Showcase',
  description: 'Fiktives Order-Management-Tool für die Maßmanufaktur Falcone Sartoria. Begehbare Pentrarri-Demo mit interaktivem Side-Panel, View-Wechsel und Modal.',
};

export default function SartoriaHubPage() {
  return <SartoriaHubApp />;
}
```

#### 2.2 — Neuer Client-Wrapper `src/components/showcase/SartoriaHubApp.tsx`

```typescript
'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DemoBanner } from './DemoBanner';
import { SartoriaSidebar } from './SartoriaSidebar';
import { SartoriaTopBar } from './SartoriaTopBar';
import { SartoriaDashboard } from './SartoriaDashboard';
import { SartoriaOrders } from './SartoriaOrders';
import { SartoriaCustomers } from './SartoriaCustomers';
import { ComingSoonView } from './ComingSoonView';
import { OrderDetailPanel } from './OrderDetailPanel';
import { NewOrderModal } from './NewOrderModal';

export type ViewId = 'dashboard' | 'orders' | 'customers' | 'sartoria' | 'appointments' | 'analytics' | 'settings';

const viewLabels: Record<ViewId, string> = {
  dashboard: 'Dashboard',
  orders: 'Aufträge',
  customers: 'Kunden',
  sartoria: 'Sartoria',
  appointments: 'Termine',
  analytics: 'Analytics',
  settings: 'Einstellungen',
};

export function SartoriaHubApp() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <DemoBanner demoLabel="Sartoria Hub" brandName="Falcone Sartoria" />

      <div className="flex">
        <SartoriaSidebar
          activeView={activeView}
          onViewChange={setActiveView}
        />

        <main className="flex-1 min-w-0">
          <SartoriaTopBar
            title={viewLabels[activeView]}
            onNewOrder={() => setIsNewOrderOpen(true)}
          />

          <div className="space-y-12 p-6 pb-20 md:p-10">
            {activeView === 'dashboard' && (
              <SartoriaDashboard
                onOrderClick={setSelectedOrderId}
                onShowAllOrders={() => setActiveView('orders')}
              />
            )}
            {activeView === 'orders' && (
              <SartoriaOrders onOrderClick={setSelectedOrderId} />
            )}
            {activeView === 'customers' && <SartoriaCustomers />}
            {(activeView === 'sartoria' ||
              activeView === 'appointments' ||
              activeView === 'analytics' ||
              activeView === 'settings') && (
              <ComingSoonView title={viewLabels[activeView]} />
            )}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedOrderId && (
          <OrderDetailPanel
            orderId={selectedOrderId}
            onClose={() => setSelectedOrderId(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNewOrderOpen && (
          <NewOrderModal onClose={() => setIsNewOrderOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
```

#### 2.3 — Bestehende Sidebar zu controlled component umbauen

`src/components/showcase/SartoriaSidebar.tsx` komplett ersetzen:

```typescript
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
            Falcone Sartoria
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
                  <span className={`font-mono text-base ${
                    activeView === item.id ? 'text-gold' : 'text-ink-soft group-hover:text-ink-muted'
                  }`}>
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
            <div className="h-8 w-8 rounded-full bg-gold/20 ring-1 ring-gold/40 flex items-center justify-center font-mono text-xs text-gold">
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
```

#### 2.4 — TopBar erweitern

`src/components/showcase/SartoriaTopBar.tsx` komplett ersetzen:

```typescript
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
          <button className="hidden md:block rounded-md border border-ink-soft/40 bg-bg-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-mono-label text-ink-muted transition-colors hover:border-ink-muted hover:text-ink">
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
```

Commit: `feat: state-architektur + client-wrapper sartoria-hub-app, sidebar und topbar controlled`

---

### Phase 3 — Dashboard-View extrahieren + Pipeline klickbar

#### 3.1 — Neue Komponente `src/components/showcase/SartoriaDashboard.tsx`

```typescript
'use client';

import { SartoriaKpis } from './SartoriaKpis';
import { SartoriaPipeline } from './SartoriaPipeline';
import { SartoriaActivity } from './SartoriaActivity';

interface SartoriaDashboardProps {
  onOrderClick: (orderId: string) => void;
  onShowAllOrders: () => void;
}

export function SartoriaDashboard({ onOrderClick, onShowAllOrders }: SartoriaDashboardProps) {
  return (
    <>
      <SartoriaKpis />
      <SartoriaPipeline onOrderClick={onOrderClick} onShowAll={onShowAllOrders} />
      <SartoriaActivity onOrderClick={onOrderClick} />
    </>
  );
}
```

#### 3.2 — Pipeline klickbar machen

`src/components/showcase/SartoriaPipeline.tsx` — die existierende `<button>` für jede Auftragskarte bekommt einen `onClick` aus den Props. Die Komponente bekommt diese Signatur:

```typescript
interface SartoriaPipelineProps {
  onOrderClick: (orderId: string) => void;
  onShowAll: () => void;
}
```

Im JSX:
- Die "Alle ansehen →" `<button>` ruft `onShowAll` auf
- Die Auftragskarte `<button>` (innerhalb der `column.orders.map`) ruft `onOrderClick(order.id)` auf

Andere Inhalte unverändert.

#### 3.3 — Activity klickbar machen

`src/components/showcase/SartoriaActivity.tsx` — jedes Activity-Item bekommt einen Klick-Handler. Die Komponente bekommt:

```typescript
interface SartoriaActivityProps {
  onOrderClick: (orderId: string) => void;
}
```

Wickle das ganze Event-`<motion.div>` in ein `<button>` (oder mach das Div zum klickbaren Element mit `onClick`). Beim Klick: `onOrderClick(event.target)` (das `target`-Feld in den Activity-Daten ist die Auftrags-ID).

Visual-Tweak: beim Hover wird das ganze Item leicht heller, Cursor wird Pointer.

Commit: `feat: dashboard-view extrahiert, pipeline und activity klickbar`

---

### Phase 4 — OrderDetailPanel (Side-Panel von rechts)

Neue Datei `src/components/showcase/OrderDetailPanel.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { sartoriaData, sartoriaCustomers } from '@/data/sartoria-hub';

interface OrderDetailPanelProps {
  orderId: string;
  onClose: () => void;
}

export function OrderDetailPanel({ orderId, onClose }: OrderDetailPanelProps) {
  // Auftrag in der pipeline finden
  let foundOrder: any = null;
  let foundColumn: any = null;
  for (const column of sartoriaData.pipeline) {
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

  // Esc-Taste schließt
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
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-bg/70 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-ink-soft/30 bg-bg shadow-2xl md:max-w-lg"
      >
        {/* Header */}
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

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Übersicht */}
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
              {customer && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">Kunde seit</dt>
                  <dd className="text-right text-ink">{customer.since}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Timeline */}
          {foundOrder.timeline && (
            <section className="border-b border-ink-soft/30 p-6 md:p-8">
              <h3 className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
                Status-Verlauf
              </h3>
              <ol className="mt-4 space-y-3">
                {foundOrder.timeline.map((step: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                        step.current
                          ? 'bg-gold text-bg'
                          : step.completed
                          ? 'bg-gold/30 text-gold'
                          : 'bg-bg-elevated text-ink-soft border border-ink-soft/40'
                      }`}
                    >
                      {step.completed ? '✓' : ''}
                    </span>
                    <div className="flex-1 flex items-baseline justify-between gap-4">
                      <span className={`text-sm ${step.current ? 'text-ink font-medium' : step.completed ? 'text-ink' : 'text-ink-muted'}`}>
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

          {/* Nächster Termin */}
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

          {/* Notizen */}
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

        {/* Action Footer */}
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
```

Commit: `feat: order-detail-panel slide-in mit timeline, notizen, termin`

---

### Phase 5 — SartoriaOrders View (Vollansicht)

Neue Datei `src/components/showcase/SartoriaOrders.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { sartoriaData } from '@/data/sartoria-hub';

interface SartoriaOrdersProps {
  onOrderClick: (orderId: string) => void;
}

const statusFilters = ['Alle', 'Beratung', 'Erstmaß', 'In Produktion', 'Probe', 'Auslieferung'];

export function SartoriaOrders({ onOrderClick }: SartoriaOrdersProps) {
  const [activeFilter, setActiveFilter] = useState<string>('Alle');

  // Alle Aufträge aus allen Pipeline-Spalten flatten, mit Status aus der Spalte
  const allOrders = sartoriaData.pipeline.flatMap((column) =>
    column.orders.map((order: any) => ({ ...order, status: column.status }))
  );

  const filtered = activeFilter === 'Alle'
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

      {/* Filter Tabs */}
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

      {/* Tabellen-Header */}
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

      {/* Zeilen */}
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
              <span className="text-ink-soft transition-transform group-hover:translate-x-1">→</span>
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-dashed border-ink-soft/30 py-12 text-center text-ink-muted">
          <p className="text-sm">Keine Aufträge mit Status "{activeFilter}"</p>
        </div>
      )}
    </div>
  );
}
```

Commit: `feat: sartoria orders-view mit filter-tabs`

---

### Phase 6 — SartoriaCustomers View + ComingSoonView

#### 6.1 — `src/components/showcase/SartoriaCustomers.tsx`

```typescript
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

  const filtered = filter === 'all'
    ? sartoriaCustomers
    : sartoriaCustomers.filter((c) => c.tier === filter);

  return (
    <div>
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-mono-label text-gold">
          Kunden · {filtered.length}
        </p>
        <h2 className="mt-1 text-xl font-medium tracking-tight text-ink">
          Kundenstamm
        </h2>
      </div>

      {/* Tier-Filter */}
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

      {/* Customer Cards */}
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
              <span className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-mono-label ${tierStyles[customer.tier]}`}>
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
```

#### 6.2 — `src/components/showcase/ComingSoonView.tsx`

```typescript
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
          Diese Ansicht ist Teil der Demo-Roadmap und in Vorbereitung. In der Live-Version
          würde hier{' '}
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
```

Commit: `feat: customers-view mit tier-filter + coming-soon-placeholder`

---

### Phase 7 — NewOrderModal (3-Step Form)

Neue Datei `src/components/showcase/NewOrderModal.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sartoriaCustomers } from '@/data/sartoria-hub';

interface NewOrderModalProps {
  onClose: () => void;
}

const items = [
  '2-Reiher Anzug', '3-Teiler', 'Smoking', 'Sakko', 'Mantel',
  'Hosenanzug', 'Kostüm', 'Aktentasche', 'Schuhe (Maß)',
];

const fabrics = [
  'Loro Piana Wool 120s', 'Loro Piana Vicuña', 'Loro Piana Tasmanian',
  'Holland & Sherry Cashmere', 'Holland & Sherry Tweed',
  'Drago Sigaro', 'Reda Super 150s', 'VBC Super 130s',
  'Solbiati Linen', 'Ariston Wool', 'Alcantara Leder',
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

  const customer = customerId ? sartoriaCustomers.find((c) => c.id === customerId) : null;
  const canProceed =
    (step === 1 && customerId) ||
    (step === 2 && item && fabric) ||
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
            {/* Header */}
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

            {/* Step Indicator */}
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

            {/* Content */}
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

            {/* Footer */}
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
                    : 'bg-bg-soft text-ink-soft cursor-not-allowed'
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
```

Commit: `feat: new-order-modal mit 3-step-form und success-state`

---

### Phase 8 — Build, Test, PROGRESS.md, Push

```bash
npm run build
npm run pages:build
```

Beide müssen sauber durchlaufen. Falls TypeScript-Errors zu der `any`-Verwendung im OrderDetailPanel: lass es bei `any` für `foundOrder`, weil das Datenmodell der erweiterten Aufträge gemischt ist (manche haben `nextAppointment`, manche nicht). Strict-Type-Refactor kommt in eigener Etappe.

**Selbst-Test-Checkliste:**

| Check | Erwartet |
|---|---|
| Sidebar-Klick auf "Aufträge" → Inhalt wechselt zur Vollansicht | ✅ |
| Sidebar-Klick auf "Kunden" → Kunden-Cards mit Tier-Filter | ✅ |
| Sidebar-Klick auf "Sartoria" / "Termine" / "Analytics" / "Einstellungen" → Coming Soon | ✅ |
| TopBar zeigt richtigen Titel (Dashboard / Aufträge / Kunden / Sartoria …) | ✅ |
| Klick auf Pipeline-Karte (Dashboard) → Side-Panel slidet rechts rein | ✅ |
| Side-Panel zeigt: Status-Pill, Übersicht, Status-Verlauf (Timeline), Termin, Notizen | ✅ |
| Side-Panel: ESC oder Click-Backdrop schließt → slidet wieder raus | ✅ |
| Klick auf "+ Neuer Auftrag" → Modal öffnet zentriert mit Step 1/3 | ✅ |
| Step 1: Kunde wählen → Weiter-Button aktiviert sich | ✅ |
| Step 2: Item + Stoff wählen → Weiter aktiviert | ✅ |
| Step 3: Übersicht aller Auswahlen | ✅ |
| Submit → Success-Screen mit ✓ → Modal schließt automatisch nach 2s | ✅ |
| "← Zurück" im Modal: vorheriger Step | ✅ |
| "Abbrechen" im Modal (Step 1): schließt | ✅ |
| Klick auf Activity-Item → öffnet Side-Panel zum entsprechenden Auftrag | ✅ |
| Klick auf "Alle ansehen →" (Pipeline-Header) → wechselt zu Aufträge-View | ✅ |
| Auftrage-View: Filter-Tabs (Alle, Beratung, Erstmaß, …) funktionieren | ✅ |
| Klick auf Auftrag-Zeile in Aufträge-View → Side-Panel | ✅ |
| Body-Scroll-Lock wenn Modal/Panel offen | ✅ |
| Mobile (375px): Sidebar weg, alles stackt | ✅ |
| `npm run build` und `npm run pages:build` beide grün | ✅ |

**PROGRESS.md ergänzen:**

```markdown

## Etappe D — Sartoria Hub voll interaktiv
**Status:** ✅ Abgeschlossen am [DATUM]

- Mock-Daten erweitert: Auftragsdetails (Timeline, Notizen, Termin), 11 Kunden mit Profilen
- State-Architektur: Client-Wrapper SartoriaHubApp mit useState für View / Selected Order / Modal
- Sidebar controlled: 3 echte Views switching + 4 Coming-Soon-Placeholder
- Dashboard-View extrahiert, Pipeline und Activity klickbar
- OrderDetailPanel: Slide-in von rechts mit Timeline, Termin, Notizen, Status-Verlauf, ESC + Click-Outside
- Aufträge-View: Vollansicht mit 6 Status-Filter-Tabs
- Kunden-View: 11 Cards mit Tier-Filter (Alle/VIP/Aktiv/Neu)
- NewOrderModal: 3-Step-Form (Kunde → Item/Stoff → Bestätigen) mit Success-State
- "Alle ansehen →" Wire zur Aufträge-View
- Activity-Items wires Side-Panel

**Nächste Etappe (E):** Nach Michaels Feedback — vermutlich Hochzeit-Demo rüberziehen oder Kontaktformular
```

**Push:**

```bash
git add -A
git commit -m "docs: progress-tracker etappe d"
git push
```

---

## Schluss-Bericht (an Michael)

1. **Was gebaut wurde** — Phasen 1-8 kurz
2. **State-Architektur** — wie sauber ist der Client/Server-Split?
3. **Was klickbar wurde** — Sidebar, Pipeline-Karten, Activity, "+ Neuer Auftrag", "Alle ansehen"
4. **Commits** — Anzahl + Messages
5. **Build-Status** — `npm run build` und `npm run pages:build`
6. **Push-Status**
7. **Was schiefging** — auch Kleinkram
8. **Was Michael testen soll** — die obige Checkliste in Kurzform

---

## Was du NICHT in Etappe D tust

- ❌ Kein Customer-Detail-Side-Panel (Kunden-Cards sind statisch in Etappe D, nur als Anzeige — kommt in Etappe E falls gewünscht)
- ❌ Keine echte Modal-zu-Auftrag-Verknüpfung (Modal-Submit fügt KEINEN echten neuen Auftrag in die Mock-Daten — Success-Screen reicht)
- ❌ Keine ⌘K Suche, kein Notification-Dropdown — kommt in eigener Etappe
- ❌ Keine Hochzeit-Demos
- ❌ Kein Kontaktformular

---

## Verhaltensregeln

- Bei TypeScript-Errors: pragmatisch mit `any` arbeiten wo das Mock-Daten-Modell heterogen ist, statt strict zu refactoren
- Conventional Commits auf Deutsch
- Nicht pushen wenn Build fehlschlägt
- Server am Ende laufen lassen
- **WICHTIG:** Bevor du eine Komponente importierst, stelle sicher dass sie im selben oder vorherigen Commit angelegt wurde
- Bei `'use client'`-Komponente und Framer Motion: AnimatePresence sauber wrappen damit exit-Animations funktionieren

Los geht's. Das ist die größte bisher — gönn dir Zeit, mach es sauber.

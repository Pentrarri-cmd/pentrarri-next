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

export type ViewId =
  | 'dashboard'
  | 'orders'
  | 'customers'
  | 'sartoria'
  | 'appointments'
  | 'analytics'
  | 'settings';

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
        <SartoriaSidebar activeView={activeView} onViewChange={setActiveView} />

        <main className="min-w-0 flex-1">
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

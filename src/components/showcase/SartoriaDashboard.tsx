'use client';

import { SartoriaKpis } from './SartoriaKpis';
import { SartoriaPipeline } from './SartoriaPipeline';
import { SartoriaActivity } from './SartoriaActivity';

interface SartoriaDashboardProps {
  onOrderClick: (orderId: string) => void;
  onShowAllOrders: () => void;
}

export function SartoriaDashboard({
  onOrderClick,
  onShowAllOrders,
}: SartoriaDashboardProps) {
  return (
    <>
      <SartoriaKpis />
      <SartoriaPipeline onOrderClick={onOrderClick} onShowAll={onShowAllOrders} />
      <SartoriaActivity onOrderClick={onOrderClick} />
    </>
  );
}

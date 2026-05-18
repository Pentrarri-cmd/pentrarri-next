import type { Metadata } from 'next';
import { DemoBanner } from '@/components/showcase/DemoBanner';
import { SartoriaSidebar } from '@/components/showcase/SartoriaSidebar';
import { SartoriaTopBar } from '@/components/showcase/SartoriaTopBar';
import { SartoriaKpis } from '@/components/showcase/SartoriaKpis';
import { SartoriaPipeline } from '@/components/showcase/SartoriaPipeline';
import { SartoriaActivity } from '@/components/showcase/SartoriaActivity';

export const metadata: Metadata = {
  title: 'Sartoria Hub · Demo — Pentrarri Showcase',
  description:
    'Fiktives Order-Management-Tool für die Maßmanufaktur Falcone Sartoria. Begehbare Pentrarri-Demo.',
};

export default function SartoriaHubPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <DemoBanner demoLabel="Sartoria Hub" brandName="Falcone Sartoria" />

      <div className="flex">
        <SartoriaSidebar />

        <main className="min-w-0 flex-1">
          <SartoriaTopBar />

          <div className="space-y-12 p-6 pb-20 md:p-10">
            <SartoriaKpis />
            <SartoriaPipeline />
            <SartoriaActivity />
          </div>
        </main>
      </div>
    </div>
  );
}

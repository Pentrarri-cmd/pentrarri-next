import type { Metadata } from 'next';
import { SartoriaHubApp } from '@/components/showcase/SartoriaHubApp';

export const metadata: Metadata = {
  title: 'Sartoria Hub · Demo — Pentrarri Showcase',
  description:
    'Fiktives Order-Management-Tool für die Maßmanufaktur Falcone Sartoria. Begehbare Pentrarri-Demo mit interaktivem Side-Panel, View-Wechsel und Modal.',
};

export default function SartoriaHubPage() {
  return <SartoriaHubApp />;
}

import type { Metadata } from 'next';
import { inter, jetbrainsMono } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pentrarri — Digitale Produkte mit Anspruch',
  description:
    'Pentrarri baut Webseiten und SaaS für Unternehmen mit Premium-Anspruch. Aus Butzbach, für ganz Deutschland.',
  metadataBase: new URL('https://pentrarri-next.pages.dev'),
  openGraph: {
    title: 'Pentrarri — Digitale Produkte mit Anspruch',
    description: 'Webseiten und SaaS für Unternehmen mit Anspruch.',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

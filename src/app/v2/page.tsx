import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { HeroV2 } from '@/components/v2/HeroV2';
import { ServicesV2 } from '@/components/v2/ServicesV2';
import { WhyPentrarriV2 } from '@/components/v2/WhyPentrarriV2';
import { HowWeWorkV2 } from '@/components/v2/HowWeWorkV2';
import { ShowcaseV2 } from '@/components/v2/ShowcaseV2';
import { BehindPentrarriV2 } from '@/components/v2/BehindPentrarriV2';
import { ContactV2 } from '@/components/v2/ContactV2';

export const metadata: Metadata = {
  title: 'Pentrarri V2 · Cinematic Preview',
  description: 'Apple-Style Test-Version der Pentrarri Landingpage.',
};

export default function V2Page() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <HeroV2 />
        <ServicesV2 />
        <WhyPentrarriV2 />
        <HowWeWorkV2 />
        <ShowcaseV2 />
        <BehindPentrarriV2 />
        <ContactV2 />
      </main>
      <Footer />
    </>
  );
}

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { WhyPentrarri } from '@/components/WhyPentrarri';
import { HowWeWork } from '@/components/HowWeWork';
import { Showcase } from '@/components/Showcase';
import { BehindPentrarri } from '@/components/BehindPentrarri';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyPentrarri />
        <HowWeWork />
        <Showcase />
        <BehindPentrarri />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

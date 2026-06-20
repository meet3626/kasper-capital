import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Roadmap from '@/components/Roadmap';
import Insights from '@/components/Insights';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import CTA from '@/components/CTA';
import SectionAnimator from '@/components/SectionAnimator';
import SEOHead from '@/components/SEOHead';

const Home = () => {
  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white font-sans">
      <SEOHead 
        title="KAPSERFX | Turnkey Forex Broker Solutions"
        description="Launch your Forex brokerage in days. We offer MT5/cTrader platforms, CRM, liquidity integration, and digital marketing strategies."
      />

      <Hero />
      <SectionAnimator><Services /></SectionAnimator>
      <SectionAnimator><Features /></SectionAnimator>
      <Roadmap />
      <SectionAnimator><Insights /></SectionAnimator>
      <SectionAnimator><FAQ /></SectionAnimator>
      <SectionAnimator><Testimonials /></SectionAnimator>
      <SectionAnimator><Partners /></SectionAnimator>
      <SectionAnimator><CTA /></SectionAnimator>
    </div>
  );
};

export default Home;
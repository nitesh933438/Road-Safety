/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { LiveStatistics } from '../components/landing/LiveStatistics';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { GoodSamaritanCard } from '../components/landing/GoodSamaritanCard';
import { WhyChooseUs } from '../components/landing/WhyChooseUs';
import { Testimonials } from '../components/landing/Testimonials';
import { FaqAccordion } from '../components/landing/FaqAccordion';
import { CtaSection } from '../components/landing/CtaSection';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Statistics */}
      <LiveStatistics />

      {/* 3. Features Section */}
      <FeaturesSection />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Good Samaritan Law Card */}
      <GoodSamaritanCard />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. FAQ Accordion */}
      <FaqAccordion />

      {/* 9. Call To Action */}
      <CtaSection />
    </div>
  );
};

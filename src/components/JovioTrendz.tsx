import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { LimitedEditionShowcase } from './sections/LimitedEditionShowcase';
import { TrustStrip } from './sections/TrustStrip';
import { EliteClubFooter } from './sections/EliteClubFooter';

export function JovioTrendz() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Custom Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <HeroSection />
      <LimitedEditionShowcase />
      <TrustStrip />
      <EliteClubFooter />
    </div>
  );
}

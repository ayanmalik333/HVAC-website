import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureCards } from './components/FeatureCards';
import { CommercialAndQuoteSection } from './components/CommercialAndQuoteSection';
import { BottomHighlightsSection } from './components/BottomHighlightsSection';
import { EnergyCalculatorModal } from './components/EnergyCalculatorModal';
import { DiagnosticToolModal } from './components/DiagnosticToolModal';
import { BookingModal } from './components/BookingModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';
import { FrameScrollCanvas } from './components/FrameScrollCanvas';
import { PhoneCall, Calculator, Wrench } from 'lucide-react';

export default function App() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('hero');

  // Support /admin route or #admin hash
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
  }, []);

  const scrollToQuote = () => {
    const el = document.getElementById('quote');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent font-sans text-slate-100 selection:bg-orange-500 selection:text-white flex flex-col">
      {/* 120-Frame Scroll-Based Canvas Animation */}
      <FrameScrollCanvas />

      {/* Top Header Navigation */}
      <Header
        onOpenQuote={scrollToQuote}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        <HeroSection
          onOpenQuote={scrollToQuote}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <FeatureCards
          onOpenQuote={scrollToQuote}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <CommercialAndQuoteSection
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <BottomHighlightsSection
          onOpenQuote={scrollToQuote}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuote={scrollToQuote}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onSelectSection={(sec) => {
          setSelectedSection(sec);
          const el = document.getElementById(sec);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Modals */}
      <EnergyCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onOpenQuote={scrollToQuote}
      />

      <DiagnosticToolModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onOpenQuote={scrollToQuote}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Floating Quick Action Buttons */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsDiagnosticOpen(true)}
          className="bg-slate-900/70 backdrop-blur-xl hover:bg-slate-800 text-sky-400 p-3 rounded-full shadow-xl border border-slate-700/60 transition-all hover:scale-105 flex items-center justify-center cursor-pointer group"
          title="Troubleshooting Guide"
        >
          <Wrench className="w-5 h-5 group-hover:rotate-45 transition-transform" />
        </button>

        <button
          onClick={() => setIsCalculatorOpen(true)}
          className="bg-slate-900/70 backdrop-blur-xl hover:bg-slate-800 text-amber-400 p-3 rounded-full shadow-xl border border-slate-700/60 transition-all hover:scale-105 flex items-center justify-center cursor-pointer group"
          title="Energy Calculator"
        >
          <Calculator className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <a
          href="tel:18005554822"
          className="bg-[#FF6B00]/70 backdrop-blur-xl hover:bg-[#E05200]/80 text-white font-bold text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all cursor-pointer border border-orange-400/50"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline">24/7 Hotline: XXX-XXX-XXX</span>
          <span className="sm:hidden">24/7 Hotline</span>
        </a>
      </div>
    </div>
  );
}

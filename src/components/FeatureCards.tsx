import React, { useState } from 'react';
import { HERO_FEATURE_CARDS } from '../data/hvacData';
import {
  Building2,
  Award,
  Headphones,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock
} from 'lucide-react';

interface FeatureCardsProps {
  onOpenQuote: () => void;
  onOpenBooking: () => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  onOpenQuote,
  onOpenBooking
}) => {
  const [activeCardModal, setActiveCardModal] = useState<string | null>(null);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#FF6B00]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#FF6B00]" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-[#FF6B00]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#FF6B00]" />;
    }
  };

  const selectedModalData = HERO_FEATURE_CARDS.find(c => c.id === activeCardModal);

  return (
    <section id="features" className="py-16 sm:py-20 bg-[#0B1B2D]/10 text-slate-100 relative border-b border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Floating Orange Navigation Arrow */}
        <div className="hidden lg:block absolute left-[-20px] top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => {
              const el = document.getElementById('features');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-10 h-12 bg-[#FF6B00] hover:bg-[#E05200] text-white rounded-r-lg flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
            title="Scroll section"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed to Keep You Comfortable
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            From emergency repairs to engineered commercial installations, we provide
            climate management solutions optimized for longevity and energy cost savings.
          </p>
        </div>

        {/* 3-Column Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HERO_FEATURE_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-[#0B1B2D]/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-slate-700/50 hover:shadow-2xl hover:border-orange-500/50 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
            >
              {/* Top Subtle Hover Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Dark Navy Circular Icon Container */}
              <div className="w-16 h-16 rounded-full bg-[#0B1B2D]/60 border border-slate-600 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                {renderIcon(card.iconName)}
              </div>

              {/* Card Title */}
              <h3 className="text-xl font-extrabold text-white mb-1">
                {card.title}
              </h3>

              <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00] mb-3">
                {card.subhead}
              </div>

              {/* Card Body Text */}
              <p className="text-slate-200 text-sm leading-relaxed mb-6 flex-1">
                {card.description}
              </p>

              {/* Read More Link */}
              <button
                onClick={() => setActiveCardModal(card.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6B00] hover:text-[#E05200] group-hover:translate-x-1 transition-all cursor-pointer"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators under cards */}
        <div className="mt-12 bg-[#0B1B2D]/10 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-lg flex flex-wrap items-center justify-around gap-6 text-center text-xs text-slate-200 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Licensed, Bonded & Fully Insured ($5M Liability)</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span>Guaranteed 60-Minute Emergency Response</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <span>Upfront Flat-Rate Pricing — No Hidden Fees</span>
          </div>
        </div>

      </div>

      {/* Feature Details Modal */}
      {activeCardModal && selectedModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setActiveCardModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#0B1B2D] flex items-center justify-center">
                {renderIcon(selectedModalData.iconName)}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0B1B2D]">
                  {selectedModalData.title}
                </h3>
                <span className="text-xs text-[#FF6B00] font-semibold uppercase">
                  {selectedModalData.subhead}
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedModalData.description}
            </p>

            {/* Detailed Feature Checklist inside Modal */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 mb-6 text-xs text-slate-700">
              <div className="font-bold text-[#0B1B2D] mb-1">Key Guarantees & Standard Specifications:</div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>NATE-Certified Master Technicians on every assignment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Original OEM replacement components with 10-year warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Detailed digital inspection report provided post-service</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveCardModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveCardModal(null);
                  onOpenQuote();
                }}
                className="bg-[#FF6B00] hover:bg-[#E05200] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow"
              >
                Request Quote For This
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

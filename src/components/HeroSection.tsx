import React from 'react';
import {
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onOpenQuote: () => void;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuote,
  onOpenCalculator,
  onOpenBooking
}) => {
  return (
    <section id="hero" className="relative bg-[#0B1B2D]/10 text-white overflow-hidden pt-10 pb-16 lg:py-24 border-b border-slate-800/30">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6 text-center flex flex-col items-center">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-orange-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Commercial & Residential Climate Engineering</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">NATE Certified</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white font-sans">
            Powerful Climate <br className="hidden sm:inline" />
            Control for <span className="text-[#FF6B00]">Business</span>
          </h1>

          {/* Sub-paragraph */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Innovative energy efficient heating, ventilation, and air conditioning solutions
            tailored to lower utility costs, protect indoor air quality, and keep your
            commercial facilities running at peak performance.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-sm tracking-wide px-8 py-4 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>Get an Estimate</span>
              <span className="text-xs bg-orange-700/70 px-2 py-0.5 rounded text-orange-100">Free</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="bg-slate-800/70 backdrop-blur-xl hover:bg-slate-800/90 text-slate-100 font-semibold text-sm px-7 py-4 rounded-xl border border-slate-600/60 transition-all cursor-pointer"
            >
              Schedule Service
            </button>
          </div>

          {/* Feature Checkmarks Row */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 max-w-xl mx-auto justify-items-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>24/7 Rapid Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Up to 24.5 SEER2 Systems</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Zero Hidden Fees</span>
            </div>
          </div>

          {/* Quick Savings Callout pill */}
          <div className="pt-2 w-full max-w-lg">
            <button
              onClick={onOpenCalculator}
              className="w-full text-left px-4 py-3 bg-[#0B1B2D]/20 backdrop-blur-md border border-slate-700/50 rounded-xl hover:border-orange-500/50 transition-all flex items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-[#FF6B00] flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">How much could your building save?</div>
                  <div className="text-[11px] text-slate-400">Calculate annual SEER2 energy cost reductions instantly</div>
                </div>
              </div>
              <span className="text-xs text-[#FF6B00] font-bold group-hover:translate-x-1 transition-transform">
                Calculate →
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

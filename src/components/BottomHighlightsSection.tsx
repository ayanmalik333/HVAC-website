import React, { useState } from 'react';
import { HVAC_SERVICES, PROJECT_SPECS } from '../data/hvacData';
import {
  Wrench,
  Layers,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

interface BottomHighlightsProps {
  onOpenQuote: () => void;
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export const BottomHighlightsSection: React.FC<BottomHighlightsProps> = ({
  onOpenQuote,
  onOpenBooking,
  onOpenCalculator
}) => {
  const [activeSpecModal, setActiveSpecModal] = useState<string | null>(null);

  const selectedSpec = PROJECT_SPECS.find(s => s.id === activeSpecModal);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#0B1B2D]/10 text-slate-100 border-t border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 3 Column Bottom Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* HIGHLIGHT 1: TOP SERVICES */}
          <div className="bg-[#0B1B2D]/10 backdrop-blur-md rounded-2xl p-7 border border-slate-700/50 hover:border-orange-500/50 transition-all shadow-xl flex flex-col justify-between reveal-init reveal-stagger-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-950/80 text-[#FF6B00] border border-orange-500/30 flex items-center justify-center font-bold">
                <Wrench className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-extrabold text-white">
                Top HVAC Services
              </h3>

              <p className="text-slate-200 text-sm leading-relaxed">
                From precision preventative tune-ups to full commercial rooftop unit replacements, our master HVAC technicians deliver long-lasting comfort.
              </p>

              <div className="space-y-2 pt-1 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>24/7 Emergency Compressor Diagnostics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>VRF & Multi-Zone Temperature Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>HEPA & UV-C Air Purification Loops</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenQuote}
                className="w-full bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>View Service Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* HIGHLIGHT 2: PROJECT GALLERY & SPEC SHEETS */}
          <div className="bg-[#0B1B2D]/10 backdrop-blur-md rounded-2xl p-7 border border-slate-700/50 hover:border-orange-500/50 transition-all shadow-xl flex flex-col justify-between reveal-init reveal-stagger-2">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-950/80 text-[#FF6B00] border border-orange-500/30 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-extrabold text-white">
                Project Gallery & Specs
              </h3>

              <p className="text-slate-200 text-sm leading-relaxed">
                Explore engineering blueprints, energy audits, and high-SEER2 system retrofits across enterprise headquarters and medical complexes.
              </p>

              {/* Vector Spec List */}
              <div className="space-y-2 pt-1">
                {PROJECT_SPECS.map(spec => (
                  <button
                    key={spec.id}
                    onClick={() => setActiveSpecModal(spec.id)}
                    className="w-full text-left bg-[#0B1B2D]/20 backdrop-blur-sm p-2.5 rounded-lg border border-slate-700/50 hover:border-orange-400 text-xs transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-100">{spec.title}</div>
                      <div className="text-[10px] text-orange-400 font-semibold">{spec.seerRating} • {spec.energySavings}</div>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono">
                      SPECS →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenCalculator}
                className="w-full bg-slate-800/70 backdrop-blur-xl border border-slate-600/60 hover:bg-slate-800/90 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Calculate SEER Savings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* HIGHLIGHT 3: CONTACT & DIRECT DISPATCH */}
          <div className="bg-[#0B1B2D]/10 backdrop-blur-md rounded-2xl p-7 border border-slate-700/50 hover:border-orange-500/50 transition-all shadow-xl flex flex-col justify-between reveal-init reveal-stagger-3">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-950/80 text-[#FF6B00] border border-orange-500/30 flex items-center justify-center font-bold">
                <PhoneCall className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-extrabold text-white">
                Direct Contact & Dispatch
              </h3>

              <p className="text-slate-200 text-sm leading-relaxed">
                Need immediate emergency service? Talk directly with our central dispatch hotline for instant technician routing to your zip code.
              </p>

              <div className="bg-[#0B1B2D]/20 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/50 space-y-1 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  24/7 Priority Hotline
                </div>
                <a
                  href="tel:18005554822"
                  className="text-xl font-black text-[#FF6B00] font-mono hover:underline block"
                >
                  XXX-XXX-XXX
                </a>
                <div className="text-[11px] text-emerald-400 font-medium">
                  ● Average Dispatch Arrival: 42 Mins
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenBooking}
                className="w-full bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Project Spec Detail Modal */}
      {activeSpecModal && selectedSpec && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setActiveSpecModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B00] uppercase mb-1">
              <span>{selectedSpec.type}</span>
              <span>•</span>
              <span>{selectedSpec.location}</span>
            </div>

            <h3 className="text-2xl font-black text-[#0B1B2D] mb-3">
              {selectedSpec.title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedSpec.summary}
            </p>

            {/* Spec Metrics Box */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center mb-6">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">SEER2 Efficiency</div>
                <div className="text-lg font-black text-[#0B1B2D]">{selectedSpec.seerRating}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Coverage Area</div>
                <div className="text-lg font-black text-[#0B1B2D]">{selectedSpec.sqft}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Energy Savings</div>
                <div className="text-lg font-black text-emerald-600">{selectedSpec.energySavings}</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedSpec.tags.map(tag => (
                <span key={tag} className="bg-orange-50 text-[#FF6B00] border border-orange-200 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveSpecModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveSpecModal(null);
                  onOpenQuote();
                }}
                className="bg-[#FF6B00] hover:bg-[#E05200] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg"
              >
                Request Similar Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

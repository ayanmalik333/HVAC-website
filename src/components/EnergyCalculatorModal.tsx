import React, { useState } from 'react';
import { X, Calculator, Zap, DollarSign, Leaf, Clock, CheckCircle2 } from 'lucide-react';

interface EnergyCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const EnergyCalculatorModal: React.FC<EnergyCalculatorModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote
}) => {
  const [sqft, setSqft] = useState(3500);
  const [currentSeer, setCurrentSeer] = useState(10);
  const [targetSeer, setTargetSeer] = useState(20);
  const [kwhRate, setKwhRate] = useState(0.18); // $0.18 per kWh average

  if (!isOpen) return null;

  // Calculation Logic
  // Tonnage estimate: 1 ton per 500 sq ft
  const estimatedTons = Math.ceil(sqft / 500);
  
  // Approximate annual operating hours: 1,800 hrs
  const annualHours = 1800;

  // kWh = (BTU/hr * Hours) / (SEER * 1000)
  // BTU = Tons * 12,000
  const totalBtu = estimatedTons * 12000;
  
  const currentAnnualKwh = (totalBtu * annualHours) / (currentSeer * 1000);
  const targetAnnualKwh = (totalBtu * annualHours) / (targetSeer * 1000);

  const kwhSaved = Math.max(0, currentAnnualKwh - targetAnnualKwh);
  const annualDollarSavings = Math.round(kwhSaved * kwhRate);
  const tenYearSavings = annualDollarSavings * 10;
  const co2ReductionTons = (kwhSaved * 0.85) / 2000; // ~0.85 lbs CO2 per kWh

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900/85 backdrop-blur-xl rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_25px_rgba(56,189,248,0.25)] border border-sky-400/40 relative my-8 animate-in fade-in zoom-in duration-200 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-orange-950/80 border border-orange-500/30 text-[#FF6B00] flex items-center justify-center font-bold">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">
              SEER2 Energy Savings Calculator
            </h3>
            <p className="text-slate-300 text-xs">
              Estimate annual electric bill reductions by upgrading to modern inverter HVAC equipment.
            </p>
          </div>
        </div>

        {/* Sliders Input Form */}
        <div className="space-y-5">
          {/* Square Footage Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-200 mb-1">
              <span>Property Size (Sq Ft):</span>
              <span className="text-[#FF6B00] font-mono text-sm">{sqft.toLocaleString()} sq ft ({estimatedTons} Tons)</span>
            </div>
            <input
              type="range"
              min="800"
              max="25000"
              step="100"
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="w-full accent-[#FF6B00] cursor-pointer"
            />
          </div>

          {/* Current System SEER Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-200 mb-1">
              <span>Current System SEER Rating (Older unit):</span>
              <span className="text-white font-mono text-sm">{currentSeer} SEER</span>
            </div>
            <input
              type="range"
              min="8"
              max="14"
              step="1"
              value={currentSeer}
              onChange={(e) => setCurrentSeer(Number(e.target.value))}
              className="w-full accent-slate-400 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 mt-1">
              *Systems installed before 2015 typically operate between 8 SEER and 12 SEER.
            </div>
          </div>

          {/* Target Upgrade SEER2 */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-200 mb-1">
              <span>Proposed New Unit SEER2 Rating:</span>
              <span className="text-emerald-400 font-mono text-sm">{targetSeer} SEER2</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTargetSeer(16)}
                className={`py-2 rounded-lg border font-semibold transition-all cursor-pointer ${
                  targetSeer === 16 ? 'bg-orange-500 text-white border-orange-400' : 'bg-slate-800/80 border-slate-700 text-slate-200'
                }`}
              >
                16 SEER2 (Standard)
              </button>
              <button
                type="button"
                onClick={() => setTargetSeer(20)}
                className={`py-2 rounded-lg border font-semibold transition-all cursor-pointer ${
                  targetSeer === 20 ? 'bg-orange-500 text-white border-orange-400' : 'bg-slate-800/80 border-slate-700 text-slate-200'
                }`}
              >
                20 SEER2 (Inverter)
              </button>
              <button
                type="button"
                onClick={() => setTargetSeer(24)}
                className={`py-2 rounded-lg border font-semibold transition-all cursor-pointer ${
                  targetSeer === 24 ? 'bg-orange-500 text-white border-orange-400' : 'bg-slate-800/80 border-slate-700 text-slate-200'
                }`}
              >
                24 SEER2 (Ultra)
              </button>
            </div>
          </div>

          {/* kWh Utility Rate */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-200 mb-1">
              <span>Electric Utility Rate ($ / kWh):</span>
              <span className="text-white font-mono text-sm">${kwhRate.toFixed(2)} / kWh</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.40"
              step="0.01"
              value={kwhRate}
              onChange={(e) => setKwhRate(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculation Results Card */}
        <div className="mt-8 bg-slate-950/80 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
              Estimated Annual Savings
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#FF6B00] font-mono my-1">
              ${annualDollarSavings.toLocaleString()} <span className="text-sm font-sans text-slate-300">/ year</span>
            </div>
            <div className="text-xs text-emerald-400 font-semibold">
              10-Year Cumulative Savings: ${tenYearSavings.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Reduced Energy: <strong>{Math.round(kwhSaved).toLocaleString()} kWh/yr</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>CO2 Offset: <strong>{co2ReductionTons.toFixed(1)} Tons/yr</strong></span>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400">
            *Eligible for up to $2,000 Federal IRA Clean Energy Tax Credits.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow cursor-pointer"
            >
              Get Rebate Estimate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

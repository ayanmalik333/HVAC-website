import React, { useState } from 'react';
import { DIAGNOSTIC_TREE } from '../data/hvacData';
import { X, Wrench, AlertTriangle, CheckCircle2, PhoneCall, RefreshCw } from 'lucide-react';

interface DiagnosticToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
  onOpenBooking: () => void;
}

export const DiagnosticToolModal: React.FC<DiagnosticToolModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
  onOpenBooking
}) => {
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [recommendation, setRecommendation] = useState<any | null>(null);

  if (!isOpen) return null;

  const currentStep = DIAGNOSTIC_TREE[currentStepId];

  const handleOptionClick = (opt: any) => {
    if (opt.recommendation) {
      setRecommendation(opt.recommendation);
    } else if (opt.nextStepId && DIAGNOSTIC_TREE[opt.nextStepId]) {
      setCurrentStepId(opt.nextStepId);
    }
  };

  const handleReset = () => {
    setCurrentStepId('start');
    setRecommendation(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900/85 backdrop-blur-xl rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-[0_0_25px_rgba(56,189,248,0.25)] border border-sky-400/40 relative animate-in fade-in zoom-in duration-200 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">
              HVAC Troubleshooting Guide
            </h3>
            <p className="text-slate-300 text-xs">
              Instant diagnosis tool for homeowners & facility managers.
            </p>
          </div>
        </div>

        {/* Diagnostic Question or Final Recommendation */}
        {recommendation ? (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className={`p-4 rounded-xl border ${recommendation.isEmergency ? 'bg-rose-950/80 border-rose-500/40' : 'bg-amber-950/80 border-amber-500/40'}`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`w-5 h-5 ${recommendation.isEmergency ? 'text-rose-400' : 'text-amber-400'}`} />
                <h4 className={`font-black text-lg ${recommendation.isEmergency ? 'text-rose-200' : 'text-amber-200'}`}>
                  {recommendation.title}
                </h4>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {recommendation.description}
              </p>
            </div>

            {recommendation.diyTip && (
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-200">
                <strong className="text-white block mb-1">🛠️ Safe DIY Quick Check:</strong>
                {recommendation.diyTip}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {recommendation.isEmergency ? (
                <a
                  href="tel:18005554822"
                  className="flex-1 bg-rose-600/70 backdrop-blur-xl border border-rose-400/40 hover:bg-rose-700/80 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Emergency Tech XXX-XXX-XXX</span>
                </a>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="flex-1 bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{recommendation.actionText}</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="px-4 py-3 bg-slate-800/70 backdrop-blur-xl border border-slate-700 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Start Over
              </button>
            </div>
          </div>
        ) : currentStep ? (
          <div className="space-y-4">
            <h4 className="text-lg font-extrabold text-white">
              {currentStep.question}
            </h4>

            <div className="space-y-2.5">
              {currentStep.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-700/80 bg-slate-800/60 backdrop-blur-sm hover:border-orange-400 hover:bg-slate-800/90 text-slate-100 text-xs font-semibold transition-all flex items-center justify-between cursor-pointer group"
                >
                  <span>{opt.label}</span>
                  <span className="text-[#FF6B00] group-hover:translate-x-1 transition-transform">→</span>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center text-xs text-slate-400">
              <span>Step 1 of 2</span>
              {currentStepId !== 'start' && (
                <button
                  onClick={handleReset}
                  className="text-slate-300 hover:text-white font-semibold cursor-pointer"
                >
                  Reset Questions
                </button>
              )}
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};

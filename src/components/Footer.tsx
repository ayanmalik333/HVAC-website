import React from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Zap,
  Building2,
  ChevronRight
} from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
  onSelectSection: (section: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuote,
  onOpenCalculator,
  onOpenBooking,
  onSelectSection,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-[#081320]/20 backdrop-blur-sm text-slate-100 text-xs border-t-2 border-[#FF6B00]/50 relative z-20 shadow-2xl">
      {/* Upper Footer CTA Strip */}
      <div className="bg-[#0F2137]/20 backdrop-blur-sm border-b border-slate-800/40 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">
              Ready to Optimize Your Building’s Climate System?
            </h3>
            <p className="text-slate-100 text-xs mt-1 font-medium">
              Talk directly with a senior HVAC engineer or get a free custom quote in under 15 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:18005554822"
              className="bg-slate-800/70 backdrop-blur-xl border border-slate-600/60 hover:bg-slate-800/90 text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-orange-400" />
              <span>XXX-XXX-XXX</span>
            </a>

            <button
              onClick={onOpenQuote}
              className="bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg cursor-pointer"
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-bold">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 19h20L12 2z" strokeLinejoin="round" />
                <path d="M12 8v6" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              EX <span className="text-[#FF6B00]">HVAC</span>
            </span>
          </div>

          <p className="leading-relaxed text-slate-300">
            Enterprise heating, ventilation, air conditioning, and indoor microclimate engineering. Certified for commercial rooftop units, chillers, and residential inverter heat pumps.
          </p>

          {/* Compliance Vector Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-slate-900 border border-slate-700 text-slate-200 text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> NATE Master
            </span>
            <span className="bg-slate-900 border border-slate-700 text-slate-200 text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400" /> EPA Universal
            </span>
            <span className="bg-slate-900 border border-slate-700 text-slate-200 text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1">
              <Zap className="w-3 h-3 text-sky-400" /> EnergyStar
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">
            Quick Navigation
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectSection('hero')}
                className="text-slate-300 hover:text-orange-400 flex items-center gap-1 cursor-pointer"
              >
                <ChevronRight className="w-3 h-3 text-orange-500" /> Home & Thermostat Console
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectSection('commercial')}
                className="text-slate-300 hover:text-orange-400 flex items-center gap-1 cursor-pointer"
              >
                <ChevronRight className="w-3 h-3 text-orange-500" /> Commercial Services & RTUs
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectSection('features')}
                className="text-slate-300 hover:text-orange-400 flex items-center gap-1 cursor-pointer"
              >
                <ChevronRight className="w-3 h-3 text-orange-500" /> Engineered Features
              </button>
            </li>
            <li>
              <button
                onClick={onOpenCalculator}
                className="text-slate-300 hover:text-orange-400 flex items-center gap-1 cursor-pointer"
              >
                <ChevronRight className="w-3 h-3 text-orange-500" /> Energy Savings Calculator
              </button>
            </li>
            <li>
              <button
                onClick={onOpenBooking}
                className="text-slate-300 hover:text-orange-400 flex items-center gap-1 cursor-pointer"
              >
                <ChevronRight className="w-3 h-3 text-orange-500" /> Schedule Online Appointment
              </button>
            </li>
          </ul>
        </div>

        {/* Commercial Services Column */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">
            Core Specialties
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-1 text-slate-200">
              <Building2 className="w-3.5 h-3.5 text-blue-400" /> Commercial Packaged RTU
            </li>
            <li className="flex items-center gap-1 text-slate-200">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Variable Refrigerant Flow (VRF)
            </li>
            <li className="flex items-center gap-1 text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 24/7 Preventative Service
            </li>
            <li className="flex items-center gap-1 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-rose-400" /> Emergency Compressor Repair
            </li>
            <li className="flex items-center gap-1 text-slate-200">
              <Award className="w-3.5 h-3.5 text-purple-400" /> Indoor Air Quality & HEPA
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">
            Emergency Dispatch Hub
          </h4>

          <div className="space-y-2 text-slate-200">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <span>example location</span>
            </div>

            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span className="font-bold text-white">XXX-XXX-XXX</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>dispatch@exhvac-solutions.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Operating 24 Hours / 365 Days</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="bg-[#040A10]/20 backdrop-blur-sm py-5 px-4 text-center border-t border-slate-800/40 text-[11px] text-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Ex HVAC Solutions Inc. All rights reserved.
          </div>
          <div className="flex gap-4 text-slate-200">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: All customer information is kept strictly confidential and compliant with data protection laws.'); }} className="hover:underline hover:text-white">Privacy Policy</a>
            <a href="#admin" onClick={(e) => { e.preventDefault(); onOpenAdmin(); }} className="hover:underline text-orange-400 font-semibold hover:text-orange-300">Admin</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Standard 10-year parts & labor warranty applies to all registered installations.'); }} className="hover:underline hover:text-white">Terms of Service</a>
            <a href="#licensing" onClick={(e) => { e.preventDefault(); alert('Licensing: State HVAC Contractor License #HVAC-994182-A (Master Class).'); }} className="hover:underline hover:text-white">Licensing Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

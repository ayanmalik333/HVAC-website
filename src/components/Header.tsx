import React, { useState } from 'react';
import {
  PhoneCall,
  Clock,
  ShieldCheck,
  Search,
  Menu,
  X,
  ChevronDown,
  Wrench,
  Calculator,
  Flame,
  Wind,
  Zap,
  Building2,
  Calendar
} from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenCalculator: () => void;
  onOpenDiagnostic: () => void;
  onOpenBooking: () => void;
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuote,
  onOpenCalculator,
  onOpenDiagnostic,
  onOpenBooking,
  onSelectSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (sectionId: string) => {
    onSelectSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-[#081320]/20 backdrop-blur-sm text-slate-100 text-xs py-2 px-4 border-b border-slate-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a
              href="tel:18005554822"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="font-semibold text-white">Emergency 24/7 Hotline:</span> XXX-XXX-XXX
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> Mon - Sun: 24/7 Dispatch Operating
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden lg:flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> NATE Certified & EPA Licensed
            </span>

            <button
              onClick={onOpenCalculator}
              className="hidden sm:flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" /> Energy Calculator
            </button>

            <button
              onClick={onOpenDiagnostic}
              className="hidden sm:flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" /> Troubleshooting Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#0B1B2D]/20 backdrop-blur-sm text-white px-4 py-3.5 border-b border-slate-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo (Vector SVG Logo, No Bitmap Image) */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#E05200] p-0.5 shadow-lg shadow-orange-950/40 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B1B2D] rounded-[7px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-blue-500/20" />
                <div className="flex items-center justify-center text-[#FF6B00]">
                  {/* Custom Triangle Chevron HVAC logo mark */}
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 19h20L12 2z" strokeLinejoin="round" />
                    <path d="M12 8v6" strokeLinecap="round" />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  EX <span className="text-[#FF6B00]">HVAC</span>
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold">
                Climate Engineering & Solutions
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-slate-200 hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                className="flex items-center gap-1 text-slate-200 hover:text-[#FF6B00] transition-colors py-2 cursor-pointer"
              >
                Services <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#0F2338] border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <button
                    onClick={() => handleNavClick('commercial')}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200 hover:text-orange-400"
                  >
                    <Building2 className="w-4 h-4 text-[#FF6B00]" /> Commercial Rooftop Systems
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200 hover:text-orange-400"
                  >
                    <Flame className="w-4 h-4 text-amber-500" /> Heating & Heat Pumps
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200 hover:text-orange-400"
                  >
                    <Zap className="w-4 h-4 text-blue-400" /> Precision AC & Cooling
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200 hover:text-orange-400"
                  >
                    <Wind className="w-4 h-4 text-emerald-400" /> Indoor Air Quality & HEPA
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('commercial')}
              className="text-slate-200 hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              Commercial
            </button>

            <button
              onClick={() => handleNavClick('gallery')}
              className="text-slate-200 hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              Projects & Specs
            </button>

            <button
              onClick={onOpenCalculator}
              className="text-slate-200 hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              Savings Calc
            </button>

            <button
              onClick={() => handleNavClick('quote')}
              className="text-slate-200 hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Right Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Search site"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBooking}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-600/60 bg-slate-800/70 backdrop-blur-xl hover:bg-slate-800/90 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" /> Schedule Service
            </button>

            <button
              onClick={onOpenQuote}
              className="bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 text-white font-semibold text-xs px-3 py-1.5 rounded-md"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar Popup */}
        {searchOpen && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search services, RTU specs, emergency repairs, financing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={() => {
                alert(`Searching for: "${searchQuery}"`);
                setSearchOpen(false);
              }}
              className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg text-xs font-semibold"
            >
              Search
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F2338] border-b border-slate-800 px-6 py-5 text-slate-200 space-y-4">
          <div className="flex flex-col gap-3 font-medium text-sm">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 hover:text-orange-400 border-b border-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left py-2 hover:text-orange-400 border-b border-slate-800"
            >
              Services & Products
            </button>
            <button
              onClick={() => handleNavClick('commercial')}
              className="text-left py-2 hover:text-orange-400 border-b border-slate-800"
            >
              Commercial HVAC
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="text-left py-2 hover:text-orange-400 border-b border-slate-800"
            >
              Project Gallery & Specs
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="text-left py-2 text-amber-400 font-semibold border-b border-slate-800 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" /> Energy Savings Calculator
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnostic();
              }}
              className="text-left py-2 text-sky-400 font-semibold border-b border-slate-800 flex items-center gap-2"
            >
              <Wrench className="w-4 h-4" /> HVAC Troubleshooting Tool
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-slate-800 text-slate-200 font-semibold py-2.5 rounded-lg text-xs"
            >
              📅 Schedule Appointment
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full bg-[#FF6B00] text-white font-bold py-2.5 rounded-lg text-xs uppercase"
            >
              Get Instant Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

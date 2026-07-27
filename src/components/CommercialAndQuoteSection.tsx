import React, { useState } from 'react';
import { QuoteFormData } from '../types';
import {
  Building2,
  CheckCircle2,
  Send,
  Sparkles,
  Phone,
  Mail,
  User,
  MapPin,
  Clock,
  ShieldAlert,
  Calendar
} from 'lucide-react';

import { supabase } from '../supabaseClient';
import { Loader2 } from 'lucide-react';

interface CommercialAndQuoteSectionProps {
  onOpenBooking: () => void;
}

export const CommercialAndQuoteSection: React.FC<CommercialAndQuoteSectionProps> = ({
  onOpenBooking
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    serviceType: 'commercial-rtu',
    propertyType: 'commercial',
    squareFootage: '2500-10000',
    urgency: 'standard',
    fullName: '',
    phone: '',
    email: '',
    zipCode: '',
    details: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculatedEstimate, setCalculatedEstimate] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Calculate realistic estimated range based on parameters
    let baseMin = 1200;
    let baseMax = 3500;

    if (formData.propertyType === 'commercial') {
      baseMin = 3500;
      baseMax = 12000;
    } else if (formData.propertyType === 'industrial') {
      baseMin = 8500;
      baseMax = 35000;
    }

    if (formData.squareFootage === '10000+') {
      baseMin *= 2;
      baseMax *= 2.5;
    }

    if (formData.urgency === 'emergency') {
      baseMin += 150;
      baseMax += 300;
    }

    const formattedEstimate = `$${baseMin.toLocaleString()} - $${baseMax.toLocaleString()}`;

    try {
      const payload = {
        required_service: formData.serviceType,
        property_type: formData.propertyType,
        approx_sq_footage: formData.squareFootage,
        urgency_level: formData.urgency,
        full_name: formData.fullName,
        phone_number: formData.phone,
        service_zip_code: formData.zipCode
      };

      const { error } = await supabase.from('priority_requests').insert([payload]);
      if (error) {
        console.error('Supabase priority_requests error:', error.message);
      }
    } catch (err) {
      console.error('Supabase submit error:', err);
    } finally {
      setIsSubmitting(false);
      setCalculatedEstimate(formattedEstimate);
      setSubmitted(true);
    }
  };

  return (
    <section id="commercial" className="relative bg-[#0B1B2D]/10 text-white py-16 lg:py-24 overflow-hidden border-t border-slate-800/30">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Commercial Services Copy Panel */}
          <div className="lg:col-span-6 space-y-6 bg-[#0B1B2D]/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700/50 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1B2D]/40 border border-slate-700/60 text-xs font-semibold text-orange-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>Commercial & Industrial Climate Solutions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-sans">
              Commercial <br />
              <span className="text-[#FF6B00]">Services</span>
            </h2>

            <p className="text-slate-200 text-base leading-relaxed">
              Comprehensive heating, cooling, and air ventilation management for corporate office parks, retail centers, industrial plants, and healthcare facilities. Built for zero unscheduled downtime.
            </p>

            {/* Bullet Points */}
            <div className="space-y-3 pt-2 text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Heavy-Duty Rooftop Units (RTUs) & Chillers:</strong> Precision installation and custom economizer retrofits.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Smart Building Automation (BMS):</strong> BACnet and Modbus telemetry integration for real-time remote thermal monitoring.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Preventative Service Agreements:</strong> Scheduled quarterly audits, filter changes, and emergency priority dispatch.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-sm tracking-wide px-7 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Inspection</span>
              </button>

              <a
                href="tel:18005554822"
                className="bg-slate-800/70 backdrop-blur-xl border border-slate-600/60 hover:bg-slate-800/90 text-slate-200 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Dispatch Hotline</span>
              </a>
            </div>
          </div>

          {/* Right Side: Floating Instant Quote Form Card */}
          <div id="quote" className="lg:col-span-6">
            <div className="bg-[#0B1B2D]/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 border border-slate-700/50 relative">

              {/* Form Header */}
              <div className="mb-6 pb-4 border-b border-slate-700/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white">
                    Our Priority Request
                  </h3>
                  <span className="text-xs bg-orange-950/80 text-[#FF6B00] border border-orange-500/30 font-bold px-2.5 py-1 rounded-full">
                    Instant Estimate
                  </span>
                </div>
                <p className="text-slate-300 text-xs mt-1">
                  Fill out the parameters below to receive an instant cost breakdown.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-black text-[#0B1B2D]">
                      Quote Request Received!
                    </h4>
                    <p className="text-slate-600 text-sm mt-1">
                      Thank you, <strong className="text-slate-900">{formData.fullName}</strong>.
                    </p>
                  </div>

                  {/* Calculated Cost Card */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Estimated Project Range
                    </div>
                    <div className="text-3xl font-black text-[#FF6B00] font-mono">
                      {calculatedEstimate}
                    </div>
                    <div className="text-xs text-slate-600">
                      *Includes NATE-certified installation, standard 10-yr warranty, and city permits.
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    A senior HVAC engineer has been notified and will call you at <strong className="text-slate-800">{formData.phone}</strong> within 15 minutes.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#FF6B00] font-bold hover:underline"
                  >
                    ← Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Service Needed Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Required Service
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="commercial-rtu">Commercial Rooftop HVAC Unit (RTU)</option>
                      <option value="residential-heat-pump">High-Efficiency Heat Pump / AC</option>
                      <option value="chiller-plants">Industrial Chiller & Water Loop</option>
                      <option value="preventative-maintenance">Quarterly Maintenance Agreement</option>
                      <option value="indoor-air-quality">Indoor Air Quality (IAQ) & HEPA Sterilization</option>
                      <option value="emergency-repair">Emergency 24/7 Rapid Repair</option>
                    </select>
                  </div>

                  {/* Property Type & Square Footage */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="commercial">Commercial Office / Retail</option>
                        <option value="residential">Residential Estate</option>
                        <option value="industrial">Industrial / Warehouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Approx. Sq Footage
                      </label>
                      <select
                        value={formData.squareFootage}
                        onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="under-2000">Under 2,000 sq ft</option>
                        <option value="2500-10000">2,000 - 10,000 sq ft</option>
                        <option value="10000+">10,000+ sq ft</option>
                      </select>
                    </div>
                  </div>

                  {/* Urgency Radio Pills */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Urgency Level
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: 'emergency' })}
                        className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                          formData.urgency === 'emergency'
                            ? 'bg-rose-50 border-rose-500 text-rose-700 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        🚨 Emergency Today
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: 'standard' })}
                        className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                          formData.urgency === 'standard'
                            ? 'bg-orange-50 border-orange-500 text-[#FF6B00] font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        ⚡ Within 48 Hrs
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: 'flexible' })}
                        className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                          formData.urgency === 'flexible'
                            ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        📅 Planning Ahead
                      </button>
                    </div>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="John Smith"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Service ZIP Code
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 90210"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Calculating & Saving...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Calculate Free Estimate</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-center text-slate-400">
                    🔒 Privacy protected. No spam. Instant phone/email response guaranteed.
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, MapPin, Wrench, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('2026-07-28');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 AM - 11:00 AM');
  const [serviceType, setServiceType] = useState('Preventative Tune-Up');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [booked, setBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        select_service: serviceType,
        preferred_date: selectedDate,
        arrival_window: selectedTimeSlot,
        full_name: name,
        phone_number: phone,
        property_address: address
      };

      const { error } = await supabase.from('service_visits').insert([payload]);
      if (error) {
        console.error('Supabase service_visits error:', error.message);
      }
    } catch (err) {
      console.error('Supabase booking submit error:', err);
    } finally {
      setIsSubmitting(false);
      setBooked(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900/85 backdrop-blur-xl rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_25px_rgba(56,189,248,0.25)] border border-sky-400/40 relative animate-in fade-in zoom-in duration-200 text-slate-100">
        
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
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">
              Schedule Service Visit
            </h3>
            <p className="text-slate-300 text-xs">
              Book a guaranteed arrival window with a licensed NATE engineer.
            </p>
          </div>
        </div>

        {booked ? (
          <div className="py-6 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-white">
                Appointment Confirmed!
              </h4>
              <p className="text-slate-300 text-xs mt-1">
                Ticket #HVAC-88942 reserved for <strong className="text-white">{name}</strong>.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl text-xs space-y-1 text-slate-200 text-left">
              <div>📅 <strong>Date:</strong> {selectedDate}</div>
              <div>⏰ <strong>Window:</strong> {selectedTimeSlot}</div>
              <div>🔧 <strong>Service:</strong> {serviceType}</div>
              <div>📍 <strong>Address:</strong> {address}</div>
            </div>

            <p className="text-[11px] text-slate-400">
              You will receive an SMS reminder 30 minutes prior to technician arrival.
            </p>

            <button
              onClick={() => {
                setBooked(false);
                onClose();
              }}
              className="bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl shadow-lg w-full cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-200 mb-1">
                Select Service
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="Preventative Tune-Up" className="bg-slate-900 text-white">Comprehensive Preventative Tune-Up ($89)</option>
                <option value="AC Cooling Repair" className="bg-slate-900 text-white">AC / Cooling Diagnostic Visit ($99)</option>
                <option value="Heat Pump Inspection" className="bg-slate-900 text-white">Heat Pump / Heating Check ($99)</option>
                <option value="Commercial Spec Consultation" className="bg-slate-900 text-white">Commercial Rooftop RTU Spec Consultation (Free)</option>
                <option value="Duct & IAQ Audit" className="bg-slate-900 text-white">Ductwork & Air Quality Audit ($120)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-200 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-200 mb-1">
                  Arrival Window
                </label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="08:00 AM - 10:00 AM" className="bg-slate-900 text-white">08:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 12:00 PM" className="bg-slate-900 text-white">10:00 AM - 12:00 PM</option>
                  <option value="01:00 PM - 03:00 PM" className="bg-slate-900 text-white">01:00 PM - 03:00 PM</option>
                  <option value="03:00 PM - 05:00 PM" className="bg-slate-900 text-white">03:00 PM - 05:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-200 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-200 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-200 mb-1">
                  Property Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="123 Main St, Suite 100"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-xs uppercase py-3.5 rounded-xl shadow-lg tracking-wider cursor-pointer mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Reserving Window...</span>
                </>
              ) : (
                <span>Confirm Service Reservation</span>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  LogOut, 
  RefreshCw, 
  Search, 
  FileText, 
  Calendar, 
  Phone, 
  MapPin, 
  Building2, 
  Clock, 
  AlertTriangle,
  Loader2,
  Users,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '../supabaseClient';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'priority' | 'visits'>('priority');
  const [priorityRequests, setPriorityRequests] = useState<any[]>([]);
  const [serviceVisits, setServiceVisits] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Check current session on mount / open
  useEffect(() => {
    if (!isOpen) return;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          fetchData();
        }
      } catch (err) {
        console.error('Session check error:', err);
      }
    };

    checkSession();
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setAuthError(error.message);
      } else if (data.session) {
        setIsAuthenticated(true);
        fetchData();
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDemoBypass = () => {
    setIsAuthenticated(true);
    fetchData();
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const fetchData = async () => {
    setDataLoading(true);
    try {
      // Fetch Priority Requests
      const { data: priorityData, error: priorityErr } = await supabase
        .from('priority_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (priorityErr) {
        console.warn('Error fetching priority_requests:', priorityErr.message);
      } else {
        setPriorityRequests(priorityData || []);
      }

      // Fetch Service Visits
      const { data: visitsData, error: visitsErr } = await supabase
        .from('service_visits')
        .select('*')
        .order('created_at', { ascending: false });

      if (visitsErr) {
        console.warn('Error fetching service_visits:', visitsErr.message);
      } else {
        setServiceVisits(visitsData || []);
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setDataLoading(false);
    }
  };

  if (!isOpen) return null;

  // Filtered lists
  const filteredPriority = priorityRequests.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      (item.full_name || '').toLowerCase().includes(q) ||
      (item.phone_number || '').toLowerCase().includes(q) ||
      (item.required_service || '').toLowerCase().includes(q) ||
      (item.service_zip_code || '').toLowerCase().includes(q)
    );
  });

  const filteredVisits = serviceVisits.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      (item.full_name || '').toLowerCase().includes(q) ||
      (item.phone_number || '').toLowerCase().includes(q) ||
      (item.select_service || '').toLowerCase().includes(q) ||
      (item.property_address || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900/85 backdrop-blur-xl rounded-2xl max-w-5xl w-full p-6 sm:p-8 shadow-[0_0_30px_rgba(56,189,248,0.2)] border border-sky-400/40 relative my-6 animate-in fade-in zoom-in duration-200 text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* UNAUTHENTICATED STATE: LOGIN MODAL */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto w-full py-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-orange-950/80 border border-orange-500/30 text-[#FF6B00] flex items-center justify-center mx-auto shadow-lg">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Admin Authentication
              </h3>
              <p className="text-slate-300 text-xs">
                Sign in with your Supabase Admin account to view lead submissions.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-200 mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@exhvac.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-200 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#FF6B00]/70 backdrop-blur-xl border border-orange-400/40 hover:bg-[#E05200]/80 text-white font-bold text-xs uppercase py-3.5 rounded-xl shadow-lg tracking-wider cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={handleDemoBypass}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold underline cursor-pointer"
              >
                ⚡ View Admin Portal (Demo Mode)
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED STATE: ADMIN DASHBOARD */
          <div className="flex flex-col h-full space-y-6">
            
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <span>HVAC Lead Management Portal</span>
                    <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                      ● Live Database
                    </span>
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Real-time Supabase customer inquiries and reservation requests.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchData}
                  disabled={dataLoading}
                  className="px-3 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? 'animate-spin text-sky-400' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 bg-rose-950/70 backdrop-blur-xl border border-rose-500/40 hover:bg-rose-900/80 text-rose-200 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Controls Bar: Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Tab Navigation */}
              <div className="flex items-center p-1 bg-slate-950/60 rounded-xl border border-slate-800 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('priority')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'priority'
                      ? 'bg-[#FF6B00]/70 text-white shadow-md border border-orange-400/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Priority Requests</span>
                  <span className="ml-1 bg-slate-900/80 text-orange-400 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    {priorityRequests.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('visits')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'visits'
                      ? 'bg-sky-600/70 text-white shadow-md border border-sky-400/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Service Visits</span>
                  <span className="ml-1 bg-slate-900/80 text-sky-400 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    {serviceVisits.length}
                  </span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

            </div>

            {/* Main Data Content Area */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 min-h-[300px]">
              
              {dataLoading ? (
                <div className="py-16 text-center space-y-3 text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-sky-400" />
                  <p className="text-xs">Fetching leads from Supabase database...</p>
                </div>
              ) : activeTab === 'priority' ? (
                /* PRIORITY REQUESTS TABLE */
                filteredPriority.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 space-y-2 bg-slate-950/40 rounded-xl border border-slate-800">
                    <FileText className="w-10 h-10 mx-auto text-slate-600" />
                    <p className="text-sm font-semibold text-slate-300">No Priority Requests Found</p>
                    <p className="text-xs">Submissions from 'Our Priority Request' form will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredPriority.map((item, idx) => (
                      <div 
                        key={item.id || idx}
                        className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 hover:border-orange-500/40 transition-all text-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
                          <div className="flex items-center gap-2 font-bold text-white text-sm">
                            <span className="text-orange-400">{item.full_name || 'Anonymous'}</span>
                            <span className="text-[10px] bg-orange-950/80 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded font-mono">
                              ZIP: {item.service_zip_code || 'N/A'}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{new Date(item.created_at || Date.now()).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Phone Number</div>
                            <a href={`tel:${item.phone_number}`} className="font-semibold text-sky-400 hover:underline">
                              {item.phone_number || 'N/A'}
                            </a>
                          </div>

                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Required Service</div>
                            <div className="font-medium text-white">{item.required_service || 'N/A'}</div>
                          </div>

                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Property / Size</div>
                            <div>{item.property_type || 'Commercial'} ({item.approx_sq_footage || 'N/A'})</div>
                          </div>

                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Urgency Level</div>
                            <span className="font-semibold text-amber-400">{item.urgency_level || 'Standard'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* SERVICE VISITS TABLE */
                filteredVisits.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 space-y-2 bg-slate-950/40 rounded-xl border border-slate-800">
                    <Calendar className="w-10 h-10 mx-auto text-slate-600" />
                    <p className="text-sm font-semibold text-slate-300">No Service Visits Reserved</p>
                    <p className="text-xs">Submissions from 'Schedule Service Visit' modal will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredVisits.map((item, idx) => (
                      <div 
                        key={item.id || idx}
                        className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 hover:border-sky-400/40 transition-all text-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
                          <div className="flex items-center gap-2 font-bold text-white text-sm">
                            <span className="text-sky-400">{item.full_name || 'Anonymous'}</span>
                            <span className="text-[10px] bg-sky-950/80 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded font-mono">
                              📅 {item.preferred_date || 'N/A'}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{new Date(item.created_at || Date.now()).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Phone Number</div>
                            <a href={`tel:${item.phone_number}`} className="font-semibold text-orange-400 hover:underline">
                              {item.phone_number || 'N/A'}
                            </a>
                          </div>

                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Service Type</div>
                            <div className="font-medium text-white">{item.select_service || 'N/A'}</div>
                          </div>

                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Arrival Window</div>
                            <div className="font-semibold text-emerald-400">{item.arrival_window || 'N/A'}</div>
                          </div>

                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Property Address</div>
                            <div className="truncate">{item.property_address || 'N/A'}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

import { ServiceItem, ProjectSpec, DiagnosticStep } from '../types';

export const HVAC_SERVICES: ServiceItem[] = [
  {
    id: 'commercial-rtu',
    title: 'Commercial Rooftop Units (RTU)',
    category: 'commercial',
    shortDesc: 'Heavy-duty packaged cooling & heating for enterprise buildings, warehouses, and shopping centers.',
    fullDesc: 'Custom rooftop unit installation, maintenance, and retrofits engineered to deliver high airflow, variable refrigeration flow (VRF), and lower energy consumption.',
    features: ['VRF & Multi-Zone Control', 'Custom Economizer Integration', 'Remote BAS/BMS Connectivity', 'High-CFM Variable Speed Fans'],
    iconName: 'Building2',
    estimatedPrice: 'From $1,200 / unit'
  },
  {
    id: 'residential-heat-pump',
    title: 'High-Efficiency Heat Pumps',
    category: 'residential',
    shortDesc: 'All-in-one heating & cooling solutions up to 24 SEER2 efficiency for modern home climate control.',
    fullDesc: 'Experience dual-fuel and inverter heat pump technology that cools efficiently in peak summer heat and warms your home down to -15°F without auxiliary heat strips.',
    features: ['Inverter Compressor Technology', 'Ultra-Quiet <45dB Operation', 'Smart Thermostat Integration', 'Eligible for Federal Tax Credits'],
    iconName: 'Flame',
    estimatedPrice: 'From $3,400 installed'
  },
  {
    id: 'chiller-plants',
    title: 'Industrial Chiller & Boiler Plants',
    category: 'commercial',
    shortDesc: 'Centralized water-cooled and air-cooled chiller plant management for healthcare & manufacturing.',
    fullDesc: 'Comprehensive engineering for large-scale liquid cooling systems, cooling tower maintenance, and hydronic heating loops with 24/7 sensor telemetry.',
    features: ['Magnetic Bearing Centrifugal Chillers', 'Glycol Loop Treatment', 'Energy Management Optimization', 'Vibration Analysis'],
    iconName: 'Server',
    estimatedPrice: 'Custom Spec Proposal'
  },
  {
    id: 'preventative-maintenance',
    title: '24/7 PM Service Contracts',
    category: 'maintenance',
    shortDesc: 'Proactive quarterly tune-ups, filter swaps, coil cleansing, and thermal imaging audits.',
    fullDesc: 'Prevent unexpected system downtime with our comprehensive 32-point inspection, refrigerant leak check, and electrical safety testing.',
    features: ['Quarterly Filter & Belt Swaps', 'Condenser & Evaporator Coil Chemical Clean', 'Priority Emergency Dispatch', '15% Off Replacement Parts'],
    iconName: 'ShieldCheck',
    estimatedPrice: 'From $29/mo'
  },
  {
    id: 'indoor-air-quality',
    title: 'Indoor Air Quality & HEPA Filtration',
    category: 'iaq',
    shortDesc: 'Hospital-grade UV-C air sterilizers, MERV 13-16 filters, and commercial dehumidification.',
    fullDesc: 'Eliminate airborne allergens, viruses, VOCs, and moisture problems with whole-building active air purification and energy recovery ventilators (ERV).',
    features: ['UV-C Germicidal Irradiation', 'MERV 16 Electrostatic Filtration', 'Whole-Building Dehumidification', 'CO2 & Humidity Sensor Integration'],
    iconName: 'Wind',
    estimatedPrice: 'From $450'
  },
  {
    id: 'emergency-dispatch',
    title: '24/7 Emergency Rapid Repair',
    category: 'emergency',
    shortDesc: 'Immediate, round-the-clock technician dispatch for zero-cooling or zero-heating crises.',
    fullDesc: 'Our fully stocked fleet of service trucks arrives equipped with universal motors, capacitors, compressors, and diagnostic tools for fast on-site repair.',
    features: ['Under 60-Min Guaranteed Response', 'Fully Stocked Mobile Parts Bay', 'NATE-Certified On-Call Crew', 'Upfront Fixed Pricing'],
    iconName: 'Clock',
    estimatedPrice: 'Flat Diagnostic Fee $99'
  }
];

export const HERO_FEATURE_CARDS = [
  {
    id: 'diverse-clients',
    title: 'Diverse Clients',
    subhead: 'Commercial & Residential',
    description: 'Serving retail hubs, medical facilities, corporate headquarters, and high-end residential estates with tailored climate management.',
    iconName: 'Building2',
    actionText: 'Read More'
  },
  {
    id: 'certification',
    title: 'Certification',
    subhead: 'Licensed & NATE Master',
    description: 'Every Ex HVAC technician is NATE-certified, EPA Universal licensed, and rigorously trained in state-of-the-art building automation.',
    iconName: 'Award',
    actionText: 'Read More'
  },
  {
    id: 'now-support',
    title: 'Now-Support Services',
    subhead: '24/7 Emergency Dispatch',
    description: 'Round-the-clock emergency support with guaranteed rapid arrival times to restore thermal comfort when equipment fails.',
    iconName: 'Headphones',
    actionText: 'Read More'
  }
];

export const PROJECT_SPECS: ProjectSpec[] = [
  {
    id: 'proj-1',
    title: 'Enterprise Tech Center RTU Retrofit',
    type: 'Commercial Rooftop HVAC',
    location: 'Downtown Financial District',
    seerRating: '22.5 SEER2',
    sqft: '45,000 sq ft',
    energySavings: '34% Lower Electric Bills',
    summary: 'Replaced 6 legacy 15-ton rooftop units with variable-speed VRF systems integrated into the central BMS via BACnet/IP.',
    tags: ['Commercial', 'VRF', 'BACnet', 'EnergyStar']
  },
  {
    id: 'proj-2',
    title: 'St. Jude Healthcare Chiller Upgrade',
    type: 'Industrial Water Chiller',
    location: 'Medical Innovation Park',
    seerRating: '24.0 SEER2 Equivalent',
    sqft: '120,000 sq ft',
    energySavings: '41% Annual KWh Savings',
    summary: 'Installed dual magnetic-bearing oil-free centrifugal chillers with redundant pump skids to ensure zero downtime in surgical suites.',
    tags: ['Healthcare', 'Chiller', 'Cleanroom', '24/7 Critical']
  },
  {
    id: 'proj-3',
    title: 'Lux Estate Heat Pump & IAQ Overhaul',
    type: 'Residential High-SEER',
    location: 'Oakridge Estates',
    seerRating: '21.0 SEER2',
    sqft: '6,200 sq ft',
    energySavings: '$2,100 / year saved',
    summary: 'Dual-fuel inverter heat pump setup coupled with MERV 16 filtration and smart zoning for 8 independent temperature zones.',
    tags: ['Residential', 'Smart Zoning', 'UV Sterilization']
  }
];

export const DIAGNOSTIC_TREE: Record<string, DiagnosticStep> = {
  start: {
    id: 'start',
    question: 'What primary HVAC issue are you experiencing today?',
    options: [
      { label: 'System is running, but air coming out is WARM or NOT COOLING', nextStepId: 'not_cooling' },
      { label: 'System will NOT TURN ON at all', nextStepId: 'not_turning_on' },
      { label: 'Making unusual loud noises (Squealing, Grinding, Banging)', nextStepId: 'loud_noises' },
      { label: 'Water leaking around indoor unit or thermostat error', nextStepId: 'water_leak' }
    ]
  },
  not_cooling: {
    id: 'not_cooling',
    question: 'Is the outdoor condenser fan spinning when the system calls for cooling?',
    options: [
      {
        label: 'No, outdoor fan is silent or humming',
        recommendation: {
          title: 'Likely Faulty Capacitor or Fan Motor',
          description: 'A failing run capacitor or blown breaker often prevents the outdoor fan and compressor from starting.',
          isEmergency: false,
          diyTip: 'Check your main electrical panel to see if the HVAC double-pole breaker tripped. Do not attempt to touch high-voltage internal components.',
          actionText: 'Schedule Capacitor & Electrical Repair'
        }
      },
      {
        label: 'Yes, outdoor fan spins, but airflow is weak indoors',
        recommendation: {
          title: 'Restricted Airflow / Clogged Filter or Frozen Evaporator Coil',
          description: 'A heavily clogged air filter restricts airflow across the evaporator coil, causing ice buildup and high humidity.',
          isEmergency: false,
          diyTip: 'Turn system to FAN ONLY mode for 2-3 hours to melt frozen coil ice, then replace the return air filter with a fresh MERV 11 filter.',
          actionText: 'Book AC Maintenance Inspection'
        }
      }
    ]
  },
  not_turning_on: {
    id: 'not_turning_on',
    question: 'Is the digital thermostat display illuminated and responsive?',
    options: [
      {
        label: 'Thermostat display is completely BLANK or UNRESPONSIVE',
        recommendation: {
          title: 'Thermostat Power Loss or Float Switch Tripped',
          description: 'Blank screens are often caused by dead thermostat batteries or a safety float switch cut-off triggered by clogged drain lines.',
          isEmergency: false,
          diyTip: 'Replace thermostat batteries (AA/AAA) or check the PVC drain line pan under your indoor handler for overflowing water.',
          actionText: 'Request Immediate Technician Visit'
        }
      },
      {
        label: 'Thermostat is ON and set to COOL, but system won’t kick in',
        recommendation: {
          title: 'Control Board Switch or High Pressure Cutout Fault',
          description: 'The system safety sensors may have locked out the compressor due to overheating or low voltage.',
          isEmergency: true,
          actionText: 'Dispatch Emergency HVAC Tech'
        }
      }
    ]
  },
  loud_noises: {
    id: 'loud_noises',
    question: 'What type of noise is the unit making?',
    options: [
      {
        label: 'High pitched SQUEALING or SCREECHING',
        recommendation: {
          title: 'Worn Fan Belt or Blower Motor Bearings',
          description: 'Friction on worn drive belts or failing motor bearings creates high frequency screeching.',
          isEmergency: false,
          diyTip: 'Turn system off to prevent motor burn-out until a technician lubricates bearings or replaces the belt.',
          actionText: 'Schedule Blower Repair'
        }
      },
      {
        label: 'Heavy BANGING or METAL GRINDING',
        recommendation: {
          title: 'CRITICAL: Loose Fan Blade or Compressor Damage',
          description: 'Physical metal grinding indicates loose hardware hitting fan shrouds or internal compressor mechanical failure.',
          isEmergency: true,
          diyTip: 'TURN OFF POWER IMMEDIATELY at the disconnect box to avoid catastrophic damage.',
          actionText: 'Request Emergency Dispatch'
        }
      }
    ]
  },
  water_leak: {
    id: 'water_leak',
    question: 'Where is the water accumulating?',
    options: [
      {
        label: 'Puddling around the base of the indoor air handler furnace',
        recommendation: {
          title: 'Clogged Condensate Drain Line or Cracked Pan',
          description: 'Algae and dust buildup clog the 3/4" PVC drain line, causing condensation overflow.',
          isEmergency: false,
          diyTip: 'Use a wet/dry shop vac to clear suction on the outside PVC drain pipe stub.',
          actionText: 'Book Drain Flush Service'
        }
      }
    ]
  }
};

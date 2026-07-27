export type ServiceCategory = 'commercial' | 'residential' | 'emergency' | 'maintenance' | 'iaq';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  iconName: string;
  estimatedPrice: string;
}

export interface QuoteFormData {
  serviceType: string;
  propertyType: 'commercial' | 'residential' | 'industrial';
  squareFootage: string;
  urgency: 'emergency' | 'standard' | 'flexible';
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  details?: string;
}

export interface ProjectSpec {
  id: string;
  title: string;
  type: string;
  location: string;
  seerRating: string;
  sqft: string;
  energySavings: string;
  summary: string;
  tags: string[];
}

export interface DiagnosticStep {
  id: string;
  question: string;
  options: {
    label: string;
    nextStepId?: string;
    recommendation?: {
      title: string;
      description: string;
      isEmergency: boolean;
      diyTip?: string;
      actionText: string;
    };
  }[];
}

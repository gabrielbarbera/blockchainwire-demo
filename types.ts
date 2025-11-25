export interface Circuit {
  id: string;
  name: string;
  category: 'Wire' | 'Specialty' | 'Individual' | 'International';
  description: string;
  price: number;
  features: string[];
  stats?: {
    traffic?: string;
    turnaround?: string;
    countries?: string;
    language?: string;
  };
}

export interface ReleaseFormData {
  circuitId: string | null;
  headline: string;
  subHeadline: string;
  location: string;
  content: string;
  contact: {
    displayPreference: 'full' | 'hide_email' | 'hide_all';
    firstName: string;
    lastName: string;
    jobTitle: string;
    company: string;
    phone: string;
    email: string;
    additional: string;
    website: string;
  };
  tags: string[];
  schedule: {
    date: string;
    time: string;
    timezone: string;
  };
  attachment?: {
    file: File | null;
    preview: string | null;
    name: string;
    size: number;
  };
  logo?: {
    file: File | null;
    preview: string | null;
    name: string;
  };
}

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
  BILLING = 'Billing'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive' | 'Unverified';
}

export interface PromoCode {
  code: string;
  circuit: string;
  company: string;
  discount: string;
  remaining: number;
  dateIssued: string;
  expirationDate: string;
}

export interface Release {
  id: string;
  status: 'Draft' | 'Scheduled' | 'Published';
  headline: string;
  circuitName: string;
  date: string;
  author: string;
}
// Database types
export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  email: string | null;
  username: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface ContactQuery {
  id: string;
  name: string;
  phone: string;
  email: string;
  property_type: string | null;
  system_size: string | null;
  budget: string | null;
  timeline: string | null;
  roof_type: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  full_description: string | null;
  icon_name: string | null;
  gradient: string | null;
  image_url: string | null;
  features: string[] | null;
  benefits: string[] | null;
  process_steps: string[] | null;
  pricing: string | null;
  timeline: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  capacity: string;
  description: string;
  image_url: string | null;
  completion_date: string | null;
  panel_count: number | null;
  system_type: string | null;
  monthly_savings: string | null;
  co2_reduction: string | null;
  features: string[] | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

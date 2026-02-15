import { supabase } from './supabase';
import type { ContactQuery, Service, Project, Profile } from '@/types/database';

// Contact Queries API
export const contactQueriesAPI = {
  // Get all contact queries (admin only)
  async getAll() {
    const { data, error } = await supabase
      .from('contact_queries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as ContactQuery[];
  },

  // Create contact query (public)
  async create(query: Omit<ContactQuery, 'id' | 'status' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('contact_queries')
      .insert([query])
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as ContactQuery;
  },

  // Update contact query status (admin only)
  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('contact_queries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as ContactQuery;
  },

  // Delete contact query (admin only)
  async delete(id: string) {
    const { error } = await supabase
      .from('contact_queries')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Services API
export const servicesAPI = {
  // Get all services
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data as Service[];
  },

  // Get single service
  async getById(id: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data as Service | null;
  },

  // Create service (admin only)
  async create(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as Service;
  },

  // Update service (admin only)
  async update(id: string, updates: Partial<Service>) {
    const { data, error } = await supabase
      .from('services')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as Service;
  },

  // Delete service (admin only)
  async delete(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Projects API
export const projectsAPI = {
  // Get all projects
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data as Project[];
  },

  // Get single project
  async getById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data as Project | null;
  },

  // Create project (admin only)
  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as Project;
  },

  // Update project (admin only)
  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as Project;
  },

  // Delete project (admin only)
  async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Profiles API
export const profilesAPI = {
  // Get current user profile
  async getCurrentProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (error) throw error;
    return data as Profile | null;
  },

  // Get all profiles (admin only)
  async getAll() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Profile[];
  },

  // Update user role (admin only)
  async updateRole(id: string, role: 'user' | 'admin') {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as Profile;
  }
};

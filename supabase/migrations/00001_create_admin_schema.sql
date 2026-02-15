-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  role user_role DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact queries table
CREATE TABLE public.contact_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  property_type TEXT,
  system_size TEXT,
  budget TEXT,
  timeline TEXT,
  roof_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  icon_name TEXT,
  gradient TEXT,
  image_url TEXT,
  features TEXT[],
  benefits TEXT[],
  process_steps TEXT[],
  pricing TEXT,
  timeline TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  completion_date TEXT,
  panel_count INT,
  system_type TEXT,
  monthly_savings TEXT,
  co2_reduction TEXT,
  features TEXT[],
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  -- Insert a profile synced with auth.users
  INSERT INTO public.profiles (id, email, username, role)
  VALUES (
    NEW.id,
    NEW.email,
    SPLIT_PART(NEW.email, '@', 1),
    CASE WHEN user_count = 0 THEN 'admin'::public.user_role ELSE 'user'::public.user_role END
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user confirmation
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Contact queries policies (admin only)
CREATE POLICY "Admins can view all contact queries" ON contact_queries
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update contact queries" ON contact_queries
  FOR UPDATE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete contact queries" ON contact_queries
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can insert contact queries" ON contact_queries
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Services policies
CREATE POLICY "Anyone can view active services" ON services
  FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Admins can manage all services" ON services
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Projects policies
CREATE POLICY "Anyone can view active projects" ON projects
  FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Admins can manage all projects" ON projects
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE contact_queries;
ALTER PUBLICATION supabase_realtime ADD TABLE services;
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
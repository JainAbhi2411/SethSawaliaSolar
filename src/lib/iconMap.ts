import { Home, Building2, Wrench, Layout, Leaf, Battery, LucideIcon } from 'lucide-react';

// Map icon names to Lucide icon components
export const iconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  Wrench,
  Layout,
  Leaf,
  Battery,
};

export const getIcon = (iconName: string | null): LucideIcon => {
  if (!iconName || !iconMap[iconName]) {
    return Home; // Default icon
  }
  return iconMap[iconName];
};

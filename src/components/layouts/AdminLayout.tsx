import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminGuard } from '@/components/common/AdminGuard';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, MessageSquare, Briefcase, FolderKanban, Users, LogOut, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/queries', icon: MessageSquare, label: 'Contact Queries' },
    { to: '/admin/services', icon: Briefcase, label: 'Services' },
    { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/admin/users', icon: Users, label: 'Users' },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-muted/20">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sun className="w-6 h-6 text-primary" />
          <span className="font-bold">Admin Panel</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Sun className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Seth Sawalia</h2>
              <p className="text-xs text-muted-foreground">Solar Admin</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
          <div className="mb-3 px-2">
            <p className="text-sm font-medium">{profile?.username}</p>
            <p className="text-xs text-muted-foreground capitalize">{profile?.role}</p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
    </AdminGuard>
  );
};

export default AdminLayout;

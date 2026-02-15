import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Briefcase, FolderKanban, Users, TrendingUp } from 'lucide-react';
import { contactQueriesAPI, servicesAPI, projectsAPI, profilesAPI } from '@/db/api';
import { supabase } from '@/db/supabase';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    queries: 0,
    services: 0,
    projects: 0,
    users: 0,
    newQueries: 0
  });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const [queries, services, projects, users] = await Promise.all([
        contactQueriesAPI.getAll(),
        servicesAPI.getAll(),
        projectsAPI.getAll(),
        profilesAPI.getAll()
      ]);

      const newQueries = queries.filter(q => q.status === 'new').length;

      setStats({
        queries: queries.length,
        services: services.length,
        projects: projects.length,
        users: users.length,
        newQueries
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();

    // Real-time subscriptions
    const queriesChannel = supabase
      .channel('dashboard-queries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_queries' }, loadStats)
      .subscribe();

    const servicesChannel = supabase
      .channel('dashboard-services')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, loadStats)
      .subscribe();

    const projectsChannel = supabase
      .channel('dashboard-projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, loadStats)
      .subscribe();

    return () => {
      queriesChannel.unsubscribe();
      servicesChannel.unsubscribe();
      projectsChannel.unsubscribe();
    };
  }, []);

  const statCards = [
    {
      title: 'Contact Queries',
      value: stats.queries,
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      badge: stats.newQueries > 0 ? `${stats.newQueries} new` : null
    },
    {
      title: 'Services',
      value: stats.services,
      icon: Briefcase,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Users',
      value: stats.users,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-black mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Seth Sawalia Solar Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-black">{stat.value}</div>
                {stat.badge && (
                  <div className="px-2 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                    {stat.badge}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/admin/queries"
              className="block p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-semibold mb-1">View Contact Queries</div>
              <div className="text-sm text-muted-foreground">
                Manage customer inquiries and quote requests
              </div>
            </a>
            <a
              href="/admin/services"
              className="block p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-semibold mb-1">Manage Services</div>
              <div className="text-sm text-muted-foreground">
                Add, edit, or remove service offerings
              </div>
            </a>
            <a
              href="/admin/projects"
              className="block p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="font-semibold mb-1">Manage Projects</div>
              <div className="text-sm text-muted-foreground">
                Showcase completed solar installations
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Database Status</span>
              <span className="text-sm font-semibold text-accent">Connected</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Real-time Updates</span>
              <span className="text-sm font-semibold text-accent">Active</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Total Records</span>
              <span className="text-sm font-semibold">{stats.queries + stats.services + stats.projects}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span className="text-sm font-semibold">{stats.users}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

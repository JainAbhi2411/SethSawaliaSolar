import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Zap, Maximize2, Sparkles, Filter, Calendar, Users, CheckCircle2, X } from 'lucide-react';
import { projectsAPI } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { Project } from '@/types/database';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

  const loadProjects = async () => {
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();

    // Real-time subscription
    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          loadProjects();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Work</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Project <span className="text-accent">Portfolio</span>
            </h1>
            <p className="text-lg text-muted-foreground">Showcasing our best solar installations across Jaipur.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter:</span>
            </div>
            {categories.map((cat) => (
              <Button 
                key={cat} 
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className="rounded-full font-semibold transition-all hover:scale-105"
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group overflow-hidden border-2 border-transparent hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-background cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image_url || ''} 
                  alt={project.title || ''}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="secondary" className="shadow-lg backdrop-blur-sm bg-background/90 font-bold">
                    {project.category}
                  </Badge>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <Button variant="secondary" size="lg" className="rounded-full shadow-xl font-bold pointer-events-none">
                    <Maximize2 className="w-5 h-5 mr-2" /> View Details
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 shrink-0 text-primary" /> 
                    <span>{project.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-bold text-primary text-lg">{project.capacity}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs font-semibold group-hover:text-primary pointer-events-none">
                    Read More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Detail Modal */}
        <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (() => {
              const project = projects.find(p => p.id === selectedProject);
              if (!project) return null;
              
              return (
                <>
                  <DialogHeader>
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 -mt-6 -mx-6">
                      <img 
                        src={project.image_url || ''} 
                        alt={project.title || ''}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground shadow-lg text-base px-4 py-2">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <DialogTitle className="text-2xl md:text-3xl font-black">{project.title}</DialogTitle>
                    <DialogDescription className="text-base">
                      <div className="flex items-center gap-2 text-muted-foreground mt-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {project.location}
                      </div>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 mt-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl text-center">
                        <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-black text-primary">{project.capacity}</div>
                        <div className="text-xs text-muted-foreground">System Size</div>
                      </div>
                      <div className="p-4 bg-secondary/10 rounded-xl text-center">
                        <Calendar className="w-6 h-6 text-secondary mx-auto mb-2" />
                        <div className="text-lg font-bold text-secondary">{project.completion_date}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div className="p-4 bg-accent/10 rounded-xl text-center">
                        <Sparkles className="w-6 h-6 text-accent mx-auto mb-2" />
                        <div className="text-lg font-bold text-accent">{project.panel_count}</div>
                        <div className="text-xs text-muted-foreground">Solar Panels</div>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl text-center">
                        <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-lg font-bold text-primary">{project.system_type}</div>
                        <div className="text-xs text-muted-foreground">System Type</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-bold text-lg mb-3">Project Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>

                    {/* Impact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border-2 border-secondary/20">
                        <h5 className="font-bold text-sm text-muted-foreground mb-2">Monthly Savings</h5>
                        <div className="text-3xl font-black text-secondary">{project.monthly_savings}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border-2 border-accent/20">
                        <h5 className="font-bold text-sm text-muted-foreground mb-2">CO₂ Reduction</h5>
                        <div className="text-3xl font-black text-accent">{project.co2_reduction}</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-bold text-lg mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {project.features?.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                      <Button className="flex-1" asChild>
                        <a href="/contact">Get Similar Quote</a>
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => setSelectedProject(null)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Projects;
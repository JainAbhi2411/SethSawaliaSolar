import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Zap, Maximize2, Sparkles, Filter, Calendar, Users, CheckCircle2, X } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

  const projects = [
    {
      id: 1,
      title: 'Modern Villa Rooftop',
      category: 'Residential',
      location: 'Vaishali Nagar, Jaipur',
      capacity: '10kW',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_b5b8f641-1526-4b67-973b-00812926c35e.jpg',
      description: 'A complete residential setup with 20 high-efficiency panels and hybrid inverter.',
      details: {
        completionDate: 'March 2024',
        panelCount: 20,
        systemType: 'Grid-Tied with Battery Backup',
        monthlySavings: '₹12,000',
        co2Reduction: '8 tons/year',
        features: [
          'High-efficiency monocrystalline panels',
          '10kW hybrid inverter with smart monitoring',
          'Net metering enabled',
          '25-year performance warranty',
          'Remote monitoring system'
        ]
      }
    },
    {
      id: 2,
      title: 'Textile Factory Solar Plant',
      category: 'Industrial',
      location: 'Sitapura Industrial Area, Jaipur',
      capacity: '150kW',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_a7ff9711-4735-4234-8a87-041c5d6961a2.jpg',
      description: 'Large scale industrial installation to power heavy machinery and reduce operational costs.',
      details: {
        completionDate: 'January 2024',
        panelCount: 400,
        systemType: 'Grid-Tied Commercial',
        monthlySavings: '₹1,80,000',
        co2Reduction: '120 tons/year',
        features: [
          'Industrial-grade solar panels',
          'Multiple string inverters for reliability',
          'Advanced monitoring and analytics',
          'Reduced peak demand charges',
          'ROI achieved in 4.5 years'
        ]
      }
    },
    {
      id: 3,
      title: 'Green Office Complex',
      category: 'Commercial',
      location: 'C-Scheme, Jaipur',
      capacity: '50kW',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_88aafb43-e44c-4c98-b557-270ec434e470.jpg',
      description: 'Integrated solar solution for a premium commercial building, including battery backup.',
      details: {
        completionDate: 'February 2024',
        panelCount: 130,
        systemType: 'Hybrid System',
        monthlySavings: '₹60,000',
        co2Reduction: '40 tons/year',
        features: [
          'Bifacial solar panels for maximum efficiency',
          'Battery storage for power backup',
          'Smart energy management system',
          'LEED certification support',
          'Real-time energy dashboard'
        ]
      }
    },
    {
      id: 4,
      title: 'Luxury Apartment Grid-Tie',
      category: 'Residential',
      location: 'Mansarovar, Jaipur',
      capacity: '15kW',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_ea8ae656-2859-4d84-8c44-715d7f98792d.jpg',
      description: 'Distributed rooftop solar for a multi-story residential building.',
      details: {
        completionDate: 'December 2023',
        panelCount: 38,
        systemType: 'Grid-Tied',
        monthlySavings: '₹18,000',
        co2Reduction: '12 tons/year',
        features: [
          'Distributed installation across multiple floors',
          'Individual unit metering',
          'Aesthetic panel mounting',
          'Minimal maintenance design',
          'Community solar benefits'
        ]
      }
    },
    {
      id: 5,
      title: 'Heritage Hotel Solar Heating',
      category: 'Commercial',
      location: 'Amer, Jaipur',
      capacity: '30kW',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_dc709b9f-d2f2-400d-b875-e5c47da50c85.jpg',
      description: 'Specialized installation for a heritage property keeping architectural aesthetics intact.',
      details: {
        completionDate: 'November 2023',
        panelCount: 75,
        systemType: 'Grid-Tied with Solar Water Heating',
        monthlySavings: '₹35,000',
        co2Reduction: '25 tons/year',
        features: [
          'Heritage-compliant installation',
          'Integrated solar water heating',
          'Minimal visual impact design',
          'Tourism board approved',
          'Energy-efficient hotel operations'
        ]
      }
    },
    {
      id: 6,
      title: 'Cold Storage Solar Power',
      category: 'Industrial',
      location: 'VKI Area, Jaipur',
      capacity: '200kW',
      image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_32a5364c-fc03-49a3-bfbb-468f7157dbea.jpg',
      description: 'Critical power solution for cold storage facilities with high energy reliability.',
      details: {
        completionDate: 'October 2023',
        panelCount: 520,
        systemType: 'Grid-Tied with Backup',
        monthlySavings: '₹2,40,000',
        co2Reduction: '160 tons/year',
        features: [
          'High-capacity industrial system',
          'Redundant power backup',
          '24/7 monitoring and maintenance',
          'Critical load management',
          'Significant operational cost reduction'
        ]
      }
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

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
                  src={project.image} 
                  alt={project.title}
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
                        src={project.image} 
                        alt={project.title}
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
                        <div className="text-lg font-bold text-secondary">{project.details.completionDate}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div className="p-4 bg-accent/10 rounded-xl text-center">
                        <Sparkles className="w-6 h-6 text-accent mx-auto mb-2" />
                        <div className="text-lg font-bold text-accent">{project.details.panelCount}</div>
                        <div className="text-xs text-muted-foreground">Solar Panels</div>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl text-center">
                        <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-lg font-bold text-primary">{project.details.systemType}</div>
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
                        <div className="text-3xl font-black text-secondary">{project.details.monthlySavings}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border-2 border-accent/20">
                        <h5 className="font-bold text-sm text-muted-foreground mb-2">CO₂ Reduction</h5>
                        <div className="text-3xl font-black text-accent">{project.details.co2Reduction}</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-bold text-lg mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {project.details.features.map((feature, index) => (
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
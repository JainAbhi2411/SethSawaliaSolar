import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles, ArrowRight, IndianRupee, Clock, Award } from 'lucide-react';
import { servicesAPI } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { Service } from '@/types/database';
import { getIcon } from '@/lib/iconMap';

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      const data = await servicesAPI.getAll();
      setServices(data);
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();

    // Real-time subscription
    const channel = supabase
      .channel('services-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'services' },
        () => {
          loadServices();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Complete Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Comprehensive Solar <span className="text-primary">Services</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We provide end-to-end solar energy solutions tailored to the unique environment and energy needs of Jaipur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {services.map((service) => {
            const IconComponent = getIcon(service.icon_name);
            return (
              <Card 
                key={service.id} 
                className={`group flex flex-col h-full border-2 border-transparent hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-background relative overflow-hidden cursor-pointer`}
                onClick={() => setSelectedService(service.id)}
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image_url || ''} 
                    alt={service.title || ''}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors"></div>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-background rounded-2xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-muted rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="pb-4 relative z-10">
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed pt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 relative z-10">
                  <ul className="space-y-3">
                    {service.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <CheckCircle2 className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Service Detail Modal */}
        <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedService && (() => {
              const service = services.find(s => s.id === selectedService);
              if (!service) return null;
              
              const IconComponent = getIcon(service.icon_name);
              
              return (
                <>
                  <DialogHeader>
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 -mt-6 -mx-6">
                      <img 
                        src={service.image_url || ''} 
                        alt={service.title || ''}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60`}></div>
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                        <IconComponent className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <DialogTitle className="text-2xl md:text-3xl font-black">{service.title}</DialogTitle>
                    <DialogDescription className="text-base">
                      {service.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 mt-4">
                    {/* Overview */}
                    <div>
                      <h4 className="font-bold text-lg mb-3">Service Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">{service.full_description}</p>
                    </div>

                    {/* Pricing & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <IndianRupee className="w-5 h-5 text-primary" />
                          <h5 className="font-bold text-sm text-muted-foreground">Pricing</h5>
                        </div>
                        <div className="text-lg font-bold text-primary">{service.pricing}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border-2 border-secondary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-secondary" />
                          <h5 className="font-bold text-sm text-muted-foreground">Timeline</h5>
                        </div>
                        <div className="text-lg font-bold text-secondary">{service.timeline}</div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent" />
                        Key Benefits
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.benefits?.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Process */}
                    <div>
                      <h4 className="font-bold text-lg mb-4">Our Process</h4>
                      <div className="space-y-3">
                        {service.process_steps?.map((step, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border-l-4 border-primary">
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-sm text-muted-foreground pt-1">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                      <Button className="flex-1" asChild>
                        <a href="/contact">Request Quote</a>
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => setSelectedService(null)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>

        {/* Process Section - Enhanced */}
        <div className="mt-32">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Our Process</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black">
              Implementation <span className="text-secondary">Journey</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { step: '01', title: 'Consultation', desc: 'Site visit and energy audit to understand your needs.', icon: '🔍' },
              { step: '02', title: 'Design', desc: 'Custom engineering design and financial planning.', icon: '📐' },
              { step: '03', title: 'Installation', desc: 'Professional setup by our certified technicians.', icon: '🔧' },
              { step: '04', title: 'Commissioning', desc: 'Testing, net-metering setup, and handover.', icon: '✅' }
            ].map((p, i) => (
              <div 
                key={i} 
                className="group relative z-10 bg-background p-8 rounded-3xl border-2 border-transparent hover:border-primary text-center space-y-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
                <div className="text-5xl font-black text-muted/20 group-hover:text-primary/30 transition-colors">{p.step}</div>
                <h4 className="font-bold text-2xl group-hover:text-primary transition-colors">{p.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-primary opacity-20 -z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
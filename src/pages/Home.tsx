import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sun, Shield, Zap, IndianRupee, MapPin, ArrowRight, Star, Sparkles, TrendingUp, Award, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, capacity: 0, years: 0 });

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    const targets = { projects: 500, capacity: 10, years: 15 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounts({
        projects: Math.floor((targets.projects / steps) * step),
        capacity: Math.floor((targets.capacity / steps) * step),
        years: Math.floor((targets.years / steps) * step)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { consultationRequestsAPI } = await import('@/db/api');
      await consultationRequestsAPI.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      });
      
      toast.success("Thank you! We'll contact you within 24 hours.");
      setFormData({ name: '', phone: '', email: '' });
    } catch (error: any) {
      console.error('Failed to submit consultation request:', error);
      const errorMessage = error?.message || 'Failed to submit request. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-[750px] flex items-center justify-center overflow-hidden bg-foreground">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_f823e612-9824-459a-98e5-e1dfa98f0602.jpg" 
            alt="Solar panels on a roof in Jaipur" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse-slow"></div>

        <div className="container relative z-10 mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Headline */}
            <div className="space-y-8 animate-fade-in text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/30">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-background">Trusted by 500+ Happy Customers</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-background leading-tight">
                Power Your Home with{' '}
                <span className="relative inline-block">
                  <span className="text-secondary drop-shadow-lg">Clean Energy</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C60 2 140 2 198 10" stroke="currentColor" strokeWidth="3" className="text-secondary" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-background/90 leading-relaxed">
                Join Rajasthan's solar revolution. Save up to <span className="font-bold text-secondary">90% on electricity bills</span> while protecting our planet.
              </p>

              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 pt-4">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105" asChild>
                  <Link to="/resources">
                    <Zap className="w-5 h-5 mr-2" />
                    Calculate Savings
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg bg-transparent text-background border-2 border-background hover:bg-background hover:text-primary transition-all" asChild>
                  <Link to="/projects">View Projects</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-background/80">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-background/80">25 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-background/80">90% Bill Reduction</span>
                </div>
              </div>
            </div>

            {/* Right: Enhanced Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Card className="border-none shadow-2xl bg-background/98 backdrop-blur-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
                      <Sun className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary">
                      Get Your Free Quote
                    </h3>
                    <p className="text-sm text-muted-foreground">Expert consultation within 24 hours • No obligations</p>
                  </div>
                  
                  <form onSubmit={handleHeroFormSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="hero-name" className="text-sm font-semibold">Full Name</Label>
                      <Input 
                        id="hero-name" 
                        placeholder="Enter your name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="h-12 border-2 focus:border-primary transition-all"
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hero-phone" className="text-sm font-semibold">Phone Number</Label>
                      <Input 
                        id="hero-phone" 
                        placeholder="+91 XXXXX XXXXX" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="h-12 border-2 focus:border-primary transition-all"
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hero-email" className="text-sm font-semibold">Email Address</Label>
                      <Input 
                        id="hero-email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="h-12 border-2 focus:border-primary transition-all"
                        required 
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Get Free Consultation
                        </>
                      )}
                    </Button>
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>100% secure. Your information is safe with us.</span>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with Animation */}
      <section className="py-16 bg-background border-y relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 group cursor-pointer">
              <div className="text-4xl md:text-5xl font-black text-primary group-hover:scale-110 transition-transform">
                {counts.projects}+
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Projects Completed</div>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="text-4xl md:text-5xl font-black text-secondary group-hover:scale-110 transition-transform">
                {counts.capacity}+ MW
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Installed Capacity</div>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="text-4xl md:text-5xl font-black text-accent group-hover:scale-110 transition-transform">
                {counts.years}+
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Years Experience</div>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="text-4xl md:text-5xl font-black text-primary group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Showcase Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Professional Installation</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black">
                Expert Team, <span className="text-primary">Quality Work</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our certified technicians ensure every installation meets the highest safety and quality standards. With years of experience and advanced equipment, we deliver solar solutions that last for decades.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <div className="text-3xl font-black text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Safety Compliance</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black text-secondary">25+</div>
                  <div className="text-sm text-muted-foreground">Years Warranty</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_00ebe2a7-69d4-430a-b81a-7adef119469e.jpg" 
                    alt="Solar technician with safety gear" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_f0341102-53db-40c6-9ad4-9bdf3deeda04.jpg" 
                    alt="Solar installation tools" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_09875081-d6de-4eae-8ac9-5901199de228.jpg" 
                    alt="Solar panel quality control" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_04db06b0-c057-4c66-9a67-a45eb5e6980f.jpg" 
                    alt="Happy family with solar panels" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Solar? Section - Enhanced */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sun className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Why Go Solar?</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black">
              Why Choose Solar in <span className="text-primary">Rajasthan</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              Jaipur receives over 300 sunny days a year, making it one of the best locations for solar energy in India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_cf603780-9b3d-49f0-8671-09ed8a22a456.jpg',
                title: 'Massive Savings',
                desc: 'Reduce your monthly electricity bills by up to 90% and protect yourself from rising power costs.',
                color: 'primary',
                gradient: 'from-primary/10 to-primary/5'
              },
              {
                image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_9969a198-2753-4bf3-a89a-54d30b68208e.jpg',
                title: 'Sustainable Energy',
                desc: 'Help the environment by reducing carbon emissions. Go green and join the clean energy revolution.',
                color: 'accent',
                gradient: 'from-accent/10 to-accent/5'
              },
              {
                image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_0d9a54b1-e05e-485c-952b-a022b06abd44.jpg',
                title: 'Energy Independence',
                desc: 'Generate your own electricity and reduce dependency on the local power grid.',
                color: 'secondary',
                gradient: 'from-secondary/10 to-secondary/5'
              }
            ].map((item, i) => (
              <Card 
                key={i} 
                className={`group border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-background overflow-hidden relative`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-muted rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-0 relative z-10">
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                  </div>
                  <div className="p-6 text-center space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview - Enhanced */}
      <section className="py-24 bg-muted/50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-secondary">Our Services</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black">
                Complete Solar <span className="text-secondary">Solutions</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                From initial consultation to lifelong maintenance, we handle everything for your solar journey.
              </p>
            </div>
            <Button variant="outline" size="lg" className="group border-2 hover:border-primary" asChild>
              <Link to="/services">
                View All Services 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Residential Solar', 
                desc: 'Rooftop solutions tailored for Jaipur homes.',
                image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_30a7afd5-88c4-4bbd-9a56-502e9395b962.jpg',
                color: 'from-blue-500/10 to-blue-500/5'
              },
              { 
                title: 'Commercial Solar', 
                desc: 'Large scale installations for businesses & industries.',
                image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_ccbe9305-0dac-4386-a79a-618d7dce559b.jpg',
                color: 'from-green-500/10 to-green-500/5'
              },
              { 
                title: 'Maintenance', 
                desc: 'Periodic cleaning and performance monitoring.',
                image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_657a89aa-e076-4c7c-a1e0-6ac8fde62a9c.jpg',
                color: 'from-orange-500/10 to-orange-500/5'
              },
              { 
                title: 'System Design', 
                desc: 'Expert consultation and optimized system layouts.',
                image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_203b69e1-d609-445e-9514-023ffdd921e7.jpg',
                color: 'from-purple-500/10 to-purple-500/5'
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className={`group relative bg-background backdrop-blur-sm rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-xl overflow-hidden`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-bold text-xl group-hover:text-primary transition-colors">{service.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Impact Section */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_be9356bf-4e1a-4b48-8cc0-1b36b5aba578.jpg" 
            alt="Green energy sustainability" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/30">
                <Leaf className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">Environmental Impact</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black">
                Building a <span className="text-accent">Greener Future</span>
              </h2>
              <p className="text-background/80 text-lg leading-relaxed">
                Every solar installation contributes to a cleaner environment. Our projects have helped reduce thousands of tons of CO₂ emissions, making Jaipur a more sustainable city.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="space-y-2">
                  <div className="text-4xl font-black text-accent">5000+</div>
                  <div className="text-sm text-background/70">Tons CO₂ Saved</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-secondary">10MW+</div>
                  <div className="text-sm text-background/70">Clean Energy</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-primary">500+</div>
                  <div className="text-sm text-background/70">Green Homes</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_be9356bf-4e1a-4b48-8cc0-1b36b5aba578.jpg" 
                  alt="Green energy and sustainability" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-semibold text-accent">Customer Reviews</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black">
              What Our <span className="text-accent">Customers Say</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Rajesh Sharma', 
                loc: 'Malviya Nagar, Jaipur', 
                comment: 'Installed a 5kW system. My electricity bill came down from ₹8,000 to ₹400. Seth sawaliya team was very professional.',
                rating: 5,
                avatar: '👨'
              },
              { 
                name: 'Priya Gupta', 
                loc: 'Vaishali Nagar, Jaipur', 
                comment: 'Excellent service. The installation was neat and they helped with all the government subsidies and paperwork.',
                rating: 5,
                avatar: '👩'
              },
              { 
                name: 'Amit Verma', 
                loc: 'Mansarovar, Jaipur', 
                comment: 'Great experience. They use high-quality panels and the after-sales support is outstanding.',
                rating: 5,
                avatar: '👨‍💼'
              }
            ].map((t, i) => (
              <Card 
                key={i} 
                className="group bg-background border-2 hover:border-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-muted rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="pt-8 pb-6 space-y-6 relative z-10">
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-secondary fill-secondary" />
                    ))}
                  </div>
                  
                  {/* Comment */}
                  <p className="text-foreground leading-relaxed font-medium">"{t.comment}"</p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{t.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {t.loc}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative bg-foreground rounded-3xl md:rounded-[3rem] p-8 md:p-20 text-center text-background overflow-hidden shadow-2xl">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-background/20 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-background/20 rounded-full"></div>
              <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-background/20 rounded-full"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/30 backdrop-blur-sm rounded-full border border-secondary/40">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="font-semibold text-background">Limited Time Offer</span>
              </div>
              
              <h2 className="text-3xl md:text-6xl font-black leading-tight text-background">
                Ready to Make the Switch to <span className="text-secondary drop-shadow-lg">Solar Energy</span>?
              </h2>
              
              <p className="text-background/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Contact us today for a free site inspection and get a customized quote for your property. Join 500+ satisfied customers in Jaipur.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button size="lg" variant="secondary" className="text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all" asChild>
                  <Link to="/contact">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get a Quote Now
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg font-bold border-2 border-background text-background hover:bg-background hover:text-foreground transition-all" 
                  asChild
                >
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-background/80">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>25 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span>500+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, History, Target, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col">
      {/* Intro Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary text-primary-foreground mb-4">ESTABLISHED 2010</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Pioneering Solar Energy in the Pink City
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Seth sawaliya Solar Company was founded with a single vision: to make clean, sustainable energy accessible to every household and business in Jaipur. With over a decade of experience, we have grown from a small team of enthusiasts to one of Rajasthan's leading solar EPC providers.
              </p>
              <p className="text-muted-foreground">
                We believe that the future of energy is decentralized and renewable. Our team combines technical expertise with deep local knowledge to deliver solar systems that are perfectly optimized for Jaipur's unique climatic conditions.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Join the Revolution</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_b466d77b-6d5b-472b-9a32-e4a7e6c9eb15.jpg" 
                  alt="Seth sawaliya Solar Installation Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-2xl shadow-xl max-w-[200px] border hidden md:block">
                <div className="text-primary font-bold text-3xl">15+</div>
                <div className="text-sm text-muted-foreground">Years of Trust & Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none bg-muted/10 p-4">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Our Mission</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To accelerate the transition to sustainable energy by providing high-quality, affordable solar solutions and exceptional customer service.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-muted/10 p-4">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <History className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Our Vision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To be Jaipur's most preferred renewable energy partner, known for innovation, reliability, and our commitment to a greener planet.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-muted/10 p-4">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Our Values</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transparency, integrity, and technical excellence are at the core of everything we do. We treat every roof as if it were our own.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
               <img 
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_26483c92-d67f-4c65-b3fc-2787774b6f8e.jpg" 
                  alt="High quality solar panels" 
                  className="rounded-3xl shadow-lg"
                />
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <h2 className="text-3xl font-bold">Why Seth sawaliya Solar?</h2>
              <div className="space-y-6">
                {[
                  { title: 'Local Expertise', desc: 'Deep understanding of Jaipur\'s grid infrastructure and subsidy processes.' },
                  { title: 'Top-Tier Components', desc: 'We only use Tier-1 solar modules and premium inverters for maximum longevity.' },
                  { title: 'Expert Engineering', desc: 'Our designs are optimized for maximum generation based on specific site shadows.' },
                  { title: 'Unmatched Support', desc: 'Prompt after-sales service and remote monitoring for your peace of mind.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-background/70 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team (Simple version) */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Amit Sharma', role: 'Chief Engineer', img: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d61d4384-5218-4908-9bfa-ac3790c9690e.jpg' },
              { name: 'Sanjay Verma', role: 'Operations Head', img: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_0c9bb567-103f-4427-b6f8-75e5bb2618bf.jpg' },
              { name: 'Rajesh Meena', role: 'Solar Consultant', img: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d61d4384-5218-4908-9bfa-ac3790c9690e.jpg' },
              { name: 'Vikram Singh', role: 'Lead Technician', img: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_0c9bb567-103f-4427-b6f8-75e5bb2618bf.jpg' }
            ].map((member, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Badge component since I didn't import it correctly in the previous step
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

export default About;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Home, Building2, Wrench, Layout, Leaf, Battery, CheckCircle2, Sparkles, ArrowRight, IndianRupee, Clock, Award } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: <Home className="w-10 h-10 text-primary" />,
      title: "Residential Rooftop Solar",
      description: "Custom solar solutions for homes of all sizes in Jaipur. We handle everything from design to installation and grid connection.",
      features: ["Government Subsidy Support", "Net Metering Setup", "Space-efficient Designs", "25-Year Warranty"],
      gradient: "from-blue-500/10 to-blue-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_587726c7-e3e9-4906-a930-7577ba7599e2.jpg",
      details: {
        fullDescription: "Transform your home into a clean energy powerhouse with our residential solar solutions. We specialize in rooftop installations for villas, apartments, and independent houses across Jaipur. Our team handles everything from initial site assessment to final grid connection, ensuring a hassle-free experience.",
        benefits: [
          "Reduce electricity bills by up to 90%",
          "Increase property value",
          "Government subsidies up to ₹78,000",
          "Net metering for excess power",
          "25-year performance warranty",
          "Free maintenance for first year"
        ],
        process: [
          "Free site inspection and feasibility study",
          "Custom system design and quotation",
          "Subsidy application assistance",
          "Professional installation (3-5 days)",
          "Net metering setup with JVVNL",
          "System commissioning and handover"
        ],
        pricing: "Starting from ₹52,000 per kW (after subsidy)",
        timeline: "15-20 days from booking to commissioning"
      }
    },
    {
      id: 2,
      icon: <Building2 className="w-10 h-10 text-secondary" />,
      title: "Commercial Solar Solutions",
      description: "Scale up your energy savings for warehouses, factories, schools, and hospitals with our high-capacity commercial solar systems.",
      features: ["Tax Benefits (Accelerated Depreciation)", "Low Maintenance", "High ROI", "Custom Financing Options"],
      gradient: "from-orange-500/10 to-orange-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_cdc700b3-8ad8-437e-9787-c551781838c2.jpg",
      details: {
        fullDescription: "Power your business with clean, cost-effective solar energy. Our commercial solutions are designed for offices, factories, warehouses, schools, hospitals, and retail spaces. We offer scalable systems from 10kW to 1MW+ with flexible financing options.",
        benefits: [
          "Reduce operational costs by 40-60%",
          "Accelerated depreciation tax benefits",
          "Hedge against rising electricity tariffs",
          "Improve corporate sustainability profile",
          "Minimal maintenance requirements",
          "Quick ROI (3-5 years typical)"
        ],
        process: [
          "Energy audit and load analysis",
          "Customized system design",
          "Financial modeling and ROI analysis",
          "Turnkey installation",
          "Grid synchronization",
          "Performance monitoring setup"
        ],
        pricing: "Starting from ₹45,000 per kW (for systems above 50kW)",
        timeline: "30-45 days for systems up to 100kW"
      }
    },
    {
      id: 3,
      icon: <Wrench className="w-10 h-10 text-accent" />,
      title: "Solar Panel Maintenance",
      description: "Ensure your solar system operates at peak efficiency with our professional cleaning and maintenance services.",
      features: ["Periodic Cleaning", "Electrical Health Checks", "Performance Monitoring", "Fault Troubleshooting"],
      gradient: "from-green-500/10 to-green-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_430596d7-733e-477f-b3de-339406be4620.jpg",
      details: {
        fullDescription: "Maximize your solar investment with our comprehensive maintenance services. Regular cleaning and maintenance can improve system efficiency by 15-25%. We offer both one-time cleaning and annual maintenance contracts for residential and commercial installations.",
        benefits: [
          "Restore 15-25% lost efficiency",
          "Extend system lifespan",
          "Early fault detection",
          "Maintain warranty compliance",
          "Professional equipment and techniques",
          "Detailed performance reports"
        ],
        process: [
          "Visual inspection of panels and mounting",
          "Professional cleaning with deionized water",
          "Electrical connection checks",
          "Inverter performance analysis",
          "String voltage and current testing",
          "Performance report and recommendations"
        ],
        pricing: "₹15-25 per panel for cleaning | AMC from ₹5,000/year",
        timeline: "Same-day service available"
      }
    },
    {
      id: 4,
      icon: <Layout className="w-10 h-10 text-orange-500" />,
      title: "Solar System Design & Consultation",
      description: "Get a detailed technical layout and energy production estimation for your property before you invest.",
      features: ["3D Shade Analysis", "Optimal Angle Calculation", "Structural Integrity Check", "Component Selection"],
      gradient: "from-purple-500/10 to-purple-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_cf7e7a70-6993-4317-b043-226832f7051f.jpg",
      details: {
        fullDescription: "Make informed decisions with our expert solar consultation services. We provide detailed technical assessments, system design, and financial analysis to help you understand the complete picture before investing in solar energy.",
        benefits: [
          "Accurate energy production estimates",
          "Optimal system sizing",
          "Shade impact analysis",
          "Component recommendations",
          "Financial projections and ROI",
          "Subsidy eligibility assessment"
        ],
        process: [
          "Site visit and measurement",
          "Roof structure assessment",
          "3D shade analysis using software",
          "Energy consumption analysis",
          "System design and layout",
          "Detailed proposal with financials"
        ],
        pricing: "Free for installations | ₹5,000 for standalone consultation",
        timeline: "3-5 days for complete report"
      }
    },
    {
      id: 5,
      icon: <Leaf className="w-10 h-10 text-green-600" />,
      title: "Energy Efficiency Solutions",
      description: "Beyond solar, we help you optimize your overall energy consumption with smart auditing and energy-efficient upgrades.",
      features: ["Energy Audits", "Smart Metering", "LED Upgrades", "Voltage Stabilization"],
      gradient: "from-teal-500/10 to-teal-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_0942bf49-76f5-4650-8826-0bdb8c5887b3.jpg",
      details: {
        fullDescription: "Maximize your energy savings with our comprehensive efficiency solutions. We conduct detailed energy audits and implement cost-effective measures to reduce your overall consumption, making your solar investment even more effective.",
        benefits: [
          "Reduce energy waste by 20-30%",
          "Lower electricity bills immediately",
          "Improve power quality",
          "Extend equipment lifespan",
          "Detailed energy consumption insights",
          "Quick payback period"
        ],
        process: [
          "Comprehensive energy audit",
          "Load profiling and analysis",
          "Identify efficiency opportunities",
          "Recommend upgrades (LED, HVAC, etc.)",
          "Implementation of solutions",
          "Post-implementation monitoring"
        ],
        pricing: "Energy audit from ₹10,000 | Solutions priced separately",
        timeline: "Audit: 1-2 days | Implementation: Varies"
      }
    },
    {
      id: 6,
      icon: <Battery className="w-10 h-10 text-blue-600" />,
      title: "Solar Battery Storage",
      description: "Add battery backup to your solar system to use power during outages or during the night.",
      features: ["Lithium-Ion Technology", "Hybrid Inverter Support", "Power Continuity", "Off-grid Capabilities"],
      gradient: "from-indigo-500/10 to-indigo-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_2f9bb524-6239-4331-b2dc-e709c30f5df4.jpg",
      details: {
        fullDescription: "Achieve true energy independence with our solar battery storage solutions. Store excess solar energy during the day and use it at night or during power outages. Perfect for areas with unreliable grid supply or for those seeking complete energy autonomy.",
        benefits: [
          "24/7 power availability",
          "Protection from grid outages",
          "Use solar power at night",
          "Reduce grid dependency",
          "Peak shaving capabilities",
          "10-year battery warranty"
        ],
        process: [
          "Energy storage requirement analysis",
          "Battery capacity sizing",
          "Hybrid inverter selection",
          "Integration with existing solar",
          "Installation and commissioning",
          "Monitoring system setup"
        ],
        pricing: "From ₹80,000 for 5kWh | ₹1,50,000 for 10kWh",
        timeline: "3-5 days for installation"
      }
    }
  ];

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
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group flex flex-col h-full border-2 border-transparent hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-background relative overflow-hidden cursor-pointer`}
              onClick={() => setSelectedService(service.id)}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors"></div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-background rounded-2xl flex items-center justify-center shadow-lg">
                  {service.icon}
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
                  {service.features.map((feature, idx) => (
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
          ))}
        </div>

        {/* Service Detail Modal */}
        <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedService && (() => {
              const service = services.find(s => s.id === selectedService);
              if (!service) return null;
              
              return (
                <>
                  <DialogHeader>
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 -mt-6 -mx-6">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60`}></div>
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                        {service.icon}
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
                      <p className="text-muted-foreground leading-relaxed">{service.details.fullDescription}</p>
                    </div>

                    {/* Pricing & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <IndianRupee className="w-5 h-5 text-primary" />
                          <h5 className="font-bold text-sm text-muted-foreground">Pricing</h5>
                        </div>
                        <div className="text-lg font-bold text-primary">{service.details.pricing}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border-2 border-secondary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-secondary" />
                          <h5 className="font-bold text-sm text-muted-foreground">Timeline</h5>
                        </div>
                        <div className="text-lg font-bold text-secondary">{service.details.timeline}</div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent" />
                        Key Benefits
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.details.benefits.map((benefit, index) => (
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
                        {service.details.process.map((step, index) => (
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
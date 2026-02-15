import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home, Building2, Wrench, Layout, Leaf, Battery, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Home className="w-10 h-10 text-primary" />,
      title: "Residential Rooftop Solar",
      description: "Custom solar solutions for homes of all sizes in Jaipur. We handle everything from design to installation and grid connection.",
      features: ["Government Subsidy Support", "Net Metering Setup", "Space-efficient Designs", "25-Year Warranty"],
      gradient: "from-blue-500/10 to-blue-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_587726c7-e3e9-4906-a930-7577ba7599e2.jpg"
    },
    {
      icon: <Building2 className="w-10 h-10 text-secondary" />,
      title: "Commercial Solar Solutions",
      description: "Scale up your energy savings for warehouses, factories, schools, and hospitals with our high-capacity commercial solar systems.",
      features: ["Tax Benefits (Accelerated Depreciation)", "Low Maintenance", "High ROI", "Custom Financing Options"],
      gradient: "from-orange-500/10 to-orange-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_cdc700b3-8ad8-437e-9787-c551781838c2.jpg"
    },
    {
      icon: <Wrench className="w-10 h-10 text-accent" />,
      title: "Solar Panel Maintenance",
      description: "Ensure your solar system operates at peak efficiency with our professional cleaning and maintenance services.",
      features: ["Periodic Cleaning", "Electrical Health Checks", "Performance Monitoring", "Fault Troubleshooting"],
      gradient: "from-green-500/10 to-green-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_430596d7-733e-477f-b3de-339406be4620.jpg"
    },
    {
      icon: <Layout className="w-10 h-10 text-orange-500" />,
      title: "Solar System Design & Consultation",
      description: "Get a detailed technical layout and energy production estimation for your property before you invest.",
      features: ["3D Shade Analysis", "Optimal Angle Calculation", "Structural Integrity Check", "Component Selection"],
      gradient: "from-purple-500/10 to-purple-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_cf7e7a70-6993-4317-b043-226832f7051f.jpg"
    },
    {
      icon: <Leaf className="w-10 h-10 text-green-600" />,
      title: "Energy Efficiency Solutions",
      description: "Beyond solar, we help you optimize your overall energy consumption with smart auditing and energy-efficient upgrades.",
      features: ["Energy Audits", "Smart Metering", "LED Upgrades", "Voltage Stabilization"],
      gradient: "from-teal-500/10 to-teal-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_0942bf49-76f5-4650-8826-0bdb8c5887b3.jpg"
    },
    {
      icon: <Battery className="w-10 h-10 text-blue-600" />,
      title: "Solar Battery Storage",
      description: "Add battery backup to your solar system to use power during outages or during the night.",
      features: ["Lithium-Ion Technology", "Hybrid Inverter Support", "Power Continuity", "Off-grid Capabilities"],
      gradient: "from-indigo-500/10 to-indigo-500/5",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_2f9bb524-6239-4331-b2dc-e709c30f5df4.jpg"
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
              className={`group flex flex-col h-full border-2 border-transparent hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-background relative overflow-hidden`}
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
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
            </Card>
          ))}
        </div>

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
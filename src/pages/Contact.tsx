import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Phone, Mail, MapPin, Clock, CheckCircle2, ArrowRight, ArrowLeft, Home, Building2, Zap, Calendar, IndianRupee, Sparkles, User, Phone as PhoneIcon, Mail as MailIcon } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    systemSize: '',
    budget: '',
    timeline: '',
    roofType: '',
    message: ''
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to database
    import('@/db/api').then(({ contactQueriesAPI }) => {
      contactQueriesAPI.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        property_type: formData.propertyType,
        system_size: formData.systemSize,
        budget: formData.budget,
        timeline: formData.timeline,
        roof_type: formData.roofType,
        message: formData.message
      }).then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        toast.success("Quote request submitted successfully! We'll contact you within 24 hours.");
      }).catch((error: any) => {
        console.error('Failed to submit quote:', error);
        const errorMessage = error?.message || 'Failed to submit quote. Please try again.';
        setIsSubmitting(false);
        toast.error(errorMessage);
      });
    });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Free Consultation</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Get Your <span className="text-primary">Free Quote</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Tell us about your project and we'll provide a customized solar solution with accurate pricing
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-4 md:space-y-6">
              {/* Quick Contact Cards */}
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-4 md:p-6 space-y-4">
                  <h3 className="font-bold text-lg md:text-xl mb-4">Contact Information</h3>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base mb-1">Call Us</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        +91-7014235836<br />
                        +91-9928567308
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base mb-1">Email Us</h4>
                      <p className="text-xs md:text-sm text-muted-foreground break-all">
                        enterprisessethsawaliya@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base mb-1">Visit Us</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        Seth Sawalia Solar House,<br />
                        Opp. Central Park, Jaipur,<br />
                        Rajasthan, 302001
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base mb-1">Working Hours</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Mon - Sat: 9:00 AM - 7:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent hidden lg:block">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-xl mb-4">Why Choose Us?</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground">Free site inspection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground">24-hour response time</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground">Customized solutions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground">25-year warranty</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground">Expert installation team</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg hidden lg:block">
                <img 
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_9183e7da-72cd-402d-a25c-3b48a416e84c.jpg" 
                  alt="Seth Sawalia Solar Office" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Multi-Step Quote Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-2xl overflow-hidden">
                {/* Progress Bar */}
                <div className="bg-gradient-to-r from-primary via-secondary to-accent h-2"></div>
                
                <CardContent className="p-4 md:p-8">
                  {!submitted ? (
                    <>
                      {/* Step Indicator */}
                      <div className="mb-6 md:mb-8">
                        <div className="flex items-center justify-between mb-4">
                          {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center flex-1">
                              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all ${
                                step === currentStep 
                                  ? 'bg-primary text-primary-foreground scale-110' 
                                  : step < currentStep 
                                  ? 'bg-accent text-accent-foreground' 
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
                              </div>
                              {step < 3 && (
                                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                                  step < currentStep ? 'bg-accent' : 'bg-muted'
                                }`}></div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs md:text-sm">
                          <span className={currentStep === 1 ? 'text-primary font-bold' : 'text-muted-foreground'}>Personal Info</span>
                          <span className={currentStep === 2 ? 'text-primary font-bold' : 'text-muted-foreground'}>Project Details</span>
                          <span className={currentStep === 3 ? 'text-primary font-bold' : 'text-muted-foreground'}>Preferences</span>
                        </div>
                        <Progress value={progress} className="h-1 mt-3" />
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                          <div className="space-y-5 animate-in fade-in slide-in-from-right duration-300">
                            <div className="text-center mb-6">
                              <h3 className="text-xl md:text-2xl font-bold mb-2">Let's Get Started</h3>
                              <p className="text-sm text-muted-foreground">Tell us how to reach you</p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                Full Name *
                              </Label>
                              <Input 
                                id="name" 
                                placeholder="Enter your full name" 
                                value={formData.name}
                                onChange={(e) => updateFormData('name', e.target.value)}
                                className="h-11 md:h-12"
                                required 
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4 text-secondary" />
                                Phone Number *
                              </Label>
                              <Input 
                                id="phone" 
                                type="tel"
                                placeholder="+91 XXXXX XXXXX" 
                                value={formData.phone}
                                onChange={(e) => updateFormData('phone', e.target.value)}
                                className="h-11 md:h-12"
                                required 
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                                <MailIcon className="w-4 h-4 text-accent" />
                                Email Address *
                              </Label>
                              <Input 
                                id="email" 
                                type="email"
                                placeholder="your.email@example.com" 
                                value={formData.email}
                                onChange={(e) => updateFormData('email', e.target.value)}
                                className="h-11 md:h-12"
                                required 
                              />
                            </div>
                          </div>
                        )}

                        {/* Step 2: Project Details */}
                        {currentStep === 2 && (
                          <div className="space-y-5 animate-in fade-in slide-in-from-right duration-300">
                            <div className="text-center mb-6">
                              <h3 className="text-xl md:text-2xl font-bold mb-2">Project Details</h3>
                              <p className="text-sm text-muted-foreground">Help us understand your requirements</p>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-sm font-semibold">Property Type *</Label>
                              <div className="grid grid-cols-2 gap-3">
                                <button
                                  type="button"
                                  onClick={() => updateFormData('propertyType', 'residential')}
                                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                                    formData.propertyType === 'residential'
                                      ? 'border-primary bg-primary/10'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                >
                                  <Home className={`w-8 h-8 mx-auto mb-2 ${
                                    formData.propertyType === 'residential' ? 'text-primary' : 'text-muted-foreground'
                                  }`} />
                                  <div className="text-sm font-bold">Residential</div>
                                  <div className="text-xs text-muted-foreground">Home/Villa</div>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => updateFormData('propertyType', 'commercial')}
                                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                                    formData.propertyType === 'commercial'
                                      ? 'border-primary bg-primary/10'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                >
                                  <Building2 className={`w-8 h-8 mx-auto mb-2 ${
                                    formData.propertyType === 'commercial' ? 'text-primary' : 'text-muted-foreground'
                                  }`} />
                                  <div className="text-sm font-bold">Commercial</div>
                                  <div className="text-xs text-muted-foreground">Office/Factory</div>
                                </button>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-sm font-semibold">Desired System Size *</Label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                                {['1-2 kW', '3-5 kW', '5-10 kW', '10+ kW', 'Not Sure'].map((size) => (
                                  <button
                                    key={size}
                                    type="button"
                                    onClick={() => updateFormData('systemSize', size)}
                                    className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all hover:scale-105 ${
                                      formData.systemSize === size
                                        ? 'border-secondary bg-secondary/10 text-secondary'
                                        : 'border-border hover:border-secondary/50'
                                    }`}
                                  >
                                    <Zap className={`w-5 h-5 mx-auto mb-1 ${
                                      formData.systemSize === size ? 'text-secondary' : 'text-muted-foreground'
                                    }`} />
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-sm font-semibold">Roof Type</Label>
                              <div className="grid grid-cols-2 gap-3">
                                {['Flat Roof', 'Sloped Roof', 'Mixed', 'Not Sure'].map((roof) => (
                                  <button
                                    key={roof}
                                    type="button"
                                    onClick={() => updateFormData('roofType', roof)}
                                    className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                                      formData.roofType === roof
                                        ? 'border-accent bg-accent/10 text-accent'
                                        : 'border-border hover:border-accent/50'
                                    }`}
                                  >
                                    {roof}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Step 3: Preferences */}
                        {currentStep === 3 && (
                          <div className="space-y-5 animate-in fade-in slide-in-from-right duration-300">
                            <div className="text-center mb-6">
                              <h3 className="text-xl md:text-2xl font-bold mb-2">Final Details</h3>
                              <p className="text-sm text-muted-foreground">Almost done! Just a few more details</p>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-sm font-semibold flex items-center gap-2">
                                <IndianRupee className="w-4 h-4 text-primary" />
                                Budget Range *
                              </Label>
                              <div className="grid grid-cols-2 gap-3">
                                {['Under ₹1L', '₹1L - ₹2L', '₹2L - ₹5L', 'Above ₹5L'].map((budget) => (
                                  <button
                                    key={budget}
                                    type="button"
                                    onClick={() => updateFormData('budget', budget)}
                                    className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all hover:scale-105 ${
                                      formData.budget === budget
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                                  >
                                    {budget}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-sm font-semibold flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-secondary" />
                                Installation Timeline *
                              </Label>
                              <div className="grid grid-cols-2 gap-3">
                                {['Immediate', 'Within 1 Month', '1-3 Months', 'Just Exploring'].map((time) => (
                                  <button
                                    key={time}
                                    type="button"
                                    onClick={() => updateFormData('timeline', time)}
                                    className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all hover:scale-105 ${
                                      formData.timeline === time
                                        ? 'border-secondary bg-secondary/10 text-secondary'
                                        : 'border-border hover:border-secondary/50'
                                    }`}
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="message" className="text-sm font-semibold">Additional Information</Label>
                              <Textarea 
                                id="message" 
                                placeholder="Tell us anything else about your project..." 
                                rows={4} 
                                className="resize-none"
                                value={formData.message}
                                onChange={(e) => updateFormData('message', e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 pt-4">
                          {currentStep > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleBack}
                              className="flex-1 h-11 md:h-12"
                            >
                              <ArrowLeft className="w-4 h-4 mr-2" />
                              Back
                            </Button>
                          )}
                          
                          {currentStep < totalSteps ? (
                            <Button
                              type="button"
                              onClick={handleNext}
                              className="flex-1 h-11 md:h-12"
                            >
                              Next
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              className="flex-1 h-11 md:h-12"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
                              <CheckCircle2 className="w-4 h-4 ml-2" />
                            </Button>
                          )}
                        </div>

                        <p className="text-center text-xs text-muted-foreground pt-2">
                          By submitting, you agree to our privacy policy and consent to being contacted.
                        </p>
                      </form>
                    </>
                  ) : (
                    <div className="py-12 md:py-20 text-center space-y-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500">
                        <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-accent" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black">Thank You!</h2>
                      <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
                        Your quote request has been received. Our solar expert will contact you within 24 hours to discuss your customized solution.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Button variant="outline" onClick={() => { setSubmitted(false); setCurrentStep(1); }}>
                          Submit Another Request
                        </Button>
                        <Button asChild>
                          <a href="/">Return to Homepage</a>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

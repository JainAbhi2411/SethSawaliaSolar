import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Message sent successfully!");
    }, 1500);
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-12">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
                <p className="text-muted-foreground">
                  Ready to start your solar journey? Have questions? Reach out to us.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Visit Our Office</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Seth Sawalia Solar House, <br />
                      Opp. Central Park, Jaipur, <br />
                      Rajasthan, 302001
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-muted-foreground text-sm">
                      Main: +91-7014235836 <br />
                      Support: +91-9928567308
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <p className="text-muted-foreground text-sm">
                      enterprisessethsawaliya@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Working Hours</h4>
                    <p className="text-muted-foreground text-sm">
                      Mon - Sat: 9:00 AM - 7:00 PM <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video rounded-2xl overflow-hidden bg-muted border flex items-center justify-center text-muted-foreground text-sm relative">
                <div className="absolute inset-0 z-0">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    style={{border:0}} 
                    referrerPolicy="no-referrer-when-downgrade" 
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB_LJOYJL-84SMuxNB7LtRGhxEQLjswvy0&q=Jaipur,Rajasthan&language=en&region=cn" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Office Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_9183e7da-72cd-402d-a25c-3b48a416e84c.jpg" 
                  alt="Seth Sawalia Solar Office Building" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <Card className="border-none shadow-2xl overflow-hidden">
                <div className="bg-primary h-2 w-full"></div>
                <CardContent className="p-8 md:p-12">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter your name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="Enter your mobile number" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="name@example.com" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interest">What are you interested in?</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential Solar</SelectItem>
                            <SelectItem value="commercial">Commercial Solar</SelectItem>
                            <SelectItem value="maintenance">Panel Maintenance</SelectItem>
                            <SelectItem value="consultation">Free Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">How can we help you?</Label>
                        <Textarea id="message" placeholder="Tell us about your requirements..." rows={5} className="resize-none" />
                      </div>

                      <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Submit Inquiry"}
                      </Button>
                      
                      <p className="text-center text-xs text-muted-foreground pt-4">
                        By submitting this form, you agree to our privacy policy and consent to being contacted regarding solar energy solutions.
                      </p>
                    </form>
                  ) : (
                    <div className="py-20 text-center space-y-6">
                      <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-accent" />
                      </div>
                      <h2 className="text-3xl font-bold">Thank You!</h2>
                      <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                        Your inquiry has been received. Our solar expert will call you within 24 hours to discuss your requirements.
                      </p>
                      <Button variant="outline" onClick={() => setSubmitted(false)}>Send another message</Button>
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
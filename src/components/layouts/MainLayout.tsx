import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Chatbot from '@/components/Chatbot';
import { 
  Menu, 
  Sun, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  LogOut, 
  LogIn, 
  ArrowRight 
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'About Us', path: '/about' },
  { name: 'Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Top Header with contact info - Enhanced Responsive */}
      <div className="bg-primary text-primary-foreground py-2 md:py-3">
        <div className="container mx-auto px-4">
          {/* Mobile: Stacked layout */}
          <div className="flex flex-col md:hidden space-y-2 text-xs">
            <div className="flex items-center justify-center">
              <Phone className="w-3 h-3 mr-1" /> 
              <a href="tel:+917014235836" className="hover:underline">+91-7014235836</a>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="w-3 h-3 mr-1" /> 
              <a href="mailto:enterprisessethsawaliya@gmail.com" className="hover:underline truncate max-w-[200px]">
                enterprisessethsawaliya@gmail.com
              </a>
            </div>
          </div>
          
          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center space-x-4 lg:space-x-6 text-sm">
              <a href="tel:+917014235836" className="flex items-center hover:text-secondary transition-colors">
                <Phone className="w-4 h-4 mr-2" /> +91-7014235836
              </a>
              <a href="mailto:enterprisessethsawaliya@gmail.com" className="flex items-center hover:text-secondary transition-colors">
                <Mail className="w-4 h-4 mr-2" /> enterprisessethsawaliya@gmail.com
              </a>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> Rajasthan
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="secondary" size="sm" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Enhanced Responsive */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <Sun className="text-background w-5 h-5 md:w-7 md:h-7" />
            </div>
            <span className="font-black text-lg md:text-2xl tracking-tight">
              Seth Sawaliya <span className="text-secondary hidden sm:inline">Enterprises</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  location.pathname === item.path 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Admin Link - Only visible to admins */}
            {profile?.role === 'admin' && (
              <Link
                to="/admin"
                className="px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden xl:inline">Admin</span>
              </Link>
            )}
            
            {/* Login/Logout */}
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="ml-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden xl:inline">Logout</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="ml-2"
              >
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  <span className="hidden xl:inline">Login</span>
                </Link>
              </Button>
            )}
          </nav>

          {/* Mobile Nav */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile CTA Button */}
            <Button variant="secondary" size="sm" asChild className="text-xs md:hidden">
              <Link to="/contact">Quote</Link>
            </Button>
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-lg transition-colors hover:text-secondary ${
                        location.pathname === item.path ? 'text-secondary font-bold' : 'text-foreground/60'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Admin Link for mobile */}
                  {profile?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg transition-colors text-accent font-bold flex items-center gap-2"
                    >
                      <Shield className="w-5 h-5" />
                      Admin Panel
                    </Link>
                  )}
                  
                  <div className="pt-4 border-t space-y-3">
                    <Button variant="secondary" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/contact">Get a Quote</Link>
                    </Button>
                    
                    {user ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link to="/login">
                          <LogIn className="w-4 h-4 mr-2" />
                          Login
                        </Link>
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - Enhanced and Fully Functional */}
      <footer className="bg-foreground text-background py-12 md:py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Company Info */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Sun className="text-background w-5 h-5 md:w-7 md:h-7" />
                </div>
                <span className="font-black text-xl md:text-2xl">
                  Seth Sawaliya <span className="text-secondary">Solar</span>
                </span>
              </div>
              <p className="text-sm text-background/80 leading-relaxed">
                Leading provider of sustainable solar energy solutions in Jaipur. We specialize in residential, commercial, and maintenance services.
              </p>
              
              {/* Social Media Links */}
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-xl"
                  aria-label="Facebook"
                >
                  📘
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-xl"
                  aria-label="Twitter"
                >
                  🐦
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-xl"
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-xl"
                  aria-label="LinkedIn"
                >
                  💼
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4 md:mb-6 text-secondary">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3 text-sm text-background/80">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className="hover:text-secondary transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                      {item.name}
                    </Link>
                  </li>
                ))}
                {profile?.role === 'admin' && (
                  <li>
                    <Link 
                      to="/admin" 
                      className="hover:text-secondary transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                      Admin Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-4 md:mb-6 text-secondary">Services</h4>
              <ul className="space-y-2 md:space-y-3 text-sm text-background/80">
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors">
                    Residential Rooftop
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors">
                    Commercial Solar
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors">
                    Panel Maintenance
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors">
                    System Design
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors">
                    Energy Consultation
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors">
                    Battery Storage
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-4 md:mb-6 text-secondary">Contact Info</h4>
              <ul className="space-y-3 md:space-y-4 text-sm text-background/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 shrink-0 text-secondary" /> 
                  <a 
                    href="https://maps.google.com/?q=Jaipur,Rajasthan,India" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors"
                  >
                    Jaipur, Rajasthan, India
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-secondary" /> 
                  <a 
                    href="tel:+917014235836" 
                    className="hover:text-secondary transition-colors"
                  >
                    +91-7014235836
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-secondary" /> 
                  <a 
                    href="tel:+919928566308" 
                    className="hover:text-secondary transition-colors"
                  >
                    +91-9928566308
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 shrink-0 text-secondary" /> 
                  <a 
                    href="mailto:enterprisessethsawaliya@gmail.com" 
                    className="hover:text-secondary transition-colors break-all"
                  >
                    enterprisessethsawaliya@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="pt-6 md:pt-8 border-t border-background/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
              <p className="text-center md:text-left">
                © 2026 Seth sawaliya Enterprises. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <Link to="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="hover:text-secondary transition-colors">
                  Contact
                </Link>
                <Link to="/resources" className="hover:text-secondary transition-colors">
                  Resources
                </Link>
                <a 
                  href="https://supabase.com/dashboard/project/aiewsoqlfaobrcqtdezd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default MainLayout;

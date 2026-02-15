import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
      {/* Top Header with contact info */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-6 text-sm">
            <span className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91-7014235836</span>
            <span className="flex items-center"><Mail className="w-4 h-4 mr-2" /> enterprisessethsawaliya@gmail.com</span>
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Jaipur, Rajasthan</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm" asChild>
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation - Enhanced */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <Sun className="text-background w-7 h-7" />
            </div>
            <span className="font-black text-2xl tracking-tight hidden md:inline-block">
              Seth Sawalia <span className="text-secondary">Solar</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
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
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Admin
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
                Logout
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
                  Login
                </Link>
              </Button>
            )}
          </nav>

          {/* Mobile Nav */}
          <div className="flex items-center md:hidden">
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
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

      {/* Footer - Enhanced */}
      <footer className="bg-foreground text-background py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Sun className="text-background w-7 h-7" />
                </div>
                <span className="font-black text-2xl">
                  Seth Sawalia <span className="text-secondary">Solar</span>
                </span>
              </div>
              <p className="text-sm text-background/80 leading-relaxed">
                Leading provider of sustainable solar energy solutions in Jaipur. We specialize in residential, commercial, and maintenance services.
              </p>
              <div className="flex gap-3">
                {['📘', '🐦', '📷', '💼'].map((emoji, i) => (
                  <button 
                    key={i}
                    className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-xl"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-secondary">Quick Links</h4>
              <ul className="space-y-3 text-sm text-background/80">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="hover:text-secondary transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-secondary">Services</h4>
              <ul className="space-y-3 text-sm text-background/80">
                <li className="hover:text-secondary transition-colors cursor-pointer">Residential Rooftop</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Commercial Solar</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Panel Maintenance</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">System Design</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">Energy Consultation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-secondary">Contact Info</h4>
              <ul className="space-y-4 text-sm text-background/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 shrink-0 text-secondary" /> 
                  <span>Jaipur, Rajasthan, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-secondary" /> 
                  <span>+91-7014235836</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-secondary" /> 
                  <span>+91-9928567308</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0 text-secondary" /> 
                  <span className="break-all">enterprisessethsawaliya@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-background/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
              <p>© 2026 Seth Sawalia Solar Company. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-secondary transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
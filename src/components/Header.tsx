import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, MessageCircle, Leaf, Sun, Moon } from 'lucide-react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'About', href: '/about', icon: null },
    { name: 'Services', href: '/services', icon: null },
    { name: 'Resources', href: '/resources', icon: null },
    { name: 'Contact', href: '/contact', icon: null },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg'
        : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
      }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 lg:h-18 items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-lime-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
              </div>
              <div className="relative w-full h-full flex items-center justify-center">
                <Sprout className="h-5 w-5 lg:h-6 lg:w-6 text-white drop-shadow-sm" />
                <Leaf className="absolute -top-1 -right-1 h-3 w-3 text-white/80 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                AgriNova
              </h1>
              <p className="text-xs lg:text-sm text-muted-foreground font-medium">
                Smart Farming Solutions
              </p>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-muted/50 group ${isActive(item.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Enhanced CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0 hover:bg-muted/50"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </Button>
            <Button
              size="sm"
              asChild
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link to="/chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Start Chat
              </Link>
            </Button>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-background/95 backdrop-blur-md">
                <div className="flex flex-col gap-6 mt-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-3 pb-6 border-b border-border">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-lime-500 rounded-xl shadow-lg">
                        <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                      </div>
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Sprout className="h-6 w-6 text-white drop-shadow-sm" />
                        <Leaf className="absolute -top-1 -right-1 h-3 w-3 text-white/80" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        AgriNova
                      </h2>
                      <p className="text-sm text-muted-foreground">Smart Farming Solutions</p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${isActive(item.href)
                            ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 dark:from-emerald-950 dark:to-green-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : 'text-foreground hover:text-primary'
                          }`}
                      >
                        <div className="font-medium">{item.name}</div>
                        {isActive(item.href) && (
                          <div className="ml-auto w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                        )}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/chat" className="flex items-center gap-2 justify-center">
                        <MessageCircle className="h-4 w-4" />
                        Start Chat
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
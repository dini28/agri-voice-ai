import { Sprout, Leaf, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Services', href: '/services' },
        { name: 'Resources', href: '/resources' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Crop Guidance', href: '/services#crops' },
        { name: 'Pest Control', href: '/services#pest' },
        { name: 'Soil Health', href: '/services#soil' },
        { name: 'Government Schemes', href: '/services#schemes' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Farming Tips', href: '/resources#tips' },
        { name: 'Weather Updates', href: '/resources#weather' },
        { name: 'Market Prices', href: '/resources#prices' },
        { name: 'Training Videos', href: '/resources#videos' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', hoverColor: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', hoverColor: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', hoverColor: 'hover:text-pink-500' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', hoverColor: 'hover:text-red-500' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group"
            >
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted agricultural assistant. Get complete information about crops, soil, pests, and government schemes using advanced AI technology.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {socialLinks.map(({ name, icon: Icon, href, hoverColor }) => (
                <Button
                  key={name}
                  variant="ghost"
                  size="sm"
                  className={`${hoverColor} transition-colors p-2`}
                  onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
                  aria-label={`Visit our ${name} page`}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {footerSections.map(({ title, links }) => (
            <div key={title} className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-foreground text-base sm:text-lg">{title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map(({ name, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-6 sm:my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} AgriNova. All rights reserved.
          </div>

          {/* Footer Navigation */}
          <nav className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            {legalLinks.map(({ name, href }) => (
              <Link
                key={name}
                to={href}
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors text-center whitespace-nowrap"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
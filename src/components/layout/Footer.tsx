import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Quick Links": [
      { label: "Home", href: "/" },
      { label: "Restaurants", href: "/#restaurants" },
      { label: "Track Order", href: "/order-status" },
    ],
    "Support": [
      { label: "About Us", href: "/#" },
      { label: "Contact Support", href: "/#" },
      { label: "FAQ", href: "/#" },
    ],
    "Legal": [
        { label: "Terms of Service", href: "/#" },
        { label: "Privacy Policy", href: "/#" },
    ]
  };

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span>FlavorFlow</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your favorite local restaurants, delivered to your door.
            </p>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
             <div key={title} className="space-y-4">
                <h4 className="font-semibold text-sm tracking-wide uppercase">{title}</h4>
                <nav className="flex flex-col space-y-2">
                    {links.map((link) => (
                        <Link key={link.label} to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
                &copy; {currentYear} FlavorFlow Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                    </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                    </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </Button>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Ship, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              <Ship className="w-8 h-8 text-[oklch(0.70_0.15_200)]" />
              <span className="text-2xl font-bold text-[oklch(0.25_0.05_240)]">Explore Hull</span>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/explore"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Explore</a></Link>
            <Link href="/events"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Events</a></Link>
            <Link href="/eat-drink"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Eat & Drink</a></Link>
            <Link href="/stay"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Stay</a></Link>
            <Link href="/blog"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Blog</a></Link>
            <Link href="/partner"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Partner</a></Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:flex bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)] text-white">
              <Link href="/travel-info"><a>Plan Your Visit</a></Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <Link href="/explore">
                <a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Explore
                </a>
              </Link>
              <Link href="/events">
                <a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Events
                </a>
              </Link>
              <Link href="/eat-drink">
                <a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Eat & Drink
                </a>
              </Link>
              <Link href="/stay">
                <a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Stay
                </a>
              </Link>
              <Link href="/blog">
                <a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Blog
                </a>
              </Link>
              <Link href="/partner">
                <a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Partner
                </a>
              </Link>
              <Button asChild className="bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)] text-white w-full">
                <Link href="/travel-info"><a onClick={() => setMobileMenuOpen(false)}>Plan Your Visit</a></Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

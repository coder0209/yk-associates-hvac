'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Wind, ArrowRight } from 'lucide-react';
import { COMPANY_NAME, DEFAULT_CONTACT } from '@/lib/config';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'SERVICES', href: '/services' },
  { name: 'SOLUTIONS', href: '/solutions' },
  { name: 'INDUSTRIES', href: '/industries' },
  { name: 'PROJECTS', href: '/projects' },
  { name: 'BRANDS', href: '/brands' },
  { name: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-card/90 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-12 overflow-hidden rounded border border-border bg-white flex items-center justify-center p-1 transition-transform group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="YK Associates Logo"
                width={48}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {COMPANY_NAME}
              </span>
              <span className="text-[10px] tracking-wider text-muted-foreground uppercase -mt-1 font-semibold">
                we create, your comfort
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-primary',
                    isActive ? 'text-primary' : 'text-foreground/80'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${DEFAULT_CONTACT.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-secondary transition-colors"
            >
              <Phone className="h-4 w-4 text-secondary" />
              <span>Call</span>
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded shadow-sm transition-all hover:translate-y-[-1px] active:translate-y-0"
            >
              GET A QUOTE
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded"
            >
              GET QUOTE
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-foreground focus:outline-none p-1.5 rounded hover:bg-muted"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 bg-card border-b border-border shadow-lg transition-all duration-300 ease-in-out z-40 overflow-hidden',
          isOpen ? 'top-[65px] opacity-100 max-h-[calc(100vh-65px)]' : 'top-[-400px] opacity-0 max-h-0'
        )}
      >
        <div className="px-4 pt-3 pb-6 space-y-2 bg-card">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-3 py-2.5 rounded-md text-base font-semibold tracking-wide transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/80 hover:bg-muted hover:text-primary'
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-border flex flex-col gap-3 px-3">
            <a
              href={`tel:${DEFAULT_CONTACT.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-md border border-border text-foreground font-semibold hover:bg-muted text-center"
            >
              <Phone className="h-4 w-4 text-secondary" />
              Call Support
            </a>
            <Link
              href="/quote"
              className="flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary text-white font-bold hover:bg-primary-hover shadow text-center"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

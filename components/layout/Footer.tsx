'use strict';

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, MessageSquare, Linkedin, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { COMPANY_NAME, DEFAULT_CONTACT, SERVICE_AREAS, SOCIAL_LINKS } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-12 overflow-hidden rounded bg-white flex items-center justify-center p-1">
                <Image
                  src="/logo.jpg"
                  alt="YK Associates Logo"
                  width={48}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                  {COMPANY_NAME}
                </span>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase -mt-1 font-semibold">
                  we create, your comfort
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              Professional HVAC design, system planning, supply, installation, ducting and commissioning solutions. Engineered for premium reliability and energy efficiency.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-slate-800 hover:bg-primary hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {SOCIAL_LINKS.facebook && (
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-slate-800 hover:bg-secondary hover:text-white transition-colors"
                  aria-label="Facebook Page"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-slate-800 hover:bg-pink-600 hover:text-white transition-colors"
                  aria-label="Instagram Account"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  About YK Associates
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  Our HVAC Services
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  HVAC System Solutions
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  Completed Projects
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  HVAC Brands & Systems
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Service Regions</h3>
            <p className="text-sm text-slate-400 mb-3">Providing professional contracting across:</p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Contact Details</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-normal">{DEFAULT_CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <a href={`tel:${DEFAULT_CONTACT.phone}`} className="hover:text-secondary transition-colors">
                  {DEFAULT_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <a href={`mailto:${DEFAULT_CONTACT.email}`} className="hover:text-secondary transition-colors break-all">
                  {DEFAULT_CONTACT.email}
                </a>
              </li>
            </ul>
            {/* Google Map Link */}
            <div className="pt-2">
              <a
                href={DEFAULT_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:text-white bg-slate-800 hover:bg-secondary px-3 py-1.5 rounded transition-all"
              >
                <span>Google Maps Location</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-slate-950 border-t border-slate-800/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} {COMPANY_NAME}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Disclaimers
            </Link>
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Admin CMS Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

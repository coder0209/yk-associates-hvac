import React from 'react';
import ContactForm from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { DEFAULT_CONTACT, BUSINESS_HOURS, SERVICE_AREAS } from '@/lib/config';

export const metadata = {
  title: 'Contact YK Associates | HVAC Contracting Hyderabad',
  description: 'Reach out to YK Associates for HVAC load planning, duct execution, central air commissioning, and system maintenance solutions. Contact phone, address, and enquiries.',
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            Connect
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact Our Engineering Office
          </h1>
          <p className="text-base sm:text-lg text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Reach out to discuss HVAC load plans, sheet metal ducting layouts, chiller installations, or AMC AMC options.
          </p>
        </div>
      </section>

      {/* CONTACT INFO & FORM GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Card Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Get In Touch</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Have an active commercial or building development layout ready? Reach out to get a custom engineering consultation.
              </p>
            </div>

            {/* List */}
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Office Address</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">{DEFAULT_CONTACT.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Phone Support</h4>
                  <a href={`tel:${DEFAULT_CONTACT.phone}`} className="text-xs text-secondary hover:underline block mt-1">
                    {DEFAULT_CONTACT.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Email Correspondence</h4>
                  <a href={`mailto:${DEFAULT_CONTACT.email}`} className="text-xs text-secondary hover:underline block mt-1">
                    {DEFAULT_CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Business Hours</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monday - Friday: {BUSINESS_HOURS.mon_fri} <br />
                    Saturday: {BUSINESS_HOURS.sat} <br />
                    Sunday: {BUSINESS_HOURS.sun}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* MAP EMBED placeholder */}
      <section className="h-[400px] w-full bg-slate-100 border-t border-border relative">
        {/* Render a map layout placeholder */}
        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-4">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
          <MapPin className="h-10 w-10 text-primary mb-2" />
          <span className="text-white font-bold text-sm tracking-wide">YK Associates Location Map</span>
          <span className="text-slate-400 text-xs mt-1">Plot No. 45, Phase III, Industrial Area, Hyderabad</span>
          <a
            href={DEFAULT_CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded transition-colors inline-flex items-center gap-1.5"
          >
            <span>Open in Google Maps</span>
          </a>
        </div>
      </section>
    </div>
  );
}

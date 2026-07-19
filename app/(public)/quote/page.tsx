import React from 'react';
import QuoteForm from '@/components/forms/QuoteForm';
import { Phone, MessageSquare, ShieldAlert } from 'lucide-react';
import { DEFAULT_CONTACT } from '@/lib/config';

export const metadata = {
  title: 'Request an HVAC Quote | YK Associates',
  description: 'Submit your building floor plans, area dimensions, and design requirements to get a custom engineering proposal and cost estimate.',
};

export default function RequestQuotePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            Estimation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Request an HVAC Quote
          </h1>
          <p className="text-base sm:text-lg text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Provide your building layouts or drawings, and our engineering coordinators will draft initial load parameters and layout cost options.
          </p>
        </div>
      </section>

      {/* FORM WRAPPER */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>

      {/* CONTACT HELPER FOOTNOTES */}
      <section className="py-12 bg-muted border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-foreground flex items-center justify-center md:justify-start gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>Direct Phone Support</span>
            </h4>
            <p className="text-xs text-muted-foreground leading-normal">
              Rather discuss requirements over a call? Connect with our Hyderabad estimation office at: <br />
              <a href={`tel:${DEFAULT_CONTACT.phone}`} className="font-bold text-secondary">{DEFAULT_CONTACT.phone}</a>
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-foreground flex items-center justify-center md:justify-start gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-primary" />
              <span>Document Confidentiality</span>
            </h4>
            <p className="text-xs text-muted-foreground leading-normal">
              We respect your IP. All uploaded structural drawings, False ceiling sections, or layout sketches are strictly protected and viewed only for drafting quotation details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

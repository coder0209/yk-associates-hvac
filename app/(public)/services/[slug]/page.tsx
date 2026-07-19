import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/data';
import { ArrowRight, CheckCircle2, ClipboardList, HelpCircle } from 'lucide-react';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Pre-seed some default content sections if missing from dynamic CMS values
  const processSteps = service.process || [
    'Initial Consultation & Drawings Review',
    'Heat Load Calculations & System Sizing',
    'Equipment Selection & Sourcing Coordination',
    'Execution Planning & Onsite Contracting',
    'Testing, Balancing & Handover Sign-off',
  ];

  const typicalApps = service.applications || [
    'Commercial Offices & Tech Parks',
    'Convention Centers & Banquet Halls',
    'Hotels & Hospitality Spaces',
    'Industrial & Warehouse Facilities',
  ];

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Link
            href="/services"
            className="text-xs font-semibold text-primary hover:text-white transition-colors"
          >
            &larr; BACK TO SERVICES
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {service.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-350 max-w-3xl leading-relaxed">
            {service.short_description}
          </p>
        </div>
      </section>

      {/* SERVICE OVERVIEW */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">Service Overview</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {service.full_description}
              </p>
            </div>

            {/* Steps / Process */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="text-xl font-bold text-foreground">Our Execution Process</h3>
              <div className="relative border-l border-border pl-6 space-y-6 mt-4">
                {processSteps.map((step: string, idx: number) => (
                  <div key={idx} className="relative">
                    {/* Circle Bullet */}
                    <div className="absolute -left-[31px] top-0 h-4.5 w-4.5 rounded-full bg-primary border-4 border-background" />
                    <h4 className="text-sm font-bold text-foreground">{step}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Applications */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-border p-6 rounded bg-card">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-secondary" />
                <span>Typical Applications</span>
              </h3>
              <ul className="space-y-3">
                {typicalApps.map((app: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Contact Box */}
            <div className="border border-primary/20 p-6 rounded bg-primary/5 space-y-4">
              <h4 className="font-bold text-foreground text-sm">Need a Custom Layout?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect directly with our HVAC engineers to schedule a drawings review or site visit estimate.
              </p>
              <Link
                href="/quote"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
              >
                <span>Request Quotation</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS/FAQ */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold text-foreground text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-card p-5 border border-border rounded">
              <h4 className="font-bold text-sm text-foreground mb-1.5 flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>How is the initial load analysis calculated?</span>
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed pl-6.5">
                We collect architectural floor layouts, window orientation profiles, false ceiling depths, and target usage details to run precise hourly heat calculations matching Indian meteorological conditions.
              </p>
            </div>
            <div className="bg-card p-5 border border-border rounded">
              <h4 className="font-bold text-sm text-foreground mb-1.5 flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>Do you perform installation testing reports?</span>
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed pl-6.5">
                Yes, every refrigeration piping line is pressure-flushed with dry nitrogen gas at 400-550 PSI for 24-48 hours. Duct networks undergo leakage verification and CFM balancing before handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-slate-900 text-white text-center space-y-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl tracking-tight">Planning an HVAC contracting project?</h2>
        <p className="text-sm text-slate-350 max-w-xl mx-auto leading-relaxed">
          Provide your floor layout drawings or project specifications and our HVAC contracting division will verify requirements.
        </p>
        <div className="pt-2">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded shadow"
          >
            REQUEST CONSULTATION ESTIMATE
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

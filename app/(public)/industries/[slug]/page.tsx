import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIndustryBySlug } from '@/lib/data';
import { ArrowRight, HelpCircle, ShieldCheck, Cpu } from 'lucide-react';

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Link
            href="/industries"
            className="text-xs font-semibold text-primary hover:text-white transition-colors"
          >
            &larr; BACK TO INDUSTRIES
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {industry.name} HVAC Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-350 max-w-3xl leading-relaxed">
            {industry.description}
          </p>
        </div>
      </section>

      {/* CORE CONTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Understanding Sector Layout Demands</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At YK Associates, we understand that designing for a convention space with sudden high-occupancy sensible heat is completely different from designing zone-controlled VRFs for corporate partition layout environments.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                We study building structural factors, partition layouts, target indoor air quality (IAQ) demands, and exhaust air changes before selecting systems or routing sheet metal duct lines.
              </p>
            </div>

            {/* Challenges */}
            {industry.challenges && industry.challenges.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground">Common HVAC Challenges Solved</h3>
                <div className="grid grid-cols-1 gap-4">
                  {industry.challenges.map((challenge: string, idx: number) => (
                    <div key={idx} className="flex gap-3 border border-border p-4 rounded bg-card">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-foreground mb-1">Challenge Checkpoint</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{challenge}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Action Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-secondary/20 p-6 rounded bg-secondary/5 space-y-4">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Cpu className="h-5 w-5 text-secondary" />
                <span>Sector HVAC Estimate</span>
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect with our engineers to schedule a drawings review or site visit validation.
              </p>
              <Link
                href="/quote"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
              >
                <span>Request Consultation</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white text-center space-y-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl tracking-tight">Need HVAC planning for a {industry.name.toLowerCase()}?</h2>
        <p className="text-sm text-slate-350 max-w-xl mx-auto leading-relaxed">
          Provide your structural design files or layouts. Our mechanical engineers will analyze your specific air-handling needs.
        </p>
        <div className="pt-2">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded shadow"
          >
            GET A CUSTOM QUOTE
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

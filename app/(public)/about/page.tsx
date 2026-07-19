import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMetrics } from '@/lib/data';
import { COMPANY_NAME, DEFAULT_CONTACT } from '@/lib/config';
import { ArrowRight, CheckCircle2, ShieldCheck, Ruler, Users, Cpu } from 'lucide-react';

export default async function AboutPage() {
  const metrics = await getMetrics();

  return (
    <div className="bg-background">
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            Engineering Comfort
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About YK Associates
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A premium HVAC design, planning, procurement, and execution contracting firm serving commercial and industrial developments.
          </p>
        </div>
      </section>

      {/* COMPANY STORY / WHO WE ARE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-secondary uppercase">Our Journey</span>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
                Technical Expertise in Air Management
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                YK Associates was established to bridge the gap between complex architectural designs and real-world HVAC execution. Over the years, we have built a reputation for installing high-performance VRF/VRV, chilled water systems, and ventilation schemes.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our approach is rooted in solid mechanical engineering. Every site undergoes structural load calculations, duct friction loss analysis, and coordinate drawing reviews. This ensures that the systems we install run at optimized coefficient of performance (COP) metrics, reducing power consumption while keeping occupants comfortable.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-border p-6 rounded bg-card hover:border-primary/20 transition-all">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-base font-bold text-foreground mb-2">Qualified Engineers</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">All layout planning, system sizing, and validation runs are monitored directly by qualified mechanical professionals.</p>
              </div>
              <div className="border border-border p-6 rounded bg-card hover:border-primary/20 transition-all">
                <Cpu className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-base font-bold text-foreground mb-2">Advanced Infrastructure</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Utilizing computer-aided design (CAD) layouts, advanced load models, and modern commissioning kits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 p-6 bg-card border border-border rounded">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">Our Mission</span>
              <h3 className="text-xl font-bold text-foreground">Designing for Dynamic Load Demands</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To design and execute reliable heating, ventilation, and air-conditioning systems tailored to structural parameters, ensuring high power efficiency, consistent air balancing, and absolute client satisfaction.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-card border border-border rounded">
              <span className="text-xs font-bold tracking-widest text-secondary uppercase">Our Vision</span>
              <h3 className="text-xl font-bold text-foreground">Setting Engineering Baselines</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To be the preferred HVAC engineering and contracting partner in South India, recognized for solving complex space/acoustic cooling problems, executing neat piping networks, and maintaining high engineering values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGINEERING & EXECUTION APPROACH */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Our Core Standards</span>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl mt-3">
              The YK Associates Execution Model
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              We maintain strict quality control steps across every project segment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-base font-bold text-foreground">Rigorous Heat Calculations</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We calculate actual thermal loads considering glass areas, occupancy density, orientation, equipment power ratings, and fresh air requirement calculations before suggesting systems.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="text-base font-bold text-foreground">Neat Structural Coordination</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Piping supports, insulated sheet metal routing, VRF branch selectors, and cabling runs are drawn in detail to avoid clashes with electrical trays, false ceilings, or water lines.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="text-base font-bold text-foreground">Rigid Final Commissioning</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every line undergoes structural pressure leak checks using dry nitrogen gas. Systems are balanced with calibrated anemometers to verify target fresh air CFM distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      {metrics.length > 0 && (
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {metrics.map((metric) => (
                <div key={metric.id} className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-black text-primary tracking-tight">{metric.value}</div>
                  <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Work With a Professional HVAC Team
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Need a detailed HVAC mechanical layout or quotation estimate for your commercial, office, or hospitality project? Reach out to our engineering office.
          </p>
          <div className="pt-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded shadow transition-transform active:scale-98"
            >
              REQUEST A CONSULTATION
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

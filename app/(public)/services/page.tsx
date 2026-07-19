import React from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/data';
import { Ruler, Package, Hammer, CheckSquare, ArrowRight, Wind, Thermometer, ShieldCheck } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  DraftingCompass: Ruler,
  Package: Package,
  Hammer: Hammer,
  Gauge: CheckSquare,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            Our Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            HVAC Engineering & Contracting Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Professional contracting solutions from initial heat load analysis to duct execution and testing checks.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon_name] || Ruler;
              return (
                <div
                  key={service.id}
                  className="bg-card border border-border p-8 rounded flex flex-col justify-between hover:shadow-sm hover:border-primary/20 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded bg-primary/5 border border-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground tracking-wide group-hover:text-primary transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.short_description}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-border/60">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-secondary uppercase hover:text-primary transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACCREDITATION & VALUE SECTION */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <ShieldCheck className="h-10 w-10 text-secondary shrink-0" />
            <div>
              <h3 className="font-bold text-base text-foreground mb-1">Standard Specifications</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">We strictly implement SMACNA ducting standards and ASHRAE testing requirements for premium operations.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Wind className="h-10 w-10 text-secondary shrink-0" />
            <div>
              <h3 className="font-bold text-base text-foreground mb-1">Optimal Air Balance</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Utilizing advanced water balancing kits and air CFM balancing to guarantee comfortable zones.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Thermometer className="h-10 w-10 text-secondary shrink-0" />
            <div>
              <h3 className="font-bold text-base text-foreground mb-1">Efficiency Calibration</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Selecting refrigeration configurations designed to run with lower power consumption across loads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white text-center space-y-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl tracking-tight">Need a Contracting Estimate?</h2>
        <p className="text-sm text-slate-350 max-w-xl mx-auto leading-relaxed">
          Provide your structural layout drawings or project briefs. Our engineering office will analyze your requirements.
        </p>
        <div className="pt-2">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded shadow"
          >
            REQUEST A QUOTE
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

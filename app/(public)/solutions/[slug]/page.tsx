import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSolutionBySlug } from '@/lib/data';
import { ArrowRight, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Link
            href="/solutions"
            className="text-xs font-semibold text-primary hover:text-white transition-colors"
          >
            &larr; BACK TO SOLUTIONS
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {solution.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-350 max-w-3xl leading-relaxed">
            {solution.description}
          </p>
        </div>
      </section>

      {/* DETAILED CONTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Core System Overview</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                YK Associates specializes in the layout sizing and field installation of {solution.name}. We design the setup matching structural load profiles, false ceiling height boundaries, and zoning partition variables.
              </p>
            </div>

            {/* Benefits */}
            {solution.benefits && solution.benefits.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground">Key Technical Benefits</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {solution.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 border border-border p-4 rounded bg-card hover:border-secondary/20 transition-all">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground leading-normal">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar Applications */}
          <div className="lg:col-span-4 space-y-6">
            {solution.applications && solution.applications.length > 0 && (
              <div className="border border-border p-6 rounded bg-card">
                <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span>Typical Sectors</span>
                </h3>
                <ul className="space-y-3">
                  {solution.applications.map((app: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quote Prompt */}
            <div className="border border-primary/20 p-6 rounded bg-primary/5 space-y-4">
              <h4 className="font-bold text-foreground text-sm">Have a project drawing?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Submit your floor blueprints or duct layouts to our design engineers for initial equipment sizing and cost estimation.
              </p>
              <Link
                href="/quote"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
              >
                <span>Request Quotation Estimate</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white text-center space-y-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl tracking-tight">Need technical consultation on {solution.name}?</h2>
        <p className="text-sm text-slate-350 max-w-xl mx-auto leading-relaxed">
          Our engineering team can evaluate your layout drawings to recommend suitable cooling configs.
        </p>
        <div className="pt-2">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded shadow"
          >
            REQUEST CONSULTATION
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

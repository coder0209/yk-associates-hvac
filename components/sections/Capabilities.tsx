'use strict';

'use client';

import React from 'react';
import { Ruler, Package, Hammer, CheckSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const capabilities = [
  {
    id: 'hvac-design',
    title: 'HVAC Design & Planning',
    description: 'Practical HVAC planning and system design tailored to building requirements, occupancy, usage, and project constraints.',
    icon: Ruler,
    slug: 'hvac-design-planning',
  },
  {
    id: 'equipment-selection',
    title: 'Equipment & System Selection',
    description: 'Selection of suitable air-conditioning and ventilation systems based on project requirements, efficiency, and lifecycle considerations.',
    icon: Package,
    slug: 'equipment-selection-supply',
  },
  {
    id: 'installation-execution',
    title: 'Installation & Execution',
    description: 'Professional execution of HVAC systems, ducting, piping, equipment, and associated works with attention to quality and coordination.',
    icon: Hammer,
    slug: 'installation-execution',
  },
  {
    id: 'testing-commissioning',
    title: 'Testing & Commissioning',
    description: 'System checks, testing, and commissioning to support reliable operation and intended performance.',
    icon: CheckSquare,
    slug: 'testing-commissioning',
  },
];

export default function Capabilities() {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
            Complete HVAC Solutions, From Design to Commissioning
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            We provide integrated HVAC services covering initial planning, mechanical design, equipment selection, air distribution execution, and final testing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={cap.id}
                className="flex flex-col bg-background border border-border p-6 rounded shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="h-12 w-12 rounded bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 tracking-wide">
                  {cap.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {cap.description}
                </p>
                <div className="mt-6 pt-4 border-t border-border/60">
                  <Link
                    href={`/services/${cap.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-secondary uppercase hover:text-primary transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-secondary hover:bg-secondary-hover rounded shadow-sm transition-transform active:scale-98"
          >
            ABOUT OUR COMPANY
          </Link>
        </div>
      </div>
    </section>
  );
}

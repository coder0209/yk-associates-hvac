'use strict';

'use client';

import React from 'react';
import { Lightbulb, Layout, Settings, Cpu, ShieldCheck } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Understand',
    desc: 'Understand project requirements, structural drawings, building usage, heat loads, and project constraints.',
    icon: Lightbulb,
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Plan an appropriate HVAC solution, pipe sizing, duct routing, and structural layouts.',
    icon: Layout,
  },
  {
    num: '03',
    title: 'Select',
    desc: 'Sizing calculations to select suitable, high-efficiency equipment and system components.',
    icon: Settings,
  },
  {
    num: '04',
    title: 'Execute',
    desc: 'Professional installation, copper piping layout, insulated ducting network, and electrical coordination.',
    icon: Cpu,
  },
  {
    num: '05',
    title: 'Commission',
    desc: 'Strict testing, water balancing, CFM adjustments, and final system commissioning checksheets.',
    icon: ShieldCheck,
  },
];

export default function Process() {
  return (
    <section className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Decorative background visual elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            Our Methodology
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mt-4">
            From Requirement to Reliable Operation
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            We follow a structured engineering-led process to deliver optimal HVAC installations that operate reliably for years.
          </p>
        </div>

        {/* Step-by-step connection flow grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.num} className="relative flex flex-col bg-slate-800/40 border border-slate-700/60 p-6 rounded group hover:border-primary/40 hover:bg-slate-800 transition-all duration-300">
                {/* Step number watermark */}
                <div className="absolute top-2 right-4 text-5xl font-black text-slate-700/30 group-hover:text-primary/20 transition-colors select-none">
                  {step.num}
                </div>

                <div className="h-10 w-10 rounded bg-slate-750 border border-slate-700 flex items-center justify-center text-primary mb-6">
                  <IconComponent className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 tracking-wide">
                  {step.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

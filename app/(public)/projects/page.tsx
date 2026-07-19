import React from 'react';
import { getProjects } from '@/lib/data';
import ProjectsGrid from '@/components/sections/ProjectsGrid';

export const revalidate = 3600; // Revalidate page cache every hour

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-background min-h-screen">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            HVAC Project Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover how we design, source, execute, and commission cooling systems across banquet halls, commercial parks, and hotels.
          </p>
        </div>
      </section>

      {/* FILTERABLE PORTFOLIO SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsGrid initialProjects={projects} />
        </div>
      </section>
    </div>
  );
}

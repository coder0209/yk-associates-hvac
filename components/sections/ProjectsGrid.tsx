'use strict';

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  slug: string;
  location: string;
  category: string;
  hvac_system: string;
  capacity?: string | null;
  completion_year?: number | null;
  short_description: string;
  cover_image_url: string;
}

interface ProjectsGridProps {
  initialProjects: Project[];
}

const CATEGORIES = [
  { label: 'ALL', value: 'all' },
  { label: 'BANQUET HALLS', value: 'banquet-hall' },
  { label: 'COMMERCIAL', value: 'commercial' },
  { label: 'INDUSTRIAL', value: 'industrial' },
  { label: 'HOSPITALITY', value: 'hospitality' },
  { label: 'RESIDENTIAL', value: 'residential' },
  { label: 'OTHER', value: 'other' },
];

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter projects client-side
  const filteredProjects = activeFilter === 'all'
    ? initialProjects
    : initialProjects.filter(p => p.category === activeFilter);

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveFilter(cat.value)}
            className={`px-4 py-2 text-xs font-bold tracking-wider rounded transition-all ${
              activeFilter === cat.value
                ? 'bg-primary text-white shadow-sm'
                : 'text-foreground/80 hover:bg-muted hover:text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid Display */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded overflow-hidden flex flex-col justify-between hover:shadow-sm hover:border-primary/20 transition-all group animate-fade-in"
            >
              {/* Cover Image Area */}
              <div className="relative h-48 w-full bg-slate-150 border-b border-border flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 z-10" />
                {project.cover_image_url && project.cover_image_url.startsWith('/') && !project.cover_image_url.includes('demo-project') ? (
                  <Image
                    src={project.cover_image_url}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
                    <Briefcase className="h-10 w-10 text-primary mb-2 z-10" />
                    <span className="text-white font-bold text-sm tracking-wide z-10">{project.name}</span>
                    <span className="text-slate-400 text-xs mt-1 z-10">{project.location}</span>
                  </div>
                )}
              </div>

              {/* Case Info */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase block mb-1">
                    {project.category.replace('-', ' ')}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {project.short_description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-border/60 pt-3 mb-4 text-muted-foreground">
                    <div>
                      <span className="font-semibold text-foreground">System:</span> {project.hvac_system}
                    </div>
                    {project.capacity && (
                      <div>
                        <span className="font-semibold text-foreground">Capacity:</span> {project.capacity}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-secondary uppercase hover:text-primary transition-colors"
                  >
                    <span>View Project Case Study</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded">
          <p className="text-sm text-muted-foreground">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}

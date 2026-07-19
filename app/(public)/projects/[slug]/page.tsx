import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/data';
import { ArrowRight, MapPin, Calendar, Wind, Gauge, Award, CheckCircle } from 'lucide-react';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Dynamic WhatsApp floating button for this specific project */}
      <WhatsAppButton projectName={project.name} />

      {/* HERO / HEADER SECTION */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Link
            href="/projects"
            className="text-xs font-semibold text-primary hover:text-white transition-colors"
          >
            &larr; BACK TO CASE STUDIES
          </Link>
          <span className="text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded inline-block">
            {project.category.replace('-', ' ')} Case Study
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {project.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-350 max-w-3xl leading-relaxed">
            {project.short_description}
          </p>
        </div>
      </section>

      {/* CASE STUDY DETAILS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Case Review */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            {project.overview && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Project Overview</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.overview}
                </p>
              </div>
            )}

            {/* Challenge */}
            {project.challenge && (
              <div className="space-y-4 border-t border-border pt-8">
                <h2 className="text-2xl font-bold text-foreground">The HVAC Challenge</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.challenge}
                </p>
              </div>
            )}

            {/* Solution & Scope */}
            {(project.solution || (project.scope_of_work && project.scope_of_work.length > 0)) && (
              <div className="space-y-4 border-t border-border pt-8">
                <h2 className="text-2xl font-bold text-foreground">Our Engineered Solution</h2>
                {project.solution && (
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
                    {project.solution}
                  </p>
                )}

                {project.scope_of_work && project.scope_of_work.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground">Scope of Execution:</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.scope_of_work.map((scopeItem: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{scopeItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* PROJECT GALLERY */}
            {project.project_images && project.project_images.length > 0 && (
              <div className="space-y-4 border-t border-border pt-8">
                <h2 className="text-2xl font-bold text-foreground">Project Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.project_images.map((img: any) => (
                    <div key={img.id} className="relative h-60 w-full overflow-hidden border border-border bg-slate-100 rounded">
                      <Image
                        src={img.image_url}
                        alt={img.alt_text || project.name}
                        fill
                        className="object-cover hover:scale-103 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Project Facts */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-border p-6 rounded bg-card space-y-6">
              <h3 className="text-base font-bold text-foreground border-b border-border pb-3 uppercase tracking-wide">
                Project Key Facts
              </h3>
              
              <ul className="space-y-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4.5 w-4.5 text-primary shrink-0" />
                  <div>
                    <span className="font-semibold block text-foreground">Location</span>
                    <span>{project.location}</span>
                  </div>
                </li>
                {project.completion_year && (
                  <li className="flex items-center gap-3">
                    <Calendar className="h-4.5 w-4.5 text-primary shrink-0" />
                    <div>
                      <span className="font-semibold block text-foreground">Completion Year</span>
                      <span>{project.completion_year}</span>
                    </div>
                  </li>
                )}
                <li className="flex items-center gap-3">
                  <Wind className="h-4.5 w-4.5 text-primary shrink-0" />
                  <div>
                    <span className="font-semibold block text-foreground">HVAC System Type</span>
                    <span>{project.hvac_system}</span>
                  </div>
                </li>
                {project.capacity && (
                  <li className="flex items-center gap-3">
                    <Gauge className="h-4.5 w-4.5 text-primary shrink-0" />
                    <div>
                      <span className="font-semibold block text-foreground">Sized Capacity</span>
                      <span>{project.capacity}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/* Quote Action Box */}
            <div className="border border-primary/20 p-6 rounded bg-primary/5 space-y-4">
              <h4 className="font-bold text-foreground text-sm">Planning a Similar Project?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We design and execute custom zoning climate layouts matching convention or commercial properties. Get a proposal.
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

      {/* CTA SECTION */}
      <section className="py-20 bg-slate-900 text-white text-center space-y-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl tracking-tight">Need HVAC contracting expertise?</h2>
        <p className="text-sm text-slate-350 max-w-xl mx-auto leading-relaxed">
          Provide your floor drawings. Our HVAC engineers will review layout requirements and issue an assessment.
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

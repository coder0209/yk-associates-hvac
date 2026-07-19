import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  getSiteSettings, 
  getMetrics, 
  getServices, 
  getSolutions, 
  getIndustries, 
  getFeaturedProjects, 
  getTestimonials,
  getBrands
} from '@/lib/data';
import Hero from '@/components/sections/Hero';
import Capabilities from '@/components/sections/Capabilities';
import Process from '@/components/sections/Process';
import { ArrowRight, CheckCircle2, Phone, MessageSquare, Briefcase, ChevronRight } from 'lucide-react';
import { DEFAULT_CONTACT } from '@/lib/config';

export default async function HomePage() {
  // Fetch dynamic details in parallel
  const [
    settings,
    metrics,
    services,
    solutions,
    industries,
    featuredProjects,
    testimonials,
    brands
  ] = await Promise.all([
    getSiteSettings(),
    getMetrics(),
    getServices(),
    getSolutions(),
    getIndustries(),
    getFeaturedProjects(),
    getTestimonials(),
    getBrands()
  ]);

  return (
    <div className="overflow-hidden">
      {/* SECTION 1: HERO */}
      <Hero 
        headline={settings?.tagline ? `Engineering Comfort.\n${settings.tagline}.` : undefined}
        tagline={settings?.seo_description || undefined}
      />

      {/* SECTION 2: COMPANY INTRODUCTION */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative h-[380px] w-full overflow-hidden border border-border bg-slate-100 flex items-center justify-center">
              {/* Overlay with blueprint graphics */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-70" />
              <div className="absolute inset-0 bg-slate-900/10 z-10" />
              <Image
                src="/logo.jpg"
                alt="YK Associates Showcase Logo"
                fill
                className="object-contain p-8 transform hover:scale-103 transition-transform duration-500"
              />
            </div>

            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1 rounded">
                Who We Are
              </span>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
                Engineering Comfort, Delivering Precision
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                YK Associates is an engineering and contracting firm specializing in central heating, ventilation, and air-conditioning solutions. We handle end-to-end HVAC projects—including mechanical layouts, equipment selection, insulated ducting network construction, structural copper piping, and rigorous system commissioning.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                We cater to diverse occupancy applications such as banquet halls, corporate offices, hotels, restaurants, industrial facilities, and premium residential spaces. Our approach focuses on technical accuracy and efficient systems configuration.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover group"
                >
                  <span>ABOUT OUR COMPANY</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE CAPABILITIES */}
      <Capabilities />

      {/* SECTION 4: HVAC SOLUTIONS */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1 rounded">
              Solutions Matrix
            </span>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl mt-4">
              Solutions Engineered for Every Space
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Explore our core HVAC systems built for energy-saving, custom zoning control, and maximum structural durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-card border border-border p-6 rounded flex flex-col justify-between hover:shadow-sm hover:border-secondary/20 transition-all group"
              >
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {sol.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {sol.description}
                  </p>
                  {sol.benefits && sol.benefits.length > 0 && (
                    <ul className="space-y-2 mb-6 text-xs text-muted-foreground border-t border-border/60 pt-4">
                      {sol.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-secondary uppercase hover:text-primary transition-colors"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRIES */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1 rounded">
              Sector Expertise
            </span>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl mt-4">
              HVAC Expertise Across Diverse Spaces
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Every building sector has unique thermal profiles. We engineer layouts matching specific usage demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="bg-card border border-border p-6 rounded flex flex-col justify-between hover:border-primary/20 transition-all"
              >
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{ind.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{ind.description}</p>
                  {ind.challenges && ind.challenges.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold tracking-wide text-slate-400 block uppercase">Key Challenge Solved:</span>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {ind.challenges.slice(0, 2).map((challenge: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-secondary uppercase hover:text-primary transition-colors"
                  >
                    <span>Sector Details</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FEATURED PROJECTS */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1 rounded">
                  Portfolio
                </span>
                <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl mt-4">
                  Selected Completed Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 hover:bg-slate-100 hover:border-slate-400 text-sm font-semibold rounded transition-colors"
              >
                VIEW ALL PROJECTS
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-card border border-border rounded overflow-hidden flex flex-col justify-between hover:shadow-sm hover:border-primary/20 transition-all group"
                >
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
          </div>
        </section>
      )}

      {/* SECTION 7: EXPERIENCE / METRICS */}
      {metrics.length > 0 && (
        <section className="py-16 bg-slate-900 text-white border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {metrics.map((metric) => (
                <div key={metric.id} className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-black text-primary tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 9: WHY CHOOSE US */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1 rounded">
                Differentiators
              </span>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
                Engineered for Long-Term Reliability
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                YK Associates focuses on custom engineering matching building structures. We avoid generic system templates, and instead carry out careful heat calculations, duct routing analysis, and structural validation on every contracting project.
              </p>
              <div className="space-y-4 pt-2">
                <a
                  href={`tel:${DEFAULT_CONTACT.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call support: {DEFAULT_CONTACT.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card border border-border p-5 rounded">
                <h3 className="text-base font-bold text-foreground mb-2">Engineering-Led Approach</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">System layout planning led directly by qualified HVAC engineers following Indian and ASHRAE guidelines.</p>
              </div>
              <div className="bg-card border border-border p-5 rounded">
                <h3 className="text-base font-bold text-foreground mb-2">End-to-End HVAC Capability</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Handling load assessments, equipment selection, structured duct execution, piping and final commission logs.</p>
              </div>
              <div className="bg-card border border-border p-5 rounded">
                <h3 className="text-base font-bold text-foreground mb-2">Project-Specific Solutions</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Customizing zoning controls for offices, silent airflow for banquet halls, and dust separation for industrial units.</p>
              </div>
              <div className="bg-card border border-border p-5 rounded">
                <h3 className="text-base font-bold text-foreground mb-2">Quality-Focused Execution</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Strict onsite execution monitoring, certified pressure checks, and detailed testing logs prior to handover.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: METHODOLOGY PROCESS */}
      <Process />

      {/* SECTION 11: TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1 rounded">
                Client Reviews
              </span>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl mt-4">
                What Our Clients Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-card border border-border p-6 rounded flex flex-col justify-between shadow-sm"
                >
                  <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                    "{test.testimonial}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-650 text-xs">
                      {test.client_name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{test.client_name}</h4>
                      <p className="text-xs text-muted-foreground">{test.company_project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: BRANDS CAROUSEL/GRID */}
      {brands.length > 0 && (
        <section className="py-16 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                HVAC Brands & Systems We Work With
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
              {brands.map((brand) => (
                <div key={brand.id} className="h-12 w-28 relative grayscale hover:grayscale-0 transition-all flex items-center justify-center">
                  <span className="font-bold text-base text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 12: CTA SECTION */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight">
            Planning an HVAC Project?
          </h2>
          <p className="text-base text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Tell us about your building layout or project specifications. Our engineering team will review your enquiry requirements and get back to you with structural configuration options.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded shadow-lg transition-transform active:scale-98"
            >
              REQUEST A QUOTE
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <a
              href={`https://wa.me/${DEFAULT_CONTACT.whatsapp.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-slate-100 border border-slate-700 hover:bg-slate-800 rounded transition-colors"
            >
              <MessageSquare className="mr-2 h-5 w-5 text-green-500 fill-current" />
              WHATSAPP US
            </a>
            
            <a
              href={`tel:${DEFAULT_CONTACT.phone}`}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-slate-100 hover:bg-slate-800 rounded transition-colors"
            >
              <Phone className="mr-2 h-4 w-4 text-secondary" />
              CALL NOW
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

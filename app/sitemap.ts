import { MetadataRoute } from 'next';
import { getProjects, getServices, getSolutions, getIndustries } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ykassociates.in';

  // Base static paths
  const staticPaths = [
    '',
    '/about',
    '/services',
    '/solutions',
    '/industries',
    '/projects',
    '/brands',
    '/contact',
    '/quote',
    '/privacy',
    '/terms',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    // Dynamic projects paths
    const projects = await getProjects();
    const projectPaths = projects.map(proj => ({
      url: `${baseUrl}/projects/${proj.slug}`,
      lastModified: proj.updated_at || proj.created_at ? new Date(proj.updated_at || proj.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Dynamic services paths
    const services = await getServices();
    const servicePaths = services.map(ser => ({
      url: `${baseUrl}/services/${ser.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Dynamic solutions paths
    const solutions = await getSolutions();
    const solutionPaths = solutions.map(sol => ({
      url: `${baseUrl}/solutions/${sol.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Dynamic industries paths
    const industries = await getIndustries();
    const industryPaths = industries.map(ind => ({
      url: `${baseUrl}/industries/${ind.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [
      ...staticPaths,
      ...projectPaths,
      ...servicePaths,
      ...solutionPaths,
      ...industryPaths
    ];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap, returning static paths:", error);
    return staticPaths;
  }
}

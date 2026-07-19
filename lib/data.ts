import { createPublicClient } from '@/lib/supabase/server';
import { 
  DEFAULT_CONTACT, 
  SERVICE_AREAS, 
  BUSINESS_HOURS, 
  COMPANY_NAME, 
  TAGLINE, 
  SEO_FALLBACKS,
  DEFAULT_COLORS
} from '@/lib/config';

// Graceful database query wrapper
async function queryDb<T>(queryFn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return fallback;
    }
    return await queryFn();
  } catch (error) {
    console.error("Database query failed, returning static fallback data:", error);
    return fallback;
  }
}

// 1. Get Site Settings
export async function getSiteSettings() {
  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error || !data) throw error || new Error('No settings found');
    return data;
  }, {
    id: 1,
    company_name: COMPANY_NAME,
    tagline: TAGLINE,
    logo_url: '/logo.jpg',
    phone: DEFAULT_CONTACT.phone,
    whatsapp: DEFAULT_CONTACT.whatsapp,
    email: DEFAULT_CONTACT.email,
    address: DEFAULT_CONTACT.address,
    google_maps_url: DEFAULT_CONTACT.mapsUrl,
    business_hours: BUSINESS_HOURS,
    service_areas: SERVICE_AREAS,
    social_urls: { linkedin: "https://linkedin.com", facebook: "https://facebook.com", instagram: "https://instagram.com" },
    brand_colors: DEFAULT_COLORS,
    seo_title: SEO_FALLBACKS.title,
    seo_description: SEO_FALLBACKS.description,
    seo_share_image: SEO_FALLBACKS.shareImage,
  });
}

// 2. Get Metrics
export async function getMetrics() {
  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('site_metrics')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }, [
    { id: '1', label: 'Projects Completed', value: '120+', display_order: 1, active: true },
    { id: '2', label: 'Years of Experience', value: '10+', display_order: 2, active: true },
    { id: '3', label: 'TR Capacity Delivered', value: '8,500+ TR', display_order: 3, active: true },
    { id: '4', label: 'Corporate Clients', value: '95+', display_order: 4, active: true },
  ]);
}

// 3. Get Services
export async function getServices() {
  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }, [
    {
      id: '1',
      name: 'HVAC Design & Planning',
      slug: 'hvac-design-planning',
      short_description: 'Custom heating, ventilation, and air-conditioning design, heat load assessments, and equipment sizing.',
      icon_name: 'DraftingCompass',
      active: true,
    },
    {
      id: '2',
      name: 'Equipment Selection & Supply',
      slug: 'equipment-selection-supply',
      short_description: 'Sourcing and procurement of suitable chiller plants, VRF, package ACs, and ductable systems from trusted brands.',
      icon_name: 'Package',
      active: true,
    },
    {
      id: '3',
      name: 'Installation & Execution',
      slug: 'installation-execution',
      short_description: 'Professional installation of equipment, ducting networks, copper piping, and structural supports.',
      icon_name: 'Hammer',
      active: true,
    },
    {
      id: '4',
      name: 'Testing & Commissioning',
      slug: 'testing-commissioning',
      short_description: 'Pre-commissioning checks, air balancing, duct leakage tests, and performance optimization.',
      icon_name: 'Gauge',
      active: true,
    },
  ]);
}

// 4. Get Solutions
export async function getSolutions() {
  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }, [
    {
      id: '1',
      name: 'VRF / VRV Systems',
      slug: 'vrf-vrv-systems',
      description: 'Variable Refrigerant Flow systems for multi-zone comfort with smart energy management controls.',
      benefits: ['Energy saving inverter compressors', 'Independent temperature control in different rooms', 'Space-saving compact outdoor units'],
      applications: ['Corporate Offices', 'Hotels & Hospitality', 'Banquet Halls', 'Premium Residences'],
      active: true,
    },
    {
      id: '2',
      name: 'Chiller Systems',
      slug: 'chiller-systems',
      description: 'Centralized air-cooled and water-cooled chiller plants for heavy commercial requirements.',
      benefits: ['Lowest operational cost for massive volumes', 'Reliable cooling for high density occupancy', 'Extremely long functional lifecycle'],
      applications: ['Large Industrial Facilities', 'Malls & Commercial Buildings', 'Large Banquet Halls'],
      active: true,
    },
    {
      id: '3',
      name: 'Ventilation & Exhaust',
      slug: 'ventilation-exhaust-systems',
      description: 'Kitchen hood exhausts, basement ventilation, toilet exhausts, and fresh air intake setups.',
      benefits: ['Compliance with local fire and pollution norms', 'Safe extraction of smoke and contaminants', 'Constant fresh air supply (CFM management)'],
      applications: ['Commercial Kitchens & Restaurants', 'Basement Parking Lots', 'Industrial Units'],
      active: true,
    },
  ]);
}

// 5. Get Industries
export async function getIndustries() {
  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('industries')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }, [
    {
      id: '1',
      name: 'Banquet & Convention Halls',
      slug: 'banquet-convention-halls',
      description: 'HVAC layouts engineered for sudden heavy occupancies, rapid cooling demands, and silent operations.',
      challenges: ['Massive fluctuating heat loads depending on guest presence', 'Acoustic control so equipment hum does not disturb events', 'Vast ceiling heights requiring careful air throw distribution'],
      active: true,
    },
    {
      id: '2',
      name: 'Commercial Buildings & Offices',
      slug: 'commercial-offices',
      description: 'Sleek zone-based climate control maximizing employee comfort and energy efficiency.',
      challenges: ['Multi-tenant zone partitioning flexibility', 'High heat generation from servers and office devices', 'Strict green energy/LEED standards compliance'],
      active: true,
    },
  ]);
}

// 6. Get Brands
export async function getBrands() {
  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }, [
    { id: '1', name: 'Daikin', logo_url: '/brands/daikin.png', website_url: 'https://daikin.com', active: true },
    { id: '2', name: 'Carrier', logo_url: '/brands/carrier.png', website_url: 'https://carrier.com', active: true },
    { id: '3', name: 'Blue Star', logo_url: '/brands/bluestar.png', website_url: 'https://bluestarindia.com', active: true },
    { id: '4', name: 'Voltas', logo_url: '/brands/voltas.png', website_url: 'https://voltas.com', active: true },
    { id: '5', name: 'Mitsubishi Electric', logo_url: '/brands/mitsubishi.png', website_url: 'https://mitsubishielectric.com', active: true },
  ]);
}

// 7. Get Testimonials
export async function getTestimonials() {
  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('active', true);
    
    if (error) throw error;
    return data || [];
  }, [
    {
      id: '1',
      client_name: 'Mr. Rajesh Kumar',
      company_project: 'Grand Palace Banquet Hall, Hyderabad',
      testimonial: 'YK Associates completed the complete VRF system planning and installation in our grand banquet hall. The cooling is incredibly uniform, and their attention to quiet operation was top notch.',
      featured: true,
      active: true,
    },
    {
      id: '2',
      client_name: 'Ms. Anita Rao',
      company_project: 'Apex Office Spaces, Secunderabad',
      testimonial: 'We hired YK Associates for duct design and Chiller system execution. Excellent coordination, neat piping layouts, and professional testing. Highly recommended.',
      featured: true,
      active: true,
    },
  ]);
}

// 8. Get Featured Projects
export async function getFeaturedProjects() {
  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .limit(6);
    
    if (error) throw error;
    return data || [];
  }, [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      name: 'Grand Royale Convention Center',
      slug: 'grand-royale-convention-center',
      location: 'Kondapur, Hyderabad',
      category: 'banquet-hall',
      hvac_system: 'Chilled Water System + Air Handling Units',
      capacity: '250 TR',
      completion_year: 2024,
      short_description: 'Design, supply, and execution of a massive centralized chiller system for a 2,500-capacity convention hall.',
      cover_image_url: '/demo-project-convention.jpg',
      featured: true,
      status: 'published',
    },
    {
      id: '4a2ceb3f-1d4d-4bc5-9cdd-3b0e7c3eab5a',
      name: 'Vertex Tech Park Offices',
      slug: 'vertex-tech-park-offices',
      location: 'HITEC City, Hyderabad',
      category: 'commercial',
      hvac_system: 'Variable Refrigerant Flow (VRF) Systems',
      capacity: '180 TR',
      completion_year: 2025,
      short_description: 'Multi-zone VRF HVAC installation for a 4-story software company headquarters.',
      cover_image_url: '/demo-project-office.jpg',
      featured: true,
      status: 'published',
    }
  ]);
}

// 9. Get All Projects
export async function getProjects() {
  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('completion_year', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }, [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      name: 'Grand Royale Convention Center',
      slug: 'grand-royale-convention-center',
      location: 'Kondapur, Hyderabad',
      category: 'banquet-hall',
      hvac_system: 'Chilled Water System + Air Handling Units',
      capacity: '250 TR',
      completion_year: 2024,
      short_description: 'Design, supply, and execution of a massive centralized chiller system for a 2,500-capacity convention hall.',
      cover_image_url: '/demo-project-convention.jpg',
      featured: true,
      status: 'published',
    },
    {
      id: '4a2ceb3f-1d4d-4bc5-9cdd-3b0e7c3eab5a',
      name: 'Vertex Tech Park Offices',
      slug: 'vertex-tech-park-offices',
      location: 'HITEC City, Hyderabad',
      category: 'commercial',
      hvac_system: 'Variable Refrigerant Flow (VRF) Systems',
      capacity: '180 TR',
      completion_year: 2025,
      short_description: 'Multi-zone VRF HVAC installation for a 4-story software company headquarters.',
      cover_image_url: '/demo-project-office.jpg',
      featured: true,
      status: 'published',
    }
  ]);
}

// 10. Get Project Detail (including images)
export async function getProjectBySlug(slug: string) {
  const defaultProjects = [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      name: 'Grand Royale Convention Center',
      slug: 'grand-royale-convention-center',
      location: 'Kondapur, Hyderabad',
      category: 'banquet-hall',
      hvac_system: 'Chilled Water System + Air Handling Units',
      capacity: '250 TR',
      completion_year: 2024,
      short_description: 'Design, supply, and execution of a massive centralized chiller system for a 2,500-capacity convention hall.',
      overview: 'The project involved setting up a robust air-conditioned network for a double-height premium convention center, requiring detailed acoustic treatments and air-balancing.',
      challenge: 'High ceiling elevations of 28 feet posed challenges in distributing cold air down to occupier zones without drafts, combined with sudden heat loads when guests entered.',
      solution: 'We designed a high-induction nozzle jet diffuser system coupled with twin 125 TR air-cooled scroll chillers. The variable speed air handlers adapt dynamic air distribution depending on real occupancy sensor data.',
      scope_of_work: ['Load estimation & duct routing layout design', 'Supply & installation of 2x 125 TR scroll chillers', 'High pressure ducting insulation & testing', 'Jet nozzle installation and acoustic lining', 'Water balancing & commission reports'],
      cover_image_url: '/demo-project-convention.jpg',
      featured: true,
      status: 'published',
      project_images: [
        { id: '1', image_url: '/demo-project-convention-1.jpg', alt_text: 'Air Handling Unit copper connection setup' },
        { id: '2', image_url: '/demo-project-convention-2.jpg', alt_text: 'Ducting layouts on convention floor ceiling' }
      ]
    },
    {
      id: '4a2ceb3f-1d4d-4bc5-9cdd-3b0e7c3eab5a',
      name: 'Vertex Tech Park Offices',
      slug: 'vertex-tech-park-offices',
      location: 'HITEC City, Hyderabad',
      category: 'commercial',
      hvac_system: 'Variable Refrigerant Flow (VRF) Systems',
      capacity: '180 TR',
      completion_year: 2025,
      short_description: 'Multi-zone VRF HVAC installation for a 4-story software company headquarters.',
      overview: 'A premium office workspace requiring separate zone climate controllers to accommodate varying server and workstation heat outputs across levels.',
      challenge: 'Multiple partitioned meeting zones had to be controlled independently, with structural ceiling restrictions limiting heavy duct network sizes.',
      solution: 'Executed a space-saving premium VRF installation utilizing compact ceiling cassette indoor units linked to energy-saving inverter outdoor plants.',
      scope_of_work: ['HVAC structural design layout in CAD', 'Installation of VRF cassette units', 'Copper refnet joints layout & pressure testing', 'Installation of smart central touchscreen controllers', 'Testing and air balance calibration'],
      cover_image_url: '/demo-project-office.jpg',
      featured: true,
      status: 'published',
      project_images: [
        { id: '3', image_url: '/demo-project-office-1.jpg', alt_text: 'Cassette indoor installations in cafeteria' }
      ]
    }
  ];

  return queryDb(async () => {
    const supabase = createPublicClient();
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    
    if (projectError || !project) throw projectError || new Error('Project not found');

    const { data: images, error: imagesError } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', project.id)
      .order('display_order', { ascending: true });

    return {
      ...project,
      project_images: images || [],
    };
  }, defaultProjects.find(p => p.slug === slug) || null);
}

// 11. Get Service Detail
export async function getServiceBySlug(slug: string) {
  const services = await getServices();
  const found = services.find(s => s.slug === slug);
  if (!found) return null;

  // Add rich section details fallback if database lacks it
  return {
    ...found,
    full_description: found.full_description || `Providing expert ${found.name} solutions across India. Fully customized according to building constraints, capacity loads, and environmental demands.`,
    process: ['Requirement Assessment', 'Structural Review', 'Detailed Layout Mapping', 'Testing & Verification'],
    applications: ['Banquet Halls', 'Commercial Offices', 'Hotels & Restaurants', 'Industrial Units'],
  };
}

// 12. Get Solution Detail
export async function getSolutionBySlug(slug: string) {
  const solutions = await getSolutions();
  const found = solutions.find(s => s.slug === slug);
  if (!found) return null;
  return found;
}

// 13. Get Industry Detail
export async function getIndustryBySlug(slug: string) {
  const industries = await getIndustries();
  const found = industries.find(s => s.slug === slug);
  if (!found) return null;
  return found;
}

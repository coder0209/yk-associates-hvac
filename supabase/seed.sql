-- Seed file for YK Associates
-- Insert default site settings
insert into public.site_settings (id, company_name, tagline, logo_url, phone, whatsapp, email, address, brand_colors, google_maps_url, service_areas)
values (
  1,
  'YK Associates',
  'we CREATE , your COMFORT',
  '/logo.jpg',
  '+91 98765 43210',
  '+91 98765 43210',
  'info@ykassociates.in',
  'Plot No. 45, Phase III, Industrial Area, Hyderabad, Telangana, 500037',
  '{"primary": "#DC2626", "secondary": "#2563EB", "accent": "#64748B"}'::jsonb,
  'https://maps.google.com',
  array['Hyderabad', 'Secunderabad', 'Telangana', 'Andhra Pradesh']
) on conflict (id) do nothing;

-- Insert site metrics
insert into public.site_metrics (label, value, display_order, active)
values
  ('Projects Completed', '120+', 1, true),
  ('Years of Experience', '10+', 2, true),
  ('TR Capacity Delivered', '8,500+ TR', 3, true),
  ('Corporate Clients', '95+', 4, true);

-- Insert Services
insert into public.services (name, slug, short_description, full_description, icon_name, display_order, active)
values
  (
    'HVAC Design & Planning',
    'hvac-design-planning',
    'Custom heating, ventilation, and air-conditioning design, heat load assessments, and equipment sizing.',
    'We offer complete HVAC planning and design services tailored to your structural layout and usage requirements. Our engineers carry out detailed heat-load estimations, structural airflow assessments, and equipment selections to achieve maximum efficiency and low life-cycle operating costs.',
    'DraftingCompass',
    1,
    true
  ),
  (
    'Equipment Selection & Supply',
    'equipment-selection-supply',
    'Sourcing and procurement of suitable chiller plants, VRF, package ACs, and ductable systems from trusted brands.',
    'Selecting the correct equipment capacity and type is essential. We help source top-quality chillers, VRF/VRV units, air handling systems, and duct materials, matching technical requirements with budget considerations while working directly with top HVAC manufacturers.',
    'Package',
    2,
    true
  ),
  (
    'Installation & Execution',
    'installation-execution',
    'Professional installation of equipment, ducting networks, copper piping, and structural supports.',
    'Our experienced onsite contracting teams handle the execution of complex piping networks, high-quality ducting insulation, VRF piping, and chiller installations, ensuring full adherence to Indian and ASHRAE structural standards.',
    'Hammer',
    3,
    true
  ),
  (
    'Testing & Commissioning',
    'testing-commissioning',
    'Pre-commissioning checks, air balancing, duct leakage tests, and performance optimization.',
    'We perform rigid air and water balancing, duct integrity tests, and equipment verification during final testing phases. Our testing ensures that the system runs exactly as designed, providing the specified temperature and indoor air quality controls.',
    'Gauge',
    4,
    true
  );

-- Insert Solutions
insert into public.solutions (name, slug, description, benefits, applications, display_order, active)
values
  (
    'VRF / VRV Systems',
    'vrf-vrv-systems',
    'Variable Refrigerant Flow systems for multi-zone comfort with smart energy management controls.',
    array['Energy saving inverter compressors', 'Independent temperature control in different rooms', 'Space-saving compact outdoor units'],
    array['Corporate Offices', 'Hotels & Hospitality', 'Banquet Halls', 'Premium Residences'],
    1,
    true
  ),
  (
    'Chiller Systems',
    'chiller-systems',
    'Centralized air-cooled and water-cooled chiller plants for heavy commercial requirements.',
    array['Lowest operational cost for massive volumes', 'Reliable cooling for high density occupancy', 'Extremely long functional lifecycle'],
    array['Large Industrial Facilities', 'Malls & Commercial Buildings', 'Large Banquet Halls'],
    2,
    true
  ),
  (
    'Ventilation & Exhaust',
    'ventilation-exhaust-systems',
    'Kitchen hood exhausts, basement ventilation, toilet exhausts, and fresh air intake setups.',
    array['Compliance with local fire and pollution norms', 'Safe extraction of smoke and contaminants', 'Constant fresh air supply (CFM management)'],
    array['Commercial Kitchens & Restaurants', 'Basement Parking Lots', 'Industrial Units'],
    3,
    true
  );

-- Insert Industries
insert into public.industries (name, slug, description, challenges, display_order, active)
values
  (
    'Banquet & Convention Halls',
    'banquet-convention-halls',
    'HVAC layouts engineered for sudden heavy occupancies, rapid cooling demands, and silent operations.',
    array['Massive fluctuating heat loads depending on guest presence', 'Acoustic control so equipment hum does not disturb events', 'Vast ceiling heights requiring careful air throw distribution'],
    1,
    true
  ),
  (
    'Commercial Buildings & Offices',
    'commercial-offices',
    'Sleek zone-based climate control maximizing employee comfort and energy efficiency.',
    array['Multi-tenant zone partitioning flexibility', 'High heat generation from servers and office devices', 'Strict green energy/LEED standards compliance'],
    2,
    true
  );

-- Insert Brands
insert into public.brands (name, logo_url, website_url, display_order, active)
values
  ('Daikin', '/brands/daikin.png', 'https://www.daikin.com', 1, true),
  ('Carrier', '/brands/carrier.png', 'https://www.carrier.com', 2, true),
  ('Blue Star', '/brands/bluestar.png', 'https://www.bluestarindia.com', 3, true),
  ('Voltas', '/brands/voltas.png', 'https://www.voltas.com', 4, true),
  ('Mitsubishi Electric', '/brands/mitsubishi.png', 'https://www.mitsubishielectric.com', 5, true);

-- Insert Testimonials
insert into public.testimonials (client_name, company_project, testimonial, featured, active)
values
  (
    'Mr. Rajesh Kumar',
    'Grand Palace Banquet Hall, Hyderabad',
    'YK Associates completed the complete VRF system planning and installation in our grand banquet hall. The cooling is incredibly uniform, and their attention to quiet operation was top notch.',
    true,
    true
  ),
  (
    'Ms. Anita Rao',
    'Apex Office Spaces, Secunderabad',
    'We hired YK Associates for duct design and Chiller system execution. Excellent coordination, neat piping layouts, and professional testing. Highly recommended.',
    true,
    true
  );

-- Insert Projects (Default Seed - marked as DEMO placeholder data)
insert into public.projects (id, name, slug, location, category, hvac_system, capacity, completion_year, short_description, overview, challenge, solution, scope_of_work, cover_image_url, featured, status)
values
  (
    '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    'Grand Royale Convention Center',
    'grand-royale-convention-center',
    'Kondapur, Hyderabad',
    'banquet-hall',
    'Chilled Water System + Air Handling Units',
    '250 TR',
    2024,
    'Design, supply, and execution of a massive centralized chiller system for a 2,500-capacity convention hall.',
    'The project involved setting up a robust air-conditioned network for a double-height premium convention center, requiring detailed acoustic treatments and air-balancing.',
    'High ceiling elevations of 28 feet posed challenges in distributing cold air down to occupier zones without drafts, combined with sudden heat loads when guests entered.',
    'We designed a high-induction nozzle jet diffuser system coupled with twin 125 TR air-cooled scroll chillers. The variable speed air handlers adapt dynamic air distribution depending on real occupancy sensor data.',
    array['Load estimation & duct routing layout design', 'Supply & installation of 2x 125 TR scroll chillers', 'High pressure ducting insulation & testing', 'Jet nozzle installation and acoustic lining', 'Water balancing & commission reports'],
    '/demo-project-convention.jpg',
    true,
    'published'
  ),
  (
    '4a2ceb3f-1d4d-4bc5-9cdd-3b0e7c3eab5a',
    'Vertex Tech Park Offices',
    'vertex-tech-park-offices',
    'HITEC City, Hyderabad',
    'commercial',
    'Variable Refrigerant Flow (VRF) Systems',
    '180 TR',
    2025,
    'Multi-zone VRF HVAC installation for a 4-story software company headquarters.',
    'A premium office workspace requiring separate zone climate controllers to accommodate varying server and workstation heat outputs across levels.',
    'Multiple partitioned meeting zones had to be controlled independently, with structural ceiling restrictions limiting heavy duct network sizes.',
    'Executed a space-saving premium VRF installation utilizing compact ceiling cassette indoor units linked to energy-saving inverter outdoor plants.',
    array['HVAC structural design layout in CAD', 'Installation of VRF cassette units', 'Copper refnet joints layout & pressure testing', 'Installation of smart central touchscreen controllers', 'Testing and air balance calibration'],
    '/demo-project-office.jpg',
    true,
    'published'
  );

-- Insert Project Images
insert into public.project_images (project_id, image_url, alt_text, display_order)
values
  ('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', '/demo-project-convention-1.jpg', 'Air Handling Unit copper connection setup', 1),
  ('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', '/demo-project-convention-2.jpg', 'Ducting layouts on convention floor ceiling', 2),
  ('4a2ceb3f-1d4d-4bc5-9cdd-3b0e7c3eab5a', '/demo-project-office-1.jpg', 'Cassette indoor installations in cafeteria', 1);

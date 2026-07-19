import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProjectForm from '@/components/admin/ProjectForm';

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminEditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  let project: any = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) throw error || new Error('Project not found');
    project = data;
  } catch (error) {
    console.error("Failed to query project by id, using fallback mock for demo id:", error);
    if (id === '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d') {
      project = {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        name: 'Grand Royale Convention Center (Demo)',
        location: 'Hyderabad',
        category: 'banquet-hall',
        hvac_system: 'Chilled Water System',
        capacity: '250 TR',
        completion_year: 2024,
        short_description: 'Design, supply, and execution of a massive centralized chiller system for a 2,500-capacity convention hall.',
        overview: 'The project involved setting up a robust air-conditioned network for a double-height premium convention center.',
        challenge: 'High ceiling elevations of 28 feet posed challenges in distributing cold air down to occupier zones.',
        solution: 'We designed a high-induction nozzle jet diffuser system coupled with twin 125 TR scroll chillers.',
        scope_of_work: ['Load estimation', 'Scroll chiller installation'],
        featured: true,
        status: 'published',
      };
    } else {
      notFound();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-800">Edit Portfolio Case</h1>
        <p className="text-xs text-muted-foreground">Modify completed project variables, description details, or publishing status.</p>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}

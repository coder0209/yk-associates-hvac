import React from 'react';
import ProjectForm from '@/components/admin/ProjectForm';

export default function AdminNewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-800">Add New Case Study</h1>
        <p className="text-xs text-muted-foreground">Log a completed HVAC project in the company portfolio database.</p>
      </div>

      <ProjectForm project={null} />
    </div>
  );
}

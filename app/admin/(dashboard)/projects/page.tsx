import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { deleteProject } from '@/lib/admin-actions';
import { Plus, Briefcase, Trash2, Edit } from 'lucide-react';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  let projects: any[] = [];
  let dbError = false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    projects = data || [];
  } catch (error) {
    console.error("Failed to query projects list:", error);
    dbError = true;
    projects = [
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        name: 'Grand Royale Convention Center (Demo)',
        location: 'Hyderabad',
        category: 'banquet-hall',
        hvac_system: 'Chilled Water System',
        status: 'published',
        created_at: new Date().toISOString(),
      }
    ];
  }

  // Delete Action wrapper to prevent raw forms in server views if needed
  const handleDelete = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    await deleteProject(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800">Projects Portfolio Management</h1>
          <p className="text-xs text-muted-foreground">Add new completed projects, edit scopes of work, and manage case study statuses.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded shadow-sm transition-transform active:scale-98"
        >
          <Plus className="h-4 w-4" />
          <span>ADD NEW CASE</span>
        </Link>
      </div>

      {dbError && (
        <div className="p-3 bg-amber-50 text-amber-800 text-xs font-semibold rounded border border-amber-200">
          Showing local fallback seed projects. Configure database environment variables to edit real dynamic cases.
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Case Study Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">System Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {projects.length > 0 ? (
                projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{proj.name}</div>
                      <span className="text-[10px] text-slate-400 capitalize">{proj.category.replace('-', ' ')}</span>
                    </td>
                    <td className="p-4 text-slate-650">{proj.location}</td>
                    <td className="p-4 text-slate-650">{proj.hvac_system}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                        proj.status === 'published'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="p-4 text-right flex items-center justify-end gap-3 mt-1.5">
                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="p-1.5 border border-slate-350 hover:bg-slate-50 hover:border-slate-400 rounded text-slate-700 inline-flex items-center"
                        title="Edit Project Case"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      
                      <form action={handleDelete} className="inline">
                        <input type="hidden" name="id" value={proj.id} />
                        <button
                          type="submit"
                          onClick={(e) => {
                            if (!confirm("Are you sure you want to delete this case study?")) {
                              e.preventDefault();
                            }
                          }}
                          className="p-1.5 border border-red-200 text-red-500 hover:bg-red-50 rounded"
                          title="Delete Case"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground italic">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Briefcase className="h-8 w-8 text-slate-300" />
                      <p>No projects loaded. Click 'Add New Case' to create your first portfolio study.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

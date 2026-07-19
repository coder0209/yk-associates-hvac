'use strict';

'use client';

import React, { useActionState, useState } from 'react';
import { saveProject } from '@/lib/admin-actions';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  project?: {
    id: string;
    name: string;
    location: string;
    category: string;
    hvac_system: string;
    capacity?: string | null;
    completion_year?: number | null;
    short_description: string;
    overview?: string | null;
    challenge?: string | null;
    solution?: string | null;
    scope_of_work?: string[] | null;
    featured: boolean;
    status: 'draft' | 'published';
  } | null;
}

const CATEGORIES = [
  { label: 'Banquet Hall / Convention Center', value: 'banquet-hall' },
  { label: 'Commercial Building', value: 'commercial' },
  { label: 'Corporate Office', value: 'office' },
  { label: 'Hotel & Hospitality', value: 'hospitality' },
  { label: 'Industrial / Factory', value: 'industrial' },
  { label: 'Residential', value: 'residential' },
  { label: 'Other', value: 'other' },
];

const initialState = {
  success: false,
  error: '',
};

export default function ProjectForm({ project }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(saveProject as any, initialState);
  const [scopeOfWork, setScopeOfWork] = useState(
    project?.scope_of_work ? project.scope_of_work.join(', ') : ''
  );

  return (
    <form action={formAction} className="space-y-6 max-w-4xl bg-white border border-slate-200 p-6 sm:p-8 rounded shadow-sm">
      {project?.id && <input type="hidden" name="id" value={project.id} />}

      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Projects</span>
        </Link>
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          {project?.id ? 'Edit Case Study' : 'Create Case Study'}
        </h2>
      </div>

      {state?.error && (
        <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded border border-red-200">
          {state.error}
        </div>
      )}

      {/* Input Group 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-bold text-slate-450 uppercase">Case Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={project?.name || ''}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            placeholder="e.g. Apex Corporate Office Park"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="location" className="text-xs font-bold text-slate-450 uppercase">Site Location *</label>
          <input
            id="location"
            type="text"
            name="location"
            required
            defaultValue={project?.location || ''}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            placeholder="e.g. Gachibowli, Hyderabad"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="category" className="text-xs font-bold text-slate-450 uppercase">Building Category *</label>
          <select
            id="category"
            name="category"
            required
            defaultValue={project?.category || ''}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
          >
            <option value="">-- Select Category --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="hvacSystem" className="text-xs font-bold text-slate-450 uppercase">HVAC System Type *</label>
          <input
            id="hvacSystem"
            type="text"
            name="hvacSystem"
            required
            defaultValue={project?.hvac_system || ''}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            placeholder="e.g. VRF System / Chiller System"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="capacity" className="text-xs font-bold text-slate-450 uppercase">Capacity / TR</label>
          <input
            id="capacity"
            type="text"
            name="capacity"
            defaultValue={project?.capacity || ''}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            placeholder="e.g. 150 TR (optional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="completionYear" className="text-xs font-bold text-slate-450 uppercase">Completion Year</label>
          <input
            id="completionYear"
            type="number"
            name="completionYear"
            defaultValue={project?.completion_year || ''}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            placeholder="e.g. 2025"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="featured" className="text-xs font-bold text-slate-450 uppercase">Featured Case Toggle</label>
          <select
            id="featured"
            name="featured"
            defaultValue={project?.featured ? 'true' : 'false'}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
          >
            <option value="false">No (Standard Portfolio)</option>
            <option value="true">Yes (Showcase on Homepage)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="status" className="text-xs font-bold text-slate-450 uppercase">Publish Status *</label>
          <select
            id="status"
            name="status"
            required
            defaultValue={project?.status || 'draft'}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
          >
            <option value="draft">Draft (Hidden Publicly)</option>
            <option value="published">Published (Visible Publicly)</option>
          </select>
        </div>
      </div>

      {/* Description fields */}
      <div className="space-y-1.5">
        <label htmlFor="shortDescription" className="text-xs font-bold text-slate-450 uppercase">Short Description Summary *</label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          required
          rows={2}
          defaultValue={project?.short_description || ''}
          className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none resize-none"
          placeholder="Brief 1-2 sentence preview description shown on project grid cards..."
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="overview" className="text-xs font-bold text-slate-450 uppercase">Case Overview & Background</label>
        <textarea
          id="overview"
          name="overview"
          rows={3}
          defaultValue={project?.overview || ''}
          className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none resize-y"
          placeholder="Detailed paragraph introducing project background parameters, false ceiling limitations or timelines..."
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="challenge" className="text-xs font-bold text-slate-450 uppercase">The HVAC Challenge faced</label>
        <textarea
          id="challenge"
          name="challenge"
          rows={3}
          defaultValue={project?.challenge || ''}
          className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none resize-y"
          placeholder="Describe thermal parameters challenge, space heights, acoustic vibration noise issues..."
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="solution" className="text-xs font-bold text-slate-450 uppercase">The Engineered Solution executed</label>
        <textarea
          id="solution"
          name="solution"
          rows={3}
          defaultValue={project?.solution || ''}
          className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none resize-y"
          placeholder="Detail nozzle selection, compressor integration, duct runs layout, noise dampening..."
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="scopeOfWork" className="text-xs font-bold text-slate-450 uppercase">Scope of Work Points</label>
        <input
          id="scopeOfWork"
          type="text"
          name="scopeOfWork"
          value={scopeOfWork}
          onChange={(e) => setScopeOfWork(e.target.value)}
          className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
          placeholder="Comma separated points (e.g. 'Air balancing verification, Splicing refnets, Duct layouts testing')"
        />
        <p className="text-[10px] text-slate-400">Separate scope checkpoints using commas. They will render as a neat grid checklist.</p>
      </div>

      {/* Submit */}
      <div className="pt-2 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded shadow-sm disabled:bg-slate-400 transition-colors"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>SAVING RECORD...</span>
            </>
          ) : (
            <>
              <Save className="h-4.5 w-4.5" />
              <span>SAVE PORTFOLIO CASE</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

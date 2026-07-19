'use strict';

'use client';

import React, { useState, useTransition } from 'react';
import { updateEnquiryStatus, addEnquiryNote, getAttachmentDownloadUrl } from '@/lib/admin-actions';
import { Loader2, FileDown, MessageSquare, Plus, CheckCircle2 } from 'lucide-react';

interface Note {
  id: string;
  note: string;
  created_at: string;
}

interface EnquiryInspectorProps {
  enquiry: {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
    company_name?: string | null;
    location: string;
    project_type: string;
    area?: string | null;
    floors?: number | null;
    stage?: string | null;
    service_required?: string | null;
    description?: string | null;
    attachment_url?: string | null;
    status: string;
    created_at: string;
  };
  initialNotes: Note[];
}

const STATUSES = ['NEW', 'CONTACTED', 'SITE_VISIT', 'QUOTE_SENT', 'WON', 'LOST'];

export default function EnquiryInspector({ enquiry, initialNotes }: EnquiryInspectorProps) {
  const [status, setStatus] = useState(enquiry.status);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState('');
  const [isNotePending, startNoteTransition] = useTransition();
  const [isStatusPending, startStatusTransition] = useTransition();
  const [downloading, setDownloading] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = e.target.value;
    startStatusTransition(async () => {
      const res = await updateEnquiryStatus(enquiry.id, nextStatus);
      if (res.success) {
        setStatus(nextStatus);
      } else {
        alert(res.error || "Failed to update status");
      }
    });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    startNoteTransition(async () => {
      const res = await addEnquiryNote(enquiry.id, newNote);
      if (res.success) {
        setNotes([
          ...notes,
          {
            id: Math.random().toString(),
            note: newNote,
            created_at: new Date().toISOString(),
          },
        ]);
        setNewNote('');
      } else {
        alert(res.error || "Failed to add note");
      }
    });
  };

  const handleDownload = async () => {
    if (!enquiry.attachment_url) return;
    setDownloading(true);
    try {
      const res = await getAttachmentDownloadUrl(enquiry.attachment_url);
      if (res.success && res.url) {
        window.open(res.url, '_blank');
      } else {
        alert(res.error || "Failed to generate file download token");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to download file");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Column 1: Core Details */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 uppercase tracking-wide">
            Lead Parameter Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div>
              <span className="font-semibold block text-slate-400 uppercase tracking-wide mb-1">Company / Organization</span>
              <span className="text-slate-800 text-sm font-medium">{enquiry.company_name || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-semibold block text-slate-400 uppercase tracking-wide mb-1">Project Site Location</span>
              <span className="text-slate-800 text-sm font-medium">{enquiry.location}</span>
            </div>
            <div>
              <span className="font-semibold block text-slate-400 uppercase tracking-wide mb-1">Space Profile Type</span>
              <span className="text-slate-800 text-sm font-medium">{enquiry.project_type}</span>
            </div>
            <div>
              <span className="font-semibold block text-slate-400 uppercase tracking-wide mb-1">Target Service Scope</span>
              <span className="text-slate-800 text-sm font-medium">{enquiry.service_required || 'General Contact'}</span>
            </div>
            <div>
              <span className="font-semibold block text-slate-400 uppercase tracking-wide mb-1">Approx Floor Area</span>
              <span className="text-slate-800 text-sm font-medium">{enquiry.area || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-semibold block text-slate-400 uppercase tracking-wide mb-1">Number of Levels / Floors</span>
              <span className="text-slate-800 text-sm font-medium">{enquiry.floors || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-semibold block text-slate-400 uppercase tracking-wide mb-1">Project Building Stage</span>
              <span className="text-slate-800 text-sm font-medium">{enquiry.stage || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-semibold block text-slate-400 uppercase tracking-wide mb-1">Submission Log Date</span>
              <span className="text-slate-800 text-sm font-medium">
                {new Date(enquiry.created_at).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="font-semibold block text-xs text-slate-400 uppercase tracking-wide">Client Description & Requirements</span>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 border border-slate-200 rounded">
              {enquiry.description || 'No requirements notes provided.'}
            </p>
          </div>

          {/* Private Attachments */}
          {enquiry.attachment_url && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">Seeded Floor Drawing Blueprint</h4>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Secured privately. Press download to fetch temporary access token link.
                </p>
              </div>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary hover:bg-secondary-hover text-white text-xs font-bold rounded shadow-sm disabled:bg-slate-400 transition-colors"
              >
                {downloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>DECRYPTING...</span>
                  </>
                ) : (
                  <>
                    <FileDown className="h-4.5 w-4.5" />
                    <span>DOWNLOAD FILE</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Notes Log */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Internal Coordinator Logs</span>
          </h3>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 divide-y divide-slate-150">
            {notes.length > 0 ? (
              notes.map((note) => (
                <div key={note.id} className="pt-3 first:pt-0">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-1">
                    <span>ADMINISTRATOR ADVISOR</span>
                    <span>{new Date(note.created_at).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 p-2.5 rounded border border-slate-200/60">
                    {note.note}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground italic">No internal administrative notes have been logged for this lead yet.</p>
            )}
          </div>

          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="space-y-3 pt-4 border-t border-slate-100">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Type internal notes here (e.g. 'Spoke to Rajesh, scheduled site audit check for next Tuesday morning...')"
              rows={3}
              required
              className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:outline-none focus:border-secondary resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isNotePending}
                className="inline-flex items-center gap-1 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded shadow-sm disabled:bg-slate-400"
              >
                {isNotePending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
                <span>ADD LOG NOTE</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Column 2: Status Panel */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white border border-slate-200 p-6 rounded shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 uppercase tracking-wide">
            Lead Status Controls
          </h3>

          <div className="space-y-2">
            <label htmlFor="status" className="text-xs font-bold text-slate-400 block uppercase">Modify Pipeline Stage</label>
            <div className="relative">
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                disabled={isStatusPending}
                className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:outline-none focus:border-secondary disabled:bg-slate-100 font-bold uppercase tracking-wider text-slate-700"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.replace('_', ' ')}
                  </option>
                ))}
              </select>
              {isStatusPending && (
                <div className="absolute right-3.5 top-3">
                  <Loader2 className="h-4.5 w-4.5 animate-spin text-slate-400" />
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] text-muted-foreground leading-normal space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-650">
              <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0" />
              <span>Pipeline Stage Info</span>
            </div>
            <p>
              Updating the dropdown automatically refreshes the log data. Ensure status stages align with real outreach checkpoints.
            </p>
          </div>
        </div>

        {/* Customer Profile Call Cards */}
        <div className="bg-white border border-slate-200 p-6 rounded shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
            Client Profile
          </h3>
          <div className="text-xs leading-normal space-y-1">
            <span className="font-semibold block text-slate-400">Client Name</span>
            <span className="text-slate-850 font-bold text-sm block">{enquiry.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 text-center font-bold text-xs">
            <a
              href={`tel:${enquiry.phone}`}
              className="py-2 border border-slate-350 hover:bg-slate-50 hover:border-slate-400 rounded text-slate-700"
            >
              Call Phone
            </a>
            <a
              href={`https://wa.me/${enquiry.phone.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

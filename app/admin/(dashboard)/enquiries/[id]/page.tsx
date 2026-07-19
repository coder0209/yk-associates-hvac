import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import EnquiryInspector from '@/components/admin/EnquiryInspector';

interface EnquiryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const revalidate = 0;

export default async function AdminEnquiryDetailPage({ params }: EnquiryPageProps) {
  const { id } = await params;
  let enquiry: any = null;
  let notes: any[] = [];

  try {
    const supabase = await createClient();

    // Query enquiry details
    const { data: enq, error: enqError } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (enqError || !enq) {
      console.warn("Failed to find enquiry, redirecting/throwing error:", enqError?.message);
      throw enqError || new Error("Not found");
    }
    enquiry = enq;

    // Query enquiry notes
    const { data: enqNotes } = await supabase
      .from('enquiry_notes')
      .select('id, note, created_at')
      .eq('enquiry_id', id)
      .order('created_at', { ascending: true });

    notes = enqNotes || [];

  } catch (error) {
    console.error("Failed to query details from database, executing fallback data:", error);
    // Graceful placeholder fallback if db is unconfigured
    if (id === '1') {
      enquiry = {
        id: '1',
        name: 'Grand Palace Convention Center (Demo)',
        phone: '+91 98765 43210',
        email: 'rajesh@palace.com',
        location: 'Hyderabad',
        project_type: 'Banquet Hall',
        service_required: 'Complete HVAC Solution',
        area: '15,000 sq ft',
        floors: 2,
        stage: 'Planning',
        description: 'Need a centralized water chiller network planning for a double-height grand convention space.',
        attachment_url: null,
        status: 'NEW',
        created_at: new Date().toISOString(),
      };
      notes = [
        { id: 'n1', note: 'Created this demo check note to verify coordinate setups.', created_at: new Date().toISOString() }
      ];
    } else {
      notFound();
    }
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <Link
          href="/admin/enquiries"
          className="text-xs font-semibold text-secondary hover:underline"
        >
          &larr; Return to Leads Dashboard
        </Link>
        <h1 className="text-2xl font-black tracking-tight text-slate-800">
          Enquiry: {enquiry.name}
        </h1>
        <p className="text-xs text-muted-foreground">
          Inspect client parameters, manage communications status, and review coordinator notes.
        </p>
      </div>

      {/* Enquiry inspector body */}
      <EnquiryInspector enquiry={enquiry} initialNotes={notes} />
    </div>
  );
}

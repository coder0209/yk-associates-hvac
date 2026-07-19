import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { PhoneCall } from 'lucide-react';

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  let enquiries: any[] = [];
  let dbError = false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    enquiries = data || [];
  } catch (error) {
    console.error("Failed to query enquiries table:", error);
    dbError = true;
    // Fallback seed enquiry
    enquiries = [
      {
        id: '1',
        name: 'Grand Palace Convention Center (Demo)',
        phone: '+91 98765 43210',
        email: 'rajesh@palace.com',
        location: 'Hyderabad',
        project_type: 'Banquet Hall',
        service_required: 'Complete HVAC Solution',
        status: 'NEW',
        created_at: new Date().toISOString(),
      }
    ];
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800">HVAC Leads & Enquiries</h1>
          <p className="text-xs text-muted-foreground">Monitor and track incoming quote requests and contact messages from potential clients.</p>
        </div>
      </div>

      {dbError && (
        <div className="p-3 bg-amber-50 text-amber-800 text-xs font-semibold rounded border border-amber-200">
          Note: Currently showing fallback demo enquiries. Check database environment keys if this is unexpected.
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Submission Date</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Project Parameters</th>
                <th className="p-4">Required Scope</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {enquiries.length > 0 ? (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/50">
                    <td className="p-4 whitespace-nowrap text-slate-400">
                      {new Date(enq.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{enq.name}</div>
                      <div className="text-slate-450 mt-0.5">{enq.phone}</div>
                      {enq.email && <div className="text-[10px] text-slate-400">{enq.email}</div>}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{enq.project_type}</div>
                      <div className="text-slate-400 text-[10px]">{enq.location}</div>
                    </td>
                    <td className="p-4 text-slate-650 font-medium">
                      {enq.service_required || 'General Contact'}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                        enq.status === 'NEW'
                          ? 'bg-red-50 text-primary border-primary/20'
                          : enq.status === 'WON'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/enquiries/${enq.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-350 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-semibold rounded text-[11px]"
                      >
                        Inspect Lead
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-muted-foreground italic">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <PhoneCall className="h-8 w-8 text-slate-300" />
                      <p>No customer enquiries have been logged yet.</p>
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

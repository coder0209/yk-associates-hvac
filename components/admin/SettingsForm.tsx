'use strict';

'use client';

import React, { useState, useTransition } from 'react';
import { saveSiteSettings } from '@/lib/admin-actions';
import { Loader2, Save } from 'lucide-react';

interface SettingsFormProps {
  settings: {
    company_name: string;
    tagline: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    google_maps_url: string;
  };
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const [companyName, setCompanyName] = useState(settings.company_name);
  const [tagline, setTagline] = useState(settings.tagline);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [mapsUrl, setMapsUrl] = useState(settings.google_maps_url);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveSiteSettings({
        company_name: companyName,
        tagline,
        phone,
        whatsapp,
        email,
        address,
        google_maps_url: mapsUrl,
      });

      if (res.success) {
        alert("Website settings updated successfully!");
      } else {
        alert(res.error || "Failed to save settings");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white border border-slate-200 p-6 sm:p-8 rounded shadow-sm">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Company Details & Branding Config
        </h3>
      </div>

      {/* Grid 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="companyName" className="text-xs font-bold text-slate-450 uppercase">Company Name</label>
          <input
            id="companyName"
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="tagline" className="text-xs font-bold text-slate-450 uppercase">Tagline / Slogan</label>
          <input
            id="tagline"
            type="text"
            required
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      {/* Grid 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-bold text-slate-450 uppercase">Call Support Number</label>
          <input
            id="phone"
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="whatsapp" className="text-xs font-bold text-slate-450 uppercase">WhatsApp Sourcing Number</label>
          <input
            id="whatsapp"
            type="text"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-bold text-slate-450 uppercase">Official Business Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="address" className="text-xs font-bold text-slate-450 uppercase">Physical Office Address</label>
        <textarea
          id="address"
          required
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="mapsUrl" className="text-xs font-bold text-slate-450 uppercase">Google Maps coordinates Anchor URL</label>
        <input
          id="mapsUrl"
          type="url"
          required
          value={mapsUrl}
          onChange={(e) => setMapsUrl(e.target.value)}
          className="w-full text-xs border border-slate-250 bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
        />
      </div>

      <div className="pt-2 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded shadow-sm disabled:bg-slate-400 transition-colors"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>SAVING CONFIG...</span>
            </>
          ) : (
            <>
              <Save className="h-4.5 w-4.5" />
              <span>SAVE SETTINGS</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

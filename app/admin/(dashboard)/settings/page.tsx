import React from 'react';
import { getSiteSettings } from '@/lib/data';
import SettingsForm from '@/components/admin/SettingsForm';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-800">Website Global Config</h1>
        <p className="text-xs text-muted-foreground">Manage official support phone lines, company tagline values, map pointers, and address profiles.</p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}

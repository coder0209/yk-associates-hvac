import React from 'react';
import { COMPANY_NAME } from '@/lib/config';

export const metadata = {
  title: `Privacy Policy | ${COMPANY_NAME}`,
  description: `Privacy policy for ${COMPANY_NAME} HVAC contracting services.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-foreground mb-6">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground mb-4">Effective Date: July 19, 2026</p>
      
      <div className="prose prose-sm max-w-none text-slate-600 space-y-4">
        <p>
          At <strong>{COMPANY_NAME}</strong>, we are committed to protecting your privacy. This policy outlines how we collect, handle, and store user-provided information, including contact details and structural drawings submitted via our Request a Quote or Contact forms.
        </p>

        <h2 className="text-lg font-bold text-foreground pt-4">1. Information Collection</h2>
        <p>
          We collect details you explicitly submit: Name, Phone Number, Email, Company, Project location, building specification data, and files representing floor drawings/layouts.
        </p>

        <h2 className="text-lg font-bold text-foreground pt-4">2. File Upload Protection</h2>
        <p>
          All structural drawings, layout plans, and specifications uploaded via the Quote request form are stored on protected, private database storage nodes. These files are not indexable by search engines or accessible via public URLs. They are strictly accessed only by authenticated engineers inside our contracting division to draft estimations.
        </p>

        <h2 className="text-lg font-bold text-foreground pt-4">3. Data Sharing</h2>
        <p>
          We do not sell, distribute, or leak your personal details or building drawings to third-party marketing companies. Data is used solely for responding to your contracting enquiry.
        </p>

        <h2 className="text-lg font-bold text-foreground pt-4">4. Cookies & Analytics</h2>
        <p>
          We may collect anonymous analytics data to understand how visitors interact with our portfolio case studies, click-to-call, and WhatsApp CTAs, which helps us optimize user interface performance.
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { COMPANY_NAME } from '@/lib/config';

export const metadata = {
  title: `Terms & Disclaimers | ${COMPANY_NAME}`,
  description: `Terms and Disclaimers for ${COMPANY_NAME} website.`,
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-foreground mb-6">Terms & Disclaimers</h1>
      
      <div className="prose prose-sm max-w-none text-slate-600 space-y-4">
        <p>
          Welcome to the website of <strong>{COMPANY_NAME}</strong>. By accessing this site, you agree to comply with the terms and disclaimers outlined below.
        </p>

        <h2 className="text-lg font-bold text-foreground pt-4">1. Information Accuracy</h2>
        <p>
          While we make every effort to display accurate engineering metrics, brand representations, and completed project case studies, some elements may contain approximate estimates. The information on this site is provided for general guidance only and does not constitute a legally binding service warranty.
        </p>

        <h2 className="text-lg font-bold text-foreground pt-4">2. Neutral Association Disclosure</h2>
        <p>
          Reference to third-party manufacturer brand names (such as Daikin, Carrier, Blue Star, Mitsubishi, etc.) and logos is intended solely to indicate that {COMPANY_NAME} can procure and install these equipment ranges. Unless explicitly verified, such references do not imply official partnership, authorized dealership status, or exclusive certification by the brand owners.
        </p>

        <h2 className="text-lg font-bold text-foreground pt-4">3. Limitation of Liability</h2>
        <p>
          {COMPANY_NAME} is not liable for structural changes, cooling modifications, or project delays resulting from reliance on the placeholder numbers, specifications, or descriptions provided on this public website. Actual contracting terms are strictly governed by formal written bilateral agreements.
        </p>
      </div>
    </div>
  );
}

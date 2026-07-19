'use strict';

'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import { submitEnquiry } from '@/lib/actions';
import { Loader2, Upload, FileCheck, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const PROJECT_TYPES = [
  { label: 'Banquet & Convention Hall', value: 'Banquet Hall' },
  { label: 'Commercial Building', value: 'Commercial Building' },
  { label: 'Corporate Office', value: 'Office' },
  { label: 'Hotel & Hospitality Property', value: 'Hotel' },
  { label: 'Restaurant / Cafe', value: 'Restaurant' },
  { label: 'Industrial / Factory', value: 'Industrial' },
  { label: 'Residential Project', value: 'Residential' },
  { label: 'Healthcare / Institutional', value: 'Healthcare' },
  { label: 'Other Space Profile', value: 'Other' },
];

const STAGES = [
  { label: 'Planning & Layout Sizing', value: 'Planning' },
  { label: 'Under Construction (Core Shell)', value: 'Under Construction' },
  { label: 'Renovation & Refurbishment', value: 'Renovation' },
  { label: 'Existing Operational Building', value: 'Existing Building' },
  { label: 'Other Stage', value: 'Other' },
];

const SERVICES = [
  { label: 'HVAC Design & Load Planning', value: 'HVAC Design' },
  { label: 'Equipment Sourcing & Supply Only', value: 'Supply' },
  { label: 'HVAC Ducting & Field Installation', value: 'Installation' },
  { label: 'Turnkey Design + Supply + Execution', value: 'Complete HVAC Solution' },
  { label: 'Ventilation & Fresh Air Exhaust', value: 'Ventilation' },
  { label: 'AMC & System Maintenance', value: 'Maintenance' },
  { label: 'Other Sizing Sourcing Need', value: 'Other' },
];

const initialState = {
  success: false,
  message: '',
  error: '',
};

export default function QuoteForm() {
  const [state, formAction, isPending] = useActionState(submitEnquiry as any, initialState);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.8 },
      });
      setFile(null);
      formRef.current?.reset();
    }
  }, [state]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 bg-card border border-border p-6 sm:p-10 rounded shadow-sm"
    >
      <input type="hidden" name="formType" value="quote" />

      {/* Success Banner */}
      {state?.success && state?.message && (
        <div className="p-4 bg-green-50 text-green-800 text-xs font-semibold rounded border border-green-200">
          {state.message}
        </div>
      )}

      {/* Error Banner */}
      {state?.error && (
        <div className="p-4 bg-red-50 text-red-800 text-xs font-semibold rounded border border-red-200">
          {state.error}
        </div>
      )}

      {/* Section 1: Customer Contact details */}
      <div>
        <h3 className="text-base font-bold text-foreground border-b border-border pb-2 mb-4 uppercase tracking-wide">
          1. Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-bold text-slate-450 uppercase">Full Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
              placeholder="Enter full name"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-bold text-slate-450 uppercase">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              required
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold text-slate-450 uppercase">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
              placeholder="name@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="companyName" className="text-xs font-bold text-slate-450 uppercase">Company Name</label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
              placeholder="Enter company name (optional)"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Project Parameters */}
      <div className="pt-4">
        <h3 className="text-base font-bold text-foreground border-b border-border pb-2 mb-4 uppercase tracking-wide">
          2. HVAC Project Parameters
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="location" className="text-xs font-bold text-slate-450 uppercase">Project Site Location *</label>
            <input
              id="location"
              type="text"
              name="location"
              required
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
              placeholder="City, Area"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="projectType" className="text-xs font-bold text-slate-450 uppercase">Building / Space Profile *</label>
            <select
              id="projectType"
              name="projectType"
              required
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            >
              <option value="">-- Select Space Profile --</option>
              {PROJECT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="space-y-1.5">
            <label htmlFor="area" className="text-xs font-bold text-slate-450 uppercase">Approx Floor Area (Sq.Ft)</label>
            <input
              id="area"
              type="text"
              name="area"
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
              placeholder="e.g. 5,000 sq ft"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="floors" className="text-xs font-bold text-slate-450 uppercase">Number of Floors</label>
            <input
              id="floors"
              type="number"
              name="floors"
              min={1}
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
              placeholder="e.g. 2"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="stage" className="text-xs font-bold text-slate-450 uppercase">Project Construction Stage *</label>
            <select
              id="stage"
              name="stage"
              required
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            >
              <option value="">-- Select Stage --</option>
              {STAGES.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="space-y-1.5">
            <label htmlFor="serviceRequired" className="text-xs font-bold text-slate-450 uppercase">Contracting Scope Needed *</label>
            <select
              id="serviceRequired"
              name="serviceRequired"
              required
              className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            >
              <option value="">-- Select Service Scope --</option>
              {SERVICES.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Layout Document upload */}
      <div className="pt-4">
        <h3 className="text-base font-bold text-foreground border-b border-border pb-2 mb-4 uppercase tracking-wide">
          3. Upload Blueprints & Layout drawings
        </h3>
        
        <div className="border border-dashed border-border p-6 rounded text-center bg-muted/30 flex flex-col items-center justify-center relative">
          <input
            type="file"
            name="attachment"
            id="attachment"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          {file ? (
            <div className="space-y-2">
              <FileCheck className="h-10 w-10 text-primary mx-auto" />
              <p className="text-sm font-semibold text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">({(file.size / (1024 * 1024)).toFixed(2)} MB)</p>
              <button 
                type="button" 
                onClick={() => setFile(null)} 
                className="text-xs text-primary hover:underline font-bold"
              >
                Remove File
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-10 w-10 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-foreground">Click to select files</p>
              <p className="text-xs text-muted-foreground">PDF, PNG, JPG, JPEG (Max Size 10MB)</p>
            </div>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground leading-normal mt-2">
          Note: Customer uploads are stored on a private, RLS-secured storage server and are accessible only to authenticated engineers for assessment purposes.
        </p>
      </div>

      {/* Section 4: Specifications & Notes */}
      <div className="space-y-1.5">
        <label htmlFor="description" className="text-xs font-bold text-slate-450 uppercase">Scope Description & Notes</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none resize-y"
          placeholder="Please add any special notes, heat loads, brand preferences, or false ceiling clearance restrictions..."
        />
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="consentGiven"
          name="consentGiven"
          value="true"
          required
          className="h-4.5 w-4.5 text-primary border-border bg-background rounded focus:ring-primary focus:outline-none mt-0.5"
        />
        <label htmlFor="consentGiven" className="text-xs text-muted-foreground leading-normal select-none">
          I agree that the information submitted may be used to contact me regarding this contracting enquiry. *
        </label>
      </div>

      {/* Captcha Verify */}
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div className="flex justify-center pt-2">
          <div 
            className="cf-turnstile" 
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            data-theme="light"
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded bg-primary text-white text-sm font-bold hover:bg-primary-hover shadow active:translate-y-[1px] disabled:bg-slate-400 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>PROCESSING SUBMISSION...</span>
            </>
          ) : (
            <span>SUBMIT REQUEST</span>
          )}
        </button>
      </div>
    </form>
  );
}

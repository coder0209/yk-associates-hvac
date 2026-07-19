'use strict';

'use client';

import React, { useActionState, useEffect, useRef } from 'react';
import { submitEnquiry } from '@/lib/actions';
import { Loader2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const PROJECT_TYPES = [
  'Banquet Hall / Convention Center',
  'Commercial Building',
  'Corporate Office',
  'Hotel / Hospitality Property',
  'Restaurant / Cafe',
  'Industrial Facility / Factory',
  'Residential / Premium Villa',
  'Healthcare / Clinic',
  'Other Space Type',
];

const initialState = {
  success: false,
  message: '',
  error: '',
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitEnquiry as any, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      // Trigger interactive confetti on success
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
      // Reset form fields
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-5 bg-card border border-border p-6 sm:p-8 rounded shadow-sm relative overflow-hidden"
    >
      <input type="hidden" name="formType" value="contact" />

      <h3 className="text-xl font-bold text-foreground mb-1 tracking-wide">Send an Enquiry</h3>
      <p className="text-xs text-muted-foreground mb-6">
        Provide your details and requirements. Our engineering coordinators will reach out.
      </p>

      {/* Success Notification */}
      {state?.success && state?.message && (
        <div className="p-4 bg-green-50 text-green-800 text-xs font-semibold rounded border border-green-200">
          {state.message}
        </div>
      )}

      {/* Error Notification */}
      {state?.error && (
        <div className="p-4 bg-red-50 text-red-800 text-xs font-semibold rounded border border-red-200">
          {state.error}
        </div>
      )}

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-bold text-slate-450 uppercase">Full Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            placeholder="John Doe"
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
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-bold text-slate-450 uppercase">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="location" className="text-xs font-bold text-slate-450 uppercase">Project Location *</label>
          <input
            id="location"
            type="text"
            name="location"
            required
            className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
            placeholder="Gachibowli, Hyderabad"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="projectType" className="text-xs font-bold text-slate-450 uppercase">Project Category *</label>
        <select
          id="projectType"
          name="projectType"
          required
          className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none"
        >
          <option value="">-- Select Project Category --</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-bold text-slate-450 uppercase">Message & Requirements *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full text-sm border border-border bg-background p-2.5 rounded focus:border-secondary focus:outline-none resize-y"
          placeholder="Briefly describe your building layouts, false ceiling depths or special cooling requirements..."
        />
      </div>

      {/* Cloudflare Turnstile anchor */}
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div className="flex justify-center pt-2">
          <div 
            className="cf-turnstile" 
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            data-theme="light"
          />
        </div>
      )}

      {/* Submission Submit CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-3 rounded bg-primary text-white text-sm font-bold hover:bg-primary-hover shadow-sm active:translate-y-[1px] disabled:bg-slate-400 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>SUBMITTING ENQUIRY...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>SEND ENQUIRY</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

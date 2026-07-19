'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { contactSchema, quoteSchema } from '@/lib/validation/schemas';
import { sendNotificationEmail } from '@/lib/mail';
import { COMPANY_NAME } from '@/lib/config';

// Verify Cloudflare Turnstile token
async function verifyTurnstile(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true; // Bypass verification if secret key is not set

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      }
    );
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

export async function submitEnquiry(prevState: any, formData: FormData) {
  const formType = formData.get('formType') as string;
  const turnstileToken = formData.get('cf-turnstile-response') as string;

  // Verify Captcha
  if (turnstileToken) {
    const isHuman = await verifyTurnstile(turnstileToken);
    if (!isHuman) {
      return { success: false, error: 'Anti-spam validation failed. Please try again.' };
    }
  }

  // Supabase client (Server)
  const supabase = await createClient();

  if (formType === 'contact') {
    // 1. Process Contact Form
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const location = formData.get('location') as string;
    const projectType = formData.get('projectType') as string;
    const message = formData.get('message') as string;

    const parsed = contactSchema.safeParse({ name, phone, email, location, projectType, message });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert({
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email || null,
          location: parsed.data.location,
          project_type: parsed.data.projectType,
          description: parsed.data.message,
          consent_given: true,
          status: 'NEW',
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger Notification Email
      await sendNotificationEmail({
        subject: `New Contact Enquiry from ${parsed.data.name} - YK Associates`,
        html: `
          <h3>New HVAC Contact Enquiry</h3>
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Phone:</strong> ${parsed.data.phone}</p>
          <p><strong>Email:</strong> ${parsed.data.email || 'Not provided'}</p>
          <p><strong>Location:</strong> ${parsed.data.location}</p>
          <p><strong>Project Type:</strong> ${parsed.data.projectType}</p>
          <p><strong>Message:</strong> ${parsed.data.message}</p>
          <hr />
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/enquiries/${data.id}">View details in Admin Dashboard</a></p>
        `,
      });

      return { success: true, message: 'Your enquiry has been submitted. Our team will contact you shortly.' };
    } catch (e: any) {
      console.error("Enquiry save error:", e);
      return { success: false, error: 'Something went wrong. Please try again later.' };
    }

  } else if (formType === 'quote') {
    // 2. Process Quote Request
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const companyName = formData.get('companyName') as string;
    const location = formData.get('location') as string;
    const projectType = formData.get('projectType') as string;
    const area = formData.get('area') as string;
    const floors = formData.get('floors') as string;
    const stage = formData.get('stage') as string;
    const serviceRequired = formData.get('serviceRequired') as string;
    const description = formData.get('description') as string;
    const consentGiven = formData.get('consentGiven') === 'true';

    const parsed = quoteSchema.safeParse({
      name, phone, email, companyName, location, projectType, area, floors, stage, serviceRequired, description, consentGiven
    });

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    // Handle File Upload if provided
    const file = formData.get('attachment') as File | null;
    let attachmentUrl: string | null = null;

    if (file && file.size > 0) {
      // Security audits
      const allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedMimeTypes.includes(file.type)) {
        return { success: false, error: 'Invalid file format. Only PDF, PNG, and JPEG formats are supported.' };
      }
      if (file.size > 10 * 1024 * 1024) {
        return { success: false, error: 'File size exceeds maximum limit of 10MB.' };
      }

      try {
        const adminSupabase = await createAdminClient(); // Bypasses RLS to write to private bucket
        const fileExt = file.name.split('.').pop();
        const uniqueId = Math.random().toString(36).substring(2, 9);
        const fileName = `${Date.now()}_${uniqueId}.${fileExt}`;
        const filePath = `quotes/${fileName}`;

        // Convert file array buffer to Buffer for upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await adminSupabase.storage
          .from('enquiry-attachments')
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (uploadError) throw uploadError;
        attachmentUrl = filePath;
      } catch (uploadErr) {
        console.error("Storage upload failed:", uploadErr);
        return { success: false, error: 'Failed to upload attachment. Please try again.' };
      }
    }

    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert({
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email || null,
          company_name: parsed.data.companyName || null,
          location: parsed.data.location,
          project_type: parsed.data.projectType,
          area: parsed.data.area || null,
          floors: parsed.data.floors || null,
          stage: parsed.data.stage,
          service_required: parsed.data.serviceRequired,
          description: parsed.data.description || null,
          attachment_url: attachmentUrl,
          consent_given: true,
          status: 'NEW',
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger notification email
      await sendNotificationEmail({
        subject: `New HVAC Quote Request from ${parsed.data.name} - YK Associates`,
        html: `
          <h3>New HVAC Quote Request Details</h3>
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Phone:</strong> ${parsed.data.phone}</p>
          <p><strong>Email:</strong> ${parsed.data.email || 'Not provided'}</p>
          <p><strong>Company:</strong> ${parsed.data.companyName || 'Not provided'}</p>
          <p><strong>Project Location:</strong> ${parsed.data.location}</p>
          <p><strong>Building/Project Type:</strong> ${parsed.data.projectType}</p>
          <p><strong>Approx Area:</strong> ${parsed.data.area || 'Not provided'}</p>
          <p><strong>Number of Floors:</strong> ${parsed.data.floors || 'Not provided'}</p>
          <p><strong>Project Stage:</strong> ${parsed.data.stage}</p>
          <p><strong>Required Service:</strong> ${parsed.data.serviceRequired}</p>
          <p><strong>Project Description:</strong> ${parsed.data.description || 'Not provided'}</p>
          <p><strong>File Attached:</strong> ${attachmentUrl ? 'Yes' : 'No'}</p>
          <hr />
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/enquiries/${data.id}">View full details and manage this lead in Admin Dashboard</a></p>
        `,
      });

      return { success: true, message: 'Your quote request has been submitted successfully. Our engineers will review your files.' };
    } catch (dbErr) {
      console.error("Database save failed:", dbErr);
      return { success: false, error: 'Database submission failed. Please try again.' };
    }
  }

  return { success: false, error: 'Invalid form submission' };
}

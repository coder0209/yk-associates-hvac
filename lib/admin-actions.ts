'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/utils';

// 1. Admin Auth Login
export async function loginAdmin(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login attempt failed:", error.message);
    return { success: false, error: 'Invalid email or password.' };
  }

  return redirect('/admin');
}

// 2. Admin Auth Logout
export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/admin/login');
}

// Helper to assert authentication in Server Actions
async function assertAuth() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error('Unauthorized access');
  }
  return { supabase, user };
}

// 3. Update Enquiry Status
export async function updateEnquiryStatus(enquiryId: string, status: string) {
  try {
    const { supabase } = await assertAuth();
    const { error } = await supabase
      .from('enquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', enquiryId);

    if (error) throw error;
    revalidatePath('/admin/enquiries');
    revalidatePath(`/admin/enquiries/${enquiryId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update status:", error);
    return { success: false, error: error.message };
  }
}

// 4. Add Enquiry Note
export async function addEnquiryNote(enquiryId: string, noteText: string) {
  try {
    const { supabase, user } = await assertAuth();
    const { error } = await supabase
      .from('enquiry_notes')
      .insert({
        enquiry_id: enquiryId,
        author_id: user.id,
        note: noteText,
      });

    if (error) throw error;
    revalidatePath(`/admin/enquiries/${enquiryId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add note:", error);
    return { success: false, error: error.message };
  }
}

// 5. Generate Signed URL for Private attachments
export async function getAttachmentDownloadUrl(filePath: string) {
  try {
    await assertAuth(); // Guard access
    const adminSupabase = await createAdminClient(); // Bypasses RLS to generate URL

    const { data, error } = await adminSupabase.storage
      .from('enquiry-attachments')
      .createSignedUrl(filePath, 300); // URL valid for 5 minutes

    if (error) throw error;
    return { success: true, url: data.signedUrl };
  } catch (error: any) {
    console.error("Failed to generate signed url:", error);
    return { success: false, error: error.message };
  }
}

// 6. Save (Create/Update) Project
export async function saveProject(formData: FormData) {
  try {
    const { supabase } = await assertAuth();
    const id = formData.get('id') as string | null;
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;
    const category = formData.get('category') as string;
    const hvacSystem = formData.get('hvacSystem') as string;
    const capacity = formData.get('capacity') as string;
    const completionYear = Number(formData.get('completionYear'));
    const shortDescription = formData.get('shortDescription') as string;
    const overview = formData.get('overview') as string;
    const challenge = formData.get('challenge') as string;
    const solution = formData.get('solution') as string;
    const featured = formData.get('featured') === 'true';
    const status = formData.get('status') as 'draft' | 'published';
    const scopeOfWorkRaw = formData.get('scopeOfWork') as string; // Comma separated values
    const scopeOfWork = scopeOfWorkRaw ? scopeOfWorkRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

    const slug = slugify(name);

    const projectData = {
      name,
      slug,
      location,
      category,
      hvac_system: hvacSystem,
      capacity: capacity || null,
      completion_year: completionYear || null,
      short_description: shortDescription,
      overview: overview || null,
      challenge: challenge || null,
      solution: solution || null,
      scope_of_work: scopeOfWork,
      featured,
      status,
      cover_image_url: '/demo-project-convention.jpg', // Fallback cover image
      updated_at: new Date().toISOString(),
    };

    if (id) {
      // Update
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id);
      if (error) throw error;
    } else {
      // Create
      const { error } = await supabase
        .from('projects')
        .insert({
          ...projectData,
          id: undefined, // Let DB generate UUID
        });
      if (error) throw error;
    }

    revalidatePath('/projects');
    revalidatePath(`/projects/${slug}`);
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save project:", error);
    return { success: false, error: error.message };
  }
}

// 7. Delete Project
export async function deleteProject(id: string) {
  try {
    const { supabase } = await assertAuth();
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete project:", error);
    return { success: false, error: error.message };
  }
}

// 8. Save Website settings
export async function saveSiteSettings(settings: any) {
  try {
    const { supabase } = await assertAuth();
    const { error } = await supabase
      .from('site_settings')
      .update({
        company_name: settings.company_name,
        tagline: settings.tagline,
        phone: settings.phone,
        whatsapp: settings.whatsapp,
        email: settings.email,
        address: settings.address,
        google_maps_url: settings.google_maps_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);

    if (error) throw error;
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidatePath('/admin/settings');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save settings:", error);
    return { success: false, error: error.message };
  }
}

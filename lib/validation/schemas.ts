import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  email: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  location: z.string().min(2, { message: 'Location is required' }),
  projectType: z.string().min(1, { message: 'Please select a project type' }),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' }),
  turnstileToken: z.string().optional(),
});

export const quoteSchema = z.object({
  name: z.string().min(2, { message: 'Full name is required' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  email: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  companyName: z.string().optional(),
  location: z.string().min(2, { message: 'Project location is required' }),
  projectType: z.string().min(1, { message: 'Please select building/project type' }),
  area: z.string().optional(),
  floors: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().min(1).optional()
  ),
  stage: z.string().min(1, { message: 'Please select project stage' }),
  serviceRequired: z.string().min(1, { message: 'Please select required service' }),
  description: z.string().optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: 'You must consent to be contacted regarding this enquiry',
  }),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;

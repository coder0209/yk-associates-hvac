import { Resend } from 'resend';

// Graceful email client initialization
function getMailClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export interface SendMailParams {
  subject: string;
  html: string;
}

export async function sendNotificationEmail({ subject, html }: SendMailParams) {
  try {
    const resend = getMailClient();
    const toEmail = process.env.NOTIFICATION_TO_EMAIL || 'info@ykassociates.in';

    if (!resend) {
      console.warn("Mail config missing (RESEND_API_KEY is not defined). Email log summary below:");
      console.log(`To: ${toEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body Snippet: ${html.substring(0, 300)}...`);
      return { success: true, mocked: true };
    }

    const { data, error } = await resend.emails.send({
      from: 'YK Associates CMS <onboarding@resend.dev>', // Resend default verified sender
      to: toEmail,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Resend delivery failed:", error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Mail trigger error:", error);
    return { success: false, error };
  }
}

import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = 'contact@lampstand.consulting';
const FROM_EMAIL = 'noreply@explorehull.com'; // This will need to be verified domain

let resend: Resend | null = null;

// Initialize Resend only if API key is available
if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY);
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using Resend
 * Falls back gracefully if Resend is not configured
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!resend) {
    console.warn('[Email] Resend not configured - email not sent');
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (error) {
      console.error('[Email] Failed to send email:', error);
      return false;
    }

    console.log('[Email] Email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('[Email] Error sending email:', error);
    return false;
  }
}

/**
 * Send contact form submission to contact@lampstand.consulting
 */
export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const html = `
    <h2>New Contact Form Submission from ExploreHull.com</h2>
    
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    
    <h3>Message:</h3>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
    
    <hr>
    <p><small>This message was sent via the ExploreHull.com contact form.</small></p>
  `;

  const text = `
New Contact Form Submission from ExploreHull.com

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent via the ExploreHull.com contact form.
  `;

  return await sendEmail({
    to: CONTACT_EMAIL,
    subject: `ExploreHull Contact: ${data.subject}`,
    html,
    text,
  });
}

/**
 * Send partnership inquiry to contact@lampstand.consulting
 */
export async function sendPartnershipEmail(data: {
  organizationName: string;
  contactName: string;
  email: string;
  phone?: string;
  partnershipType: string;
  proposal: string;
}): Promise<boolean> {
  const html = `
    <h2>New Partnership Inquiry from ExploreHull.com</h2>
    
    <p><strong>Organization:</strong> ${data.organizationName}</p>
    <p><strong>Contact Name:</strong> ${data.contactName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    <p><strong>Partnership Type:</strong> ${data.partnershipType}</p>
    
    <h3>Proposal:</h3>
    <p>${data.proposal.replace(/\n/g, '<br>')}</p>
    
    <hr>
    <p><small>This partnership inquiry was submitted via the ExploreHull.com Partner page.</small></p>
  `;

  const text = `
New Partnership Inquiry from ExploreHull.com

Organization: ${data.organizationName}
Contact Name: ${data.contactName}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
Partnership Type: ${data.partnershipType}

Proposal:
${data.proposal}

---
This partnership inquiry was submitted via the ExploreHull.com Partner page.
  `;

  return await sendEmail({
    to: CONTACT_EMAIL,
    subject: `ExploreHull Partnership: ${data.organizationName}`,
    html,
    text,
  });
}

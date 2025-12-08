import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const CONTACT_EMAIL = 'contact@lampstand.consulting';
const FROM_EMAIL = 'noreply@lampstand.consulting';

// Initialize SendGrid
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using SendGrid
 * Falls back gracefully if SendGrid is not configured
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.warn('[Email] SendGrid not configured - email not sent');
    return false;
  }

  try {
    await sgMail.send({
      to: options.to,
      from: FROM_EMAIL,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    });

    console.log('[Email] Email sent successfully to:', options.to);
    return true;
  } catch (error: any) {
    console.error('[Email] Failed to send email:', error.response?.body || error.message);
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

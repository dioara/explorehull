# ExploreHull External Deployment Guide

This guide will help you deploy ExploreHull to your own infrastructure (Vercel, Railway, etc.) to have complete control and remove platform branding.

## Prerequisites

Before deploying, you'll need accounts for:
- **Database**: PlanetScale (recommended) or Neon
- **Hosting**: Vercel or Railway
- **Email**: Resend or SendGrid (for contact forms)
- **Optional**: OpenAI (for AI-powered SEO features)
- **Optional**: Google Maps API key (for maps functionality)

---

## Step 1: Set Up Database

### Option A: PlanetScale (Recommended - MySQL Compatible)

1. Create account at [planetscale.com](https://planetscale.com)
2. Create a new database named `explorehull`
3. Get connection string from Settings → Connection strings
4. Copy the connection string (format: `mysql://user:pass@host/database?sslaccept=strict`)

### Option B: Neon (Postgres - Requires Schema Changes)

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project named `explorehull`
3. Get connection string from Dashboard
4. **Note**: You'll need to convert the Drizzle schema from MySQL to Postgres

---

## Step 2: Configure Environment Variables

Create a `.env` file in your project root with these variables:

```env
# Database
DATABASE_URL=your_planetscale_connection_string

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your_generated_secret_here

# Email (for contact forms - using Resend)
RESEND_API_KEY=your_resend_api_key

# Optional: OpenAI (for AI-powered SEO)
OPENAI_API_KEY=your_openai_api_key

# Optional: Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# App Configuration
NODE_ENV=production
VITE_APP_TITLE=Explore Hull
VITE_APP_LOGO=/logo.svg
```

---

## Step 3: Remove Manus-Specific Code

You need to replace or remove these Manus-specific features:

### A. Remove Manus OAuth (Use Traditional Auth)

The current admin authentication already uses email/password (not Manus OAuth), so this is already compatible!

**Admin Login**: The admin system at `/admin/login` works independently and doesn't need changes.

### B. Replace Notification System

**Current**: Uses `notifyOwner()` function  
**Replace with**: Email service (Resend recommended)

Install Resend:
```bash
pnpm add resend
```

Create `server/email.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await resend.emails.send({
      from: 'ExploreHull <noreply@explorehull.com>',
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}
```

Update `server/routers.ts` - Replace all `notifyOwner()` calls:
```typescript
// OLD:
await notifyOwner({ title, content });

// NEW:
await sendEmail({
  to: 'contact@lampstand.consulting',
  subject: title,
  html: content,
});
```

### C. Replace AI/LLM Integration (Optional)

**Current**: Uses `invokeLLM()` function  
**Replace with**: OpenAI SDK directly

If you want to keep AI-powered SEO features:

```bash
pnpm add openai
```

Update `server/seo.ts`:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Replace invokeLLM calls with:
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'You are an SEO expert.' },
    { role: 'user', content: prompt },
  ],
});
```

**Or**: Simply remove the AI SEO service if you don't want to pay for OpenAI API.

### D. Google Maps (Optional)

**Current**: Uses Manus proxy  
**Replace with**: Your own Google Maps API key

1. Get API key from [Google Cloud Console](https://console.cloud.google.com)
2. Enable Maps JavaScript API
3. Add to `.env`: `GOOGLE_MAPS_API_KEY=your_key`
4. Update `client/src/components/Map.tsx` to load Google Maps with your key

**Or**: Remove maps feature if you don't want to pay for Google Maps API.

---

## Step 4: Deploy to Vercel

### A. Install Vercel CLI

```bash
npm i -g vercel
```

### B. Deploy

```bash
cd /path/to/explorehull
vercel --prod
```

### C. Configure Environment Variables in Vercel Dashboard

1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add all variables from your `.env` file
4. Redeploy

### D. Run Database Migration

```bash
# After deployment, run this locally to push schema to your database
pnpm db:push
```

---

## Step 5: Deploy to Railway (Alternative)

### A. Install Railway CLI

```bash
npm i -g @railway/cli
```

### B. Deploy

```bash
cd /path/to/explorehull
railway login
railway init
railway up
```

### C. Add Environment Variables

```bash
railway variables set DATABASE_URL=your_connection_string
railway variables set JWT_SECRET=your_secret
# ... add all other variables
```

---

## Step 6: Create Admin Account

After deployment, run the admin creation script:

```bash
node create-admin.mjs
```

This will create the admin account with:
- Email: tolu@kits.health
- Password: 14TCk2J&I$Xb

---

## Step 7: Point Your Domain

### For Vercel:
1. Go to Project Settings → Domains
2. Add `explorehull.com`
3. Follow DNS instructions to add A/CNAME records

### For Railway:
1. Go to Project Settings → Domains
2. Add custom domain
3. Update DNS records as instructed

---

## Summary of Changes Needed

| Feature | Current (Manus) | Replacement | Required? |
|---------|----------------|-------------|-----------|
| Database | Manus MySQL | PlanetScale/Neon | ✅ Yes |
| Admin Auth | Email/Password | No change needed | ✅ Already compatible |
| Contact Forms | `notifyOwner()` | Resend/SendGrid | ✅ Yes |
| AI SEO | `invokeLLM()` | OpenAI SDK or remove | ❌ Optional |
| Google Maps | Manus proxy | Your own API key or remove | ❌ Optional |

---

## Estimated Costs (Monthly)

- **PlanetScale**: Free tier (5GB storage, 1 billion row reads)
- **Vercel/Railway**: Free tier available
- **Resend**: Free tier (100 emails/day)
- **OpenAI API**: ~$5-20/month (if using AI features)
- **Google Maps**: ~$0-200/month depending on usage

**Total**: $0-250/month depending on features you keep

---

## Need Help?

If you encounter issues during deployment, check:
1. All environment variables are set correctly
2. Database connection string is valid
3. `pnpm db:push` completed successfully
4. Admin account was created

---

**Ready to deploy?** Follow the steps above and you'll have ExploreHull running on your own infrastructure with no platform branding!

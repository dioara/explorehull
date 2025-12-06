# Railway Deployment Guide for ExploreHull.com

This guide will help you deploy the complete ExploreHull application (frontend + backend + database) to Railway.

---

## Prerequisites

- ✅ Railway account (sign up at https://railway.app)
- ✅ GitHub repository: `dioara/explorehull`
- ✅ MySQL database already created in Railway

---

## Step 1: Create New Railway Project for the Application

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose `dioara/explorehull`**
5. **Click "Deploy Now"**

Railway will automatically detect the configuration and start building.

---

## Step 2: Configure Environment Variables

After the project is created:

1. **Click on your service** (should be named "explorehull" or similar)
2. **Go to "Variables" tab**
3. **Add the following environment variables:**

### Required Variables:

```bash
# Database Connection (use your existing Railway MySQL database)
DATABASE_URL=mysql://root:YWygstIgSXGbfQSggsPtBLVrKxbjLpJd@shortline.proxy.rlwy.net:20782/railway

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Node Environment
NODE_ENV=production

# Port (Railway will set this automatically, but you can override)
PORT=3000
```

### Optional Variables (if you want OAuth features):

```bash
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
VITE_APP_ID=your-app-id
```

**Note**: Since you're using custom admin authentication (not Manus OAuth), the OAuth variables are optional.

---

## Step 3: Connect Database to Application

If your MySQL database is in a separate Railway service:

1. **Go to your MySQL database service**
2. **Click "Connect"**
3. **Copy the "Private URL"** (looks like: `mysql://root:password@mysql.railway.internal:3306/railway`)
4. **Go back to your application service**
5. **Update DATABASE_URL** with the private URL for better performance

**OR** keep using the public URL you already have - both work fine.

---

## Step 4: Generate Domain

1. **In your application service, go to "Settings" tab**
2. **Scroll to "Networking" section**
3. **Click "Generate Domain"**
4. **Railway will create a public URL** like: `explorehull-production.up.railway.app`

---

## Step 5: Run Database Migrations (One-Time Setup)

After the first deployment completes:

### Option A: Using Railway CLI (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Run migrations
railway run pnpm db:push

# Create admin account
railway run npx tsx create-admin.mjs
```

### Option B: Using GitHub Codespaces (Alternative)

1. **Go to your GitHub repo**: https://github.com/dioara/explorehull
2. **Click "Code" → "Codespaces" → "Create codespace"**
3. **In the terminal, run:**

```bash
# Set DATABASE_URL
export DATABASE_URL="mysql://root:YWygstIgSXGbfQSggsPtBLVrKxbjLpJd@shortline.proxy.rlwy.net:20782/railway"

# Run migrations (already done, but safe to run again)
pnpm db:push

# Create admin account (if not already created)
npx tsx create-admin.mjs
```

---

## Step 6: Verify Deployment

1. **Visit your Railway domain**: `https://your-app.up.railway.app`
2. **You should see the ExploreHull homepage**
3. **Test admin login**: `https://your-app.up.railway.app/admin/login`
   - Email: `tolu@kits.health`
   - Password: `14TCk2J&I$Xb`

---

## Step 7: Point Custom Domain (Optional)

To use `explorehull.com`:

1. **In Railway, go to your service → "Settings" → "Networking"**
2. **Click "Add Custom Domain"**
3. **Enter**: `explorehull.com`
4. **Railway will show DNS records to add**
5. **Go to your domain registrar** (where you bought explorehull.com)
6. **Add the DNS records** Railway provides:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `your-app.up.railway.app`
7. **Wait 5-60 minutes** for DNS propagation

---

## Troubleshooting

### Build Fails

**Error**: `pnpm: command not found`

**Solution**: Railway should auto-detect pnpm from `package.json`. If not, add this to `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS"
  }
}
```

### Application Crashes on Start

**Check logs**:
1. Go to your Railway service
2. Click "Deployments" tab
3. Click on the latest deployment
4. Check "Deploy Logs" for errors

**Common issues**:
- Missing `DATABASE_URL` environment variable
- Database not accessible (check connection string)
- Port binding issue (Railway sets `PORT` automatically)

### Database Connection Fails

**Error**: `ECONNREFUSED` or `ETIMEDOUT`

**Solution**: 
- Use the **private URL** if database is in same Railway project
- Use the **public URL** if accessing from outside Railway
- Ensure database service is running

### Admin Login Doesn't Work

**Solution**: Make sure you ran the admin creation script:

```bash
railway run npx tsx create-admin.mjs
```

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | MySQL connection string | `mysql://root:pass@host:3306/db` |
| `JWT_SECRET` | ✅ Yes | Secret key for JWT tokens | `your-secret-key-here` |
| `NODE_ENV` | ✅ Yes | Environment mode | `production` |
| `PORT` | ⚠️ Auto | Port to run server on | `3000` (Railway sets this) |
| `OAUTH_SERVER_URL` | ❌ No | Manus OAuth server | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | ❌ No | Manus OAuth portal | `https://oauth.manus.im` |
| `VITE_APP_ID` | ❌ No | Manus app ID | Your app ID |

---

## Cost Estimate

**Railway Free Tier**:
- $5 free credit per month
- Enough for small-medium traffic sites
- Includes database + application hosting

**If you exceed free tier**:
- Pay-as-you-go pricing
- ~$5-20/month for typical usage
- No credit card required to start

---

## Monitoring & Logs

**View Logs**:
1. Go to your Railway service
2. Click "Deployments" tab
3. Click on active deployment
4. View real-time logs

**Metrics**:
- CPU usage
- Memory usage
- Network traffic
- Request count

All available in Railway dashboard.

---

## Updating the Application

**Automatic Deployments**:

Railway automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Railway automatically detects and deploys
```

**Manual Deployments**:

1. Go to Railway dashboard
2. Click your service
3. Click "Deployments" tab
4. Click "Deploy" button

---

## Rolling Back

If a deployment breaks something:

1. **Go to "Deployments" tab**
2. **Find the last working deployment**
3. **Click "Redeploy"**
4. **Confirm**

Railway will rollback to that version.

---

## Support

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **ExploreHull Issues**: https://github.com/dioara/explorehull/issues

---

## Next Steps After Deployment

1. ✅ Test all pages (Explore, Events, Eat & Drink, Stay)
2. ✅ Test admin dashboard functionality
3. ✅ Test partner form submissions
4. ✅ Add Google Analytics tracking
5. ✅ Set up custom domain
6. ✅ Add real content and images
7. ✅ Configure SEO settings
8. ✅ Set up monitoring/alerts

---

## Quick Reference Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Run commands in production
railway run <command>

# Deploy manually
railway up
```

---

**Your ExploreHull site will be live at**: `https://your-app.up.railway.app`

**Admin Dashboard**: `https://your-app.up.railway.app/admin/login`

**Credentials**:
- Email: `tolu@kits.health`
- Password: `14TCk2J&I$Xb`

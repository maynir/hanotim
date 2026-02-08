# 🚀 Quick Setup Guide for HaNotim

Follow these steps to get your site running in production.

## 📋 Prerequisites Checklist

- [ ] Node.js 20+ installed (currently using v18, upgrade recommended)
- [ ] Sanity.io account created
- [ ] Resend account created
- [ ] Domain/hosting ready (Vercel recommended)

---

## Step 1: Upgrade Node.js

Your project uses Node 24 LTS, but the system is running v18. Upgrade:

```bash
# Using nvm (recommended)
nvm install 24
nvm use 24

# Verify
node --version  # Should show v24.x.x
```

---

## Step 2: Set Up Sanity CMS

### Create Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create project"
3. Project name: **HaNotim**
4. Copy the **Project ID** (you'll need it)

### Generate API Tokens

1. In your Sanity project, go to **Settings → API**
2. Create these tokens:
   - **Read Token**: Permissions = Viewer
   - **Write Token**: Permissions = Editor
3. Save both tokens securely

### Create Dataset

- Default dataset name: `production`
- Or create a custom one in Settings → Datasets

---

## Step 3: Set Up Resend for Emails

1. Go to [resend.com](https://resend.com)
2. Sign up and verify your account
3. Add a domain or use Resend's testing domain
4. Go to **API Keys** and create a new key
5. Copy the API key (starts with `re_`)

---

## Step 4: Configure Environment Variables

Create `.env.local` from the template:

```bash
cp .env.example .env.local
```

Fill in your actual values:

```env
# From Sanity Dashboard
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity API Tokens
SANITY_API_READ_TOKEN=skAbC123...
SANITY_API_WRITE_TOKEN=skXyZ789...
SANITY_DRAFT_SECRET=your-random-secret-string-here

# From Resend Dashboard
RESEND_API_KEY=re_123456789...
RESEND_TO_EMAIL=your-business-email@hanotim.co.il

# Your WhatsApp Business Number
NEXT_PUBLIC_WHATSAPP_NUMBER=972501234567
```

**Generate SANITY_DRAFT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 5: Install & Run

```bash
# Clean install (with legacy peer deps for Next 16)
npm install --legacy-peer-deps

# Start development
npm run dev
```

Visit:
- **Website:** http://localhost:3000
- **CMS Studio:** http://localhost:3000/studio

---

## Step 6: Initial Content Setup

### First Time in Sanity Studio

1. Go to http://localhost:3000/studio
2. Sign in with your Sanity account
3. You'll see two document types: **Project** and **Lead**

### Add Your First Project

1. Click **Project** → **Create**
2. Fill in:
   - **Title (כותרת):** גינה פרטיה בתל אביב
   - **Slug:** Click "Generate" from title
   - **Category (קטגוריה):** Choose פרטי/גגות/תכנון
   - **Main Image (תמונה ראשית):** Upload a hero image
   - **Gallery (גלריה):** Add 3-6 project images
   - **Description (תיאור):** Write about the project in Hebrew
   - **Order (סדר תצוגה):** Use 1, 2, 3... for manual ordering
3. Click **Publish**

### Test the Contact Form

1. Go to http://localhost:3000#contact
2. Fill out the form
3. Check:
   - Email arrived via Resend
   - Lead saved in Sanity Studio under "Lead"

---

## Step 7: Deploy to Production

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial HaNotim setup"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. **Add Environment Variables:**
   - Copy ALL variables from `.env.local`
   - Paste them in Vercel's Environment Variables section
6. Click **Deploy**

### Update Sanity CORS Origins

1. Go to Sanity Dashboard → **Settings → API → CORS Origins**
2. Add your production URL:
   - `https://your-domain.com`
   - `https://your-domain.vercel.app`
3. Check "Allow credentials"

---

## 🎨 Customization Tips

### Change Brand Colors

Edit `src/app/globals.css`:

```css
@theme {
  --color-forest: #1b4332;      /* Primary brand color */
  --color-leaf: #a7c957;         /* Accent/CTA color */
  --color-sand: #f5f0e8;         /* Background subtle */
  --color-cream: #fdfdfd;        /* Main background */
}
```

### Update Company Info

- **Footer:** `src/components/layout/footer.tsx`
- **Metadata:** `src/app/layout.tsx`
- **Hero Copy:** `src/components/sections/hero.tsx`

### WhatsApp Message

Edit `src/components/ui/whatsapp-button.tsx`:

```tsx
const message = encodeURIComponent("שלום, אני מעוניין ב...");
```

---

## 🐛 Troubleshooting

### "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"

**Solution:** Check `.env.local` exists and has the correct variable names.

### Images Not Loading

**Solutions:**
1. Check `SANITY_API_READ_TOKEN` is set
2. Verify Sanity CORS origins include your domain
3. Check Next.js config has `cdn.sanity.io` in `remotePatterns`

### Form Submission Fails

**Check:**
1. `RESEND_API_KEY` is valid
2. `RESEND_TO_EMAIL` is a verified sender in Resend
3. `SANITY_API_WRITE_TOKEN` has Editor permissions

### Node Engine Warnings

Upgrade to Node 20+:
```bash
nvm install 24
nvm use 24
npm install --legacy-peer-deps
```

---

## 📚 Next Steps

1. ✅ Add 5-10 real projects to Sanity
2. ✅ Replace Hero background with professional photo
3. ✅ Test contact form end-to-end
4. ✅ Set up Google Analytics (optional)
5. ✅ Configure custom domain in Vercel
6. ✅ Set up email forwarding for `info@hanotim.co.il`

---

## 🆘 Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Resend Docs](https://resend.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Built successfully!** 🌿 Your site is ready to launch.

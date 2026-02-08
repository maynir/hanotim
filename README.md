# הנוטעים (HaNotim) - Premium Landscape Architecture Site

A modern, RTL-optimized Next.js website for landscape architecture and gardening services, built with cutting-edge technologies.

## 🌿 Tech Stack

- **Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS v4 (CSS-first approach)
- **CMS:** Sanity.io v3 (embedded studio at `/studio`)
- **Email:** Resend
- **UI Icons:** Lucide React
- **Validation:** Zod
- **Node:** v24.13.0 (LTS)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> Note: `--legacy-peer-deps` is required due to Next.js 16 and next-sanity version compatibility.

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

**Required environment variables:**

- **Sanity:**
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
  - `NEXT_PUBLIC_SANITY_DATASET` - Usually `production`
  - `SANITY_API_READ_TOKEN` - Token with read permissions
  - `SANITY_API_WRITE_TOKEN` - Token with write permissions (for lead submissions)
  - `SANITY_DRAFT_SECRET` - Random string for draft mode

- **Resend:**
  - `RESEND_API_KEY` - Your Resend API key
  - `RESEND_TO_EMAIL` - Email address to receive leads

- **Contact:**
  - `NEXT_PUBLIC_WHATSAPP_NUMBER` - WhatsApp number in format: `972501234567`

### 3. Set Up Sanity Studio

1. Go to [sanity.io](https://www.sanity.io/) and create a new project
2. Copy your project ID to `.env.local`
3. Generate API tokens in Sanity dashboard (Settings > API)
4. Run the development server (see below)
5. Visit `http://localhost:3000/studio` to access the CMS

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with RTL, fonts, nav, footer
│   ├── page.tsx                 # Homepage
│   ├── projects/                # Projects pages
│   │   ├── page.tsx            # All projects
│   │   └── [slug]/page.tsx     # Single project
│   ├── studio/                  # Embedded Sanity Studio
│   └── api/draft-mode/         # Draft mode routes
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── sections/                # Hero, ProjectGrid, ContactSection
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── sanity/                  # Sanity client, queries, fetch
│   ├── actions/                 # Server Actions
│   ├── fonts.ts                 # Google Fonts setup
│   └── validations.ts           # Zod schemas
└── sanity/
    ├── schemas/                 # Sanity schemas
    ├── env.ts                   # Environment config
    └── lib/token.ts             # Server-only token

sanity.config.ts                 # Sanity Studio config
```

## 🎨 Features

### RTL (Right-to-Left) Support
- Full Hebrew language support
- Tailwind v4 logical properties (`inline-start`, `inline-end`, etc.)
- RTL-optimized layouts and components

### Nature-Inspired Design
- Custom color palette: Forest (#1b4332), Leaf (#a7c957), Sand (#f5f0e8)
- Hebrew fonts: Assistant (body), Heebo (headings)
- Botanical gradient backgrounds

### CMS Features
- **Projects:** Title, category (Private/Roof/Planning), gallery, description
- **Leads:** Form submissions saved to Sanity + emailed via Resend
- **Visual Editing:** Draft mode support for previewing content

### Contact System
- React 19 `useActionState` for form handling
- Zod validation with Hebrew error messages
- Dual submission: Email (Resend) + Sanity backup
- Floating WhatsApp button with pulse animation

### Performance
- Next.js 16 with React Compiler enabled
- Static generation for project pages
- Optimized images with `next/image`
- Server Components by default

## 🛠 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 Content Management

1. **Add Projects:**
   - Go to `/studio`
   - Click "Project" → "Create"
   - Fill in Hebrew title, select category, upload images
   - Add description using the rich text editor
   - Publish

2. **View Leads:**
   - Go to `/studio`
   - Click "Lead" to see all form submissions
   - Each lead shows name, phone, email, message, and timestamp

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to add all variables from `.env.example` to your hosting platform.

## 📦 Key Dependencies

- `next` - Next.js framework
- `react` & `react-dom` - React library
- `next-sanity` - Sanity integration for Next.js
- `@sanity/image-url` - Image URL builder
- `resend` - Email service
- `zod` - Schema validation
- `lucide-react` - Icon library
- `tailwindcss` - Utility-first CSS

## 🔒 Security Notes

- API tokens are server-only (never exposed to browser)
- Form validation on both client and server
- Environment variables properly scoped (NEXT_PUBLIC_ vs server-only)
- Zod schemas prevent injection attacks

## 📄 License

Private project. All rights reserved.

---

Built with ❤️ for premium landscape architecture services.

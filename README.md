# Koksoffert

A minimal Next.js 14 application for professional kitchen offers and quotes.

## Features

- **Landing Page** (`/`) - Simple homepage with call-to-action
- **Offer Form** (`/offer`) - PDF upload + contact form
- **Success Page** (`/success`) - Confirmation after submission
- **API Routes**:
  - `/api/ping` - Health check (Edge runtime)
  - `/api/upload` - PDF file upload (Node.js runtime, Vercel Blob storage)
  - `/api/submit` - Form submission (Node.js runtime)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- SASS/SCSS
- Vercel Blob Storage
- Yarn package manager

## Setup

1. Install dependencies:

```bash
yarn add sass @vercel/blob resend @storyblok/react storyblok-js-client storyblok-rich-text-react-renderer
```

2. Copy environment variables:

```bash
cp env.example .env.local
```

3. Configure your environment variables in `.env.local`:

```
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
RESEND_API_KEY=your_resend_api_key_here
ADMIN_EMAIL=email
STORYBLOK_ACCESS_TOKEN=token
```

4. Set up Storyblok CMS:

   - Create a new space at [storyblok.com](https://storyblok.com)
   - Get your access token from Settings → Access Tokens
   - Create an "Article" content type with fields: title, excerpt, content, category, readTime, featuredImage

5. Run development server:

```bash
yarn dev
```

## Email Integration (Optional)

To enable email notifications, add one of these packages:

```bash
# Option 1: Resend
yarn add resend

# Option 2: Nodemailer
yarn add nodemailer
```

Then configure the respective environment variables in `.env.local` and uncomment the email code in `app/api/submit/route.ts`.

## Deployment

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

The `vercel.json` includes:

- Security headers
- EU region preference (`fra1`)
- `noindex` for preview deployments

## File Structure

```
├── app/
│   ├── api/
│   │   ├── ping/route.ts
│   │   ├── upload/route.ts
│   │   └── submit/route.ts
│   ├── offer/page.tsx
│   ├── success/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
├── styles/
│   └── globals.scss
├── package.json
├── tsconfig.json
├── next.config.js
├── vercel.json
└── README.md
```

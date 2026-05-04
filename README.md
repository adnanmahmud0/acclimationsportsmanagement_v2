# this branch for vercel deployment
# This branch for vercel deployment
# test
# test


# Acclimation Sports Management

A fully dynamic, production-ready web platform and custom Content Management System (CMS) built for an elite NBA representation and sports management agency.

## 🚀 Tech Stack

- **Framework:** [Next.js 15.1.0](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + UI Components (shadcn/ui)
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Custom JWT-based auth system
- **Image Storage:** ImgBB API integration

## ✨ Key Features

### 1. Dynamic Public Website
- **Service Pages:** Contract Negotiation, Personal Branding, Salary Cap, Marketing & Endorsements, Pre-Draft, Holistic Concierge.
- **Player Divisions:** WNBA, College Prospects, G-League Elite, High School Talent, NBA Players, Two-Way Contracts.
- **Rich UI:** Glassmorphism design, gradient headers, animations, and modern sports-aesthetic styling.

### 2. Custom Admin CMS Dashboard (`/admin`)
- **Full Content Control:** Every page's content (hero sections, points, stats, background images) can be edited live from the dashboard. No code changes required.
- **Dedicated Editors:** Custom UI interfaces built for editing specific complex pages (Home, Contact, specific services).
- **Admin Management:** Super Admins can create, delete, and manage other admin accounts.
- **Internal Analytics:** Real-time view tracking (automatically ignores admin traffic to keep data pure).

### 3. Enterprise-Grade SEO Engine
- **100% Admin Controlled:** Every page has a dedicated SEO tab in the CMS.
- **Capabilities Include:**
  - Browser Title & Meta Description.
  - Search Keywords (Tag system).
  - Open Graph (OG) Image uploads for social media sharing.
  - Canonical URLs to prevent duplicate content penalties.
  - One-click Search Engine Indexing toggle (robots `noindex`).
  - Dynamic FAQ Schema (JSON-LD Rich Snippets) generation.
- **Automated Sitemap:** A dynamic `/sitemap.xml` automatically lists all pages from the database. The live domain can be configured straight from the Admin Dashboard.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB Cluster URL
- ImgBB API Key

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone <your-repo-url>
   cd acclimationsportsmanagement_v2
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup:**
   - Copy the example environment file:
     \`\`\`bash
     cp .env.example .env
     \`\`\`
   - Open `.env` and fill in your actual credentials (MongoDB URL, JWT secrets, Email setup, ImgBB key, etc.).

4. **Run the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security Notes
- The `.env` file is heavily `.gitignore`d. Never commit your real database passwords or JWT secrets. Use `.env.example` as a safe template.
- The default initial super admin account is provisioned via environment variables upon first database connection.

## 📈 Deployment
This project is fully optimized for deployment on platforms like Vercel or standard Node/Docker environments. Ensure you run the build command to verify type safety and linting before deploying:

\`\`\`bash
npm run build
\`\`\`

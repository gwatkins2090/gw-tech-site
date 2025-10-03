# Modern Tech Portfolio

A modern, responsive portfolio website built with Next.js 14+, featuring a dark theme with vibrant pink/magenta accents and geometric design elements.

## Features

- 🌙 **Dark Theme First** - Optimized for dark mode with vibrant pink/magenta accents
- 🎨 **Modern Design** - Geometric elements and smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Performance Optimized** - Built for Lighthouse 90+ scores
- 🎭 **Smooth Animations** - Framer Motion powered interactions
- 📧 **Contact Form** - Functional contact form with validation
- 🔧 **Tech Stack Display** - Interactive skills and proficiency visualization
- 💼 **Project Showcase** - Alternating layouts for featured projects

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Inter & Playfair Display fonts
- **Language**: TypeScript

## Getting Started

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd techportfolio
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Run the development server**
```bash
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## Customization

### 1. Personal Information
Edit `src/data/portfolio.ts` to update:
- Personal details (name, title, bio, contact info)
- Skills and proficiency levels
- Project information
- Work experience
- Education

### 2. Images
Add your images to the following directories:
- `public/images/profile/profile-photo.jpg` - Your profile photo
- `public/images/projects/` - Project screenshots
- `public/docs/resume.pdf` - Your resume

### 3. Colors & Branding
The color scheme is defined in `src/app/globals.css`:
- Pink Primary: `#ec4899`
- Pink Vibrant: `#FF1744`
- Red Highlight: `#FF3838`
- Red Secondary: `#ef4444`

### 4. Content Sections
The portfolio includes these main sections:
- **Hero** - Introduction with animated background
- **About** - Personal story and experience timeline
- **Skills** - Technical skills with proficiency indicators
- **Projects** - Featured projects with alternating layouts
- **Contact** - Contact form and social links

## Performance Features

- Image optimization with WebP/AVIF formats
- Lazy loading for images below the fold
- Optimized bundle with tree shaking
- Smooth scrolling navigation
- SEO optimized with proper meta tags

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

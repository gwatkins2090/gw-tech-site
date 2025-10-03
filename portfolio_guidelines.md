# Portfolio Website Development Guidelines

## Project Overview

Create a modern, responsive single-page portfolio website featuring a dark theme with vibrant accent colors, geometric design elements, smooth scrolling navigation, and optimized performance.

## Technical Requirements

### Core Technologies
- **Framework**: Next.js 14+ (React-based)
- **Styling**: Tailwind CSS or CSS Modules
- **Image Optimization**: Next.js Image component
- **Deployment**: Vercel, Netlify, or similar
- **Version Control**: Git

### Performance Standards
- Lighthouse Performance Score: 90+
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 3s
- Image optimization with WebP format support
- Lazy loading for all images below the fold

## Project Structure

```
portfolio-website/
├── public/
│   ├── docs/
│   │   └── resume.pdf
│   ├── images/
│   │   ├── profile/
│   │   │   └── profile-photo.png
│   │   └── projects/
│   │       ├── project-1.png
│   │       ├── project-2.png
│   │       └── ...
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Layout.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── personal.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── components/
│   ├── pages/
│   │   ├── index.tsx
│   │   └── _app.tsx
│   └── types/
│       └── index.ts
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Design Specifications

### Color Palette
- **Primary Background**: Dark navy to black gradient (#0f172a to #1e293b)
- **Accent Color**: Vibrant pink/magenta (#FF1744 or #ec4899)
- **Secondary Accent**: Bright red (#FF3838 or #ef4444)
- **Text Primary**: White/off-white (#ffffff or #f8fafc)
- **Text Secondary**: Light gray (#94a3b8)
- **Card Borders**: Accent pink with glow effect
- **Badge Background**: Dark blue-gray (#1e3a5f or similar)

### Typography
- **Headers**: Inter, Poppins, or similar modern sans-serif
- **Body**: Same font family, lighter weight (400)
- **Font Sizes**: 
  - Hero Title: 3.5rem (56px)
  - Section Headers: 3rem (48px)
  - Subsection Headers: 2rem (32px)
  - Project Titles: 2.5rem (40px)
  - Body Text: 1.125rem (18px)
  - Badge Text: 0.875rem (14px)

### Spacing & Layout
- **Container Max Width**: 1400px
- **Section Padding**: 80px vertical, 80px horizontal (desktop)
- **Card Spacing**: 32px gap between elements
- **Border Radius**: 8px for cards, 9999px for badges/pills
- **Element Margins**: 24px between major elements

### Animations & Interactions

#### Hover Effects
- **Buttons**: 
  - Border color buttons: Fill with accent color, text becomes white
  - Transition duration: 300ms ease
- **Skill Badges**: 
  - Subtle background lightening
  - Optional: slight scale (1.05)
- **Project Cards**: 
  - Image: Subtle scale effect (1.02)
  - Border glow intensifies
- **Navigation Links**: 
  - Color change to pink accent
  - Optional underline animation
- **Social Icons**: 
  - Color change from white to pink
  - Slight scale or rotation

#### Scroll Animations (Optional Enhancement)
- Fade in sections as they enter viewport
- Slide in from sides for alternating project cards
- Stagger animation for skill badges
- Use Intersection Observer API or libraries like Framer Motion

#### Page Load Animations
- Hero section: Fade in and slide up
- Geometric shapes: Animated entrance with rotation
- Navigation: Slide down from top

### Visual Effects
- **Glow/Shadow Effects**:
  - Project image borders: `box-shadow: 0 0 30px rgba(236, 72, 153, 0.3)`
  - Hover states: Increase glow intensity
- **Gradient Backgrounds**:
  - Main background: Subtle dark gradient from navy to darker navy/black
  - Optional: Animated gradient background
- **Geometric Elements**:
  - Clean, sharp edges for squares and triangles
  - Smooth circles
  - Proper layering (z-index management)

## Content Structure

### 1. Header/Hero Section
```typescript
interface HeaderData {
  greeting: string; // e.g., "Hello! I am"
  name: string;
  title: string;
  subtitle?: string;
  bio: string;
  resumeLink: string;
}
```

**Requirements:**
- Split layout: Text content on left, geometric graphic on right
- Large geometric composition featuring:
  - Large red circle (primary element)
  - Overlapping geometric shapes (squares, triangles)
  - Pink/magenta outline accents
  - Positioned in top-right of hero section
- Navigation bar at top with:
  - Logo/name on left (circular icon with dot + text)
  - Menu items: About, Skills, Projects, Contact, Resume
  - Dark mode toggle icon
  - Sound toggle icon
- Fixed vertical sidebar on left with social icons:
  - Email icon
  - LinkedIn icon
  - GitHub icon
  - Vertical line separator
- "Get my resume" button with pink border and pink text
- Scroll indicator at bottom center (mouse icon with down arrows)

**Logo Design:**
- Circular icon with border
- Small centered dot inside
- Pink/magenta color scheme
- Displayed next to name in navigation
- Size: approximately 40x40px

```tsx
const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-pink-500 flex items-center justify-center">
        <div className="w-2 h-2 bg-pink-500 rounded-full" />
      </div>
      <span className="text-white text-xl font-medium">Your Name</span>
    </div>
  );
};
```

**Visual Design:**
- Dark gradient background
- White heading text
- Pink accent for title/role
- Comfortable line height for bio text
- Button hover effect with pink background

### 2. About Section
```typescript
interface AboutData {
  past: {
    title: string;
    description: string;
  };
  present: {
    title: string;
    description: string;
  };
  future: {
    title: string;
    description: string;
  };
}
```

**Layout:**
- Three-column grid on desktop
- Single column stack on mobile
- Card-based design with equal heights
- Timeline visual element (optional)

### 3. Skills Section
```typescript
interface SkillCategory {
  categoryName: string;
  skills: string[];
}

interface SkillsData {
  categories: SkillCategory[];
}
```

**Layout:**
- Three main categories displayed vertically
- Each category has a heading
- Skills displayed as pill-shaped badges in horizontal flow
- Dark background with slightly lighter badges
- Pink text on badges

**Badge Design:**
- Rounded corners (full border-radius for pill shape)
- Dark blue-gray background (#1e3a5f or similar)
- Pink text color
- Padding: 8px 16px
- Margin between badges: 8px
- Hover effect: Lighter background or pink border

**Example Categories:**
- **Frontend Technologies**: Core web technologies and frameworks
- **Styling & Design Tools**: CSS frameworks and design tools
- **Additional Tools**: Testing, build tools, APIs, and other technologies

### 4. Projects Section
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
```

**Layout Requirements:**
- Alternating layout: Image left / content right, then image right / content left
- Each project card has:
  - Large preview image with pink border and shadow
  - Content area with dark background
  - Project title
  - "Made with:" label followed by technology badges
  - Large colored content block (can vary by project - pink, red, blue, etc.)
  - "Live" button with pink border at bottom

**Visual Design:**
- Project images: 
  - Pink border (2-3px)
  - Pink shadow/glow effect
  - Rounded corners (8px)
  - Mockup style showing multiple device screens
- Technology badges:
  - Same pill style as Skills section
  - Pink text on dark background
  - Displayed inline with small gaps
- Content blocks:
  - Large colored rectangles (can be red, pink, purple, blue)
  - Take up significant space in the card
  - Can contain additional info or be decorative
- "Live" button:
  - Icon + text
  - Pink border
  - Pink text
  - Hover: Pink background with white text

**Generic Project Types to Showcase:**
1. **Cultural/Educational Platform** - Community-focused application
2. **E-commerce Solution** - Shopping/retail platform
3. **Social Platform Clone** - Community and content sharing
4. **Productivity Tool** - Task/project management
5. **Educational Resource Hub** - Learning management system
6. **Consulting/Service Website** - Professional services
7. **Utility Application** - Tool or generator
8. **Local Business Platform** - Regional service solution

### 5. Contact/CTA Section
```typescript
interface ContactData {
  sections: {
    title: string;
    description: string;
    ctaText: string;
  }[];
}
```

**Three CTA Cards Layout:**
- Grid layout: 3 columns on desktop, 1 on mobile
- Each card contains:
  - Bold heading question
  - Descriptive paragraph
  - Optional call-to-action button or link

**Suggested CTA Themes:**
- **Career Opportunities**: Open to job offers and collaborations
- **Networking**: Connect with other professionals in the industry
- **Project Collaboration**: Interest in building innovative solutions together

**Visual Design:**
- Cards can have subtle background color or border
- Hover effect: Background glow or border color change
- Include relevant icons (optional)
- Maintain consistent spacing

## Implementation Guidelines

### Component Development

#### Header Component
```tsx
const Header = () => {
  return (
    <header className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-pink-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-pink-500 rounded-full" />
          </div>
          <span className="text-white text-xl">Your Name</span>
        </div>
        
        <ul className="flex gap-8 text-white">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/resume">Resume</a></li>
        </ul>
        
        <div className="flex gap-4">
          <button>{/* Dark mode toggle icon */}</button>
          <button>{/* Sound toggle icon */}</button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="grid grid-cols-2 items-center px-20 h-[calc(100vh-80px)]">
        <div>
          <p className="text-gray-400 text-lg">Hello! I am</p>
          <h1 className="text-6xl text-white my-4">Your Name</h1>
          <p className="text-pink-500 text-2xl mb-6">
            Software Engineer <span className="text-white">•</span> UI/UX Designer
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {/* Bio paragraph */}
          </p>
          <button className="border-2 border-pink-500 text-pink-500 px-8 py-3 rounded hover:bg-pink-500 hover:text-white transition">
            Get my resume
          </button>
        </div>
        
        {/* Geometric Graphic */}
        <div className="relative flex justify-center items-center">
          <div className="w-96 h-96 bg-red-500 rounded-full relative">
            {/* Overlapping geometric shapes */}
            <div className="absolute -top-10 -right-10 w-64 h-64 border-4 border-pink-500 rotate-12" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-500" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        {/* Mouse icon with down arrows */}
      </div>
    </header>
  );
};
```

#### Projects Component
```tsx
const ProjectCard = ({ project, imageOnLeft }: { project: Project; imageOnLeft: boolean }) => {
  return (
    <div className={`grid grid-cols-2 gap-8 mb-20 ${!imageOnLeft && 'direction-rtl'}`}>
      {/* Project Image */}
      <div className="relative">
        <div className="border-4 border-pink-500 rounded-lg shadow-[0_0_30px_rgba(236,72,153,0.3)]">
          <Image 
            src={project.image}
            alt={project.title}
            className="rounded-lg"
            width={800}
            height={600}
          />
        </div>
      </div>
      
      {/* Project Content */}
      <div className="flex flex-col">
        <h3 className="text-4xl text-white mb-4">{project.title}</h3>
        
        {/* Tech Stack */}
        <div className="mb-6">
          <span className="text-gray-400">Made with: </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.technologies.map(tech => (
              <span key={tech} className="px-4 py-2 bg-slate-800 text-pink-500 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Large Colored Block */}
        <div className="flex-1 bg-red-500 rounded-lg mb-6" />
        
        {/* Live Button */}
        <a 
          href={project.liveUrl}
          className="border-2 border-pink-500 text-pink-500 px-6 py-3 rounded inline-flex items-center gap-2 w-fit hover:bg-pink-500 hover:text-white transition"
        >
          <ExternalLinkIcon />
          <span>Live</span>
        </a>
      </div>
    </div>
  );
};

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="py-20 px-20">
      <h2 className="text-6xl text-white text-center mb-20">Projects</h2>
      <div>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            imageOnLeft={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};
```

#### Skills Component
```tsx
const Skills = ({ skillsData }: { skillsData: SkillsData }) => {
  return (
    <section className="py-20 px-20">
      <h2 className="text-6xl text-white text-center mb-20">Skills</h2>
      
      <div className="space-y-12">
        {skillsData.categories.map(category => (
          <div key={category.categoryName}>
            <h3 className="text-2xl text-white mb-6">{category.categoryName}</h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map(skill => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-slate-800 text-pink-500 rounded-full hover:bg-slate-700 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
```

#### Fixed Sidebar Component
```tsx
const Sidebar = () => {
  return (
    <aside className="fixed left-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 z-50">
      <a href="mailto:your@email.com" className="text-white hover:text-pink-500 transition">
        <MailIcon size={24} />
      </a>
      <a href="https://linkedin.com" className="text-white hover:text-pink-500 transition">
        <LinkedInIcon size={24} />
      </a>
      <a href="https://github.com" className="text-white hover:text-pink-500 transition">
        <GitHubIcon size={24} />
      </a>
      <div className="h-24 w-px bg-gray-600" />
    </aside>
  );
};
```

### Responsive Design Requirements

#### Breakpoints
- **Mobile**: 0-768px
- **Tablet**: 768px-1024px  
- **Desktop**: 1024px+

#### Key Responsive Behaviors
- **Navigation**: 
  - Desktop: Full horizontal menu
  - Mobile: Hamburger menu with slide-out drawer
- **Hero Section**: 
  - Desktop: Two-column layout (text left, graphic right)
  - Mobile: Single column, stack text above graphic, reduce graphic size
- **About Section**: 
  - Desktop: Three columns
  - Tablet: Two columns
  - Mobile: Single column
- **Skills Section**: 
  - All breakpoints: Maintain badge flow, wrap naturally
  - Mobile: Smaller badge padding
- **Projects**: 
  - Desktop: Side-by-side image and content
  - Mobile: Stack vertically (image on top, content below)
  - Remove alternating layout on mobile
- **Sidebar**: 
  - Desktop: Fixed left sidebar
  - Mobile: Move to footer or hide (show only in menu)
- **Typography**: 
  - Desktop: h1: 3.5rem, h2: 3rem
  - Tablet: h1: 2.5rem, h2: 2rem
  - Mobile: h1: 2rem, h2: 1.5rem
- **Spacing**: 
  - Desktop: Section padding 80px vertical
  - Tablet: Section padding 60px vertical
  - Mobile: Section padding 40px vertical

### Performance Optimization

#### Image Optimization
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};
```

#### SEO Requirements
```tsx
// pages/index.tsx
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Your Name - Software Developer & UI/UX Designer</title>
        <meta name="description" content="Portfolio of [Your Name], Software Developer and UI/UX Designer specializing in modern web applications, React, and user-centered design." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="software developer, web developer, UI/UX designer, react developer, frontend developer" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Your Name - Software Developer Portfolio" />
        <meta property="og:description" content="Portfolio showcasing web development and design projects" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://yoursite.com" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Name - Software Developer" />
        <meta name="twitter:description" content="Portfolio of web development projects" />
        <meta name="twitter:image" content="/og-image.png" />
        
        <link rel="canonical" href="https://yoursite.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Page content */}
    </>
  );
}
```

### Creating the Geometric Hero Graphic

#### SVG Approach (Recommended)
```tsx
const HeroGraphic = () => {
  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      {/* Main Red Circle */}
      <div className="absolute w-96 h-96 bg-gradient-to-br from-red-500 to-red-600 rounded-full" />
      
      {/* Pink Outlined Square (Top-Right) */}
      <div 
        className="absolute -top-10 -right-10 w-64 h-64 border-[3px] border-pink-500 transform rotate-12"
        style={{ zIndex: 10 }}
      />
      
      {/* Pink Solid Square (Bottom-Left) */}
      <div 
        className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-500 transform -rotate-6"
        style={{ zIndex: 5 }}
      />
      
      {/* Optional: Pink Triangle */}
      <div 
        className="absolute bottom-20 -right-5 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-pink-500 transform rotate-45"
        style={{ zIndex: 8 }}
      />
    </div>
  );
};
```

#### CSS Animation (Optional)
```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.geometric-shape {
  animation: float 6s ease-in-out infinite;
}

.rotating-square {
  animation: rotate-slow 20s linear infinite;
}
```

## Development Phases

### Phase 1: Foundation (Week 1)
- [ ] Project setup with Next.js
- [ ] Basic component structure
- [ ] Layout and navigation
- [ ] Responsive grid system

### Phase 2: Content Implementation (Week 2)
- [ ] Header with profile section
- [ ] About section with timeline
- [ ] Skills section with categories
- [ ] Basic styling and responsive design

### Phase 3: Projects & Polish (Week 3)
- [ ] Projects section with filtering
- [ ] Contact/CTA section
- [ ] Image optimization
- [ ] Performance optimization
- [ ] Cross-browser testing

### Phase 4: Enhancement (Week 4)
- [ ] Animations and micro-interactions
- [ ] Smooth scroll behavior
- [ ] Dark mode toggle implementation (optional)
- [ ] Sound toggle functionality (optional)
- [ ] Analytics integration
- [ ] Final performance audit
- [ ] Deployment

## Additional Features

### Dark Mode Toggle (Optional)
- Icon in top-right navigation
- Toggle between dark and light themes
- Store preference in localStorage
- Smooth transition between themes (200ms)
- Light theme colors:
  - Background: #ffffff to #f8fafc gradient
  - Text: #1e293b
  - Accent: Keep pink/magenta
  - Badges: Light gray background with darker text

### Sound Toggle (Optional)
- Icon in top-right navigation
- Enables/disables UI sound effects
- Sounds for:
  - Button clicks
  - Navigation events
  - Hover interactions
- Use subtle, professional sounds

### Scroll Indicator
- Animated mouse icon with down arrows
- Positioned at bottom center of hero section
- Bouncing animation
- Disappears on scroll
- Links to next section (About)

### Smooth Scrolling Implementation
```tsx
// Add to globals.css
html {
  scroll-behavior: smooth;
}

// Or use JavaScript for more control
const smoothScroll = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Navigation component usage
<a 
  href="#projects" 
  onClick={(e) => {
    e.preventDefault();
    smoothScroll('projects');
  }}
>
  Projects
</a>
```

### Navigation Behavior
- Active section highlighting in navigation
- Smooth scroll on link click
- Scroll spy to highlight current section
- Fixed navigation that appears on scroll (optional)

```tsx
// Example: Scroll spy implementation
const [activeSection, setActiveSection] = useState('home');

useEffect(() => {
  const handleScroll = () => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## Quality Assurance

### Testing Checklist
- [ ] All links functional
- [ ] Images load properly
- [ ] Resume download works
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Accessibility (WCAG 2.1 AA compliance)
- [ ] Performance metrics meet standards

### Accessibility Requirements
- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support
- Color contrast ratios 4.5:1 minimum
- Focus indicators visible
- Screen reader compatibility

## Deployment

### Environment Setup
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### Deployment Checklist
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] 404 page configured
- [ ] Analytics tracking implemented
- [ ] Sitemap.xml generated
- [ ] robots.txt configured

## Maintenance

### Regular Updates
- Dependencies security updates
- Content updates (new projects, skills)
- Performance monitoring
- Analytics review
- Resume updates

### Content Management
- Store all content in data files for easy updates
- Version control for all changes
- Regular backup of resume and project images
- Monitor broken links and outdated information

---

## Additional Resources

- **Design Inspiration**: Dribbble, Behance portfolio designs
- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Performance Testing**: Google PageSpeed Insights, GTmetrix
- **Accessibility Testing**: WAVE, axe DevTools
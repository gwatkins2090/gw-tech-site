# Portfolio Customization Guide

## Quick Start - Personalizing Your Portfolio

This guide will walk you through customizing the portfolio for yourself or another person. All personal information is centralized in one file for easy editing.

## 📍 Main Configuration File

**Location:** `src/data/portfolio.ts`

This is the **ONLY** file you need to edit to personalize the entire portfolio. All sections pull data from this file.

## 🎯 Step-by-Step Customization

### 1. Personal Information

Open `src/data/portfolio.ts` and find the `personalInfo` object (around line 78):

```typescript
export const personalInfo: PersonalInfo = {
  name: 'Your Name',                    // ← Change to your full name
  title: 'Full Stack Developer',        // ← Change to your job title
  bio: 'Passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable solutions and learning new technologies.',
  // ↑ Change to your personal bio (2-3 sentences)
  
  location: 'San Francisco, CA',        // ← Change to your city
  email: 'hello@yourname.dev',          // ← Change to your email
  phone: '+1 (555) 123-4567',           // ← Change to your phone (optional)
  website: 'https://yourname.dev',      // ← Change to your website (optional)
  resumeUrl: '/docs/resume.pdf',        // ← Path to your resume PDF
  profileImage: '/images/profile/profile-photo.jpg', // ← Path to your photo
  
  socialMedia: {
    github: 'https://github.com/yourusername',      // ← Your GitHub URL
    linkedin: 'https://linkedin.com/in/yourusername', // ← Your LinkedIn URL
    twitter: 'https://twitter.com/yourusername',    // ← Your Twitter URL (optional)
  },
  
  availability: 'available',            // ← Options: 'available', 'busy', 'not-looking'
  
  preferredRoles: [                     // ← Job roles you're interested in
    'Full Stack Developer', 
    'Frontend Developer', 
    'Software Engineer'
  ],
  
  interests: [                          // ← Your interests/hobbies
    'Web Development', 
    'AI/ML', 
    'Open Source', 
    'Tech Innovation'
  ]
};
```

### 2. Skills

Find the `skills` array (around line 98):

```typescript
export const skills: Skill[] = [
  // Frontend Skills
  { 
    id: '1',                            // ← Keep unique
    name: 'React',                      // ← Skill name (appears on badge)
    category: 'frontend',               // ← Category: frontend, backend, database, tools, cloud
    proficiency: 90,                    // ← Your proficiency level (1-100)
    color: '#61DAFB'                    // ← Optional: brand color
  },
  { 
    id: '2', 
    name: 'Next.js', 
    category: 'frontend', 
    proficiency: 85, 
    color: '#000000' 
  },
  // Add more skills...
];
```

**Skill Categories:**
- `frontend` - React, Vue, Angular, HTML, CSS, etc.
- `backend` - Node.js, Python, Java, etc.
- `database` - PostgreSQL, MongoDB, MySQL, etc.
- `tools` - Git, Docker, Webpack, etc.
- `cloud` - AWS, Azure, Vercel, etc.

**How to Add a New Skill:**
```typescript
{ 
  id: '19',                    // ← Increment the ID
  name: 'Vue.js',              // ← Your skill name
  category: 'frontend',        // ← Choose appropriate category
  proficiency: 80,             // ← Your proficiency (1-100)
  color: '#4FC08D'             // ← Optional: hex color
},
```

**How to Remove a Skill:**
Simply delete the entire skill object (including the curly braces and comma).

### 3. Projects

Find the `projects` array (around line 128):

```typescript
export const projects: Project[] = [
  {
    id: '1',                            // ← Keep unique
    title: 'E-Commerce Platform',       // ← Project name
    slug: 'ecommerce-platform',         // ← URL-friendly name
    description: 'Full-stack e-commerce solution with modern UI and robust backend',
    // ↑ Short description (1 sentence)
    
    longDescription: 'A comprehensive e-commerce platform built with Next.js and Node.js, featuring user authentication, payment processing, inventory management, and admin dashboard.',
    // ↑ Detailed description (2-3 sentences)
    
    image: '/images/projects/ecommerce-1.jpg',  // ← Main project image
    images: [                                     // ← Gallery images
      '/images/projects/ecommerce-1.jpg', 
      '/images/projects/ecommerce-2.jpg'
    ],
    
    technologies: [                     // ← Tech stack used
      'Next.js', 
      'TypeScript', 
      'Node.js', 
      'PostgreSQL', 
      'Stripe', 
      'Tailwind CSS'
    ],
    
    category: 'web',                    // ← Options: web, mobile, desktop, api, other
    featured: true,                     // ← Show on homepage? true/false
    status: 'completed',                // ← Options: completed, in-progress, planned
    
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',  // ← GitHub repo
    liveUrl: 'https://ecommerce-demo.vercel.app',                     // ← Live demo
    
    startDate: '2024-01-15',            // ← Format: YYYY-MM-DD
    endDate: '2024-03-20',              // ← Format: YYYY-MM-DD (optional)
    
    challenges: [                       // ← Problems you solved
      'Payment integration', 
      'Inventory synchronization', 
      'Performance optimization'
    ],
    
    learnings: [                        // ← What you learned
      'Advanced React patterns', 
      'Database optimization', 
      'Payment gateway integration'
    ]
  },
  // Add more projects...
];
```

**How to Add a New Project:**
Copy an existing project object and modify all the fields. Make sure to:
1. Increment the `id`
2. Create a unique `slug`
3. Add your project images to `public/images/projects/`
4. Update all URLs and descriptions

**How to Remove a Project:**
Delete the entire project object (including the curly braces and comma).

### 4. Work Experience

Find the `experience` array (around line 188):

```typescript
export const experience: Experience[] = [
  {
    id: '1',                            // ← Keep unique
    company: 'Tech Startup Inc.',       // ← Company name
    position: 'Senior Full Stack Developer', // ← Your job title
    startDate: '2022-06-01',            // ← Format: YYYY-MM-DD
    endDate: undefined,                 // ← Leave undefined for current job
    // OR
    // endDate: '2024-05-31',           // ← Format: YYYY-MM-DD for past jobs
    
    description: 'Led development of core platform features and mentored junior developers',
    // ↑ Brief job description (1-2 sentences)
    
    technologies: [                     // ← Tech stack you used
      'React', 
      'Node.js', 
      'PostgreSQL', 
      'AWS', 
      'Docker'
    ],
    
    achievements: [                     // ← Your accomplishments
      'Improved application performance by 40%',
      'Led team of 4 developers',
      'Implemented CI/CD pipeline reducing deployment time by 60%'
    ],
    
    location: 'San Francisco, CA',      // ← Job location
    type: 'full-time'                   // ← Options: full-time, part-time, contract, freelance
  },
  // Add more experience...
];
```

**How to Add a New Job:**
Copy an existing experience object and modify all fields.

**How to Remove a Job:**
Delete the entire experience object.

### 5. Education

Find the `education` array (around line 222):

```typescript
export const education: Education[] = [
  {
    id: '1',                            // ← Keep unique
    institution: 'University of Technology', // ← School name
    degree: 'Bachelor of Science',      // ← Degree type
    field: 'Computer Science',          // ← Major/field of study
    startDate: '2016-09-01',            // ← Format: YYYY-MM-DD
    endDate: '2020-05-31',              // ← Format: YYYY-MM-DD
    gpa: 3.8,                           // ← Your GPA (optional)
    
    honors: [                           // ← Academic honors (optional)
      'Magna Cum Laude', 
      "Dean's List"
    ],
    
    relevantCourses: [                  // ← Key courses (optional)
      'Data Structures', 
      'Algorithms', 
      'Web Development', 
      'Database Systems'
    ]
  },
  // Add more education...
];
```

## 📸 Adding Your Images

### Profile Photo
1. Add your photo to: `public/images/profile/profile-photo.jpg`
2. Recommended size: 400x400px (square)
3. Format: JPG or PNG

### Project Images
1. Add project screenshots to: `public/images/projects/`
2. Naming convention: `projectname-1.jpg`, `projectname-2.jpg`, etc.
3. Recommended size: 1200x800px (landscape)
4. Format: JPG or PNG

### Resume PDF
1. Add your resume to: `public/docs/resume.pdf`
2. Make sure it's named exactly `resume.pdf`

## 🎨 Customizing Colors (Optional)

If you want to change the color scheme, edit `src/app/globals.css`:

```css
/* Around line 17 */
--accent: 346 77% 49.8%; /* Pink accent #ec4899 */
```

**Color Variables:**
- `--accent` - Main accent color (buttons, links, highlights)
- `--primary` - Primary text color
- `--background` - Background color
- `--foreground` - Text color

## 🔧 Advanced Customization

### Changing the Header Logo
Edit `src/components/layout/header.tsx` (around line 73):

```tsx
<div className="w-8 h-8 bg-gradient-to-br from-pink-primary to-pink-vibrant rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-sm">YN</span>
  {/* ↑ Change "YN" to your initials */}
</div>
<span className="font-bold text-xl bg-gradient-to-r from-pink-primary to-pink-vibrant bg-clip-text text-transparent">
  Your Name
  {/* ↑ Change to your name */}
</span>
```

### Changing Page Title and Meta Description
Edit `src/app/layout.tsx` (around line 20):

```typescript
export const metadata: Metadata = {
  title: "Your Name - Full Stack Developer",  // ← Change page title
  description: "Passionate full-stack developer with expertise in modern web technologies. Explore my portfolio showcasing React, Next.js, Node.js projects and technical skills.",
  // ↑ Change meta description
  
  keywords: ["full stack developer", "web developer", "React", "Next.js", "Node.js", "TypeScript", "portfolio", "software engineer"],
  // ↑ Add relevant keywords
  
  authors: [{ name: "Your Name" }],  // ← Change author name
  creator: "Your Name",              // ← Change creator name
  
  // ... update other metadata fields
};
```

## ✅ Checklist - Before Going Live

- [ ] Updated `personalInfo` with your details
- [ ] Added all your skills to `skills` array
- [ ] Added your projects to `projects` array
- [ ] Added your work experience to `experience` array
- [ ] Added your education to `education` array
- [ ] Uploaded your profile photo to `public/images/profile/`
- [ ] Uploaded project screenshots to `public/images/projects/`
- [ ] Uploaded your resume to `public/docs/resume.pdf`
- [ ] Updated header logo with your initials
- [ ] Updated page title and meta description
- [ ] Tested all links (GitHub, LinkedIn, email, etc.)
- [ ] Verified all images load correctly
- [ ] Checked responsive design on mobile
- [ ] Tested contact form (if applicable)

## 🚀 Testing Your Changes

After making changes:

1. **Save the file** (`Ctrl+S` or `Cmd+S`)
2. **Check the terminal** for any errors
3. **Refresh your browser** (the page should auto-reload)
4. **Verify your changes** appear correctly

## 🐛 Common Issues

### Issue: Profile photo not showing
**Solution:** Make sure the file path in `portfolio.ts` matches the actual file location:
```typescript
profileImage: '/images/profile/profile-photo.jpg'
// File should be at: public/images/profile/profile-photo.jpg
```

### Issue: Skills not appearing
**Solution:** Check that each skill has a unique `id` and valid `category`:
```typescript
{ id: '1', name: 'React', category: 'frontend', proficiency: 90 }
```

### Issue: Project images broken
**Solution:** Verify image paths are correct:
```typescript
image: '/images/projects/myproject-1.jpg'
// File should be at: public/images/projects/myproject-1.jpg
```

### Issue: Social media links not working
**Solution:** Make sure URLs include `https://`:
```typescript
github: 'https://github.com/yourusername'  // ✅ Correct
github: 'github.com/yourusername'          // ❌ Wrong
```

## 📝 Quick Reference

| What to Change | File Location | Line Number (approx) |
|----------------|---------------|---------------------|
| Personal Info | `src/data/portfolio.ts` | 78 |
| Skills | `src/data/portfolio.ts` | 98 |
| Projects | `src/data/portfolio.ts` | 128 |
| Experience | `src/data/portfolio.ts` | 188 |
| Education | `src/data/portfolio.ts` | 222 |
| Header Logo | `src/components/layout/header.tsx` | 73 |
| Page Title | `src/app/layout.tsx` | 20 |
| Colors | `src/app/globals.css` | 17 |

## 💡 Pro Tips

1. **Start Small:** Update personal info first, then add skills, then projects
2. **Use Real Data:** Don't leave placeholder text - it looks unprofessional
3. **Optimize Images:** Compress images before uploading to improve load times
4. **Test Links:** Click every link to make sure they work
5. **Mobile First:** Always check how it looks on mobile devices
6. **Keep It Updated:** Regularly add new projects and skills as you learn

## 🎓 Need Help?

If you get stuck:
1. Check the terminal for error messages
2. Review this guide for common issues
3. Make sure all file paths are correct
4. Verify all required fields are filled in
5. Check that JSON syntax is correct (commas, brackets, quotes)

---

**Last Updated:** 2025-09-29  
**Difficulty:** Beginner-Friendly  
**Time Required:** 30-60 minutes for full customization


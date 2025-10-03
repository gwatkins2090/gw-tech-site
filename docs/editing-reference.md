# Portfolio Editing Reference - Visual Guide

## 📍 File Location

**Main File:** `src/data/portfolio.ts`

```
techportfolio/
├── src/
│   ├── data/
│   │   └── portfolio.ts  ← EDIT THIS FILE
│   ├── components/
│   └── app/
├── public/
│   ├── images/
│   │   ├── profile/
│   │   │   └── profile-photo.jpg  ← ADD YOUR PHOTO HERE
│   │   └── projects/
│   │       ├── project1-1.jpg  ← ADD PROJECT IMAGES HERE
│   │       └── project1-2.jpg
│   └── docs/
│       └── resume.pdf  ← ADD YOUR RESUME HERE
└── docs/
```

## 🎯 Section-by-Section Guide

### 1. Personal Information (Lines 78-96)

**What it looks like in the file:**

```typescript
78  export const personalInfo: PersonalInfo = {
79    name: 'Your Name',                    ← CHANGE THIS
80    title: 'Full Stack Developer',        ← CHANGE THIS
81    bio: 'Passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable solutions and learning new technologies.',
        ↑ CHANGE THIS (2-3 sentences about you)
82    location: 'San Francisco, CA',        ← CHANGE THIS
83    email: 'hello@yourname.dev',          ← CHANGE THIS
84    phone: '+1 (555) 123-4567',           ← CHANGE THIS
85    website: 'https://yourname.dev',      ← CHANGE THIS
86    resumeUrl: '/docs/resume.pdf',        ← Path to your resume
87    profileImage: '/images/profile/profile-photo.jpg',  ← Path to your photo
88    socialMedia: {
89      github: 'https://github.com/yourusername',      ← CHANGE THIS
90      linkedin: 'https://linkedin.com/in/yourusername', ← CHANGE THIS
91      twitter: 'https://twitter.com/yourusername',    ← CHANGE THIS
92    },
93    availability: 'available',            ← Options: 'available', 'busy', 'not-looking'
94    preferredRoles: ['Full Stack Developer', 'Frontend Developer', 'Software Engineer'],
        ↑ CHANGE THESE to your preferred job roles
95    interests: ['Web Development', 'AI/ML', 'Open Source', 'Tech Innovation']
        ↑ CHANGE THESE to your interests
96  };
```

**Where it appears on the website:**
- **Hero Section:** Name, title, bio
- **About Section:** Full bio, location, interests
- **Contact Section:** Email, phone, social media links
- **Header:** Name (in logo)

**Example - Before:**
```typescript
name: 'Your Name',
title: 'Full Stack Developer',
email: 'hello@yourname.dev',
```

**Example - After:**
```typescript
name: 'Sarah Johnson',
title: 'Frontend Developer & UI Designer',
email: 'sarah.johnson@gmail.com',
```

---

### 2. Skills (Lines 98-127)

**What it looks like in the file:**

```typescript
98   export const skills: Skill[] = [
99     // Frontend
100    { id: '1', name: 'React', category: 'frontend', proficiency: 90, color: '#61DAFB' },
       ↑    ↑         ↑              ↑                      ↑                ↑
       ID   Unique    Skill Name     Category              1-100            Brand Color
                                     (frontend/backend/                     (optional)
                                      database/tools/cloud)

101    { id: '2', name: 'Next.js', category: 'frontend', proficiency: 85, color: '#000000' },
102    { id: '3', name: 'TypeScript', category: 'frontend', proficiency: 88, color: '#3178C6' },
103    { id: '4', name: 'Tailwind CSS', category: 'frontend', proficiency: 92, color: '#06B6D4' },
104    { id: '5', name: 'Vue.js', category: 'frontend', proficiency: 75, color: '#4FC08D' },
105    
106    // Backend
107    { id: '6', name: 'Node.js', category: 'backend', proficiency: 85, color: '#339933' },
108    { id: '7', name: 'Express', category: 'backend', proficiency: 82, color: '#000000' },
109    { id: '8', name: 'Python', category: 'backend', proficiency: 78, color: '#3776AB' },
110    { id: '9', name: 'Django', category: 'backend', proficiency: 70, color: '#092E20' },
111    
112    // Database
113    { id: '10', name: 'PostgreSQL', category: 'database', proficiency: 80, color: '#4169E1' },
114    { id: '11', name: 'MongoDB', category: 'database', proficiency: 75, color: '#47A248' },
115    { id: '12', name: 'Redis', category: 'database', proficiency: 70, color: '#DC382D' },
116    
117    // Tools
118    { id: '13', name: 'Git', category: 'tools', proficiency: 90, color: '#F05032' },
119    { id: '14', name: 'Docker', category: 'tools', proficiency: 75, color: '#2496ED' },
120    { id: '15', name: 'Webpack', category: 'tools', proficiency: 70, color: '#8DD6F9' },
121    
122    // Cloud
123    { id: '16', name: 'AWS', category: 'cloud', proficiency: 72, color: '#FF9900' },
124    { id: '17', name: 'Vercel', category: 'cloud', proficiency: 85, color: '#000000' },
125    { id: '18', name: 'Netlify', category: 'cloud', proficiency: 80, color: '#00C7B7' },
126  ];
```

**Where it appears on the website:**
- **Skills Section:** Displayed as badges grouped by category

**How to add a new skill:**
```typescript
// Copy this template and fill in your details:
{ id: '19', name: 'Your Skill', category: 'frontend', proficiency: 85, color: '#HEXCODE' },
```

**How to remove a skill:**
Simply delete the entire line (including the comma at the end).

**Proficiency Guide:**
- 90-100: Expert (you could teach this)
- 75-89: Advanced (you use this regularly)
- 60-74: Intermediate (you're comfortable with this)
- Below 60: Beginner (you're still learning)

---

### 3. Projects (Lines 128-187)

**What it looks like in the file:**

```typescript
128  export const projects: Project[] = [
129    {
130      id: '1',                            ← Unique ID
131      title: 'E-Commerce Platform',       ← Project name
132      slug: 'ecommerce-platform',         ← URL-friendly name (no spaces)
133      description: 'Full-stack e-commerce solution with modern UI and robust backend',
          ↑ Short description (1 sentence)
134      longDescription: 'A comprehensive e-commerce platform built with Next.js and Node.js, featuring user authentication, payment processing, inventory management, and admin dashboard.',
          ↑ Detailed description (2-3 sentences)
135      image: '/images/projects/ecommerce-1.jpg',  ← Main image
136      images: [                                    ← Gallery images
137        '/images/projects/ecommerce-1.jpg', 
138        '/images/projects/ecommerce-2.jpg'
139      ],
140      technologies: [                     ← Tech stack
141        'Next.js', 
142        'TypeScript', 
143        'Node.js', 
144        'PostgreSQL', 
145        'Stripe', 
146        'Tailwind CSS'
147      ],
148      category: 'web',                    ← Options: web, mobile, desktop, api, other
149      featured: true,                     ← Show on homepage? true/false
150      status: 'completed',                ← Options: completed, in-progress, planned
151      githubUrl: 'https://github.com/yourusername/ecommerce-platform',  ← GitHub repo
152      liveUrl: 'https://ecommerce-demo.vercel.app',                     ← Live demo
153      startDate: '2024-01-15',            ← Format: YYYY-MM-DD
154      endDate: '2024-03-20',              ← Format: YYYY-MM-DD (optional)
155      challenges: [                       ← Problems you solved
156        'Payment integration', 
157        'Inventory synchronization', 
158        'Performance optimization'
159      ],
160      learnings: [                        ← What you learned
161        'Advanced React patterns', 
162        'Database optimization', 
163        'Payment gateway integration'
164      ]
165    },
166    // Add more projects here...
167  ];
```

**Where it appears on the website:**
- **Projects Section:** All projects displayed in a grid
- **Homepage:** Featured projects (where `featured: true`)

**Project Template (Copy & Paste):**
```typescript
{
  id: '2',  // ← Increment this number
  title: 'My Project Name',
  slug: 'my-project-name',
  description: 'Short one-sentence description',
  longDescription: 'Longer description with more details about the project.',
  image: '/images/projects/myproject-1.jpg',
  images: ['/images/projects/myproject-1.jpg'],
  technologies: ['React', 'Node.js', 'MongoDB'],
  category: 'web',
  featured: true,
  status: 'completed',
  githubUrl: 'https://github.com/yourusername/myproject',
  liveUrl: 'https://myproject.com',
  startDate: '2024-01-01',
  endDate: '2024-03-01',
  challenges: ['Challenge 1', 'Challenge 2'],
  learnings: ['Learning 1', 'Learning 2']
},
```

---

### 4. Work Experience (Lines 188-221)

**What it looks like in the file:**

```typescript
188  export const experience: Experience[] = [
189    {
190      id: '1',                            ← Unique ID
191      company: 'Tech Startup Inc.',       ← Company name
192      position: 'Senior Full Stack Developer', ← Your job title
193      startDate: '2022-06-01',            ← Format: YYYY-MM-DD
194      endDate: undefined,                 ← undefined = current job
          ↑ OR use '2024-05-31' for past jobs
195      description: 'Led development of core platform features and mentored junior developers',
          ↑ Brief job description (1-2 sentences)
196      technologies: [                     ← Tech stack you used
197        'React', 
198        'Node.js', 
199        'PostgreSQL', 
200        'AWS', 
201        'Docker'
202      ],
203      achievements: [                     ← Your accomplishments
204        'Improved application performance by 40%',
205        'Led team of 4 developers',
206        'Implemented CI/CD pipeline reducing deployment time by 60%'
207      ],
208      location: 'San Francisco, CA',      ← Job location
209      type: 'full-time'                   ← Options: full-time, part-time, contract, freelance
210    },
211    // Add more jobs here...
212  ];
```

**Where it appears on the website:**
- **About Section:** Work experience timeline

**Job Template (Copy & Paste):**
```typescript
{
  id: '2',  // ← Increment this number
  company: 'Company Name',
  position: 'Your Job Title',
  startDate: '2020-01-01',
  endDate: '2022-05-31',  // OR undefined for current job
  description: 'What you did at this job',
  technologies: ['Tech1', 'Tech2', 'Tech3'],
  achievements: [
    'Achievement 1',
    'Achievement 2',
    'Achievement 3'
  ],
  location: 'City, State',
  type: 'full-time'
},
```

---

### 5. Education (Lines 222-235)

**What it looks like in the file:**

```typescript
222  export const education: Education[] = [
223    {
224      id: '1',                            ← Unique ID
225      institution: 'University of Technology', ← School name
226      degree: 'Bachelor of Science',      ← Degree type
227      field: 'Computer Science',          ← Major/field of study
228      startDate: '2016-09-01',            ← Format: YYYY-MM-DD
229      endDate: '2020-05-31',              ← Format: YYYY-MM-DD
230      gpa: 3.8,                           ← Your GPA (optional)
231      honors: [                           ← Academic honors (optional)
232        'Magna Cum Laude', 
233        "Dean's List"
234      ],
235      relevantCourses: [                  ← Key courses (optional)
236        'Data Structures', 
237        'Algorithms', 
238        'Web Development', 
239        'Database Systems'
240      ]
241    },
242    // Add more education here...
243  ];
```

**Where it appears on the website:**
- **About Section:** Education timeline

**Education Template (Copy & Paste):**
```typescript
{
  id: '2',  // ← Increment this number
  institution: 'School Name',
  degree: 'Degree Type',
  field: 'Major',
  startDate: '2018-09-01',
  endDate: '2022-05-31',
  gpa: 3.5,  // Optional
  honors: ['Honor 1', 'Honor 2'],  // Optional
  relevantCourses: ['Course 1', 'Course 2']  // Optional
},
```

---

## 🎨 Color Codes Reference

Common brand colors for skills:

| Technology | Hex Code | Color |
|------------|----------|-------|
| React | #61DAFB | Light Blue |
| Vue.js | #4FC08D | Green |
| Angular | #DD0031 | Red |
| JavaScript | #F7DF1E | Yellow |
| TypeScript | #3178C6 | Blue |
| Node.js | #339933 | Green |
| Python | #3776AB | Blue |
| Java | #007396 | Blue |
| PHP | #777BB4 | Purple |
| Ruby | #CC342D | Red |
| Go | #00ADD8 | Cyan |
| Rust | #000000 | Black |
| HTML5 | #E34F26 | Orange |
| CSS3 | #1572B6 | Blue |
| Sass | #CC6699 | Pink |
| Tailwind | #06B6D4 | Cyan |
| Bootstrap | #7952B3 | Purple |
| MongoDB | #47A248 | Green |
| PostgreSQL | #4169E1 | Blue |
| MySQL | #4479A1 | Blue |
| Redis | #DC382D | Red |
| Docker | #2496ED | Blue |
| Kubernetes | #326CE5 | Blue |
| AWS | #FF9900 | Orange |
| Azure | #0078D4 | Blue |
| Git | #F05032 | Orange |
| GitHub | #181717 | Black |
| GitLab | #FCA121 | Orange |

## 📝 Syntax Rules

### Important Rules to Follow:

1. **Always use quotes around text:**
   ```typescript
   ✅ name: 'John Smith',
   ❌ name: John Smith,
   ```

2. **Always end lines with commas:**
   ```typescript
   ✅ name: 'John Smith',
   ❌ name: 'John Smith'
   ```

3. **Use square brackets for lists:**
   ```typescript
   ✅ technologies: ['React', 'Node.js'],
   ❌ technologies: 'React', 'Node.js',
   ```

4. **Use curly braces for objects:**
   ```typescript
   ✅ { id: '1', name: 'React' },
   ❌ id: '1', name: 'React',
   ```

5. **Dates must be in YYYY-MM-DD format:**
   ```typescript
   ✅ startDate: '2024-01-15',
   ❌ startDate: '01/15/2024',
   ❌ startDate: 'January 15, 2024',
   ```

6. **URLs must include https://**
   ```typescript
   ✅ github: 'https://github.com/username',
   ❌ github: 'github.com/username',
   ```

## 🔍 Quick Find Guide

Use `Ctrl+F` (Windows) or `Cmd+F` (Mac) to search for:

| What to Change | Search For | Line Number |
|----------------|------------|-------------|
| Your name | `name: 'Your Name'` | 79 |
| Your email | `email: 'hello@yourname.dev'` | 83 |
| GitHub URL | `github: 'https://github.com/yourusername'` | 89 |
| LinkedIn URL | `linkedin: 'https://linkedin.com/in/yourusername'` | 90 |
| Skills list | `export const skills` | 98 |
| Projects list | `export const projects` | 128 |
| Work experience | `export const experience` | 188 |
| Education | `export const education` | 222 |

## ✅ Validation Checklist

Before saving, check:

- [ ] All text is in quotes: `'like this'`
- [ ] All lines end with commas: `,`
- [ ] All brackets are closed: `{ }` `[ ]`
- [ ] All dates are YYYY-MM-DD format
- [ ] All URLs start with `https://`
- [ ] All IDs are unique numbers
- [ ] No duplicate commas: `,,`
- [ ] No missing commas between items

## 💾 Saving Your Changes

1. **Save the file:** `Ctrl+S` (Windows) or `Cmd+S` (Mac)
2. **Check the terminal:** Look for any error messages
3. **Refresh browser:** `F5` or `Ctrl+R`
4. **Verify changes:** Check that your info appears correctly

---

**Last Updated:** 2025-09-29  
**File Version:** portfolio.ts v1.0  
**Total Lines:** 235


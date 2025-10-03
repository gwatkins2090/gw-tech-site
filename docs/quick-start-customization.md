# Quick Start - Customize Your Portfolio in 5 Minutes

## 🎯 Goal
Get your personal information showing on the portfolio website as quickly as possible.

## 📋 What You'll Need
- Your name, email, and job title
- Links to your GitHub and LinkedIn profiles
- A profile photo (square, 400x400px recommended)
- Your resume as a PDF file

## 🚀 5-Minute Setup

### Step 1: Open the Configuration File (1 minute)

1. Open your code editor (VS Code, etc.)
2. Navigate to: `src/data/portfolio.ts`
3. This is the ONLY file you need to edit!

### Step 2: Update Your Basic Info (2 minutes)

Find this section (around line 78) and replace with your info:

```typescript
export const personalInfo: PersonalInfo = {
  name: 'John Smith',                           // ← YOUR NAME HERE
  title: 'Frontend Developer',                  // ← YOUR JOB TITLE
  bio: 'I build beautiful websites and love learning new technologies.',
  // ↑ YOUR BIO (2-3 sentences about you)
  
  location: 'New York, NY',                     // ← YOUR CITY
  email: 'john.smith@email.com',                // ← YOUR EMAIL
  phone: '+1 (555) 123-4567',                   // ← YOUR PHONE (optional)
```

### Step 3: Update Your Social Links (1 minute)

Scroll down a bit and update these:

```typescript
  socialMedia: {
    github: 'https://github.com/johnsmith',           // ← YOUR GITHUB
    linkedin: 'https://linkedin.com/in/johnsmith',    // ← YOUR LINKEDIN
    twitter: 'https://twitter.com/johnsmith',         // ← YOUR TWITTER (optional)
  },
```

### Step 4: Add Your Images (1 minute)

1. **Profile Photo:**
   - Save your photo as: `public/images/profile/profile-photo.jpg`
   - Make sure it's named exactly `profile-photo.jpg`

2. **Resume:**
   - Save your resume as: `public/docs/resume.pdf`
   - Make sure it's named exactly `resume.pdf`

### Step 5: Save and View! (30 seconds)

1. Save the file (`Ctrl+S` or `Cmd+S`)
2. Go to your browser
3. Refresh the page
4. See your info appear! 🎉

## ✅ Done!

Your portfolio now shows:
- ✅ Your name and title
- ✅ Your bio
- ✅ Your contact info
- ✅ Your social media links
- ✅ Your profile photo
- ✅ Your resume (downloadable)

## 🎨 Next Steps (Optional)

Want to add more? Here's what to customize next:

### Add Your Skills (5 minutes)

Find the `skills` array (around line 98) and add your skills:

```typescript
export const skills: Skill[] = [
  { id: '1', name: 'React', category: 'frontend', proficiency: 90 },
  { id: '2', name: 'JavaScript', category: 'frontend', proficiency: 85 },
  { id: '3', name: 'CSS', category: 'frontend', proficiency: 80 },
  // Add more skills here...
];
```

**Categories you can use:**
- `frontend` - HTML, CSS, JavaScript, React, Vue, etc.
- `backend` - Node.js, Python, Java, PHP, etc.
- `database` - MySQL, MongoDB, PostgreSQL, etc.
- `tools` - Git, Docker, VS Code, etc.
- `cloud` - AWS, Azure, Vercel, Netlify, etc.

**Proficiency levels:**
- 90-100: Expert
- 75-89: Advanced
- 60-74: Intermediate
- Below 60: Beginner

### Add Your Projects (10 minutes)

Find the `projects` array (around line 128) and add your projects:

```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'My Awesome Website',
    slug: 'my-awesome-website',
    description: 'A cool website I built for a client',
    longDescription: 'This project involved building a responsive website with modern design and smooth animations.',
    image: '/images/projects/website-1.jpg',
    images: ['/images/projects/website-1.jpg'],
    technologies: ['React', 'Tailwind CSS', 'Next.js'],
    category: 'web',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/yourusername/project',
    liveUrl: 'https://myproject.com',
    startDate: '2024-01-01',
    endDate: '2024-03-01',
  },
  // Add more projects...
];
```

**Don't forget to:**
1. Add project screenshots to `public/images/projects/`
2. Name them like: `myproject-1.jpg`, `myproject-2.jpg`, etc.

### Add Your Work Experience (10 minutes)

Find the `experience` array (around line 188):

```typescript
export const experience: Experience[] = [
  {
    id: '1',
    company: 'Tech Company Inc.',
    position: 'Frontend Developer',
    startDate: '2022-01-01',
    endDate: undefined,  // Leave undefined if current job
    description: 'Building awesome web applications',
    technologies: ['React', 'TypeScript', 'Node.js'],
    achievements: [
      'Built 5 major features',
      'Improved performance by 40%',
      'Mentored 2 junior developers'
    ],
    location: 'Remote',
    type: 'full-time'
  },
  // Add more jobs...
];
```

### Add Your Education (5 minutes)

Find the `education` array (around line 222):

```typescript
export const education: Education[] = [
  {
    id: '1',
    institution: 'University Name',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2018-09-01',
    endDate: '2022-05-31',
    gpa: 3.8,
    honors: ['Dean\'s List', 'Cum Laude'],
  },
  // Add more education...
];
```

## 📸 Image Guidelines

### Profile Photo
- **Size:** 400x400px (square)
- **Format:** JPG or PNG
- **Location:** `public/images/profile/profile-photo.jpg`
- **Tips:** 
  - Use a professional headshot
  - Good lighting
  - Neutral background
  - Smile! 😊

### Project Screenshots
- **Size:** 1200x800px (landscape)
- **Format:** JPG or PNG
- **Location:** `public/images/projects/`
- **Naming:** `projectname-1.jpg`, `projectname-2.jpg`, etc.
- **Tips:**
  - Show the best features
  - Use high-quality images
  - Crop out unnecessary parts

### Resume
- **Format:** PDF only
- **Location:** `public/docs/resume.pdf`
- **Tips:**
  - Keep it updated
  - 1-2 pages max
  - Professional formatting

## 🎨 Customizing Your Header Logo

Want to change the "YN" logo to your initials?

1. Open: `src/components/layout/header.tsx`
2. Find line 73 (approximately)
3. Change this:

```tsx
<span className="text-white font-bold text-sm">YN</span>
```

To your initials:

```tsx
<span className="text-white font-bold text-sm">JS</span>
```

4. Also change your name below:

```tsx
<span className="font-bold text-xl ...">
  John Smith
</span>
```

## 🔍 How to Find Things Quickly

### Using VS Code Search
1. Press `Ctrl+F` (Windows) or `Cmd+F` (Mac)
2. Type what you're looking for
3. Press Enter to find it

### Common Search Terms
- Search for `"Your Name"` to find placeholder text
- Search for `"yourusername"` to find placeholder URLs
- Search for `"San Francisco"` to find location placeholders

## ⚠️ Common Mistakes to Avoid

### 1. Missing Quotes
❌ Wrong:
```typescript
name: John Smith,
```

✅ Correct:
```typescript
name: 'John Smith',
```

### 2. Missing Commas
❌ Wrong:
```typescript
name: 'John Smith'
email: 'john@email.com'
```

✅ Correct:
```typescript
name: 'John Smith',
email: 'john@email.com',
```

### 3. Wrong File Paths
❌ Wrong:
```typescript
profileImage: 'profile-photo.jpg'
```

✅ Correct:
```typescript
profileImage: '/images/profile/profile-photo.jpg'
```

### 4. Broken URLs
❌ Wrong:
```typescript
github: 'github.com/johnsmith'
```

✅ Correct:
```typescript
github: 'https://github.com/johnsmith'
```

## 🐛 Troubleshooting

### My changes aren't showing up
1. Make sure you saved the file (`Ctrl+S`)
2. Refresh your browser (`F5` or `Ctrl+R`)
3. Check the terminal for error messages

### I see an error in the terminal
1. Look for the line number in the error
2. Check for missing commas or quotes
3. Make sure all brackets `{ }` are closed

### My image isn't showing
1. Check the file name matches exactly
2. Make sure the file is in the right folder
3. Try using a different image

### The page is blank
1. Check the terminal for errors
2. Make sure you didn't delete any important code
3. Try undoing your last change (`Ctrl+Z`)

## 📞 Need Help?

If you're stuck:
1. **Check the terminal** - errors show up there
2. **Read the error message** - it usually tells you what's wrong
3. **Undo your changes** - `Ctrl+Z` is your friend
4. **Start over** - sometimes it's easier to start fresh

## 🎓 Learning Resources

Want to learn more?
- **TypeScript Basics:** https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- **React Basics:** https://react.dev/learn
- **Next.js Docs:** https://nextjs.org/docs

## ✨ Final Checklist

Before you share your portfolio:

- [ ] Your name appears correctly
- [ ] Your email works when clicked
- [ ] Your profile photo shows up
- [ ] Your resume downloads correctly
- [ ] GitHub link opens your profile
- [ ] LinkedIn link opens your profile
- [ ] All skills are listed
- [ ] At least 2-3 projects added
- [ ] Work experience is current
- [ ] Education is accurate
- [ ] Tested on mobile phone
- [ ] Tested on tablet
- [ ] Tested on desktop

## 🎉 Congratulations!

You've successfully customized your portfolio! 

**Time spent:** ~30 minutes  
**Result:** A professional portfolio website showcasing your work

Now go share it with the world! 🚀

---

**Difficulty:** ⭐ Beginner  
**Time Required:** 5-30 minutes  
**Technical Knowledge:** None required!


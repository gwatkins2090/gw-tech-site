# Troubleshooting Guide - Portfolio Customization

## 🚨 Common Errors and Solutions

### Error: "Unexpected token" or "Syntax error"

**What it looks like:**
```
SyntaxError: Unexpected token, expected ","
```

**Common Causes:**

#### 1. Missing Comma
❌ **Wrong:**
```typescript
export const personalInfo: PersonalInfo = {
  name: 'John Smith'
  email: 'john@email.com',
};
```

✅ **Correct:**
```typescript
export const personalInfo: PersonalInfo = {
  name: 'John Smith',  // ← Added comma
  email: 'john@email.com',
};
```

#### 2. Missing Quotes
❌ **Wrong:**
```typescript
name: John Smith,
```

✅ **Correct:**
```typescript
name: 'John Smith',
```

#### 3. Extra Comma at End
❌ **Wrong:**
```typescript
technologies: ['React', 'Node.js',],  // ← Extra comma
```

✅ **Correct:**
```typescript
technologies: ['React', 'Node.js'],
```

---

### Error: "Cannot find module" or "Module not found"

**What it looks like:**
```
Error: Cannot find module './portfolio'
```

**Solution:**
- Make sure you didn't rename the file
- File should be named exactly: `portfolio.ts`
- File should be in: `src/data/portfolio.ts`

---

### Error: Image Not Showing

**Symptoms:**
- Broken image icon appears
- Alt text shows instead of image
- Console shows 404 error

**Solutions:**

#### 1. Check File Path
❌ **Wrong:**
```typescript
profileImage: 'profile-photo.jpg',
profileImage: 'images/profile/profile-photo.jpg',
profileImage: '/public/images/profile/profile-photo.jpg',
```

✅ **Correct:**
```typescript
profileImage: '/images/profile/profile-photo.jpg',
```

#### 2. Check File Name
- File names are case-sensitive!
- `Profile-Photo.jpg` ≠ `profile-photo.jpg`
- Make sure the name matches exactly

#### 3. Check File Location
```
✅ Correct location:
public/
  └── images/
      └── profile/
          └── profile-photo.jpg

❌ Wrong locations:
src/images/profile/profile-photo.jpg
images/profile/profile-photo.jpg
profile-photo.jpg
```

#### 4. Check File Format
- Supported: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Not supported: `.bmp`, `.tiff`, `.svg` (for profile photos)

---

### Error: Changes Not Showing Up

**Symptoms:**
- You saved the file but don't see changes
- Old content still appears

**Solutions:**

#### 1. Hard Refresh Browser
- **Windows:** `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`
- **Alternative:** Clear browser cache

#### 2. Check Terminal for Errors
Look for error messages in the terminal:
```
✅ Good (no errors):
✓ Compiled successfully

❌ Bad (has errors):
⨯ Error: Unexpected token
```

#### 3. Restart Development Server
1. In terminal, press `Ctrl + C` to stop
2. Run `npm run dev` again
3. Wait for "Ready" message
4. Refresh browser

#### 4. Check File Was Saved
- Look for unsaved indicator (dot) in VS Code tab
- Press `Ctrl+S` (Windows) or `Cmd+S` (Mac) to save
- Check file modification time

---

### Error: "Type 'string' is not assignable to type..."

**What it looks like:**
```
Type '"frontend"' is not assignable to type 'frontend' | 'backend' | 'database' | 'tools' | 'cloud'
```

**Solution:**
You used an invalid category. Only these are allowed:

**For Skills:**
- `frontend`
- `backend`
- `database`
- `tools`
- `cloud`

**For Projects:**
- `web`
- `mobile`
- `desktop`
- `api`
- `other`

**For Experience:**
- `full-time`
- `part-time`
- `contract`
- `freelance`

**For Availability:**
- `available`
- `busy`
- `not-looking`

❌ **Wrong:**
```typescript
{ id: '1', name: 'React', category: 'front-end', proficiency: 90 },
```

✅ **Correct:**
```typescript
{ id: '1', name: 'React', category: 'frontend', proficiency: 90 },
```

---

### Error: Duplicate IDs

**Symptoms:**
- Items not showing up
- Console warnings about duplicate keys

**Solution:**
Make sure every ID is unique:

❌ **Wrong:**
```typescript
export const skills: Skill[] = [
  { id: '1', name: 'React', category: 'frontend', proficiency: 90 },
  { id: '1', name: 'Vue.js', category: 'frontend', proficiency: 85 },  // ← Duplicate ID!
];
```

✅ **Correct:**
```typescript
export const skills: Skill[] = [
  { id: '1', name: 'React', category: 'frontend', proficiency: 90 },
  { id: '2', name: 'Vue.js', category: 'frontend', proficiency: 85 },  // ← Unique ID
];
```

---

### Error: Social Media Links Not Working

**Symptoms:**
- Clicking link does nothing
- Link goes to wrong page
- 404 error

**Solutions:**

#### 1. Include Full URL
❌ **Wrong:**
```typescript
github: 'github.com/username',
github: 'www.github.com/username',
github: '/username',
```

✅ **Correct:**
```typescript
github: 'https://github.com/username',
```

#### 2. Check Username
Make sure your username is correct:
```typescript
github: 'https://github.com/yourusername',  // ← Replace 'yourusername'
```

#### 3. Remove Trailing Slashes
❌ **Wrong:**
```typescript
github: 'https://github.com/username/',  // ← Extra slash
```

✅ **Correct:**
```typescript
github: 'https://github.com/username',
```

---

### Error: Resume Not Downloading

**Symptoms:**
- Resume button doesn't work
- 404 error when clicking resume
- Wrong file downloads

**Solutions:**

#### 1. Check File Location
```
✅ Correct:
public/
  └── docs/
      └── resume.pdf

❌ Wrong:
src/docs/resume.pdf
docs/resume.pdf
resume.pdf
```

#### 2. Check File Path in Code
```typescript
resumeUrl: '/docs/resume.pdf',  // ← Must start with /docs/
```

#### 3. Check File Name
- Must be named exactly: `resume.pdf`
- Case-sensitive: `Resume.pdf` ≠ `resume.pdf`

#### 4. Check File Format
- Must be PDF format
- Not Word (.docx) or other formats

---

### Error: Date Format Issues

**Symptoms:**
- Dates not showing correctly
- "Invalid date" error
- Timeline looks wrong

**Solution:**
Always use YYYY-MM-DD format:

❌ **Wrong:**
```typescript
startDate: '01/15/2024',
startDate: 'January 15, 2024',
startDate: '15-01-2024',
startDate: '2024/01/15',
```

✅ **Correct:**
```typescript
startDate: '2024-01-15',
```

---

### Error: Proficiency Must Be a Number

**What it looks like:**
```
Type 'string' is not assignable to type 'number'
```

**Solution:**

❌ **Wrong:**
```typescript
proficiency: '90',  // ← String (has quotes)
proficiency: '90%',
```

✅ **Correct:**
```typescript
proficiency: 90,  // ← Number (no quotes)
```

---

### Error: Boolean Values

**What it looks like:**
```
Type 'string' is not assignable to type 'boolean'
```

**Solution:**

❌ **Wrong:**
```typescript
featured: 'true',  // ← String
featured: 'false',
featured: 'yes',
featured: 1,
```

✅ **Correct:**
```typescript
featured: true,  // ← Boolean (no quotes)
featured: false,
```

---

## 🔧 Advanced Troubleshooting

### Clear Next.js Cache

If you're experiencing persistent issues:

1. Stop the development server (`Ctrl+C`)
2. Delete the `.next` folder
3. Run `npm run dev` again

**Commands:**
```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force .next

# Mac/Linux
rm -rf .next

# Then restart
npm run dev
```

---

### Check for Invisible Characters

Sometimes copy-pasting can add invisible characters:

**Solution:**
1. Delete the problematic line
2. Type it manually (don't copy-paste)
3. Save and test

---

### Validate JSON Syntax

Use an online JSON validator:
1. Copy your data section
2. Go to: https://jsonlint.com/
3. Paste and click "Validate JSON"
4. Fix any errors shown

---

## 📋 Debugging Checklist

When something goes wrong, check these in order:

- [ ] **1. Check Terminal** - Are there any error messages?
- [ ] **2. Check Browser Console** - Press F12, look for errors
- [ ] **3. Check File Saved** - Is there a dot in the VS Code tab?
- [ ] **4. Check Syntax** - Are all commas, quotes, and brackets correct?
- [ ] **5. Check File Paths** - Do all image/file paths start with `/`?
- [ ] **6. Check IDs** - Are all IDs unique?
- [ ] **7. Check Categories** - Are you using valid category names?
- [ ] **8. Check Dates** - Are all dates in YYYY-MM-DD format?
- [ ] **9. Check URLs** - Do all URLs start with `https://`?
- [ ] **10. Hard Refresh** - Try `Ctrl+Shift+R` in browser

---

## 🆘 Emergency Recovery

### If Everything Breaks

**Option 1: Undo Changes**
1. Press `Ctrl+Z` (Windows) or `Cmd+Z` (Mac) repeatedly
2. Keep undoing until it works again
3. Save the file
4. Refresh browser

**Option 2: Restore from Git**
```bash
# Discard all changes to portfolio.ts
git checkout src/data/portfolio.ts
```

**Option 3: Start Fresh**
1. Make a backup of your current file
2. Copy the original template
3. Add your information again carefully

---

## 📞 Getting Help

### Information to Provide

When asking for help, include:

1. **Error Message** - Copy the exact error from terminal
2. **What You Changed** - Which section were you editing?
3. **Code Snippet** - Show the problematic code
4. **Screenshots** - Show the error in browser/terminal
5. **Steps to Reproduce** - What did you do before the error?

### Example Help Request

```
❌ Bad:
"It's not working, help!"

✅ Good:
"I'm getting a syntax error when I try to add a new skill.
Error message: 'Unexpected token, expected ,'
I added this code on line 120:
{ id: '19', name: 'Vue.js' category: 'frontend', proficiency: 85 }
Screenshot attached."
```

---

## 🎓 Learning Resources

### Understanding TypeScript Errors
- https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

### JSON Syntax Guide
- https://www.json.org/json-en.html

### Next.js Documentation
- https://nextjs.org/docs

---

## ✅ Prevention Tips

### Before Making Changes

1. **Make a Backup** - Copy the file before editing
2. **Change One Thing** - Don't change everything at once
3. **Test Frequently** - Save and check after each change
4. **Read Error Messages** - They usually tell you what's wrong
5. **Use VS Code** - It highlights syntax errors

### While Editing

1. **Follow Examples** - Copy existing patterns
2. **Check Syntax** - Look for red squiggly lines in VS Code
3. **Use Auto-Complete** - Let VS Code suggest values
4. **Format Code** - Press `Shift+Alt+F` to auto-format
5. **Save Often** - `Ctrl+S` after every change

### After Making Changes

1. **Check Terminal** - Look for compilation errors
2. **Check Browser** - Verify changes appear correctly
3. **Test Links** - Click all links to make sure they work
4. **Test Images** - Make sure all images load
5. **Test Mobile** - Check responsive design

---

**Last Updated:** 2025-09-29  
**Difficulty:** All Levels  
**Purpose:** Solve common customization issues


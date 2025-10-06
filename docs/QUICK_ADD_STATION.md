# 🚀 Quick Add Station - 30 Second Guide

## 📝 Copy & Paste Template

1. Open: `src/data/radio-stations.ts`
2. Find the `radioStations` array
3. Add this at the end (before the closing `]`):

```typescript
,
{
  id: 'NEXT_NUMBER',
  name: 'Station Name Here',
  frequency: '92.3',
  genre: 'Genre • Subgenre',
  color: '#8b5cf6',
  url: '#',
  description: 'Short description here',
  tagline: 'Optional tagline'
}
```

## ✏️ Fill in the Blanks

- **id**: Use the next number (if last is '2', use '3')
- **name**: Your station name
- **frequency**: Any FM number (88.1 - 108.0)
- **genre**: Music style (use • between genres)
- **color**: Pick from list below
- **url**: Leave as `#` for now, add stream URL later
- **description**: One sentence about the station
- **tagline**: Optional catchy phrase

## 🎨 Quick Color Picker

Copy one of these:

```
#FF1744  - Hot Pink (energetic)
#00E5FF  - Cyan (cool/chill)
#8b5cf6  - Purple (mysterious)
#10b981  - Green (natural)
#f97316  - Orange (warm)
#eab308  - Yellow (bright)
```

## ✅ Example

```typescript
{
  id: '3',
  name: 'Sunset Lounge',
  frequency: '95.7',
  genre: 'Lounge • Chillout',
  color: '#f97316',
  url: '#',
  description: 'Relaxing vibes for golden hour',
  tagline: 'Where the day winds down'
}
```

## 💾 Save & Done!

Save the file and refresh your browser. That's it! 🎉

---

**Pro Tip**: Don't forget the comma before your new station if it's not the first one!


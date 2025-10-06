# 📻 Radio Stations Page - Complete Guide

## 🎯 Overview

The Radio Stations page (`/stations`) is a stunning, interactive interface that showcases your radio stations with a vintage radio aesthetic meets cutting-edge web technology.

## ✨ Features

- **3D Radio Interface** - Realistic radio controls with working power button
- **Live Audio Visualizer** - Pulsing bars that react to simulated audio levels
- **Smooth Animations** - Physics-based transitions with Framer Motion
- **Retro Neon Aesthetic** - Glowing effects and vintage radio styling
- **Frequency Dial** - Interactive tuning system with smooth animations
- **Responsive Design** - Looks amazing on all devices
- **Glassmorphism** - Modern glass effects on vintage radio elements
- **Warming Up Effect** - Realistic radio warm-up animation when powered on

## 📁 File Structure

```
src/
├── app/
│   └── stations/
│       └── page.tsx          ← Main radio stations page
└── data/
    └── radio-stations.ts     ← Station configuration (EDIT THIS!)
```

## 🚀 How to Add a New Station

### Step 1: Open the Configuration File

Navigate to: `src/data/radio-stations.ts`

### Step 2: Copy the Template

Find the commented template at the bottom of the `radioStations` array:

```typescript
{
  id: '3',
  name: 'Your Station Name',
  frequency: '92.3',
  genre: 'Genre • Subgenre',
  color: '#8b5cf6',
  url: '#', // Replace with actual stream URL
  description: 'Your station description here',
  tagline: 'Optional tagline'
}
```

### Step 3: Customize Your Station

```typescript
{
  id: '3',                              // Unique ID (increment from last station)
  name: 'Midnight Jazz Lounge',        // Station name (shows on card)
  frequency: '92.3',                    // FM frequency (any format)
  genre: 'Jazz • Smooth Jazz',          // Genre tags (use • separator)
  color: '#8b5cf6',                     // Hex color for glow effects
  url: 'https://stream.example.com',    // Your actual stream URL
  description: 'Smooth jazz vibes for late night listening',
  tagline: 'Where the night comes alive'  // Optional tagline
}
```

### Step 4: Add to the Array

Uncomment the template and add it to the `radioStations` array:

```typescript
export const radioStations: RadioStation[] = [
  {
    id: '1',
    name: 'Cosmic Waves FM',
    // ... existing station
  },
  {
    id: '2',
    name: 'Neon Nights Radio',
    // ... existing station
  },
  {
    id: '3',
    name: 'Midnight Jazz Lounge',
    frequency: '92.3',
    genre: 'Jazz • Smooth Jazz',
    color: '#8b5cf6',
    url: 'https://stream.example.com',
    description: 'Smooth jazz vibes for late night listening',
    tagline: 'Where the night comes alive'
  },
  // Add more stations here...
];
```

### Step 5: Save and Refresh

Save the file and refresh your browser. Your new station will automatically appear!

## 🎨 Color Palette Suggestions

Choose colors that match your station's vibe:

### Energetic/Electronic
- `#FF1744` - Hot Pink
- `#ec4899` - Pink Primary
- `#f472b6` - Light Pink

### Cool/Chill
- `#00E5FF` - Cyan
- `#06b6d4` - Sky Blue
- `#3b82f6` - Blue

### Mysterious/Ambient
- `#8b5cf6` - Purple
- `#a78bfa` - Light Purple
- `#c084fc` - Lavender

### Natural/Organic
- `#10b981` - Emerald
- `#34d399` - Green
- `#6ee7b7` - Mint

### Warm/Energetic
- `#f97316` - Orange
- `#fb923c` - Light Orange
- `#fdba74` - Peach

### Bright/Happy
- `#eab308` - Yellow
- `#fbbf24` - Gold
- `#fcd34d` - Light Yellow

## 🔧 Advanced Customization

### Changing the Page Title

Edit `src/app/stations/page.tsx` around line 130:

```typescript
<h1 className="text-6xl font-bold bg-gradient-to-r from-pink-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
  Radio Stations  {/* Change this text */}
</h1>
```

### Changing the Subtitle

Edit around line 135:

```typescript
<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
  Tune in to the frequencies of tomorrow  {/* Change this text */}
</p>
```

### Adjusting Animation Speed

Find the `animate` props in the motion components and adjust the `duration`:

```typescript
transition={{ duration: 2, repeat: Infinity }}  // Change duration value
```

## 🎵 Connecting Real Audio Streams

When you're ready to connect actual audio streams:

### Step 1: Update the URL

In `src/data/radio-stations.ts`, replace the `#` with your stream URL:

```typescript
url: 'https://your-stream-url.com/stream',
```

### Step 2: Add Audio Player (Optional)

If you want to actually play the streams, you'll need to add an HTML5 audio element. Here's a basic example:

```typescript
// Add to the stations page component
const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

useEffect(() => {
  if (selectedStation && isOn) {
    const audio = new Audio(selectedStation.url);
    audio.play();
    setAudioRef(audio);
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }
}, [selectedStation, isOn]);
```

## 📱 Mobile Optimization

The page is fully responsive! On mobile:
- Cards stack vertically
- Touch interactions work smoothly
- Animations are optimized for performance
- Text sizes adjust automatically

## 🐛 Troubleshooting

### Station Not Showing Up?

1. Check that the ID is unique
2. Make sure all required fields are filled
3. Verify the color is in hex format (`#RRGGBB`)
4. Check for syntax errors (missing commas, brackets)

### Colors Not Working?

- Use hex format: `#FF1744` (not `rgb()` or color names)
- Include the `#` symbol
- Use 6-digit hex codes

### Animations Laggy?

- Reduce the number of particles in background effects
- Decrease animation durations
- Check browser performance settings

## 💡 Pro Tips

1. **Consistent Frequencies**: Use realistic FM frequencies (88.1 - 108.0)
2. **Color Harmony**: Choose colors that complement each other
3. **Genre Format**: Use the `•` separator for clean genre tags
4. **Descriptions**: Keep them concise but engaging (under 60 characters)
5. **Testing**: Always test on mobile after adding stations

## 🎨 Design Philosophy

This page was designed to evoke:
- **Nostalgia**: Vintage radio aesthetics
- **Innovation**: Modern web technologies
- **Tactility**: Feels like touching real equipment
- **Delight**: Micro-interactions that surprise and engage

## 📊 Performance

- Optimized animations with `will-change` and `transform`
- Lazy loading for heavy effects
- Reduced motion support for accessibility
- GPU-accelerated animations

## 🔮 Future Enhancements

Ideas for extending the page:
- Real audio streaming integration
- Playlist/schedule display
- Chat/comments for each station
- Favorites/bookmarking system
- Social sharing
- Now playing information
- DJ profiles

## 📞 Need Help?

If you run into issues:
1. Check the browser console for errors
2. Verify all imports are correct
3. Make sure Framer Motion is installed
4. Check that Lucide React icons are available

---

**Remember**: This page is designed to be memorable. Every pixel is intentional. Have fun adding your stations! 🎵


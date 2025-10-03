# Sacred Mandala Background - Visual Guide

## Component Overview

The Sacred Mandala Background is a multi-layered animated background featuring sacred geometry patterns that create a mesmerizing, spiritual aesthetic for your portfolio.

## Visual Layers (Front to Back)

```
┌─────────────────────────────────────────────────────────────┐
│                     CONTENT LAYER (z-10)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Header (z-50) - Sticky Navigation                   │   │
│  │  • Backdrop blur: bg-background/95                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Hero Section                                        │   │
│  │  • bg-background/10 backdrop-blur-sm                 │   │
│  │  • Content: bg-background/15 backdrop-blur-sm        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  About / Projects / Skills / Contact Sections        │   │
│  │  • bg-background/15 backdrop-blur-sm                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              SACRED MANDALA BACKGROUND (z-0)                 │
│                                                              │
│  Layer 7: Central Glow (6s pulse)                           │
│  • Radial gradient: pink → purple → transparent             │
│  • Filter: blur(60px)                                       │
│  • Opacity: [0.2, 0.5, 0.2]                                 │
│                                                              │
│  Layer 6: Particle Field (50 particles)                     │
│  • Random positions across viewport                         │
│  • Individual animations (3-7s duration)                    │
│  • Pink glow with box-shadow                                │
│  • Opacity: [0, 1, 0], Scale: [0, 1.5, 0]                  │
│                                                              │
│  Layer 5: Inner Metatron's Cube (60vmin)                    │
│  • Rotation: -360° in 25s (counter-clockwise)               │
│  • Scale: [0.8, 0.85, 0.8] in 10s                          │
│  • Colors: Pink → Purple → Blue gradient                    │
│  • 13 interconnected circles with sacred geometry           │
│                                                              │
│  Layer 4: Sri Yantra Pattern (80vmin)                       │
│  • Rotation: 360° in 35s (clockwise)                        │
│  • Scale: [0.85, 0.9, 0.85] in 12s                         │
│  • 5 interlocking triangles (upward & downward)             │
│  • Central bindu with pulse animation                       │
│                                                              │
│  Layer 3: Fibonacci Spiral (100vmin)                        │
│  • Rotation: -360° in 45s (counter-clockwise)               │
│  • Scale: [0.9, 0.95, 0.9] in 15s                          │
│  • 12 circles following golden ratio (φ = 1.618)            │
│  • Golden angle: 137.5°                                     │
│                                                              │
│  Layer 2: Outer Metatron's Cube (120vmin)                   │
│  • Rotation: 360° in 60s (clockwise)                        │
│  • Scale: [1, 1.05, 1] in 20s                              │
│  • Largest layer, provides depth                            │
│                                                              │
│  Layer 1: Ambient Glow                                      │
│  • Radial gradient: purple → transparent                    │
│  • Opacity: [0.3, 0.6, 0.3] in 8s                          │
│  • Scale: [1, 1.1, 1] in 8s (breathing effect)             │
│                                                              │
│  Layer 0: Base Gradient                                     │
│  • from-slate-950 via-purple-950/50 to-slate-950            │
│  • Static, provides dark foundation                         │
└─────────────────────────────────────────────────────────────┘
```

## Sacred Geometry Patterns

### 1. Metatron's Cube
```
        ○
       ╱ ╲
      ○   ○
     ╱ ╲ ╱ ╲
    ○───○───○
     ╲ ╱ ╲ ╱
      ○   ○
       ╲ ╱
        ○
```
- **Structure**: 13 circles (1 center + 6 inner + 6 outer)
- **Meaning**: Contains all 5 Platonic solids, represents creation
- **Animation**: Dual-layer rotation (clockwise & counter-clockwise)
- **Colors**: Pink (#ec4899) → Purple (#8b5cf6) → Blue (#3b82f6)

### 2. Sri Yantra
```
      △
     ╱ ╲
    △   △
   ╱ ╲ ╱ ╲
  ▽───●───▽
   ╲ ╱ ╲ ╱
    ▽   ▽
```
- **Structure**: 5 interlocking triangles (3 upward, 2 downward)
- **Meaning**: Represents cosmic unity and divine feminine/masculine
- **Animation**: Clockwise rotation with central bindu pulse
- **Colors**: Pink shades (#ec4899, #f472b6, #f9a8d4) + Purple (#8b5cf6, #a78bfa)

### 3. Fibonacci Spiral
```
    ○ ○ ○
   ○     ○
  ○   ●   ○
   ○     ○
    ○ ○ ○
```
- **Structure**: 12 circles following golden ratio (φ = 1.618)
- **Meaning**: Natural growth pattern, divine proportion
- **Animation**: Counter-clockwise rotation
- **Colors**: Blue (#3b82f6) → Purple (#8b5cf6) → Pink (#ec4899)

## Color Palette

### Primary Colors
- **Pink Primary**: `#ec4899` - Main accent, matches portfolio theme
- **Purple**: `#8b5cf6` - Sacred geometry accent, mystical feel
- **Blue**: `#3b82f6` - Depth and variation, cool contrast

### Background Colors
- **Slate 950**: `#0f172a` - Deep dark base
- **Purple 950**: `#4c1d95` - Dark purple for gradient

### Opacity Levels
- **Background Base**: Solid (opacity: 1.0)
- **Geometry Patterns**: 0.3 - 0.6 (subtle, non-distracting)
- **Particle Field**: 0 - 1 (pulsing effect)
- **Central Glow**: 0.2 - 0.5 (gentle breathing)

## Animation Timing

### Rotation Speeds (Slowest to Fastest)
1. **Outer Metatron's Cube**: 60s per rotation (slowest, most subtle)
2. **Fibonacci Spiral**: 45s per rotation
3. **Sri Yantra**: 35s per rotation
4. **Inner Metatron's Cube**: 25s per rotation (fastest, most dynamic)

### Scale Animations (Slowest to Fastest)
1. **Outer Metatron's Cube**: 20s breathing cycle
2. **Fibonacci Spiral**: 15s breathing cycle
3. **Sri Yantra**: 12s breathing cycle
4. **Inner Metatron's Cube**: 10s breathing cycle

### Special Effects
- **Ambient Glow**: 8s opacity + scale breathing
- **Central Glow**: 6s opacity pulse
- **Particle Field**: 3-7s individual animations (randomized)
- **Sri Yantra Bindu**: 3s radius pulse

## Responsive Design

### Size Units
- **vmin**: Viewport minimum (width or height, whichever is smaller)
  - Ensures patterns scale proportionally on all screen sizes
  - Maintains aspect ratio on portrait and landscape orientations

### Layer Sizes
- **Outer Metatron's Cube**: 120vmin (largest)
- **Fibonacci Spiral**: 100vmin
- **Sri Yantra**: 80vmin
- **Inner Metatron's Cube**: 60vmin (smallest)

### Mobile Optimization
- Patterns automatically scale down on smaller screens
- Particle count remains at 50 (lightweight)
- Animations use GPU acceleration (`willChange: transform`)

## Accessibility Features

### Reduced Motion Support
When user has `prefers-reduced-motion: reduce` enabled:
- ✅ All animations are disabled
- ✅ Patterns remain static
- ✅ No particle field
- ✅ No pulsing or breathing effects
- ✅ Background becomes a static sacred geometry display

### ARIA Attributes
```tsx
role="presentation"
aria-hidden="true"
```
- Indicates decorative content
- Screen readers skip the background
- Focuses on actual content

## Performance Considerations

### Optimization Techniques
1. **GPU Acceleration**: `willChange: transform` on animated elements
2. **Pointer Events**: `pointer-events-none` allows click-through
3. **Fixed Positioning**: Reduces repaints during scroll
4. **Conditional Rendering**: Particle field only renders if motion is allowed
5. **SVG Optimization**: Inline SVG for faster rendering

### Performance Metrics
- **FPS**: Maintains 60fps on modern hardware
- **Memory**: Lightweight SVG patterns
- **CPU**: Offloaded to GPU via CSS transforms
- **Bundle Size**: ~10KB (component only)

## Customization Guide

### Adjusting Animation Speed
```tsx
// In sacred-mandala-background.tsx
transition={{
  rotate: { duration: 60 }, // Change this value (in seconds)
  scale: { duration: 20 },   // Change this value (in seconds)
}}
```

### Adjusting Opacity
```tsx
// Pattern opacity
opacity="0.3"  // Change to 0.1 - 0.8 range

// Glow opacity
opacity: [0.2, 0.5, 0.2]  // Change middle value for intensity
```

### Adjusting Colors
```tsx
// In gradient definitions
stopColor="#ec4899"  // Change to any hex color
stopOpacity="0.8"    // Change to 0.0 - 1.0
```

### Adjusting Size
```tsx
// Layer container size
style={{ width: '120vmin', height: '120vmin' }}
// Change vmin value (60-150 recommended)
```

## Troubleshooting

### Background Not Visible
- Check z-index: Background should be 0, content should be 10+
- Check opacity: Patterns should have opacity 0.3-0.6
- Check colors: Ensure contrast with dark theme

### Animations Not Running
- Check `prefers-reduced-motion` setting
- Verify Framer Motion is installed
- Check browser console for errors

### Performance Issues
- Reduce particle count (50 → 25)
- Increase animation durations (slower = less CPU)
- Disable particle field for low-end devices

### Content Not Readable
- Increase backdrop blur: `backdrop-blur-sm` → `backdrop-blur-md`
- Increase background opacity: `bg-background/15` → `bg-background/30`
- Add text shadows to headings

---

**Last Updated**: 2025-09-29
**Component Version**: 1.0.0
**Compatibility**: Next.js 15+, React 18+, Framer Motion 11+

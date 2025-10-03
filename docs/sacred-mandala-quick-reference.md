# Sacred Mandala Background - Quick Reference

## 🎯 Quick Start

### Import and Use
```tsx
import SacredMandalaBackground from '@/components/portfolio/sacred-mandala-background';

<SacredMandalaBackground />
```

### Location
- **Component**: `src/components/portfolio/sacred-mandala-background.tsx`
- **Used in**: `src/app/layout.tsx`

## 🎨 Visual Elements

| Element | Size | Rotation | Duration | Direction |
|---------|------|----------|----------|-----------|
| Outer Metatron's Cube | 120vmin | 360° | 60s | Clockwise |
| Fibonacci Spiral | 100vmin | 360° | 45s | Counter-clockwise |
| Sri Yantra | 80vmin | 360° | 35s | Clockwise |
| Inner Metatron's Cube | 60vmin | 360° | 25s | Counter-clockwise |
| Particle Field | 2px | - | 3-7s | Pulse |
| Central Glow | 384px | - | 6s | Pulse |
| Ambient Glow | Full | - | 8s | Breathe |

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Pink Primary | `#ec4899` | Main accent, particles |
| Purple | `#8b5cf6` | Sacred geometry |
| Blue | `#3b82f6` | Depth, variation |
| Slate 950 | `#0f172a` | Dark base |
| Purple 950 | `#4c1d95` | Gradient accent |

## 📐 Z-Index Hierarchy

```
100 - Modals/Overlays
 50 - Header (sticky)
 10 - Content (main, sections)
  0 - Background (Sacred Mandala)
```

## 🎭 Backdrop Blur Settings

| Section | Background | Backdrop Blur |
|---------|-----------|---------------|
| Hero | `bg-background/10` | `backdrop-blur-sm` |
| Hero Content | `bg-background/15` | `backdrop-blur-sm` |
| About | `bg-background/15` | `backdrop-blur-sm` |
| Skills | `bg-muted/10` | `backdrop-blur-sm` |
| Projects | `bg-background/15` | `backdrop-blur-sm` |
| Contact | `bg-muted/10` | `backdrop-blur-sm` |
| Header | `bg-background/95` | `backdrop-blur` |

## ⚡ Performance Tips

### Optimization Checklist
- ✅ `willChange: transform` on animated elements
- ✅ `pointer-events-none` on background
- ✅ Fixed positioning for scroll performance
- ✅ GPU-accelerated CSS transforms
- ✅ Conditional particle rendering
- ✅ Reduced motion support

### If Performance Issues
1. Reduce particle count: `50` → `25`
2. Increase animation duration: `25s` → `40s`
3. Disable particle field
4. Reduce pattern opacity

## ♿ Accessibility

### Features
- ✅ `prefers-reduced-motion` support
- ✅ `role="presentation"`
- ✅ `aria-hidden="true"`
- ✅ No interactive elements
- ✅ Content remains readable

### Testing
```bash
# Enable reduced motion in browser DevTools
# Settings → Accessibility → Emulate CSS prefers-reduced-motion
```

## 🔧 Common Customizations

### Change Animation Speed
```tsx
// Slower (more subtle)
duration: 90  // was 60

// Faster (more dynamic)
duration: 30  // was 60
```

### Change Opacity
```tsx
// More subtle
opacity="0.2"  // was 0.3

// More prominent
opacity="0.6"  // was 0.3
```

### Change Size
```tsx
// Smaller
width: '80vmin'  // was 120vmin

// Larger
width: '150vmin'  // was 120vmin
```

### Change Colors
```tsx
// In gradient definitions
stopColor="#your-color"
stopOpacity="0.8"
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Background not visible | Check z-index (should be 0) |
| Content not readable | Increase backdrop blur or bg opacity |
| Animations not running | Check `prefers-reduced-motion` setting |
| Performance lag | Reduce particle count or animation speed |
| Colors don't match theme | Update stopColor values in gradients |

## 📱 Responsive Behavior

### Breakpoints
- **Mobile**: Patterns scale down automatically (vmin units)
- **Tablet**: Full effect maintained
- **Desktop**: Optimal viewing experience

### Size Units
- `vmin`: Viewport minimum (width or height, whichever is smaller)
- Ensures proportional scaling on all devices

## 🔄 Reverting to Old Background

### Quick Revert
```tsx
// In src/app/layout.tsx
// Change:
import SacredMandalaBackground from '@/components/portfolio/sacred-mandala-background';
<SacredMandalaBackground />

// To:
import FlowerOfLifeBackground from '@/components/portfolio/simple-flower-background';
<FlowerOfLifeBackground />
```

## 📊 Animation Timing Reference

### Rotation Speeds (Slowest → Fastest)
1. Outer Metatron: 60s
2. Fibonacci: 45s
3. Sri Yantra: 35s
4. Inner Metatron: 25s

### Scale Breathing (Slowest → Fastest)
1. Outer Metatron: 20s
2. Fibonacci: 15s
3. Sri Yantra: 12s
4. Inner Metatron: 10s

### Special Effects
- Ambient Glow: 8s
- Central Glow: 6s
- Particles: 3-7s (random)
- Bindu: 3s

## 🎯 Sacred Geometry Meanings

| Pattern | Symbolism |
|---------|-----------|
| Metatron's Cube | Creation, contains all Platonic solids |
| Sri Yantra | Cosmic unity, divine balance |
| Fibonacci Spiral | Natural growth, golden ratio |

## 📦 Dependencies

```json
{
  "react": "^18.0.0",
  "framer-motion": "^11.0.0",
  "next": "^15.0.0"
}
```

## 🚀 Deployment Checklist

- [x] Component created and exported
- [x] Imported in layout.tsx
- [x] TypeScript types defined
- [x] No console errors
- [x] Animations working
- [x] Reduced motion tested
- [x] Mobile responsive
- [x] Content readable
- [x] Performance optimized

## 📚 Documentation

- **Full Guide**: `docs/sacred-mandala-integration.md`
- **Visual Guide**: `docs/sacred-mandala-visual-guide.md`
- **Quick Reference**: `docs/sacred-mandala-quick-reference.md` (this file)

## 🔗 Related Files

```
src/
├── components/portfolio/
│   ├── sacred-mandala-background.tsx  ← Main component
│   └── simple-flower-background.tsx   ← Old component (backup)
├── app/
│   ├── layout.tsx                     ← Integration point
│   └── globals.css                    ← Utility classes
└── docs/
    ├── sacred-mandala-integration.md
    ├── sacred-mandala-visual-guide.md
    └── sacred-mandala-quick-reference.md
```

## 💡 Pro Tips

1. **Subtle is Better**: Keep opacity low (0.3-0.4) for professional look
2. **Slow Animations**: Longer durations (60s+) are more elegant
3. **Test Readability**: Always check text contrast on all sections
4. **Mobile First**: Test on mobile devices for performance
5. **Accessibility**: Always respect reduced motion preferences

## 🎨 Design Philosophy

The Sacred Mandala Background follows these principles:
- **Subtle**: Never distracts from content
- **Elegant**: Slow, graceful animations
- **Meaningful**: Sacred geometry with spiritual significance
- **Performant**: GPU-accelerated, optimized rendering
- **Accessible**: Respects user preferences

---

**Version**: 1.0.0  
**Last Updated**: 2025-09-29  
**Status**: ✅ Production Ready


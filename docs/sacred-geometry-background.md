# Sacred Geometry Background System

## Overview

The Sacred Geometry Background is an advanced animated background system for the hero section, featuring mathematically precise geometric patterns inspired by sacred geometry principles. The system creates a visually stunning, performance-optimized backdrop with multiple layers of animated elements.

## Components

### 1. Flower of Life (`FlowerOfLife`)
- **Purpose**: Primary background pattern based on the ancient Flower of Life symbol
- **Variants**: 
  - `basic`: 7 circles in traditional pattern
  - `extended`: Additional outer ring for more complexity
- **Features**: 
  - Gradient fills with pink/magenta color scheme
  - Scalable SVG implementation
  - Configurable opacity and size

### 2. Mandala Patterns (`Mandala`)
- **Purpose**: Mid-layer rotating elements with customizable complexity
- **Features**:
  - Configurable petal/ray count (complexity parameter)
  - Radial gradient fills
  - Multiple concentric circles
  - Geometric ray patterns

### 3. Metatron's Cube (`MetatronsCube`)
- **Purpose**: Advanced sacred geometry pattern with 13 circles and connecting lines
- **Features**:
  - 13-circle configuration
  - Interconnected line patterns
  - Star of David integration
  - Complex geometric relationships

### 4. Floating Geometry (`FloatingGeometry`)
- **Purpose**: Small foreground elements for additional visual interest
- **Types**: Triangle, Hexagon, Diamond
- **Features**: Simple geometric shapes with gradient strokes

## Animation System

### Performance Tiers

1. **Full Performance Mode**:
   - All elements active with full animations
   - Parallax scrolling effects
   - Complex rotation and scaling
   - Color shifting animations

2. **Reduced Motion Mode**:
   - Static elements only
   - Respects `prefers-reduced-motion` setting
   - Maintains visual appeal without motion

3. **Low Performance Mode**:
   - Automatically detected via performance monitoring
   - Reduced complexity (fewer mandala rays)
   - Simplified animations
   - Conditional element rendering

### Animation Types

#### Rotation Animations
- **Slow Rotation**: 20-25 seconds per revolution
- **Medium Rotation**: 15 seconds per revolution  
- **Fast Rotation**: 10 seconds per revolution
- **Reverse Rotation**: Counter-clockwise movement

#### Scale Animations
- **Pulse Effect**: 0.8x to 1.2x scale variation
- **Breathing Effect**: Subtle 0.9x to 1.1x variation
- **Entrance Scaling**: 0.5x to 1.0x on component mount

#### Color Animations
- **Hue Shifting**: Subtle color transitions within pink/magenta spectrum
- **Opacity Variations**: Dynamic transparency changes
- **Gradient Animations**: Moving gradient effects

#### Parallax Effects
- **Slow Parallax**: 0.1x scroll multiplier
- **Medium Parallax**: 0.2x scroll multiplier
- **Fast Parallax**: 0.3x scroll multiplier

## Technical Implementation

### Performance Optimizations

1. **CSS Transforms Only**:
   ```css
   will-change: transform;
   transform-style: preserve-3d;
   backface-visibility: hidden;
   ```

2. **Efficient Animation Properties**:
   - Uses `translateX`, `translateY`, `rotate`, `scale`
   - Avoids layout-triggering properties
   - Hardware acceleration enabled

3. **Conditional Rendering**:
   - Performance monitoring integration
   - Automatic complexity reduction
   - Memory usage tracking

4. **Accessibility**:
   - `prefers-reduced-motion` support
   - Graceful degradation
   - Screen reader friendly (decorative elements)

### Browser Compatibility

- **Modern Browsers**: Full feature support
- **Older Browsers**: Graceful fallback to static elements
- **Mobile Devices**: Optimized performance tier detection

## Customization

### Color Scheme
The system uses CSS custom properties for easy theming:
```css
--pink-primary: #ec4899
--pink-vibrant: #FF1744
--red-highlight: #FF3838
--red-secondary: #ef4444
```

### Animation Timing
Modify animation durations in the variants objects:
```typescript
const rotateVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20, // Adjust timing here
      repeat: Infinity,
      ease: "linear"
    }
  }
};
```

### Element Positioning
Adjust element positions using Tailwind classes:
```typescript
className="absolute top-1/4 right-1/4" // Modify positioning
```

## Usage

### Basic Implementation
```tsx
import SacredGeometryBackground from './sacred-geometry-background';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen">
      <SacredGeometryBackground />
      {/* Your content here */}
    </section>
  );
};
```

### With Performance Monitoring
```tsx
import { PerformanceWarning } from './performance-monitor';

const App = () => {
  return (
    <>
      <HeroSection />
      <PerformanceWarning />
    </>
  );
};
```

## Mathematical Foundations

### Flower of Life Geometry
- Based on overlapping circles with equal radii
- Each circle's center lies on the circumference of adjacent circles
- Creates hexagonal symmetry patterns
- Ratio calculations: `radius * 1.732` (√3) for vertical spacing

### Mandala Construction
- Radial symmetry with configurable complexity
- Angular spacing: `2π / complexity`
- Concentric circle ratios: 0.4, 0.7, 1.0 of maximum radius

### Metatron's Cube
- 13 circles representing the fruit of life
- Connects all possible straight lines between circle centers
- Contains all five Platonic solids
- Sacred geometry significance in various traditions

## Performance Metrics

### Target Performance
- **FPS**: Maintain 60fps on modern devices, 30fps minimum
- **Memory**: Keep under 100MB JavaScript heap usage
- **CPU**: Efficient transform-only animations

### Monitoring
The system includes built-in performance monitoring:
- Real-time FPS tracking
- Memory usage monitoring
- Automatic performance tier adjustment
- Optional performance warnings

## Future Enhancements

1. **Additional Patterns**:
   - Sri Yantra geometry
   - Fibonacci spirals
   - Golden ratio constructions

2. **Interactive Elements**:
   - Mouse-following effects
   - Click-triggered animations
   - Sound-reactive patterns

3. **Advanced Physics**:
   - Particle systems
   - Gravitational effects
   - Fluid dynamics

4. **WebGL Integration**:
   - GPU-accelerated rendering
   - 3D transformations
   - Shader effects

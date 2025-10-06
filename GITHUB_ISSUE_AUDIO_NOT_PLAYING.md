# GitHub Issue: Radio Station Audio Not Playing After Recent Fixes

## 🐛 Bug Report

### **Title**
Radio station audio fails to play after power on and station selection

### **Labels**
`bug`, `audio`, `radio-stations`, `high-priority`, `user-interaction`

### **Priority**
🔴 **High** - Core functionality broken

---

## 📋 Description

After implementing fixes for the previous audio bugs (auto-play, double audio, and artifacts), the radio station audio no longer plays at all. When a user powers on the radio and selects a station, no audio plays despite the UI updating correctly.

---

## 🔍 Root Cause Analysis

### **Primary Issue: Browser Autoplay Policy Violation**

The root cause is a **browser autoplay policy violation**. Modern browsers (Chrome, Firefox, Safari, Edge) block audio playback that is not triggered by a direct user interaction.

**What's happening:**

1. User clicks power button → `isOn` becomes `true`
2. User clicks station card → `selectedStation` is set
3. React conditionally renders `<SecureAudioPlayer>` component
4. Component's `useEffect` runs immediately with `isActive={true}` and `isPoweredOn={true}`
5. `useEffect` calls `audio.play()` programmatically
6. **Browser blocks playback** because the `audio.play()` call is not in the direct call stack of the user's click event

**Code Location:**
- **File:** `src/components/radio/SecureAudioPlayer.tsx`
- **Lines:** 123-210 (specifically line 185: `audio.play()`)

**Relevant Code:**
```typescript
// Handle active state changes
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  if (isActive && isPoweredOn) {
    // ... setup code ...
    
    // Start playback
    audio.play().catch((err) => {  // ❌ This fails due to autoplay policy
      console.error('[SecureAudioPlayer] Playback error:', err);
      if (onError) onError(err instanceof Error ? err.message : 'Failed to play stream');
    });
  }
}, [isActive, isPoweredOn, stationId]);
```

### **Secondary Issue: Component Mounting Pattern**

The current architecture renders the audio player conditionally:

```typescript
{/* Audio Player - Only render when a station is selected */}
{selectedStation && (
  <SecureAudioPlayer
    key={selectedStation.id}
    stationId={selectedStation.id}
    isActive={true}
    isPoweredOn={isOn}
    onAudioData={setAudioData}
    onError={(error) => console.error(`Station ${selectedStation.id} error:`, error)}
  />
)}
```

This means:
- Component doesn't exist until a station is selected
- When it mounts, the `useEffect` runs in a React lifecycle, not in the user's click handler
- The browser sees this as programmatic playback, not user-initiated

---

## 🔄 Steps to Reproduce

1. Navigate to `/stations` page
2. Click the **power button**
3. Wait for warming animation to complete
4. Click on **"Cosmic Waves FM"** station card
5. **Observe:** UI updates (frequency shows "88.5", station name appears)
6. **Observe:** NO audio plays
7. Open browser console (F12)
8. **Observe:** Error message: `"play() failed because the user didn't interact with the document first"` or similar

---

## ✅ Expected Behavior

1. User clicks power button → Radio powers on
2. User clicks station card → Audio starts playing immediately
3. Visualizer animates with audio data
4. No console errors

---

## ❌ Actual Behavior

1. User clicks power button → Radio powers on ✅
2. User clicks station card → UI updates but NO audio plays ❌
3. Visualizer does not animate (no audio data) ❌
4. Console shows autoplay policy error ❌

---

## 💡 Proposed Solution

### **Option 1: Call `audio.play()` Directly in Click Handler (Recommended)**

Move the `audio.play()` call into the station selection click handler to ensure it's in the direct call stack of the user interaction.

**Files to Modify:**
1. `src/app/stations/page.tsx`
2. `src/components/radio/SecureAudioPlayer.tsx`

**Implementation:**

**Step 1:** Add a ref to access the audio player's play method

`src/app/stations/page.tsx`:
```typescript
import { useRef } from 'react';

export default function StationsPage() {
  const audioPlayerRef = useRef<{ play: () => void } | null>(null);
  
  const handleStationSelect = (station: RadioStation, index: number) => {
    if (isOn) {
      setSelectedStation(station);
      setDialPosition((index / (stations.length - 1)) * 100);
      
      // Trigger playback immediately in the click handler
      setTimeout(() => {
        audioPlayerRef.current?.play();
      }, 0);
    }
  };
  
  return (
    // ... JSX ...
    {selectedStation && (
      <SecureAudioPlayer
        ref={audioPlayerRef}
        key={selectedStation.id}
        stationId={selectedStation.id}
        isActive={true}
        isPoweredOn={isOn}
        onAudioData={setAudioData}
        onError={(error) => console.error(`Station ${selectedStation.id} error:`, error)}
      />
    )}
  );
}
```

**Step 2:** Expose a `play()` method from `SecureAudioPlayer`

`src/components/radio/SecureAudioPlayer.tsx`:
```typescript
import { forwardRef, useImperativeHandle } from 'react';

export interface SecureAudioPlayerHandle {
  play: () => void;
  pause: () => void;
}

const SecureAudioPlayer = forwardRef<SecureAudioPlayerHandle, SecureAudioPlayerProps>(
  ({ stationId, isActive, isPoweredOn, onPlay, onError, onAudioData }, ref) => {
    // ... existing code ...
    
    // Expose play/pause methods
    useImperativeHandle(ref, () => ({
      play: () => {
        const audio = audioRef.current;
        if (audio && isActive && isPoweredOn) {
          audio.play().catch((err) => {
            console.error('[SecureAudioPlayer] Playback error:', err);
            if (onError) onError(err instanceof Error ? err.message : 'Failed to play stream');
          });
        }
      },
      pause: () => {
        const audio = audioRef.current;
        if (audio) {
          audio.pause();
        }
      },
    }));
    
    // Modify useEffect to NOT auto-play
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      if (isActive && isPoweredOn) {
        // Initialize Web Audio API and set source, but DON'T call play()
        // ... setup code ...
        audio.src = streamUrl;
        audio.load();
        // ❌ Remove: audio.play()
      } else {
        // ... cleanup code ...
      }
    }, [isActive, isPoweredOn, stationId]);
    
    // ... rest of component ...
  }
);

export default SecureAudioPlayer;
```

### **Option 2: Use a Hidden Button with Click Event**

Create a hidden button that the station card click triggers, ensuring the play call is in the user interaction stack.

### **Option 3: Revert to Multiple Players with Better State Management**

Go back to rendering all players but improve the state management to prevent the original bugs.

---

## 📝 Files That Need Modification

### **Primary Files:**
1. ✅ `src/app/stations/page.tsx` - Add ref and call play() in click handler
2. ✅ `src/components/radio/SecureAudioPlayer.tsx` - Expose play() method via forwardRef

### **Testing Files:**
3. Create test file to verify user interaction triggers playback

---

## ✅ Acceptance Criteria

### **Functional Requirements:**
- [ ] User can power on the radio
- [ ] User can select a station by clicking the station card
- [ ] Audio starts playing immediately after station selection
- [ ] Visualizer animates with real audio data
- [ ] No console errors related to autoplay policy
- [ ] Station switching works smoothly (previous audio stops, new audio starts)
- [ ] Power off stops audio immediately

### **Technical Requirements:**
- [ ] `audio.play()` is called within the direct call stack of user interaction
- [ ] No browser autoplay policy violations
- [ ] Web Audio API initializes correctly
- [ ] Proper cleanup on component unmount
- [ ] No memory leaks from audio contexts or animation frames

### **Regression Testing:**
- [ ] Bug 1 (auto-play) does NOT return - power button alone should not start audio
- [ ] Bug 2 (double audio) does NOT return - only one stream plays at a time
- [ ] Bug 3 (artifacts) does NOT return - clean station switching

---

## 🧪 Testing Steps

### **Manual Testing:**
1. Load `/stations` page
2. Open browser console (F12)
3. Click power button
4. Verify: No audio plays, no errors
5. Click "Cosmic Waves FM"
6. Verify: Audio plays immediately
7. Verify: No console errors
8. Verify: Visualizer animates
9. Click "Neon Nights Radio"
10. Verify: Previous audio stops, new audio starts
11. Verify: No double audio or artifacts
12. Click power button (off)
13. Verify: Audio stops immediately

### **Automated Testing:**
```typescript
describe('Radio Station Audio Playback', () => {
  it('should not play audio when only power button is clicked', () => {
    // Test implementation
  });
  
  it('should play audio when station is selected after power on', () => {
    // Test implementation
  });
  
  it('should switch stations without double audio', () => {
    // Test implementation
  });
});
```

---

## 📚 Additional Context

### **Browser Autoplay Policies:**
- **Chrome:** Requires user gesture for audio playback
- **Firefox:** Requires user gesture for audio playback
- **Safari:** Strictest policy, requires direct user interaction
- **Edge:** Follows Chromium policy

### **Related Issues:**
- Previous fix for Bug 1: Auto-play prevention
- Previous fix for Bug 2: Double audio
- Previous fix for Bug 3: Audio artifacts

### **Documentation:**
- [Chrome Autoplay Policy](https://developer.chrome.com/blog/autoplay/)
- [MDN: Autoplay guide for media and Web Audio APIs](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide)

---

## 🎯 Implementation Priority

**Priority:** 🔴 **High**

**Reasoning:**
- Core functionality is broken
- Affects all users
- Blocks radio feature from being usable
- Should be fixed before deployment

**Estimated Effort:** 2-4 hours
- Code changes: 1-2 hours
- Testing: 1 hour
- Documentation: 30 minutes

---

## 👥 Assignee

_To be assigned_

---

## 🏷️ Milestone

_To be determined_

---

**Created:** 2025-10-06  
**Status:** 🔴 Open  
**Type:** Bug  
**Component:** Radio Stations / Audio Playback


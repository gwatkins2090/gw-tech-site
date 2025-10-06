# 🔍 Debugging Audio Playback - Step-by-Step Guide

## 🎯 Current Status

**Issue:** Audio is not playing after selecting a station, but no errors are visible on the page.

**What's Working:**
- ✅ No error messages displayed
- ✅ UI updates correctly (frequency, station name, visual selection)
- ✅ Build successful
- ✅ No TypeScript or ESLint errors

**What's Not Working:**
- ❌ No audio coming from speakers/headphones

---

## 🔧 Debugging Steps

I've added comprehensive logging to help diagnose the issue. Follow these steps:

### **Step 1: Restart Dev Server**

```bash
# Stop the current dev server (Ctrl+C)
# Start it again
npm run dev
```

### **Step 2: Open Browser Console**

1. Navigate to `http://localhost:3000/stations`
2. Open browser DevTools (F12 or Right-click → Inspect)
3. Go to the **Console** tab
4. Clear the console (click the 🚫 icon or press Ctrl+L)

### **Step 3: Test the Flow**

1. **Click the power button**
2. **Wait for warming animation**
3. **Click "Cosmic Waves FM"**

### **Step 4: Check Console Logs**

You should see a sequence of log messages. **Copy and paste ALL console output** and send it to me.

#### **Expected Log Sequence:**

```
[StationsPage] handleStationSelect called { stationId: 'cosmic-waves', stationName: 'Cosmic Waves FM', isOn: true, index: 0 }
[StationsPage] Radio is ON, selecting station...
[StationsPage] Calling audioPlayerRef.current?.play()
[StationsPage] audioPlayerRef.current exists? true
[SecureAudioPlayer] useEffect triggered { stationId: 'cosmic-waves', isActive: true, isPoweredOn: true, hasAudio: true }
[SecureAudioPlayer] Preparing audio for playback...
[SecureAudioPlayer] Setting audio source: /api/stream/cosmic-waves
[SecureAudioPlayer] Audio source set and loaded. Ready for play()
[SecureAudioPlayer] play() called { stationId: 'cosmic-waves', isActive: true, isPoweredOn: true, hasAudio: true, audioSrc: 'http://localhost:3000/api/stream/cosmic-waves', audioContextState: 'running' }
[SecureAudioPlayer] Calling audio.play()...
[SecureAudioPlayer] ✅ audio.play() succeeded!
```

#### **Possible Issues to Look For:**

**Issue 1: audioPlayerRef.current is null**
```
[StationsPage] audioPlayerRef.current exists? false
```
**Meaning:** The ref is not being set properly. Component might not be mounting.

**Issue 2: play() is never called**
```
[StationsPage] Calling audioPlayerRef.current?.play()
// No [SecureAudioPlayer] play() called message
```
**Meaning:** The imperative handle is not working.

**Issue 3: Audio element is null**
```
[SecureAudioPlayer] Cannot play: audio element is null
```
**Meaning:** The audio ref is not being set.

**Issue 4: Component is not active**
```
[SecureAudioPlayer] Cannot play: component is not active
```
**Meaning:** `isActive` prop is false.

**Issue 5: Radio is not powered on**
```
[SecureAudioPlayer] Cannot play: radio is not powered on
```
**Meaning:** `isPoweredOn` prop is false.

**Issue 6: play() fails**
```
[SecureAudioPlayer] ❌ Playback error: [error message]
```
**Meaning:** The browser blocked playback or the stream failed to load.

---

### **Step 5: Check Network Tab**

1. In DevTools, go to the **Network** tab
2. Clear the network log (click the 🚫 icon)
3. Click a station
4. Look for requests to `/api/stream/cosmic-waves` (or similar)

#### **What to Check:**

| Column | Expected Value | What It Means |
|--------|---------------|---------------|
| **Status** | 200 OK | Stream is loading successfully |
| **Type** | audio/mpeg or similar | Correct content type |
| **Size** | Increasing (e.g., "1.2 MB / 1.5 MB") | Data is streaming |
| **Time** | Ongoing | Stream is active |

#### **Possible Issues:**

**Issue 1: No request is made**
- **Meaning:** The audio source is not being set
- **Check:** Console logs for "Setting audio source"

**Issue 2: 404 Not Found**
- **Meaning:** The API endpoint doesn't exist or station ID is wrong
- **Check:** URL in the request (should be `/api/stream/cosmic-waves`)

**Issue 3: 500 Internal Server Error**
- **Meaning:** The API endpoint is crashing
- **Check:** Server console (where you ran `npm run dev`)

**Issue 4: CORS error**
- **Meaning:** Cross-origin request blocked
- **Check:** Console for CORS-related errors

**Issue 5: Request is pending forever**
- **Meaning:** The upstream stream (AzuraCast) is not responding
- **Check:** Is the AzuraCast server running?

---

### **Step 6: Check Audio Element State**

In the browser console, run this command after clicking a station:

```javascript
// Get the audio element
const audio = document.querySelector('audio');

// Check its state
console.log({
  src: audio.src,
  paused: audio.paused,
  currentTime: audio.currentTime,
  duration: audio.duration,
  readyState: audio.readyState,
  networkState: audio.networkState,
  error: audio.error
});
```

#### **What to Look For:**

| Property | Expected Value | Issue if Different |
|----------|---------------|-------------------|
| `src` | `http://localhost:3000/api/stream/cosmic-waves` | Source not set |
| `paused` | `false` | Audio is paused |
| `currentTime` | Increasing (e.g., 5.2, 5.3, 5.4) | Audio is not playing |
| `readyState` | 4 (HAVE_ENOUGH_DATA) | Audio not loaded |
| `networkState` | 2 (NETWORK_LOADING) or 3 (NETWORK_NO_SOURCE) | Network issue |
| `error` | `null` | Audio error occurred |

#### **readyState Values:**
- 0 = HAVE_NOTHING (no data)
- 1 = HAVE_METADATA (metadata loaded)
- 2 = HAVE_CURRENT_DATA (current frame loaded)
- 3 = HAVE_FUTURE_DATA (enough data to play)
- 4 = HAVE_ENOUGH_DATA (can play through)

#### **networkState Values:**
- 0 = NETWORK_EMPTY (not initialized)
- 1 = NETWORK_IDLE (not loading)
- 2 = NETWORK_LOADING (loading data)
- 3 = NETWORK_NO_SOURCE (no source)

---

### **Step 7: Check Browser Audio Permissions**

1. **Chrome:** Click the lock icon in the address bar → Site settings → Sound → Allow
2. **Firefox:** Click the lock icon → Permissions → Autoplay → Allow Audio and Video
3. **Safari:** Safari → Settings for This Website → Auto-Play → Allow All Auto-Play
4. **Edge:** Same as Chrome

Also check:
- Is your browser muted? (check the tab icon)
- Is your system volume up?
- Are your speakers/headphones connected and working?

---

### **Step 8: Test Audio Element Directly**

In the browser console, try playing the audio element directly:

```javascript
const audio = document.querySelector('audio');
audio.play().then(() => {
  console.log('✅ Direct play() succeeded!');
}).catch((err) => {
  console.error('❌ Direct play() failed:', err);
});
```

**If this works:** The issue is with our play() call timing or ref setup.
**If this fails:** The issue is with the browser, permissions, or stream URL.

---

### **Step 9: Check AzuraCast Stream**

Test if the stream URL works directly:

1. Open a new tab
2. Navigate to: `http://localhost:3000/api/stream/cosmic-waves`
3. **Expected:** Audio should start playing or download

**If it works:** The stream is fine, issue is in the player.
**If it fails:** The API endpoint or AzuraCast server has an issue.

---

## 📋 Information to Provide

Please provide the following information:

### **1. Console Logs**
Copy and paste ALL console output after clicking a station.

### **2. Network Tab**
Screenshot or describe the `/api/stream/` request:
- Status code
- Response headers
- Size/time

### **3. Audio Element State**
Run the JavaScript command from Step 6 and paste the output.

### **4. Browser Info**
- Browser name and version (e.g., Chrome 120.0.6099.109)
- Operating system (e.g., Windows 11, macOS 14.2, Ubuntu 22.04)

### **5. Direct Stream Test**
Does `http://localhost:3000/api/stream/cosmic-waves` work in a new tab?

### **6. Direct Play Test**
Does the JavaScript command from Step 8 work?

---

## 🔍 Common Issues and Solutions

### **Issue: "audioPlayerRef.current is null"**

**Cause:** The ref is not being set because the component is not mounting.

**Solution:** Check if `selectedStation` is being set correctly.

```javascript
// In console after clicking station
console.log('selectedStation:', selectedStation);
```

### **Issue: "play() failed: NotAllowedError"**

**Cause:** Browser autoplay policy blocking playback.

**Solution:** This should not happen because we're calling play() from a user interaction. Check if the setTimeout is causing the issue.

**Fix:** Try removing the setTimeout:

```typescript
// In handleStationSelect
audioPlayerRef.current?.play();  // Remove setTimeout
```

### **Issue: "Network error"**

**Cause:** The stream URL is not accessible.

**Solution:** Check if the AzuraCast server is running and accessible.

### **Issue: "Audio plays but no sound"**

**Cause:** Volume is muted or set to 0.

**Solution:** Check the audio element's volume:

```javascript
const audio = document.querySelector('audio');
console.log('Volume:', audio.volume, 'Muted:', audio.muted);
audio.volume = 1.0;
audio.muted = false;
```

---

## 🚀 Next Steps

1. **Restart your dev server**
2. **Follow Steps 1-9 above**
3. **Provide the requested information**
4. **I'll analyze the logs and provide a targeted fix**

The comprehensive logging will help us pinpoint exactly where the issue is occurring!

---

**Created:** 2025-10-06  
**Purpose:** Debug audio playback issues  
**Status:** Awaiting user feedback


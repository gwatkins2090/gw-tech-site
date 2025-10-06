# 🧪 Audio Player Testing Guide

## Quick Test Checklist

### ✅ Basic Functionality

1. **Power On/Off**
   - [ ] Click power button
   - [ ] See warming animation (2 seconds)
   - [ ] Radio interface lights up
   - [ ] Click power button again
   - [ ] Radio turns off
   - [ ] Audio stops playing

2. **Station Selection**
   - [ ] Turn radio on
   - [ ] Click "Cosmic Waves FM" card
   - [ ] Frequency display shows "88.5"
   - [ ] Station name appears
   - [ ] Audio starts playing
   - [ ] Click "Neon Nights Radio" card
   - [ ] Previous audio stops
   - [ ] New audio starts
   - [ ] Frequency display shows "104.7"

3. **Audio Visualizer**
   - [ ] Select a station
   - [ ] Watch volume bars animate
   - [ ] Bars should pulse with audio
   - [ ] Different frequencies show different heights

### 🔒 Security Tests

1. **Network Tab Test**
   ```
   Steps:
   1. Open DevTools (F12)
   2. Go to Network tab
   3. Clear all requests
   4. Play a station
   5. Look at requests
   
   Expected:
   ✅ See: /api/stream/1 or /api/stream/2
   ❌ Should NOT see: radio.watkinsgeorge.com direct requests
   ```

2. **Page Source Test**
   ```
   Steps:
   1. Right-click page
   2. Select "View Page Source"
   3. Press Ctrl+F (or Cmd+F)
   4. Search for: "radio.watkinsgeorge.com"
   
   Expected:
   ❌ Should find 0 results
   ```

3. **React DevTools Test**
   ```
   Steps:
   1. Install React DevTools extension
   2. Open DevTools
   3. Go to Components tab
   4. Find SecureAudioPlayer component
   5. Inspect props
   
   Expected:
   ✅ See: stationId: "1"
   ❌ Should NOT see: Full stream URL
   ```

4. **Rate Limit Test**
   ```
   Steps:
   1. Open browser console
   2. Paste this code:
   
   for (let i = 0; i < 15; i++) {
     fetch('/api/stream/1')
       .then(r => console.log(`Request ${i+1}: ${r.status}`));
   }
   
   Expected:
   - First 10: Status 200
   - Last 5: Status 429 (Too Many Requests)
   ```

### 📱 Mobile Tests

1. **Mobile Browser**
   - [ ] Open on phone
   - [ ] Power button works
   - [ ] Station cards are tappable
   - [ ] Audio plays
   - [ ] Visualizer animates
   - [ ] No layout issues

2. **Different Browsers**
   - [ ] Chrome/Edge
   - [ ] Firefox
   - [ ] Safari (iOS)
   - [ ] Samsung Internet

### 🎵 Audio Quality Tests

1. **Playback Quality**
   - [ ] Audio is clear
   - [ ] No stuttering
   - [ ] No buffering issues
   - [ ] Volume is appropriate

2. **Switching Stations**
   - [ ] Smooth transition
   - [ ] No audio overlap
   - [ ] Previous stream stops completely
   - [ ] New stream starts quickly

3. **Reconnection**
   - [ ] Disconnect internet
   - [ ] See error message
   - [ ] Reconnect internet
   - [ ] Stream auto-reconnects

### 🚀 Performance Tests

1. **Loading Speed**
   - [ ] Page loads quickly
   - [ ] No lag when clicking buttons
   - [ ] Smooth animations
   - [ ] Visualizer runs at 60fps

2. **Memory Usage**
   - [ ] Open DevTools → Performance
   - [ ] Record for 30 seconds
   - [ ] Check memory usage
   - [ ] Should be stable (no leaks)

3. **CPU Usage**
   - [ ] Check Task Manager/Activity Monitor
   - [ ] CPU usage should be reasonable
   - [ ] No excessive processing

## 🐛 Common Issues & Solutions

### Issue: Audio Won't Play

**Possible Causes**:
1. Browser autoplay policy
2. Stream URL incorrect
3. AzuraCast server down
4. CORS issues

**Solutions**:
```typescript
// Check browser console for errors
// Verify stream URL in radio-stations.ts
// Test AzuraCast URL directly in browser
// Check API route logs
```

### Issue: Visualizer Not Working

**Possible Causes**:
1. Web Audio API not initialized
2. Audio context suspended
3. No audio data

**Solutions**:
```typescript
// Check if audioData is being received
// Verify analyser node is connected
// Check browser console for Web Audio errors
```

### Issue: Rate Limit Errors

**Possible Causes**:
1. Too many requests
2. Multiple tabs open
3. Testing scripts running

**Solutions**:
```typescript
// Wait 60 seconds
// Close other tabs
// Increase rate limit in route.ts
```

### Issue: Station Won't Switch

**Possible Causes**:
1. Previous audio not stopped
2. State not updating
3. Component not re-rendering

**Solutions**:
```typescript
// Check if stop() is called
// Verify selectedStation state
// Check React DevTools
```

## 📊 Performance Benchmarks

### Expected Performance

| Metric | Target | Acceptable |
|--------|--------|------------|
| Page Load | < 2s | < 3s |
| Audio Start | < 1s | < 2s |
| Station Switch | < 500ms | < 1s |
| Visualizer FPS | 60fps | 30fps |
| Memory Usage | < 100MB | < 200MB |
| CPU Usage | < 10% | < 20% |

## 🔍 Debugging Tips

### Enable Verbose Logging

Add to `SecureAudioPlayer.tsx`:

```typescript
useEffect(() => {
  console.log('Audio Player State:', {
    stationId,
    isActive,
    isPoweredOn,
    isPlaying: state.isPlaying,
    isLoading: state.isLoading,
    error: state.error,
  });
}, [stationId, isActive, isPoweredOn, state]);
```

### Check API Route

Add to `route.ts`:

```typescript
console.log('Stream request:', {
  stationId,
  ip,
  timestamp: new Date().toISOString(),
});
```

### Monitor Audio Events

Add to audio element:

```typescript
<audio
  onLoadStart={() => console.log('Load start')}
  onCanPlay={() => console.log('Can play')}
  onPlaying={() => console.log('Playing')}
  onError={(e) => console.error('Audio error:', e)}
  onWaiting={() => console.log('Waiting/buffering')}
/>
```

## ✅ Pre-Deployment Checklist

- [ ] All basic functionality tests pass
- [ ] Security tests pass
- [ ] Mobile tests pass
- [ ] Performance is acceptable
- [ ] No console errors
- [ ] No memory leaks
- [ ] Rate limiting works
- [ ] Error handling works
- [ ] Reconnection works
- [ ] Documentation is complete

## 🎯 Test Scenarios

### Scenario 1: First-Time User

1. User visits /stations
2. Sees powered-off radio
3. Clicks power button
4. Watches warming animation
5. Clicks station card
6. Hears audio
7. Sees visualizer
8. Switches stations
9. Turns off radio

**Expected**: Smooth, intuitive experience

### Scenario 2: Mobile User

1. Opens on phone
2. Taps power button
3. Taps station
4. Puts phone in pocket
5. Audio continues playing
6. Takes phone out
7. Switches station
8. Audio switches smoothly

**Expected**: Works like native app

### Scenario 3: Network Issues

1. Playing audio
2. Disconnect WiFi
3. See error message
4. Reconnect WiFi
5. Audio resumes automatically

**Expected**: Graceful handling

## 📝 Test Report Template

```markdown
## Test Report - [Date]

### Environment
- Browser: 
- OS: 
- Device: 

### Tests Performed
- [ ] Basic Functionality
- [ ] Security
- [ ] Mobile
- [ ] Performance

### Issues Found
1. 
2. 
3. 

### Notes
- 

### Status
- [ ] Pass
- [ ] Fail
- [ ] Needs Review
```

---

**Happy Testing!** 🎵


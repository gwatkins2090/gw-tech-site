# 🔒 Secure Audio Player - Security Implementation Guide

## 📋 Overview

The Secure Audio Player system is designed to stream radio content from AzuraCast while **completely hiding the source URL** from end users. This prevents unauthorized access to your stream URLs and protects your infrastructure.

## 🏗️ Architecture

### Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Stations Page (/stations)                            │  │
│  │  - Displays station cards                             │  │
│  │  - Handles UI interactions                            │  │
│  │  - Manages power/selection state                      │  │
│  └────────────────────┬──────────────────────────────────┘  │
│                       │                                      │
│  ┌────────────────────▼──────────────────────────────────┐  │
│  │  SecureAudioPlayer Component                          │  │
│  │  - Manages audio playback                             │  │
│  │  - Connects to Web Audio API                          │  │
│  │  - Requests: /api/stream/[stationId]                  │  │
│  │  - NO DIRECT ACCESS TO AZURACAST URL                  │  │
│  └────────────────────┬──────────────────────────────────┘  │
└─────────────────────┬─┴──────────────────────────────────────┘
                      │
                      │ HTTPS Request
                      │ GET /api/stream/1
                      │
┌─────────────────────▼──────────────────────────────────────┐
│              Next.js API Route (Server-Side)               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  /api/stream/[stationId]/route.ts                   │   │
│  │  1. Validates station ID                            │   │
│  │  2. Checks rate limits (10 req/min per IP)          │   │
│  │  3. Validates allowed domain (radio.watkinsgeorge)  │   │
│  │  4. Fetches stream from AzuraCast                   │   │
│  │  5. Proxies stream back to client                   │   │
│  └────────────────────┬────────────────────────────────┘   │
└─────────────────────┬─┴────────────────────────────────────┘
                      │
                      │ HTTPS Request
                      │ (Server-to-Server)
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                    AzuraCast Server                        │
│         https://radio.watkinsgeorge.com                    │
│  - Actual stream source                                    │
│  - NEVER exposed to client                                 │
└────────────────────────────────────────────────────────────┘
```

## 🔐 Security Features

### 1. **URL Obfuscation**

**Problem**: Direct stream URLs can be discovered in browser DevTools.

**Solution**: 
- Client only knows station IDs (e.g., `"1"`, `"2"`)
- Actual URLs stored server-side in `radio-stations.ts`
- Client requests `/api/stream/1` instead of direct AzuraCast URL

**Code Example**:
```typescript
// Client-side (SecureAudioPlayer.tsx)
audio.src = `/api/stream/${stationId}`; // ✅ Secure
// NOT: audio.src = 'https://radio.watkinsgeorge.com/...' // ❌ Exposed
```

### 2. **Server-Side Proxy**

**Implementation**: Next.js API Route acts as a proxy

**File**: `src/app/api/stream/[stationId]/route.ts`

**How it works**:
1. Client requests `/api/stream/1`
2. Server looks up station ID in database
3. Server validates the request
4. Server fetches stream from AzuraCast
5. Server streams data back to client
6. Client never sees the real URL

**Benefits**:
- Real URL never sent to client
- Can't be found in Network tab
- Can't be found in page source
- Can't be extracted from React components

### 3. **Rate Limiting**

**Configuration**:
- **Limit**: 10 requests per minute per IP address
- **Window**: 60 seconds
- **Storage**: In-memory Map (use Redis in production)

**Code**:
```typescript
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

function checkRateLimit(ip: string): boolean {
  // Implementation in route.ts
}
```

**Why it matters**:
- Prevents abuse/scraping
- Protects server resources
- Limits bandwidth consumption
- Prevents DDoS attempts

### 4. **Domain Validation**

**Security Check**:
```typescript
const allowedDomain = 'radio.watkinsgeorge.com';
const url = new URL(streamUrl);

if (!url.hostname.includes(allowedDomain)) {
  return new NextResponse('Unauthorized stream source', { status: 403 });
}
```

**Purpose**:
- Prevents URL injection attacks
- Ensures only authorized sources
- Protects against configuration tampering

### 5. **CORS Protection**

**Headers Set**:
```typescript
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET',
'Access-Control-Allow-Headers': 'Content-Type',
```

**Note**: In production, replace `*` with your specific domain.

### 6. **Security Headers**

**Implemented Headers**:
```typescript
'X-Content-Type-Options': 'nosniff',
'X-Frame-Options': 'DENY',
'X-XSS-Protection': '1; mode=block',
'Cache-Control': 'no-cache, no-store, must-revalidate',
```

**Protection Against**:
- MIME type sniffing attacks
- Clickjacking
- XSS attacks
- Caching of sensitive streams

## 🧪 Testing Security

### Test 1: Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Play a station
4. Look for requests

**Expected Result**:
- ✅ See: `GET /api/stream/1`
- ❌ Should NOT see: `radio.watkinsgeorge.com` direct requests

### Test 2: Inspect React Components

1. Open React DevTools
2. Find `SecureAudioPlayer` component
3. Inspect props

**Expected Result**:
- ✅ See: `stationId: "1"`
- ❌ Should NOT see: Full AzuraCast URL

### Test 3: View Page Source

1. Right-click → View Page Source
2. Search for "radio.watkinsgeorge.com"

**Expected Result**:
- ❌ Should NOT find the stream URL anywhere

### Test 4: Rate Limiting

1. Write a script to make 15 requests in 1 minute
2. Check response codes

**Expected Result**:
- First 10 requests: `200 OK`
- Requests 11-15: `429 Too Many Requests`

### Test 5: Invalid Station ID

1. Try accessing `/api/stream/999`

**Expected Result**:
- `404 Station not found`

## 🚀 How to Use

### Adding a New Station

1. **Update `radio-stations.ts`**:
```typescript
{
  id: '3',
  name: 'Jazz Lounge',
  frequency: '92.3',
  genre: 'Jazz • Smooth',
  color: '#8b5cf6',
  url: 'https://radio.watkinsgeorge.com/listen/jazz/radio.mp3',
  description: 'Smooth jazz vibes',
}
```

2. **That's it!** The security is automatic.

### Changing Stream URLs

Simply update the `url` field in `radio-stations.ts`. The client code never needs to change.

## 🔧 Production Recommendations

### 1. Use Redis for Rate Limiting

Replace the in-memory Map with Redis:

```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `rate-limit:${ip}`;
  const count = await redis.incr(key);
  
  if (count === 1) {
    await redis.expire(key, 60);
  }
  
  return count <= 10;
}
```

### 2. Restrict CORS

Change from `*` to your domain:

```typescript
'Access-Control-Allow-Origin': 'https://yourdomain.com',
```

### 3. Add Authentication (Optional)

For premium streams, add JWT tokens:

```typescript
const token = request.headers.get('Authorization');
if (!validateToken(token)) {
  return new NextResponse('Unauthorized', { status: 401 });
}
```

### 4. Add Logging

Track usage and detect abuse:

```typescript
console.log({
  timestamp: new Date().toISOString(),
  ip,
  stationId,
  userAgent: request.headers.get('user-agent'),
});
```

### 5. Use Environment Variables

Store sensitive config in `.env.local`:

```env
AZURACAST_DOMAIN=radio.watkinsgeorge.com
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=60000
```

## 🐛 Troubleshooting

### Stream Won't Play

**Check**:
1. Is the AzuraCast URL correct in `radio-stations.ts`?
2. Is the AzuraCast server running?
3. Check browser console for errors
4. Check server logs for proxy errors

### Rate Limit Too Strict

**Solution**: Increase limits in `route.ts`:
```typescript
const RATE_LIMIT_MAX_REQUESTS = 20; // Increase from 10
```

### CORS Errors

**Solution**: Verify CORS headers in API route match your domain.

## 📊 Performance Considerations

### Bandwidth

- Each stream consumes bandwidth on your Next.js server
- Consider using a CDN for high traffic
- Monitor server bandwidth usage

### Caching

- Streams are NOT cached (by design)
- Static assets should be cached
- Use CDN for static content

### Scalability

- For high traffic, consider:
  - Load balancing
  - Dedicated streaming server
  - CDN with stream support
  - Edge functions (Vercel Edge, Cloudflare Workers)

## ✅ Security Checklist

- [x] Stream URLs hidden from client
- [x] Server-side proxy implemented
- [x] Rate limiting active
- [x] Domain validation enabled
- [x] Security headers set
- [x] CORS configured
- [x] Error handling implemented
- [x] Reconnection logic added
- [x] Cleanup on unmount
- [ ] Redis for rate limiting (production)
- [ ] Domain-specific CORS (production)
- [ ] Logging/monitoring (production)
- [ ] CDN integration (optional)

## 🎓 Key Takeaways

1. **Never expose stream URLs to the client**
2. **Always proxy through your server**
3. **Implement rate limiting**
4. **Validate all inputs**
5. **Use proper security headers**
6. **Monitor and log usage**
7. **Test security regularly**

---

**Remember**: Security is a process, not a product. Regularly review and update your security measures.


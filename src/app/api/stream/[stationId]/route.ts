import { NextRequest, NextResponse } from 'next/server';
import { radioStations } from '@/data/radio-stations';

// ============================================================================
// SECURITY CONFIGURATION
// ============================================================================

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit: Higher limit for development (streams are long-lived connections)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 50; // Increased from 10 to 50 for development

// ============================================================================
// RATE LIMITING FUNCTION
// ============================================================================

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

// ============================================================================
// CLEANUP OLD RATE LIMIT RECORDS
// ============================================================================

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

// ============================================================================
// GET STREAM ENDPOINT
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ stationId: string }> }
) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return new NextResponse('Too many requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
        },
      });
    }

    // Get station ID from params (await required in Next.js 15+)
    const { stationId } = await params;

    // Find the station in our configuration
    const station = radioStations.find(s => s.id === stationId);

    if (!station) {
      return new NextResponse('Station not found', { status: 404 });
    }

    // Validate that the URL is from our allowed domain (AzuraCast)
    const streamUrl = station.url;
    
    if (!streamUrl || streamUrl === '#') {
      return new NextResponse('Stream URL not configured', { status: 503 });
    }

    // Security: Validate the URL is from our AzuraCast instance
    const allowedDomain = 'radio.watkinsgeorge.com';
    try {
      const url = new URL(streamUrl);
      if (!url.hostname.includes(allowedDomain)) {
        console.error('Unauthorized stream domain:', url.hostname);
        return new NextResponse('Unauthorized stream source', { status: 403 });
      }
    } catch (err) {
      console.error('Invalid stream URL:', err);
      return new NextResponse('Invalid stream URL', { status: 500 });
    }

    // Fetch the stream from AzuraCast
    const response = await fetch(streamUrl, {
      headers: {
        'User-Agent': 'RadioPlayer/1.0',
        'Accept': 'audio/mpeg, audio/*',
      },
      // Don't cache the stream
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Stream fetch failed:', response.status, response.statusText);
      return new NextResponse('Stream unavailable', { status: 503 });
    }

    // Get the stream body
    const streamBody = response.body;

    if (!streamBody) {
      return new NextResponse('Stream body unavailable', { status: 503 });
    }

    // Return the stream with appropriate headers
    return new NextResponse(streamBody, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        // CORS headers (adjust as needed)
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        // Stream-specific headers
        'Accept-Ranges': 'none',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Stream proxy error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

// ============================================================================
// OPTIONS ENDPOINT (for CORS preflight)
// ============================================================================

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}


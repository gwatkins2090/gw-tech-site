'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface SecureAudioPlayerProps {
  stationId: string;
  isActive: boolean;
  isPoweredOn: boolean;
  onPlay?: () => void;
  onError?: (error: string) => void;
  onAudioData?: (dataArray: Uint8Array) => void;
}

interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  error: string | null;
  hasInteracted: boolean;
}

// ============================================================================
// SECURE AUDIO PLAYER COMPONENT
// ============================================================================

export default function SecureAudioPlayer({
  stationId,
  isActive,
  isPoweredOn,
  onPlay,
  onError,
  onAudioData,
}: SecureAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number>();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);

  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    volume: 0.7,
    isMuted: false,
    error: null,
    hasInteracted: false,
  });

  // ============================================================================
  // INITIALIZE WEB AUDIO API
  // ============================================================================

  const startVisualizerUpdates = useCallback(() => {
    if (!analyserRef.current || !onAudioData) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateData = () => {
      if (state.isPlaying && analyserRef.current) {
        analyser.getByteFrequencyData(dataArray);
        onAudioData(dataArray);
        animationFrameRef.current = requestAnimationFrame(updateData);
      }
    };

    updateData();
  }, [state.isPlaying, onAudioData]);

  const initializeAudioContext = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioContextRef.current) return;

    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Create source node
      const source = audioContext.createMediaElementSource(audio);
      sourceNodeRef.current = source;

      // Create analyser for visualizer
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Create gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = state.volume;
      gainNodeRef.current = gainNode;

      // Connect: source -> analyser -> gain -> destination
      source.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Start visualizer data updates
      startVisualizerUpdates();
    } catch (err) {
      console.error('Failed to initialize Web Audio API:', err);
    }
  }, [state.volume, startVisualizerUpdates]);

  // ============================================================================
  // RECONNECTION LOGIC
  // ============================================================================

  const attemptReconnect = useCallback(() => {
    if (reconnectAttemptsRef.current >= 3) {
      setState(prev => ({ ...prev, error: 'Connection failed. Please try again later.' }));
      return;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectAttemptsRef.current += 1;
    const delay = Math.min(3000 * reconnectAttemptsRef.current, 10000);

    reconnectTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, error: `Reconnecting... (${reconnectAttemptsRef.current}/3)` }));
      // Retry will be handled by the play function
      const audio = audioRef.current;
      if (audio) {
        audio.src = `/api/stream/${stationId}`;
        audio.play().catch(() => {
          // Will trigger error handler
        });
      }
    }, delay);
  }, [stationId]);

  // ============================================================================
  // PLAYBACK CONTROLS
  // ============================================================================

  // Note: This function is kept for potential future use but not currently called
  // Playback is now handled directly in the useEffect to avoid infinite loops
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Initialize audio context on first interaction
    if (!audioContextRef.current) {
      initializeAudioContext();
    }

    // Resume audio context if suspended
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null, hasInteracted: true }));

      // Use the secure proxy endpoint
      const streamUrl = `/api/stream/${stationId}`;
      audio.src = streamUrl;

      await audio.play();

      setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
      reconnectAttemptsRef.current = 0;

      if (onPlay) onPlay();
      startVisualizerUpdates();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to play stream';
      console.error('[SecureAudioPlayer] Playback error:', errorMsg);
      setState(prev => ({ ...prev, error: errorMsg, isLoading: false, isPlaying: false }));

      if (onError) onError(errorMsg);

      // Attempt reconnect for network errors
      if (errorMsg.includes('network') || errorMsg.includes('NETWORK')) {
        attemptReconnect();
      }
    }
  }, [stationId, onPlay, onError, initializeAudioContext, startVisualizerUpdates, attemptReconnect]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.src = '';
    setState(prev => ({ ...prev, isPlaying: false, isLoading: false }));
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
  }, []);

  // ============================================================================
  // AUDIO EVENT HANDLERS
  // ============================================================================

  const handleLoadStart = () => {
    setState(prev => ({ ...prev, isLoading: true }));
  };

  const handleCanPlay = () => {
    setState(prev => ({ ...prev, isLoading: false, error: null }));
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audio = e.currentTarget;
    console.error('[SecureAudioPlayer] Stream error:', audio.error?.message || 'Unknown error');
    setState(prev => ({
      ...prev,
      error: 'Stream error. Retrying...',
      isLoading: false,
      isPlaying: false,
    }));
    attemptReconnect();
  };

  const handleWaiting = () => {
    setState(prev => ({ ...prev, isLoading: true }));
  };

  const handlePlaying = () => {
    setState(prev => ({ ...prev, isLoading: false, isPlaying: true }));
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Handle active state changes
  useEffect(() => {
    if (isActive && isPoweredOn) {
      // Trigger playback
      const audio = audioRef.current;
      if (!audio) return;

      // Initialize audio context on first interaction
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        // Create source node
        const source = audioContext.createMediaElementSource(audio);
        sourceNodeRef.current = source;

        // Create analyser for visualizer
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        // Create gain node for volume control
        const gainNode = audioContext.createGain();
        gainNode.gain.value = state.volume;
        gainNodeRef.current = gainNode;

        // Connect: source -> analyser -> gain -> destination
        source.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(audioContext.destination);
      }

      // Resume audio context if suspended
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }

      // Set source and play
      const streamUrl = `/api/stream/${stationId}`;
      const fullUrl = new URL(streamUrl, window.location.origin).href;

      // Only set src if it's different to avoid reloading
      if (audio.src !== fullUrl) {
        audio.src = streamUrl;
      }

      // Start playback
      audio.play().catch((err) => {
        console.error('[SecureAudioPlayer] Playback error:', err);
        if (onError) onError(err instanceof Error ? err.message : 'Failed to play stream');
      });

      setState(prev => ({ ...prev, isPlaying: true, isLoading: false, hasInteracted: true }));
      reconnectAttemptsRef.current = 0;

      if (onPlay) onPlay();

      // Start visualizer updates
      if (analyserRef.current && onAudioData) {
        const analyser = analyserRef.current;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateData = () => {
          if (analyserRef.current && isActive && isPoweredOn) {
            analyser.getByteFrequencyData(dataArray);
            onAudioData(dataArray);
            animationFrameRef.current = requestAnimationFrame(updateData);
          }
        };

        updateData();
      }
    } else if (!isActive || !isPoweredOn) {
      // Stop playback
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = '';
      }

      setState(prev => ({ ...prev, isPlaying: false, isLoading: false }));

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isPoweredOn, stationId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Stop audio
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = '';
      }

      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Clear reconnect timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      // Close audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount/unmount

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="none"
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
      />

      {/* Status Indicator (optional - can be used for debugging) */}
      {state.error && (
        <div className="hidden">
          Error: {state.error}
        </div>
      )}
    </>
  );
}

// ============================================================================
// EXPORT HOOK FOR EXTERNAL CONTROL
// ============================================================================

export function useAudioPlayer() {
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128));
  
  return {
    audioData,
    setAudioData,
  };
}


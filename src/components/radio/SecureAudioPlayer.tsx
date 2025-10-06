'use client';

import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface SecureAudioPlayerHandle {
  play: () => void;
  pause: () => void;
}

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

const SecureAudioPlayer = forwardRef<SecureAudioPlayerHandle, SecureAudioPlayerProps>(
  function SecureAudioPlayer(
    {
      stationId,
      isActive,
      isPoweredOn,
      onPlay,
      onError,
      onAudioData,
    },
    ref
  ) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const reconnectAttemptsRef = useRef(0);

  // Refs to prevent double-loading and track ready state
  const isLoadingRef = useRef(false);
  const isReadyRef = useRef(false);

  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    volume: 0.7,
    isMuted: false,
    error: null,
    hasInteracted: false,
  });

  // ============================================================================
  // EXPOSE PLAY/PAUSE METHODS VIA REF
  // ============================================================================

  useImperativeHandle(ref, () => ({
    play: () => {
      console.log('[SecureAudioPlayer] play() called', {
        stationId,
        isActive,
        isPoweredOn,
        hasAudio: !!audioRef.current,
        audioSrc: audioRef.current?.src,
        audioContextState: audioContextRef.current?.state,
        isReady: isReadyRef.current,
        isLoading: isLoadingRef.current
      });

      const audio = audioRef.current;
      if (!audio) {
        console.error('[SecureAudioPlayer] Cannot play: audio element is null');
        return;
      }

      if (!isActive) {
        console.error('[SecureAudioPlayer] Cannot play: component is not active');
        return;
      }

      if (!isPoweredOn) {
        console.error('[SecureAudioPlayer] Cannot play: radio is not powered on');
        return;
      }

      // Resume audio context if suspended (required for autoplay policy)
      if (audioContextRef.current?.state === 'suspended') {
        console.log('[SecureAudioPlayer] Resuming suspended AudioContext');
        audioContextRef.current.resume().catch((err) => {
          console.error('[SecureAudioPlayer] Failed to resume AudioContext:', err);
        });
      }

      // Log audio element state before playing
      console.log('[SecureAudioPlayer] Audio element state before play():', {
        readyState: audio.readyState,
        networkState: audio.networkState,
        paused: audio.paused,
        currentTime: audio.currentTime,
        duration: audio.duration,
        src: audio.src
      });

      // Check if audio is ready
      if (audio.readyState < 3) {
        console.warn('[SecureAudioPlayer] ⚠️ Audio not ready yet (readyState < 3), waiting for canplay event...');

        // Wait for canplay event before playing
        const playWhenReady = () => {
          console.log('[SecureAudioPlayer] canplay event fired, now calling play()');
          audio.play()
            .then(() => {
              console.log('[SecureAudioPlayer] ✅ audio.play() promise resolved successfully!');

              // Log detailed audio state after play
              setTimeout(() => {
                console.log('[SecureAudioPlayer] Audio state after play():', {
                  paused: audio.paused,
                  currentTime: audio.currentTime,
                  volume: audio.volume,
                  muted: audio.muted,
                  readyState: audio.readyState,
                  audioContextState: audioContextRef.current?.state,
                  gainValue: gainNodeRef.current?.gain.value
                });
              }, 100);

              setState(prev => ({ ...prev, isPlaying: true, hasInteracted: true }));
              if (onPlay) onPlay();
            })
            .catch((err) => {
              console.error('[SecureAudioPlayer] ❌ audio.play() promise rejected:', err);
              if (onError) onError(err instanceof Error ? err.message : 'Failed to play stream');
            });
        };

        audio.addEventListener('canplay', playWhenReady, { once: true });
        return;
      }

      // Audio is ready, play immediately
      console.log('[SecureAudioPlayer] Audio is ready (readyState >= 3), calling audio.play()...');
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('[SecureAudioPlayer] ✅ audio.play() promise resolved successfully!');

            // Log detailed audio state after play
            setTimeout(() => {
              console.log('[SecureAudioPlayer] Audio state after play():', {
                paused: audio.paused,
                currentTime: audio.currentTime,
                volume: audio.volume,
                muted: audio.muted,
                readyState: audio.readyState,
                audioContextState: audioContextRef.current?.state,
                gainValue: gainNodeRef.current?.gain.value
              });
            }, 100);
          })
          .catch((err) => {
            console.error('[SecureAudioPlayer] ❌ audio.play() promise rejected:', err);
            console.error('[SecureAudioPlayer] Error name:', err.name);
            console.error('[SecureAudioPlayer] Error message:', err.message);
            if (onError) onError(err instanceof Error ? err.message : 'Failed to play stream');
          });
      } else {
        console.warn('[SecureAudioPlayer] ⚠️ audio.play() returned undefined (old browser?)');
      }

      setState(prev => ({ ...prev, isPlaying: true, hasInteracted: true }));
      if (onPlay) onPlay();
    },
    pause: () => {
      const audio = audioRef.current;
      if (!audio) return;

      console.log('[SecureAudioPlayer] pause() called');
      audio.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    },
  }), [isActive, isPoweredOn, onPlay, onError, stationId]);

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

  // Prepare audio source when component mounts or station changes
  useEffect(() => {
    console.log('[SecureAudioPlayer] useEffect triggered', {
      stationId,
      isActive,
      isPoweredOn,
      hasAudio: !!audioRef.current
    });

    const audio = audioRef.current;
    if (!audio) {
      console.error('[SecureAudioPlayer] useEffect: audio element is null');
      return;
    }

    if (isActive && isPoweredOn) {
      console.log('[SecureAudioPlayer] Preparing audio for playback...');

      // Stop any existing playback first
      audio.pause();

      // Cancel any existing animation frames
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }

      // Initialize audio context on first interaction (only once per component instance)
      // IMPORTANT: Only create Web Audio API nodes ONCE per audio element
      // MediaElementSourceNode can only be created ONCE per audio element, EVER

      if (!sourceNodeRef.current) {
        console.log('[SecureAudioPlayer] Initializing Web Audio API for the first time');

        try {
          const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
          const audioContext = new AudioContext();
          audioContextRef.current = audioContext;

          // Create source node - can only be created ONCE per audio element
          console.log('[SecureAudioPlayer] Creating MediaElementSourceNode (once per audio element)');
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

          console.log('[SecureAudioPlayer] ✅ Web Audio API initialized', {
            audioContextState: audioContext.state,
            sampleRate: audioContext.sampleRate,
            gainValue: gainNode.gain.value
          });
        } catch (err) {
          console.error('[SecureAudioPlayer] Failed to initialize Web Audio API:', err);
          // Continue without Web Audio API features
        }
      } else {
        console.log('[SecureAudioPlayer] Web Audio API already initialized, skipping', {
          audioContextState: audioContextRef.current?.state,
          hasSourceNode: !!sourceNodeRef.current
        });
      }

      // Resume audio context if suspended
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }

      // Set source but DON'T auto-play (play() will be called from ref)
      const streamUrl = `/api/stream/${stationId}`;

      // Prevent double-loading from React Strict Mode
      // Check if we're already loading this exact URL
      if (audio.src === `http://localhost:3000${streamUrl}` || audio.src === streamUrl) {
        console.log('[SecureAudioPlayer] Already loading this station, skipping duplicate load');
        console.log('[SecureAudioPlayer] Current src:', audio.src, 'Target src:', streamUrl);
        return;
      }

      console.log('[SecureAudioPlayer] Setting audio source:', streamUrl);
      isLoadingRef.current = true;
      isReadyRef.current = false;

      // Set up event listeners BEFORE setting src
      const handleCanPlay = () => {
        console.log('[SecureAudioPlayer] ✅ canplay event fired - audio is ready');
        isReadyRef.current = true;
        isLoadingRef.current = false;
      };

      const handleLoadedMetadata = () => {
        console.log('[SecureAudioPlayer] ✅ loadedmetadata event fired');
      };

      const handleLoadStart = () => {
        console.log('[SecureAudioPlayer] ⏳ loadstart event fired - starting to load');
      };

      const handleError = (e: Event) => {
        console.error('[SecureAudioPlayer] ❌ error event fired:', (e.target as HTMLAudioElement).error);
        isLoadingRef.current = false;
        isReadyRef.current = false;
      };

      audio.addEventListener('canplay', handleCanPlay, { once: true });
      audio.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
      audio.addEventListener('loadstart', handleLoadStart, { once: true });
      audio.addEventListener('error', handleError, { once: true });

      audio.src = streamUrl;
      audio.load(); // Explicitly load the new source
      console.log('[SecureAudioPlayer] Audio source set and load() called. Waiting for canplay event...');

      setState(prev => ({ ...prev, isLoading: false }));
      reconnectAttemptsRef.current = 0;

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
    } else {
      // Stop playback immediately when not active or powered off
      console.log('[SecureAudioPlayer] Component not active or powered off, pausing audio');
      audio.pause();
      // Don't clear src here - it causes "Empty src attribute" errors
      // The component will be unmounted anyway if not active

      setState(prev => ({ ...prev, isPlaying: false, isLoading: false }));

      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }

      // Clear reconnect timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = undefined;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isPoweredOn, stationId]);

  // Cleanup on unmount
  useEffect(() => {
    // Return cleanup function that will run when component unmounts
    return () => {
      console.log('[SecureAudioPlayer] Cleanup running for station:', stationId);

      // Get current ref values at cleanup time (not mount time)
      const animationFrame = animationFrameRef.current;
      const reconnectTimeout = reconnectTimeoutRef.current;

      // Cancel animation frame
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      // Clear reconnect timeout
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      // NOTE: We do NOT close the AudioContext or pause the audio here
      // The Web Audio API nodes (AudioContext, MediaElementSourceNode) are created ONCE
      // and kept alive for the entire component lifetime
      // Closing them causes issues with React Strict Mode remounts
      console.log('[SecureAudioPlayer] Cleanup complete (Web Audio API nodes kept alive)');
    };
  }, [stationId]); // Include stationId so cleanup knows which station it's for

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
});

// ============================================================================
// EXPORT
// ============================================================================

export default SecureAudioPlayer;

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


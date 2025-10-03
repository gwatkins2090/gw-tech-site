'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  isLowPerformance: boolean;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    isLowPerformance: false
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        // Get memory usage if available
        const memoryInfo = (performance as { memory?: { usedJSHeapSize: number } }).memory;
        const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1048576 : 0; // MB
        
        // Consider low performance if FPS drops below 30 or memory usage is high
        const isLowPerformance = fps < 30 || memoryUsage > 100;
        
        setMetrics({
          fps,
          memoryUsage,
          isLowPerformance
        });
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Start monitoring after a delay to avoid initial load spikes
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(measureFPS);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return metrics;
};

// Optional: Performance warning component
export const PerformanceWarning = () => {
  const { isLowPerformance, fps } = usePerformanceMonitor();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isLowPerformance) {
      const timer = setTimeout(() => setShowWarning(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowWarning(false);
    }
  }, [isLowPerformance]);

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500/90 text-yellow-900 px-4 py-2 rounded-lg text-sm z-50">
      Performance warning: FPS {fps} - Consider reducing animations
    </div>
  );
};

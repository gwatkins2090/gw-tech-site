'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Radio, Zap, Waves, Power } from 'lucide-react';
import Link from 'next/link';
import { radioStations, type RadioStation } from '@/data/radio-stations';
import SecureAudioPlayer, { type SecureAudioPlayerHandle } from '@/components/radio/SecureAudioPlayer';

const stations = radioStations;

export default function StationsPage() {
  const [selectedStation, setSelectedStation] = useState<RadioStation | null>(null);
  const [isOn, setIsOn] = useState(false);
  const [dialPosition, setDialPosition] = useState(0);
  const [isWarming, setIsWarming] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128));
  const audioPlayerRef = useRef<SecureAudioPlayerHandle>(null);

  // Update audio levels from real audio data
  useEffect(() => {
    if (isOn && selectedStation && audioData.length > 0) {
      // Calculate average audio level from frequency data
      const average = audioData.reduce((sum, val) => sum + val, 0) / audioData.length;
      setAudioLevel((average / 255) * 100);
    } else {
      setAudioLevel(0);
    }
  }, [isOn, selectedStation, audioData]);

  const handlePowerToggle = () => {
    if (!isOn) {
      setIsWarming(true);
      setTimeout(() => {
        setIsOn(true);
        setIsWarming(false);
      }, 2000);
    } else {
      setIsOn(false);
      setSelectedStation(null);
    }
  };

  const handleStationSelect = (station: RadioStation, index: number) => {
    console.log('[StationsPage] handleStationSelect called', {
      stationId: station.id,
      stationName: station.name,
      isOn,
      index
    });

    if (isOn) {
      console.log('[StationsPage] Radio is ON, selecting station...');
      setSelectedStation(station);
      setDialPosition((index / (stations.length - 1)) * 100);

      // Trigger playback in the next tick to ensure component is mounted
      setTimeout(() => {
        console.log('[StationsPage] Calling audioPlayerRef.current?.play()');
        console.log('[StationsPage] audioPlayerRef.current exists?', !!audioPlayerRef.current);
        audioPlayerRef.current?.play();
      }, 0);
    } else {
      console.warn('[StationsPage] Radio is OFF, cannot select station');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_50%)]" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isOn
              ? [
                  'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.15), transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(0, 229, 255, 0.15), transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.15), transparent 50%)',
                ]
              : 'radial-gradient(circle at 50% 50%, transparent, transparent)',
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Frequency Wave Background */}
      <AnimatePresence>
        {isOn && selectedStation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-px"
                style={{
                  top: `${5 + i * 5}%`,
                  background: `linear-gradient(90deg, transparent, ${selectedStation.color}, transparent)`,
                }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scaleX: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            animate={{
              textShadow: isOn
                ? [
                    `0 0 20px ${selectedStation?.color || '#ec4899'}`,
                    `0 0 40px ${selectedStation?.color || '#ec4899'}`,
                    `0 0 20px ${selectedStation?.color || '#ec4899'}`,
                  ]
                : '0 0 0px transparent',
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Radio className="w-12 h-12 text-pink-primary" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Radio Stations
            </h1>
          </motion.div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tune in to the frequencies of tomorrow
          </p>
        </motion.div>

        {/* Main Radio Interface */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Radio Body */}
            <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Glassmorphic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              {/* Warming Up Effect */}
              <AnimatePresence>
                {isWarming && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent z-20 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="p-12">
                {/* Top Control Panel */}
                <div className="flex items-center justify-between mb-12">
                  {/* Power Button */}
                  <motion.button
                    onClick={handlePowerToggle}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-20 h-20 rounded-full border-4 ${isOn ? 'border-pink-primary' : 'border-gray-600'} flex items-center justify-center relative overflow-hidden transition-all duration-300`}>
                      <div className={`absolute inset-0 ${isOn ? 'bg-pink-primary/20' : 'bg-transparent'} blur-xl`} />
                      <Power className={`w-10 h-10 relative z-10 transition-colors ${isOn ? 'text-pink-primary' : 'text-gray-500'}`} />
                    </div>
                    <motion.div
                      className="absolute -inset-2 rounded-full"
                      animate={{
                        boxShadow: isOn
                          ? [
                              '0 0 20px rgba(236, 72, 153, 0.5)',
                              '0 0 40px rgba(236, 72, 153, 0.8)',
                              '0 0 20px rgba(236, 72, 153, 0.5)',
                            ]
                          : '0 0 0px transparent',
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>

                  {/* Frequency Display */}
                  <div className="flex-1 mx-12">
                    <div className="bg-black/50 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      <div className="text-center relative z-10">
                        <motion.div
                          className="text-6xl font-bold font-mono tracking-wider"
                          style={{
                            color: selectedStation?.color || '#666',
                            textShadow: isOn && selectedStation
                              ? `0 0 30px ${selectedStation.color}`
                              : 'none',
                          }}
                          animate={{
                            opacity: isOn ? 1 : 0.3,
                          }}
                        >
                          {selectedStation?.frequency || '--.-'}
                        </motion.div>
                        <div className="text-sm text-muted-foreground mt-2 uppercase tracking-widest">
                          {selectedStation?.genre || 'No Signal'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Volume Indicator */}
                  <div className="flex flex-col items-center gap-2">
                    <Volume2 className={`w-8 h-8 ${isOn ? 'text-pink-primary' : 'text-gray-600'}`} />
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 rounded-full"
                          style={{
                            height: `${(i + 1) * 4}px`,
                            backgroundColor: isOn && audioLevel > i * 10 ? selectedStation?.color || '#ec4899' : '#333',
                          }}
                          animate={{
                            opacity: isOn && audioLevel > i * 10 ? 1 : 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Station Name Display */}
                <AnimatePresence mode="wait">
                  {selectedStation && isOn && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center mb-8"
                    >
                      <h2 className="text-4xl font-bold mb-2" style={{ color: selectedStation.color }}>
                        {selectedStation.name}
                      </h2>
                      <p className="text-muted-foreground">{selectedStation.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dial Control */}
                <div className="mb-12">
                  <div className="relative h-32 bg-black/30 rounded-2xl border border-white/5 overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-pink-primary to-transparent"
                      animate={{
                        left: `${dialPosition}%`,
                      }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-around px-8">
                      {stations.map((station) => (
                        <div key={station.id} className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">{station.frequency}</div>
                          <div className="w-1 h-8 bg-white/20 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Station Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stations.map((station, index) => (
                    <motion.button
                      key={station.id}
                      onClick={() => handleStationSelect(station, index)}
                      className="relative group"
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!isOn}
                    >
                      <div
                        className={`relative p-8 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                          selectedStation?.id === station.id && isOn
                            ? 'border-white/30 bg-white/5'
                            : 'border-white/10 bg-white/[0.02]'
                        } ${!isOn ? 'opacity-50' : ''}`}
                      >
                        {/* Glow Effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: `radial-gradient(circle at center, ${station.color}15, transparent 70%)`,
                          }}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor: `${station.color}20`,
                                  border: `2px solid ${station.color}40`,
                                }}
                                animate={{
                                  boxShadow:
                                    selectedStation?.id === station.id && isOn
                                      ? [
                                          `0 0 20px ${station.color}80`,
                                          `0 0 40px ${station.color}`,
                                          `0 0 20px ${station.color}80`,
                                        ]
                                      : '0 0 0px transparent',
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Waves className="w-6 h-6" style={{ color: station.color }} />
                              </motion.div>
                              <div className="text-left">
                                <h3 className="text-xl font-bold" style={{ color: station.color }}>
                                  {station.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">{station.genre}</p>
                              </div>
                            </div>
                            <div
                              className="text-3xl font-mono font-bold"
                              style={{ color: station.color }}
                            >
                              {station.frequency}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground text-left">
                            {station.description}
                          </p>
                        </div>

                        {/* Active Indicator */}
                        <AnimatePresence>
                          {selectedStation?.id === station.id && isOn && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute top-4 right-4"
                            >
                              <motion.div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: station.color }}
                                animate={{
                                  opacity: [1, 0.5, 1],
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pink-primary hover:text-pink-vibrant transition-colors"
          >
            <Zap className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Audio Player - Only render when a station is selected */}
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
    </div>
  );
}


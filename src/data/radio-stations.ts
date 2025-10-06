export interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  genre: string;
  color: string;
  url: string;
  description: string;
  tagline?: string;
}

/**
 * Radio Stations Configuration
 * 
 * To add a new station:
 * 1. Copy an existing station object
 * 2. Update all fields with new station info
 * 3. Choose a unique color (hex format)
 * 4. Add the actual stream URL when ready
 * 
 * Color suggestions:
 * - Pink/Magenta: #FF1744, #ec4899, #f472b6
 * - Cyan/Blue: #00E5FF, #06b6d4, #3b82f6
 * - Purple: #8b5cf6, #a78bfa, #c084fc
 * - Green: #10b981, #34d399, #6ee7b7
 * - Orange: #f97316, #fb923c, #fdba74
 * - Yellow: #eab308, #fbbf24, #fcd34d
 */

export const radioStations: RadioStation[] = [
  {
    id: '1',
    name: 'Cosmic Waves FM',
    frequency: '88.5',
    genre: 'Electronic • Ambient',
    color: '#FF1744',
    url: 'https://radio.watkinsgeorge.com/listen/test/radio.mp3',
    description: 'Journey through space with ethereal soundscapes',
    tagline: 'Transmitting from the edge of the universe'
  },
  {
    id: '2',
    name: 'Neon Nights Radio',
    frequency: '104.7',
    genre: 'Synthwave • Retrowave',
    color: '#00E5FF',
    url: 'https://radio.watkinsgeorge.com/listen/test/radio.mp3',
    description: 'Cruising through the neon-lit streets of sound',
    tagline: 'Where the 80s never ended'
  },
  
  // Add more stations below - just copy the template and modify:
  /*
  {
    id: '3',
    name: 'Your Station Name',
    frequency: '92.3',
    genre: 'Genre • Subgenre',
    color: '#8b5cf6',
    url: '#', // Replace with actual stream URL
    description: 'Your station description here',
    tagline: 'Optional tagline'
  },
  */
];

/**
 * Get a station by ID
 */
export const getStationById = (id: string): RadioStation | undefined => {
  return radioStations.find(station => station.id === id);
};

/**
 * Get a station by frequency
 */
export const getStationByFrequency = (frequency: string): RadioStation | undefined => {
  return radioStations.find(station => station.frequency === frequency);
};

/**
 * Get all stations sorted by frequency
 */
export const getStationsSortedByFrequency = (): RadioStation[] => {
  return [...radioStations].sort((a, b) => parseFloat(a.frequency) - parseFloat(b.frequency));
};


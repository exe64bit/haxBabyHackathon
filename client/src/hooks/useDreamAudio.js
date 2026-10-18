import { useState, useRef, useEffect, useCallback } from 'react';

// Gentle pentatonic lullaby notes (Frequencies in Hz)
const LULLABY_NOTES = [
  { pitch: 523.25, duration: 0.6 }, // C5
  { pitch: 659.25, duration: 0.6 }, // E5
  { pitch: 783.99, duration: 0.8 }, // G5
  { pitch: 987.77, duration: 0.6 }, // B5
  { pitch: 1046.50, duration: 1.0 }, // C6
  { pitch: 880.00, duration: 0.6 }, // A5
  { pitch: 783.99, duration: 0.6 }, // G5
  { pitch: 659.25, duration: 1.2 }  // E5
];

export const useDreamAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const stepIndexRef = useRef(0);

  // Initialize or resume AudioContext safely on user gesture
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Synthesize a single gentle music-box chime note
  const playChimeNote = useCallback((freq, dur) => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Soft music-box bell tone: sine with a tiny shimmer
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Attack and gentle bell decay
      const peakVolume = Math.max(0.01, volume * 0.25);
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(peakVolume, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + dur + 0.05);
    } catch {
      // Audio node failure gracefully ignored
    }
  }, [getAudioContext, isMuted, volume]);

  // Sequencer loop
  const scheduleNextNote = useCallback(() => {
    const currentNote = LULLABY_NOTES[stepIndexRef.current];
    playChimeNote(currentNote.pitch, currentNote.duration);

    stepIndexRef.current = (stepIndexRef.current + 1) % LULLABY_NOTES.length;
    timerRef.current = setTimeout(() => {
      scheduleNextNote();
    }, currentNote.duration * 1000);
  }, [playChimeNote]);

  const playLullaby = () => {
    getAudioContext();
    setIsPlaying(true);
    stepIndexRef.current = 0;
    scheduleNextNote();
  };

  const stopLullaby = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    stepIndexRef.current = 0;
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopLullaby();
    } else {
      playLullaby();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Play a quick celebratory chime for the secret easter egg star!
  const playEasterEggSound = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.5]; // C major twinkle
    chords.forEach((note, i) => {
      setTimeout(() => {
        playChimeNote(note, 0.4);
      }, i * 90);
    });
  }, [getAudioContext, isMuted, playChimeNote]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {
          // Closed
        }
      }
    };
  }, []);

  return {
    isPlaying,
    isMuted,
    volume,
    setVolume,
    playLullaby,
    stopLullaby,
    togglePlayback,
    toggleMute,
    playEasterEggSound
  };
};


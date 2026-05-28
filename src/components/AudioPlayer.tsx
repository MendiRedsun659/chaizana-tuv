import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.35; // Soft gentle level
    audioRef.current = audio;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    audio.addEventListener('canplaythrough', handleLoad);
    audio.addEventListener('canplay', handleLoad);
    audio.addEventListener('loadedmetadata', handleLoad);
    audio.addEventListener('loadeddata', handleLoad);

    // Fallback timer to show play button hint even if browser blocks preloading entirely
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      audio.removeEventListener('canplaythrough', handleLoad);
      audio.removeEventListener('canplay', handleLoad);
      audio.removeEventListener('loadedmetadata', handleLoad);
      audio.removeEventListener('loadeddata', handleLoad);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Playback blocked by browser audio policy: ', err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        id="bg-music-toggle"
        onClick={togglePlayback}
        className={`flex items-center justify-center p-3.5 rounded-full shadow-lg border backdrop-blur-md transition-all duration-500 scale-100 hover:scale-110 active:scale-95 ${
          isPlaying
            ? 'bg-brand-500 border-brand-400 text-white animate-pulse-subtle shadow-brand-200/50'
            : 'bg-white/80 border-brand-200 text-brand-600 shadow-brand-100/30'
        }`}
        title={isPlaying ? 'Выключить музыку' : 'Включить атмосферную музыку'}
      >
        {isPlaying ? (
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Animated equalizer bars */}
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-[3px] bg-white rounded-t-sm animate-[equalizer_0.8s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.1s' }} />
              <span className="w-[3px] bg-white rounded-t-sm animate-[equalizer_1.1s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.4s' }} />
              <span className="w-[3px] bg-white rounded-t-sm animate-[equalizer_0.9s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.2s' }} />
              <span className="w-[3px] bg-white rounded-t-sm animate-[equalizer_1.2s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        ) : (
          <Music className="w-5 h-5" />
        )}
      </button>

      {/* Embedded style for equalizer animation keyframes */}
      <style>{`
        @keyframes equalizer {
          0% { height: 4px; }
          100% { height: 14px; }
        }
      `}</style>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

/**
 * Mini radio player for Hull's 107FM
 * Compact design for header integration
 */
export function MiniRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamUrl = "https://stream.rcast.net/70781";

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(streamUrl);
    audioRef.current.volume = volume;
    audioRef.current.preload = "none";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="flex items-center gap-2 text-white">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="p-1.5 hover:bg-slate-700 rounded-full transition-colors"
        aria-label={isPlaying ? "Pause radio" : "Play radio"}
        title={isPlaying ? "Pause Hull's 107FM" : "Play Hull's 107FM"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" fill="currentColor" />
        ) : (
          <Play className="w-4 h-4" fill="currentColor" />
        )}
      </button>

      {/* Station Name */}
      <div className="hidden sm:flex items-center gap-1.5">
        <div className="flex flex-col leading-tight">
          <span className="text-xs font-semibold">Hull's 107FM</span>
          {isPlaying && (
            <span className="text-[10px] text-slate-400">Live</span>
          )}
        </div>
      </div>

      {/* Volume Control - Desktop only */}
      <div className="hidden lg:flex items-center gap-1.5">
        <button
          onClick={toggleMute}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-[oklch(0.70_0.15_200)]"
          aria-label="Volume"
        />
      </div>
    </div>
  );
}

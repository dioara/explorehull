import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Radio, Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function HullRadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Hull's 107FM stream URL (proxied through our server to avoid mixed content issues)
  const STREAM_URL = "/api/radio/stream";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      setError("");
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (err) {
      setError("Unable to connect to radio stream");
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
      if (newVolume[0] === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Radio className="w-6 h-6 text-primary" />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              )}
            </div>
            <div>
              <div className="text-lg font-bold">Hull's 107FM</div>
              <div className="text-xs text-muted-foreground font-normal">Local Radio for Hull</div>
            </div>
          </div>
          <a
            href="https://107fm.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            Visit Site
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Audio Element */}
        <audio ref={audioRef} src={STREAM_URL} preload="none" />

        {/* Play/Pause Button */}
        <div className="flex items-center justify-center">
          <Button
            onClick={togglePlay}
            disabled={isLoading}
            size="lg"
            className="rounded-full w-20 h-20 shadow-lg hover:shadow-xl transition-all"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>
        </div>

        {/* Now Playing Info */}
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">
            {isPlaying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Now Playing Live
              </span>
            ) : (
              "Click play to listen live"
            )}
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 px-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="flex-shrink-0"
          >
            {isMuted || volume[0] === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-10 text-right">
            {volume[0]}%
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-xs text-center text-destructive bg-destructive/10 p-2 rounded">
            {error}
          </div>
        )}

        {/* Info */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t space-y-1">
          <p>Broadcasting 24/7 from Hull, East Yorkshire</p>
          <p>Stream: MP3 • 128kb/s • Stereo</p>
        </div>
      </CardContent>
    </Card>
  );
}

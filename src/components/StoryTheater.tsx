import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface StoryTheaterProps {
  storyText: string;
  theme: string;
}

const StoryTheater = ({ storyText, theme }: StoryTheaterProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  // Split story into scenes (by paragraphs)
  const scenes = storyText.split('\n').filter(s => s.trim().length > 0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentScene(prev => {
        if (prev >= scenes.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, scenes.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentScene(0);
  };

  const getCharacterEmoji = () => {
    const theme_lower = theme.toLowerCase();
    if (theme_lower.includes('space')) return '🚀';
    if (theme_lower.includes('ocean')) return '🐠';
    if (theme_lower.includes('forest')) return '🦊';
    if (theme_lower.includes('castle')) return '🏰';
    if (theme_lower.includes('dragon')) return '🐉';
    return '🌟';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Story Theater Mode</CardTitle>
        <CardDescription>
          Watch your story come to life with animated scenes!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theater Stage */}
        <div className="relative bg-gradient-to-b from-primary/5 to-primary/10 rounded-lg p-8 min-h-[300px] overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute text-6xl ${isPlaying ? 'animate-bounce' : ''}`} 
                 style={{ left: '10%', top: '20%', animationDelay: '0s' }}>
              {getCharacterEmoji()}
            </div>
            <div className={`absolute text-4xl ${isPlaying ? 'animate-pulse' : ''}`}
                 style={{ right: '15%', top: '30%', animationDelay: '0.5s' }}>
              ✨
            </div>
            <div className={`absolute text-5xl ${isPlaying ? 'animate-bounce' : ''}`}
                 style={{ left: '70%', bottom: '25%', animationDelay: '1s' }}>
              ⭐
            </div>
            <div className={`absolute text-3xl ${isPlaying ? 'animate-pulse' : ''}`}
                 style={{ left: '20%', bottom: '20%', animationDelay: '1.5s' }}>
              🌙
            </div>
          </div>

          {/* Scene Text */}
          <div className="relative z-10 flex items-center justify-center min-h-[250px]">
            <p className={`text-lg text-center max-w-2xl px-4 transition-all duration-500 ${
              isPlaying ? 'animate-fade-in' : ''
            }`}>
              {scenes[currentScene]}
            </p>
          </div>

          {/* Scene Counter */}
          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium">
              Scene {currentScene + 1} of {scenes.length}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            disabled={isPlaying}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handlePlayPause}
            size="lg"
            className="px-8"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>
        </div>

        {/* Scene Progress */}
        <div className="flex gap-2 justify-center flex-wrap">
          {scenes.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentScene
                  ? 'w-8 bg-primary'
                  : index < currentScene
                  ? 'w-2 bg-primary/50'
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryTheater;

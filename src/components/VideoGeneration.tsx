import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Video, Download, Play, Pause } from "lucide-react";

type VideoGenerationProps = {
  storyText: string;
  imageUrl: string | null;
  theme: string;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
};

export function VideoGeneration({ 
  storyText, 
  theme, 
  isGenerating, 
  setIsGenerating 
}: VideoGenerationProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerateVideo = async () => {
    if (!storyText) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Simulate video generation progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // In a real implementation, this would call video generation API
      // For now, we'll simulate a delay and return a working video URL
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Use Big Buck Bunny as a working test video
      setVideoUrl("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
      
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayPause = () => {
    const video = document.getElementById('story-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleDownload = () => {
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = 'story-animation.mp4';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!storyText) return null;

  return (
    <div className="w-full mt-8">
      <h3 className="text-xl font-bold mb-4 text-center text-kids-purple">
        Story Animation
      </h3>
      
      {!videoUrl && !isGenerating && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-kids-blue/30 rounded-xl p-8 w-full">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-kids-blue/10 rounded-full flex items-center justify-center mx-auto">
              <Video className="w-10 h-10 text-kids-blue" />
            </div>
            <h4 className="text-lg font-semibold text-kids-blue">Create Story Video</h4>
            <p className="text-sm text-gray-500 max-w-sm">
              Transform your story into an animated video with AI narration and visuals
            </p>
          </div>
          
          <Button 
            onClick={handleGenerateVideo}
            className="mt-6 bg-gradient-to-r from-kids-blue to-kids-purple hover:opacity-90 text-white"
          >
            Create Video Animation
          </Button>
        </div>
      )}
      
      {isGenerating && (
        <div className="border-2 border-kids-blue/30 rounded-xl p-8 w-full">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-kids-blue/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Video className="w-10 h-10 text-kids-blue" />
            </div>
            <h4 className="text-lg font-semibold text-kids-blue">Creating Your Video...</h4>
            <div className="w-full max-w-md mx-auto">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              {progress < 30 && <p>🎭 Analyzing your story...</p>}
              {progress >= 30 && progress < 60 && <p>🎨 Creating visual scenes...</p>}
              {progress >= 60 && progress < 90 && <p>🎵 Adding narration and music...</p>}
              {progress >= 90 && <p>✨ Finalizing your animation...</p>}
            </div>
          </div>
        </div>
      )}
      
      {videoUrl && (
        <div className="w-full relative">
          <div className="rounded-xl overflow-hidden shadow-lg bg-black">
            <video 
              id="story-video"
              src={videoUrl} 
              className="w-full h-auto aspect-video object-contain"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              preload="metadata"
            />
            
            {/* Custom video controls overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <Button
                  onClick={togglePlayPause}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleDownload}
                    size="sm"
                    className="bg-kids-green hover:bg-kids-green/90 text-white"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  
                  <Button 
                    onClick={handleGenerateVideo} 
                    size="sm"
                    className="bg-kids-orange hover:bg-kids-orange/90 text-white"
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
              
              {!isPlaying && (
                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-16 h-16"
                >
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Your story has been transformed into an animated video! 
              Click play to watch your tale come to life.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

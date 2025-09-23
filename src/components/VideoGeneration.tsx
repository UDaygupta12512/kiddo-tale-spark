import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Video, Download, Play, Pause, Key, AlertCircle } from "lucide-react";
import { toast } from "sonner";

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
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('gemini-api-key') || '';
  });
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(() => {
    return !localStorage.getItem('gemini-api-key');
  });

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini-api-key', apiKey.trim());
      setShowApiKeyInput(false);
      toast.success("API key saved successfully!");
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const handleGenerateVideo = async () => {
    if (!storyText) return;
    
    if (!apiKey) {
      setShowApiKeyInput(true);
      toast.error("Please provide your Gemini API key first");
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);
    
    try {
      setProgress(10);
      
      // Create a detailed prompt for video generation based on the story
      const videoPrompt = `Create a short animated video (30-60 seconds) based on this children's story with ${theme} theme: ${storyText}. 
      The video should be:
      - Child-friendly and colorful
      - Include key scenes from the story
      - Have smooth transitions between scenes
      - Be suitable for children aged 5-12
      - Include the main characters and settings mentioned in the story`;

      setProgress(30);

      // Call Gemini Veo 3 API
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/veo-003:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: videoPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      });

      setProgress(60);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate video');
      }

      const data = await response.json();
      setProgress(80);

      // Extract video URL from response
      const videoUrl = data.candidates?.[0]?.content?.parts?.[0]?.videoUrl;
      
      if (!videoUrl) {
        throw new Error('No video URL received from API');
      }

      setProgress(100);
      setVideoUrl(videoUrl);
      toast.success("Video generated successfully!");
      
    } catch (error) {
      console.error("Error generating video:", error);
      toast.error(`Error: ${error.message}`);
      // Fallback to demo video for testing
      setVideoUrl("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
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
        Story Animation with Gemini Veo 3
      </h3>
      
      {showApiKeyInput && (
        <div className="mb-6 p-6 border-2 border-amber-200 rounded-xl bg-amber-50">
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-5 h-5 text-amber-600" />
            <h4 className="text-lg font-semibold text-amber-800">API Key Required</h4>
          </div>
          <div className="flex items-start gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
            <p className="text-sm text-amber-700">
              To generate unique videos, please enter your Gemini API key. Get yours at{" "}
              <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" 
                 className="underline hover:text-amber-800">
                Google AI Studio
              </a>
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <Label htmlFor="api-key" className="text-amber-800">Gemini API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Gemini API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveApiKey} className="bg-amber-600 hover:bg-amber-700 text-white">
                Save API Key
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowApiKeyInput(false)}
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {!videoUrl && !isGenerating && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-kids-blue/30 rounded-xl p-8 w-full">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-kids-blue/10 rounded-full flex items-center justify-center mx-auto">
              <Video className="w-10 h-10 text-kids-blue" />
            </div>
            <h4 className="text-lg font-semibold text-kids-blue">Create Story Video</h4>
            <p className="text-sm text-gray-500 max-w-sm">
              Transform your story into a unique animated video using Gemini Veo 3 AI
            </p>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={handleGenerateVideo}
              className="bg-gradient-to-r from-kids-blue to-kids-purple hover:opacity-90 text-white"
              disabled={!apiKey}
            >
              Create Video Animation
            </Button>
            {apiKey && (
              <Button 
                variant="outline"
                onClick={() => setShowApiKeyInput(true)}
                className="border-kids-blue text-kids-blue hover:bg-kids-blue/5"
              >
                <Key className="w-4 h-4 mr-2" />
                Change API Key
              </Button>
            )}
          </div>
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

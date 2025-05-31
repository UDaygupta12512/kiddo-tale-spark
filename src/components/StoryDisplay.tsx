
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ImageGeneration } from './ImageGeneration';
import { VideoGeneration } from './VideoGeneration';
import { cn } from "@/lib/utils";

type StoryDisplayProps = {
  storyText: string;
  theme: string;
  isGeneratingImage: boolean;
  setIsGeneratingImage: (value: boolean) => void;
};

export function StoryDisplay({ 
  storyText, 
  theme, 
  isGeneratingImage, 
  setIsGeneratingImage 
}: StoryDisplayProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  
  useEffect(() => {
    // Add a slight delay before animating in the content
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [storyText]);

  // Function to generate story paragraphs with proper spacing
  const formatStory = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph.trim()}
      </p>
    ));
  };
  
  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    
    try {
      // In a real implementation, this would call the Replicate API
      // For now, we'll simulate a delay and return a mock image URL
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Use a placeholder image based on the theme
      const placeholderImages: Record<string, string> = {
        adventure: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
        fantasy: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
        mystery: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        friendship: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
        animals: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
        space: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      };
      
      setImageUrl(placeholderImages[theme] || placeholderImages.adventure);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  if (!storyText) return null;
  
  return (
    <div className={cn(
      "story-card w-full max-w-6xl mx-auto mt-8 transition-all duration-700 opacity-0 translate-y-10",
      animateIn && "opacity-100 translate-y-0"
    )}>
      <h2 className="text-2xl font-bold mb-2 text-center text-kids-purple">Your Story</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="prose max-w-none">
          {formatStory(storyText)}
          
          <div className="mt-6">
            <Button 
              onClick={() => window.print()} 
              variant="outline" 
              className="mr-2 border-kids-purple text-kids-purple hover:bg-kids-purple/10"
            >
              Print Story
            </Button>
            
            <Button 
              onClick={() => {
                navigator.clipboard.writeText(storyText);
              }} 
              variant="outline"
              className="border-kids-blue text-kids-blue hover:bg-kids-blue/10"
            >
              Copy Text
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col space-y-6">
          <ImageGeneration 
            imageUrl={imageUrl}
            isGenerating={isGeneratingImage}
            onGenerate={handleGenerateImage}
            theme={theme}
          />
          
          <VideoGeneration
            storyText={storyText}
            imageUrl={imageUrl}
            theme={theme}
            isGenerating={isGeneratingVideo}
            setIsGenerating={setIsGeneratingVideo}
          />
        </div>
      </div>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { VideoGeneration } from './VideoGeneration';
import { cn } from "@/lib/utils";

type StoryDisplayProps = {
  storyText: string;
  theme: string;
};

export function StoryDisplay({ 
  storyText, 
  theme
}: StoryDisplayProps) {
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
          <VideoGeneration
            storyText={storyText}
            imageUrl={null}
            theme={theme}
            isGenerating={isGeneratingVideo}
            setIsGenerating={setIsGeneratingVideo}
          />
        </div>
      </div>
    </div>
  );
}

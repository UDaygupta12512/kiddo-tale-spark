
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
      // For now, we'll simulate a delay and return animated character images
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate animated character images based on story content and theme
      const storyKeywords = storyText.toLowerCase();
      let selectedImage = "";
      
      // Choose animated character images based on story content and theme
      if (theme === 'adventure' || storyKeywords.includes('adventure') || storyKeywords.includes('explore')) {
        selectedImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"; // Adventure character illustration
      } else if (theme === 'fantasy' || storyKeywords.includes('magic') || storyKeywords.includes('wizard') || storyKeywords.includes('fairy')) {
        selectedImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"; // Fantasy character
      } else if (theme === 'mystery' || storyKeywords.includes('detective') || storyKeywords.includes('mystery') || storyKeywords.includes('secret')) {
        selectedImage = "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop"; // Mystery character silhouette
      } else if (theme === 'friendship' || storyKeywords.includes('friend') || storyKeywords.includes('together') || storyKeywords.includes('buddy')) {
        selectedImage = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop"; // Friendly characters together
      } else if (theme === 'animals' || storyKeywords.includes('animal') || storyKeywords.includes('pet')) {
        // Animated animal characters based on specific animals mentioned
        if (storyKeywords.includes('cat') || storyKeywords.includes('kitten')) {
          selectedImage = "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop"; // Animated cat character
        } else if (storyKeywords.includes('dog') || storyKeywords.includes('puppy')) {
          selectedImage = "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop"; // Animated dog character
        } else if (storyKeywords.includes('rabbit') || storyKeywords.includes('bunny')) {
          selectedImage = "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=600&fit=crop"; // Animated rabbit character
        } else if (storyKeywords.includes('bird') || storyKeywords.includes('owl')) {
          selectedImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"; // Animated bird character
        } else {
          selectedImage = "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop"; // Default cute animal character
        }
      } else if (theme === 'space' || storyKeywords.includes('space') || storyKeywords.includes('astronaut') || storyKeywords.includes('alien')) {
        selectedImage = "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop"; // Space character/astronaut
      } else if (storyKeywords.includes('princess') || storyKeywords.includes('prince')) {
        selectedImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"; // Royal character
      } else if (storyKeywords.includes('robot') || storyKeywords.includes('machine')) {
        selectedImage = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"; // Robot character
      } else if (storyKeywords.includes('superhero') || storyKeywords.includes('hero')) {
        selectedImage = "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop"; // Superhero character
      } else if (storyKeywords.includes('pirate') || storyKeywords.includes('treasure')) {
        selectedImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"; // Pirate character
      } else if (storyKeywords.includes('dragon')) {
        selectedImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"; // Dragon character
      } else {
        // Default to a friendly animated character for general stories
        selectedImage = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop";
      }
      
      console.log(`Generated animated character image for theme: ${theme}, story contains: ${storyKeywords.slice(0, 50)}...`);
      setImageUrl(selectedImage);
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


import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { VideoGeneration } from './VideoGeneration';
import { StoryNarrator } from './StoryNarrator';
import { WordExplorer } from './WordExplorer';
import { StoryRemixer } from './StoryRemixer';
import { StoryCertificate } from './StoryCertificate';
import { StoryPDFExport } from './StoryPDFExport';
import { Flashcards } from './Flashcards';
import { Rhymes } from './Rhymes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [remixedStory, setRemixedStory] = useState("");
  
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
  
  const displayStory = remixedStory || storyText;

  return (
    <div className={cn(
      "story-card w-full max-w-6xl mx-auto mt-8 transition-all duration-700 opacity-0 translate-y-10",
      animateIn && "opacity-100 translate-y-0"
    )}>
      <h2 className="text-2xl font-bold mb-6 text-center text-kids-purple">Your Story</h2>
      
      <Tabs defaultValue="story" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-6">
          <TabsTrigger value="story">📖 Story</TabsTrigger>
          <TabsTrigger value="narrate">🎧 Narrate</TabsTrigger>
          <TabsTrigger value="explore">📚 Explore</TabsTrigger>
          <TabsTrigger value="remix">✨ Remix</TabsTrigger>
          <TabsTrigger value="rewards">🏆 Rewards</TabsTrigger>
          <TabsTrigger value="flashcards">🃏 Cards</TabsTrigger>
          <TabsTrigger value="rhymes">🎵 Rhymes</TabsTrigger>
        </TabsList>

        <TabsContent value="story">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="prose max-w-none">
              {formatStory(displayStory)}
              
              <div className="mt-6 flex flex-wrap gap-2">
                <StoryPDFExport 
                  title={`${theme || 'My'} Story`}
                  content={displayStory}
                  theme={theme}
                />
                
                <Button 
                  onClick={() => window.print()} 
                  variant="outline" 
                  className="border-kids-purple text-kids-purple hover:bg-kids-purple/10"
                >
                  Print Story
                </Button>
                
                <Button 
                  onClick={() => {
                    navigator.clipboard.writeText(displayStory);
                  }} 
                  variant="outline"
                  className="border-kids-blue text-kids-blue hover:bg-kids-blue/10"
                >
                  Copy Text
                </Button>

                <Button 
                  onClick={() => {
                    localStorage.setItem('lastStory', displayStory);
                    localStorage.setItem('lastTheme', theme);
                  }} 
                  variant="outline"
                  className="border-kids-green text-kids-green hover:bg-kids-green/10"
                >
                  Save Story
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-6">
              <VideoGeneration
                storyText={displayStory}
                imageUrl={null}
                theme={theme}
                isGenerating={isGeneratingVideo}
                setIsGenerating={setIsGeneratingVideo}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="narrate">
          <StoryNarrator storyText={displayStory} />
        </TabsContent>

        <TabsContent value="explore">
          <WordExplorer storyText={displayStory} />
        </TabsContent>

        <TabsContent value="remix">
          <StoryRemixer 
            originalStory={storyText}
            theme={theme}
            onRemixGenerated={setRemixedStory}
          />
          {remixedStory && (
            <div className="mt-6 story-card p-4">
              <h3 className="font-bold text-kids-purple mb-3">Remixed Version:</h3>
              <div className="prose max-w-none">
                {formatStory(remixedStory)}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="rewards">
          <StoryCertificate 
            storyTitle={`${theme || 'My Amazing'} Story`}
          />
        </TabsContent>

        <TabsContent value="flashcards">
          <Flashcards storyText={displayStory} />
        </TabsContent>

        <TabsContent value="rhymes">
          <Rhymes />
        </TabsContent>
      </Tabs>
    </div>
  );
}

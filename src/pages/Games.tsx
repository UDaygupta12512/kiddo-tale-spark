
import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoryQuiz } from "@/components/StoryQuiz";
import { FinishTheStory } from "@/components/FinishTheStory";
import { ColoringPages } from "@/components/ColoringPages";

const Games = () => {
  // This would ideally come from a context or prop
  const [sampleStory] = useState(`Once upon a time, in a magical kingdom far away, there lived a brave little mouse named Pip. Pip loved to explore and was always curious about the world around him. One day, while exploring the royal garden, Pip discovered a mysterious golden key hidden under a rose bush. The key seemed to glow with its own magical light, and Pip knew it must be special.`);

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="py-16 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <BackButton />
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              🎮 Mini Games & Activities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have fun with interactive games based on your stories! 
              Test your understanding, create your own endings, and enjoy coloring pages.
            </p>
          </div>

          <Tabs defaultValue="quiz" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="quiz" className="text-kids-purple data-[state=active]:bg-kids-purple data-[state=active]:text-white transition-all duration-200">
                📝 Story Quiz
              </TabsTrigger>
              <TabsTrigger value="finish" className="text-kids-blue data-[state=active]:bg-kids-blue data-[state=active]:text-white transition-all duration-200">
                ✍️ Finish the Story
              </TabsTrigger>
              <TabsTrigger value="coloring" className="text-kids-orange data-[state=active]:bg-kids-orange data-[state=active]:text-white transition-all duration-200">
                🎨 Coloring Pages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quiz" className="mt-6 animate-fade-in">
              <StoryQuiz storyText={sampleStory} />
            </TabsContent>

            <TabsContent value="finish" className="mt-6 animate-fade-in">
              <FinishTheStory storyText={sampleStory} />
            </TabsContent>

            <TabsContent value="coloring" className="mt-6 animate-fade-in">
              <ColoringPages />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Games;

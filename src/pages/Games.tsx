
import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoryQuiz } from "@/components/StoryQuiz";
import { FinishTheStory } from "@/components/FinishTheStory";
import { ColoringPages } from "@/components/ColoringPages";
import StoryChallenges from "@/components/StoryChallenges";

const Games = () => {
  const [currentStory, setCurrentStory] = useState<string>("");

  useEffect(() => {
    // Try to get the story from localStorage or URL params
    const savedStory = localStorage.getItem('generatedStory');
    const urlParams = new URLSearchParams(window.location.search);
    const storyFromUrl = urlParams.get('story');
    
    if (storyFromUrl) {
      setCurrentStory(decodeURIComponent(storyFromUrl));
    } else if (savedStory) {
      setCurrentStory(savedStory);
    } else {
      // Fallback sample story if no story is available
      setCurrentStory(`Once upon a time, in a magical kingdom far away, there lived a brave little mouse named Pip. Pip loved to explore and was always curious about the world around him. One day, while exploring the royal garden, Pip discovered a mysterious golden key hidden under a rose bush. The key seemed to glow with its own magical light, and Pip knew it must be special. With courage in his heart, Pip decided to find out what the magical key could unlock.`);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      
      <main className="py-16 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <BackButton />
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🎮 Mini Games & Activities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have fun with interactive games based on your stories! 
              Test your understanding, create your own endings, and enjoy coloring pages.
            </p>
          </div>

          <Tabs defaultValue="quiz" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-lg rounded-xl border-2 border-purple-200">
              <TabsTrigger 
                value="quiz" 
                className="text-purple-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-200 rounded-lg font-semibold"
              >
                📝 Story Quiz
              </TabsTrigger>
              <TabsTrigger 
                value="finish" 
                className="text-blue-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-200 rounded-lg font-semibold"
              >
                ✍️ Finish the Story
              </TabsTrigger>
              <TabsTrigger 
                value="coloring" 
                className="text-orange-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-200 rounded-lg font-semibold"
              >
                🎨 Coloring Pages
              </TabsTrigger>
              <TabsTrigger 
                value="challenges" 
                className="text-green-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all duration-200 rounded-lg font-semibold"
              >
                🏆 Challenges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quiz" className="mt-6 animate-fade-in">
              <StoryQuiz storyText={currentStory} />
            </TabsContent>

            <TabsContent value="finish" className="mt-6 animate-fade-in">
              <FinishTheStory storyText={currentStory} />
            </TabsContent>

            <TabsContent value="coloring" className="mt-6 animate-fade-in">
              <ColoringPages />
            </TabsContent>

            <TabsContent value="challenges" className="mt-6 animate-fade-in">
              <StoryChallenges />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Games;

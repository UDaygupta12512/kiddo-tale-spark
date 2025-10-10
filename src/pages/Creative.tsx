import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';
import { CharacterBuilder } from '@/components/CharacterBuilder';
import { StoryLibrary } from '@/components/StoryLibrary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, BookOpen, Users } from 'lucide-react';

export default function Creative() {
  const [currentStory, setCurrentStory] = useState("");
  const [currentTheme, setCurrentTheme] = useState("");

  const handleLoadStory = (text: string, theme: string) => {
    setCurrentStory(text);
    setCurrentTheme(theme);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kids-purple/5 via-kids-blue/5 to-kids-green/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-kids-purple via-kids-orange to-kids-blue bg-clip-text text-transparent">
            Creative Studio
          </h1>
          <p className="text-gray-600 text-lg">
            Build characters, save stories, and explore your creativity!
          </p>
        </div>

        <Tabs defaultValue="characters" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger 
              value="characters"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-kids-purple data-[state=active]:to-kids-blue data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Character Builder
            </TabsTrigger>
            <TabsTrigger 
              value="library"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-kids-green data-[state=active]:to-kids-blue data-[state=active]:text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Story Library
            </TabsTrigger>
          </TabsList>

          <TabsContent value="characters" className="animate-fade-in">
            <CharacterBuilder 
              onCharacterCreated={(char) => {
                console.log("Character created:", char);
              }}
            />
            
            <div className="mt-6 p-6 story-card bg-gradient-to-r from-kids-purple/10 to-kids-blue/10">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-kids-purple flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-kids-purple mb-2">
                    How to Use Your Characters
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✨ Create unique characters with special powers and personalities</li>
                    <li>📝 Use them as inspiration for your next story</li>
                    <li>🎨 Mix and match different traits to make interesting combinations</li>
                    <li>🎲 Try the random generator for surprise characters!</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="library" className="animate-fade-in">
            <StoryLibrary 
              currentStory={currentStory}
              currentTheme={currentTheme}
              onLoadStory={handleLoadStory}
            />
            
            <div className="mt-6 p-6 story-card bg-gradient-to-r from-kids-green/10 to-kids-blue/10">
              <div className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 text-kids-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-kids-green mb-2">
                    Story Library Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>💾 All stories are saved locally in your browser</li>
                    <li>📖 View and re-read your favorite stories anytime</li>
                    <li>🔄 Load saved stories to continue or remix them</li>
                    <li>🗑️ Delete stories you no longer need</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
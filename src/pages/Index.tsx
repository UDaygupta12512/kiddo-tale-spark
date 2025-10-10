
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { StoryForm } from "@/components/StoryForm";
import { StoryDisplay } from "@/components/StoryDisplay";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [storyText, setStoryText] = useState("");
  const [storyTheme, setStoryTheme] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStoryGenerated = (text: string, theme: string) => {
    setStoryText(text);
    setStoryTheme(theme);
  };

  // Add decorative bubbles
  const renderBubbles = () => {
    const bubbles = [];
    const colors = ["bg-kids-purple", "bg-kids-orange", "bg-kids-blue", "bg-kids-yellow"];
    
    for (let i = 0; i < 6; i++) {
      const size = Math.floor(Math.random() * 100) + 50;
      const top = Math.floor(Math.random() * 100);
      const left = Math.floor(Math.random() * 90);
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      bubbles.push(
        <div
          key={i}
          className={`bubble ${colors[colorIndex]}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            opacity: 0.1,
            filter: 'blur(40px)',
            animation: `float ${Math.floor(Math.random() * 5) + 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      );
    }
    return bubbles;
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background bubbles */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {renderBubbles()}
      </div>
      
      {/* Content */}
      <Header />
      
      <main className="relative z-10">
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create Magical{" "}
              <span className="bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
                AI Stories
              </span>{" "}
              for Children
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Design unique stories with your child's favorite characters
              and watch their imagination come to life with AI illustrations and animations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a 
                href="#create" 
                className="inline-block bg-gradient-to-r from-kids-purple to-kids-blue hover:opacity-90 transition-opacity text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg shadow-kids-purple/30"
              >
                Start Creating
              </a>
              
              <Link to="/creative">
                <Button 
                  variant="outline" 
                  className="border-kids-purple text-kids-purple hover:bg-kids-purple/10 py-4 px-8 text-lg"
                >
                  ✨ Creative Studio
                </Button>
              </Link>
              
              <Link to="/games">
                <Button 
                  variant="outline" 
                  className="border-kids-orange text-kids-orange hover:bg-kids-orange/10 py-4 px-8 text-lg"
                >
                  🎮 Play Games
                </Button>
              </Link>
              
              <Link to="/parents-teachers">
                <Button 
                  variant="outline" 
                  className="border-kids-green text-kids-green hover:bg-kids-green/10 py-4 px-8 text-lg"
                >
                  👨‍👩‍👧‍👦 For Educators
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <Features />
        
        <HowItWorks />
        
        <section id="create" className="py-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
            Create Your Story
          </h2>
          
          <StoryForm 
            onStoryGenerated={handleStoryGenerated} 
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
          
          {storyText && (
            <StoryDisplay 
              storyText={storyText} 
              theme={storyTheme}
            />
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

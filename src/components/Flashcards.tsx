import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

interface FlashcardsProps {
  storyText: string;
}

export function Flashcards({ storyText }: FlashcardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Extract key words and create flashcards from story
  const generateFlashcards = () => {
    const words = storyText.split(/\s+/);
    const uniqueWords = new Set<string>();
    const flashcards: { word: string; definition: string; example: string }[] = [];

    // Find interesting words (longer than 5 characters)
    words.forEach((word) => {
      const cleaned = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
      if (cleaned.length > 5 && !uniqueWords.has(cleaned)) {
        uniqueWords.add(cleaned);
        if (flashcards.length < 10) {
          // Create simple flashcards
          flashcards.push({
            word: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
            definition: `A word from your story`,
            example: `"${word}" appears in your adventure!`,
          });
        }
      }
    });

    // Add some default educational cards if story is too short
    if (flashcards.length < 5) {
      flashcards.push(
        {
          word: "Brave",
          definition: "Having courage and not being afraid",
          example: "The brave hero faced the dragon!",
        },
        {
          word: "Adventure",
          definition: "An exciting experience or journey",
          example: "Every story is a new adventure!",
        },
        {
          word: "Friendship",
          definition: "A special bond between friends",
          example: "True friendship makes us stronger!",
        },
        {
          word: "Magical",
          definition: "Full of wonder and enchantment",
          example: "The forest was magical and mysterious!",
        },
        {
          word: "Creative",
          definition: "Using imagination to make new things",
          example: "Be creative and tell your own story!",
        }
      );
    }

    return flashcards.slice(0, 10);
  };

  const cards = generateFlashcards();

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Generate a story first to create flashcards!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
          Learning Flashcards
        </h3>
        <p className="text-muted-foreground">
          Card {currentCard + 1} of {cards.length}
        </p>
      </div>

      <div className="perspective-1000 mb-8">
        <Card
          className={`relative h-80 cursor-pointer transition-all duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <div
            className={`absolute inset-0 backface-hidden p-8 flex flex-col items-center justify-center bg-gradient-to-br from-kids-purple/10 to-kids-blue/10 rounded-lg ${
              isFlipped ? "invisible" : "visible"
            }`}
          >
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Word</p>
              <h4 className="text-4xl font-bold text-kids-purple mb-6">
                {cards[currentCard].word}
              </h4>
              <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
                <RotateCw className="w-4 h-4" />
                Click to flip
              </p>
            </div>
          </div>

          {/* Back of card */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-kids-orange/10 to-kids-green/10 rounded-lg ${
              isFlipped ? "visible" : "invisible"
            }`}
          >
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Definition</p>
                <p className="text-lg font-medium">{cards[currentCard].definition}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Example</p>
                <p className="text-base italic text-kids-orange">
                  {cards[currentCard].example}
                </p>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center pt-4">
                <RotateCw className="w-4 h-4" />
                Click to flip back
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentCard(idx);
                setIsFlipped(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentCard ? "bg-kids-purple w-6" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

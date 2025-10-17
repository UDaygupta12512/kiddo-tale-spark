import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, RotateCw, Check, X, Trophy, Star, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface FlashcardsProps {
  storyText: string;
}

export function Flashcards({ storyText }: FlashcardsProps) {
  const { toast } = useToast();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [unknownCards, setUnknownCards] = useState<Set<number>>(new Set());
  const [studyMode, setStudyMode] = useState<"learn" | "quiz">("learn");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Enhanced vocabulary with real definitions
  const vocabularyDatabase = {
    brave: { definition: "Having courage and fearlessness", category: "Character Trait", synonyms: ["courageous", "fearless"] },
    adventure: { definition: "An exciting or unusual experience", category: "Action", synonyms: ["journey", "quest"] },
    magical: { definition: "Having supernatural powers or qualities", category: "Description", synonyms: ["enchanted", "mystical"] },
    friendship: { definition: "A bond of mutual affection between people", category: "Relationship", synonyms: ["companionship", "bond"] },
    creative: { definition: "Using imagination to produce original ideas", category: "Ability", synonyms: ["imaginative", "inventive"] },
    curious: { definition: "Eager to know or learn something", category: "Character Trait", synonyms: ["inquisitive", "interested"] },
    journey: { definition: "An act of traveling from one place to another", category: "Action", synonyms: ["trip", "voyage"] },
    wisdom: { definition: "The quality of having experience and good judgment", category: "Quality", synonyms: ["knowledge", "insight"] },
    kindness: { definition: "The quality of being friendly and considerate", category: "Quality", synonyms: ["compassion", "warmth"] },
    treasure: { definition: "A very valuable object", category: "Object", synonyms: ["riches", "fortune"] },
    mysterious: { definition: "Difficult to understand or explain", category: "Description", synonyms: ["puzzling", "enigmatic"] },
    challenge: { definition: "A difficult task that tests one's abilities", category: "Action", synonyms: ["trial", "test"] },
    discover: { definition: "To find something for the first time", category: "Action", synonyms: ["uncover", "find"] },
    courage: { definition: "Strength in the face of pain or grief", category: "Quality", synonyms: ["bravery", "valor"] },
    imagination: { definition: "The ability to form new ideas or images", category: "Ability", synonyms: ["creativity", "vision"] },
  };

  // Extract key words and create flashcards from story
  const generateFlashcards = () => {
    const words = storyText.split(/\s+/);
    const uniqueWords = new Set<string>();
    const flashcards: { word: string; definition: string; example: string; category: string; synonyms: string[] }[] = [];

    // Find interesting words from story and match with vocabulary
    words.forEach((word) => {
      const cleaned = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
      if (cleaned.length > 5 && !uniqueWords.has(cleaned)) {
        uniqueWords.add(cleaned);
        
        const vocabEntry = vocabularyDatabase[cleaned as keyof typeof vocabularyDatabase];
        if (vocabEntry && flashcards.length < 15) {
          flashcards.push({
            word: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
            definition: vocabEntry.definition,
            example: `Found in your story: "${word}"`,
            category: vocabEntry.category,
            synonyms: vocabEntry.synonyms,
          });
        }
      }
    });

    // Add educational vocabulary cards
    const educationalCards = [
      {
        word: "Brave",
        definition: "Having courage and fearlessness",
        example: "The brave hero faced the dragon without fear!",
        category: "Character Trait",
        synonyms: ["courageous", "fearless", "bold"],
      },
      {
        word: "Adventure",
        definition: "An exciting or unusual experience",
        example: "Every story is a new adventure waiting to unfold!",
        category: "Action",
        synonyms: ["journey", "quest", "expedition"],
      },
      {
        word: "Magical",
        definition: "Having supernatural powers or qualities",
        example: "The forest was magical and full of wonders!",
        category: "Description",
        synonyms: ["enchanted", "mystical", "spellbinding"],
      },
      {
        word: "Friendship",
        definition: "A bond of mutual affection between people",
        example: "True friendship makes us stronger together!",
        category: "Relationship",
        synonyms: ["companionship", "camaraderie", "bond"],
      },
      {
        word: "Creative",
        definition: "Using imagination to produce original ideas",
        example: "Be creative and tell your own unique story!",
        category: "Ability",
        synonyms: ["imaginative", "inventive", "artistic"],
      },
      {
        word: "Curious",
        definition: "Eager to know or learn something",
        example: "Stay curious and ask questions about the world!",
        category: "Character Trait",
        synonyms: ["inquisitive", "interested", "questioning"],
      },
      {
        word: "Wisdom",
        definition: "The quality of having experience and good judgment",
        example: "The old owl shared wisdom with all the animals!",
        category: "Quality",
        synonyms: ["knowledge", "insight", "understanding"],
      },
      {
        word: "Kindness",
        definition: "The quality of being friendly and considerate",
        example: "A little kindness can change someone's whole day!",
        category: "Quality",
        synonyms: ["compassion", "warmth", "generosity"],
      },
    ];

    if (flashcards.length < 8) {
      educationalCards.forEach((card) => {
        if (flashcards.length < 12) {
          flashcards.push(card);
        }
      });
    }

    return flashcards;
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

  const markAsKnown = () => {
    const newKnown = new Set(knownCards);
    newKnown.add(currentCard);
    unknownCards.delete(currentCard);
    setKnownCards(newKnown);
    setUnknownCards(new Set(unknownCards));
    setScore(score + 10);
    setStreak(streak + 1);
    
    if (newKnown.size === cards.length) {
      toast({
        title: "🎉 Perfect Score!",
        description: "You've mastered all the flashcards!",
      });
    }
    
    handleNext();
  };

  const markAsUnknown = () => {
    const newUnknown = new Set(unknownCards);
    newUnknown.add(currentCard);
    knownCards.delete(currentCard);
    setKnownCards(new Set(knownCards));
    setUnknownCards(newUnknown);
    setStreak(0);
    handleNext();
  };

  const resetProgress = () => {
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setScore(0);
    setStreak(0);
    setCurrentCard(0);
    toast({
      title: "Progress Reset",
      description: "Start learning again!",
    });
  };

  const progress = (knownCards.size / cards.length) * 100;

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Generate a story first to create flashcards!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-2xl font-bold text-primary">{score}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-accent/10">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-secondary" />
            <div>
              <p className="text-sm text-muted-foreground">Streak</p>
              <p className="text-2xl font-bold text-secondary">{streak} 🔥</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/10">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Mastered</p>
              <p className="text-2xl font-bold text-accent">{knownCards.size}/{cards.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <div className="text-center">
        <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Vocabulary Flashcards
        </h3>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge variant={studyMode === "learn" ? "default" : "outline"} 
                 className="cursor-pointer"
                 onClick={() => setStudyMode("learn")}>
            📚 Learn Mode
          </Badge>
          <span className="text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            Card {currentCard + 1} of {cards.length}
          </span>
        </div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-8">
        <Card
          className={`relative h-96 cursor-pointer transition-all duration-700 transform-style-3d hover:shadow-2xl ${
            isFlipped ? "rotate-y-180" : ""
          } ${knownCards.has(currentCard) ? "ring-4 ring-primary/50" : unknownCards.has(currentCard) ? "ring-4 ring-secondary/50" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <div
            className={`absolute inset-0 backface-hidden p-8 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-lg ${
              isFlipped ? "invisible" : "visible"
            }`}
          >
            <div className="text-center w-full space-y-6">
              <div className="inline-block px-4 py-1 bg-background/80 rounded-full">
                <Badge variant="outline" className="text-xs">
                  {cards[currentCard].category}
                </Badge>
              </div>
              
              <h4 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 animate-fade-in">
                {cards[currentCard].word}
              </h4>
              
              <div className="flex gap-2 justify-center flex-wrap">
                {knownCards.has(currentCard) && (
                  <Badge className="bg-primary/20 text-primary border-primary">
                    <Check className="w-3 h-3 mr-1" /> Known
                  </Badge>
                )}
                {unknownCards.has(currentCard) && (
                  <Badge className="bg-secondary/20 text-secondary border-secondary">
                    Learning
                  </Badge>
                )}
              </div>

              <div className="pt-8">
                <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center animate-pulse">
                  <RotateCw className="w-4 h-4" />
                  Click to reveal definition
                </p>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 rounded-lg ${
              isFlipped ? "visible" : "invisible"
            }`}
          >
            <div className="text-center space-y-5 w-full">
              <h4 className="text-2xl font-bold text-primary">{cards[currentCard].word}</h4>
              
              <div className="bg-background/60 p-4 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Definition</p>
                <p className="text-lg font-medium leading-relaxed">{cards[currentCard].definition}</p>
              </div>
              
              <div className="bg-background/40 p-4 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Example</p>
                <p className="text-base italic text-secondary">
                  {cards[currentCard].example}
                </p>
              </div>

              <div className="bg-background/40 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Synonyms</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {cards[currentCard].synonyms.map((syn, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {syn}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center pt-2">
                <RotateCw className="w-4 h-4" />
                Click to flip back
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        <Button
          onClick={markAsUnknown}
          variant="outline"
          className="gap-2 border-secondary text-secondary hover:bg-secondary/10"
        >
          <X className="w-4 h-4" />
          Still Learning
        </Button>
        <Button
          onClick={markAsKnown}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Check className="w-4 h-4" />
          I Know This!
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 hover-scale"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <div className="flex gap-2 items-center">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentCard(idx);
                setIsFlipped(false);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentCard 
                  ? "bg-primary w-8" 
                  : knownCards.has(idx)
                  ? "bg-primary/50 w-2"
                  : unknownCards.has(idx)
                  ? "bg-secondary/50 w-2"
                  : "bg-muted w-2"
              }`}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>
        
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 hover-scale"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Reset Button */}
      <div className="text-center pt-4">
        <Button onClick={resetProgress} variant="ghost" size="sm" className="text-muted-foreground">
          Reset Progress
        </Button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, RotateCcw, Trophy, Star } from 'lucide-react';
import { toast } from 'sonner';

type MemoryCard = {
  id: number;
  emoji: string;
  label: string;
  flipped: boolean;
  matched: boolean;
};

export function MemoryMatch() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const cardPairs = [
    { emoji: "🦁", label: "Lion" },
    { emoji: "🐉", label: "Dragon" },
    { emoji: "👑", label: "Crown" },
    { emoji: "🏰", label: "Castle" },
    { emoji: "🎭", label: "Theater" },
    { emoji: "📚", label: "Books" },
    { emoji: "🌟", label: "Star" },
    { emoji: "🎨", label: "Art" },
  ];

  const initializeGame = () => {
    const doubled = [...cardPairs, ...cardPairs];
    const shuffled = doubled
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        id: index,
        emoji: card.emoji,
        label: card.label,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matches === cardPairs.length && matches > 0) {
      setGameWon(true);
      toast.success(`🎉 You won in ${moves} moves!`);
    }
  }, [matches]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === first || card.id === second
              ? { ...card, matched: true, flipped: false }
              : card
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
          toast.success("✨ Match found!");
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === first || card.id === second
              ? { ...card, flipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(moves + 1);
    }
  }, [flippedCards]);

  const handleCardClick = (id: number) => {
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched || flippedCards.length >= 2) {
      return;
    }

    setCards(cards.map(c => c.id === id ? { ...c, flipped: true } : c));
    setFlippedCards([...flippedCards, id]);
  };

  const getStarRating = () => {
    if (moves <= 16) return 3;
    if (moves <= 24) return 2;
    return 1;
  };

  return (
    <div className="story-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-kids-purple flex items-center gap-2">
          <Brain className="w-7 h-7" />
          Memory Match
        </h3>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-kids-blue/20 rounded-lg">
            <span className="font-bold text-kids-blue">Moves: {moves}</span>
          </div>
          <div className="px-4 py-2 bg-kids-green/20 rounded-lg">
            <span className="font-bold text-kids-green">Matches: {matches}/{cardPairs.length}</span>
          </div>
          <Button
            onClick={initializeGame}
            variant="outline"
            size="sm"
            className="border-kids-purple text-kids-purple hover:bg-kids-purple/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              aspect-square cursor-pointer flex items-center justify-center text-5xl
              transition-all duration-300 transform hover:scale-105
              ${card.flipped || card.matched 
                ? 'bg-gradient-to-br from-kids-purple/20 to-kids-blue/20 border-2 border-kids-purple' 
                : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-300'
              }
              ${card.matched ? 'opacity-50' : ''}
            `}
          >
            {(card.flipped || card.matched) ? card.emoji : '❓'}
          </Card>
        ))}
      </div>

      {gameWon && (
        <div className="p-6 bg-gradient-to-r from-kids-yellow/20 to-kids-orange/20 rounded-lg border-2 border-kids-yellow text-center space-y-3">
          <Trophy className="w-16 h-16 mx-auto text-kids-yellow" />
          <div>
            <p className="text-2xl font-bold text-kids-purple mb-2">
              🎉 Congratulations!
            </p>
            <p className="text-gray-700">
              You completed the game in {moves} moves!
            </p>
            <div className="flex justify-center gap-1 mt-3">
              {Array.from({ length: getStarRating() }).map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-kids-yellow text-kids-yellow" />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-kids-blue/10 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          💡 Flip two cards at a time to find matching pairs. Try to remember where each emoji is!
        </p>
      </div>
    </div>
  );
}

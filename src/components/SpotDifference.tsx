import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, RotateCcw, Trophy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

type Difference = {
  id: number;
  x: number;
  y: number;
  found: boolean;
};

export function SpotDifference() {
  const [differences] = useState<Difference[]>([
    { id: 1, x: 20, y: 15, found: false },
    { id: 2, x: 45, y: 35, found: false },
    { id: 3, x: 70, y: 25, found: false },
    { id: 4, x: 30, y: 60, found: false },
    { id: 5, x: 80, y: 70, found: false },
  ]);

  const [foundDifferences, setFoundDifferences] = useState<number[]>([]);
  const [clicks, setClicks] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const scenes = [
    {
      title: "Magical Castle",
      emoji1: "🏰",
      emoji2: "🏰",
      background: "from-kids-purple/20 to-kids-blue/20"
    }
  ];

  const currentScene = scenes[0];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, imageNumber: number) => {
    if (gameWon) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setClicks(clicks + 1);

    // Check if click is near any unfound difference (within 10% radius)
    const foundDiff = differences.find(
      diff => 
        !foundDifferences.includes(diff.id) &&
        Math.abs(diff.x - x) < 10 &&
        Math.abs(diff.y - y) < 10
    );

    if (foundDiff) {
      const newFound = [...foundDifferences, foundDiff.id];
      setFoundDifferences(newFound);
      toast.success(`✨ Found ${newFound.length}/${differences.length}!`);

      if (newFound.length === differences.length) {
        setGameWon(true);
        toast.success(`🎉 You found all differences in ${clicks + 1} clicks!`);
      }
    }
  };

  const resetGame = () => {
    setFoundDifferences([]);
    setClicks(0);
    setGameWon(false);
    toast.info("New game started!");
  };

  const renderImage = (imageNumber: number) => (
    <div
      onClick={(e) => handleClick(e, imageNumber)}
      className={`
        relative w-full aspect-square rounded-lg cursor-crosshair
        bg-gradient-to-br ${currentScene.background}
        border-4 border-kids-purple/30 hover:border-kids-purple/50 transition-all
        flex items-center justify-center overflow-hidden
      `}
    >
      {/* Decorative emojis as "scene" */}
      <div className="text-8xl">{imageNumber === 1 ? currentScene.emoji1 : currentScene.emoji2}</div>
      
      {/* Scattered decorative elements */}
      <div className="absolute top-10 left-10 text-4xl">🌟</div>
      <div className="absolute top-20 right-15 text-3xl">✨</div>
      <div className="absolute bottom-20 left-20 text-4xl">🎨</div>
      <div className="absolute bottom-10 right-10 text-3xl">🌈</div>
      <div className="absolute top-1/2 left-10 text-2xl">🦋</div>
      
      {/* Show found differences on both images */}
      {differences.map(diff => (
        foundDifferences.includes(diff.id) && (
          <div
            key={diff.id}
            className="absolute w-12 h-12 border-4 border-kids-green rounded-full animate-pulse"
            style={{
              left: `${diff.x}%`,
              top: `${diff.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CheckCircle className="w-full h-full text-kids-green fill-white" />
          </div>
        )
      ))}
    </div>
  );

  return (
    <div className="story-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-kids-purple flex items-center gap-2">
          <Eye className="w-7 h-7" />
          Spot the Difference
        </h3>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-kids-green/20 rounded-lg">
            <span className="font-bold text-kids-green">
              Found: {foundDifferences.length}/{differences.length}
            </span>
          </div>
          <div className="px-4 py-2 bg-kids-blue/20 rounded-lg">
            <span className="font-bold text-kids-blue">Clicks: {clicks}</span>
          </div>
          <Button
            onClick={resetGame}
            variant="outline"
            size="sm"
            className="border-kids-purple text-kids-purple hover:bg-kids-purple/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-center text-gray-600">
          Find {differences.length} differences between these two pictures! Click on the spots where you see differences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-center font-semibold text-kids-purple mb-2">Picture 1</p>
          {renderImage(1)}
        </div>
        <div>
          <p className="text-center font-semibold text-kids-blue mb-2">Picture 2</p>
          {renderImage(2)}
        </div>
      </div>

      {gameWon && (
        <div className="p-6 bg-gradient-to-r from-kids-yellow/20 to-kids-orange/20 rounded-lg border-2 border-kids-yellow text-center space-y-3">
          <Trophy className="w-16 h-16 mx-auto text-kids-yellow" />
          <div>
            <p className="text-2xl font-bold text-kids-purple mb-2">
              🎉 Amazing Detective Work!
            </p>
            <p className="text-gray-700">
              You found all {differences.length} differences in just {clicks} clicks!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {clicks <= differences.length + 3 
                ? "⭐⭐⭐ Perfect score!" 
                : clicks <= differences.length + 8 
                ? "⭐⭐ Great job!" 
                : "⭐ Keep practicing!"}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-kids-blue/10 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          💡 Hint: Look carefully at all parts of both pictures. The differences might be subtle!
        </p>
      </div>
    </div>
  );
}

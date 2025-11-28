import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shuffle, Check, X, Trophy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

type WordScrambleProps = {
  storyText?: string;
};

export function WordScramble({ storyText }: WordScrambleProps) {
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  const extractWords = (text: string): string[] => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length >= 4 && word.length <= 10);
    return [...new Set(words)];
  };

  const scrambleWord = (word: string): string => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const scrambled = arr.join('');
    return scrambled === word ? scrambleWord(word) : scrambled;
  };

  const getNewWord = () => {
    const words = extractWords(storyText || "adventure magical forest brave dragon princess castle treasure quest");
    const availableWords = words.filter(w => !usedWords.includes(w));
    
    if (availableWords.length === 0) {
      setUsedWords([]);
      return words[Math.floor(Math.random() * words.length)];
    }
    
    const word = availableWords[Math.floor(Math.random() * availableWords.length)];
    setUsedWords([...usedWords, word]);
    return word;
  };

  const loadNewWord = () => {
    const word = getNewWord();
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserGuess("");
    setShowHint(false);
  };

  useEffect(() => {
    loadNewWord();
  }, []);

  const checkAnswer = () => {
    if (userGuess.toLowerCase() === currentWord) {
      setScore(score + 10);
      setAttempts(attempts + 1);
      toast.success("🎉 Correct! +10 points");
      setTimeout(loadNewWord, 1500);
    } else {
      toast.error("❌ Not quite! Try again");
    }
  };

  const skipWord = () => {
    setAttempts(attempts + 1);
    toast.info(`The word was: ${currentWord}`);
    setTimeout(loadNewWord, 2000);
  };

  const reset = () => {
    setScore(0);
    setAttempts(0);
    setUsedWords([]);
    loadNewWord();
  };

  return (
    <div className="story-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-kids-purple flex items-center gap-2">
          <Shuffle className="w-7 h-7" />
          Word Scramble
        </h3>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-kids-yellow/20 rounded-lg">
            <span className="font-bold text-kids-purple">Score: {score}</span>
          </div>
          <div className="px-4 py-2 bg-kids-blue/20 rounded-lg">
            <span className="font-bold text-kids-blue">Round: {attempts + 1}</span>
          </div>
        </div>
      </div>

      <Card className="p-8 bg-gradient-to-br from-kids-purple/5 to-kids-blue/5 border-2 border-kids-purple/30">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-lg text-gray-600">Unscramble this word:</p>
            <div className="text-5xl font-bold text-kids-purple tracking-widest">
              {scrambledWord.toUpperCase()}
            </div>
            <p className="text-sm text-gray-500">
              ({currentWord.length} letters)
            </p>
          </div>

          {showHint && (
            <div className="p-4 bg-kids-yellow/20 rounded-lg">
              <p className="text-sm text-gray-700">
                💡 Hint: The word starts with "{currentWord.charAt(0).toUpperCase()}"
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Input
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Type your answer..."
              className="text-center text-2xl py-6 border-2 border-kids-purple/30 focus:border-kids-purple"
            />

            <div className="flex gap-3 justify-center flex-wrap">
              <Button
                onClick={checkAnswer}
                disabled={!userGuess}
                className="bg-gradient-to-r from-kids-green to-kids-blue text-white px-8"
              >
                <Check className="w-5 h-5 mr-2" />
                Check Answer
              </Button>
              
              <Button
                onClick={() => setShowHint(true)}
                variant="outline"
                className="border-kids-yellow text-kids-yellow hover:bg-kids-yellow/10"
              >
                💡 Show Hint
              </Button>
              
              <Button
                onClick={skipWord}
                variant="outline"
                className="border-kids-orange text-kids-orange hover:bg-kids-orange/10"
              >
                <X className="w-5 h-5 mr-2" />
                Skip
              </Button>
              
              <Button
                onClick={reset}
                variant="outline"
                className="border-kids-purple text-kids-purple hover:bg-kids-purple/10"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                New Game
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {score >= 50 && (
        <div className="mt-6 p-6 bg-gradient-to-r from-kids-yellow/20 to-kids-orange/20 rounded-lg border-2 border-kids-yellow text-center">
          <Trophy className="w-12 h-12 mx-auto mb-3 text-kids-yellow" />
          <p className="text-xl font-bold text-kids-purple">
            🎉 Word Master! You've earned {score} points!
          </p>
        </div>
      )}
    </div>
  );
}

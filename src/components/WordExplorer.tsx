import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BookMarked, Lightbulb } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type WordExplorerProps = {
  storyText: string;
};

type WordDefinition = {
  word: string;
  definition: string;
  example: string;
};

export function WordExplorer({ storyText }: WordExplorerProps) {
  const [selectedWord, setSelectedWord] = useState<WordDefinition | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Simple word definitions dictionary (in real app, could use dictionary API)
  const wordDefinitions: Record<string, WordDefinition> = {
    magical: {
      word: "magical",
      definition: "Having special powers or qualities that seem impossible",
      example: "The fairy waved her magical wand."
    },
    adventure: {
      word: "adventure",
      definition: "An exciting or unusual experience",
      example: "They went on an amazing adventure in the forest."
    },
    brave: {
      word: "brave",
      definition: "Ready to face danger or pain; showing courage",
      example: "The brave knight fought the dragon."
    },
    friendship: {
      word: "friendship",
      definition: "A relationship between friends",
      example: "Their friendship grew stronger every day."
    },
    mysterious: {
      word: "mysterious",
      definition: "Difficult to understand or explain; strange",
      example: "A mysterious door appeared in the wall."
    },
    imagination: {
      word: "imagination",
      definition: "The ability to form pictures in your mind",
      example: "Use your imagination to create stories."
    }
  };

  const handleWordClick = (word: string) => {
    const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
    if (wordDefinitions[cleanWord]) {
      setSelectedWord(wordDefinitions[cleanWord]);
      setShowDialog(true);
    }
  };

  const renderInteractiveStory = () => {
    const words = storyText.split(' ');
    return words.map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
      const isClickable = wordDefinitions[cleanWord];
      
      return (
        <span key={index}>
          <span
            onClick={() => isClickable && handleWordClick(word)}
            className={isClickable ? 'cursor-pointer underline decoration-dotted decoration-kids-blue hover:text-kids-blue transition-colors' : ''}
          >
            {word}
          </span>
          {' '}
        </span>
      );
    });
  };

  return (
    <div className="story-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookMarked className="w-5 h-5 text-kids-purple" />
        <h3 className="text-lg font-bold text-kids-purple">
          Word Explorer
        </h3>
        <div className="ml-auto">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Lightbulb className="w-4 h-4" />
            Click underlined words to learn!
          </div>
        </div>
      </div>

      <div className="prose max-w-none text-base leading-relaxed">
        {renderInteractiveStory()}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-kids-purple flex items-center gap-2">
              <BookMarked className="w-5 h-5" />
              Word Definition
            </DialogTitle>
          </DialogHeader>
          {selectedWord && (
            <div className="space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-kids-blue mb-2">
                  {selectedWord.word}
                </h4>
                <p className="text-gray-700 text-lg">
                  {selectedWord.definition}
                </p>
              </div>
              
              <div className="bg-kids-purple/5 p-4 rounded-lg border-l-4 border-kids-purple">
                <p className="text-sm font-semibold text-kids-purple mb-1">
                  Example:
                </p>
                <p className="text-gray-700 italic">
                  "{selectedWord.example}"
                </p>
              </div>

              <Button
                onClick={() => setShowDialog(false)}
                className="w-full bg-gradient-to-r from-kids-purple to-kids-blue text-white"
              >
                Got it!
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
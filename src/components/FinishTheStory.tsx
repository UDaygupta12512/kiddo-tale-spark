
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type FinishTheStoryProps = {
  storyText: string;
};

export function FinishTheStory({ storyText }: FinishTheStoryProps) {
  const [userEnding, setUserEnding] = useState('');
  const [showCompletion, setShowCompletion] = useState(false);

  // Extract first part of story for the prompt
  const getStoryPrompt = () => {
    if (!storyText) return '';
    const sentences = storyText.split('. ');
    const promptSentences = sentences.slice(0, Math.ceil(sentences.length * 0.6));
    return promptSentences.join('. ') + (promptSentences.length > 0 ? '...' : '');
  };

  const handleSubmit = () => {
    if (userEnding.trim()) {
      setShowCompletion(true);
    }
  };

  const resetGame = () => {
    setUserEnding('');
    setShowCompletion(false);
  };

  if (!storyText) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Generate a story first to play "Finish the Story"!
          </p>
        </CardContent>
      </Card>
    );
  }

  if (showCompletion) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-kids-purple">Your Story is Complete! 📖</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-kids-yellow/20 p-4 rounded-lg">
            <h4 className="font-semibold text-kids-purple mb-2">Story Beginning:</h4>
            <p className="text-gray-700">{getStoryPrompt()}</p>
          </div>
          
          <div className="bg-kids-blue/20 p-4 rounded-lg">
            <h4 className="font-semibold text-kids-blue mb-2">Your Ending:</h4>
            <p className="text-gray-700">{userEnding}</p>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-lg text-kids-purple font-semibold">
              🌟 Amazing creativity! What a wonderful ending! 🌟
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={resetGame} variant="outline">
                Try Another Ending
              </Button>
              <Button 
                onClick={() => {
                  const fullStory = getStoryPrompt() + ' ' + userEnding;
                  navigator.clipboard.writeText(fullStory);
                }}
                className="bg-kids-green hover:bg-kids-green/90"
              >
                Copy Full Story
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-kids-purple">Finish the Story! ✍️</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-kids-yellow/20 p-4 rounded-lg">
          <h4 className="font-semibold text-kids-purple mb-2">Story So Far:</h4>
          <p className="text-gray-700">{getStoryPrompt()}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-kids-blue mb-2">Now You Continue:</h4>
          <Textarea
            value={userEnding}
            onChange={(e) => setUserEnding(e.target.value)}
            placeholder="How do you think the story should end? Be creative and write your own ending!"
            className="min-h-32 border-kids-blue/30 focus:border-kids-blue"
            rows={4}
          />
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={!userEnding.trim()}
          className="w-full bg-kids-blue hover:bg-kids-blue/90"
        >
          Complete the Story!
        </Button>
        
        <div className="text-center text-sm text-gray-600">
          💡 Tip: Think about what the characters learned or how they solved their problem!
        </div>
      </CardContent>
    </Card>
  );
}

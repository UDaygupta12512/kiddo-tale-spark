import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const rhymes = [
  {
    title: "Twinkle, Twinkle, Little Star",
    text: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.\nTwinkle, twinkle, little star,\nHow I wonder what you are!",
    theme: "stars",
  },
  {
    title: "Humpty Dumpty",
    text: "Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king's horses and all the king's men,\nCouldn't put Humpty together again.",
    theme: "adventure",
  },
  {
    title: "Little Miss Muffet",
    text: "Little Miss Muffet sat on a tuffet,\nEating her curds and whey.\nAlong came a spider,\nWho sat down beside her,\nAnd frightened Miss Muffet away!",
    theme: "funny",
  },
  {
    title: "Jack and Jill",
    text: "Jack and Jill went up the hill,\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after.",
    theme: "adventure",
  },
  {
    title: "Hickory Dickory Dock",
    text: "Hickory dickory dock,\nThe mouse ran up the clock.\nThe clock struck one,\nThe mouse ran down,\nHickory dickory dock.",
    theme: "animals",
  },
  {
    title: "Mary Had a Little Lamb",
    text: "Mary had a little lamb,\nLittle lamb, little lamb,\nMary had a little lamb,\nIts fleece was white as snow.\nAnd everywhere that Mary went,\nMary went, Mary went,\nEverywhere that Mary went,\nThe lamb was sure to go.",
    theme: "animals",
  },
];

export function Rhymes() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  const handlePlay = (index: number) => {
    // Stop any current playback
    if (utterance) {
      window.speechSynthesis.cancel();
    }

    if (playingIndex === index) {
      // If clicking the same rhyme, stop it
      setPlayingIndex(null);
      setUtterance(null);
      return;
    }

    // Create new utterance
    const newUtterance = new SpeechSynthesisUtterance(rhymes[index].text);
    newUtterance.rate = 0.8; // Slower for kids
    newUtterance.pitch = 1.2; // Slightly higher pitch
    newUtterance.volume = 1;

    newUtterance.onend = () => {
      setPlayingIndex(null);
      setUtterance(null);
    };

    newUtterance.onerror = () => {
      toast({
        title: "Error",
        description: "Unable to play rhyme. Please try again.",
        variant: "destructive",
      });
      setPlayingIndex(null);
      setUtterance(null);
    };

    setUtterance(newUtterance);
    setPlayingIndex(index);
    window.speechSynthesis.speak(newUtterance);
  };

  const handleStop = () => {
    if (utterance) {
      window.speechSynthesis.cancel();
      setPlayingIndex(null);
      setUtterance(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-kids-orange to-kids-green bg-clip-text text-transparent">
          Fun Rhymes & Songs
        </h3>
        <p className="text-muted-foreground">Click the play button to listen!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rhymes.map((rhyme, index) => (
          <Card
            key={index}
            className={`p-6 transition-all duration-300 hover:shadow-lg ${
              playingIndex === index
                ? "ring-2 ring-kids-orange shadow-lg scale-105"
                : ""
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-kids-purple mb-1">
                  {rhyme.title}
                </h4>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-kids-blue/10 text-kids-blue">
                  {rhyme.theme}
                </span>
              </div>
              <Button
                onClick={() => handlePlay(index)}
                size="icon"
                className={`rounded-full ${
                  playingIndex === index
                    ? "bg-kids-orange hover:bg-kids-orange/90"
                    : "bg-kids-purple hover:bg-kids-purple/90"
                }`}
              >
                {playingIndex === index ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {rhyme.text}
              </p>
            </div>

            {playingIndex === index && (
              <div className="mt-4 flex items-center gap-2 text-sm text-kids-orange animate-pulse">
                <Volume2 className="w-4 h-4" />
                <span>Now playing...</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      {playingIndex !== null && (
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={handleStop}
            variant="destructive"
            size="lg"
            className="rounded-full shadow-lg"
          >
            Stop All
          </Button>
        </div>
      )}
    </div>
  );
}

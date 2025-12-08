import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, BookOpen, Star, Clock } from 'lucide-react';
import { toast } from 'sonner';

const audioStories = [
  {
    id: 1,
    title: "The Magic Garden",
    category: "Fairy Tale",
    duration: "5 min",
    level: "Beginner",
    emoji: "🌸",
    description: "A little girl discovers a magical garden where flowers can talk.",
    story: "Once upon a time, in a small village, there lived a curious little girl named Lily. One sunny morning, she found a hidden path behind her grandmother's house. The path led to the most beautiful garden she had ever seen! The roses were red, the tulips were yellow, and the daisies danced in the wind. But wait! Did that sunflower just say hello? Lily couldn't believe her ears! The flowers could talk! They told her stories of faraway lands and taught her the names of all the butterflies. From that day on, Lily visited her magical friends every day, and they lived happily ever after."
  },
  {
    id: 2,
    title: "The Brave Little Star",
    category: "Adventure",
    duration: "4 min",
    level: "Beginner",
    emoji: "⭐",
    description: "A small star learns to shine bright and help others.",
    story: "High up in the night sky, there was a tiny star named Twinkle. Twinkle was the smallest star in the whole galaxy. He felt sad because he thought he wasn't bright enough. One night, a little boy on Earth was lost in the forest. He looked up and saw Twinkle trying his best to shine. The boy followed Twinkle's light and found his way home! Twinkle learned that even the smallest star can make a big difference. Now he shines the brightest because he knows his light matters."
  },
  {
    id: 3,
    title: "The Friendly Dragon",
    category: "Fantasy",
    duration: "6 min",
    level: "Intermediate",
    emoji: "🐉",
    description: "A dragon who loves making cupcakes instead of breathing fire.",
    story: "In the mountains far away, there lived a dragon named Sparkle. But Sparkle was different from other dragons. Instead of breathing fire, she breathed rainbow sprinkles! All the other dragons laughed at her. One day, the village needed help for a big celebration. Sparkle flew down and used her sprinkles to decorate the most beautiful cupcakes anyone had ever seen! The villagers cheered and the other dragons felt sorry for laughing. Sparkle became the official party dragon, and everyone loved her colorful gifts!"
  },
  {
    id: 4,
    title: "Ocean Friends",
    category: "Nature",
    duration: "5 min",
    level: "Beginner",
    emoji: "🐬",
    description: "A dolphin teaches a fish about friendship and teamwork.",
    story: "Deep in the blue ocean, a little fish named Finn felt lonely. He wanted to swim fast like the dolphins but couldn't keep up. One day, a kind dolphin named Delphi saw Finn swimming alone. Delphi said, 'Would you like to be my friend?' Finn was so happy! Delphi taught Finn that being fast isn't everything. What matters is having friends who care about you. Together, they explored coral reefs, played with seahorses, and had the best adventures ever!"
  },
  {
    id: 5,
    title: "The Counting Caterpillar",
    category: "Educational",
    duration: "4 min",
    level: "Beginner",
    emoji: "🐛",
    description: "Learn numbers with a hungry caterpillar on a counting adventure.",
    story: "There was a very hungry caterpillar named Charlie. On Monday, he ate one apple. On Tuesday, he ate two oranges. On Wednesday, he ate three strawberries. On Thursday, he ate four grapes. On Friday, he ate five bananas! Can you count with Charlie? One, two, three, four, five! After eating so much, Charlie felt sleepy. He made a cozy cocoon and when he woke up, he had become a beautiful butterfly with wings of every color!"
  },
  {
    id: 6,
    title: "The Kindness Kingdom",
    category: "Moral Story",
    duration: "7 min",
    level: "Intermediate",
    emoji: "👑",
    description: "A princess learns that kindness is the greatest treasure.",
    story: "Princess Emma had everything - a golden crown, a big castle, and lots of toys. But she wasn't happy. One day, she met a poor girl named Rose who had nothing but a big smile. Rose shared her last piece of bread with a hungry bird. Emma asked, 'Why did you do that?' Rose said, 'Kindness makes my heart happy!' Emma tried being kind too. She shared her toys, helped the gardeners, and smiled at everyone. Soon, the whole kingdom was full of happy people. Emma learned that kindness is worth more than any treasure!"
  }
];

export function AudioStories() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [selectedStory, setSelectedStory] = useState<typeof audioStories[0] | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const handlePlay = (story: typeof audioStories[0]) => {
    if ('speechSynthesis' in window) {
      if (playingId === story.id && utterance) {
        window.speechSynthesis.cancel();
        setPlayingId(null);
        setUtterance(null);
        return;
      }

      window.speechSynthesis.cancel();
      
      const newUtterance = new SpeechSynthesisUtterance(story.story);
      newUtterance.rate = 0.85;
      newUtterance.pitch = 1.1;
      
      newUtterance.onend = () => {
        setPlayingId(null);
        setUtterance(null);
        toast.success("Story finished! 🎉");
      };

      newUtterance.onerror = () => {
        setPlayingId(null);
        setUtterance(null);
        toast.error("Error playing story");
      };

      setUtterance(newUtterance);
      setPlayingId(story.id);
      window.speechSynthesis.speak(newUtterance);
      toast.success(`Now playing: ${story.title}`);
    } else {
      toast.error("Audio not supported in your browser");
    }
  };

  const handleViewStory = (story: typeof audioStories[0]) => {
    setSelectedStory(story);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4 p-6 bg-gradient-to-r from-kids-purple/20 via-kids-pink/20 to-kids-blue/20 rounded-3xl">
        <div className="text-6xl animate-bounce-slow">📚🎧</div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-kids-purple to-kids-blue bg-clip-text text-transparent">
          Discover the Magic of English through Stories!
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Let your child explore a world of imagination with interactive audio tales. 
          From fairy tales to fun adventures, each story helps build listening and speaking skills 
          while keeping learning exciting and effortless. Tune in, listen, and learn English the fun way!
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {audioStories.map((story) => (
          <Card 
            key={story.id} 
            className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-kids-purple/50 overflow-hidden"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  {story.emoji}
                </div>
                <Badge className={getLevelColor(story.level)}>{story.level}</Badge>
              </div>
              <CardTitle className="text-lg mt-2">{story.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {story.category}
                </Badge>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {story.duration}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {story.description}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handlePlay(story)}
                  className={`flex-1 ${
                    playingId === story.id 
                      ? 'bg-kids-orange hover:bg-kids-orange/90' 
                      : 'bg-gradient-to-r from-kids-purple to-kids-blue'
                  }`}
                  size="sm"
                >
                  {playingId === story.id ? (
                    <>
                      <Pause className="w-4 h-4 mr-1" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" />
                      Listen
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => handleViewStory(story)}
                  variant="outline"
                  size="sm"
                  className="border-kids-purple/30 hover:bg-kids-purple/10"
                >
                  <BookOpen className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedStory.emoji}</span>
                  <div>
                    <CardTitle>{selectedStory.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{selectedStory.category}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedStory(null)}
                  className="text-xl"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {selectedStory.story}
              </p>
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={() => handlePlay(selectedStory)}
                  className="flex-1 bg-gradient-to-r from-kids-purple to-kids-blue"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  {playingId === selectedStory.id ? "Stop Reading" : "Read Aloud"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

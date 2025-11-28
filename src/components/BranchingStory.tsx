import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

type Choice = {
  text: string;
  nextScene: number;
};

type Scene = {
  id: number;
  text: string;
  choices: Choice[];
  isEnding?: boolean;
};

type BranchingStoryProps = {
  theme?: string;
};

export function BranchingStory({ theme = "adventure" }: BranchingStoryProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [storyPath, setStoryPath] = useState<number[]>([0]);
  const [points, setPoints] = useState(0);

  // Pre-defined branching story structure
  const getStoryScenes = (): Scene[] => {
    const themeScenes: Record<string, Scene[]> = {
      adventure: [
        {
          id: 0,
          text: "You stand at the entrance of a mysterious cave. Strange sounds echo from within. A worn map in your hand shows two possible paths - one leads through the dark cave, the other around the mountain.",
          choices: [
            { text: "Enter the cave bravely 🦁", nextScene: 1 },
            { text: "Take the safer mountain path 🏔️", nextScene: 2 }
          ]
        },
        {
          id: 1,
          text: "Inside the cave, you discover glowing crystals lighting your way! You find a treasure chest, but hear footsteps approaching.",
          choices: [
            { text: "Hide behind the crystals 💎", nextScene: 3 },
            { text: "Open the treasure chest quickly 📦", nextScene: 4 }
          ]
        },
        {
          id: 2,
          text: "The mountain path leads you to a friendly village. The villagers tell you about a secret passage that leads to the same treasure!",
          choices: [
            { text: "Follow the secret passage 🗝️", nextScene: 5 },
            { text: "Stay and learn from the villagers 📚", nextScene: 6 }
          ]
        },
        {
          id: 3,
          text: "You hide just in time! A friendly dragon appears, impressed by your cleverness. The dragon offers to share the treasure with you!",
          choices: [],
          isEnding: true
        },
        {
          id: 4,
          text: "The chest opens to reveal magical artifacts! You've found the legendary treasure, and gain wisdom about taking calculated risks.",
          choices: [],
          isEnding: true
        },
        {
          id: 5,
          text: "The secret passage leads to an underground garden filled with rare treasures. Your patience and trust in others has been rewarded!",
          choices: [],
          isEnding: true
        },
        {
          id: 6,
          text: "The villagers teach you valuable skills and give you gifts. Sometimes the real treasure is the friends we make along the way!",
          choices: [],
          isEnding: true
        }
      ],
      fantasy: [
        {
          id: 0,
          text: "A magical fairy appears before you with a glowing wand. 'I can grant you one wish,' she says, 'but choose wisely!'",
          choices: [
            { text: "Wish for magical powers ✨", nextScene: 1 },
            { text: "Wish to help others 💝", nextScene: 2 }
          ]
        },
        {
          id: 1,
          text: "You gain the power to talk to animals! A wise owl tells you about a spell book hidden in the enchanted forest.",
          choices: [
            { text: "Search for the spell book 📖", nextScene: 3 },
            { text: "Use your powers to help forest animals 🦉", nextScene: 4 }
          ]
        },
        {
          id: 2,
          text: "The fairy is touched by your kindness! She makes you a guardian of the magical realm, protecting all who need help.",
          choices: [
            { text: "Accept the responsibility 🛡️", nextScene: 5 },
            { text: "Ask for wisdom to help others better 🌟", nextScene: 6 }
          ]
        },
        {
          id: 3,
          text: "You find the ancient spell book! With great power comes great responsibility. You use it to bring harmony to the magical world.",
          choices: [],
          isEnding: true
        },
        {
          id: 4,
          text: "By helping the animals, you discover they hold the greatest magic of all - friendship and kindness. You become a beloved hero!",
          choices: [],
          isEnding: true
        },
        {
          id: 5,
          text: "As a guardian, you protect the realm with courage. Your selfless choice has made the magical world a safer place for everyone!",
          choices: [],
          isEnding: true
        },
        {
          id: 6,
          text: "The fairy grants you eternal wisdom. You become the wisest helper in the land, guiding others with your knowledge and heart.",
          choices: [],
          isEnding: true
        }
      ],
      friendship: [
        {
          id: 0,
          text: "Your best friend seems sad today. You notice they're sitting alone at lunch, not eating their favorite sandwich.",
          choices: [
            { text: "Sit with them and ask what's wrong 💬", nextScene: 1 },
            { text: "Give them space but watch from nearby 👀", nextScene: 2 }
          ]
        },
        {
          id: 1,
          text: "Your friend opens up! They're worried about a test tomorrow. You remember you studied that subject well.",
          choices: [
            { text: "Offer to study together after school 📚", nextScene: 3 },
            { text: "Share your notes and tips 📝", nextScene: 4 }
          ]
        },
        {
          id: 2,
          text: "You notice them tearing up. Sometimes being nearby is enough. They eventually come to you for a hug.",
          choices: [
            { text: "Give them a big hug 🤗", nextScene: 5 },
            { text: "Offer to do something fun together 🎨", nextScene: 6 }
          ]
        },
        {
          id: 3,
          text: "You study together all afternoon! Your friend aces the test and your friendship grows even stronger. Helping friends helps everyone!",
          choices: [],
          isEnding: true
        },
        {
          id: 4,
          text: "Your friend is so grateful for your notes! They feel confident now. You've learned that sharing knowledge spreads happiness!",
          choices: [],
          isEnding: true
        },
        {
          id: 5,
          text: "Sometimes all we need is a hug! Your friend feels better and thanks you for always being there. True friendship means being present!",
          choices: [],
          isEnding: true
        },
        {
          id: 6,
          text: "You spend the day doing fun activities together! Laughter is the best medicine. Your friend's smile returns, and so does yours!",
          choices: [],
          isEnding: true
        }
      ]
    };

    return themeScenes[theme] || themeScenes.adventure;
  };

  const scenes = getStoryScenes();
  const scene = scenes[currentScene];

  const makeChoice = (choice: Choice) => {
    setCurrentScene(choice.nextScene);
    setStoryPath([...storyPath, choice.nextScene]);
    setPoints(points + 10);
    toast.success("Great choice! +10 points");
  };

  const restart = () => {
    setCurrentScene(0);
    setStoryPath([0]);
    setPoints(0);
    toast.info("Story restarted!");
  };

  return (
    <div className="story-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-kids-purple flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          Interactive Story Adventure
        </h3>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-kids-yellow/20 rounded-lg">
            <span className="font-bold text-kids-purple">{points} Points</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={restart}
            className="border-kids-orange text-kids-orange hover:bg-kids-orange/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>
      </div>

      {/* Story Progress */}
      <div className="mb-6 flex gap-2">
        {storyPath.map((sceneId, idx) => (
          <div
            key={idx}
            className="h-2 flex-1 bg-gradient-to-r from-kids-purple to-kids-blue rounded-full"
          />
        ))}
        {Array.from({ length: 4 - storyPath.length }).map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="h-2 flex-1 bg-gray-200 rounded-full"
          />
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-br from-kids-purple/5 to-kids-blue/5 border-2 border-kids-purple/20">
        <p className="text-lg leading-relaxed mb-6 text-gray-700">
          {scene.text}
        </p>

        {scene.isEnding ? (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-kids-green/20 to-kids-blue/20 rounded-lg border-2 border-kids-green">
              <p className="font-bold text-kids-green text-center text-xl">
                🎉 The End! 🎉
              </p>
              <p className="text-center mt-2 text-gray-700">
                You earned {points} points on this adventure!
              </p>
            </div>
            <Button
              onClick={restart}
              className="w-full bg-gradient-to-r from-kids-purple to-kids-blue text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try a Different Path
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="font-semibold text-kids-purple mb-3">What will you do?</p>
            {scene.choices.map((choice, idx) => (
              <Button
                key={idx}
                onClick={() => makeChoice(choice)}
                className="w-full justify-between bg-white hover:bg-kids-purple/10 text-kids-purple border-2 border-kids-purple/30 transition-all"
                variant="outline"
              >
                <span>{choice.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ))}
          </div>
        )}
      </Card>

      <div className="mt-4 p-4 bg-kids-yellow/10 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          💡 Every choice leads to a different adventure! Try different paths to discover all the endings.
        </p>
      </div>
    </div>
  );
}

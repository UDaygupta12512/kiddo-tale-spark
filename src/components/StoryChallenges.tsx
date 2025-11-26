import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Sparkles, TrendingUp, Award } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  prompt: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "daily" | "weekly";
  expiresAt: Date;
  points: number;
}

const StoryChallenges = () => {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  // Generate challenges based on current date
  const generateDailyChallenges = (): Challenge[] => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    const dailyPrompts = [
      {
        title: "Magical Monday",
        prompt: "Write a story about a character who discovers they have a magical power. What power is it and how do they use it?",
        difficulty: "Easy" as const,
        points: 50
      },
      {
        title: "Transformation Tuesday",
        prompt: "Create a story where the main character transforms into an animal. What animal and what adventures do they have?",
        difficulty: "Medium" as const,
        points: 75
      },
      {
        title: "Wonder Wednesday",
        prompt: "Write about a child who finds a mysterious door that leads to another world. What do they discover?",
        difficulty: "Medium" as const,
        points: 75
      },
      {
        title: "Throwback Thursday",
        prompt: "Tell a story about traveling back in time. Where do you go and who do you meet?",
        difficulty: "Hard" as const,
        points: 100
      },
      {
        title: "Fantasy Friday",
        prompt: "Create a tale about a kingdom where every wish comes true. What happens when someone makes a wish?",
        difficulty: "Medium" as const,
        points: 75
      },
      {
        title: "Space Saturday",
        prompt: "Write about an astronaut kid who discovers a friendly alien. What do they do together?",
        difficulty: "Easy" as const,
        points: 50
      },
      {
        title: "Super Sunday",
        prompt: "Tell a story about a regular person who becomes a superhero for a day. What's their mission?",
        difficulty: "Easy" as const,
        points: 50
      }
    ];

    const todayPrompt = dailyPrompts[dayOfWeek];
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return [{
      id: `daily-${today.toDateString()}`,
      title: todayPrompt.title,
      prompt: todayPrompt.prompt,
      difficulty: todayPrompt.difficulty,
      type: "daily",
      expiresAt: tomorrow,
      points: todayPrompt.points
    }];
  };

  const generateWeeklyChallenges = (): Challenge[] => {
    const today = new Date();
    const weekNumber = Math.floor(today.getDate() / 7);
    
    const weeklyPrompts = [
      {
        title: "Epic Adventure",
        prompt: "Write a multi-chapter story about an epic quest. Include at least 3 different locations and 4 characters.",
        difficulty: "Hard" as const,
        points: 200
      },
      {
        title: "Mystery Master",
        prompt: "Create a mystery story with clues, suspects, and a surprising ending. Make readers guess who did it!",
        difficulty: "Hard" as const,
        points: 200
      },
      {
        title: "Friendship Tale",
        prompt: "Write a heartwarming story about unlikely friends who help each other overcome a big challenge.",
        difficulty: "Medium" as const,
        points: 150
      },
      {
        title: "Time Traveler",
        prompt: "Create a story that spans different time periods. Your character can visit the past, present, and future!",
        difficulty: "Hard" as const,
        points: 200
      }
    ];

    const thisWeekPrompt = weeklyPrompts[weekNumber % weeklyPrompts.length];
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + (7 - today.getDay()));
    nextWeek.setHours(23, 59, 59, 999);

    return [{
      id: `weekly-${Math.floor(today.getTime() / (7 * 24 * 60 * 60 * 1000))}`,
      title: thisWeekPrompt.title,
      prompt: thisWeekPrompt.prompt,
      difficulty: thisWeekPrompt.difficulty,
      type: "weekly",
      expiresAt: nextWeek,
      points: thisWeekPrompt.points
    }];
  };

  const [dailyChallenges] = useState(generateDailyChallenges());
  const [weeklyChallenges] = useState(generateWeeklyChallenges());

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleStartChallenge = (challengeId: string) => {
    // This would typically navigate to the story form with the challenge prompt pre-filled
    console.log('Starting challenge:', challengeId);
  };

  const handleCompleteChallenge = (challengeId: string) => {
    setCompletedChallenges([...completedChallenges, challengeId]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "Hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const renderChallengeCard = (challenge: Challenge) => {
    const isCompleted = completedChallenges.includes(challenge.id);
    
    return (
      <Card key={challenge.id} className={isCompleted ? "opacity-60" : ""}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                {challenge.title}
                {isCompleted && (
                  <Badge variant="secondary" className="ml-2">
                    <Award className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-xs">
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {challenge.points} points
                </span>
              </CardDescription>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {getTimeRemaining(challenge.expiresAt)}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">{challenge.prompt}</p>
          <Button 
            onClick={() => handleStartChallenge(challenge.id)}
            disabled={isCompleted}
            className="w-full"
          >
            {isCompleted ? "Challenge Completed! 🎉" : "Start Challenge"}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Story Challenges
          </CardTitle>
          <CardDescription>
            Complete daily and weekly writing challenges to improve your storytelling skills and earn rewards!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-primary/5">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary">
                  {completedChallenges.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Completed</div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary">
                  {completedChallenges.length * 50}
                </div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary">
                  {Math.floor(completedChallenges.length / 7)}
                </div>
                <div className="text-sm text-muted-foreground">Week Streak</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="daily">Daily Challenges</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Challenges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="space-y-4 mt-6">
              {dailyChallenges.map(renderChallengeCard)}
            </TabsContent>
            
            <TabsContent value="weekly" className="space-y-4 mt-6">
              {weeklyChallenges.map(renderChallengeCard)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryChallenges;

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, Volume2, Star, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { toast } from 'sonner';

type ConversationStep = {
  speaker: 'npc' | 'player';
  text: string;
  options?: string[];
  correctOption?: number;
  feedback?: string;
};

type Scenario = {
  id: number;
  title: string;
  emoji: string;
  category: string;
  difficulty: string;
  description: string;
  conversation: ConversationStep[];
};

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Ordering at a Restaurant",
    emoji: "🍕",
    category: "Daily Life",
    difficulty: "Beginner",
    description: "Practice ordering your favorite food at a restaurant.",
    conversation: [
      { speaker: 'npc', text: "Hello! Welcome to Sunny Café. How can I help you today?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["Hi! I would like to order some food, please.", "Food give me now!", "Maybe later..."],
        correctOption: 0,
        feedback: "Great! 'I would like to' is a polite way to order."
      },
      { speaker: 'npc', text: "Of course! What would you like to have?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["Can I have a pizza and orange juice, please?", "Pizza! Juice!", "I don't know what I want."],
        correctOption: 0,
        feedback: "Perfect! Using 'Can I have' is polite and clear."
      },
      { speaker: 'npc', text: "Excellent choice! Would you like anything else?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["No, thank you. That will be all.", "More more more!", "What do you have?"],
        correctOption: 0,
        feedback: "Wonderful! 'That will be all' is a nice way to finish ordering."
      },
      { speaker: 'npc', text: "Your order will be ready soon. Thank you!" }
    ]
  },
  {
    id: 2,
    title: "Making New Friends",
    emoji: "🤝",
    category: "Social",
    difficulty: "Beginner",
    description: "Learn how to introduce yourself and make friends.",
    conversation: [
      { speaker: 'npc', text: "Hi there! I'm Emma. I'm new to this school." },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["Hello Emma! I'm happy to meet you. My name is Alex.", "Who are you?", "Okay."],
        correctOption: 0,
        feedback: "Excellent! Introducing yourself politely makes a great first impression."
      },
      { speaker: 'npc', text: "Nice to meet you, Alex! What do you like to do for fun?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["I love reading books and playing soccer. What about you?", "Nothing.", "I don't want to tell you."],
        correctOption: 0,
        feedback: "Great job! Asking 'What about you?' shows you're interested in the other person."
      },
      { speaker: 'npc', text: "I love drawing and playing video games! Would you like to play together sometime?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["That sounds like fun! I'd love to.", "Maybe.", "No way!"],
        correctOption: 0,
        feedback: "Perfect! Being enthusiastic helps build friendships."
      },
      { speaker: 'npc', text: "Awesome! See you later, friend!" }
    ]
  },
  {
    id: 3,
    title: "At the Library",
    emoji: "📚",
    category: "Places",
    difficulty: "Beginner",
    description: "Practice asking for help at the library.",
    conversation: [
      { speaker: 'npc', text: "Good morning! Welcome to the library. Can I help you find something?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["Yes, please. I'm looking for books about dinosaurs.", "Where are the books?", "I'm just walking around."],
        correctOption: 0,
        feedback: "Great! Being specific about what you need helps the librarian assist you."
      },
      { speaker: 'npc', text: "Dinosaur books are in the science section. Follow me!" },
      { speaker: 'npc', text: "Here we are! These books are about different types of dinosaurs." },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["Thank you so much! This is exactly what I was looking for.", "Okay.", "I want more books!"],
        correctOption: 0,
        feedback: "Wonderful! Saying 'thank you so much' shows appreciation."
      },
      { speaker: 'npc', text: "You're welcome! Would you like to borrow these books?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["Yes, please. How many books can I borrow?", "Give me all of them!", "I don't have a library card."],
        correctOption: 0,
        feedback: "Perfect! Asking questions politely is important."
      },
      { speaker: 'npc', text: "You can borrow up to 5 books. Have fun reading!" }
    ]
  },
  {
    id: 4,
    title: "Shopping for Clothes",
    emoji: "👕",
    category: "Shopping",
    difficulty: "Intermediate",
    description: "Learn to ask about sizes and colors when shopping.",
    conversation: [
      { speaker: 'npc', text: "Hello! Are you looking for something special today?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["Yes, I'm looking for a blue t-shirt for my birthday.", "I want clothes.", "Just looking."],
        correctOption: 0,
        feedback: "Great! Describing what you want with details helps the shop assistant."
      },
      { speaker: 'npc', text: "We have beautiful blue t-shirts! What size do you need?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["I think I need a medium size. Can I try it on?", "The big one.", "I don't know."],
        correctOption: 0,
        feedback: "Perfect! Asking 'Can I try it on?' is very useful when shopping."
      },
      { speaker: 'npc', text: "Of course! The fitting room is over there." },
      { speaker: 'npc', text: "How does it fit?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["It fits perfectly! How much does it cost?", "It's okay.", "I want a different color now."],
        correctOption: 0,
        feedback: "Excellent! Asking about the price is an important part of shopping."
      },
      { speaker: 'npc', text: "It's $15. Would you like to buy it?" }
    ]
  },
  {
    id: 5,
    title: "Visiting the Doctor",
    emoji: "🏥",
    category: "Health",
    difficulty: "Intermediate",
    description: "Practice explaining how you feel to a doctor.",
    conversation: [
      { speaker: 'npc', text: "Hello! I'm Dr. Smith. What brings you here today?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["Hello, Doctor. I have a headache and feel tired.", "I feel bad.", "My mom told me to come."],
        correctOption: 0,
        feedback: "Good job! Describing your symptoms clearly helps the doctor understand."
      },
      { speaker: 'npc', text: "I see. How long have you been feeling this way?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["I've been feeling like this since yesterday morning.", "A long time.", "I don't remember."],
        correctOption: 0,
        feedback: "Excellent! Being specific about when symptoms started is helpful."
      },
      { speaker: 'npc', text: "Did you get enough sleep last night?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["No, I only slept for a few hours because I was reading.", "No.", "I always sleep late."],
        correctOption: 0,
        feedback: "Great! Explaining the reason helps the doctor give better advice."
      },
      { speaker: 'npc', text: "I think you need more rest. Try to sleep at least 8 hours tonight. Feel better soon!" }
    ]
  },
  {
    id: 6,
    title: "Planning a Birthday Party",
    emoji: "🎂",
    category: "Social",
    difficulty: "Intermediate",
    description: "Practice inviting friends to your birthday party.",
    conversation: [
      { speaker: 'npc', text: "Hey! You look excited about something. What's going on?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["My birthday is next Saturday! I'm having a party and I'd like to invite you.", "It's my birthday.", "Nothing much."],
        correctOption: 0,
        feedback: "Wonderful! That's a great way to invite someone to your party."
      },
      { speaker: 'npc', text: "That sounds amazing! What time does the party start?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["The party starts at 3 o'clock in the afternoon at my house.", "In the afternoon.", "Whenever you want to come."],
        correctOption: 0,
        feedback: "Perfect! Giving specific time and place information is important."
      },
      { speaker: 'npc', text: "Great! Will there be games and cake?" },
      { 
        speaker: 'player', 
        text: "Choose your response:",
        options: ["Yes! We'll play musical chairs and have chocolate cake. It's going to be so much fun!", "Yes, lots of stuff.", "I think so."],
        correctOption: 0,
        feedback: "Excellent! Sharing details makes the invitation more exciting!"
      },
      { speaker: 'npc', text: "I can't wait! I'll definitely be there. Thank you for inviting me!" }
    ]
  }
];

export function InteractiveConversations() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentStep(0);
    setScore(0);
    setTotalQuestions(scenario.conversation.filter(s => s.options).length);
    setShowFeedback(null);
  };

  const handleOptionSelect = (optionIndex: number) => {
    const step = selectedScenario?.conversation[currentStep];
    if (step?.correctOption !== undefined) {
      const isCorrect = optionIndex === step.correctOption;
      if (isCorrect) {
        setScore(prev => prev + 1);
        toast.success("Correct! 🌟");
      } else {
        toast.error("Not quite right, but keep trying!");
      }
      setShowFeedback(step.feedback || null);
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (selectedScenario && currentStep < selectedScenario.conversation.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Scenario completed
      if (selectedScenario && !completedScenarios.includes(selectedScenario.id)) {
        setCompletedScenarios(prev => [...prev, selectedScenario.id]);
      }
      toast.success(`Conversation complete! Score: ${score}/${totalQuestions} 🎉`);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const resetScenario = () => {
    setSelectedScenario(null);
    setCurrentStep(0);
    setScore(0);
    setShowFeedback(null);
  };

  const isCompleted = currentStep >= (selectedScenario?.conversation.length || 0) - 1 && showFeedback === null && currentStep > 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4 p-6 bg-gradient-to-r from-kids-blue/20 via-kids-green/20 to-kids-orange/20 rounded-3xl">
        <div className="text-6xl animate-bounce-slow">💬🗣️</div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-kids-blue to-kids-green bg-clip-text text-transparent">
          Interactive English Conversations
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enhance English fluency through interactive conversations. Whether it's ordering food or making friends, 
          build confidence with engaging activities. Let's dive in and master English together!
        </p>
      </div>

      {!selectedScenario ? (
        /* Scenario Selection Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((scenario) => (
            <Card 
              key={scenario.id}
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-kids-blue/50 cursor-pointer"
              onClick={() => startScenario(scenario)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {scenario.emoji}
                  </div>
                  <div className="flex gap-2">
                    {completedScenarios.includes(scenario.id) && (
                      <Badge className="bg-green-100 text-green-700">
                        <Trophy className="w-3 h-3 mr-1" />
                        Done
                      </Badge>
                    )}
                    <Badge variant="outline">{scenario.difficulty}</Badge>
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{scenario.title}</CardTitle>
                <Badge className="w-fit bg-kids-blue/10 text-kids-blue">
                  {scenario.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {scenario.description}
                </p>
                <Button className="w-full mt-4 bg-gradient-to-r from-kids-blue to-kids-green">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Conversation Interface */
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedScenario.emoji}</span>
                <div>
                  <CardTitle>{selectedScenario.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Score: {score}/{totalQuestions} <Star className="inline w-4 h-4 text-yellow-500" />
                  </p>
                </div>
              </div>
              <Button variant="ghost" onClick={resetScenario}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Exit
              </Button>
            </div>
            <Progress 
              value={(currentStep / (selectedScenario.conversation.length - 1)) * 100} 
              className="h-2"
            />
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Conversation Step */}
            {(() => {
              const step = selectedScenario.conversation[currentStep];
              return (
                <div className="space-y-4">
                  {step.speaker === 'npc' ? (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-kids-blue/20 flex items-center justify-center text-xl">
                        {selectedScenario.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="bg-muted p-4 rounded-2xl rounded-tl-none">
                          <p className="text-foreground">{step.text}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => speakText(step.text)}
                          className="mt-1"
                        >
                          <Volume2 className="w-4 h-4 mr-1" />
                          Listen
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-center text-muted-foreground font-medium">
                        {step.text}
                      </p>
                      {step.options?.map((option, idx) => (
                        <Button
                          key={idx}
                          onClick={() => handleOptionSelect(idx)}
                          variant="outline"
                          className={`w-full justify-start text-left h-auto py-3 px-4 ${
                            showFeedback !== null && idx === step.correctOption
                              ? 'border-green-500 bg-green-50'
                              : ''
                          }`}
                          disabled={showFeedback !== null}
                        >
                          <span className="mr-2">{idx + 1}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Feedback Section */}
                  {showFeedback && (
                    <div className="bg-kids-green/10 border border-kids-green/30 p-4 rounded-xl">
                      <p className="text-kids-green font-medium flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        {showFeedback}
                      </p>
                    </div>
                  )}

                  {/* Continue Button */}
                  {(step.speaker === 'npc' || showFeedback !== null) && !isCompleted && (
                    <Button 
                      onClick={nextStep}
                      className="w-full bg-gradient-to-r from-kids-purple to-kids-blue"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}

                  {/* Completion Message */}
                  {isCompleted && (
                    <div className="text-center space-y-4 py-4">
                      <div className="text-6xl animate-bounce">🎉</div>
                      <h3 className="text-xl font-bold text-kids-purple">
                        Conversation Complete!
                      </h3>
                      <p className="text-muted-foreground">
                        You scored {score} out of {totalQuestions}!
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={() => startScenario(selectedScenario)} variant="outline">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Try Again
                        </Button>
                        <Button onClick={resetScenario} className="bg-gradient-to-r from-kids-blue to-kids-green">
                          More Conversations
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

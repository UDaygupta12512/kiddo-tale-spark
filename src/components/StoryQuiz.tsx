
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Star, Sparkles, Trophy } from "lucide-react";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type StoryQuizProps = {
  storyText: string;
};

export function StoryQuiz({ storyText }: StoryQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Extract key elements from the story for dynamic question generation
  const extractStoryElements = (text: string) => {
    const words = text.toLowerCase().split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Extract potential characters (capitalized words that aren't at sentence start)
    const characters = text.match(/\b[A-Z][a-z]+\b/g)?.filter((word, index, arr) => 
      arr.indexOf(word) === index && 
      !['Once', 'The', 'A', 'An', 'In', 'At', 'On', 'With', 'From'].includes(word)
    ) || [];
    
    // Extract locations and settings
    const locationWords = ['kingdom', 'forest', 'castle', 'garden', 'house', 'village', 'mountain', 'sea', 'cave'];
    const settings = locationWords.filter(word => text.toLowerCase().includes(word));
    
    // Extract actions and themes
    const actionWords = ['adventure', 'journey', 'explore', 'discover', 'help', 'save', 'find', 'learn'];
    const themes = actionWords.filter(word => text.toLowerCase().includes(word));
    
    return { characters, settings, themes, sentences, words };
  };

  // Generate dynamic quiz questions based on story content
  const generateQuestions = (): QuizQuestion[] => {
    if (!storyText) return [];
    
    const elements = extractStoryElements(storyText);
    const questions: QuizQuestion[] = [];
    
    // Question 1: About the main character
    if (elements.characters.length > 0) {
      const mainCharacter = elements.characters[0];
      questions.push({
        question: `Who is the main character in this story?`,
        options: [
          mainCharacter,
          elements.characters[1] || "Princess Aurora",
          "Captain Adventure",
          "Wizard Merlin"
        ],
        correctAnswer: 0
      });
    }
    
    // Question 2: About the setting
    if (elements.settings.length > 0) {
      const setting = elements.settings[0];
      questions.push({
        question: `Where does the story take place?`,
        options: [
          `In a magical ${setting}`,
          "In outer space",
          "Under the ocean",
          "In a modern city"
        ],
        correctAnswer: 0
      });
    }
    
    // Question 3: About the story's theme/action
    const storyLower = storyText.toLowerCase();
    let themeQuestion = {
      question: "What is the main theme of this story?",
      options: ["Adventure and discovery", "Love and friendship", "Magic and wonder", "Learning and growth"],
      correctAnswer: 0
    };
    
    if (storyLower.includes('friend') || storyLower.includes('help')) {
      themeQuestion.correctAnswer = 1;
    } else if (storyLower.includes('magic') || storyLower.includes('magical')) {
      themeQuestion.correctAnswer = 2;
    } else if (storyLower.includes('learn') || storyLower.includes('discover')) {
      themeQuestion.correctAnswer = 3;
    }
    
    questions.push(themeQuestion);
    
    // Question 4: Story comprehension
    if (elements.sentences.length > 1) {
      questions.push({
        question: "What lesson can we learn from this story?",
        options: [
          "Be brave and curious",
          "Always tell the truth",
          "Help others in need",
          "All of these are good lessons"
        ],
        correctAnswer: 3
      });
    }
    
    return questions.slice(0, 4); // Limit to 4 questions
  };

  const questions = generateQuestions();

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (!storyText) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-dashed border-purple-300">
        <CardContent className="p-8 text-center">
          <div className="mb-4 text-6xl">📚</div>
          <p className="text-lg text-purple-600 font-semibold mb-2">
            Create Your Story First!
          </p>
          <p className="text-gray-600">
            Generate a magical story to unlock personalized quiz questions
          </p>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const isExcellent = percentage === 100;
    const isGood = percentage >= 75;
    
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            {isExcellent ? (
              <Trophy className="text-yellow-500 animate-bounce" size={64} />
            ) : isGood ? (
              <Star className="text-yellow-500 animate-pulse" size={64} />
            ) : (
              <Sparkles className="text-purple-500" size={64} />
            )}
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Quiz Complete! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="relative">
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text">
              {score}/{questions.length}
            </div>
            <div className="text-lg text-gray-600 mt-2">
              {percentage}% Correct!
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-inner">
            <p className="text-lg font-semibold text-gray-800">
              {isExcellent 
                ? "🌟 Perfect! You understood every detail of the story!" 
                : isGood 
                  ? "🎯 Excellent! You really paid attention to the story!" 
                  : percentage >= 50
                    ? "👍 Good job! You got the main ideas!"
                    : "📖 Keep reading! Every story teaches us something new!"}
            </p>
          </div>
          
          <Button 
            onClick={resetQuiz} 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Sparkles className="mr-2" size={20} />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Sparkles size={28} />
          Story Quiz
          <Sparkles size={28} />
        </CardTitle>
        <div className="text-center text-blue-100 font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-inner border-l-4 border-purple-400">
          <h3 className="text-xl font-bold mb-4 text-gray-800 leading-relaxed">
            {questions[currentQuestion]?.question}
          </h3>
        </div>
        
        <div className="space-y-3">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                selectedAnswer === index 
                  ? showResult 
                    ? index === questions[currentQuestion].correctAnswer
                      ? "border-green-400 bg-green-50 text-green-800 shadow-lg"
                      : "border-red-400 bg-red-50 text-red-800 shadow-lg"
                    : "border-purple-400 bg-purple-50 text-purple-800 shadow-md"
                  : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showResult && selectedAnswer === index && (
                  <div className="animate-scale-in">
                    {index === questions[currentQuestion].correctAnswer ? (
                      <CheckCircle className="text-green-500 animate-bounce" size={24} />
                    ) : (
                      <XCircle className="text-red-500 animate-pulse" size={24} />
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
        
        <Button 
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null || showResult}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg disabled:hover:scale-100 disabled:shadow-none"
        >
          {showResult ? (
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="animate-spin" size={20} />
              {currentQuestion === questions.length - 1 ? "Calculating Results..." : "Loading Next Question..."}
            </div>
          ) : (
            currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"
          )}
        </Button>
        
        {showResult && (
          <div className="text-center text-sm text-gray-600 animate-fade-in">
            {selectedAnswer === questions[currentQuestion].correctAnswer ? 
              "🎉 Correct! Great job!" : 
              "📚 That's okay! Every mistake helps us learn!"
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
}

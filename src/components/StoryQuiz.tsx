
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

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

  // Generate quiz questions based on story content
  const generateQuestions = (): QuizQuestion[] => {
    // Simple quiz generation - in a real app, this would use AI
    const questions: QuizQuestion[] = [
      {
        question: "What type of story did you just read?",
        options: ["Adventure", "Fantasy", "Mystery", "Educational"],
        correctAnswer: 0
      },
      {
        question: "What was the main character trying to do?",
        options: ["Learn something new", "Help others", "Go on an adventure", "All of the above"],
        correctAnswer: 3
      },
      {
        question: "What lesson can we learn from this story?",
        options: ["Be kind to others", "Never give up", "Use your imagination", "All are good lessons"],
        correctAnswer: 3
      }
    ];
    return questions;
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
    }, 1500);
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Generate a story first to unlock the quiz!
          </p>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-kids-purple">Quiz Complete! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-kids-blue">
            {score}/{questions.length}
          </div>
          <p className="text-lg">
            {score === questions.length 
              ? "Perfect! You understood the story completely!" 
              : score >= questions.length / 2 
                ? "Great job! You got most of it right!" 
                : "Good try! Maybe read the story again?"}
          </p>
          <Button onClick={resetQuiz} className="bg-kids-purple hover:bg-kids-purple/90">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-kids-purple">
          Story Quiz - Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-kids-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        
        <h3 className="text-lg font-semibold mb-4">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === index 
                  ? showResult 
                    ? index === questions[currentQuestion].correctAnswer
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-kids-blue bg-kids-blue/10"
                  : "border-gray-200 hover:border-kids-purple/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && selectedAnswer === index && (
                  index === questions[currentQuestion].correctAnswer ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )
                )}
              </div>
            </button>
          ))}
        </div>
        
        <Button 
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null || showResult}
          className="w-full bg-kids-blue hover:bg-kids-blue/90"
        >
          {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
        </Button>
      </CardContent>
    </Card>
  );
}

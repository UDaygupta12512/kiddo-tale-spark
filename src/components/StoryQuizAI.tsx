import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trophy, Star, Award } from "lucide-react";

interface StoryQuizAIProps {
  storyText: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const StoryQuizAI = ({ storyText }: StoryQuizAIProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const { toast } = useToast();

  const generateQuiz = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-quiz', {
        body: { storyText }
      });

      if (error) throw error;

      setQuestions(data.questions);
      setCurrentQuestion(0);
      setScore(0);
      setQuizComplete(false);
      
      toast({
        title: "Quiz Ready!",
        description: "Answer all questions to earn rewards!",
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "+10 points!",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Keep trying! You're learning!",
        variant: "destructive",
      });
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect Score! You're a story master! 🏆";
    if (percentage >= 80) return "Excellent work! You understood the story well! ⭐";
    if (percentage >= 60) return "Good job! Keep reading and learning! 📚";
    return "Nice try! Want to read the story again? 💪";
  };

  if (questions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            AI Story Comprehension Quiz
          </CardTitle>
          <CardDescription>
            Test your understanding of the story with AI-generated questions!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={generateQuiz} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Start Quiz"
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (quizComplete) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">
              {score}/{questions.length}
            </div>
            <p className="text-lg font-semibold">{getScoreMessage()}</p>
            <div className="flex justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < Math.floor((score / questions.length) * 5)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <Button onClick={generateQuiz} className="w-full">
            Try Another Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            Score: {score}
          </Badge>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={
                showExplanation
                  ? index === question.correctAnswer
                    ? "default"
                    : index === selectedAnswer
                    ? "destructive"
                    : "outline"
                  : selectedAnswer === index
                  ? "secondary"
                  : "outline"
              }
              className="w-full text-left justify-start h-auto py-4 px-6"
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>

        {showExplanation && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm">
                <span className="font-semibold">Explanation: </span>
                {question.explanation}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-3">
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="w-full">
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryQuizAI;


import React, { useState } from 'react';
import { quizQuestions } from '@/utils/kantData';
import { HelpCircle, Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  
  const handleAnswerSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };
  
  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswered(true);
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
  };
  
  if (quizComplete) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-serif mb-6 text-center">Quiz Complete!</h2>
        
        <Card className="w-full max-w-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-center">Your score: {score}/{quizQuestions.length}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              {score === quizQuestions.length 
                ? "Perfect score! You're a true Kantian scholar!"
                : score > quizQuestions.length / 2
                ? "Well done! You have a good understanding of Kant's philosophy."
                : "Keep studying! Kant's ideas can be challenging but rewarding."}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={resetQuiz} className="bg-kant hover:bg-kant hover:bg-opacity-90">
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const question = quizQuestions[currentQuestion];
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-serif mb-6 text-center">Test Your Knowledge</h2>
      
      <div className="w-full max-w-2xl">
        <div className="mb-4 text-center">
          <span className="inline-block bg-kant text-white text-sm px-3 py-1 rounded-full">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
        </div>
        
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="flex gap-2 items-start">
              <HelpCircle className="h-5 w-5 mt-1 flex-shrink-0 text-kant-accent" />
              <span>{question.question}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              {question.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-2 p-2 rounded ${
                    isAnswered
                      ? index === question.correctAnswer
                        ? "bg-green-50"
                        : selectedAnswer === index
                        ? "bg-red-50"
                        : ""
                      : "hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${index}`}
                    disabled={isAnswered}
                  />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="flex-grow cursor-pointer flex items-center justify-between"
                  >
                    <span>{option}</span>
                    {isAnswered && (
                      index === question.correctAnswer
                        ? <Check className="h-5 w-5 text-green-500" />
                        : selectedAnswer === index
                        ? <X className="h-5 w-5 text-red-500" />
                        : null
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <span className="text-sm text-kant-secondary">
                Score: {score}/{currentQuestion + (isAnswered ? 1 : 0)}
              </span>
            </div>
            {!isAnswered ? (
              <Button 
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="bg-kant hover:bg-kant hover:bg-opacity-90"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="bg-kant-accent text-black hover:bg-kant-accent hover:bg-opacity-90 flex items-center gap-1"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {isAnswered && (
          <Card className="bg-kant-light border-kant-accent border-l-4">
            <CardContent className="pt-6">
              <h3 className="font-serif text-lg mb-2">Explanation:</h3>
              <p>{question.explanation}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Quiz;

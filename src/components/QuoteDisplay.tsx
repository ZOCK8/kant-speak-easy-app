
import React, { useState } from 'react';
import { quotes } from '@/utils/kantData';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const QuoteDisplay: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
  const handlePrevious = () => {
    setCurrentQuoteIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentQuoteIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };
  
  const quote = quotes[currentQuoteIndex];
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-serif mb-6 text-center">Wisdom from Kant</h2>
      
      <Card className="w-full max-w-2xl bg-white">
        <CardContent className="pt-6">
          <Quote className="kant-ornament" />
          <blockquote className="kant-quote text-xl md:text-2xl text-center mb-4">
            "{quote.text}"
          </blockquote>
        </CardContent>
        <CardFooter className="flex flex-col">
          <cite className="text-right w-full block font-serif italic text-kant-secondary mb-4">
            — {quote.source}
          </cite>
          
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handlePrevious}
            >
              <ArrowLeft size={16} /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleNext}
            >
              Next <ArrowRight size={16} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuoteDisplay;

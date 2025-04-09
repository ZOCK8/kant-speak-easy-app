
import React, { useState } from 'react';
import { complexToSimple } from '@/utils/kantData';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const TranslationTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  
  // Example terms to suggest
  const exampleTerms = ['categorical imperative', 'transcendental idealism', 'synthetic a priori', 'noumenon', 'phenomenon'];
  
  const handleTranslate = () => {
    if (!input.trim()) return;
    
    let result = input;
    
    // Very simple implementation - just looks for exact matches of key terms
    Object.entries(complexToSimple).forEach(([term, simple]) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      result = result.replace(regex, `${term} (${simple})`);
    });
    
    setTranslation(result === input ? 'No philosophical terms detected to simplify.' : result);
  };
  
  const handleExampleClick = (term: string) => {
    setInput(prev => prev + (prev ? ' ' : '') + term);
  };
  
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-serif mb-6 text-center">Kantian Translator</h2>
      
      <div className="mb-6">
        <p className="text-kant-secondary mb-4">
          Enter text containing Kantian philosophical terms to translate them into simpler language.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-kant-secondary">Try these terms:</span>
          {exampleTerms.map(term => (
            <Button
              key={term}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleExampleClick(term)}
            >
              {term}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="input" className="mb-2 block">Philosophical Text</Label>
          <Textarea
            id="input"
            className="min-h-[200px] bg-white"
            placeholder="Enter Kantian philosophical text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="mt-4 bg-kant hover:bg-kant hover:bg-opacity-90 flex items-center gap-2"
            onClick={handleTranslate}
          >
            <RefreshCw className="h-4 w-4" /> Translate
          </Button>
        </div>
        
        <div>
          <Label htmlFor="output" className="mb-2 block">Simplified Translation</Label>
          <Card className="h-full">
            <CardContent className="pt-6">
              {translation ? (
                <div className="prose prose-sm max-w-none">{translation}</div>
              ) : (
                <div className="text-kant-secondary italic">
                  Translation will appear here...
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TranslationTool;

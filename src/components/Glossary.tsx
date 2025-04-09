
import React, { useState } from 'react';
import { glossaryItems } from '@/utils/kantData';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = glossaryItems.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-serif mb-6 text-center">Kantian Glossary</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-kant-secondary" />
        <Input
          type="text"
          placeholder="Search glossary..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="text-center p-8 text-kant-secondary italic">
          No terms match your search.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <Card key={index} className="bg-white hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-serif font-bold text-kant mb-2">{item.term}</h3>
                <p className="text-kant-secondary">{item.definition}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Glossary;

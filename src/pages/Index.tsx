
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import QuoteDisplay from '@/components/QuoteDisplay';
import TranslationTool from '@/components/TranslationTool';
import Quiz from '@/components/Quiz';
import Glossary from '@/components/Glossary';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'translate' | 'quiz' | 'glossary'>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <QuoteDisplay />;
      case 'translate':
        return <TranslationTool />;
      case 'quiz':
        return <Quiz />;
      case 'glossary':
        return <Glossary />;
      default:
        return <QuoteDisplay />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default Index;

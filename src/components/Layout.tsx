
import React from 'react';
import { Book, BookOpen, HelpCircle, Home, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'home' | 'translate' | 'quiz' | 'glossary';
  setActiveTab: (tab: 'home' | 'translate' | 'quiz' | 'glossary') => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab,
  setActiveTab
}) => {
  const navItems = [
    { id: 'home', label: 'Quotes', icon: Home },
    { id: 'translate', label: 'Translate', icon: RefreshCw },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'glossary', label: 'Glossary', icon: BookOpen },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-kant text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6" />
            <h1 className="text-xl md:text-2xl font-serif">Kant Speak Easy</h1>
          </div>
          <div className="text-sm italic font-serif">Sapere Aude</div>
        </div>
      </header>
      
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto">
          <ul className="flex overflow-x-auto">
            {navItems.map((item) => (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex flex-col items-center py-3 px-2 text-sm transition-colors",
                    activeTab === item.id 
                      ? "text-kant border-b-2 border-kant-accent" 
                      : "text-gray-500 hover:text-kant"
                  )}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      
      <footer className="bg-kant-paper border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-kant-secondary">
          <p>© 2025 Kant Speak Easy</p>
          <p className="mt-1 text-xs">All wisdom attributed to Immanuel Kant (1724-1804)</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

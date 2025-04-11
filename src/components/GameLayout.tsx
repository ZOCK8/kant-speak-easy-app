
import React from 'react';
import { User, Award, PlaySquare, ShoppingBag, Package, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameContext } from '@/context/GameContext';
import useIsMobile from '@/hooks/use-mobile';

interface GameLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
}) => {
  const { playerCoins, playerStats } = useGameContext();
  const isMobile = useIsMobile();
  
  const tabs = [
    { id: 'avatar', icon: User, label: 'Avatar' },
    { id: 'quests', icon: Award, label: 'Quests' },
    { id: 'game', icon: PlaySquare, label: 'Kampf' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'inventory', icon: Package, label: 'Inventar' },
    { id: 'settings', icon: Settings, label: 'Einst.' },
  ];
  
  return (
    <div className="min-h-screen overflow-hidden flex flex-col bg-game">
      {/* Header */}
      <header className="bg-game-secondary border-b border-game-accent/20 py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-game-accent">Zero Quest</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-game-foreground">
              <span className="text-yellow-400 mr-1">₿</span>
              <span>{playerCoins}</span>
            </div>
            <div className="flex items-center text-game-foreground">
              <span className="text-game-accent mr-1">Lvl</span>
              <span>{playerStats.level}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-grow overflow-auto py-6 px-4">
        <div className="container mx-auto max-w-4xl">{children}</div>
      </div>
      
      {/* Navigation */}
      <nav className="bg-game-secondary border-t border-game-accent/20 py-2 px-4 mt-auto">
        <div className="container mx-auto">
          <ul className="flex justify-between items-center">
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-md transition-colors",
                    activeTab === tab.id
                      ? "text-game-accent"
                      : "text-game-foreground/50 hover:text-game-foreground",
                  )}
                >
                  <tab.icon className={cn(
                    "w-5 h-5",
                    isMobile ? "mb-1" : "mb-2"
                  )} />
                  {!isMobile && <span className="text-xs">{tab.label}</span>}
                  {isMobile && <span className="text-[10px]">{tab.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default GameLayout;

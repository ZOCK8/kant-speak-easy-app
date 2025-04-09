
import React from 'react';
import { Shield, Sword, Package, Trophy, User, Activity, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface GameLayoutProps {
  children: React.ReactNode;
  activeTab: 'avatar' | 'quests' | 'game' | 'shop';
  setActiveTab: (tab: 'avatar' | 'quests' | 'game' | 'shop') => void;
}

const GameLayout: React.FC<GameLayoutProps> = ({ 
  children, 
  activeTab,
  setActiveTab
}) => {
  const navItems = [
    { id: 'avatar', label: 'Avatar', icon: User },
    { id: 'quests', label: 'Quests', icon: Trophy },
    { id: 'game', label: 'Kampf', icon: Sword },
    { id: 'shop', label: 'Shop', icon: Package },
  ] as const;

  // Mock Benutzerdaten
  const playerData = {
    name: "Spieler123",
    level: 5,
    health: 85,
    strength: 12,
    defense: 8,
    experience: 3240,
    nextLevel: 5000
  };

  return (
    <div className="min-h-screen flex flex-col bg-game bg-dots-pattern bg-[size:24px_24px]">
      <header className="bg-game-secondary border-b border-game-accent/30 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-game-accent blue-glow" />
            <h1 className="text-xl md:text-2xl font-bold text-game-accent">Monster Battle</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-game-accent" />
            <span className="text-sm text-game-highlight">Level {playerData.level}</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow">
        {/* Side bar with avatar and stats */}
        <aside className="w-64 bg-game-secondary border-r border-game-accent/30 p-4">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-24 w-24 mb-4 blue-glow">
              <AvatarImage src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback className="bg-game-accent text-white text-xl">
                {playerData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-game-accent text-lg font-bold">{playerData.name}</h2>
            <p className="text-game-foreground/70 text-sm">Krieger • Level {playerData.level}</p>
          </div>
          
          {/* Player stats */}
          <div className="space-y-3">
            <div className="game-card">
              <div className="flex justify-between items-center mb-1">
                <span className="text-game-foreground/70 text-xs">HP</span>
                <span className="text-game-highlight text-xs">{playerData.health}/100</span>
              </div>
              <div className="w-full bg-game/50 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${playerData.health}%` }}></div>
              </div>
            </div>
            
            <div className="game-card">
              <div className="flex justify-between items-center mb-1">
                <span className="text-game-foreground/70 text-xs">XP</span>
                <span className="text-game-highlight text-xs">{playerData.experience}/{playerData.nextLevel}</span>
              </div>
              <div className="w-full bg-game/50 rounded-full h-2">
                <div className="bg-game-accent h-2 rounded-full" style={{ width: `${(playerData.experience/playerData.nextLevel)*100}%` }}></div>
              </div>
            </div>
            
            <div className="game-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Sword className="h-4 w-4 text-game-accent mr-2" />
                  <span className="text-game-foreground/70">Stärke</span>
                </div>
                <span className="text-game-highlight">{playerData.strength}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-game-accent mr-2" />
                  <span className="text-game-foreground/70">Verteidigung</span>
                </div>
                <span className="text-game-highlight">{playerData.defense}</span>
              </div>
            </div>
          </div>
        </aside>
        
        <main className="flex-grow">
          {/* Navigation tabs */}
          <nav className="bg-game-secondary border-b border-game-accent/30 shadow-sm">
            <div className="container mx-auto">
              <ul className="flex">
                {navItems.map((item) => (
                  <li key={item.id} className="flex-1">
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex flex-col items-center py-3 px-2 text-sm transition-colors",
                        activeTab === item.id 
                          ? "text-game-accent border-b-2 border-game-accent" 
                          : "text-game-foreground/50 hover:text-game-accent/70"
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
          
          {/* Content area */}
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      <footer className="bg-game-secondary border-t border-game-accent/30 py-3">
        <div className="container mx-auto px-4 text-center text-xs text-game-foreground/50">
          <p>© 2025 Monster Battle</p>
        </div>
      </footer>
    </div>
  );
};

export default GameLayout;

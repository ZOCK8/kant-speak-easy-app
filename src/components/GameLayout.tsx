import React, { useState } from 'react';
import { Shield, Sword, Package, Trophy, User, Activity, Menu, X, Backpack, Settings, RefreshCw, AlertTriangle, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useGameContext } from '@/context/GameContext';
import { useToast } from '@/hooks/use-toast';

interface GameLayoutProps {
  children: React.ReactNode;
  activeTab: 'avatar' | 'quests' | 'game' | 'shop' | 'inventory';
  setActiveTab: (tab: 'avatar' | 'quests' | 'game' | 'shop' | 'inventory') => void;
}

const GameLayout: React.FC<GameLayoutProps> = ({ 
  children, 
  activeTab,
  setActiveTab
}) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { 
    playerName, 
    selectedAvatar, 
    resetProgress, 
    playerStats,
    updatePlayerStats
  } = useGameContext();
  
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = React.useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const navItems = [
    { id: 'avatar', label: 'Avatar', icon: User },
    { id: 'quests', label: 'Quests', icon: Trophy },
    { id: 'game', label: 'Kampf', icon: Sword },
    { id: 'shop', label: 'Shop', icon: Package },
    { id: 'inventory', label: 'Inventar', icon: Backpack },
  ] as const;

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Handle reset progress
  const handleResetProgress = () => {
    resetProgress();
    setConfirmResetOpen(false);
    setSettingsOpen(false);
    
    toast({
      title: "Fortschritt zurückgesetzt",
      description: "Alle deine Spieldaten wurden zurückgesetzt.",
      variant: "destructive",
    });
  };
  
  // Apply difficulty settings
  const applyDifficultySetting = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    
    let strengthMultiplier = 1.0;
    let defenseMultiplier = 1.0;
    let healthMultiplier = 1.0;
    
    switch (newDifficulty) {
      case 'easy':
        strengthMultiplier = 1.2;
        defenseMultiplier = 1.2;
        healthMultiplier = 1.2;
        break;
      case 'hard':
        strengthMultiplier = 0.8;
        defenseMultiplier = 0.8;
        healthMultiplier = 0.8;
        break;
      default:
        // Medium difficulty, keep multipliers at 1.0
        break;
    }
    
    // Apply difficulty settings to player stats
    const newMaxHealth = Math.floor(100 * healthMultiplier);
    const newStrength = Math.floor(playerStats.strength * strengthMultiplier);
    const newDefense = Math.floor(playerStats.defense * defenseMultiplier);
    
    updatePlayerStats({
      strength: newStrength,
      defense: newDefense,
      maxHealth: newMaxHealth,
      health: Math.min(playerStats.health, newMaxHealth)
    });
    
    toast({
      title: "Schwierigkeitsgrad geändert",
      description: `Schwierigkeitsgrad auf ${
        newDifficulty === 'easy' ? 'Einfach' : 
        newDifficulty === 'medium' ? 'Mittel' : 'Schwer'
      } gesetzt.`,
    });
  };
  
  // Get the correct avatar image based on selection
  const getAvatarImage = () => {
    switch(selectedAvatar) {
      case 'player1':
        return "/lovable-uploads/62c95b97-15d2-4d66-9bf8-f2556649b4e9.png";
      case 'player2':
        return "/lovable-uploads/e6bb07f6-039d-4ed3-bece-ad8d405fcea4.png";
      case 'player3':
        return "/lovable-uploads/78ff7be8-098a-4011-b094-98ab0dc84162.png";
      case 'monster':
        return "/lovable-uploads/e5758efc-bf3c-4373-87ea-1eed85e18c86.png";
      default:
        return "/lovable-uploads/62c95b97-15d2-4d66-9bf8-f2556649b4e9.png";
    }
  };

  // Mobile bottom navigation
  const renderMobileNav = () => {
    return (
      <nav className="fixed bottom-0 left-0 w-full bg-game-secondary border-t border-game-accent/30 shadow-lg md:hidden z-10">
        <ul className="flex">
          {navItems.map((item) => (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex flex-col items-center py-2 px-1 text-xs transition-colors",
                  activeTab === item.id 
                    ? "text-game-accent" 
                    : "text-game-foreground/50 hover:text-game-accent/70"
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  // Render stats sidebar for desktop and mobile drawer
  const renderStatsSidebar = () => {
    return (
      <>
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={getAvatarImage()} alt="Avatar" />
            <AvatarFallback className="bg-game-accent text-white text-xl">
              {playerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-game-accent text-lg font-bold">{playerName}</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-game-accent/70 hover:text-game-accent"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-game-foreground/70 text-sm">Krieger • Level {playerStats.level}</p>
        </div>
        
        {/* Player stats */}
        <div className="space-y-3">
          <div className="game-card">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-red-400 mr-1" />
                <span className="text-game-foreground/70 text-xs">HP</span>
              </div>
              <span className="text-red-400 text-xs">{playerStats.health}/{playerStats.maxHealth}</span>
            </div>
            <div className="w-full bg-game/50 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(playerStats.health/playerStats.maxHealth) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="game-card">
            <div className="flex justify-between items-center mb-1">
              <span className="text-game-foreground/70 text-xs">XP</span>
              <span className="text-game-highlight text-xs">{playerStats.experience}/{playerStats.nextLevel}</span>
            </div>
            <div className="w-full bg-game/50 rounded-full h-2">
              <div 
                className="bg-game-accent h-2 rounded-full" 
                style={{ width: `${(playerStats.experience/playerStats.nextLevel) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="game-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Sword className="h-4 w-4 text-game-accent mr-2" />
                <span className="text-game-foreground/70">Stärke</span>
              </div>
              <span className="text-game-highlight">{playerStats.strength}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-game-accent mr-2" />
                <span className="text-game-foreground/70">Verteidigung</span>
              </div>
              <span className="text-game-highlight">{playerStats.defense}</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-game">
      <header className="bg-game-secondary border-b border-game-accent/30 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/859298bb-719b-490c-984a-5dcd22010bee.png"
              alt="Game Logo"
              className="h-6 w-6" 
            />
            <h1 className="text-xl md:text-2xl font-bold text-game-accent">Monster Battle</h1>
          </div>
          
          {isMobile && (
            <Button
              onClick={toggleSidebar}
              variant="ghost" 
              className="text-game-accent"
              size="icon"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          
          <div className="hidden md:flex items-center space-x-2">
            <Activity className="h-5 w-5 text-game-accent" />
            <span className="text-sm text-game-highlight">Level {playerStats.level}</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow">
        {/* Desktop sidebar */}
        {!isMobile && (
          <aside className={`w-64 bg-game-secondary border-r border-game-accent/30 p-4 transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {renderStatsSidebar()}
          </aside>
        )}
        
        {/* Mobile drawer for stats */}
        {isMobile && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="fixed left-4 top-20 bg-game-secondary border border-game-accent/30 text-game-accent z-10" size="sm">
                <User className="h-4 w-4 mr-1" /> Stats
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-game-secondary border-t border-game-accent/30 p-4">
              {renderStatsSidebar()}
            </DrawerContent>
          </Drawer>
        )}
        
        <main className="flex-grow">
          {/* Desktop Navigation tabs */}
          {!isMobile && (
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
          )}
          
          {/* Content area */}
          <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center text-game-accent">
              <img 
                src="/lovable-uploads/39e6c163-da14-47d3-a336-0456c3bbc2f2.png"
                alt="Settings"
                className="h-6 w-6 mr-2" 
              />
              Einstellungen
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <label className="text-game-foreground/70">Schwierigkeitsgrad</label>
              <select 
                className="bg-game-secondary border border-game-accent/30 rounded p-1 text-game-foreground"
                value={difficulty}
                onChange={(e) => applyDifficultySetting(e.target.value as 'easy' | 'medium' | 'hard')}
              >
                <option value="easy">Einfach</option>
                <option value="medium">Mittel</option>
                <option value="hard">Schwer</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-game-foreground/70">Audioeffekte</label>
              <input 
                type="checkbox" 
                className="toggle" 
                checked={soundEnabled}
                onChange={() => setSoundEnabled(!soundEnabled)}
              />
            </div>
            <div className="pt-4 border-t border-game-accent/20">
              <Button 
                variant="destructive" 
                className="w-full flex items-center justify-center"
                onClick={() => setConfirmResetOpen(true)}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Fortschritt zurücksetzen
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setSettingsOpen(false)}>
              Schließen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Reset Dialog */}
      <Dialog open={confirmResetOpen} onOpenChange={setConfirmResetOpen}>
        <DialogContent className="bg-game-secondary border-red-500/40 text-game-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Fortschritt zurücksetzen?
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-game-foreground/80">
              Bist du sicher, dass du deinen gesamten Spielfortschritt zurücksetzen möchtest?
              Dies kann nicht rückgängig gemacht werden und alle deine Statistiken, Gegenstände
              und Erfolge werden gelöscht.
            </p>
          </div>
          <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2">
            <Button 
              variant="destructive" 
              onClick={handleResetProgress}
            >
              Ja, zurücksetzen
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setConfirmResetOpen(false)}
            >
              Abbrechen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Mobile Navigation */}
      {isMobile && renderMobileNav()}
      
      <footer className="bg-game-secondary border-t border-game-accent/30 py-3 hidden md:block">
        <div className="container mx-auto px-4 text-center text-xs text-game-foreground/50">
          <p>© 2025 Monster Battle</p>
        </div>
      </footer>
    </div>
  );
};

export default GameLayout;


import React, { useState } from 'react';
import { Shield, Sword, Package, Trophy, User, Activity, Home, Menu, X, Backpack, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

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
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  
  const navItems = [
    { id: 'avatar', label: 'Avatar', icon: User },
    { id: 'quests', label: 'Quests', icon: Trophy },
    { id: 'game', label: 'Kampf', icon: Sword },
    { id: 'shop', label: 'Shop', icon: Package },
    { id: 'inventory', label: 'Inventar', icon: Backpack },
  ] as const;

  // Mock Benutzerdaten
  const playerData = {
    name: "Spieler123",
    level: 5,
    health: 0,
    strength: 12,
    defense: 8,
    experience: 0,
    nextLevel: 5000
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          <Avatar className="h-24 w-24 mb-4 blue-glow">
            <AvatarImage src="/lovable-uploads/27914368-3994-4663-b43b-c03a32267fd6.png" alt="Avatar" />
            <AvatarFallback className="bg-game-accent text-white text-xl">
              {playerData.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-game-accent text-lg font-bold">{playerData.name}</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-game-accent/70 hover:text-game-accent"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
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
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-game bg-moving-dots bg-[size:64px_64px]">
      <header className="bg-game-secondary border-b border-game-accent/30 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-game-accent blue-glow" />
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
            <span className="text-sm text-game-highlight">Level {playerData.level}</span>
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
            <DialogTitle className="text-game-accent">Einstellungen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <label className="text-game-foreground/70">Schwierigkeitsgrad</label>
              <select className="bg-game-secondary border border-game-accent/30 rounded p-1 text-game-foreground">
                <option value="easy">Einfach</option>
                <option value="medium">Mittel</option>
                <option value="hard">Schwer</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-game-foreground/70">Audioeffekte</label>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setSettingsOpen(false)}>
              Schließen
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

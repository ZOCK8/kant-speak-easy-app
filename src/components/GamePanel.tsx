
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sword, Shield, Activity, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useGameContext } from '@/context/GameContext';

const GamePanel = () => {
  const { toast } = useToast();
  const { playerName } = useGameContext();
  const [showBattleDialog, setShowBattleDialog] = useState(false);
  
  // Battle statistics
  const stats = {
    victories: 24,
    defeats: 8,
    winRate: '75%',
    kills: 42,
    highestDamage: 87
  };
  
  // Current opponent
  const opponent = {
    name: 'Bergtroll',
    health: 100,
    maxHealth: 100,
    attack: 15,
    defense: 10
  };
  
  // Handle battle start
  const handleBattleStart = () => {
    toast({
      title: "Kampf nicht verfügbar",
      description: "Kampfmodus wird aktuell überarbeitet und ist bald verfügbar!",
      variant: "destructive",
    });
    setShowBattleDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Kampfarena</h2>
        <p className="text-game-foreground/70">Kämpfe gegen Monster und gewinne Belohnungen</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="game-card p-6 filter blur-[0.5px]">
          <h3 className="text-xl font-bold text-game-accent mb-4">Gegner</h3>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-game/50 flex items-center justify-center border-2 border-game-accent/30">
              <img 
                src="/lovable-uploads/e5758efc-bf3c-4373-87ea-1eed85e18c86.png"
                alt="Monster"
                className="h-24 w-24 object-contain blue-glow-soft" 
              />
            </div>
            <h4 className="text-lg font-medium text-game-foreground">{opponent.name}</h4>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-game-foreground/70">HP</span>
                <span>{opponent.health}/{opponent.maxHealth}</span>
              </div>
              <div className="w-full bg-game/50 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full w-full"></div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <Sword className="h-4 w-4 text-game-accent mr-1" />
                  <span className="text-game-foreground/70">ATK: {opponent.attack}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-game-accent mr-1" />
                  <span className="text-game-foreground/70">DEF: {opponent.defense}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="game-card p-6 filter blur-[0.5px]">
          <h3 className="text-xl font-bold text-game-accent mb-4">Kampfstatistiken</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-game-foreground/70">Siege</span>
              <span className="text-game-highlight">{stats.victories}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-game-foreground/70">Niederlagen</span>
              <span className="text-game-foreground">{stats.defeats}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-game-foreground/70">Siegesrate</span>
              <span className="text-green-400">{stats.winRate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-game-foreground/70">Tötungen</span>
              <span className="text-game-highlight">{stats.kills}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-game-foreground/70">Höchster Schaden</span>
              <span className="text-red-400">{stats.highestDamage}</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex flex-col items-center mt-8 space-y-4">
        <Button className="game-button flex items-center space-x-2 py-6 px-8 text-lg" onClick={handleBattleStart}>
          <Sword className="h-6 w-6" />
          <span>Kampf beginnen</span>
        </Button>
        
        <div className="flex items-center p-3 bg-game-secondary/70 border border-red-500/30 rounded-md">
          <img 
            src="/lovable-uploads/2f3d1c68-a034-40b0-82c7-17885a27e6c9.png"
            alt="Not Available"
            className="h-6 w-6 mr-2" 
          />
          <span className="text-red-400 text-sm">Kämpfe sind aktuell nicht verfügbar</span>
        </div>
      </div>
      
      {/* Battle Dialog */}
      <Dialog open={showBattleDialog} onOpenChange={setShowBattleDialog}>
        <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center text-yellow-500">
              <img 
                src="/lovable-uploads/2f3d1c68-a034-40b0-82c7-17885a27e6c9.png"
                alt="Warning"
                className="h-6 w-6 mr-2" 
              />
              Kampfmodus nicht verfügbar
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-game-foreground/80">
              Der Kampfmodus wird gerade überarbeitet und ist bald verfügbar.
              Führe stattdessen Quests aus, um Erfahrung und Belohnungen zu sammeln!
            </p>
            <div className="mt-4 p-4 border border-game-accent/20 rounded-md bg-game/30">
              <h4 className="text-game-accent mb-2">Kommende Funktionen:</h4>
              <ul className="space-y-1 text-sm text-game-foreground/70">
                <li>• Verschiedene Monster mit unterschiedlichen Schwierigkeitsgraden</li>
                <li>• Komplexes Kampfsystem mit Spezialangriffen</li>
                <li>• Spezielle Kampfbelohnungen und Trophäen</li>
                <li>• Rang- und Levelaufstiegssystem</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowBattleDialog(false)}>
              Verstanden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GamePanel;

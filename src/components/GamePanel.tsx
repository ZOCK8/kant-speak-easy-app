
import React, { useState } from 'react';
import { Button } from '@/components/ui/card';
import { Card, CardContent } from '@/components/ui/card';
import { Sword, Shield, Heart, Zap } from 'lucide-react';

// Typ für Monster
type Monster = {
  id: number;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  xpReward: number;
  goldReward: number;
  image: string;
};

const GamePanel: React.FC = () => {
  const [currentMonster, setCurrentMonster] = useState<Monster>({
    id: 1,
    name: "Waldhöhlentroll",
    level: 3,
    health: 100,
    maxHealth: 100,
    attack: 8,
    defense: 5,
    xpReward: 50,
    goldReward: 25,
    image: "/placeholder.svg",
  });
  
  const [playerHealth, setPlayerHealth] = useState(85);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [isFighting, setIsFighting] = useState(false);
  
  // Mock player stats
  const player = {
    attack: 12,
    defense: 8,
    maxHealth: 100
  };
  
  const addLogMessage = (message: string) => {
    setCombatLog(prev => [message, ...prev].slice(0, 5));
  };
  
  const attackMonster = () => {
    setIsFighting(true);
    
    // Spieler greift an
    const playerDamage = Math.max(1, player.attack - currentMonster.defense/2 + Math.floor(Math.random() * 4));
    const newMonsterHealth = Math.max(0, currentMonster.health - playerDamage);
    
    addLogMessage(`Du greifst an und verursachst ${playerDamage} Schaden!`);
    
    // Monster aktualisieren
    setCurrentMonster(prev => ({
      ...prev,
      health: newMonsterHealth
    }));
    
    // Monster ist besiegt
    if (newMonsterHealth <= 0) {
      addLogMessage(`Du hast ${currentMonster.name} besiegt! +${currentMonster.xpReward} XP, +${currentMonster.goldReward} Gold`);
      
      // Kurze Verzögerung und dann neues Monster
      setTimeout(() => {
        setCurrentMonster({
          id: Math.floor(Math.random() * 1000),
          name: ["Höhlentroll", "Riesenschlange", "Goblin", "Skelett", "Spinne"][Math.floor(Math.random() * 5)],
          level: currentMonster.level + Math.floor(Math.random() * 2),
          health: currentMonster.maxHealth + 20,
          maxHealth: currentMonster.maxHealth + 20,
          attack: currentMonster.attack + 1,
          defense: currentMonster.defense + 1,
          xpReward: currentMonster.xpReward + 10,
          goldReward: currentMonster.goldReward + 5,
          image: "/placeholder.svg",
        });
        setIsFighting(false);
      }, 1000);
      
      return;
    }
    
    // Monster greift an
    setTimeout(() => {
      const monsterDamage = Math.max(1, currentMonster.attack - player.defense/2 + Math.floor(Math.random() * 3));
      const newPlayerHealth = Math.max(0, playerHealth - monsterDamage);
      
      addLogMessage(`${currentMonster.name} greift an und verursacht ${monsterDamage} Schaden!`);
      setPlayerHealth(newPlayerHealth);
      
      if (newPlayerHealth <= 0) {
        addLogMessage("Du wurdest besiegt! Versuche es noch einmal.");
        setTimeout(() => {
          setPlayerHealth(player.maxHealth);
          setCurrentMonster(prev => ({
            ...prev,
            health: prev.maxHealth
          }));
        }, 2000);
      }
      
      setIsFighting(false);
    }, 600);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Kampfarena</h2>
        <p className="text-game-foreground/70">Bekämpfe Monster, sammle Erfahrung und Gold</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Monster Card */}
        <Card className="game-card flex-1 flex flex-col">
          <CardContent className="pt-6 flex-grow flex flex-col">
            <div className="text-center mb-4">
              <h3 className="text-xl text-game-accent mb-1">{currentMonster.name}</h3>
              <p className="text-sm text-game-foreground/70">Level {currentMonster.level}</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 flex items-center justify-center bg-game-secondary/70 rounded-full blue-glow">
                <img 
                  src={currentMonster.image} 
                  alt={currentMonster.name}
                  className="w-24 h-24 animate-float" 
                />
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-xs text-game-foreground/70">HP</span>
                  </div>
                  <span className="text-xs">{currentMonster.health}/{currentMonster.maxHealth}</span>
                </div>
                <div className="w-full bg-game/50 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(currentMonster.health/currentMonster.maxHealth)*100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Sword className="h-3 w-3 text-game-accent mr-1" />
                  <span className="text-game-foreground/70 text-xs">Angriff:</span>
                  <span className="ml-1 text-game-foreground text-xs">{currentMonster.attack}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-3 w-3 text-game-accent mr-1" />
                  <span className="text-game-foreground/70 text-xs">Verteidigung:</span>
                  <span className="ml-1 text-game-foreground text-xs">{currentMonster.defense}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-auto">
              <button 
                className="game-button flex items-center disabled:opacity-50"
                disabled={isFighting}
                onClick={attackMonster}
              >
                <Sword className="mr-2 h-4 w-4" />
                Angreifen
              </button>
            </div>
          </CardContent>
        </Card>
        
        {/* Combat Log */}
        <Card className="game-card flex-1">
          <CardContent className="pt-6">
            <h3 className="text-lg text-game-accent mb-4">Kampfprotokoll</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-xs text-game-foreground/70">Deine HP</span>
                </div>
                <span className="text-xs">{playerHealth}/{player.maxHealth}</span>
              </div>
              <div className="w-full bg-game/50 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(playerHealth/player.maxHealth)*100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-game-secondary/50 rounded-md border border-game-accent/20 h-48 overflow-y-auto p-3">
              {combatLog.length > 0 ? (
                combatLog.map((log, index) => (
                  <div key={index} className="text-sm mb-2 text-game-foreground/80">
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-sm text-game-foreground/50 text-center pt-16">
                  Greife das Monster an, um den Kampf zu beginnen
                </div>
              )}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="game-button-secondary flex items-center justify-center">
                <Zap className="mr-2 h-4 w-4" />
                Spezialangriff
              </button>
              <button className="game-button-secondary flex items-center justify-center">
                Trank benutzen
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamePanel;

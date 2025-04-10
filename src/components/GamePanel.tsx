
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sword, Shield, Activity, AlertTriangle, Heart, SkipForward, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useGameContext } from '@/context/GameContext';

type EnemyType = {
  id: number;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  image: string;
  minCoins: number;
  maxCoins: number;
  experience: number;
};

const enemies: EnemyType[] = [
  {
    id: 1,
    name: "Bergtroll",
    level: 1,
    health: 100,
    maxHealth: 100,
    attack: 15,
    defense: 10,
    image: "/lovable-uploads/e5758efc-bf3c-4373-87ea-1eed85e18c86.png",
    minCoins: 10,
    maxCoins: 25,
    experience: 100
  },
  {
    id: 2,
    name: "Waldgoblin",
    level: 2,
    health: 120,
    maxHealth: 120,
    attack: 18,
    defense: 8,
    image: "/lovable-uploads/e5758efc-bf3c-4373-87ea-1eed85e18c86.png",
    minCoins: 15,
    maxCoins: 30,
    experience: 150
  },
  {
    id: 3,
    name: "Höhlenschlange",
    level: 3,
    health: 150,
    maxHealth: 150,
    attack: 22,
    defense: 12,
    image: "/lovable-uploads/e5758efc-bf3c-4373-87ea-1eed85e18c86.png",
    minCoins: 20,
    maxCoins: 40,
    experience: 200
  }
];

type BattleLog = {
  message: string;
  type: 'player-attack' | 'enemy-attack' | 'player-heal' | 'player-win' | 'player-lose' | 'system';
};

const GamePanel = () => {
  const { toast } = useToast();
  const { playerName, playerStats, updatePlayerStats, setPlayerCoins } = useGameContext();
  
  const [showBattleDialog, setShowBattleDialog] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);
  const [currentEnemy, setCurrentEnemy] = useState<EnemyType>(enemies[0]);
  const [enemyHealth, setEnemyHealth] = useState(enemies[0].health);
  const [playerHealth, setPlayerHealth] = useState(playerStats.health);
  const [playerMaxHealth, setPlayerMaxHealth] = useState(playerStats.maxHealth);
  const [battleLogs, setBattleLogs] = useState<BattleLog[]>([]);
  const [showBattleResult, setShowBattleResult] = useState(false);
  const [battleWon, setBattleWon] = useState(false);
  const [rewards, setRewards] = useState({ coins: 0, experience: 0 });
  
  // Initialize player health when component mounts
  useEffect(() => {
    if (playerStats.health === 0) {
      // If player health is 0, set to max health
      updatePlayerStats({ health: playerStats.maxHealth });
      setPlayerHealth(playerStats.maxHealth);
    } else {
      setPlayerHealth(playerStats.health);
    }
    setPlayerMaxHealth(playerStats.maxHealth);
  }, [playerStats.health, playerStats.maxHealth, updatePlayerStats]);
  
  // Battle statistics
  const stats = {
    victories: 24,
    defeats: 8,
    winRate: '75%',
    kills: 42,
    highestDamage: 87
  };
  
  // Handle battle start
  const handleBattleStart = () => {
    // Reset battle state
    setBattleStarted(true);
    setCurrentEnemy({...enemies[0]});
    setEnemyHealth(enemies[0].health);
    setPlayerHealth(playerStats.health);
    setBattleLogs([{
      message: `Kampf gegen ${enemies[0].name} beginnt!`,
      type: 'system'
    }]);
    setShowBattleDialog(true);
    setShowBattleResult(false);
  };
  
  // Player attack
  const handlePlayerAttack = () => {
    if (!battleStarted) return;
    
    // Calculate damage
    const damage = Math.max(1, Math.floor(playerStats.strength * (1 + Math.random() * 0.5) - currentEnemy.defense * 0.5));
    const newEnemyHealth = Math.max(0, enemyHealth - damage);
    
    // Update enemy health
    setEnemyHealth(newEnemyHealth);
    
    // Add log
    setBattleLogs(prev => [...prev, {
      message: `${playerName} greift an und verursacht ${damage} Schaden!`,
      type: 'player-attack'
    }]);
    
    // Check if enemy is defeated
    if (newEnemyHealth <= 0) {
      handleBattleWin();
      return;
    }
    
    // Enemy attack after a short delay
    setTimeout(() => {
      handleEnemyAttack();
    }, 1000);
  };
  
  // Enemy attack
  const handleEnemyAttack = () => {
    if (!battleStarted) return;
    
    // Calculate damage
    const damage = Math.max(1, Math.floor(currentEnemy.attack * (0.8 + Math.random() * 0.4) - playerStats.defense * 0.4));
    const newPlayerHealth = Math.max(0, playerHealth - damage);
    
    // Update player health
    setPlayerHealth(newPlayerHealth);
    updatePlayerStats({ health: newPlayerHealth });
    
    // Add log
    setBattleLogs(prev => [...prev, {
      message: `${currentEnemy.name} greift an und verursacht ${damage} Schaden!`,
      type: 'enemy-attack'
    }]);
    
    // Check if player is defeated
    if (newPlayerHealth <= 0) {
      handleBattleLose();
    }
  };
  
  // Player heal
  const handlePlayerHeal = () => {
    if (!battleStarted || playerHealth >= playerMaxHealth) return;
    
    // Calculate healing
    const healAmount = Math.floor(playerMaxHealth * 0.2);
    const newPlayerHealth = Math.min(playerMaxHealth, playerHealth + healAmount);
    
    // Update player health
    setPlayerHealth(newPlayerHealth);
    updatePlayerStats({ health: newPlayerHealth });
    
    // Add log
    setBattleLogs(prev => [...prev, {
      message: `${playerName} heilt sich um ${healAmount} Lebenspunkte!`,
      type: 'player-heal'
    }]);
    
    // Enemy attack after a short delay
    setTimeout(() => {
      handleEnemyAttack();
    }, 1000);
  };
  
  // Skip turn
  const handleSkipTurn = () => {
    if (!battleStarted) return;
    
    // Add log
    setBattleLogs(prev => [...prev, {
      message: `${playerName} verteidigt und bereitet sich auf den nächsten Zug vor.`,
      type: 'system'
    }]);
    
    // Enemy attack with reduced damage after a short delay
    setTimeout(() => {
      // Calculate reduced damage (50% less)
      const damage = Math.max(1, Math.floor((currentEnemy.attack * (0.8 + Math.random() * 0.4) - playerStats.defense * 0.4) * 0.5));
      const newPlayerHealth = Math.max(0, playerHealth - damage);
      
      // Update player health
      setPlayerHealth(newPlayerHealth);
      updatePlayerStats({ health: newPlayerHealth });
      
      // Add log
      setBattleLogs(prev => [...prev, {
        message: `${currentEnemy.name} greift an, aber ${playerName} verteidigt und nimmt nur ${damage} Schaden!`,
        type: 'enemy-attack'
      }]);
      
      // Check if player is defeated
      if (newPlayerHealth <= 0) {
        handleBattleLose();
      }
    }, 1000);
  };
  
  // Battle win
  const handleBattleWin = () => {
    setBattleStarted(false);
    setBattleWon(true);
    
    // Calculate rewards
    const coinsEarned = Math.floor(Math.random() * (currentEnemy.maxCoins - currentEnemy.minCoins + 1)) + currentEnemy.minCoins;
    const expEarned = currentEnemy.experience;
    
    setRewards({
      coins: coinsEarned,
      experience: expEarned
    });
    
    // Update player stats
    setPlayerCoins(prev => prev + coinsEarned);
    const newExp = playerStats.experience + expEarned;
    let newLevel = playerStats.level;
    let nextLevelExp = playerStats.nextLevel;
    
    // Check for level up
    if (newExp >= playerStats.nextLevel) {
      newLevel += 1;
      nextLevelExp = Math.floor(playerStats.nextLevel * 1.5);
      
      // Increase player stats on level up
      updatePlayerStats({
        level: newLevel,
        experience: newExp - playerStats.nextLevel,
        nextLevel: nextLevelExp,
        strength: playerStats.strength + 2,
        defense: playerStats.defense + 2,
        maxHealth: playerStats.maxHealth + 10,
        health: playerStats.maxHealth + 10
      });
      
      toast({
        title: "Level aufgestiegen!",
        description: `Du bist jetzt Level ${newLevel}!`,
        variant: "default",
      });
    } else {
      updatePlayerStats({
        experience: newExp
      });
    }
    
    // Add log
    setBattleLogs(prev => [...prev, {
      message: `${playerName} hat ${currentEnemy.name} besiegt!`,
      type: 'player-win'
    }, {
      message: `Du erhältst ${coinsEarned} Münzen und ${expEarned} Erfahrungspunkte!`,
      type: 'system'
    }]);
    
    setShowBattleResult(true);
  };
  
  // Battle lose
  const handleBattleLose = () => {
    setBattleStarted(false);
    setBattleWon(false);
    
    // Add log
    setBattleLogs(prev => [...prev, {
      message: `${playerName} wurde von ${currentEnemy.name} besiegt!`,
      type: 'player-lose'
    }]);
    
    setShowBattleResult(true);
    
    // Reduce player coins as penalty
    const coinsPenalty = Math.floor(Math.random() * 10) + 5;
    setPlayerCoins(prev => Math.max(0, prev - coinsPenalty));
    
    // Add penalty log
    setBattleLogs(prev => [...prev, {
      message: `Du verlierst ${coinsPenalty} Münzen!`,
      type: 'system'
    }]);
  };
  
  // Continue after battle result
  const handleContinue = () => {
    setShowBattleDialog(false);
    setShowBattleResult(false);
    
    // Reset battle state
    setBattleStarted(false);
    setBattleLogs([]);
    
    // If player health is too low, heal a bit
    if (playerHealth < playerMaxHealth * 0.2) {
      const healAmount = Math.floor(playerMaxHealth * 0.3);
      const newPlayerHealth = Math.min(playerMaxHealth, playerHealth + healAmount);
      updatePlayerStats({ health: newPlayerHealth });
      
      toast({
        title: "Erholung",
        description: `Du erholst dich und regenerierst ${healAmount} Lebenspunkte.`,
        variant: "default",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Kampfarena</h2>
        <p className="text-game-foreground/70">Kämpfe gegen Monster und gewinne Belohnungen</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="game-card p-6">
          <h3 className="text-xl font-bold text-game-accent mb-4">Gegner</h3>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-game/50 flex items-center justify-center border-2 border-game-accent/30">
              <img 
                src="/lovable-uploads/e5758efc-bf3c-4373-87ea-1eed85e18c86.png"
                alt="Monster"
                className="h-24 w-24 object-contain blue-glow-soft" 
              />
            </div>
            <h4 className="text-lg font-medium text-game-foreground">{currentEnemy.name}</h4>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-game-foreground/70">HP</span>
                <span>{currentEnemy.health}/{currentEnemy.maxHealth}</span>
              </div>
              <div className="w-full bg-game/50 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(currentEnemy.health / currentEnemy.maxHealth) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <Sword className="h-4 w-4 text-game-accent mr-1" />
                  <span className="text-game-foreground/70">ATK: {currentEnemy.attack}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-game-accent mr-1" />
                  <span className="text-game-foreground/70">DEF: {currentEnemy.defense}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="game-card p-6">
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
        <Button 
          className="game-button flex items-center space-x-2 py-6 px-8 text-lg animate-pulse-light" 
          onClick={handleBattleStart}
        >
          <Sword className="h-6 w-6" />
          <span>Kampf beginnen</span>
        </Button>
      </div>
      
      {/* Battle Dialog */}
      <Dialog open={showBattleDialog} onOpenChange={(open) => {
        if (!open && battleStarted) {
          // Prevent closing dialog during active battle
          return;
        }
        setShowBattleDialog(open);
      }}>
        <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-game-accent">
              <Sword className="h-5 w-5 mr-2" />
              Kampfbereich
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player Stats */}
            <div className="game-card">
              <h3 className="text-game-accent mb-4">{playerName}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-1" />
                      <span>HP</span>
                    </div>
                    <span>{playerHealth}/{playerMaxHealth}</span>
                  </div>
                  <div className="w-full bg-game/50 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(playerHealth / playerMaxHealth) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Sword className="h-4 w-4 text-game-accent mr-1" />
                    <span>ATK: {playerStats.strength}</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-game-accent mr-1" />
                    <span>DEF: {playerStats.defense}</span>
                  </div>
                </div>
                
                {/* Player Actions */}
                {battleStarted && !showBattleResult && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      onClick={handlePlayerAttack}
                      className="game-button"
                    >
                      <Sword className="h-4 w-4" />
                      Angreifen
                    </Button>
                    
                    <Button 
                      onClick={handlePlayerHeal}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={playerHealth >= playerMaxHealth}
                    >
                      <Heart className="h-4 w-4" />
                      Heilen
                    </Button>
                    
                    <Button 
                      onClick={handleSkipTurn}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white col-span-2"
                    >
                      <Shield className="h-4 w-4" />
                      Verteidigen
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enemy Stats */}
            <div className="game-card">
              <h3 className="text-red-400 mb-4">{currentEnemy.name}</h3>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src={currentEnemy.image}
                    alt={currentEnemy.name}
                    className="h-16 w-16 object-contain blue-glow" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-1" />
                      <span>HP</span>
                    </div>
                    <span>{enemyHealth}/{currentEnemy.maxHealth}</span>
                  </div>
                  <div className="w-full bg-game/50 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(enemyHealth / currentEnemy.maxHealth) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Sword className="h-4 w-4 text-red-400 mr-1" />
                    <span>ATK: {currentEnemy.attack}</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-red-400 mr-1" />
                    <span>DEF: {currentEnemy.defense}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>Level: {currentEnemy.level}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Battle Log */}
          <div className="mt-4 h-40 overflow-y-auto p-2 game-card">
            <h4 className="text-game-accent mb-2">Kampflog:</h4>
            <div className="space-y-1">
              {battleLogs.map((log, index) => (
                <p 
                  key={index} 
                  className={`text-sm ${
                    log.type === 'player-attack' ? 'text-blue-400' :
                    log.type === 'enemy-attack' ? 'text-red-400' :
                    log.type === 'player-heal' ? 'text-green-400' :
                    log.type === 'player-win' ? 'text-yellow-400' :
                    log.type === 'player-lose' ? 'text-red-500' :
                    'text-game-foreground/70'
                  } ${index === battleLogs.length - 1 ? 'animate-fade-in' : ''}`}
                >
                  {log.message}
                </p>
              ))}
            </div>
          </div>
          
          {/* Battle Result */}
          {showBattleResult && (
            <div className={`game-card ${battleWon ? 'bg-green-500/20' : 'bg-red-500/20'} animate-scale-in`}>
              <div className="text-center">
                <h3 className={`text-xl font-bold ${battleWon ? 'text-green-400' : 'text-red-400'} mb-2`}>
                  {battleWon ? 'Sieg!' : 'Niederlage!'}
                </h3>
                
                {battleWon && (
                  <div className="space-y-2">
                    <p className="text-game-foreground">Du hast den Kampf gewonnen!</p>
                    <div className="flex justify-between items-center">
                      <span className="text-game-foreground/70">Münzen erhalten:</span>
                      <span className="text-yellow-400">{rewards.coins}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-game-foreground/70">Erfahrung erhalten:</span>
                      <span className="text-blue-400">{rewards.experience}</span>
                    </div>
                  </div>
                )}
                
                {!battleWon && (
                  <p className="text-game-foreground">Du hast den Kampf verloren!</p>
                )}
                
                <Button 
                  onClick={handleContinue}
                  className="mt-4 game-button"
                >
                  Fortsetzen
                </Button>
              </div>
            </div>
          )}
          
          {!battleStarted && !showBattleResult && (
            <DialogFooter>
              <Button onClick={() => setShowBattleDialog(false)}>
                Abbrechen
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GamePanel;

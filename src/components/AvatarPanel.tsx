
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, Trophy, Star, UserPlus, Shield, Sword, Zap } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useGameContext } from '@/context/GameContext';

const AvatarPanel: React.FC = () => {
  // Access game context for player info
  const { playerName, selectedAvatar } = useGameContext();

  // Character stats
  const [stats, setStats] = useState({
    strength: 12,
    defense: 8,
    agility: 10,
    intelligence: 7
  });
  
  const [availablePoints, setAvailablePoints] = useState(3);
  
  // Mock Daten
  const achievements = [
    { id: 1, title: "Erstes Monster", description: "Besiege dein erstes Monster", completed: true },
    { id: 2, title: "Sammler", description: "Sammle 5 verschiedene Gegenstände", completed: true },
    { id: 3, title: "Meister", description: "Erreiche Level 10", completed: false },
    { id: 4, title: "Schatzsucher", description: "Öffne 10 Lootboxen", completed: false },
    { id: 5, title: "Fitness Anfänger", description: "Schließe 3 Fitness-Quests ab", completed: false },
    { id: 6, title: "Marathon-Läufer", description: "Laufe insgesamt 42 km", completed: false },
  ];

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

  // Increase a stat if points are available
  const increaseStat = (stat: keyof typeof stats) => {
    if (availablePoints > 0) {
      setStats({
        ...stats,
        [stat]: stats[stat] + 1
      });
      setAvailablePoints(availablePoints - 1);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Dein Profil</h2>
        <p className="text-game-foreground/70">Passe deinen Charakter an und siehe deine Erfolge</p>
      </div>
      
      {/* Player Avatar Display */}
      <Card className="game-card p-6 flex flex-col items-center mb-8">
        <h3 className="text-game-accent mb-6 text-xl">Dein Avatar</h3>
        <div className="relative mb-6">
          <div className="w-48 h-48 relative">
            <img 
              src={getAvatarImage()} 
              alt="Player Avatar" 
              className="w-full h-full object-contain blue-glow-soft"
            />
          </div>
        </div>
        <h4 className="text-lg font-medium text-game-foreground mb-2">{playerName}</h4>
        <p className="text-sm text-game-foreground/70 mb-4">Level 5 Krieger</p>
        <div className="flex space-x-3">
          <div className="flex items-center text-sm">
            <Sword className="h-4 w-4 text-red-400 mr-1" />
            <span className="text-game-foreground/70">STR: {stats.strength}</span>
          </div>
          <div className="flex items-center text-sm">
            <Shield className="h-4 w-4 text-blue-400 mr-1" />
            <span className="text-game-foreground/70">DEF: {stats.defense}</span>
          </div>
          <div className="flex items-center text-sm">
            <Zap className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-game-foreground/70">AGI: {stats.agility}</span>
          </div>
        </div>
      </Card>
      
      <Card className="game-card flex flex-col items-center p-6 mb-8">
        <h3 className="text-game-accent mb-4 flex items-center">
          <UserPlus className="mr-2 h-5 w-5" /> Charakterentwicklung
        </h3>
        
        <p className="mb-4 text-game-foreground/70 text-sm">
          Verwende deine Punkte, um Attribute zu verbessern
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
          <div className="game-card bg-gradient-to-b from-game-accent/10 to-transparent">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Sword className="mr-2 h-4 w-4 text-red-400" />
                <span>Stärke</span>
              </div>
              <span className="text-game-highlight">{stats.strength}</span>
            </div>
            <p className="text-xs text-game-foreground/50 mb-3">Erhöht Angriffsschaden</p>
            <Button 
              size="sm" 
              className="w-full bg-game-accent hover:bg-game-accent/90"
              disabled={availablePoints <= 0}
              onClick={() => increaseStat('strength')}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Erhöhen
            </Button>
          </div>
          
          <div className="game-card bg-gradient-to-b from-game-accent/10 to-transparent">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-blue-400" />
                <span>Verteidigung</span>
              </div>
              <span className="text-game-highlight">{stats.defense}</span>
            </div>
            <p className="text-xs text-game-foreground/50 mb-3">Reduziert erlittenen Schaden</p>
            <Button 
              size="sm" 
              className="w-full bg-game-accent hover:bg-game-accent/90"
              disabled={availablePoints <= 0}
              onClick={() => increaseStat('defense')}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Erhöhen
            </Button>
          </div>
          
          <div className="game-card bg-gradient-to-b from-game-accent/10 to-transparent">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Zap className="mr-2 h-4 w-4 text-yellow-400" />
                <span>Agilität</span>
              </div>
              <span className="text-game-highlight">{stats.agility}</span>
            </div>
            <p className="text-xs text-game-foreground/50 mb-3">Erhöht Ausweichenchance</p>
            <Button 
              size="sm" 
              className="w-full bg-game-accent hover:bg-game-accent/90"
              disabled={availablePoints <= 0}
              onClick={() => increaseStat('agility')}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Erhöhen
            </Button>
          </div>
          
          <div className="game-card bg-gradient-to-b from-game-accent/10 to-transparent">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-purple-400">
                  <path d="M12 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"></path>
                  <path d="M12 6v4l2 2"></path>
                </svg>
                <span>Intelligenz</span>
              </div>
              <span className="text-game-highlight">{stats.intelligence}</span>
            </div>
            <p className="text-xs text-game-foreground/50 mb-3">Verbessert magische Fähigkeiten</p>
            <Button 
              size="sm" 
              className="w-full bg-game-accent hover:bg-game-accent/90"
              disabled={availablePoints <= 0}
              onClick={() => increaseStat('intelligence')}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Erhöhen
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <p className={`text-sm ${availablePoints > 0 ? 'text-game-accent' : 'text-game-foreground/50'}`}>
            Verfügbare Punkte: {availablePoints}
          </p>
          <p className="text-xs text-game-foreground/50 mt-1">
            Erhalte mehr Punkte durch das Abschließen von Quests
          </p>
        </div>
      </Card>
      
      <div>
        <div className="flex items-center mb-4">
          <Trophy className="text-game-accent mr-2" />
          <h3 className="text-lg text-game-accent">Erfolge</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map(achievement => (
            <Card key={achievement.id} className={`game-card flex items-center ${achievement.completed ? 'border-game-accent/50' : 'opacity-70'}`}>
              <div className="mr-4">
                {achievement.completed ? (
                  <Star className="h-6 w-6 text-game-accent animate-pulse-light" />
                ) : (
                  <Star className="h-6 w-6 text-game-foreground/30" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-game-foreground">{achievement.title}</h4>
                <p className="text-sm text-game-foreground/70">{achievement.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarPanel;

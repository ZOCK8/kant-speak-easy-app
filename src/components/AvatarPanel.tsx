
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, Trophy, Star } from 'lucide-react';

const AvatarPanel: React.FC = () => {
  // Mock Daten
  const achievements = [
    { id: 1, title: "Erstes Monster", description: "Besiege dein erstes Monster", completed: true },
    { id: 2, title: "Sammler", description: "Sammle 5 verschiedene Gegenstände", completed: true },
    { id: 3, title: "Meister", description: "Erreiche Level 10", completed: false },
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Dein Profil</h2>
        <p className="text-game-foreground/70">Passe deinen Charakter an und siehe deine Erfolge</p>
      </div>
      
      <div className="game-card flex flex-col items-center p-6 mb-8">
        <h3 className="text-game-accent mb-4">Charakterentwicklung</h3>
        <div className="flex space-x-4 mb-6">
          <Button className="bg-game-accent hover:bg-game-accent/90">
            <ArrowUp className="mr-2 h-4 w-4" />
            Stärke +1
          </Button>
          <Button className="bg-game-accent hover:bg-game-accent/90">
            <ArrowUp className="mr-2 h-4 w-4" />
            Verteidigung +1
          </Button>
        </div>
        <p className="text-xs text-game-foreground/50">Verfügbare Punkte: 3</p>
      </div>
      
      <div>
        <div className="flex items-center mb-4">
          <Trophy className="text-game-accent mr-2" />
          <h3 className="text-lg text-game-accent">Erfolge</h3>
        </div>
        
        <div className="space-y-3">
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

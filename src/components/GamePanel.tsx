
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sword, Shield, Activity } from 'lucide-react';

const GamePanel = () => {
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
              <Sword className="h-16 w-16 text-game-accent" />
            </div>
            <h4 className="text-lg font-medium text-game-foreground">Bergtroll</h4>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-game-foreground/70">HP</span>
                <span>100/100</span>
              </div>
              <div className="w-full bg-game/50 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full w-full"></div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <Sword className="h-4 w-4 text-game-accent mr-1" />
                  <span className="text-game-foreground/70">ATK: 15</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-game-accent mr-1" />
                  <span className="text-game-foreground/70">DEF: 10</span>
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
              <span className="text-game-highlight">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-game-foreground/70">Niederlagen</span>
              <span className="text-game-foreground">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-game-foreground/70">Siegesrate</span>
              <span className="text-green-400">75%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-game-foreground/70">Tötungen</span>
              <span className="text-game-highlight">42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-game-foreground/70">Höchster Schaden</span>
              <span className="text-red-400">87</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button className="game-button flex items-center space-x-2 py-6 px-8 text-lg">
          <Sword className="h-6 w-6" />
          <span>Kampf beginnen</span>
        </Button>
      </div>
    </div>
  );
};

export default GamePanel;

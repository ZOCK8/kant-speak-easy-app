
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameContext } from '@/context/GameContext';
import { Check, ArrowRight, User, Info, AlertTriangle, Sword, Shield, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WelcomeSetup: React.FC = () => {
  const { setPlayerInfo, completeTutorial, updatePlayerStats } = useGameContext();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<'player1' | 'player2' | 'player3' | 'monster'>('player1');
  const [nameError, setNameError] = useState<string>("");
  const [showAvatarAnimation, setShowAvatarAnimation] = useState(false);
  const { toast } = useToast();
  
  const steps = [
    {
      title: "Willkommen bei Zero Quest!",
      description: "Beginne dein Abenteuer und besiege mächtige Monster.",
      content: (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-36 h-36 animate-float">
            <img 
              src="/lovable-uploads/62c95b97-15d2-4d66-9bf8-f2556649b4e9.png" 
              alt="Player Avatar" 
              className="w-full h-full object-contain blue-glow"
            />
          </div>
          <p className="text-game-foreground/80 text-center max-w-md">
            Dieses kurze Tutorial wird dir helfen, mit dem Spiel zu beginnen.
            Wähle deinen Avatar und starte dein Abenteuer!
          </p>
        </div>
      )
    },
    {
      title: "Erstelle deinen Avatar",
      description: "Wähle einen Namen und ein Profilbild für deinen Charakter.",
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-game-foreground/80">
              Dein Name:
            </label>
            <Input
              id="name"
              placeholder="Gib deinen Namen ein"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              className="bg-game-secondary/70 border-game-accent/30 text-game-foreground"
            />
            {nameError && (
              <p className="text-red-400 text-xs">{nameError}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-game-foreground/80 mb-3">
              Wähle dein Avatar:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                onClick={() => {
                  setAvatar('player1');
                  setShowAvatarAnimation(true);
                  setTimeout(() => setShowAvatarAnimation(false), 500);
                }} 
                className={`p-2 cursor-pointer rounded-md flex flex-col items-center ${
                  avatar === 'player1' ? 'border-2 border-game-accent' : 'border border-game-accent/20'
                } ${showAvatarAnimation && avatar === 'player1' ? 'blue-glow' : ''}`}
              >
                <img 
                  src="/lovable-uploads/62c95b97-15d2-4d66-9bf8-f2556649b4e9.png" 
                  alt="Player 1" 
                  className="w-16 h-16 object-contain" 
                />
                <span className="text-xs mt-2">Avatar 1</span>
              </div>
              <div 
                onClick={() => {
                  setAvatar('player2');
                  setShowAvatarAnimation(true);
                  setTimeout(() => setShowAvatarAnimation(false), 500);
                }} 
                className={`p-2 cursor-pointer rounded-md flex flex-col items-center ${
                  avatar === 'player2' ? 'border-2 border-game-accent' : 'border border-game-accent/20'
                } ${showAvatarAnimation && avatar === 'player2' ? 'blue-glow' : ''}`}
              >
                <img 
                  src="/lovable-uploads/e6bb07f6-039d-4ed3-bece-ad8d405fcea4.png" 
                  alt="Player 2" 
                  className="w-16 h-16 object-contain" 
                />
                <span className="text-xs mt-2">Avatar 2</span>
              </div>
              <div 
                onClick={() => {
                  setAvatar('player3');
                  setShowAvatarAnimation(true);
                  setTimeout(() => setShowAvatarAnimation(false), 500);
                }} 
                className={`p-2 cursor-pointer rounded-md flex flex-col items-center ${
                  avatar === 'player3' ? 'border-2 border-game-accent' : 'border border-game-accent/20'
                } ${showAvatarAnimation && avatar === 'player3' ? 'blue-glow' : ''}`}
              >
                <img 
                  src="/lovable-uploads/78ff7be8-098a-4011-b094-98ab0dc84162.png" 
                  alt="Player 3" 
                  className="w-16 h-16 object-contain" 
                />
                <span className="text-xs mt-2">Avatar 3</span>
              </div>
              <div 
                onClick={() => {
                  setAvatar('monster');
                  setShowAvatarAnimation(true);
                  setTimeout(() => setShowAvatarAnimation(false), 500);
                }} 
                className={`p-2 cursor-pointer rounded-md flex flex-col items-center ${
                  avatar === 'monster' ? 'border-2 border-game-accent' : 'border border-game-accent/20'
                } ${showAvatarAnimation && avatar === 'monster' ? 'blue-glow' : ''}`}
              >
                <img 
                  src="/lovable-uploads/e5758efc-bf3c-4373-87ea-1eed85e18c86.png" 
                  alt="Monster" 
                  className="w-16 h-16 object-contain" 
                />
                <span className="text-xs mt-2">Monster</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Deine Attribute",
      description: "Lerne die wichtigsten Spielstatistiken kennen.",
      content: (
        <div className="space-y-4">
          <div className="game-card flex items-center">
            <div className="p-2 bg-game/60 rounded-full mr-3">
              <Heart className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h4 className="text-game-accent">Gesundheit (HP)</h4>
              <p className="text-xs text-game-foreground/70">Wenn deine Gesundheit auf 0 sinkt, verlierst du den Kampf.</p>
            </div>
          </div>
          
          <div className="game-card flex items-center">
            <div className="p-2 bg-game/60 rounded-full mr-3">
              <Sword className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h4 className="text-game-accent">Stärke (ATK)</h4>
              <p className="text-xs text-game-foreground/70">Bestimmt, wie viel Schaden du im Kampf verursachst.</p>
            </div>
          </div>
          
          <div className="game-card flex items-center">
            <div className="p-2 bg-game/60 rounded-full mr-3">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h4 className="text-game-accent">Verteidigung (DEF)</h4>
              <p className="text-xs text-game-foreground/70">Reduziert den Schaden, den du von Feinden erhältst.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Das Spiel verstehen",
      description: "Lerne die Grundlagen von Zero Quest.",
      content: (
        <div className="space-y-4">
          <div className="game-card flex items-center">
            <img 
              src="/lovable-uploads/01f81c53-3d24-47b7-b154-cddba1e9ce6d.png" 
              alt="Quests" 
              className="w-10 h-10 mr-3"
            />
            <div>
              <h4 className="text-game-accent">Quests</h4>
              <p className="text-xs text-game-foreground/70">Schließe Quests ab, um Erfahrung und Belohnungen zu erhalten.</p>
            </div>
          </div>
          
          <div className="game-card flex items-center">
            <img 
              src="/lovable-uploads/0b493dd9-8ad8-4a1f-81b0-f9defa2c422e.png" 
              alt="Shoes" 
              className="w-10 h-10 mr-3"
            />
            <div>
              <h4 className="text-game-accent">Ausrüstung</h4>
              <p className="text-xs text-game-foreground/70">Sammle Helm, Schuhe, Hose und Brustplatte für bessere Stats.</p>
            </div>
          </div>
          
          <div className="game-card flex items-center">
            <img 
              src="/lovable-uploads/859298bb-719b-490c-984a-5dcd22010bee.png" 
              alt="Shop" 
              className="w-10 h-10 mr-3"
            />
            <div>
              <h4 className="text-game-accent">Shop</h4>
              <p className="text-xs text-game-foreground/70">Kaufe neue Gegenstände und Ausrüstung im Shop.</p>
            </div>
          </div>
          
          <div className="game-card flex items-center">
            <img 
              src="/lovable-uploads/39e6c163-da14-47d3-a336-0456c3bbc2f2.png" 
              alt="Info" 
              className="w-10 h-10 mr-3"
            />
            <div>
              <h4 className="text-game-accent">Einstellungen</h4>
              <p className="text-xs text-game-foreground/70">Passe dein Spielerlebnis in den Einstellungen an.</p>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentStep === 1) {
      // Validate name
      if (!name.trim()) {
        setNameError("Bitte gib einen Namen ein");
        return;
      }
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save player info and complete tutorial
      setPlayerInfo(name || "Spieler123", avatar);
      
      // Initialize player stats based on avatar choice
      let initialStats = {
        health: 100,
        maxHealth: 100,
        strength: 10,
        defense: 8,
        experience: 0,
        nextLevel: 1000,
        level: 1
      };
      
      // Different starting stats based on avatar
      switch(avatar) {
        case 'player1': // Balanced
          break;
        case 'player2': // More attack
          initialStats = {
            ...initialStats,
            strength: 12,
            defense: 6
          };
          break;
        case 'player3': // More defense
          initialStats = {
            ...initialStats,
            strength: 8,
            defense: 12
          };
          break;
        case 'monster': // More health
          initialStats = {
            ...initialStats,
            health: 120,
            maxHealth: 120
          };
          break;
      }
      
      // Update player stats
      updatePlayerStats(initialStats);
      
      // Complete tutorial
      completeTutorial();
      
      toast({
        title: "Willkommen bei Zero Quest!",
        description: "Dein Profil wurde erfolgreich erstellt.",
      });
    }
  };
  
  const currentStepData = steps[currentStep];
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-moving-dots w-full h-full" style={{animationName: 'moveBackground', animationDuration: '20s', animationIterationCount: 'infinite', animationTimingFunction: 'linear'}}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-game/80 to-transparent opacity-50"></div>
      
      <div className="max-w-4xl w-full flex flex-col items-center justify-center px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-game-accent mb-6 text-center">ZERO QUEST</h1>
        
        <Card className="w-full bg-game border border-game-accent/30 text-game-foreground p-0 overflow-hidden animate-fade-in">
          <div className="bg-game-secondary p-4 border-b border-game-accent/30">
            <h2 className="text-xl font-bold text-game-accent">{currentStepData.title}</h2>
            <p className="text-sm text-game-foreground/70">{currentStepData.description}</p>
          </div>
          
          <div className="p-6">
            {currentStepData.content}
          </div>
          
          <div className="flex justify-between items-center border-t border-game-accent/30 p-4 bg-game-secondary/50">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-game-accent' : 'bg-game-accent/30'
                  }`}
                />
              ))}
            </div>
            
            <Button 
              onClick={handleNext}
              className="game-button animate-pulse-light"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Weiter <ArrowRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Starten <Check className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeSetup;

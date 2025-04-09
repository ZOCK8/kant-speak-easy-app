
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Check } from 'lucide-react';

const QuestsPanel: React.FC = () => {
  // Mock Quests
  const quests = [
    { 
      id: 1, 
      title: "Monster-Jäger", 
      description: "Besiege 5 Monster im Kampf", 
      reward: "100 XP, 50 Gold", 
      progress: 3, 
      total: 5, 
      status: "active" 
    },
    { 
      id: 2, 
      title: "Schatzkammer", 
      description: "Finde und öffne 3 Schatzkisten", 
      reward: "200 XP, 1 Selten Gegenstand", 
      progress: 1, 
      total: 3, 
      status: "active" 
    },
    { 
      id: 3, 
      title: "Bergtroll", 
      description: "Besiege den Bergtroll", 
      reward: "500 XP, Legendäre Waffe", 
      progress: 0, 
      total: 1, 
      status: "locked" 
    },
    { 
      id: 4, 
      title: "Erste Schritte", 
      description: "Schließe das Tutorial ab", 
      reward: "50 XP", 
      progress: 1, 
      total: 1, 
      status: "completed" 
    },
  ];
  
  const renderQuestCard = (quest: typeof quests[0]) => {
    const isCompleted = quest.status === "completed";
    const isLocked = quest.status === "locked";
    const progressPercent = (quest.progress / quest.total) * 100;
    
    return (
      <Card 
        key={quest.id} 
        className={`game-card p-4 mb-4 ${isCompleted ? 'border-green-500/30' : isLocked ? 'opacity-60' : ''}`}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-lg font-medium ${isCompleted ? 'text-green-400' : 'text-game-accent'}`}>
            {quest.title}
            {isCompleted && <Check className="inline-block ml-2 h-4 w-4" />}
          </h3>
          {isLocked && <Clock className="text-game-foreground/50 h-5 w-5" />}
        </div>
        
        <p className="text-sm text-game-foreground/80 mb-4">{quest.description}</p>
        
        {!isLocked && !isCompleted && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Fortschritt</span>
              <span>{quest.progress}/{quest.total}</span>
            </div>
            <div className="w-full bg-game/50 rounded-full h-2">
              <div 
                className="bg-game-accent h-2 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-xs text-game-foreground/70">Belohnung: {quest.reward}</span>
          </div>
          
          {!isLocked && !isCompleted && quest.progress >= quest.total && (
            <Button size="sm" className="bg-game-accent hover:bg-game-accent/80 text-xs">
              Abschließen
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Quests</h2>
        <p className="text-game-foreground/70">Schließe Quests ab, um Belohnungen zu erhalten</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg text-game-accent mb-3 flex items-center">
            <Clock className="mr-2 h-5 w-5" /> Aktive Quests
          </h3>
          <div>
            {quests.filter(q => q.status === "active").map(renderQuestCard)}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg text-game-accent mb-3 flex items-center">
            <Check className="mr-2 h-5 w-5" /> Abgeschlossene Quests
          </h3>
          <div>
            {quests.filter(q => q.status === "completed").map(renderQuestCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestsPanel;

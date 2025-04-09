
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Check, AlertTriangle, Coins, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QuestEditor from './QuestEditor';
import RewardPanel from './RewardPanel';

const QuestsPanel: React.FC = () => {
  const { toast } = useToast();
  
  // Quest editor state
  const [editingQuest, setEditingQuest] = useState<number | null>(null);
  
  // Reward panel state
  const [showReward, setShowReward] = useState(false);
  const [completedQuest, setCompletedQuest] = useState<typeof quests[0] | null>(null);
  
  // Mock Quests with rewards for character development
  const [quests, setQuests] = useState([
    { 
      id: 1, 
      title: "Monster-Jäger", 
      description: "Besiege 5 Monster im Kampf", 
      reward: { 
        xp: 100, 
        gold: 50,
        statPoints: 1
      }, 
      progress: 3, 
      total: 5, 
      status: "active" 
    },
    { 
      id: 2, 
      title: "Schatzkammer", 
      description: "Finde und öffne 3 Schatzkisten", 
      reward: { 
        xp: 200, 
        gold: 100,
        statPoints: 1
      }, 
      progress: 1, 
      total: 3, 
      status: "active" 
    },
    { 
      id: 3, 
      title: "Bergtroll", 
      description: "Besiege den Bergtroll", 
      reward: { 
        xp: 500, 
        gold: 300,
        statPoints: 2,
        item: "Trollhammer"
      }, 
      progress: 0, 
      total: 1, 
      status: "locked" 
    },
    { 
      id: 4, 
      title: "Erste Schritte", 
      description: "Schließe das Tutorial ab", 
      reward: { 
        xp: 50,
        statPoints: 0
      }, 
      progress: 1, 
      total: 1, 
      status: "completed" 
    },
  ]);
  
  // Open quest editor
  const openQuestEditor = (id: number) => {
    setEditingQuest(id);
  };
  
  // Close quest editor
  const closeQuestEditor = () => {
    setEditingQuest(null);
  };
  
  // Update quest progress
  const updateQuestProgress = (id: number, newProgress: number) => {
    setQuests(quests.map(quest => {
      if (quest.id === id) {
        toast({
          description: `${quest.title}: Fortschritt auf ${newProgress}/${quest.total} aktualisiert`,
          variant: "default",
        });
        return { ...quest, progress: newProgress };
      }
      return quest;
    }));
  };
  
  // Complete a quest and show rewards
  const completeQuest = (id: number) => {
    const quest = quests.find(q => q.id === id);
    
    if (quest && quest.progress >= quest.total) {
      setCompletedQuest(quest);
      setShowReward(true);
      
      setQuests(quests.map(q => {
        if (q.id === id) {
          return { ...q, status: "completed" };
        }
        return q;
      }));
    }
  };
  
  // Close reward panel
  const closeRewardPanel = () => {
    setShowReward(false);
    setCompletedQuest(null);
    
    toast({
      title: "Quest abgeschlossen!",
      description: "Belohnungen wurden deinem Konto gutgeschrieben.",
      variant: "default",
    });
  };
  
  // Simulate progress for a quest (for demo purposes)
  const progressQuest = (id: number) => {
    setQuests(quests.map(quest => {
      if (quest.id === id && quest.status === "active" && quest.progress < quest.total) {
        const newProgress = quest.progress + 1;
        
        toast({
          description: `${quest.title}: ${newProgress}/${quest.total} abgeschlossen`,
          variant: "default",
        });
        
        return { ...quest, progress: newProgress };
      }
      return quest;
    }));
  };
  
  // Find the currently editing quest
  const currentEditingQuest = quests.find(q => q.id === editingQuest);
  
  const renderQuestCard = (quest: typeof quests[0]) => {
    const isCompleted = quest.status === "completed";
    const isLocked = quest.status === "locked";
    const progressPercent = (quest.progress / quest.total) * 100;
    
    return (
      <Card 
        key={quest.id} 
        className={`game-card p-4 mb-4 ${isCompleted ? 'border-green-500/30' : isLocked ? 'opacity-60' : ''} cursor-pointer hover:border-game-accent/50 transition-colors`}
        onClick={() => !isLocked && openQuestEditor(quest.id)}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-lg font-medium ${isCompleted ? 'text-green-400' : 'text-game-accent'}`}>
            {quest.title}
            {isCompleted && <Check className="inline-block ml-2 h-4 w-4" />}
          </h3>
          {isLocked && <AlertTriangle className="text-game-foreground/50 h-5 w-5" />}
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
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-xs text-game-foreground/70">Belohnung:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs bg-game/50 px-2 py-1 rounded-full flex items-center">
                <Shield className="h-3 w-3 mr-1 text-purple-400" />
                {quest.reward.statPoints} Attributpunkte
              </span>
              <span className="text-xs bg-game/50 px-2 py-1 rounded-full flex items-center">
                XP +{quest.reward.xp}
              </span>
              {quest.reward.gold && (
                <span className="text-xs bg-game/50 px-2 py-1 rounded-full flex items-center">
                  <Coins className="h-3 w-3 mr-1 text-yellow-400" />
                  {quest.reward.gold}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            {!isLocked && !isCompleted && (
              <>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-game-foreground/70 border-game-foreground/20 hover:bg-game-secondary text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    progressQuest(quest.id);
                  }}
                >
                  Fortschritt
                </Button>
                
                {quest.progress >= quest.total && (
                  <Button 
                    size="sm" 
                    className="bg-game-accent hover:bg-game-accent/80 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      completeQuest(quest.id);
                    }}
                  >
                    Abschließen
                  </Button>
                )}
              </>
            )}
          </div>
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
        
        <div>
          <h3 className="text-lg text-game-accent mb-3 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" /> Gesperrte Quests
          </h3>
          <div>
            {quests.filter(q => q.status === "locked").map(renderQuestCard)}
          </div>
        </div>
      </div>
      
      {/* Quest Editor Dialog */}
      {currentEditingQuest && (
        <QuestEditor
          isOpen={editingQuest !== null}
          onClose={closeQuestEditor}
          quest={currentEditingQuest}
          onUpdate={updateQuestProgress}
          onComplete={completeQuest}
        />
      )}
      
      {/* Reward Panel Dialog */}
      {completedQuest && (
        <RewardPanel
          isOpen={showReward}
          onClose={closeRewardPanel}
          questTitle={completedQuest.title}
          reward={completedQuest.reward}
        />
      )}
    </div>
  );
};

export default QuestsPanel;

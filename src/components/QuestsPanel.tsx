
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Check, AlertTriangle, Coins, Shield, RotateCcw } from 'lucide-react';
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
  
  // Difficulty levels
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  
  // Next quest reset time
  const [nextResetTime, setNextResetTime] = useState<Date>(new Date());
  
  // Get difficulty multiplier
  const getDifficultyMultiplier = () => {
    switch (difficultyLevel) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 1;
    }
  };
  
  // Mock Quests with fitness challenges
  const [quests, setQuests] = useState([
    { 
      id: 1, 
      title: "Liegestütze", 
      description: `Mache ${20 * getDifficultyMultiplier()} Liegestütze für bessere Kraft`, 
      reward: { 
        xp: 100, 
        gold: 50,
        statPoints: 1
      }, 
      progress: 0, 
      total: 20 * getDifficultyMultiplier(), 
      status: "active" 
    },
    { 
      id: 2, 
      title: "Kniebeugen", 
      description: `Mache ${20 * getDifficultyMultiplier()} Kniebeugen für mehr Ausdauer`, 
      reward: { 
        xp: 150, 
        gold: 75,
        statPoints: 1
      }, 
      progress: 0, 
      total: 20 * getDifficultyMultiplier(), 
      status: "active" 
    },
    { 
      id: 3, 
      title: "Sit-Ups", 
      description: `Mache ${20 * getDifficultyMultiplier()} Sit-Ups für einen starken Core`, 
      reward: { 
        xp: 120, 
        gold: 60,
        statPoints: 1,
        item: "Bauchmuskel-Verstärker"
      }, 
      progress: 0, 
      total: 20 * getDifficultyMultiplier(), 
      status: "active" 
    },
    { 
      id: 4, 
      title: "Laufen", 
      description: `Laufe ${2500 * getDifficultyMultiplier()} Meter für Ausdauer`, 
      reward: { 
        xp: 200,
        gold: 100,
        statPoints: 2,
        item: "Laufschuhe +1"
      }, 
      progress: 0, 
      total: 2500 * getDifficultyMultiplier(), 
      status: "active" 
    },
    { 
      id: 5, 
      title: "Schlaf", 
      description: `Schlafe ${8 * getDifficultyMultiplier()} Stunden für Regeneration`, 
      reward: { 
        xp: 80,
        gold: 40,
        statPoints: 1,
        item: "Regenerationstrank"
      }, 
      progress: 0, 
      total: 8 * getDifficultyMultiplier(), 
      status: "active" 
    },
    { 
      id: 6, 
      title: "Halbmarathon", 
      description: "Laufe einen Halbmarathon (21 km)", 
      reward: { 
        xp: 500, 
        gold: 300,
        statPoints: 3,
        item: "Legendäre Laufschuhe"
      }, 
      progress: 0, 
      total: 21000, 
      status: "locked" 
    },
    { 
      id: 7, 
      title: "Erste Übung", 
      description: "Schließe deine erste Fitnessübung ab", 
      reward: { 
        xp: 50,
        statPoints: 1
      }, 
      progress: 1, 
      total: 1, 
      status: "completed" 
    },
  ]);
  
  // Calculate next reset time (midnight tonight)
  useEffect(() => {
    const calculateNextResetTime = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      setNextResetTime(tomorrow);
    };
    
    calculateNextResetTime();
    
    // Check for reset every minute
    const interval = setInterval(() => {
      const now = new Date();
      
      // If current time is past the reset time, reset quests and calculate next reset
      if (now >= nextResetTime) {
        resetQuests();
        calculateNextResetTime();
        
        toast({
          title: "Quests zurückgesetzt!",
          description: "Neue tägliche Quests sind verfügbar.",
          variant: "default",
        });
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, [nextResetTime]);
  
  // Reset all active quests to 0 progress
  const resetQuests = () => {
    setQuests(quests.map(quest => {
      if (quest.status === "active") {
        return { ...quest, progress: 0 };
      }
      return quest;
    }));
  };
  
  // Format time until reset
  const formatTimeUntilReset = () => {
    const now = new Date();
    const diff = nextResetTime.getTime() - now.getTime();
    
    // Convert to hours, minutes
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
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
  
  // Manually trigger quest reset (dev feature)
  const manualReset = () => {
    resetQuests();
    
    toast({
      title: "Quests manuell zurückgesetzt!",
      description: "Alle Quest-Fortschritte wurden zurückgesetzt.",
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
  
  // Change difficulty level
  const changeDifficulty = (level: 'easy' | 'medium' | 'hard') => {
    setDifficultyLevel(level);
    
    // Update quest totals based on new difficulty
    setQuests(quests.map(quest => {
      if (quest.id <= 5) { // Only affect the first 5 exercise quests
        const baseAmount = quest.id === 4 ? 2500 : quest.id === 5 ? 8 : 20;
        const newTotal = baseAmount * (level === 'easy' ? 1 : level === 'medium' ? 2 : 3);
        
        return {
          ...quest,
          description: quest.description.replace(/\d+/, newTotal.toString()),
          total: newTotal
        };
      }
      return quest;
    }));
    
    toast({
      description: `Schwierigkeitsgrad auf ${level === 'easy' ? 'Einfach' : level === 'medium' ? 'Mittel' : 'Schwer'} gesetzt`,
      variant: "default",
    });
  };
  
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
                  className="text-white border-game-foreground/20 hover:bg-game-secondary text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    progressQuest(quest.id);
                  }}
                >
                  <span className="text-white">Fortschritt</span>
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
                    <span className="text-white">Abschließen</span>
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
        <h2 className="text-2xl font-bold text-game-accent mb-2">Fitness Quests</h2>
        <p className="text-game-foreground/70">Schließe Übungen ab, um Belohnungen zu erhalten</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        {/* Difficulty selector */}
        <div className="game-card p-3 flex-1 mr-4">
          <h3 className="text-game-accent mb-2 text-sm">Schwierigkeitsgrad</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={difficultyLevel === 'easy' ? 'default' : 'outline'}
              className={difficultyLevel === 'easy' ? 'bg-game-accent text-white' : 'border-game-accent/30 text-white'}
              onClick={() => changeDifficulty('easy')}
              size="sm"
            >
              <span className="text-white">Einfach</span>
            </Button>
            <Button 
              variant={difficultyLevel === 'medium' ? 'default' : 'outline'}
              className={difficultyLevel === 'medium' ? 'bg-game-accent text-white' : 'border-game-accent/30 text-white'}
              onClick={() => changeDifficulty('medium')}
              size="sm"
            >
              <span className="text-white">Mittel</span>
            </Button>
            <Button 
              variant={difficultyLevel === 'hard' ? 'default' : 'outline'}
              className={difficultyLevel === 'hard' ? 'bg-game-accent text-white' : 'border-game-accent/30 text-white'}
              onClick={() => changeDifficulty('hard')}
              size="sm"
            >
              <span className="text-white">Schwer</span>
            </Button>
          </div>
        </div>
        
        {/* Quest reset timer */}
        <div className="game-card p-3 flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-game-accent text-sm">Nächster Reset</h3>
              <div className="flex items-center mt-1">
                <Clock className="h-4 w-4 text-game-foreground/70 mr-2" />
                <span className="text-game-highlight">{formatTimeUntilReset()}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-white border-game-foreground/20"
              onClick={manualReset}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              <span className="text-white">Reset</span>
            </Button>
          </div>
        </div>
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

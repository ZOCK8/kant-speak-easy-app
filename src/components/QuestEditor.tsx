
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface QuestEditorProps {
  isOpen: boolean;
  onClose: () => void;
  quest: {
    id: number;
    title: string;
    description: string;
    progress: number;
    total: number;
    status: string;
    reward: {
      xp: number;
      gold?: number;
      statPoints: number;
      item?: string;
    };
  };
  onUpdate: (id: number, progress: number) => void;
  onComplete: (id: number) => void;
}

const QuestEditor: React.FC<QuestEditorProps> = ({ isOpen, onClose, quest, onUpdate, onComplete }) => {
  const [currentProgress, setCurrentProgress] = useState(quest.progress);
  
  // Update progress locally
  const updateProgress = (amount: number) => {
    const newProgress = Math.max(0, Math.min(quest.total, currentProgress + amount));
    setCurrentProgress(newProgress);
  };
  
  // Save progress changes
  const handleSave = () => {
    onUpdate(quest.id, currentProgress);
    onClose();
  };
  
  // Complete the quest if progress meets requirements
  const handleComplete = () => {
    if (currentProgress >= quest.total) {
      onComplete(quest.id);
      onClose();
    }
  };
  
  const progressPercentage = (currentProgress / quest.total) * 100;
  const isCompletable = currentProgress >= quest.total && quest.status !== 'completed';
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground max-w-md">
        <DialogHeader>
          <DialogTitle className="text-game-accent text-xl">{quest.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-game-foreground/70">{quest.description}</p>
          
          {quest.status !== 'completed' ? (
            <>
              <div className="flex justify-between items-center text-sm mb-1">
                <span>Fortschritt</span>
                <span>{currentProgress}/{quest.total}</span>
              </div>
              <div className="w-full bg-game/50 rounded-full h-2 mb-4">
                <div
                  className="bg-game-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              
              <div className="flex justify-center items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => updateProgress(-1)}
                  disabled={currentProgress <= 0}
                  className="border-game-accent/30 text-game-accent hover:bg-game-accent/20"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="text-xl font-bold text-game-accent">{currentProgress}</div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => updateProgress(1)}
                  disabled={currentProgress >= quest.total}
                  className="border-game-accent/30 text-game-accent hover:bg-game-accent/20"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-green-400 font-medium text-center py-2">
              Diese Quest wurde bereits abgeschlossen!
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-game-foreground/20 text-game-foreground/70">
            Abbrechen
          </Button>
          
          {quest.status !== 'completed' && (
            <>
              <Button onClick={handleSave} variant="outline" className="border-game-accent/30 text-game-accent">
                Fortschritt speichern
              </Button>
              
              {isCompletable && (
                <Button onClick={handleComplete} className="bg-game-accent hover:bg-game-accent/80">
                  Abschließen
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestEditor;

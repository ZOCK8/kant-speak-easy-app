
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Coins, Shield } from 'lucide-react';

interface RewardPanelProps {
  isOpen: boolean;
  onClose: () => void;
  questTitle: string;
  reward: {
    xp: number;
    gold?: number;
    statPoints: number;
    item?: string;
  };
}

const RewardPanel: React.FC<RewardPanelProps> = ({ isOpen, onClose, questTitle, reward }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground max-w-md">
        <DialogHeader>
          <DialogTitle className="text-game-accent text-xl">Quest abgeschlossen!</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-6">
          <div className="text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-game-foreground mb-1">{questTitle}</h3>
            <p className="text-game-foreground/70">Du hast folgende Belohnungen erhalten:</p>
          </div>
          
          <div className="bg-game/30 rounded-lg p-4 border border-game-accent/20">
            <div className="grid grid-cols-1 gap-4">
              {/* XP Reward */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                    <Trophy className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-game-foreground">Erfahrung</span>
                </div>
                <span className="text-blue-400 font-medium">+{reward.xp} XP</span>
              </div>
              
              {/* Gold Reward if available */}
              {reward.gold && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-900/50 flex items-center justify-center mr-3">
                      <Coins className="h-4 w-4 text-yellow-400" />
                    </div>
                    <span className="text-game-foreground">Gold</span>
                  </div>
                  <span className="text-yellow-400 font-medium">+{reward.gold}</span>
                </div>
              )}
              
              {/* Stat Points Reward */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                    <Shield className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-game-foreground">Attributpunkte</span>
                </div>
                <span className="text-purple-400 font-medium">+{reward.statPoints}</span>
              </div>
              
              {/* Item Reward if available */}
              {reward.item && (
                <div className="border-t border-game-accent/20 pt-4 mt-2">
                  <div className="flex items-center justify-center flex-col">
                    <div className="w-16 h-16 rounded-lg bg-game-accent/20 flex items-center justify-center mb-2 border border-game-accent/30">
                      {/* Placeholder for item image */}
                      <div className="text-2xl">🗡️</div>
                    </div>
                    <span className="text-game-accent font-medium">{reward.item}</span>
                    <span className="text-game-foreground/60 text-xs mt-1">Neuer Gegenstand</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="bg-game-accent hover:bg-game-accent/80 w-full">
            Belohnungen einsammeln
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardPanel;

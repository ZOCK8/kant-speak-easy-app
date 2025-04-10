
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Sparkles, MoreHorizontal, Coins, X, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useGameContext } from '@/context/GameContext';

// Lootbox Types
type LootboxType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  contents: string[];
  dropRates: {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
  };
};

const ShopPanel: React.FC = () => {
  const { toast } = useToast();
  const { playerCoins, setPlayerCoins, addInventoryItem } = useGameContext();
  const [lastReward, setLastReward] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedLootbox, setSelectedLootbox] = useState<LootboxType | null>(null);
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(false);
  
  // Mock Data
  const lootboxes: LootboxType[] = [
    {
      id: 1,
      name: "Silber Lootbox",
      description: "Enthält zufällige Gegenstände mit kleiner Chance auf seltene Items",
      price: 50,
      image: "/lovable-uploads/a6d59361-5a61-40c0-b0c8-e09368908597.png",
      rarity: "common",
      contents: ["Holzschwert", "Lederharnisch", "Heiltrank", "Eisenhelm"],
      dropRates: {
        common: 70,
        rare: 25,
        epic: 4,
        legendary: 1
      }
    },
    {
      id: 2,
      name: "Gold Lootbox",
      description: "Höhere Chance auf seltene Gegenstände und Ausrüstung",
      price: 150,
      image: "/lovable-uploads/0faa1740-cb7d-4b3f-93f3-015b333f54f4.png",
      rarity: "rare",
      contents: ["Stahlschild", "Magiestab", "Energietrank", "Rubinring"],
      dropRates: {
        common: 40,
        rare: 40,
        epic: 15,
        legendary: 5
      }
    },
    {
      id: 3,
      name: "Diamant Lootbox",
      description: "Garantiert mindestens einen epischen Gegenstand",
      price: 300,
      image: "/lovable-uploads/efeeb069-1c5e-4bc2-8f9b-6ad11b096444.png",
      rarity: "epic",
      contents: ["Drachenschuppe", "Legendäres Schwert", "Magischer Bogen", "Verzauberter Helm"],
      dropRates: {
        common: 10,
        rare: 30,
        epic: 40,
        legendary: 20
      }
    },
    {
      id: 4,
      name: "Legendäre Lootbox",
      description: "Die ultimative Schatzkiste mit den besten Belohnungen",
      price: 500,
      image: "/lovable-uploads/efeeb069-1c5e-4bc2-8f9b-6ad11b096444.png",
      rarity: "legendary",
      contents: ["Drachenschwert", "Göttliche Rüstung", "Unsterblichkeitstrank", "Mythische Krone"],
      dropRates: {
        common: 0,
        rare: 20,
        epic: 50,
        legendary: 30
      }
    }
  ];
  
  // Possible rewards by rarity
  const possibleRewardsByRarity = {
    common: [
      "Holzschwert", "Lederharnisch", "Heiltrank", "Eisenhelm", "Kleiner Energietrank"
    ],
    rare: [
      "Stahlschild", "Magiestab", "Energietrank", "Rubinring", "Silberne Rüstung"
    ],
    epic: [
      "Drachenschuppe", "Magischer Bogen", "Verzauberter Helm", "Mystischer Dolch"
    ],
    legendary: [
      "Legendäres Schwert", "Göttliche Rüstung", "Unsterblichkeitstrank", "Mythische Krone"
    ]
  };
  
  // Show lootbox details
  const showDetails = (lootbox: LootboxType) => {
    setSelectedLootbox(lootbox);
    setShowDetailsDialog(true);
  };
  
  // Generate random reward based on rarity drop rates
  const generateReward = (lootbox: LootboxType) => {
    const random = Math.random() * 100;
    let rarity: 'common' | 'rare' | 'epic' | 'legendary';
    
    if (random <= lootbox.dropRates.legendary) {
      rarity = 'legendary';
    } else if (random <= lootbox.dropRates.legendary + lootbox.dropRates.epic) {
      rarity = 'epic';
    } else if (random <= lootbox.dropRates.legendary + lootbox.dropRates.epic + lootbox.dropRates.rare) {
      rarity = 'rare';
    } else {
      rarity = 'common';
    }
    
    const possibleRewards = possibleRewardsByRarity[rarity];
    const reward = possibleRewards[Math.floor(Math.random() * possibleRewards.length)];
    
    return { item: reward, rarity };
  };
  
  // Open lootbox with animation
  const openLootbox = (lootbox: LootboxType) => {
    if (playerCoins >= lootbox.price) {
      setPlayerCoins(prev => prev - lootbox.price);
      setSelectedLootbox(lootbox);
      
      // Start opening animation
      setShowOpeningAnimation(true);
      
      // After animation, generate reward
      setTimeout(() => {
        const { item, rarity } = generateReward(lootbox);
        
        // Add item to player inventory
        if (addInventoryItem) {
          addInventoryItem({
            id: Date.now(),
            name: item,
            type: getItemType(item),
            rarity: rarity,
            stats: getItemStats(rarity)
          });
        }
        
        setLastReward(item);
        setShowOpeningAnimation(false);
      }, 2000);
    } else {
      toast({
        title: "Nicht genug Münzen",
        description: `Du benötigst ${lootbox.price} Münzen, um diese Lootbox zu kaufen.`,
        variant: "destructive",
      });
    }
  };
  
  // Helper function to determine item type
  const getItemType = (item: string): 'weapon' | 'armor' | 'potion' | 'accessory' => {
    if (item.includes('Schwert') || item.includes('Stab') || item.includes('Bogen') || item.includes('Dolch')) {
      return 'weapon';
    } else if (item.includes('Rüstung') || item.includes('Helm') || item.includes('Harnisch') || item.includes('Schild')) {
      return 'armor';
    } else if (item.includes('Trank')) {
      return 'potion';
    } else {
      return 'accessory';
    }
  };
  
  // Helper function to generate item stats based on rarity
  const getItemStats = (rarity: string): { attack?: number; defense?: number; health?: number } => {
    switch(rarity) {
      case 'common':
        return { attack: Math.floor(Math.random() * 5) + 1, defense: Math.floor(Math.random() * 5) + 1 };
      case 'rare':
        return { attack: Math.floor(Math.random() * 10) + 5, defense: Math.floor(Math.random() * 10) + 5 };
      case 'epic':
        return { attack: Math.floor(Math.random() * 15) + 10, defense: Math.floor(Math.random() * 15) + 10, health: Math.floor(Math.random() * 20) + 10 };
      case 'legendary':
        return { attack: Math.floor(Math.random() * 25) + 15, defense: Math.floor(Math.random() * 25) + 15, health: Math.floor(Math.random() * 50) + 20 };
      default:
        return { attack: 1, defense: 1 };
    }
  };
  
  // Background color based on rarity
  const rarityColors = {
    common: "from-gray-400/20 to-gray-500/30",
    rare: "from-yellow-400/20 to-yellow-500/30",
    epic: "from-purple-400/20 to-purple-500/30",
    legendary: "from-blue-400/20 to-blue-500/30"
  };
  
  // Text color based on rarity
  const rarityTextColors = {
    common: "text-gray-200",
    rare: "text-yellow-400",
    epic: "text-purple-400",
    legendary: "text-blue-400"
  };
  
  // Sparkle effects based on rarity
  const raritySparkles = {
    common: 0,
    rare: 1,
    epic: 2,
    legendary: 3
  };
  
  return (
    <div className="space-y-6 relative">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Lootbox Shop</h2>
        <p className="text-game-foreground/70">Kaufe und öffne Lootboxen, um seltene Gegenstände zu erhalten</p>
      </div>
      
      <div className="flex justify-end mb-4">
        <div className="bg-game-secondary rounded-full px-4 py-1 flex items-center border border-game-accent/30">
          <Coins className="h-4 w-4 text-yellow-400 mr-2" />
          <span className="text-game-foreground">{playerCoins} Münzen</span>
        </div>
      </div>
      
      {lastReward && (
        <Card className="game-card bg-gradient-to-b from-game-accent/20 to-game-secondary mb-6 animate-fade-in">
          <CardContent className="pt-6 text-center">
            <Sparkles className="h-6 w-6 text-yellow-400 mx-auto mb-2 animate-pulse-light" />
            <h3 className="text-lg text-game-accent mb-2">Belohnung erhalten!</h3>
            <p className="text-xl font-bold text-game-highlight">{lastReward}</p>
            <Button 
              onClick={() => setLastReward(null)}
              variant="outline" 
              className="mt-4 text-game-accent border-game-accent/30 hover:bg-game-accent/10"
            >
              Schließen
            </Button>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lootboxes.map(lootbox => (
          <Card 
            key={lootbox.id} 
            className={`game-card bg-gradient-to-b ${rarityColors[lootbox.rarity]} hover:shadow-lg transition-shadow`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg ${rarityTextColors[lootbox.rarity]}`}>{lootbox.name}</h3>
                <div className="flex">
                  {[...Array(raritySparkles[lootbox.rarity])].map((_, i) => (
                    <Sparkles key={i} className="h-4 w-4 text-yellow-400 -ml-1 animate-pulse-light" />
                  ))}
                </div>
              </div>
              
              <div className="flex mb-4">
                <div className="bg-game-secondary/70 rounded-md p-2 border border-game-accent/20 mr-4 flex items-center justify-center w-1/3">
                  <img 
                    src={lootbox.image} 
                    alt={lootbox.name} 
                    className="h-16 w-16 object-contain blue-glow-soft" 
                  />
                </div>
                <div className="w-2/3">
                  <p className="text-sm text-game-foreground/80 mb-2">{lootbox.description}</p>
                  <div className="flex items-center">
                    <Coins className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-game-highlight">{lootbox.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-game-foreground border-game-foreground/20 hover:bg-game-secondary"
                  onClick={() => showDetails(lootbox)}
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="ml-1">Details</span>
                </Button>
                
                <Button 
                  className={`bg-game-accent hover:bg-game-accent/90 ${playerCoins < lootbox.price ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => openLootbox(lootbox)}
                  disabled={playerCoins < lootbox.price}
                >
                  Kaufen
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Lootbox Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        {selectedLootbox && (
          <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <div className="mr-2">
                  <img 
                    src={selectedLootbox.image} 
                    alt={selectedLootbox.name} 
                    className="h-8 w-8 object-contain" 
                  />
                </div>
                <span className={rarityTextColors[selectedLootbox.rarity]}>
                  {selectedLootbox.name}
                </span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-sm text-game-foreground/80">{selectedLootbox.description}</p>
              
              <div className="game-card bg-game/50 p-3">
                <h4 className="text-game-accent mb-2 text-sm">Mögliche Belohnungen:</h4>
                <ul className="space-y-1 text-xs">
                  {selectedLootbox.contents.map((item, index) => (
                    <li key={index} className="text-game-foreground/80">• {item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="game-card bg-game/50 p-3">
                <h4 className="text-game-accent mb-2 text-sm">Dropchancen:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-200">Gewöhnlich</span>
                    <span className="text-xs text-gray-200">{selectedLootbox.dropRates.common}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-yellow-400">Selten</span>
                    <span className="text-xs text-yellow-400">{selectedLootbox.dropRates.rare}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-purple-400">Episch</span>
                    <span className="text-xs text-purple-400">{selectedLootbox.dropRates.epic}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-400">Legendär</span>
                    <span className="text-xs text-blue-400">{selectedLootbox.dropRates.legendary}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-game-highlight">{selectedLootbox.price}</span>
                </div>
                
                <Button 
                  onClick={() => {
                    setShowDetailsDialog(false);
                    openLootbox(selectedLootbox);
                  }}
                  disabled={playerCoins < selectedLootbox.price}
                  className="bg-game-accent hover:bg-game-accent/90"
                >
                  Kaufen
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Lootbox Opening Animation */}
      {showOpeningAnimation && selectedLootbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative">
            <div className="animate-pulse-light blue-glow">
              <img 
                src={selectedLootbox.image} 
                alt="Opening Lootbox" 
                className="h-32 w-32 animate-float" 
              />
            </div>
            <div className="mt-4 text-center text-game-accent animate-pulse-light">
              Öffne Lootbox...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPanel;

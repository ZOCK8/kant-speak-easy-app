
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Sparkles, MoreHorizontal, Coins } from 'lucide-react';

// Lootbox Typen
type LootboxType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
};

const ShopPanel: React.FC = () => {
  // Mock Daten
  const [playerCoins, setPlayerCoins] = useState(250);
  const [lastReward, setLastReward] = useState<string | null>(null);
  
  const lootboxes: LootboxType[] = [
    {
      id: 1,
      name: "Standard Lootbox",
      description: "Enthält zufällige Gegenstände mit kleiner Chance auf seltene Items",
      price: 50,
      image: "/placeholder.svg",
      rarity: "common"
    },
    {
      id: 2,
      name: "Seltene Lootbox",
      description: "Höhere Chance auf seltene Gegenstände und Ausrüstung",
      price: 150,
      image: "/placeholder.svg",
      rarity: "rare"
    },
    {
      id: 3,
      name: "Epische Lootbox",
      description: "Garantiert mindestens einen epischen Gegenstand",
      price: 300,
      image: "/placeholder.svg",
      rarity: "epic"
    },
    {
      id: 4,
      name: "Legendäre Lootbox",
      description: "Die ultimative Schatzkiste mit den besten Belohnungen",
      price: 500,
      image: "/placeholder.svg",
      rarity: "legendary"
    }
  ];
  
  // Mögliche Belohnungen
  const possibleRewards = [
    "Holzschwert",
    "Lederharnisch",
    "Eisenhelm",
    "Heiltrank",
    "Energietrank",
    "Stahlschild",
    "Magiestab",
    "Rubinring",
    "Drachenschuppe",
    "Legendäres Schwert"
  ];
  
  const openLootbox = (lootbox: LootboxType) => {
    if (playerCoins >= lootbox.price) {
      setPlayerCoins(prev => prev - lootbox.price);
      
      // Zufällige Belohnung auswählen
      const reward = possibleRewards[Math.floor(Math.random() * possibleRewards.length)];
      setLastReward(reward);
    }
  };
  
  // Hintergrundfarbe basierend auf Seltenheit
  const rarityColors = {
    common: "from-gray-400/20 to-gray-500/30",
    rare: "from-blue-400/20 to-blue-500/30",
    epic: "from-purple-400/20 to-purple-500/30",
    legendary: "from-yellow-400/20 to-yellow-500/30"
  };
  
  // Sparkle-Effekte basierend auf Seltenheit
  const raritySparkles = {
    common: 0,
    rare: 1,
    epic: 2,
    legendary: 3
  };
  
  return (
    <div className="space-y-6">
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
        <Card className="game-card bg-gradient-to-b from-game-accent/20 to-game-secondary mb-6">
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
                <h3 className="text-lg text-game-accent">{lootbox.name}</h3>
                <div className="flex">
                  {[...Array(raritySparkles[lootbox.rarity])].map((_, i) => (
                    <Sparkles key={i} className="h-4 w-4 text-yellow-400 -ml-1 animate-pulse-light" />
                  ))}
                </div>
              </div>
              
              <div className="flex mb-4">
                <div className="bg-game-secondary/70 rounded-md p-2 border border-game-accent/20 mr-4 flex items-center justify-center">
                  <Package className="h-12 w-12 text-game-accent" />
                </div>
                <div>
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
                  className="text-game-foreground/70 border-game-foreground/20 hover:bg-game-secondary"
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
    </div>
  );
};

export default ShopPanel;

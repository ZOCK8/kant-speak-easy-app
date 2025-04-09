
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Sword, PlusCircle, Info, Trash2 } from 'lucide-react';

// Define item types
type ItemType = 'weapon' | 'armor' | 'potion' | 'misc';

// Define item interface
interface Item {
  id: number;
  name: string;
  description: string;
  type: ItemType;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  stats?: {
    attack?: number;
    defense?: number;
    health?: number;
  };
  equipped?: boolean;
}

const InventoryPanel: React.FC = () => {
  // Mock inventory items
  const [items, setItems] = React.useState<Item[]>([
    {
      id: 1,
      name: "Rostiges Schwert",
      description: "Ein altes, rostiges Schwert. Besser als nichts.",
      type: "weapon",
      rarity: "common",
      icon: "⚔️",
      stats: { attack: 5 },
      equipped: true
    },
    {
      id: 2,
      name: "Lederharnisch",
      description: "Einfacher Schutz aus Leder.",
      type: "armor",
      rarity: "common",
      icon: "🛡️",
      stats: { defense: 3 },
      equipped: true
    },
    {
      id: 3,
      name: "Heiltrank",
      description: "Stellt 20 Lebenspunkte wieder her.",
      type: "potion",
      rarity: "uncommon",
      icon: "🧪",
      stats: { health: 20 }
    },
    {
      id: 4,
      name: "Eisenschwert",
      description: "Ein stabiles Schwert aus Eisen.",
      type: "weapon",
      rarity: "uncommon",
      icon: "⚔️",
      stats: { attack: 8 }
    },
    {
      id: 5,
      name: "Mythische Axt",
      description: "Eine legendäre Axt mit enormer Kraft.",
      type: "weapon",
      rarity: "legendary",
      icon: "🪓",
      stats: { attack: 15 }
    }
  ]);

  // Mock function to equip/unequip items
  const toggleEquip = (id: number) => {
    setItems(items.map(item => {
      // If this is the item we want to toggle
      if (item.id === id) {
        return { ...item, equipped: !item.equipped };
      }
      // If we're equipping this item, unequip other items of the same type
      if (item.id !== id && item.type === items.find(i => i.id === id)?.type && item.equipped && !items.find(i => i.id === id)?.equipped) {
        return { ...item, equipped: false };
      }
      return item;
    }));
  };

  // Get background color based on rarity
  const getRarityColor = (rarity: Item['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400/30';
      case 'uncommon':
        return 'border-green-400/30';
      case 'rare':
        return 'border-blue-400/30';
      case 'epic':
        return 'border-purple-400/30';
      case 'legendary':
        return 'border-yellow-400/30 blue-glow';
      default:
        return 'border-gray-400/30';
    }
  };

  // Filter equipped items
  const equippedItems = items.filter(item => item.equipped);
  // Filter inventory items (not equipped)
  const inventoryItems = items.filter(item => !item.equipped);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Inventar</h2>
        <p className="text-game-foreground/70">Verwalte und rüste deine Gegenstände aus</p>
      </div>
      
      {/* Equipped items section */}
      <div>
        <h3 className="text-lg text-game-accent mb-3 flex items-center">
          <Shield className="mr-2 h-5 w-5" /> Ausgerüstete Gegenstände
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {equippedItems.map(item => (
            <Card 
              key={item.id} 
              className={`game-card flex items-start p-3 ${getRarityColor(item.rarity)}`}
            >
              <div className="text-4xl mr-3 opacity-80">{item.icon}</div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h4 className="font-medium text-game-foreground">{item.name}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 text-game-foreground/70"
                    onClick={() => toggleEquip(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-game-foreground/70 mb-2">{item.description}</p>
                <div className="flex">
                  {item.stats?.attack && (
                    <div className="flex items-center mr-3 text-xs">
                      <Sword className="h-3 w-3 mr-1 text-red-400" />
                      <span>+{item.stats.attack}</span>
                    </div>
                  )}
                  {item.stats?.defense && (
                    <div className="flex items-center mr-3 text-xs">
                      <Shield className="h-3 w-3 mr-1 text-blue-400" />
                      <span>+{item.stats.defense}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
          
          {equippedItems.length === 0 && (
            <div className="col-span-full text-center py-6 text-game-foreground/50">
              <p>Keine Gegenstände ausgerüstet</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Inventory items */}
      <div>
        <h3 className="text-lg text-game-accent mb-3 flex items-center">
          <PlusCircle className="mr-2 h-5 w-5" /> Inventar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {inventoryItems.map(item => (
            <Card 
              key={item.id} 
              className={`game-card flex items-start p-3 ${getRarityColor(item.rarity)}`}
            >
              <div className="text-4xl mr-3 opacity-80">{item.icon}</div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h4 className="font-medium text-game-foreground">{item.name}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 text-game-accent"
                    onClick={() => toggleEquip(item.id)}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-game-foreground/70 mb-2">{item.description}</p>
                <div className="flex">
                  {item.stats?.attack && (
                    <div className="flex items-center mr-3 text-xs">
                      <Sword className="h-3 w-3 mr-1 text-red-400" />
                      <span>+{item.stats.attack}</span>
                    </div>
                  )}
                  {item.stats?.defense && (
                    <div className="flex items-center mr-3 text-xs">
                      <Shield className="h-3 w-3 mr-1 text-blue-400" />
                      <span>+{item.stats.defense}</span>
                    </div>
                  )}
                  {item.stats?.health && (
                    <div className="flex items-center mr-3 text-xs">
                      <span className="text-green-400 mr-1">❤️</span>
                      <span>+{item.stats.health}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
          
          {inventoryItems.length === 0 && (
            <div className="col-span-full text-center py-6 text-game-foreground/50">
              <p>Dein Inventar ist leer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryPanel;

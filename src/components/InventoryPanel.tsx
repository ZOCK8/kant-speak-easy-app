
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Sword, PlusCircle, Info, Trash2, Heart, Filter } from 'lucide-react';
import { useGameContext } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const InventoryPanel: React.FC = () => {
  const { inventory, addInventoryItem, removeInventoryItem } = useGameContext();
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<(typeof inventory)[0] | null>(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'weapon' | 'armor' | 'potion' | 'accessory'>('all');
  
  // Toggle equip/unequip items
  const toggleEquip = (id: number) => {
    const item = inventory.find(item => item.id === id);
    if (!item) return;

    // Create a deep copy of the inventory
    const newInventory = JSON.parse(JSON.stringify(inventory));
    
    // Find item to toggle
    const toggleItem = newInventory.find((i: typeof item) => i.id === id);
    if (!toggleItem) return;
    
    // If equipping, unequip other items of the same type
    if (!toggleItem.equipped) {
      newInventory.forEach((i: typeof item) => {
        if (i.type === toggleItem.type && i.equipped) {
          i.equipped = false;
        }
      });
    }
    
    // Toggle this item
    toggleItem.equipped = !toggleItem.equipped;
    
    // Update local state and game context
    newInventory.forEach((item: typeof toggleItem) => {
      addInventoryItem(item);
    });
    
    toast({
      description: toggleItem.equipped 
        ? `${toggleItem.name} ausgerüstet.` 
        : `${toggleItem.name} abgelegt.`,
      variant: "default",
    });
  };

  // Show item details
  const showDetails = (item: (typeof inventory)[0]) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };
  
  // Get background color based on rarity
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400/30';
      case 'uncommon':
      case 'rare':
        return 'border-green-400/30';
      case 'epic':
        return 'border-purple-400/30';
      case 'legendary':
        return 'border-yellow-400/30 blue-glow';
      default:
        return 'border-gray-400/30';
    }
  };
  
  // Get text color based on rarity
  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-200';
      case 'uncommon':
      case 'rare':
        return 'text-green-400';
      case 'epic':
        return 'text-purple-400';
      case 'legendary':
        return 'text-yellow-400';
      default:
        return 'text-gray-200';
    }
  };

  // Get item icon
  const getItemIcon = (item: (typeof inventory)[0]) => {
    switch (item.type) {
      case 'weapon':
        return '⚔️';
      case 'armor':
        return '🛡️';
      case 'potion':
        return '🧪';
      case 'accessory':
        return '💍';
      default:
        return '📦';
    }
  };
  
  // Filter items
  const filteredInventory = inventory.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });
  
  // Filter equipped items
  const equippedItems = filteredInventory.filter(item => item.equipped);
  // Filter inventory items (not equipped)
  const inventoryItems = filteredInventory.filter(item => !item.equipped);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Inventar</h2>
        <p className="text-game-foreground/70">Verwalte und rüste deine Gegenstände aus</p>
      </div>
      
      {/* Filter bar */}
      <div className="flex justify-center mb-4">
        <div className="bg-game-secondary border border-game-accent/30 rounded-md p-1 flex space-x-1">
          <Button
            size="sm"
            variant={filterType === 'all' ? 'default' : 'outline'}
            className={filterType === 'all' ? 'bg-game-accent' : 'text-white border-game-accent/20'}
            onClick={() => setFilterType('all')}
          >
            <Filter className="h-4 w-4 mr-1" />
            <span className="text-white">Alle</span>
          </Button>
          <Button
            size="sm"
            variant={filterType === 'weapon' ? 'default' : 'outline'}
            className={filterType === 'weapon' ? 'bg-game-accent' : 'text-white border-game-accent/20'}
            onClick={() => setFilterType('weapon')}
          >
            <span className="text-white">⚔️ Waffen</span>
          </Button>
          <Button
            size="sm"
            variant={filterType === 'armor' ? 'default' : 'outline'}
            className={filterType === 'armor' ? 'bg-game-accent' : 'text-white border-game-accent/20'}
            onClick={() => setFilterType('armor')}
          >
            <span className="text-white">🛡️ Rüstung</span>
          </Button>
          <Button
            size="sm"
            variant={filterType === 'potion' ? 'default' : 'outline'}
            className={filterType === 'potion' ? 'bg-game-accent' : 'text-white border-game-accent/20'}
            onClick={() => setFilterType('potion')}
          >
            <span className="text-white">🧪 Tränke</span>
          </Button>
          <Button
            size="sm"
            variant={filterType === 'accessory' ? 'default' : 'outline'}
            className={filterType === 'accessory' ? 'bg-game-accent' : 'text-white border-game-accent/20'}
            onClick={() => setFilterType('accessory')}
          >
            <span className="text-white">💍 Zubehör</span>
          </Button>
        </div>
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
              <div className="text-4xl mr-3 opacity-80">{getItemIcon(item)}</div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h4 className={`font-medium ${getRarityTextColor(item.rarity)}`}>{item.name}</h4>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-game-accent"
                      onClick={() => showDetails(item)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-game-foreground/70"
                      onClick={() => toggleEquip(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-game-foreground/70 mb-2">{item.type} • {item.rarity}</p>
                <div className="flex flex-wrap gap-1">
                  {item.stats?.attack && (
                    <div className="flex items-center mr-3 text-xs bg-game/30 px-1 py-0.5 rounded">
                      <Sword className="h-3 w-3 mr-1 text-red-400" />
                      <span>+{item.stats.attack}</span>
                    </div>
                  )}
                  {item.stats?.defense && (
                    <div className="flex items-center mr-3 text-xs bg-game/30 px-1 py-0.5 rounded">
                      <Shield className="h-3 w-3 mr-1 text-blue-400" />
                      <span>+{item.stats.defense}</span>
                    </div>
                  )}
                  {item.stats?.health && (
                    <div className="flex items-center mr-3 text-xs bg-game/30 px-1 py-0.5 rounded">
                      <Heart className="h-3 w-3 mr-1 text-green-400" />
                      <span>+{item.stats.health}</span>
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
          <span className="ml-2 text-sm text-game-foreground/50">({inventoryItems.length} Gegenstände)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {inventoryItems.map(item => (
            <Card 
              key={item.id} 
              className={`game-card flex items-start p-3 ${getRarityColor(item.rarity)}`}
            >
              <div className="text-4xl mr-3 opacity-80">{getItemIcon(item)}</div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h4 className={`font-medium ${getRarityTextColor(item.rarity)}`}>{item.name}</h4>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-game-accent"
                      onClick={() => showDetails(item)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-game-accent"
                      onClick={() => toggleEquip(item.id)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-game-foreground/70 mb-2">{item.type} • {item.rarity}</p>
                <div className="flex flex-wrap gap-1">
                  {item.stats?.attack && (
                    <div className="flex items-center mr-3 text-xs bg-game/30 px-1 py-0.5 rounded">
                      <Sword className="h-3 w-3 mr-1 text-red-400" />
                      <span>+{item.stats.attack}</span>
                    </div>
                  )}
                  {item.stats?.defense && (
                    <div className="flex items-center mr-3 text-xs bg-game/30 px-1 py-0.5 rounded">
                      <Shield className="h-3 w-3 mr-1 text-blue-400" />
                      <span>+{item.stats.defense}</span>
                    </div>
                  )}
                  {item.stats?.health && (
                    <div className="flex items-center mr-3 text-xs bg-game/30 px-1 py-0.5 rounded">
                      <Heart className="h-3 w-3 mr-1 text-green-400" />
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

      {/* Item Details Dialog */}
      <Dialog open={showItemDetails} onOpenChange={setShowItemDetails}>
        {selectedItem && (
          <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-2xl">{getItemIcon(selectedItem)}</span>
                <span className={getRarityTextColor(selectedItem.rarity)}>
                  {selectedItem.name}
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className={`p-3 border rounded-md ${getRarityColor(selectedItem.rarity)}`}>
                <h4 className="text-game-accent mb-2">Gegenstand Info:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-game-foreground/70">Typ:</span>
                    <span>{selectedItem.type === 'weapon' ? 'Waffe' : 
                           selectedItem.type === 'armor' ? 'Rüstung' : 
                           selectedItem.type === 'potion' ? 'Trank' : 'Zubehör'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-game-foreground/70">Seltenheit:</span>
                    <span className={getRarityTextColor(selectedItem.rarity)}>
                      {selectedItem.rarity === 'common' ? 'Gewöhnlich' : 
                       selectedItem.rarity === 'uncommon' ? 'Ungewöhnlich' :
                       selectedItem.rarity === 'rare' ? 'Selten' :
                       selectedItem.rarity === 'epic' ? 'Episch' : 'Legendär'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-game-foreground/70">Status:</span>
                    <span>{selectedItem.equipped ? 'Ausgerüstet' : 'Im Inventar'}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 border border-game-accent/20 rounded-md">
                <h4 className="text-game-accent mb-2">Attributboni:</h4>
                <div className="space-y-2">
                  {selectedItem.stats?.attack && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Sword className="h-4 w-4 text-red-400 mr-2" />
                        <span>Angriff</span>
                      </div>
                      <span className="text-green-400">+{selectedItem.stats.attack}</span>
                    </div>
                  )}
                  {selectedItem.stats?.defense && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-blue-400 mr-2" />
                        <span>Verteidigung</span>
                      </div>
                      <span className="text-green-400">+{selectedItem.stats.defense}</span>
                    </div>
                  )}
                  {selectedItem.stats?.health && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-green-400 mr-2" />
                        <span>Lebenspunkte</span>
                      </div>
                      <span className="text-green-400">+{selectedItem.stats.health}</span>
                    </div>
                  )}
                  {!selectedItem.stats?.attack && !selectedItem.stats?.defense && !selectedItem.stats?.health && (
                    <p className="text-game-foreground/50 text-center">Keine Attribute</p>
                  )}
                </div>
              </div>

              <div className="flex justify-around gap-3">
                <Button
                  className={selectedItem.equipped ? "bg-red-600 hover:bg-red-700" : "bg-game-accent hover:bg-game-accent/90"}
                  onClick={() => {
                    toggleEquip(selectedItem.id);
                    setShowItemDetails(false);
                  }}
                >
                  <span className="text-white">
                    {selectedItem.equipped ? "Ablegen" : "Ausrüsten"}
                  </span>
                </Button>
                
                {!selectedItem.equipped && (
                  <Button
                    variant="outline"
                    className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                    onClick={() => {
                      removeInventoryItem(selectedItem.id);
                      setShowItemDetails(false);
                      toast({
                        description: `${selectedItem.name} wurde aus dem Inventar entfernt.`,
                        variant: "default",
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    <span>Entfernen</span>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default InventoryPanel;

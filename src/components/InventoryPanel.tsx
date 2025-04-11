import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Sword, PlusCircle, Trash2, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useGameContext } from '@/context/GameContext';
import { useToast } from '@/hooks/use-toast';

type ItemDetailsProps = {
  item: {
    id: number;
    name: string;
    type: 'weapon' | 'armor' | 'potion' | 'accessory';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    equipped?: boolean;
    stats: {
      attack?: number;
      defense?: number;
      health?: number;
    };
  };
  isOpen: boolean;
  onClose: () => void;
  onEquip: () => void;
  onUnequip: () => void;
  onDelete: () => void;
};

const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  isOpen,
  onClose,
  onEquip,
  onUnequip,
  onDelete,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground">
        <DialogHeader>
          <DialogTitle className={`flex items-center ${getRarityTextColor(item.rarity)}`}>
            {getTypeIcon(item.type)}
            <span className="ml-2">{item.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-game-foreground/70 mr-2">Seltenheit:</span>
            <span className={getRarityTextColor(item.rarity)}>
              {item.rarity === 'common' && 'Gewöhnlich'}
              {item.rarity === 'rare' && 'Selten'}
              {item.rarity === 'epic' && 'Episch'}
              {item.rarity === 'legendary' && 'Legendär'}
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-game-foreground/70 mr-2">Typ:</span>
            <span className="text-game-foreground">
              {item.type === 'weapon' && 'Waffe'}
              {item.type === 'armor' && 'Rüstung'}
              {item.type === 'potion' && 'Trank'}
              {item.type === 'accessory' && 'Zubehör'}
            </span>
          </div>
          
          <div className="pt-2 border-t border-game-accent/20">
            <h4 className="text-game-accent mb-2">Statistiken</h4>
            <div className="space-y-2">
              {item.stats.attack !== undefined && (
                <div className="flex items-center">
                  <Sword className="h-4 w-4 mr-2 text-red-400" />
                  <span className="text-game-foreground/70">Angriff:</span>
                  <span className="ml-auto text-red-400">+{item.stats.attack}</span>
                </div>
              )}
              {item.stats.defense !== undefined && (
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="text-game-foreground/70">Verteidigung:</span>
                  <span className="ml-auto text-blue-400">+{item.stats.defense}</span>
                </div>
              )}
              {item.stats.health !== undefined && (
                <div className="flex items-center">
                  <PlusCircle className="h-4 w-4 mr-2 text-green-400" />
                  <span className="text-game-foreground/70">Leben:</span>
                  <span className="ml-auto text-green-400">+{item.stats.health}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-row justify-between gap-2">
          <Button
            variant="outline"
            className="text-red-500 border-red-500/30 hover:bg-red-500/10"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-0 sm:mr-2" />
            <span className="hidden sm:inline">Entfernen</span>
          </Button>
          
          {!item.equipped ? (
            <Button
              className="bg-game-accent hover:bg-game-accent/80"
              onClick={onEquip}
            >
              <span className="text-white">Ausrüsten</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="border-game-accent/30"
              onClick={onUnequip}
            >
              <span className="text-white">Ablegen</span>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const InventoryPanel: React.FC = () => {
  const { inventory, addInventoryItem, removeInventoryItem } = useGameContext();
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'type'>('name');
  const [filterType, setFilterType] = useState<'all' | 'weapon' | 'armor' | 'potion' | 'accessory'>('all');
  
  const selectedItemDetails = inventory.find(item => item.id === selectedItem);
  
  const openItemDetails = (id: number) => {
    setSelectedItem(id);
    setDetailsOpen(true);
  };
  
  const closeItemDetails = () => {
    setDetailsOpen(false);
    setSelectedItem(null);
  };
  
  const equipItem = () => {
    if (!selectedItem) return;
    
    const updatedInventory = inventory.map(item => {
      if (item.id === selectedItem) {
        return { ...item, equipped: true };
      }
      
      if (selectedItemDetails && item.type === selectedItemDetails.type && item.id !== selectedItem) {
        return { ...item, equipped: false };
      }
      
      return item;
    });
    
    toast({
      description: `${selectedItemDetails?.name} ausgerüstet.`,
      variant: "default",
    });
    
    closeItemDetails();
  };
  
  const unequipItem = () => {
    if (!selectedItem) return;
    
    const updatedInventory = inventory.map(item => {
      if (item.id === selectedItem) {
        return { ...item, equipped: false };
      }
      return item;
    });
    
    toast({
      description: `${selectedItemDetails?.name} abgelegt.`,
      variant: "default",
    });
    
    closeItemDetails();
  };
  
  const deleteItem = () => {
    if (!selectedItem) return;
    
    removeInventoryItem(selectedItem);
    
    toast({
      description: `${selectedItemDetails?.name} entfernt.`,
      variant: "default",
    });
    
    closeItemDetails();
  };
  
  const sortItems = (a: typeof inventory[0], b: typeof inventory[0]) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rarity':
        const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3 };
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  };
  
  const filteredItems = filterType === 'all' 
    ? inventory 
    : inventory.filter(item => item.type === filterType);
  
  const getRarityBorderColor = (rarity: 'common' | 'rare' | 'epic' | 'legendary') => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400/30';
      case 'rare':
        return 'border-green-400/30';
      case 'epic':
        return 'border-purple-400/30';
      case 'legendary':
        return 'border-yellow-400/30';
      default:
        return 'border-gray-400/30';
    }
  };
  
  const getRarityTextColor = (rarity: 'common' | 'rare' | 'epic' | 'legendary') => {
    switch (rarity) {
      case 'common':
        return 'text-gray-200';
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
  
  const getTypeIcon = (type: 'weapon' | 'armor' | 'potion' | 'accessory') => {
    switch (type) {
      case 'weapon':
        return <Sword className="h-4 w-4 text-red-400" />;
      case 'armor':
        return <Shield className="h-4 w-4 text-blue-400" />;
      case 'potion':
        return <PlusCircle className="h-4 w-4 text-green-400" />;
      case 'accessory':
        return <Sparkles className="h-4 w-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Inventar</h2>
        <p className="text-game-foreground/70">Verwalte deine Gegenstände</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
        <div className="game-card w-full sm:w-auto">
          <h3 className="text-sm text-game-accent mb-2">Sortieren nach</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={sortBy === 'name' ? 'default' : 'outline'}
              className={sortBy === 'name' ? 'bg-game-accent text-white text-xs' : 'border-game-accent/30 text-white text-xs'}
              onClick={() => setSortBy('name')}
              size="sm"
            >
              Name
            </Button>
            <Button 
              variant={sortBy === 'rarity' ? 'default' : 'outline'}
              className={sortBy === 'rarity' ? 'bg-game-accent text-white text-xs' : 'border-game-accent/30 text-white text-xs'}
              onClick={() => setSortBy('rarity')}
              size="sm"
            >
              Seltenheit
            </Button>
            <Button 
              variant={sortBy === 'type' ? 'default' : 'outline'}
              className={sortBy === 'type' ? 'bg-game-accent text-white text-xs' : 'border-game-accent/30 text-white text-xs'}
              onClick={() => setSortBy('type')}
              size="sm"
            >
              Typ
            </Button>
          </div>
        </div>
        
        <div className="game-card w-full sm:w-auto">
          <h3 className="text-sm text-game-accent mb-2">Filtern nach Typ</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filterType === 'all' ? 'default' : 'outline'}
              className={filterType === 'all' ? 'bg-game-accent text-white text-xs' : 'border-game-accent/30 text-white text-xs'}
              onClick={() => setFilterType('all')}
              size="sm"
            >
              Alle
            </Button>
            <Button 
              variant={filterType === 'weapon' ? 'default' : 'outline'}
              className={filterType === 'weapon' ? 'bg-game-accent text-white text-xs' : 'border-game-accent/30 text-white text-xs'}
              onClick={() => setFilterType('weapon')}
              size="sm"
            >
              Waffen
            </Button>
            <Button 
              variant={filterType === 'armor' ? 'default' : 'outline'}
              className={filterType === 'armor' ? 'bg-game-accent text-white text-xs' : 'border-game-accent/30 text-white text-xs'}
              onClick={() => setFilterType('armor')}
              size="sm"
            >
              Rüstung
            </Button>
            <Button 
              variant={filterType === 'potion' ? 'default' : 'outline'}
              className={filterType === 'potion' ? 'bg-game-accent text-white text-xs' : 'border-game-accent/30 text-white text-xs'}
              onClick={() => setFilterType('potion')}
              size="sm"
            >
              Tränke
            </Button>
            <Button 
              variant={filterType === 'accessory' ? 'default' : 'outline'}
              className={filterType === 'accessory' ? 'bg-game-accent text-white text-xs' : 'border-game-accent/30 text-white text-xs'}
              onClick={() => setFilterType('accessory')}
              size="sm"
            >
              Zubehör
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredItems.sort(sortItems).map(item => (
          <Card 
            key={item.id}
            className={`game-card p-3 cursor-pointer relative ${getRarityBorderColor(item.rarity)} hover:border-game-accent/50 transition-colors`}
            onClick={() => openItemDetails(item.id)}
          >
            {item.equipped && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs py-1 px-2 rounded-full">
                Aktiv
              </span>
            )}
            <div className="flex justify-between items-start mb-2">
              <span className={`text-sm font-medium ${getRarityTextColor(item.rarity)}`}>{item.name}</span>
              <span className="bg-game/50 p-1 rounded-full">{getTypeIcon(item.type)}</span>
            </div>
            <div className="space-y-1 text-xs text-game-foreground/70">
              {item.stats.attack && (
                <div className="flex items-center">
                  <Sword className="h-3 w-3 mr-1 text-red-400" />
                  <span>Angriff: +{item.stats.attack}</span>
                </div>
              )}
              {item.stats.defense && (
                <div className="flex items-center">
                  <Shield className="h-3 w-3 mr-1 text-blue-400" />
                  <span>Verteidigung: +{item.stats.defense}</span>
                </div>
              )}
              {item.stats.health && (
                <div className="flex items-center">
                  <PlusCircle className="h-3 w-3 mr-1 text-green-400" />
                  <span>Leben: +{item.stats.health}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-8 text-game-foreground/50">
            <p>Keine Gegenstände gefunden.</p>
            <p className="text-sm mt-2">Verdiene Gegenstände durch Quests oder kaufe sie im Shop.</p>
          </div>
        )}
      </div>
      
      {selectedItemDetails && (
        <ItemDetails
          item={selectedItemDetails}
          isOpen={detailsOpen}
          onClose={closeItemDetails}
          onEquip={equipItem}
          onUnequip={unequipItem}
          onDelete={deleteItem}
        />
      )}
    </div>
  );
};

export default InventoryPanel;

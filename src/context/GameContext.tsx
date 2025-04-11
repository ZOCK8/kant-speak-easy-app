
import React, { createContext, useContext, useState, useEffect } from 'react';

type AvatarType = 'player1' | 'player2' | 'player3' | 'monster';

// Define inventory item type
interface InventoryItem {
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
}

// Define player stats type
interface PlayerStats {
  health: number;
  maxHealth: number;
  strength: number;
  defense: number;
  experience: number;
  nextLevel: number;
  level: number;
}

interface GameContextType {
  isFirstTime: boolean;
  playerName: string;
  selectedAvatar: AvatarType;
  showTutorial: boolean;
  playerCoins: number;
  playerStats: PlayerStats;
  inventory: InventoryItem[];
  resetProgress: () => void;
  setPlayerInfo: (name: string, avatar: AvatarType) => void;
  completeTutorial: () => void;
  setPlayerCoins: React.Dispatch<React.SetStateAction<number>>;
  addInventoryItem: (item: InventoryItem) => void;
  removeInventoryItem: (itemId: number) => void;
  updatePlayerStats: (stats: Partial<PlayerStats>) => void;
}

const defaultStats: PlayerStats = {
  health: 0,
  maxHealth: 100,
  strength: 0,
  defense: 0,
  experience: 0,
  nextLevel: 1000,
  level: 1
};

const defaultContext: GameContextType = {
  isFirstTime: true,
  playerName: "Spieler123",
  selectedAvatar: 'player1',
  showTutorial: true,
  playerCoins: 250,
  playerStats: defaultStats,
  inventory: [],
  resetProgress: () => {},
  setPlayerInfo: () => {},
  completeTutorial: () => {},
  setPlayerCoins: () => {},
  addInventoryItem: () => {},
  removeInventoryItem: () => {},
  updatePlayerStats: () => {},
};

const GameContext = createContext<GameContextType>(defaultContext);

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [playerName, setPlayerName] = useState<string>("Spieler123");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>('player1');
  const [showTutorial, setShowTutorial] = useState<boolean>(true);
  const [playerCoins, setPlayerCoins] = useState<number>(250);
  const [playerStats, setPlayerStats] = useState<PlayerStats>(defaultStats);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  
  // Check local storage on initial load
  useEffect(() => {
    const storedFirstTime = localStorage.getItem('isFirstTime');
    if (storedFirstTime === 'false') {
      setIsFirstTime(false);
      
      // Restore player data
      const storedName = localStorage.getItem('playerName');
      const storedAvatar = localStorage.getItem('selectedAvatar') as AvatarType;
      const tutorialCompleted = localStorage.getItem('tutorialCompleted');
      const storedCoins = localStorage.getItem('playerCoins');
      const storedStats = localStorage.getItem('playerStats');
      const storedInventory = localStorage.getItem('inventory');
      
      if (storedName) setPlayerName(storedName);
      if (storedAvatar) setSelectedAvatar(storedAvatar);
      if (tutorialCompleted === 'true') setShowTutorial(false);
      if (storedCoins) setPlayerCoins(parseInt(storedCoins));
      if (storedStats) setPlayerStats(JSON.parse(storedStats));
      if (storedInventory) setInventory(JSON.parse(storedInventory));
    }
  }, []);
  
  // Update local storage when state changes
  useEffect(() => {
    if (!isFirstTime) {
      localStorage.setItem('playerCoins', playerCoins.toString());
      localStorage.setItem('playerStats', JSON.stringify(playerStats));
      localStorage.setItem('inventory', JSON.stringify(inventory));
    }
  }, [isFirstTime, playerCoins, playerStats, inventory]);
  
  // Set player information and mark as not first time
  const setPlayerInfo = (name: string, avatar: AvatarType) => {
    setPlayerName(name);
    setSelectedAvatar(avatar);
    setIsFirstTime(false);
    
    localStorage.setItem('playerName', name);
    localStorage.setItem('selectedAvatar', avatar);
    localStorage.setItem('isFirstTime', 'false');
  };
  
  // Mark tutorial as completed
  const completeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialCompleted', 'true');
  };
  
  // Add item to inventory
  const addInventoryItem = (item: InventoryItem) => {
    setInventory(prev => [...prev, item]);
  };
  
  // Remove item from inventory
  const removeInventoryItem = (itemId: number) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Update player stats
  const updatePlayerStats = (stats: Partial<PlayerStats>) => {
    setPlayerStats(prev => ({
      ...prev,
      ...stats
    }));
  };
  
  // Reset all progress
  const resetProgress = () => {
    localStorage.clear();
    setIsFirstTime(true);
    setPlayerName("Spieler123");
    setSelectedAvatar('player1');
    setShowTutorial(true);
    setPlayerCoins(250);
    setPlayerStats(defaultStats);
    setInventory([]);
    
    // Reload the page to reset all state
    window.location.reload();
  };
  
  return (
    <GameContext.Provider
      value={{
        isFirstTime,
        playerName,
        selectedAvatar,
        showTutorial,
        playerCoins,
        playerStats,
        inventory,
        resetProgress,
        setPlayerInfo,
        completeTutorial,
        setPlayerCoins,
        addInventoryItem,
        removeInventoryItem,
        updatePlayerStats,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

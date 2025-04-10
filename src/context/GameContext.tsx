
import React, { createContext, useContext, useState, useEffect } from 'react';

type AvatarType = 'player1' | 'player2' | 'player3' | 'monster';

interface GameContextType {
  isFirstTime: boolean;
  playerName: string;
  selectedAvatar: AvatarType;
  showTutorial: boolean;
  resetProgress: () => void;
  setPlayerInfo: (name: string, avatar: AvatarType) => void;
  completeTutorial: () => void;
}

const defaultContext: GameContextType = {
  isFirstTime: true,
  playerName: "Spieler123",
  selectedAvatar: 'player1',
  showTutorial: true,
  resetProgress: () => {},
  setPlayerInfo: () => {},
  completeTutorial: () => {},
};

const GameContext = createContext<GameContextType>(defaultContext);

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [playerName, setPlayerName] = useState<string>("Spieler123");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>('player1');
  const [showTutorial, setShowTutorial] = useState<boolean>(true);
  
  // Check local storage on initial load
  useEffect(() => {
    const storedFirstTime = localStorage.getItem('isFirstTime');
    if (storedFirstTime === 'false') {
      setIsFirstTime(false);
      
      // Restore player data
      const storedName = localStorage.getItem('playerName');
      const storedAvatar = localStorage.getItem('selectedAvatar') as AvatarType;
      const tutorialCompleted = localStorage.getItem('tutorialCompleted');
      
      if (storedName) setPlayerName(storedName);
      if (storedAvatar) setSelectedAvatar(storedAvatar);
      if (tutorialCompleted === 'true') setShowTutorial(false);
    }
  }, []);
  
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
  
  // Reset all progress
  const resetProgress = () => {
    localStorage.clear();
    setIsFirstTime(true);
    setPlayerName("Spieler123");
    setSelectedAvatar('player1');
    setShowTutorial(true);
    
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
        resetProgress,
        setPlayerInfo,
        completeTutorial,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

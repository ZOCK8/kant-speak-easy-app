
import React, { useState } from 'react';
import GameLayout from '@/components/GameLayout';
import AvatarPanel from '@/components/AvatarPanel';
import QuestsPanel from '@/components/QuestsPanel';
import GamePanel from '@/components/GamePanel';
import ShopPanel from '@/components/ShopPanel';
import InventoryPanel from '@/components/InventoryPanel';
import SettingsPanel from '@/components/SettingsPanel';
import WelcomeSetup from '@/components/WelcomeSetup';
import { useGameContext } from '@/context/GameContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'avatar' | 'quests' | 'game' | 'shop' | 'inventory' | 'settings'>('avatar');
  const { isFirstTime, showTutorial } = useGameContext();

  const renderContent = () => {
    switch (activeTab) {
      case 'avatar':
        return <AvatarPanel />;
      case 'quests':
        return <QuestsPanel />;
      case 'game':
        return <GamePanel />;
      case 'shop':
        return <ShopPanel />;
      case 'inventory':
        return <InventoryPanel />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <AvatarPanel />;
    }
  };

  // Dynamic document title
  React.useEffect(() => {
    document.title = "Zero Quest";
  }, []);

  return (
    <>
      {(isFirstTime || showTutorial) && <WelcomeSetup />}
      
      <GameLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </GameLayout>
    </>
  );
};

export default Index;

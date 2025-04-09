
import React, { useState } from 'react';
import GameLayout from '@/components/GameLayout';
import AvatarPanel from '@/components/AvatarPanel';
import QuestsPanel from '@/components/QuestsPanel';
import GamePanel from '@/components/GamePanel';
import ShopPanel from '@/components/ShopPanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'avatar' | 'quests' | 'game' | 'shop'>('avatar');

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
      default:
        return <AvatarPanel />;
    }
  };

  return (
    <GameLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </GameLayout>
  );
};

export default Index;

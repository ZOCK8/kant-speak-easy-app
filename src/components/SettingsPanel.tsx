
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Volume, 
  VolumeX, 
  Moon, 
  Sun, 
  Trash2,
  Save,
  Terminal,
  ClockIcon,
  Calendar,
  Award,
  Timer,
  RotateCw,
  AlertCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useGameContext } from '@/context/GameContext';
import { useToast } from '@/hooks/use-toast';

const SettingsPanel: React.FC = () => {
  const { resetProgress, playerName, playerStats, updatePlayerStats, setPlayerCoins } = useGameContext();
  const { toast } = useToast();
  
  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [devCode, setDevCode] = useState('');
  const [devMode, setDevMode] = useState(false);
  const [showDevPanel, setShowDevPanel] = useState(false);
  const [devCurrentTime, setDevCurrentTime] = useState(new Date());
  const [devTimeFactor, setDevTimeFactor] = useState(1);
  
  // Sound toggle
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    localStorage.setItem('soundEnabled', (!soundEnabled).toString());
    
    toast({
      description: !soundEnabled ? "Sound aktiviert." : "Sound deaktiviert.",
      variant: "default",
    });
  };
  
  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
    
    // Update document class for theme
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    
    toast({
      description: !darkMode ? "Dark Mode aktiviert." : "Light Mode aktiviert.",
      variant: "default",
    });
  };
  
  // Check dev code
  const checkDevCode = () => {
    if (devCode.toLowerCase() === 'zocki') {
      setDevMode(true);
      setShowDevPanel(true);
      setDevCode('');
      
      toast({
        title: "Entwicklermodus aktiviert!",
        description: "Zusätzliche Entwickleroptionen freigeschaltet.",
        variant: "default",
      });
    }
  };
  
  // Add coins (dev mode)
  const addCoins = (amount: number) => {
    setPlayerCoins(prev => prev + amount);
    
    toast({
      description: `${amount} Münzen hinzugefügt.`,
      variant: "default",
    });
  };
  
  // Set player level (dev mode)
  const setPlayerLevel = (level: number) => {
    if (level < 1 || level > 99) return;
    
    const newStrength = Math.floor(10 + (level - 1) * 2);
    const newDefense = Math.floor(8 + (level - 1) * 2);
    const newMaxHealth = Math.floor(100 + (level - 1) * 10);
    
    updatePlayerStats({
      level,
      strength: newStrength,
      defense: newDefense,
      maxHealth: newMaxHealth,
      health: newMaxHealth,
      nextLevel: Math.floor(1000 * Math.pow(1.5, level - 1))
    });
    
    toast({
      description: `Spieler Level auf ${level} gesetzt.`,
      variant: "default",
    });
  };
  
  // Update dev time
  const updateDevTime = (hours: number) => {
    const newTime = new Date(devCurrentTime);
    newTime.setHours(newTime.getHours() + hours);
    setDevCurrentTime(newTime);
    
    toast({
      description: `Entwicklerzeit um ${hours} Stunden vorgestellt.`,
      variant: "default",
    });
  };
  
  // Format dev time
  const formatDevTime = (date: Date) => {
    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Update simulation speed
  const updateSimSpeed = (factor: number) => {
    setDevTimeFactor(factor);
    
    toast({
      description: `Simulationsgeschwindigkeit auf ${factor}x gesetzt.`,
      variant: "default",
    });
  };
  
  // Load stored settings on mount
  useEffect(() => {
    const storedSound = localStorage.getItem('soundEnabled');
    if (storedSound) {
      setSoundEnabled(storedSound === 'true');
    }
    
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === 'true');
      
      if (storedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to dark mode
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-game-accent mb-2">Einstellungen</h2>
        <p className="text-game-foreground/70">Passe deine Spieleinstellungen an</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Game Settings */}
        <Card className="game-card p-6">
          <h3 className="text-xl font-bold text-game-accent mb-4 flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Spieleinstellungen
          </h3>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {soundEnabled ? <Volume className="h-5 w-5 mr-2 text-game-accent" /> : <VolumeX className="h-5 w-5 mr-2 text-game-accent" />}
                <span>Sound</span>
              </div>
              <div className="flex items-center">
                <button
                  className={`toggle ${soundEnabled ? 'bg-game-accent' : 'bg-game'}`}
                  onClick={toggleSound}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {darkMode ? <Moon className="h-5 w-5 mr-2 text-game-accent" /> : <Sun className="h-5 w-5 mr-2 text-game-accent" />}
                <span>Dark Mode</span>
              </div>
              <div className="flex items-center">
                <button
                  className={`toggle ${darkMode ? 'bg-game-accent' : 'bg-game'}`}
                  onClick={toggleDarkMode}
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-game-accent/20">
              <Button 
                variant="outline" 
                className="w-full text-red-500 border-red-500/30 hover:bg-red-500/10"
                onClick={() => setShowConfirmReset(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Fortschritt zurücksetzen
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Player Info */}
        <Card className="game-card p-6">
          <h3 className="text-xl font-bold text-game-accent mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Spieler-Informationen
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-game-foreground/70 mb-1 text-sm">Spielername</p>
              <p className="text-game-highlight font-medium">{playerName}</p>
            </div>
            
            <div>
              <p className="text-game-foreground/70 mb-1 text-sm">Level</p>
              <p className="text-game-highlight font-medium">{playerStats.level}</p>
            </div>
            
            <div>
              <p className="text-game-foreground/70 mb-1 text-sm">Erfahrung</p>
              <div className="w-full bg-game/50 rounded-full h-2 mb-1">
                <div 
                  className="bg-game-accent h-2 rounded-full" 
                  style={{ width: `${(playerStats.experience / playerStats.nextLevel) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-game-foreground/50">
                {playerStats.experience} / {playerStats.nextLevel} XP
              </p>
            </div>
            
            <div className="pt-4 border-t border-game-accent/20">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-game-foreground/70">Stärke</span>
                  <span className="text-game-highlight">{playerStats.strength}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-game-foreground/70">Verteidigung</span>
                  <span className="text-game-highlight">{playerStats.defense}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-game-foreground/70">Lebenspunkte</span>
                  <span className="text-game-highlight">{playerStats.health} / {playerStats.maxHealth}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Developer Code Input */}
      <Card className="game-card p-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Entwicklercode eingeben..."
            value={devCode}
            onChange={(e) => setDevCode(e.target.value)}
            className="bg-game/50 border-game-accent/30 text-game-foreground"
          />
          <Button 
            onClick={checkDevCode}
            className="bg-game-accent hover:bg-game-accent/90 whitespace-nowrap"
          >
            <Terminal className="mr-2 h-4 w-4" />
            <span className="text-white">Prüfen</span>
          </Button>
        </div>
      </Card>
      
      {/* Developer Panel */}
      {devMode && (
        <Dialog open={showDevPanel} onOpenChange={setShowDevPanel}>
          <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center text-game-accent">
                <Terminal className="h-5 w-5 mr-2" />
                Entwicklermodus
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time Manipulation */}
              <div className="game-card p-4">
                <h4 className="text-game-accent mb-3 flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Zeit-Manipulation
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-game-foreground/70">Aktuelle Zeit:</span>
                    <span className="text-game-highlight">{formatDevTime(devCurrentTime)}</span>
                  </div>
                  
                  <div className="flex justify-between gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1 text-white border-game-accent/30"
                      onClick={() => updateDevTime(1)}
                    >
                      +1h
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 text-white border-game-accent/30"
                      onClick={() => updateDevTime(6)}
                    >
                      +6h
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 text-white border-game-accent/30"
                      onClick={() => updateDevTime(24)}
                    >
                      +1d
                    </Button>
                  </div>
                  
                  <div className="pt-2 border-t border-game-accent/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-game-foreground/70">Simulationsgeschwindigkeit:</span>
                      <span className="text-game-highlight">{devTimeFactor}x</span>
                    </div>
                    
                    <div className="flex justify-between gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${devTimeFactor === 1 ? 'bg-game-accent text-white' : 'text-white border-game-accent/30'}`}
                        onClick={() => updateSimSpeed(1)}
                      >
                        1x
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${devTimeFactor === 2 ? 'bg-game-accent text-white' : 'text-white border-game-accent/30'}`}
                        onClick={() => updateSimSpeed(2)}
                      >
                        2x
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${devTimeFactor === 5 ? 'bg-game-accent text-white' : 'text-white border-game-accent/30'}`}
                        onClick={() => updateSimSpeed(5)}
                      >
                        5x
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${devTimeFactor === 10 ? 'bg-game-accent text-white' : 'text-white border-game-accent/30'}`}
                        onClick={() => updateSimSpeed(10)}
                      >
                        10x
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Player Manipulation */}
              <div className="game-card p-4">
                <h4 className="text-game-accent mb-3 flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Spieler-Manipulation
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-game-foreground/70">Level:</span>
                    <div className="flex items-center">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-white border-game-accent/30"
                        onClick={() => setPlayerLevel(Math.max(1, playerStats.level - 1))}
                      >
                        -
                      </Button>
                      <span className="mx-3 text-game-highlight">{playerStats.level}</span>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-white border-game-accent/30"
                        onClick={() => setPlayerLevel(playerStats.level + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-game-accent/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-game-foreground/70">Münzen:</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="flex-1 text-white border-game-accent/30"
                        onClick={() => addCoins(100)}
                      >
                        +100
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="flex-1 text-white border-game-accent/30"
                        onClick={() => addCoins(500)}
                      >
                        +500
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="flex-1 text-white border-game-accent/30"
                        onClick={() => addCoins(1000)}
                      >
                        +1000
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-game-accent/20">
                    <Button
                      variant="outline"
                      className="w-full text-white border-game-accent/30"
                      onClick={() => {
                        updatePlayerStats({ 
                          health: playerStats.maxHealth 
                        });
                        
                        toast({
                          description: "Spieler vollständig geheilt.",
                          variant: "default",
                        });
                      }}
                    >
                      <RotateCw className="h-4 w-4 mr-2" />
                      Vollständig heilen
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="pt-2 border-t border-game-accent/20">
              <Button
                variant="outline"
                className="text-red-500 border-red-500/30 hover:bg-red-500/10"
                onClick={() => {
                  setDevMode(false);
                  setShowDevPanel(false);
                  
                  toast({
                    description: "Entwicklermodus deaktiviert.",
                    variant: "default",
                  });
                }}
              >
                <Terminal className="h-4 w-4 mr-2" />
                Dev-Modus verlassen
              </Button>
              
              <Button
                className="bg-game-accent hover:bg-game-accent/90"
                onClick={() => setShowDevPanel(false)}
              >
                <span className="text-white">Schließen</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Reset Confirmation Dialog */}
      <Dialog open={showConfirmReset} onOpenChange={setShowConfirmReset}>
        <DialogContent className="bg-game-secondary border-game-accent/40 text-game-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <AlertCircle className="h-5 w-5 mr-2" />
              Fortschritt zurücksetzen?
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-game-foreground/80">
              Bist du sicher, dass du deinen gesamten Fortschritt zurücksetzen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            
            <div className="flex justify-between pt-2">
              <Button 
                variant="outline"
                className="text-game-foreground border-game-foreground/30"
                onClick={() => setShowConfirmReset(false)}
              >
                Abbrechen
              </Button>
              
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  resetProgress();
                  setShowConfirmReset(false);
                }}
              >
                Zurücksetzen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPanel;

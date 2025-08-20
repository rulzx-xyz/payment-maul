import React, { useState, useCallback, useMemo } from 'react';
import HomePage from './components/HomePage';
import PaymentPage from './components/PaymentPage';
import CopiedMessage from './components/CopiedMessage';

type View = 'home' | 'payment';
type ContentType = 'qr' | 'dana' | null;

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [transitionClass, setTransitionClass] = useState('animate-fadeIn');
  const [isCopiedVisible, setIsCopiedVisible] = useState(false);
  const [copiedContentType, setCopiedContentType] = useState<ContentType>(null);
  const [isAudioStarted, setIsAudioStarted] = useState(false);

  document.title = `MAUL TECH PAYMENT`;

  const audio = useMemo(() => new Audio('https://files.catbox.moe/qqwpdj.m4a'), []);

  const playSound = useCallback(() => {
    if (!isAudioStarted) {
      audio.loop = true;
      audio.play().catch(error => console.error("Error playing sound:", error));
      setIsAudioStarted(true);
    }
  }, [audio, isAudioStarted]);

  const navigate = useCallback((targetView: View) => {
    setTransitionClass('animate-fadeOut');
    setTimeout(() => {
      setView(targetView);
      setTransitionClass('animate-fadeIn');
    }, 400);
  }, []);

  const showCopiedMessage = useCallback((type: 'qr' | 'dana') => {
    setCopiedContentType(type);
    setIsCopiedVisible(true);
  }, []);
  
  const hideCopiedMessage = useCallback(() => {
    setIsCopiedVisible(false);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen font-['Rajdhani'] text-slate-800">
      <main className="relative z-10 w-full max-w-md p-5 text-center sm:max-w-lg">
        <div className={`${view === 'home' ? transitionClass : 'hidden'}`}>
          <HomePage 
            onNavigate={() => navigate('payment')}
            playSound={playSound}
          />
        </div>
        <div className={`${view === 'payment' ? transitionClass : 'hidden'}`}>
          <PaymentPage 
            onBack={() => navigate('home')} 
            showCopiedMessage={showCopiedMessage}
            playSound={playSound}
          />
        </div>
      </main>

      <CopiedMessage 
        isVisible={isCopiedVisible} 
        onConfirm={hideCopiedMessage} 
        contentType={copiedContentType}
        playSound={playSound}
      />
    </div>
  );
};

export default App;
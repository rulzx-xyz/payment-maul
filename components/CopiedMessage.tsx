import React, { useState, useEffect } from 'react';
import { IconCheckCircle, IconCheck } from './Icons';

interface CopiedMessageProps {
  isVisible: boolean;
  onConfirm: () => void;
  contentType: 'qr' | 'dana' | null;
  playSound: () => void;
}

const CopiedMessage: React.FC<CopiedMessageProps> = ({ isVisible, onConfirm, contentType, playSound }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isVisible) {
      setAnimationClass('animate-popin');
    } else if (animationClass === 'animate-popin') { // Only animate out if it was visible
      setAnimationClass('animate-popout');
    }
  }, [isVisible, animationClass]);

  if (!isVisible && animationClass !== 'animate-popout') return null;
  
  const handleConfirm = () => {
    playSound();
    setAnimationClass('animate-popout');
    setTimeout(onConfirm, 300); // Match animation duration
  };

  const title = contentType === 'dana' ? 'BERHASIL COPY NOMER' : 'BERHASIL DOWNLOAD QRIS';
  const subtitle = contentType === 'qr' ? <div className="text-sm mb-4 text-slate-500 font-normal">Check Galeri Untuk Melihat Gambar Qris</div> : null;

  return (
    <div 
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-sm z-[1000] ${animationClass}`}
      onAnimationEnd={() => { if (animationClass === 'animate-popout') setAnimationClass(''); }}
    >
      <div className="bg-white p-6 rounded-2xl text-slate-800 font-bold text-center border border-slate-200 shadow-xl">
        <div className="flex justify-center text-slate-800 mb-3">
            <IconCheckCircle className="w-16 h-16"/>
        </div>
        <div className="mb-2 text-xl tracking-wide">{title}</div>
        {subtitle}
        <button onClick={handleConfirm} className="flex items-center justify-center w-full gap-2 bg-slate-900 text-white py-3 px-6 mt-4 rounded-full font-bold cursor-pointer transition-all duration-300 hover:scale-105 active:scale-100 tracking-wider hover:bg-slate-700">
          <IconCheck />
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default CopiedMessage;
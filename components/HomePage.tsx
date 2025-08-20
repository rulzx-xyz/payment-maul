import React from 'react';
import ContentPanel from './GlassPanelWrapper';
import { IconArrowRight } from './Icons';

interface HomePageProps {
  onNavigate: () => void;
  playSound: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, playSound }) => {
  const handleNavigate = () => {
    playSound();
    onNavigate();
  };

  return (
    <ContentPanel>
      <div className="group relative w-40 h-40 mx-auto mb-8">
        <img src="https://files.catbox.moe/ql4jf7.jpeg" alt="Logo" className="relative w-full h-full rounded-full object-cover ring-4 ring-slate-200" />
      </div>
      
      <h1 
        className="font-['Orbitron'] text-3xl md:text-4xl my-5 uppercase tracking-[4px] text-slate-900"
      >
        ＭΛＵＬＴΞＣＨ PAYMENT
      </h1>
      <div className="w-2/3 h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mt-2 mb-8"></div>

      <button
        onClick={handleNavigate}
        className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 text-white py-3 px-8 rounded-full font-['Orbitron'] font-bold text-lg tracking-wider uppercase cursor-pointer my-4 transition-all duration-300 ease-in-out hover:bg-slate-700 hover:scale-105 active:scale-100"
      >
        <IconArrowRight />
        TO PAYMENT
      </button>
    </ContentPanel>
  );
};

export default HomePage;
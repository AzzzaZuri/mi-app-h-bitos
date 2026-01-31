
import React from 'react';

interface NavigationProps {
  currentView: 'home' | 'stats' | 'bmm';
  setView: (view: 'home' | 'stats' | 'bmm') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-800 p-4 flex justify-around items-center z-40">
      <button 
        onClick={() => setView('home')}
        className={`flex flex-col items-center gap-1 transition-all ${currentView === 'home' ? 'text-purple-400' : 'text-zinc-500'}`}
      >
        <i className="fa-solid fa-calendar-check text-xl"></i>
        <span className="text-[10px] font-bold">HÁBITOS</span>
      </button>

      <button 
        onClick={() => setView('stats')}
        className={`flex flex-col items-center gap-1 transition-all ${currentView === 'stats' ? 'text-purple-400' : 'text-zinc-500'}`}
      >
        <i className="fa-solid fa-chart-line text-xl"></i>
        <span className="text-[10px] font-bold">PROGRESO</span>
      </button>

      <button 
        onClick={() => setView('bmm')}
        className={`flex flex-col items-center gap-1 transition-all ${currentView === 'bmm' ? 'text-purple-400' : 'text-zinc-500'}`}
      >
        <i className="fa-solid fa-pen-to-square text-xl"></i>
        <span className="text-[10px] font-bold">BMM</span>
      </button>
    </nav>
  );
};

export default Navigation;

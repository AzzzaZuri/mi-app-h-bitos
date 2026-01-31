
import React, { useState } from 'react';
import { Habit } from '../types';
import { COLORS } from '../constants';

interface HeaderProps {
  setView: (view: 'home' | 'stats' | 'bmm') => void;
  currentView: string;
  onAddHabit: (habit: Habit) => void;
}

const Header: React.FC<HeaderProps> = ({ setView, currentView, onAddHabit }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDesc, setNewHabitDesc] = useState('');

  const handleAdd = () => {
    if (!newHabitName) return;
    const h: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      description: newHabitDesc,
      icon: 'fa-star',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      completedDates: []
    };
    onAddHabit(h);
    setNewHabitName('');
    setNewHabitDesc('');
    setShowAdd(false);
  };

  return (
    <header className="p-4 flex items-center justify-between sticky top-0 bg-black z-20">
      <button className="p-2 text-zinc-600 hover:text-white transition-colors">
        <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
      </button>
      
      <h1 className="text-lg font-black tracking-tighter flex items-center gap-1 uppercase">
        Habit<span className="text-purple-500">Kit</span>
      </h1>

      <div className="flex gap-1">
        <button 
          onClick={() => setShowAdd(true)}
          className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white bg-zinc-900 rounded-full border border-zinc-800 transition-all active:scale-90"
        >
          <i className="fa-solid fa-plus text-sm"></i>
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 w-full rounded-3xl p-6 border border-zinc-800 shadow-2xl">
            <h2 className="text-xl font-black mb-6 text-center uppercase tracking-widest">Añadir Hábito</h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Nombre (ej: Meditar)" 
                className="w-full bg-zinc-800 border-none rounded-2xl p-4 text-white placeholder-zinc-500 focus:ring-1 focus:ring-purple-500"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Descripción corta" 
                className="w-full bg-zinc-800 border-none rounded-2xl p-4 text-white placeholder-zinc-500 focus:ring-1 focus:ring-purple-500"
                value={newHabitDesc}
                onChange={(e) => setNewHabitDesc(e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setShowAdd(false)}
                className="flex-1 bg-zinc-800 py-4 rounded-2xl font-bold text-zinc-400"
              >
                Cerrar
              </button>
              <button 
                onClick={handleAdd}
                className="flex-1 bg-purple-600 py-4 rounded-2xl font-bold shadow-lg shadow-purple-500/20"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

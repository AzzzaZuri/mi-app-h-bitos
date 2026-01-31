
import React, { useState, useEffect, useCallback } from 'react';
import { Habit, DailyReflection } from './types';
import { DEFAULT_HABITS } from './constants';
import HabitList from './components/HabitList';
import Statistics from './components/Statistics';
import BMM from './components/BMM';
import Header from './components/Header';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'stats' | 'bmm'>('home');
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habitkit_habits');
    return saved ? JSON.parse(saved) : DEFAULT_HABITS;
  });
  const [reflections, setReflections] = useState<DailyReflection[]>(() => {
    const saved = localStorage.getItem('habitkit_reflections');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistencia
  useEffect(() => {
    localStorage.setItem('habitkit_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('habitkit_reflections', JSON.stringify(reflections));
  }, [reflections]);

  // Lógica de Notificaciones
  useEffect(() => {
    if (!("Notification" in window)) return;

    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    const checkTime = setInterval(() => {
      const now = new Date();
      // 22:30
      if (now.getHours() === 22 && now.getMinutes() === 30) {
        const lastNotified = localStorage.getItem('last_notified_date');
        const todayStr = now.toISOString().split('T')[0];
        
        if (lastNotified !== todayStr && Notification.permission === "granted") {
          new Notification("HabitKit: Hora de tu registro", {
            body: "¿Cómo han ido tus hábitos hoy? Rellena tu BMM.",
            icon: "https://cdn-icons-png.flaticon.com/512/3593/3593452.png"
          });
          localStorage.setItem('last_notified_date', todayStr);
        }
      }
    }, 30000); // Revisar cada 30 segundos

    return () => clearInterval(checkTime);
  }, []);

  const toggleHabit = useCallback((habitId: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const alreadyCompleted = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: alreadyCompleted
            ? habit.completedDates.filter(d => d !== date)
            : [...habit.completedDates, date]
        };
      }
      return habit;
    }));
  }, []);

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(prev => prev.map(h => h.id === updatedHabit.id ? updatedHabit : h));
  };

  const addHabit = (newHabit: Habit) => {
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const saveReflection = (reflection: DailyReflection) => {
    setReflections(prev => {
      const existing = prev.findIndex(r => r.date === reflection.date);
      if (existing !== -1) {
        const next = [...prev];
        next[existing] = reflection;
        return next;
      }
      return [...prev, reflection];
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white max-w-md mx-auto relative shadow-2xl overflow-hidden font-sans">
      <Header setView={setView} currentView={view} onAddHabit={addHabit} />
      
      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
        {view === 'home' && (
          <HabitList 
            habits={habits} 
            toggleHabit={toggleHabit} 
            updateHabit={updateHabit}
            deleteHabit={deleteHabit}
          />
        )}
        {view === 'stats' && <Statistics habits={habits} />}
        {view === 'bmm' && (
          <BMM 
            reflections={reflections} 
            saveReflection={saveReflection} 
          />
        )}
      </main>

      <Navigation currentView={view} setView={setView} />
    </div>
  );
};

export default App;

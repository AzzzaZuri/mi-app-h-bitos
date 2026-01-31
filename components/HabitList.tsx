
import React from 'react';
import { Habit } from '../types';
import HabitCard from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  toggleHabit: (id: string, date: string) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, toggleHabit, updateHabit, deleteHabit }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-4">
      {habits.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-500 mb-4">Aún no tienes hábitos configurados.</p>
          <p className="text-sm text-zinc-600">Pulsa el botón + para empezar.</p>
        </div>
      ) : (
        habits.map(habit => (
          <HabitCard 
            key={habit.id} 
            habit={habit} 
            today={today}
            toggleHabit={toggleHabit}
            updateHabit={updateHabit}
            deleteHabit={deleteHabit}
          />
        ))
      )}
    </div>
  );
};

export default HabitList;

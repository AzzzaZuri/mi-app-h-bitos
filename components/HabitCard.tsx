
import React, { useState } from 'react';
import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  today: string;
  toggleHabit: (id: string, date: string) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, today, toggleHabit, updateHabit, deleteHabit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const isCompletedToday = habit.completedDates.includes(today);

  // Generar datos del calendario para el mes actual
  const generateMonthlyGrid = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // Nombre del mes
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(now);
    
    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Ajustar para que Lunes sea 0 (JS por defecto usa Domingo=0)
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6; 

    // Total de días en el mes
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    
    // Espacios vacíos antes del primer día del mes
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push({ date: null, isCompleted: false, isPadding: true });
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isCompleted = habit.completedDates.includes(dateStr);
      cells.push({ date: dateStr, isCompleted, isPadding: false, dayNum: day });
    }

    return { cells, monthName };
  };

  const { cells, monthName } = generateMonthlyGrid();
  const dayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  return (
    <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800 transition-transform active:scale-[0.98]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
            <i className={`fa-solid ${habit.icon} text-xl`} style={{ color: habit.color }}></i>
          </div>
          <div onClick={() => setIsEditing(true)} className="cursor-pointer">
            <h3 className="font-bold text-lg">{habit.name}</h3>
            <p className="text-zinc-500 text-xs leading-tight capitalize">{monthName}</p>
          </div>
        </div>
        
        <button 
          onClick={() => toggleHabit(habit.id, today)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            isCompletedToday 
              ? 'shadow-lg shadow-purple-500/20' 
              : 'border-2 border-zinc-800'
          }`}
          style={{ backgroundColor: isCompletedToday ? habit.color : 'transparent' }}
        >
          {isCompletedToday ? (
            <i className="fa-solid fa-check text-white text-xl"></i>
          ) : (
            <i className="fa-solid fa-plus text-zinc-500 text-xl"></i>
          )}
        </button>
      </div>

      <div className="mt-2">
        {/* Etiquetas de días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayLabels.map(label => (
            <div key={label} className="text-[9px] text-zinc-600 font-bold text-center">
              {label}
            </div>
          ))}
        </div>
        
        {/* Cuadrícula del calendario */}
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((cell, idx) => (
            <div 
              key={idx}
              className={`aspect-square rounded-[4px] flex items-center justify-center transition-all ${
                cell.isPadding ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ 
                backgroundColor: cell.isCompleted ? habit.color : '#1f2937',
                border: cell.date === today ? `1px solid ${habit.color}` : 'none'
              }}
            >
              {!cell.isPadding && (
                <span className="text-[7px] font-bold text-white/40">{cell.dayNum}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 w-full rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Editar Hábito</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Nombre</label>
                <input 
                  type="text" 
                  defaultValue={habit.name}
                  className="w-full bg-zinc-800 border-none rounded-lg p-3 text-white"
                  onBlur={(e) => updateHabit({...habit, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Descripción</label>
                <input 
                  type="text" 
                  defaultValue={habit.description}
                  className="w-full bg-zinc-800 border-none rounded-lg p-3 text-white"
                  onBlur={(e) => updateHabit({...habit, description: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => { deleteHabit(habit.id); setIsEditing(false); }}
                  className="flex-1 bg-red-900/20 text-red-500 py-3 rounded-xl font-semibold border border-red-900/50"
                >
                  Eliminar
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-purple-600 py-3 rounded-xl font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitCard;

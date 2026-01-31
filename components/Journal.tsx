
import React, { useState } from 'react';
import { DailyReflection } from '../types';

interface JournalProps {
  reflections: DailyReflection[];
  saveReflection: (reflection: DailyReflection) => void;
}

const Journal: React.FC<JournalProps> = ({ reflections, saveReflection }) => {
  const today = new Date().toISOString().split('T')[0];
  const currentReflection = reflections.find(r => r.date === today) || {
    date: today,
    good: '',
    bad: '',
    improve: ''
  };

  const [formData, setFormData] = useState<DailyReflection>(currentReflection);

  const handleSave = () => {
    saveReflection(formData);
    alert('Reflexión guardada correctamente.');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-pen-nib text-purple-400"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold">Diario de Hoy</h2>
            <p className="text-zinc-500 text-sm">
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-bold text-zinc-400 mb-2 block uppercase tracking-tight">
              ¿Qué has hecho bien hoy?
            </label>
            <textarea 
              className="w-full bg-black/50 border border-zinc-800 rounded-2xl p-4 text-white focus:ring-1 focus:ring-purple-500 min-h-[100px]"
              placeholder="Describe tus logros..."
              value={formData.good}
              onChange={(e) => setFormData({...formData, good: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-zinc-400 mb-2 block uppercase tracking-tight">
              ¿Qué ha salido mal?
            </label>
            <textarea 
              className="w-full bg-black/50 border border-zinc-800 rounded-2xl p-4 text-white focus:ring-1 focus:ring-purple-500 min-h-[100px]"
              placeholder="Analiza los obstáculos..."
              value={formData.bad}
              onChange={(e) => setFormData({...formData, bad: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-zinc-400 mb-2 block uppercase tracking-tight">
              ¿Qué tienes que mejorar?
            </label>
            <textarea 
              className="w-full bg-black/50 border border-zinc-800 rounded-2xl p-4 text-white focus:ring-1 focus:ring-purple-500 min-h-[100px]"
              placeholder="Tus metas para mañana..."
              value={formData.improve}
              onChange={(e) => setFormData({...formData, improve: e.target.value})}
            />
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-purple-500/20"
          >
            Guardar Reflexión
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-zinc-400 font-bold mb-4 ml-2 uppercase text-xs tracking-widest">Historial de Diario</h3>
        <div className="space-y-3">
          {reflections.filter(r => r.date !== today).slice(-5).reverse().map((r, i) => (
            <div key={i} className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
              <p className="text-zinc-500 text-xs font-bold mb-2 uppercase">{r.date}</p>
              <p className="text-sm italic text-zinc-300 line-clamp-2">“{r.good}”</p>
            </div>
          ))}
          {reflections.length <= 1 && (
            <p className="text-zinc-600 text-sm text-center italic py-4">Aún no hay registros anteriores.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;

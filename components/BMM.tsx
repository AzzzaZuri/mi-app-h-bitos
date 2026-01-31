
import React, { useState } from 'react';
import { DailyReflection } from '../types';

interface BMMProps {
  reflections: DailyReflection[];
  saveReflection: (reflection: DailyReflection) => void;
}

const BMM: React.FC<BMMProps> = ({ reflections, saveReflection }) => {
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
    alert('BMM guardado. ¡Buen trabajo por hoy!');
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-clipboard-check text-emerald-400"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold italic tracking-tight">MÉTODO BMM</h2>
            <p className="text-zinc-500 text-xs font-mono">{today}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-emerald-500 mb-2 block uppercase tracking-widest">
              ¿Qué has hecho bien hoy? (B)
            </label>
            <textarea 
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-200 focus:ring-1 focus:ring-emerald-500 min-h-[80px] outline-none transition-all"
              placeholder="Tus victorias de hoy..."
              value={formData.good}
              onChange={(e) => setFormData({...formData, good: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-red-500 mb-2 block uppercase tracking-widest">
              ¿Qué ha salido mal? (M)
            </label>
            <textarea 
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-200 focus:ring-1 focus:ring-red-500 min-h-[80px] outline-none transition-all"
              placeholder="Lo que no salió como esperabas..."
              value={formData.bad}
              onChange={(e) => setFormData({...formData, bad: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-blue-500 mb-2 block uppercase tracking-widest">
              ¿Qué tienes que mejorar? (M)
            </label>
            <textarea 
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-200 focus:ring-1 focus:ring-blue-500 min-h-[80px] outline-none transition-all"
              placeholder="Plan de acción para mañana..."
              value={formData.improve}
              onChange={(e) => setFormData({...formData, improve: e.target.value})}
            />
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-zinc-100 text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg"
          >
            Guardar Registro
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-zinc-500 font-black mb-4 ml-2 uppercase text-[10px] tracking-[0.2em]">Historial BMM</h3>
        <div className="space-y-4">
          {reflections.filter(r => r.date !== today).slice(-7).reverse().map((r, i) => (
            <div key={i} className="bg-zinc-900/40 p-5 rounded-3xl border border-zinc-800/50">
              <div className="flex justify-between items-center mb-3">
                 <p className="text-zinc-400 text-[10px] font-mono font-bold uppercase">{r.date}</p>
                 <i className="fa-solid fa-check-double text-[10px] text-zinc-700"></i>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex gap-3">
                  <span className="text-emerald-500 font-bold text-xs">B:</span>
                  <p className="text-xs text-zinc-400 italic line-clamp-1">{r.good || '---'}</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-500 font-bold text-xs">M:</span>
                  <p className="text-xs text-zinc-400 italic line-clamp-1">{r.bad || '---'}</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-500 font-bold text-xs">M:</span>
                  <p className="text-xs text-zinc-400 italic line-clamp-1">{r.improve || '---'}</p>
                </div>
              </div>
            </div>
          ))}
          {reflections.length <= 1 && (
            <div className="text-center py-10 opacity-30">
              <i className="fa-solid fa-box-open text-4xl mb-4"></i>
              <p className="text-xs uppercase tracking-widest">Sin registros pasados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMM;

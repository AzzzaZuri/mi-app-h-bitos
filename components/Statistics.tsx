
import React, { useMemo } from 'react';
import { Habit } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

interface StatisticsProps {
  habits: Habit[];
}

const Statistics: React.FC<StatisticsProps> = ({ habits }) => {
  // 1. Process data for Line Chart (Mountain Chart) - Last 14 days
  const lineData = useMemo(() => {
    const data = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const completedCount = habits.reduce((acc, habit) => 
        habit.completedDates.includes(dateStr) ? acc + 1 : acc, 0
      );
      
      data.push({
        name: d.toLocaleDateString('es-ES', { weekday: 'short' }),
        fullDate: dateStr,
        completed: completedCount,
        total: habits.length,
        ratio: habits.length > 0 ? (completedCount / habits.length) * 100 : 0
      });
    }
    return data;
  }, [habits]);

  // 2. Process data for Bar Chart - Sorted by completion count
  const habitRankData = useMemo(() => {
    return habits.map(h => ({
      name: h.name,
      count: h.completedDates.length,
      color: h.color
    })).sort((a, b) => b.count - a.count);
  }, [habits]);

  const bestHabit = habitRankData[0];
  const worstHabit = habitRankData[habitRankData.length - 1];

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
        <h3 className="text-zinc-400 font-semibold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-mountain text-purple-400"></i>
          Progreso Diario (Lineal)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#666', fontSize: 12 }} 
              />
              <YAxis 
                hide 
                domain={[0, habits.length]} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#a855f7' }}
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#a855f7" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#a855f7', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800">
          <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Más constante</p>
          <p className="text-purple-400 font-bold truncate">{bestHabit?.name || '---'}</p>
          <p className="text-2xl font-black mt-1">{bestHabit?.count || 0}</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800">
          <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Menos constante</p>
          <p className="text-pink-400 font-bold truncate">{worstHabit?.name || '---'}</p>
          <p className="text-2xl font-black mt-1">{worstHabit?.count || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
        <h3 className="text-zinc-400 font-semibold mb-6">Ranking de Hábitos</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={habitRankData} layout="vertical" margin={{ left: -20 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#fff', fontSize: 10, width: 80 }} 
                width={80}
              />
              <Tooltip cursor={{ fill: '#222' }} contentStyle={{ backgroundColor: '#18181b', border: 'none' }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {habitRankData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

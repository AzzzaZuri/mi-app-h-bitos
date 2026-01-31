
import { Habit } from './types';

export const DEFAULT_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Caminar por la manzana',
    description: 'Dar un paseo corto para despejar la mente',
    icon: 'fa-person-walking',
    color: '#10b981', // Emerald 500
    completedDates: []
  },
  {
    id: '2',
    name: 'Aprender Noruego',
    description: 'Tres lecciones al día',
    icon: 'fa-language',
    color: '#a855f7', // Purple 500
    completedDates: []
  },
  {
    id: '3',
    name: 'Comer una fruta',
    description: 'Mantente sano y no comas de más',
    icon: 'fa-apple-whole',
    color: '#ef4444', // Red 500
    completedDates: []
  },
  {
    id: '4',
    name: 'Estirar 5 minutos',
    description: 'Mejorar flexibilidad y relajar músculos',
    icon: 'fa-yin-yang',
    color: '#f97316', // Orange 500
    completedDates: []
  },
  {
    id: '5',
    name: 'Ejercicio de respiración',
    description: 'Calma tu mente con un ejercicio rápido',
    icon: 'fa-leaf',
    color: '#22c55e', // Green 500
    completedDates: []
  }
];

export const COLORS = [
  '#10b981', '#a855f7', '#ef4444', '#f97316', '#22c55e', '#3b82f6', '#ec4899', '#facc15'
];

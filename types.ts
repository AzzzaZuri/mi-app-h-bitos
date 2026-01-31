
export interface Habit {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  completedDates: string[]; // Array of YYYY-MM-DD
}

export interface DailyReflection {
  date: string;
  good: string;
  bad: string;
  improve: string;
}

export interface DailyStats {
  date: string;
  completedCount: number;
  totalCount: number;
  ratio: number;
}

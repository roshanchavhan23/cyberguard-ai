import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/lib/supabase';

interface DashboardStats {
  totalScans: number;
  threatsDetected: number;
  distressLogs: number;
  criticalCases: number;
  totalReports: number;
}

export function usePlatformStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    getDashboardStats().then((data) => {
      if (data) setStats(data);
    });
  }, []);

  return stats;
}

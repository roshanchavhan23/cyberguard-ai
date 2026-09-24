import { useState, useEffect } from 'react';
import { getPlatformStats } from '@/lib/supabase';

interface PlatformStats {
  totalScans: number;
  threatsDetected: number;
  chatSessions: number;
}

export function usePlatformStats() {
  const [stats, setStats] = useState<PlatformStats | null>(null);

  useEffect(() => {
    getPlatformStats().then((data) => {
      if (data) setStats(data);
    });
  }, []);

  return stats;
}

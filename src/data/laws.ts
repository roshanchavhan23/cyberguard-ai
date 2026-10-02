import { supabase } from '@/lib/supabase';
import type { CyberLaw } from '@/types';

export async function fetchCyberLaws(): Promise<CyberLaw[]> {
  const { data, error } = await supabase
    .from('cyber_laws')
    .select('id, law_name, category, year, ministry, description, key_provisions, penalties, reporting_authority, official_url')
    .order('year', { ascending: false });

  if (error) {
    console.error('[fetchCyberLaws]', error.message);
    return [];
  }

  return (data ?? []) as unknown as CyberLaw[];
}

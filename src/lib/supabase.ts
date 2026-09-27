import { createClient } from '@supabase/supabase-js';

// Supabase configuration using client-side Vite environment variables
export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://qzscfazqaufdfdjnbmmd.supabase.co';

export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  'sb_publishable_nGLt4zwnnavyAt7RJAQDqQ__jhs7BN_';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  projectUrl: string;
  hasKey: boolean;
  source: 'import.meta.env' | 'fallback';
}

export function getSupabaseStatus(): SupabaseConfigStatus {
  const hasEnvUrl = Boolean(import.meta.env.VITE_SUPABASE_URL);
  return {
    isConfigured: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
    projectUrl: SUPABASE_URL,
    hasKey: Boolean(SUPABASE_ANON_KEY),
    source: hasEnvUrl ? 'import.meta.env' : 'fallback',
  };
}

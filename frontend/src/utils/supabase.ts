import { createClient } from "@supabase/supabase-js";

// Declare the runtime environment variables type
declare global {
  interface Window {
    __ENV__?: {
      VITE_SUPABASE_URL?: string;
      VITE_SUPABASE_ANON_KEY?: string;
      VITE_OPENWEATHER_API_KEY?: string;
    };
  }
}

// Get environment variables from runtime config or build-time config
const getEnvVar = (key: string): string => {
  // Check if runtime environment variables are available
  if (typeof window !== 'undefined' && window.__ENV__) {
    return (window.__ENV__ as any)[key] || '';
  }
  // Fall back to build-time environment variables
  return import.meta.env[key] || '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Check if environment variables are properly configured
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables are not configured:', {
    VITE_SUPABASE_URL: supabaseUrl ? 'Set' : 'Missing',
    VITE_SUPABASE_ANON_KEY: supabaseKey ? 'Set' : 'Missing'
  });
}

// Create Supabase client
const supabase = createClient(
  supabaseUrl || 'https://dummy.supabase.co',
  supabaseKey || 'dummy-key'
);

export default supabase;

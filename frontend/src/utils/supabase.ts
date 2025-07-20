import { createClient } from "@supabase/supabase-js";

// Extend global Window interface to include __ENV__
declare global {
  interface Window {
    __ENV__?: {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_ANON_KEY: string;
      VITE_OPENWEATHER_API_KEY?: string;
    };
  }
}

// Explicit list of env keys we expect
type EnvKey = "VITE_SUPABASE_URL" | "VITE_SUPABASE_ANON_KEY";

/**
 * Fetches the environment variable, checking runtime window.__ENV__ first,
 * then falling back to build-time import.meta.env.
 */
const getEnvVar = (key: EnvKey): string => {
  if (typeof window !== "undefined" && window.__ENV__?.[key]) {
    return window.__ENV__[key];
  }
  const val = import.meta.env[key];
  if (val) return val;
  throw new Error(`Environment variable ${key} is not set.`);
};

// Read variables safely
const supabaseUrl = getEnvVar("VITE_SUPABASE_URL");
const supabaseKey = getEnvVar("VITE_SUPABASE_ANON_KEY");

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

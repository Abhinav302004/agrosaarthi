import { createClient } from "@supabase/supabase-js";

// Declare global window interface for runtime env vars
declare global {
  interface Window {
    __ENV__?: {
      VITE_SUPABASE_URL?: string;
      VITE_SUPABASE_ANON_KEY?: string;
      VITE_OPENWEATHER_API_KEY?: string;
    };
  }
}

// Helper function to get env variables from runtime or build time
const getEnvVar = (key: string): string => {
  if (typeof window !== "undefined" && window.__ENV__ && (window.__ENV__ as any)[key]) {
    return (window.__ENV__ as any)[key];
  }
  return (import.meta.env[key] as string | undefined) ?? "";
};

const supabaseUrl = getEnvVar("VITE_SUPABASE_URL");
const supabaseKey = getEnvVar("VITE_SUPABASE_ANON_KEY");

// Fail-fast if required env vars are missing
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    `Missing Supabase environment variables:
     VITE_SUPABASE_URL: ${supabaseUrl ? "Set" : "Missing"},
     VITE_SUPABASE_ANON_KEY: ${supabaseKey ? "Set" : "Missing"}`
  );
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

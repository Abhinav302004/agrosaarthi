// Test utility to check environment variables
export function checkEnvironmentVariables() {
  const env = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_OPENWEATHER_API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
  };

  console.log('Environment variables:', env);

  const missing = Object.entries(env)
    .filter(([value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    return false;
  }

  return true;
} 
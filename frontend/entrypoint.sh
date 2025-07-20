#!/bin/sh

# Write env.js with runtime values
cat <<EOF > /usr/share/nginx/html/env.js
window.__ENV__ = {
  VITE_SUPABASE_URL: "${VITE_SUPABASE_URL}",
  VITE_SUPABASE_ANON_KEY: "${VITE_SUPABASE_ANON_KEY}",
  VITE_OPENWEATHER_API_KEY: "${VITE_OPENWEATHER_API_KEY}"
};
EOF

# Start nginx
exec nginx -g 'daemon off;'

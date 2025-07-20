# AgroSaarthi Frontend

## Deployment with Environment Variables

This application requires Supabase environment variables to function properly. The deployment has been configured to inject environment variables at runtime.

### Required Environment Variables

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key
- `VITE_OPENWEATHER_API_KEY` - Your OpenWeather API key (optional)

### Docker Deployment

```bash
# Build the image
docker build -t agrosaarthi-frontend .

# Run with environment variables
docker run -d \
  -p 80:80 \
  -e VITE_SUPABASE_URL="your-supabase-url" \
  -e VITE_SUPABASE_ANON_KEY="your-supabase-anon-key" \
  -e VITE_OPENWEATHER_API_KEY="your-openweather-api-key" \
  agrosaarthi-frontend
```

### Troubleshooting

1. **"Failed to fetch" error**: Check that environment variables are properly set
2. **Check browser console**: Look for error messages about missing environment variables
3. **Verify Supabase credentials**: Ensure your Supabase URL and anon key are correct

### Getting Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon/public key
4. Use these values for the environment variables

### Development

```bash
npm install
npm run dev
``` 
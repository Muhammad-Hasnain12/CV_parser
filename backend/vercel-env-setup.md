# Vercel Environment Variables Setup

## Set these in your Vercel dashboard:

1. Go to your project dashboard
2. Click on "Settings" → "Environment Variables"
3. Add these variables:

```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-vercel-url.vercel.app
```

## Or use Vercel CLI:

```bash
vercel env add NODE_ENV
vercel env add FRONTEND_URL
```

## Deploy with environment variables:

```bash
vercel --prod
``` 
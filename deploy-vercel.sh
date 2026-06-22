# Deploy to Vercel (Frontend Only - requires separate API deployment)
# Prerequisites: Vercel CLI installed and authenticated

# 1. Build the project first
npm run build

# 2. Deploy to Vercel
vercel --prod

# Note: For full-stack deployment on Vercel, you'll need to:
# - Move server.ts to an API route in /api/generate-copy.ts
# - Update the frontend to call the Vercel Function endpoint
# - Set GEMINI_API_KEY in Vercel project settings

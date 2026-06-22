# Deploy to Render.com
# Prerequisites: Render CLI or use the web dashboard

# 1. Create a new Web Service on Render
# - Connect your GitHub repository
# - Build Command: npm run build
# - Start Command: node dist/server.js (or npm run start)

# 2. Set Environment Variables in Render Dashboard:
# - GEMINI_API_KEY=your_api_key_here
# - NODE_ENV=production
# - PORT=8080

# 3. Render will automatically deploy on push to main branch

# Alternative: Use render.yaml for Infrastructure as Code
# Create render.yaml in your project root:

# services:
#   - type: web
#     name: cove-brand-system
#     env: node
#     buildCommand: npm run build
#     startCommand: npm run start
#     envVars:
#       - key: GEMINI_API_KEY
#         sync: false
#       - key: NODE_ENV
#         value: production
#       - key: PORT
#         value: 8080

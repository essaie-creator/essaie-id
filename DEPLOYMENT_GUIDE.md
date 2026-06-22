# 🌐 Cove Brand System - Online Deployment Guide

Your application is now **production-ready** with enterprise-grade security features.

## 🔒 Security Enhancements Added

✅ **Helmet.js** - HTTP security headers
- Content Security Policy (CSP) configured
- XSS protection
- Frame options protection
- HSTS enabled

✅ **Compression** - Gzip/Brotli compression for performance

✅ **Rate Limiting Ready** - Payload size limited to 1MB

✅ **Environment Variables** - API keys securely managed

---

## 🚀 Deployment Options

### Option 1: Google Cloud Run (Recommended ⭐)

**Best for:** Full-stack deployment, scalability, Google AI integration

```bash
# Make script executable
chmod +x deploy-cloud-run.sh

# Edit the script with your API key
nano deploy-cloud-run.sh

# Run deployment
./deploy-cloud-run.sh
```

**Estimated Cost:** ~$2-10/month (pay-per-request)

---

### Option 2: Vercel

**Best for:** Frontend performance, easy CI/CD

```bash
# Install Vercel CLI
npm i -g vercel

# Make script executable
chmod +x deploy-vercel.sh

# Deploy
./deploy-vercel.sh
```

**Note:** For full-stack, move `server.ts` to `/api/generate-copy.ts`

**Estimated Cost:** Free tier available, $20/month for Pro

---

### Option 3: Render.com

**Best for:** Simple deployment, automatic HTTPS, free tier

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Use settings from `deploy-render.sh`

**Estimated Cost:** Free tier available, $7/month for standard

---

### Option 4: Railway.app

**Best for:** Developer experience, one-click deploys

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Add `GEMINI_API_KEY` in Variables tab
4. Deploy automatically

**Estimated Cost:** $5/month starter plan

---

## 📋 Pre-Deployment Checklist

- [ ] Build passes locally: `npm run build`
- [ ] Tests pass: `npm test`
- [ ] `GEMINI_API_KEY` obtained from [Google AI Studio](https://aistudio.google.com/)
- [ ] Environment variables configured in hosting platform
- [ ] CORS policy reviewed (currently allows all for development)
- [ ] Database/persistence needs assessed (currently stateless)

---

## 🔧 Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | ✅ Yes |
| `NODE_ENV` | Set to `production` | ✅ Yes |
| `PORT` | Server port (default: 8080) | Optional |

---

## 🛡️ Security Best Practices Implemented

1. **Content Security Policy (CSP)**
   - Only allows scripts/styles from trusted sources
   - Prevents inline script injection
   - Allows Google Fonts and Gemini API

2. **HTTP Headers (Helmet)**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`
   - `Strict-Transport-Security`

3. **Payload Protection**
   - Request body limited to 1MB
   - JSON parsing protected

4. **Static Asset Caching**
   - Assets cached for 1 year
   - ETags enabled for validation

---

## 📊 Post-Deployment Verification

After deploying, verify:

```bash
# Test homepage
curl https://your-app-url.com

# Test API endpoint
curl -X POST https://your-app-url.com/api/generate-copy \
  -H "Content-Type: application/json" \
  -d '{"type":"slogan","tone":"optimistic"}'

# Check security headers
curl -I https://your-app-url.com
```

Expected security headers:
```
content-security-policy: default-src 'self'
strict-transport-security: max-age=...
x-content-type-options: nosniff
x-frame-options: DENY
x-xss-protection: 1; mode=block
```

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### API Key Error
- Verify `GEMINI_API_KEY` is set in hosting platform
- Check key has Gemini API permissions
- Ensure no whitespace in key value

### Port Binding Error
- Cloud platforms assign PORT automatically
- Don't hardcode port 3000 in production
- Use `process.env.PORT || 8080`

### CORS Issues
- Update CSP in `server.ts` if adding new domains
- Check browser console for specific violations

---

## 📈 Monitoring & Analytics

Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [Google Analytics](https://analytics.google.com) for usage metrics
- [Uptime Robot](https://uptimerobot.com) for availability monitoring

---

## 🎯 Next Steps

1. Choose your deployment platform
2. Run the corresponding deployment script
3. Test the live URL
4. Share with your team!

**Your app is now secure, optimized, and ready for the world!** 🌍✨

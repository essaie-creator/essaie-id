# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/cde61acd-7e67-4b59-8144-f0d99f0bf7a3

## Run Locally

**Prerequisites:** Node.js

### Option 1: Sign in with Google (Recommended - No API Key Required!)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up OAuth credentials in `.env`:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable **Generative Language API**
   - Go to **APIs & Services > Credentials**
   - Create **OAuth 2.0 Client ID** (Web application)
   - Add authorized redirect URI: `http://localhost:3000/auth/callback`
   - Copy your Client ID and Secret to `.env`:
   ```env
   GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

4. Click **"Sign in with Google"** in the app and authorize!

### Option 2: Using API Key (Legacy)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env` to your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

3. Run the app:
   ```bash
   npm run dev
   ```

## How OAuth Works

- Users click **"Sign in with Google"** → authorize the app → receive access token
- The app uses this token to call Gemini API on behalf of the user
- Usage is billed to the user's Google Cloud account (or free tier)
- No API keys to manage or share!

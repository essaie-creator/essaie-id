import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// OAuth2 configuration (server-side only - never exposed to clients)
const OAUTH_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const OAUTH_REDIRECT_URI = process.env.OAUTH_REDIRECT_URI || "http://localhost:3000/auth/callback";

// In-memory token store (production should use Redis/database)
const userTokens = new Map<string, { accessToken: string; refreshToken?: string; expiry?: number }>();

// Lazy initialization of Gemini client
let ai: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Don't throw - allow OAuth mode
      console.warn("GEMINI_API_KEY not configured. OAuth mode available.");
    }
    ai = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

// OAuth2 Client factory
function createOAuth2Client() {
  if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET) {
    // Return null to indicate OAuth is not configured
    return null;
  }
  return new OAuth2Client({
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    redirectUri: OAUTH_REDIRECT_URI,
  });
}

// Generate OAuth authorization URL
app.get("/api/auth/url", (req, res) => {
  try {
    const oauth2Client = createOAuth2Client();
    if (!oauth2Client) {
      return res.status(501).json({ 
        error: "OAuth not configured",
        message: "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in environment variables"
      });
    }
    const scopes = ["https://www.googleapis.com/auth/generative-language"];
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
    });
    res.json({ authUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Handle OAuth callback and exchange code for tokens
app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  
  if (!code || typeof code !== "string") {
    return res.status(400).send("Authorization code required");
  }

  try {
    const oauth2Client = createOAuth2Client();
    if (!oauth2Client) {
      return res.status(501).send("OAuth is not configured on this server");
    }
    
    const { tokens } = await oauth2Client.getToken(code);
    
    // Store tokens (in production, associate with user session)
    const sessionId = Math.random().toString(36).substring(2);
    userTokens.set(sessionId, {
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token,
      expiry: tokens.expiry_date,
    });

    // Redirect to app with session ID
    res.redirect(`/?session=${sessionId}&authenticated=true`);
  } catch (error: any) {
    console.error("OAuth token exchange error:", error);
    res.status(500).send(`Authentication failed: ${error.message}`);
  }
});

// Verify token and refresh if needed
async function getValidAccessToken(sessionId: string): Promise<string> {
  const tokenData = userTokens.get(sessionId);
  if (!tokenData) {
    throw new Error("No valid session found");
  }

  const now = Date.now();
  const isExpiring = tokenData.expiry && now > tokenData.expiry - 60000; // 1 min buffer

  if (isExpiring && tokenData.refreshToken) {
    const oauth2Client = createOAuth2Client();
    oauth2Client.setCredentials({
      refresh_token: tokenData.refreshToken,
    });
    const { credentials } = await oauth2Client.refreshAccessToken();
    
    tokenData.accessToken = credentials.access_token!;
    tokenData.expiry = credentials.expiry_date;
    userTokens.set(sessionId, tokenData);
  }

  return tokenData.accessToken;
}

// API endpoint for AI Copywriter (supports both API key and OAuth)
app.post("/api/generate-copy", async (req, res) => {
  const { type, prompt, tone = "optimistic", sessionId } = req.body;

  if (!type) {
    return res.status(400).json({ error: "Copy type is required." });
  }

  try {
    let aiClient = getGeminiClient();
    
    // If using OAuth mode (no API key), use user's access token
    if (!process.env.GEMINI_API_KEY && sessionId) {
      const accessToken = await getValidAccessToken(sessionId);
      aiClient = new GoogleGenAI({
        apiKey: "", // OAuth uses token in headers
        httpOptions: {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    
    const systemPrompt = `You are the lead brand copywriter and brand voice director for Cove Systems (also known as Cove Labs or Cove Tech). 
Cove Systems is a high-growth software and application company that specializes in building hyper-reliable, highly persistent, and delightful digital products.
Our brand identity is inspired by a warm, refreshing beach picnic scene:
- **Sunset Orange/Coral** represents our **Innovation**: bold, warm, passionate, and visionary.
- **Ocean Teal/Turquoise** represents our **Reliability**: calm, dependable, robust, and consistent as the sea's tides.
- **Sunset Gold** represents our **Human-Centricity**: optimistic, collaborative, welcoming, and clear.
- **Deep Slate/Charcoal** represents our **Strength & Consistency**: structural clarity and performance.

We refuse technical corporate buzzword slop (e.g., skip 'synergize', 'leverage', 'disruptive ecosystem'). We write copy that is down-to-earth, expertly clear, human, elegant, and deeply authentic.

Your task is to write high-quality brand copy of type: "${type}".
Context or instructions provided by the user: "${prompt || 'None'}"
The desired sub-tone is: "${tone}".

Generate exactly 3 diverse, highly polished options. Output them in clear Markdown block format. Feel free to explain the creative rationale briefly (1 sentence) for each. No other conversational fluff before or after.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: systemPrompt,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini copywriter generation error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate brand copy.",
      isMissingKey: !process.env.GEMINI_API_KEY && !sessionId,
      requiresAuth: !process.env.GEMINI_API_KEY
    });
  }
});

// Configure Vite middleware or static files
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();

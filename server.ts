import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client
let ai: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the environment.");
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

// API endpoint for AI Copywriter
app.post("/api/generate-copy", async (req, res) => {
  const { type, prompt, tone = "optimistic" } = req.body;

  if (!type) {
    return res.status(400).json({ error: "Copy type is required." });
  }

  try {
    const aiClient = getGeminiClient();
    
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
      isMissingKey: !process.env.GEMINI_API_KEY 
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

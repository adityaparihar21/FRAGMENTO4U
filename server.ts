import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Create Express app
const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Sensory Profile Generator API endpoint
app.post("/api/sensory-profile", async (req, res) => {
  try {
    const { bodyDensity, acidityLevel, roastIntensity, floralClar, sweetnessScale, musicVibe } = req.body;

    const prompt = `
      Create a highly customized sensory coffee lot profile based on the following sliders/preferences:
      - Body/Density (Tactile weight): ${bodyDensity}/100
      - Acidity/Brightness: ${acidityLevel}/100
      - Roast Level Intensity: ${roastIntensity}/100
      - Floral Clarity/Aromatics: ${floralClar}/100
      - Sweetness Scale: ${sweetnessScale}/100
      - Ambient Music Vibe selected: "${musicVibe}"
      
      Design a bespoke flavor lot, describe it poetically, provide scientific, precise brewing parameters (ratio, water temperature, grind, bloom, and 3 steps of pouring instructions), and specify why this profile perfectly harmonizes with the "${musicVibe}" vibe.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite sensory architect and specialty coffee sommelier for 'Fragmento Cafe & Sensory Atelier' on Rajpur Road, Dehradun. You craft hyper-curated, bespoke specialty coffee sensory profiles, precise roasting specifications, and precise pour-over brewing steps. Your tone is poetic, refined, scientific, and highly intentional. Avoid promotional marketing clichés.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { 
              type: Type.STRING, 
              description: "An elegant, poetic, and evocative name for this bespoke lot (e.g. 'Lavender Mist No. 8', 'Saffron Dusk No. 42')" 
            },
            description: { 
              type: Type.STRING, 
              description: "A highly poetic and sensory paragraph detailing the flavor journey, aroma, and mouthfeel of this bespoke lot." 
            },
            elevation: { 
              type: Type.STRING, 
              description: "The custom Indian high-altitude region and elevation in meters (e.g., 'Baba Budangiri, Karnataka (1,420M)')" 
            },
            roastProfile: { 
              type: Type.STRING, 
              description: "The precise roast level, heat rate and drum speed suggestion (e.g., 'Light Roasting (204°C drop, slow drum cycle)')" 
            },
            primaryNotes: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Exactly 3 highly refined, specific sensory notes (e.g., ['White Peach', 'Bergamot Bloom', 'Sandalwood'])" 
            },
            brewingSpecs: {
              type: Type.OBJECT,
              properties: {
                waterTemp: { 
                  type: Type.STRING, 
                  description: "Water temperature in Celsius (e.g. '93.5°C')" 
                },
                ratio: { 
                  type: Type.STRING, 
                  description: "Ratio of coffee to water (e.g., '1:16 (15g Coffee / 240g Water)')" 
                },
                grindProfile: { 
                  type: Type.STRING, 
                  description: "Grind density/profile (e.g., 'Medium-Coarse (Sand-like)')" 
                },
                bloomTime: { 
                  type: Type.STRING, 
                  description: "Bloom parameters (e.g., '45 seconds with 45g pour')" 
                },
                pourSteps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly 3 chronological pouring phases for note separation"
                }
              },
              required: ["waterTemp", "ratio", "grindProfile", "bloomTime", "pourSteps"]
            },
            vibeMatch: { 
              type: Type.STRING, 
              description: "A paragraph outlining why this flavor profile harmonizes beautifully with the requested music vibe, reflecting on how sound waves match taste perception." 
            }
          },
          required: ["name", "description", "elevation", "roastProfile", "primaryNotes", "brewingSpecs", "vibeMatch"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Sensory Error:", error);
    res.status(500).json({ error: error.message || "Sensory distillation interrupted." });
  }
});

// Setup Vite Dev server or Serve static files for production
async function startServer() {
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
    console.log(`Fragmento full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();

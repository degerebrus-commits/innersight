
import { GoogleGenAI, Type } from "@google/genai";
import { Insight } from "../types";

export async function fetchInsight(signal: string, modulator: string): Promise<Insight> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a philosophical mentor with a calm, zen, and minimalist voice. 
    Your goal is to provide a single, potent strategic reflection for someone navigating uncertainty.
    
    TONE GUIDELINES:
    - Calm, poetic but precise, spacious, and grounded.
    - Avoid cliches. Focus on the interplay between the 'Signal' (dynamic) and 'Modulator' (emotion).
    - Maximum reflection length: 3 sentences.
  `;

  const prompt = `
    Generate an insight based on the following:
    Dynamic (Signal): ${signal}
    Emotional Texture (Modulator): ${modulator}
    
    Structure the response in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A two-word title combining the modulator and signal." },
            reflection: { type: Type.STRING, description: "A high-quality, short philosophical paragraph." },
            action_cue: { type: Type.STRING, description: "A simple, concrete action for the next 24 hours." },
            journal_prompt: { type: Type.STRING, description: "A deep question to ponder or write about." }
          },
          required: ["title", "reflection", "action_cue", "journal_prompt"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as Insight;
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback to mock data if API fails
    return {
      title: `${modulator} ${signal}`,
      reflection: `When ${signal.toLowerCase()} meets ${modulator.toLowerCase()}, the space between action and thought becomes thin. Observe the quiet details that usually go unnoticed; they are the true anchors of your current journey.`,
      action_cue: "Sit in silence for five minutes without any digital distraction.",
      journal_prompt: `How does the texture of ${modulator.toLowerCase()} change when you stop trying to control ${signal.toLowerCase()}?`
    };
  }
}

import { GoogleGenAI, Type } from "@google/genai";
import { VisualStyle } from "../types";

// Assume process.env.API_KEY is configured in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateStoryboard = async (
  lyrics: string,
  mood: string,
  style: VisualStyle
): Promise<string[]> => {
  const prompt = `
    Based on the following song lyrics, mood, and visual style, generate a storyboard for a 90-second music video.
    The storyboard should be an array of 4-6 scene descriptions. Each description should be a concise, visually evocative sentence.

    Lyrics: "${lyrics.substring(0, 500)}..."
    Mood: ${mood}
    Visual Style: ${style}

    Return a JSON object with a single key "storyboard" which is an array of strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            storyboard: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: "A single scene description for the music video.",
              },
            },
          },
          required: ["storyboard"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);

    if (parsed && Array.isArray(parsed.storyboard)) {
      return parsed.storyboard;
    } else {
      throw new Error("Invalid storyboard format in API response.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fallback in case of API error
    return [
        `An epic opening shot in a ${style.toLowerCase()} style.`,
        `A close-up focusing on the emotion of the song, with a ${mood} mood.`,
        `A dynamic sequence for the chorus, full of energy.`,
        `A memorable final scene that captures the essence of the lyrics.`
    ];
  }
};

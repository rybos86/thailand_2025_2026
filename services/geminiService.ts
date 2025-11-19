import { GoogleGenAI, Type } from "@google/genai";
import { ActivitySuggestion } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchActivitySuggestions = async (
  location: string,
  subLocation: string,
  context: string
): Promise<ActivitySuggestion[]> => {
  
  const prompt = `
    Som na dovolenke v Thajsku.
    Miesto: ${location} ${subLocation ? `(${subLocation})` : ''}.
    Kontext: ${context}.
    
    Navrhni mi 4 konkrétne, zaujímavé a oddychové aktivity, ktoré sa dajú v tejto lokalite robiť. 
    Sústred sa na pekné pláže, jedlo, výhľady alebo ľahkú zábavu.
    Mám k dispozícii skúter (ak to nie je Bangkok).
    
    Odpovedz prosím v slovenskom jazyku.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ActivitySuggestion[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [
      { title: "Chyba načítania", description: "Nepodarilo sa získať tipy od AI. Skúste to prosím neskôr." }
    ];
  }
};

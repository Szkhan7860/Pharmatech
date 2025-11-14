import { GoogleGenAI, Type } from "@google/genai";
import { DrugInfo, InteractionResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const drugInfoSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: 'The official name of the drug.' },
    uses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of common medical uses for the drug.',
    },
    dosage: {
      type: Type.STRING,
      description: 'General recommended dosage information.',
    },
    sideEffects: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of common side effects.',
    },
    substitutes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of alternative drugs or substitutes.',
    },
  },
  required: ['name', 'uses', 'dosage', 'sideEffects'],
};

const interactionSchema = {
  type: Type.OBJECT,
  properties: {
    drugs: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'The two drugs being checked.',
    },
    severity: {
      type: Type.STRING,
      enum: ['None', 'Mild', 'Moderate', 'Severe'],
      description: 'The severity level of the interaction.',
    },
    description: {
      type: Type.STRING,
      description: 'A detailed explanation of the potential interaction.',
    },
  },
  required: ['drugs', 'severity', 'description'],
};

export const getDrugInfo = async (drugName: string): Promise<DrugInfo> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide detailed information for the drug: "${drugName}". Ensure the output strictly follows the provided JSON schema.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: drugInfoSchema,
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error fetching drug information:', error);
    throw new Error('Failed to fetch drug information from the API.');
  }
};

export const checkDrugInteractions = async (drug1: string, drug2: string): Promise<InteractionResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the potential interaction between "${drug1}" and "${drug2}". Describe the interaction and classify its severity. Ensure the output strictly follows the provided JSON schema.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: interactionSchema,
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error checking drug interactions:', error);
    throw new Error('Failed to check drug interactions from the API.');
  }
};
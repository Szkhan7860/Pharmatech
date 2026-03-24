import { GoogleGenAI, Type } from "@google/genai";
import { DrugInfo, InteractionResult, SymptomSuggestion, QuizQuestion } from '../types';

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

const symptomSuggestionSchema = {
  type: Type.OBJECT,
  properties: {
    symptoms: { type: Type.STRING, description: 'The symptoms provided by the user.' },
    suggestedDrugs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'The name of the suggested drug.' },
          class: { type: Type.STRING, description: 'The pharmacological class of the drug.' },
          reason: { type: Type.STRING, description: 'The reason why this drug is suggested for the symptoms.' },
        },
        required: ['name', 'class', 'reason'],
      },
      description: 'A list of suggested first-line drugs.',
    },
    disclaimer: { type: Type.STRING, description: 'A medical disclaimer.' },
  },
  required: ['symptoms', 'suggestedDrugs', 'disclaimer'],
};

const quizQuestionSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'A unique identifier for the question.' },
      question: { type: Type.STRING, description: 'The quiz question.' },
      options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of 4 multiple-choice options.',
      },
      correctAnswer: { type: Type.INTEGER, description: 'The index of the correct answer (0-3).' },
      explanation: { type: Type.STRING, description: 'An explanation of the correct answer.' },
    },
    required: ['id', 'question', 'options', 'correctAnswer', 'explanation'],
  },
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

export const getSymptomSuggestions = async (symptoms: string): Promise<SymptomSuggestion> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Suggest first-line drugs for the following symptoms: "${symptoms}". Provide a clear medical disclaimer. Ensure the output strictly follows the provided JSON schema.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: symptomSuggestionSchema,
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error fetching symptom suggestions:', error);
    throw new Error('Failed to fetch symptom suggestions from the API.');
  }
};

export const generateQuizQuestions = async (topic: string = 'Pharmacology'): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 multiple-choice questions for a quiz on the topic: "${topic}". Ensure the output strictly follows the provided JSON schema.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: quizQuestionSchema,
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    throw new Error('Failed to generate quiz questions from the API.');
  }
};
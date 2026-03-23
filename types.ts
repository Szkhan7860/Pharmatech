export enum Page {
  Home = 'Home',
  InteractionChecker = 'InteractionChecker',
  DoseCalculator = 'DoseCalculator',
  Blog = 'Blog',
  Contact = 'Contact',
}

export interface DrugInfo {
  name: string;
  uses: string[];
  dosage: string;
  sideEffects: string[];
  substitutes: string[];
}

export type InteractionSeverity = 'None' | 'Mild' | 'Moderate' | 'Severe';

export interface InteractionResult {
  drugs: [string, string];
  severity: InteractionSeverity;
  description: string;
}

export interface Article {
  id: number;
  title: string;
  imageUrl: string;
  snippet: string;
  content: string;
}
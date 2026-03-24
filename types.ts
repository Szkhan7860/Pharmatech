export enum Page {
  Home = 'Home',
  InteractionChecker = 'InteractionChecker',
  SymptomChecker = 'SymptomChecker',
  DoseCalculator = 'DoseCalculator',
  Quiz = 'Quiz',
  Blog = 'Blog',
  Contact = 'Contact',
  Auth = 'Auth',
  Profile = 'Profile',
  AdminPanel = 'AdminPanel',
  About = 'About',
  History = 'History',
  PrescriptionScanner = 'PrescriptionScanner',
}

export interface DrugInfo {
  name: string;
  uses: string[];
  dosage: string;
  sideEffects: string[];
  substitutes: string[];
}

export interface SymptomSuggestion {
  symptoms: string;
  suggestedDrugs: {
    name: string;
    class: string;
    reason: string;
  }[];
  disclaimer: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role?: 'admin' | 'user';
}

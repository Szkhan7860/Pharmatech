import { DrugInfo } from '../types';

export const VERIFIED_DRUGS: DrugInfo[] = [
  {
    name: 'Metformin',
    uses: ['Type 2 Diabetes Mellitus', 'Polycystic Ovary Syndrome (PCOS)'],
    dosage: 'Initial: 500 mg twice daily or 850 mg once daily with meals. Max: 2550 mg/day.',
    sideEffects: ['Nausea', 'Diarrhea', 'Abdominal pain', 'Metallic taste', 'Lactic acidosis (rare)'],
    substitutes: ['Glipizide', 'Glyburide', 'Pioglitazone']
  },
  {
    name: 'Amlodipine',
    uses: ['Hypertension', 'Chronic Stable Angina', 'Vasospastic Angina'],
    dosage: 'Initial: 5 mg once daily. Max: 10 mg once daily.',
    sideEffects: ['Edema', 'Dizziness', 'Flushing', 'Palpitations', 'Fatigue'],
    substitutes: ['Nifedipine', 'Felodipine', 'Lisinopril']
  },
  {
    name: 'Atorvastatin',
    uses: ['Hypercholesterolemia', 'Prevention of Cardiovascular Disease'],
    dosage: 'Initial: 10-20 mg once daily. Max: 80 mg once daily.',
    sideEffects: ['Myalgia', 'Diarrhea', 'Arthralgia', 'Nasopharyngitis', 'Liver enzyme elevation'],
    substitutes: ['Rosuvastatin', 'Simvastatin', 'Pravastatin']
  },
  {
    name: 'Lisinopril',
    uses: ['Hypertension', 'Heart Failure', 'Post-Myocardial Infarction'],
    dosage: 'Initial: 10 mg once daily. Max: 40 mg once daily.',
    sideEffects: ['Dry cough', 'Dizziness', 'Hyperkalemia', 'Fatigue', 'Angioedema (rare)'],
    substitutes: ['Enalapril', 'Ramipril', 'Losartan']
  },
  {
    name: 'Levothyroxine',
    uses: ['Hypothyroidism', 'TSH Suppression'],
    dosage: 'Initial: 1.6 mcg/kg/day. Adjust based on TSH levels.',
    sideEffects: ['Palpitations', 'Weight loss', 'Heat intolerance', 'Insomnia', 'Tremors'],
    substitutes: ['Liothyronine', 'Desiccated Thyroid']
  },
  {
    name: 'Albuterol',
    uses: ['Asthma (Bronchospasm)', 'Exercise-Induced Bronchospasm'],
    dosage: '90 mcg (1-2 puffs) every 4-6 hours as needed.',
    sideEffects: ['Tremor', 'Tachycardia', 'Nervousness', 'Hypokalemia', 'Headache'],
    substitutes: ['Levalbuterol', 'Salmeterol']
  },
  {
    name: 'Omeprazole',
    uses: ['GERD', 'Peptic Ulcer Disease', 'Zollinger-Ellison Syndrome'],
    dosage: '20-40 mg once daily before meals.',
    sideEffects: ['Headache', 'Abdominal pain', 'Nausea', 'Diarrhea', 'Flatulence'],
    substitutes: ['Pantoprazole', 'Esomeprazole', 'Lansoprazole']
  },
  {
    name: 'Losartan',
    uses: ['Hypertension', 'Diabetic Nephropathy', 'Stroke Prevention'],
    dosage: 'Initial: 50 mg once daily. Max: 100 mg once daily.',
    sideEffects: ['Dizziness', 'Upper respiratory infection', 'Fatigue', 'Hyperkalemia', 'Back pain'],
    substitutes: ['Valsartan', 'Candesartan', 'Lisinopril']
  },
  {
    name: 'Gabapentin',
    uses: ['Postherpetic Neuralgia', 'Partial Onset Seizures', 'Neuropathic Pain'],
    dosage: 'Initial: 300 mg on day 1, 300 mg twice daily on day 2, 300 mg three times daily on day 3.',
    sideEffects: ['Dizziness', 'Somnolence', 'Peripheral edema', 'Ataxia', 'Fatigue'],
    substitutes: ['Pregabalin', 'Duloxetine']
  },
  {
    name: 'Hydrochlorothiazide',
    uses: ['Hypertension', 'Edema'],
    dosage: '12.5-50 mg once daily.',
    sideEffects: ['Hypokalemia', 'Hyperuricemia', 'Hyperglycemia', 'Photosensitivity', 'Dizziness'],
    substitutes: ['Chlorthalidone', 'Indapamide']
  },
  {
    name: 'Sertraline',
    uses: ['Major Depressive Disorder', 'OCD', 'Panic Disorder', 'PTSD', 'Social Anxiety'],
    dosage: 'Initial: 50 mg once daily. Max: 200 mg once daily.',
    sideEffects: ['Nausea', 'Insomnia', 'Diarrhea', 'Sexual dysfunction', 'Xerostomia'],
    substitutes: ['Fluoxetine', 'Escitalopram', 'Paroxetine']
  },
  {
    name: 'Furosemide',
    uses: ['Edema (Heart Failure, Renal Failure)', 'Hypertension'],
    dosage: 'Initial: 20-80 mg/dose. Adjust based on response.',
    sideEffects: ['Hypokalemia', 'Dehydration', 'Orthostatic hypotension', 'Ototoxicity', 'Hyperuricemia'],
    substitutes: ['Bumetanide', 'Torsemide']
  },
  {
    name: 'Amoxicillin',
    uses: ['Bacterial Infections (ENT, Skin, UTI)', 'H. pylori Eradication'],
    dosage: '250-500 mg every 8 hours or 500-875 mg every 12 hours.',
    sideEffects: ['Diarrhea', 'Nausea', 'Rash', 'Vomiting', 'Candidiasis'],
    substitutes: ['Cephalexin', 'Azithromycin']
  },
  {
    name: 'Warfarin',
    uses: ['Venous Thromboembolism', 'Atrial Fibrillation', 'Prosthetic Heart Valves'],
    dosage: 'Initial: 2-5 mg once daily. Adjust based on INR.',
    sideEffects: ['Bleeding', 'Bruising', 'Purple toes syndrome', 'Skin necrosis', 'Nausea'],
    substitutes: ['Rivaroxaban', 'Apixaban', 'Dabigatran']
  },
  {
    name: 'Aspirin',
    uses: ['Pain/Fever', 'Ischemic Stroke Prevention', 'Myocardial Infarction Prevention'],
    dosage: 'Pain: 325-650 mg every 4-6 hours. CVD: 81-325 mg once daily.',
    sideEffects: ['Dyspepsia', 'GI bleeding', 'Tinnitus', 'Bruising', 'Urticaria'],
    substitutes: ['Clopidogrel', 'Ibuprofen']
  },
  {
    name: 'Ibuprofen',
    uses: ['Pain', 'Fever', 'Inflammation (RA, Osteoarthritis)'],
    dosage: 'Pain: 200-400 mg every 4-6 hours. Max: 3200 mg/day (prescription).',
    sideEffects: ['GI upset', 'Nausea', 'Dizziness', 'Edema', 'Renal impairment'],
    substitutes: ['Naproxen', 'Celecoxib', 'Acetaminophen']
  },
  {
    name: 'Acetaminophen',
    uses: ['Pain', 'Fever'],
    dosage: '325-650 mg every 4-6 hours or 1000 mg 3-4 times daily. Max: 4000 mg/day.',
    sideEffects: ['Hepatotoxicity (overdose)', 'Rash', 'Nausea', 'Headache'],
    substitutes: ['Ibuprofen', 'Naproxen']
  },
  {
    name: 'Prednisone',
    uses: ['Inflammatory Conditions', 'Allergic Reactions', 'Autoimmune Disorders'],
    dosage: '5-60 mg daily. Tapering is often required.',
    sideEffects: ['Hyperglycemia', 'Insomnia', 'Weight gain', 'Fluid retention', 'Osteoporosis (long-term)'],
    substitutes: ['Methylprednisolone', 'Dexamethasone']
  },
  {
    name: 'Metoprolol',
    uses: ['Hypertension', 'Angina', 'Heart Failure', 'Post-MI'],
    dosage: 'Initial: 25-100 mg daily. Max: 400 mg daily.',
    sideEffects: ['Bradycardia', 'Fatigue', 'Dizziness', 'Depression', 'Shortness of breath'],
    substitutes: ['Atenolol', 'Carvedilol', 'Bisoprolol']
  },
  {
    name: 'Clopidogrel',
    uses: ['Acute Coronary Syndrome', 'Recent MI/Stroke', 'Peripheral Arterial Disease'],
    dosage: '75 mg once daily.',
    sideEffects: ['Bleeding', 'Bruising', 'Pruritus', 'Diarrhea', 'Abdominal pain'],
    substitutes: ['Ticagrelor', 'Prasugrel', 'Aspirin']
  }
];

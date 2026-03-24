import React from 'react';
import { motion } from 'motion/react';
import { Info, Target, Cpu, Rocket, ShieldCheck, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-24 space-y-20">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-bold mb-4"
        >
          <Info className="w-4 h-4" />
          <span>About PharmaTech Hub</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight"
        >
          Bridging the Gap Between <br />
          <span className="text-cyan-600 dark:text-cyan-500">AI and Pharmacology</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          PharmaTech Hub is a next-generation clinical decision support system designed to empower healthcare professionals and students with real-time, AI-verified pharmaceutical intelligence.
        </p>
      </div>

      {/* Objective Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-2xl text-rose-600">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Our Objective</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            Our primary goal is to reduce medication errors and improve patient safety by providing instant access to drug interactions, dosage calculations, and symptom-based drug suggestions. We aim to synthesize complex clinical data into actionable insights at the point of care.
          </p>
          <ul className="space-y-3">
            {[
              'Enhance clinical decision-making speed',
              'Provide a reliable educational platform for students',
              'Ensure data-driven patient safety protocols',
              'Democratize access to advanced pharmacological data'
            ].map((item, i) => (
              <li key={i} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-[3rem] p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 space-y-8">
            <div className="text-5xl font-black text-cyan-600">99.9%</div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">AI Synthesis Accuracy Goal</p>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '99.9%' }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-full bg-cyan-600" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">Technology Stack</h2>
          <p className="text-gray-600 dark:text-gray-400">Built with modern, scalable, and secure technologies.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Cpu />, title: 'Gemini 3.1 AI', desc: 'Advanced reasoning and medical data synthesis using Google\'s latest LLM.' },
            { icon: <Rocket />, title: 'React & Vite', desc: 'Blazing fast frontend performance with modern component architecture.' },
            { icon: <ShieldCheck />, title: 'Firebase', desc: 'Secure real-time database and authentication for patient data persistence.' },
            { icon: <Users />, title: 'Tailwind CSS', desc: 'Responsive, accessible, and beautiful UI design system.' },
            { icon: <Target />, title: 'Lucide Icons', desc: 'Clean, consistent, and professional iconography for clinical use.' },
            { icon: <Info />, title: 'TypeScript', desc: 'Type-safe development ensuring code reliability and fewer runtime errors.' }
          ].map((tech, i) => (
            <div key={i} className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-cyan-600/30 transition-all group">
              <div className="p-4 bg-gray-50 dark:bg-black rounded-2xl text-cyan-600 mb-6 group-hover:scale-110 transition-transform inline-block">
                {tech.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{tech.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Scope */}
      <div className="bg-cyan-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Future Scope</h2>
            <p className="text-cyan-50 text-lg leading-relaxed">
              We are constantly evolving to meet the needs of the modern medical landscape. Our roadmap includes several key advancements.
            </p>
            <div className="flex flex-wrap gap-3">
              {['OCR Prescription Scanning', 'Offline Mode', 'Multi-language Support', 'EMR Integration'].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-white/20 rounded-xl text-sm font-bold backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            {[
              { title: 'Prescription Analysis', desc: 'Upload a photo of a prescription for instant AI analysis and interaction checking.' },
              { title: 'Real-time EMR Sync', desc: 'Direct integration with Electronic Medical Records for patient-specific alerts.' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                <h4 className="font-black text-xl mb-2">{item.title}</h4>
                <p className="text-cyan-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

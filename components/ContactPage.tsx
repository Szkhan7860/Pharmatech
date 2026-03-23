import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email || !formData.message) {
      setFormError('All fields are required.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 5000); // Hide message after 5 seconds
  };
  
  const isFormInvalid = !formData.name || !formData.email || !formData.message;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-16">
      <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter"
        >
          Get in <span className="text-cyan-600">Touch</span>
        </motion.h1>
        <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Have questions or feedback? We'd love to hear from you. Drop us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 md:space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Our team of clinical pharmacists and developers is here to assist you with any inquiries regarding the platform.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600 dark:text-cyan-500 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">szcamps@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group">
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600 dark:text-cyan-500 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Location</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">Digital Health Hub, Global</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-cyan-600 p-8 md:p-12 rounded-[2.5rem] text-white text-center space-y-6 shadow-2xl shadow-cyan-600/30"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Send className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black">Message Sent!</h3>
                <p className="text-cyan-100 text-lg">Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 space-y-6 md:space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-cyan-600" />
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-2xl p-4 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-2xl p-4 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you today?"
                  className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-2xl p-4 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all resize-none"
                  required
                ></textarea>
              </div>

              {formError && (
                <p className="text-rose-500 text-sm font-bold bg-rose-50 dark:bg-rose-900/20 p-3 rounded-xl border border-rose-100 dark:border-rose-900/30 text-center">
                  {formError}
                </p>
              )}
              
              <button
                type="submit"
                disabled={isFormInvalid}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 md:py-5 px-8 rounded-2xl transition-all duration-300 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl shadow-cyan-600/20 transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-6 h-6" />
                <span className="text-lg">Send Message</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
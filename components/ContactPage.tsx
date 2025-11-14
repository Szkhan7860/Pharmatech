import React, { useState } from 'react';

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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white text-center mb-10">Contact Us</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        Have questions or feedback? We'd love to hear from you. Drop us a message below.
      </p>

      {isSubmitted ? (
        <div className="bg-green-100 dark:bg-green-900/50 border border-green-500 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg text-center animate-fade-in" role="alert">
          <strong className="font-bold">Thank you!</strong>
          <span className="block sm:inline"> Your message has been sent successfully.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              aria-required="true"
            ></textarea>
          </div>

          {formError && <p className="text-red-500 dark:text-red-400 text-sm">{formError}</p>}
          
          <button
            type="submit"
            disabled={isFormInvalid}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
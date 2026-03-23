import React from 'react';
import { Page } from '../types';

interface FooterProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ currentPage, setCurrentPage }) => {
    
    const navigateTo = (page: Page) => {
        if (page !== currentPage) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setCurrentPage(page);
    };

    const FooterLink: React.FC<{
      page: Page;
      children: React.ReactNode;
    }> = ({ page, children }) => (
      <button
        onClick={() => navigateTo(page)}
        className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
      >
        {children}
      </button>
    );

    const SocialIcon: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-110 transform transition-all duration-200 shadow-sm"
        >
            {children}
        </a>
    );

    const GitHubIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    );
    
    const InstagramIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    );

    const TelegramIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M22 2L11 13L2 9L22 2zM13 22L11 13"></path>
        </svg>
    );
    
    const GmailIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    );


    return (
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 bg-cyan-600 rounded-xl shadow-lg shadow-cyan-600/20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="font-black text-2xl tracking-tighter text-gray-900 dark:text-white">PharmaTech <span className="text-cyan-600">Hub</span></span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed text-lg font-medium">
                            Empowering healthcare professionals and students with cutting-edge pharmaceutical insights and digital tools.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <SocialIcon href="https://github.com/szkhan7860" label="GitHub"><GitHubIcon /></SocialIcon>
                            <SocialIcon href="https://instagram.com/Shahnawaz._.2006" label="Instagram"><InstagramIcon /></SocialIcon>
                            <SocialIcon href="https://t.me/sukuna_verified" label="Telegram"><TelegramIcon /></SocialIcon>
                            <SocialIcon href="mailto:szcamps@gmail.com" label="Gmail"><GmailIcon /></SocialIcon>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Platform</h3>
                        <ul className="space-y-4">
                            <li><FooterLink page={Page.Home}>Home</FooterLink></li>
                            <li><FooterLink page={Page.InteractionChecker}>Interaction Checker</FooterLink></li>
                            <li><FooterLink page={Page.DoseCalculator}>Dose Calculator</FooterLink></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Support</h3>
                        <ul className="space-y-4">
                            <li><FooterLink page={Page.Blog}>Blog Hub</FooterLink></li>
                            <li><FooterLink page={Page.Contact}>Contact Us</FooterLink></li>
                            <li><button className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors font-medium">Privacy Policy</button></li>
                        </ul>
                    </div>
                </div>
                
                <div className="pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        &copy; 2025 PharmaTech Hub. Crafted for the future of pharmacy.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-400 font-medium">
                        <span>Built with</span>
                        <svg className="h-4 w-4 text-rose-500 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                        <span>by the PharmaTech Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

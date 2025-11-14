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
        className="text-gray-400 hover:text-white transition-colors duration-200"
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
            className="text-gray-400 hover:text-cyan-400 hover:scale-110 transform transition-all duration-200"
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
        <footer className="bg-gray-800 text-gray-400">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-bold text-xl text-white">PharmaTech Hub</span>
                    </div>
                    <div className="flex space-x-6">
                        <FooterLink page={Page.Home}>Home</FooterLink>
                        <FooterLink page={Page.InteractionChecker}>Checker</FooterLink>
                        <FooterLink page={Page.Blog}>Blog</FooterLink>
                        <FooterLink page={Page.Contact}>Contact</FooterLink>
                    </div>
                    <div className="flex space-x-6">
                        <SocialIcon href="https://github.com/szkhan7860" label="GitHub"><GitHubIcon /></SocialIcon>
                        <SocialIcon href="https://instagram.com/Shahnawaz._.2006" label="Instagram"><InstagramIcon /></SocialIcon>
                        <SocialIcon href="https://t.me/sukuna_verified" label="Telegram"><TelegramIcon /></SocialIcon>
                        <SocialIcon href="mailto:szcamps@gmail.com" label="Gmail"><GmailIcon /></SocialIcon>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-base">&copy; 2025 PharmaTech Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

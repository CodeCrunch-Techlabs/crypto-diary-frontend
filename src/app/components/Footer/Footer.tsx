 
import React from 'react';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const socialLinks = [
        { icon: Twitter, url: '#', label: 'Twitter' },
        { icon: Linkedin, url: '#', label: 'LinkedIn' },
        { icon: Github, url: '#', label: 'GitHub' },
        { icon: Mail, url: '#', label: 'Email' },
    ];

    return (
        <footer className="bg-white dark:bg-black text-gray-900 dark:text-green-400 px-6 py-12 border-t border-gray-200 dark:border-green-900/30">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-2xl font-mono text-gray-900 dark:text-green-400">
                    CryptoDiary
                </div>
                <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            className="text-gray-500 dark:text-green-400 hover:text-gray-900 dark:hover:text-green-300 transition-colors"
                            aria-label={social.label}
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-green-300">
                © {currentYear} CryptoDiary. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;


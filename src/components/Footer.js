import React from 'react';
import { socialLinks } from '../config/socialLinks';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Quick links
    const links = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#work' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* Subtle gradient background shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-900/10 to-fuchsia-900/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-900/10 to-indigo-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            {/* Subtle divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand section */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">YB</span>
                            </div>
                            <h2 className="text-2xl font-extrabold tracking-tight">YASHINDI</h2>
                        </div>

                        <p className="text-gray-400 mb-6 max-w-md">
                            Crafting intuitive digital experiences through innovative UI/UX design and mobile app development. Let's create something amazing together.
                        </p>

                        {/* Social links */}
                        <div className="flex space-x-4">
                            {socialLinks.map(social => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-300 group"
                                    aria-label={social.name}
                                >
                                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 border-b border-gray-800 pb-2">Quick Links</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
                            {links.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                                >
                                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#ff58d8] to-[#4f4cfa] rounded-full mr-2"></span>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-200 text-sm mb-4 sm:mb-0">
                        &copy; {currentYear} Yashindi. All rights reserved.
                    </p>

                    <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        <span>Available for Work</span>
                    </div>
                </div>
            </div>

            {/* Bottom gradient line */}
            <div className="w-full h-1 bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa]"></div>
        </footer>
    );
};

export default Footer;
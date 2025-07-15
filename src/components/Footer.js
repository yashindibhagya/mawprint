import React from 'react';

const socialLinks = [
    {
        name: 'Facebook', url: '#', icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" /></svg>
        )
    },
    {
        name: 'Twitter', url: '#', icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.77c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54c-.63 0-1.25-.04-1.86-.11A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" /></svg>
        )
    },
    {
        name: 'Instagram', url: '#', icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
        )
    },
];

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 relative border-t border-gray-200">

            <div className="relative max-w-6xl mx-auto px-6 py-8">
                {/* Main content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Brand */}
                    <div className="flex items-center space-x-3">
                        <img src="/assets/img/maw full.png" alt="MawPrint Logo" className="h-10 w-auto" />
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap gap-6 justify-center text-sm">
                        <a href="#services" className="hover:text-red-500 transition-colors duration-200 text-gray-600">Services</a>
                        <a href="#autoscrollimages" className="hover:text-red-500 transition-colors duration-200 text-gray-600">Portfolio</a>
                        <a href="#about" className="hover:text-red-500 transition-colors duration-200 text-gray-600">About</a>
                        <a href="#contact" className="hover:text-red-500 transition-colors duration-200 text-gray-600">Contact</a>
                    </div>

                    {/* Contact & Social */}
                    <div className="text-xs text-gray-500 space-y-1 md:text-right">
                        <div>
                            <a href="mailto:mawprint@gmail.com" className="hover:text-red-500 transition-colors">
                                mawprint@gmail.com
                            </a>
                        </div>
                        <div>Colombo, Sri Lanka</div>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-2 md:space-y-0">
                    <div>© {new Date().getFullYear()} MawPrint. All rights reserved.</div>
                    <div className="flex space-x-4">
                        <button className="hover:text-red-500 transition-colors">Privacy</button>
                        <button className="hover:text-red-500 transition-colors">Terms</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
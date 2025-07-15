import React from 'react';

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
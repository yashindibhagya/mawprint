import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 60,
                behavior: 'smooth',
            });
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="fixed w-full z-50 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 border-b border-gray-300">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                            <h1 className="text-xl font-bold text-black tracking-wider"><img
                                src="/assets/img/maw.png" /> </h1>
                        </div>
                    </div>

                    {/* Center Navigation */}
                    <div className="flex-1 flex justify-center">
                        <nav className="hidden md:flex items-center space-x-8">
                            {[
                                { name: 'Home', section: 'home' },
                                { name: 'About us', section: 'about' },
                                { name: 'Projects', section: 'work' },
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.section)}
                                    className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Right Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button className="text-sm font-medium text-black hover:text-gray-600 transition-colors duration-200">
                            CONNECT<br />WITH US
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Decorative diamond shape */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-4 h-4 bg-black rotate-45"></div>
            </div>

            {/* Mobile menu */}
            {
                isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {[
                                { name: 'Home', section: 'home' },
                                { name: 'About us', section: 'about' },
                                { name: 'Projects', section: 'work' },
                                { name: 'Our events', section: 'events' },
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.section)}
                                    className="block px-3 py-2 rounded-md text-sm w-full text-left text-gray-600 hover:text-black"
                                >
                                    {item.name}
                                </button>
                            ))}
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="block w-full text-left mt-3 px-3 py-2 text-sm font-medium text-black hover:text-gray-600"
                            >
                                CONNECT WITH US
                            </button>
                        </div>
                    </div>
                )
            }
        </header >
    );
};

export default Header;
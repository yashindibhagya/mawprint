import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo 3.png';

const Header = ({ darkMode, toggleDarkMode, activeSection, isProjectPage = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        if (isProjectPage) {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 60,
                    behavior: 'smooth',
                });
                setIsMenuOpen(false);
            }
        }
    };

    // Ensure styles default to dark mode even before state initialization
    const bgColor = darkMode !== false ? 'bg-black' : 'bg-white';
    const textColor = darkMode !== false ? 'text-white' : 'text-gray-800';
    const hoverColor = darkMode !== false ? 'hover:text-gray-300' : 'hover:text-gray-600';

    return (
        <header className={`fixed w-full z-50 ${bgColor} shadow-md mt-3 transition-colors duration-300`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo and Dark Mode Toggle */}
                    <div className="flex items-center mr-8 space-x-3">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                            <img src={logo} alt="Yashindi Bhagya" className="h-12 w-auto" />
                        </div>

                        {/* Dark Mode Toggle - Modified to show appropriate icon for default dark mode 
                        <button
                            onClick={toggleDarkMode}
                            className="ml-4 p-2 rounded-full focus:outline-none"
                            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode !== false ? (
                                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button> */}
                    </div>

                    {/* Center Navigation */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex space-x-8">
                            {[
                                { name: 'Home', section: 'home' },
                                { name: 'About', section: 'about' },
                                { name: 'Projects', section: 'work' },
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.section)}
                                    className={`px-1 py-2 text-sm font-medium transition-colors duration-200 
                                        ${activeSection === item.section && !isProjectPage
                                            ? 'bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] bg-clip-text text-transparent'
                                            : darkMode !== false ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact Button */}
                    <div className="hidden md:block">
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-6 py-2 bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] text-white rounded-full hover:opacity-90 transition-opacity duration-200 font-medium"
                        >
                            Contact Me
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden ml-auto">
                        <button
                            onClick={toggleMenu}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${textColor} ${hoverColor} focus:outline-none`}
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
            </div>

            {/* Mobile menu - Default to dark mode styling */}
            {isMenuOpen && (
                <div className={`md:hidden ${darkMode !== false ? 'bg-white border-gray-700' : 'bg-gray-100 border-gray-200'} border-t`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {[
                            { name: 'Home', section: 'home' },
                            { name: 'About', section: 'about' },
                            { name: 'Projects', section: 'work' },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.section)}
                                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-center ${activeSection === item.section && !isProjectPage
                                    ? 'bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] bg-clip-text text-transparent'
                                    : darkMode !== false ? 'text-black hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="block w-full text-center mt-3 px-3 py-2 bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] text-white rounded-full hover:opacity-90 transition-opacity duration-200 font-medium"
                        >
                            Contact Me
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
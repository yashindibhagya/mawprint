import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navLinks = [
    { name: 'HOME', section: 'hero' },
    { name: 'ABOUT US', section: 'about' },
    { name: 'SERVICES', section: 'services' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        <header className="fixed w-full z-50 flex justify-center items-start bg-transparent">
            <div className="mt-2 w-[96%] max-w-7xl rounded-2xl bg-[#fff]/60 shadow-lg flex items-center px-6 py-2 md:py-3 backdrop-blur-md border border-black/10">
                {/* Logo and Brand */}
                <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/assets/img/maw.png" alt="Logo" className="mr-2" style={{ width: 'auto', height: '40px' }} />
                </div>
                {/* Center Nav */}
                <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
                    {navLinks.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.section)}
                            className="text-base font-medium text-black hover:text-gray-700 transition-colors duration-200 px-2"
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
                {/* Right: Contact Buttons */}
                <div className="hidden md:flex items-center space-x-3 ml-4">
                    <button
                        className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-7 py-2 rounded-full text-base shadow transition-colors duration-200"
                        onClick={() => scrollToSection('contact')}
                    >
                        CONTACT US
                    </button>
                    <button
                        className="bg-lime-400 hover:bg-lime-300 text-black rounded-full w-10 h-10 flex items-center justify-center shadow transition-colors duration-200"
                        aria-label="Contact Arrow"
                        onClick={() => scrollToSection('contact')}
                    >
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                </div>
                {/* Mobile menu button */}
                <div className="md:hidden flex-1 flex justify-end">
                    <button
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-600 focus:outline-none"
                    >
                        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile menu overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 flex justify-center items-start pt-20 md:hidden">
                    <div className="w-[92%] max-w-md rounded-2xl bg-[#d3d3d3]/95 shadow-xl p-6 flex flex-col items-center space-y-6">
                        {navLinks.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.section)}
                                className="w-full text-lg font-medium text-black hover:text-gray-700 py-2 rounded transition-colors duration-200"
                            >
                                {item.name}
                            </button>
                        ))}
                        <div className="flex space-x-3 w-full justify-center">
                            <button
                                className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-7 py-2 rounded-full text-base shadow transition-colors duration-200 w-full"
                                onClick={() => scrollToSection('contact')}
                            >
                                CONTACT US
                            </button>
                            <button
                                className="bg-lime-400 hover:bg-lime-300 text-black rounded-full w-10 h-10 flex items-center justify-center shadow transition-colors duration-200"
                                aria-label="Contact Arrow"
                                onClick={() => scrollToSection('contact')}
                            >
                                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
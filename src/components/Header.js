import React, { useState, useEffect } from 'react';

const navLinks = [
    { name: 'HOME', section: 'hero' },
    { name: 'ABOUT US', section: 'about' },
    { name: 'SERVICES', section: 'services' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <header className="fixed w-full z-50 flex justify-center items-start transition-all duration-300">
            <div className={`mt-4 w-[95%] max-w-6xl rounded-3xl transition-all duration-500 ease-out ${scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-200/50'
                : 'bg-white/20 backdrop-blur-md shadow-lg border border-white/30'
                } flex items-center px-6 py-3 md:py-4 hover:shadow-xl hover:scale-[1.02] transform`}>

                {/* Logo and Brand */}
                <div className="flex items-center flex-shrink-0 cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    onClick={() => window.location.href = '/'}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                        </svg>
                    </div>
                    <div className="ml-3 hidden sm:block">
                        <div className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            BRAND
                        </div>
                    </div>
                </div>

                {/* Center Nav */}
                <nav className="hidden md:flex flex-1 justify-center items-center space-x-1">
                    {navLinks.map((item, index) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.section)}
                            className="group relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 px-4 py-2 rounded-2xl hover:bg-gray-100/50 overflow-hidden"
                        >
                            <span className="relative z-10">{item.name}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl"></div>
                        </button>
                    ))}
                </nav>

                {/* Right: Contact Buttons */}
                <div className="hidden md:flex items-center space-x-3 ml-4">
                    <button
                        className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-2xl text-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden group"
                        onClick={() => scrollToSection('contact')}
                    >
                        <span className="relative z-10">CONTACT US</span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl w-11 h-11 flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:rotate-12"
                        aria-label="Contact Arrow"
                        onClick={() => scrollToSection('contact')}
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex-1 flex justify-end">
                    <button
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 rounded-2xl text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 focus:outline-none transition-all duration-300 transform hover:scale-105"
                    >
                        <div className="relative w-6 h-6">
                            <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                                }`}></span>
                            <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                                }`}></span>
                            <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                                }`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMenu}></div>
                <div className={`absolute top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95'
                    }`}>
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-gray-200/50">
                        <div className="flex flex-col space-y-2 mb-6">
                            {navLinks.map((item, index) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.section)}
                                    className={`w-full text-left text-base font-medium text-gray-700 hover:text-gray-900 py-3 px-4 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transform hover:scale-[1.02] ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex space-x-3">
                            <button
                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl text-sm shadow-lg transition-all duration-300 transform hover:scale-105"
                                onClick={() => scrollToSection('contact')}
                            >
                                CONTACT US
                            </button>
                            <button
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
                                aria-label="Contact Arrow"
                                onClick={() => scrollToSection('contact')}
                            >
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
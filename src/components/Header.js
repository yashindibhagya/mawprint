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
                    <img
                        src="/assets/img/maw.png"
                        alt="MawPrint Logo"
                        className="h-12 w-12 rounded-2xl shadow-lg p-1 object-contain"
                    />
                </div>

                {/* Center Nav */}
                <nav className="hidden md:flex flex-1 justify-center items-center space-x-1">
                    {navLinks.map((item, index) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.section)}
                            className="group relative text-sm font-medium text-gray-700 hover:text-red-600 transition-all duration-300 px-5 py-2.5 rounded-2xl hover:bg-red-50/80 overflow-hidden backdrop-blur-sm"
                        >
                            <span className="relative z-10 tracking-wide">{item.name}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl"></div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></div>
                        </button>
                    ))}
                </nav>

                {/* Right: Contact Buttons */}
                <div className="hidden md:flex items-center space-x-3 ml-4">
                    <button
                        className="relative bg-gradient-to-r from-red-500 to-black hover:from-red-600 hover:to-red-800 text-white font-semibold px-6 py-2.5 rounded-2xl text-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden group"
                        onClick={() => scrollToSection('contact')}
                    >
                        <span className="relative z-10 tracking-wide">CONTACT US</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex-1 flex justify-end">
                    <button
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 rounded-2xl text-gray-700 hover:text-red-600 hover:bg-red-50/50 focus:outline-none transition-all duration-300 transform hover:scale-105"
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
                                    className={`w-full text-left text-base font-medium text-gray-700 hover:text-red-600 py-3 px-4 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 transform hover:scale-[1.02] ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <span className="tracking-wide">{item.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex space-x-3">
                            <button
                                className="flex-1 bg-gradient-to-r from-red-500 to-black hover:from-red-600 hover:to-red-800 text-white font-semibold px-6 py-3 rounded-2xl text-sm shadow-lg transition-all duration-300 transform hover:scale-105 group overflow-hidden relative"
                                onClick={() => scrollToSection('contact')}
                            >
                                <span className="relative z-10 tracking-wide">CONTACT US</span>
                                <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
import React, { useState, useEffect, useRef } from 'react';
import Image from '../assets/img/pic.png';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const heroRef = useRef(null);

    const texts = ['UI/UX Designer', 'Mobile App Developer'];

    // Typewriter effect
    useEffect(() => {
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const timeout = setTimeout(() => {
            const current = texts[currentIndex];

            if (!isDeleting) {
                // Typing
                if (currentText.length < current.length) {
                    setCurrentText(current.substring(0, currentText.length + 1));
                } else {
                    // Finished typing, start deleting after pause
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                // Deleting
                if (currentText.length > 0) {
                    setCurrentText(current.substring(0, currentText.length - 1));
                } else {
                    // Finished deleting, move to next text
                    setIsDeleting(false);
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
                }
            }
        }, isDeleting ? deleteSpeed : typeSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, currentIndex, isDeleting, texts]);

    // Handle scroll to sections
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 60,
                behavior: 'smooth',
            });
        }
    };

    // Track window resize for better responsiveness
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Set visibility after component mounts for animations
    useEffect(() => {
        setIsVisible(true);

        // Add the keyframes for the animations
        if (!document.getElementById('hero-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'hero-animation-styles';
            style.innerHTML = `
                @keyframes gradientFlow {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                
                @keyframes floatAnimation {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }
                
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                @keyframes marquee2 {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                @keyframes blink {
                    0%, 50% {
                        opacity: 1;
                    }
                    51%, 100% {
                        opacity: 0;
                    }
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradientFlow 15s ease infinite;
                }
                
                .animate-float {
                    animation: floatAnimation 6s ease-in-out infinite;
                }
                
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
                
                .animate-marquee2 {
                    animation: marquee2 25s linear infinite;
                }

                .typewriter-cursor {
                    animation: blink 1s infinite;
                    color: #a855f7;
                    font-weight: 300;
                }

                /* Responsive styles */
                /* Extra small devices */
                @media (max-width: 375px) {
                    .hero-name {
                        font-size: 2rem !important;
                    }
                    .hero-title {
                        font-size: 1rem !important;
                    }
                    .hero-subtitle {
                        font-size: 0.875rem !important;
                    }
                    .hero-description {
                        font-size: 0.875rem !important;
                    }
                    .hero-button-container {
                        flex-direction: column !important;
                    }
                    .hero-marquee-text {
                        font-size: 0.65rem !important;
                    }
                }
                
                /* Small devices */
                @media (max-width: 640px) {
                    .hero-badge {
                        padding: 0.25rem 0.75rem !important;
                        font-size: 0.7rem !important;
                    }
                    .hero-badge.left {
                        left: 0 !important;
                        bottom: 0 !important;
                    }
                    .hero-badge.right {
                        right: 0 !important;
                        top: 0 !important;
                    }
                    .hero-icon-badge {
                        width: 2rem !important;
                        height: 2rem !important;
                        right: 0 !important;
                    }
                    .hero-icon-badge svg {
                        width: 1rem !important;
                        height: 1rem !important;
                    }
                    .hero-marquee-item {
                        margin: 0 0.75rem !important;
                    }
                    .hero-marquee-separator {
                        margin: 0 0.5rem !important;
                    }
                    .hero-stats {
                        gap: 1rem !important;
                    }
                }
                
                /* Medium devices */
                @media (min-width: 641px) and (max-width: 768px) {
                    .hero-content {
                        padding-top: 2rem !important;
                        padding-bottom: 2rem !important;
                    }
                }
                
                /* Large devices */
                @media (min-width: 769px) and (max-width: 1024px) {
                    .hero-content {
                        padding-top: 3rem !important;
                        padding-bottom: 3rem !important;
                    }
                }
                
                /* Landscape orientation for mobile */
                @media (max-height: 500px) and (orientation: landscape) {
                    .hero-section {
                        min-height: auto !important;
                        padding-top: 2rem !important;
                        padding-bottom: 2rem !important;
                    }
                    .hero-image-container {
                        max-height: 60vh !important;
                    }
                    .hero-content {
                        padding-top: 1rem !important;
                        padding-bottom: 1rem !important;
                    }
                    .hero-stats {
                        margin-top: 1rem !important;
                    }
                }
                
                /* Ultra-wide screens */
                @media (min-width: 1921px) {
                    .hero-container {
                        max-width: 1800px !important;
                    }
                    .hero-name {
                        font-size: 5rem !important;
                    }
                    .hero-title {
                        font-size: 2.5rem !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    // Determine if device is in portrait orientation
    const isPortrait = windowSize.height > windowSize.width;

    return (
        <section
            id="home"
            ref={heroRef}
            className="hero-section min-h-screen flex flex-col justify-center relative overflow-hidden py-6 sm:py-8 md:py-12 lg:py-16"
        >
            {/* Particles background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-full opacity-20">
                    {Array(20).fill().map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full animate-float"
                            style={{
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                background: `rgba(${Math.random() * 155 + 100}, ${Math.random() * 155 + 100}, 255, ${Math.random() * 0.3 + 0.2})`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 10 + 10}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="hero-container container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex flex-col justify-center">
                <div className="hero-content flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
                    {/* Left Content */}
                    <div
                        className={`w-full lg:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '0.2s' }}
                    >
                        {/* Status pill */}
                        <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-3 sm:mb-4 md:mb-6 transition-all duration-300 hover:bg-white/15">
                            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2 animate-pulse"></span>
                            <span className="text-gray-200 text-xs sm:text-sm">Available for new projects</span>
                        </div>

                        {/* Heading with modern typography */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                            <span className="text-white">I'm </span>
                            <span className="hero-name animate-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                                Yashindi Bhagya
                            </span>
                        </h1>

                        {/* Typewriter Effect for roles */}
                        <div className="mb-3 sm:mb-4 md:mb-6" style={{ minHeight: '2.5rem' }}>
                            <h2 className="hero-title text-xl sm:text-2xl md:text-3xl font-medium text-white/90">
                                {currentText}
                                <span className="typewriter-cursor">|</span>
                            </h2>
                        </div>

                        {/* Description with better readability */}
                        <p className="hero-description text-gray-300 text-base sm:text-lg max-w-md mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                            An experienced Product Designer with 10+ years crafting intuitive digital experiences that connect brands with their audience.
                        </p>

                        {/* Modern button group */}
                        <div className="hero-button-container flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => scrollToSection('work')}
                                className="group relative px-4 sm:px-6 py-2.5 sm:py-3 overflow-hidden rounded-full bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300"
                            >
                                <div className="absolute inset-0 w-0 bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-300 group-hover:w-full opacity-80"></div>
                                <span className="relative flex items-center justify-center gap-1.5 sm:gap-2 text-white text-sm sm:text-base font-medium">
                                    View My Portfolio
                                    <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </button>

                            <button
                                onClick={() => scrollToSection('contact')}
                                className="relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 hover:border-white/40 text-white text-sm sm:text-base transition-all duration-300"
                            >
                                Hire Me
                            </button>
                        </div>

                        {/* Stats 
                        <div className="hero-stats flex gap-6 sm:gap-8 mt-6 sm:mt-8 md:mt-12">
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-white">2+</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Years of Experience</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-white">50+</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Projects Completed</p>
                            </div>
                        </div> */}
                    </div>

                    {/* Right Content - Image with enhanced presentation */}
                    <div
                        className={`w-full lg:w-1/2 flex justify-center ${isPortrait ? 'mt-6 lg:mt-0' : ''} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '0.4s' }}
                    >
                        <div className="hero-image-container relative">
                            {/* Professional frame for image */}
                            <div className="relative overflow-hidden">
                                {/* Main image with elegant dark border */}
                                <div>
                                    {/* Image with overlay */}
                                    <div className="absolute inset-0"></div>
                                    <img
                                        src={Image}
                                        alt="Yashindi Bhagya"
                                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl object-cover"
                                        style={{
                                            height: 'auto',
                                            maxHeight: isPortrait ? '50vh' : '70vh'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Floating skill badges with glassmorphism */}
                            <div className="hero-badge left absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-[#0c0c20]/80 backdrop-blur-md border border-white/10 text-white text-sm shadow-lg shadow-purple-500/10">
                                Product Designer
                            </div>

                            <div className="hero-badge right absolute -top-4 -right-4 px-4 py-2 rounded-full bg-[#0c0c20]/80 backdrop-blur-md border border-white/10 text-white text-sm shadow-lg shadow-pink-500/10">
                                UI/UX Designer
                            </div>

                            <div className="hero-icon-badge absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12 bg-[#0c0c20]/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/10">
                                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Marquee with dual animations for seamless looping */}
            <div
                className={`w-full absolute bottom-0 left-0 overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '0.6s' }}
            >
                <div className="relative py-2 sm:py-3 md:py-4 bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-indigo-500/80 backdrop-blur-sm border-t border-white/10">
                    <div className="marquee-container relative overflow-hidden h-6">
                        {/* First line of text */}
                        <div className="animate-marquee whitespace-nowrap absolute">
                            {Array(10).fill().map((_, i) => (
                                <span key={i} className="hero-marquee-item inline-block mx-4 sm:mx-8">
                                    <span className="hero-marquee-text text-white/90 text-xs sm:text-sm font-medium">PIXEL-PERFECT PRECISION</span>
                                    <span className="hero-marquee-separator mx-2 sm:mx-4 text-white">•</span>
                                    <span className="hero-marquee-text text-white/90 text-xs sm:text-sm font-medium">CREATIVE PROBLEM-SOLVING</span>
                                    <span className="hero-marquee-separator mx-2 sm:mx-4 text-white">•</span>
                                    <span className="hero-marquee-text text-white/90 text-xs sm:text-sm font-medium">RESPONSIVE DESIGN</span>
                                    <span className="hero-marquee-separator mx-2 sm:mx-4 text-white">•</span>
                                </span>
                            ))}
                        </div>

                        {/* Duplicated line for seamless looping */}
                        <div className="animate-marquee2 whitespace-nowrap absolute">
                            {Array(10).fill().map((_, i) => (
                                <span key={i} className="hero-marquee-item inline-block mx-4 sm:mx-8">
                                    <span className="hero-marquee-text text-white/90 text-xs sm:text-sm font-medium">PIXEL-PERFECT PRECISION</span>
                                    <span className="hero-marquee-separator mx-2 sm:mx-4 text-white">•</span>
                                    <span className="hero-marquee-text text-white/90 text-xs sm:text-sm font-medium">CREATIVE PROBLEM-SOLVING</span>
                                    <span className="hero-marquee-separator mx-2 sm:mx-4 text-white">•</span>
                                    <span className="hero-marquee-text text-white/90 text-xs sm:text-sm font-medium">RESPONSIVE DESIGN</span>
                                    <span className="hero-marquee-separator mx-2 sm:mx-4 text-white">•</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
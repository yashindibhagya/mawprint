import React, { useState, useEffect, useRef, useMemo } from 'react';

const Hero = () => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);
    const typedTextRef = useRef(null);

    // Move texts array inside useMemo to fix the hooks dependency warning
    const texts = useMemo(() => [
        "Submlimation Banners",
        "Submlimation Flags"
    ], []);

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
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Set visibility after component mounts for animations
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Typing effect
    useEffect(() => {
        let timeout;
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const delayAfterWord = 2000;

        const type = () => {
            const currentText = texts[currentTextIndex];

            if (isDeleting) {
                if (currentCharIndex > 0) {
                    if (typedTextRef.current) {
                        typedTextRef.current.textContent = currentText.substring(0, currentCharIndex - 1);
                        currentCharIndex--;
                        timeout = setTimeout(type, typingSpeed / 2);
                    }
                } else {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    timeout = setTimeout(type, typingSpeed);
                }
            } else {
                if (currentCharIndex < currentText.length) {
                    if (typedTextRef.current) {
                        typedTextRef.current.textContent = currentText.substring(0, currentCharIndex + 1);
                        currentCharIndex++;
                        timeout = setTimeout(type, typingSpeed);
                    }
                } else {
                    timeout = setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, delayAfterWord);
                }
            }
        };

        type();

        // Cleanup function to clear any pending timeouts
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            if (typedTextRef.current) {
                typedTextRef.current.textContent = '';
            }
        };
    }, [texts]);

    // Determine if device is in portrait orientation
    const isPortrait = windowSize.height > windowSize.width;

    return (
        <section
            id="home"
            ref={heroRef}
            className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-white pt-24 md:pt-32 pb-32 md:pb-20"
        >

            <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-12 relative z-10 flex-grow flex items-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content */}
                    <div
                        className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '0.2s' }}
                    >
                        {/* Large WHO text */}
                        <div className="relative mb-8">
                            <h1 className="text-[3rem] xs:text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[15rem] font-black text-gray-100 leading-none select-none">
                                WHO
                            </h1>
                            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-8 lg:left-8">
                                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
                                    <span ref={typedTextRef} className="inline-block min-w-[120px] xs:min-w-[150px] sm:min-w-[200px]"></span>
                                    <span className="cursor inline-block w-1 h-[1em] bg-red-600 ml-1 animate-[blink_1s_infinite]"></span>
                                </div>
                            </div>
                        </div>

                        {/* Red accent block */}
                        <div className="bg-red-600 text-white p-4 sm:p-6 md:p-8 max-w-md mb-6 sm:mb-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Bringing Your Brand to Life Through High-Quality Prints</h2>
                            <p className="text-red-100 leading-relaxed text-sm sm:text-base">
                                From vibrant sublimation banners to custom fabric prints we make your visuals stand out.
                            </p>
                        </div>

                        {/* Call to action */}
                        <div className="flex flex-wrap gap-3 sm:gap-4">

                            <button
                                onClick={() => scrollToSection('work')}
                                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-black text-black font-bold text-base sm:text-lg hover:bg-black hover:text-white transition-all duration-300"
                            >
                                EXPLORE WORK
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div
                        className={`flex justify-center lg:justify-end transition-all`}
                        style={{ transitionDelay: '0.4s' }}
                    >
                        <div className="relative">
                            {/* Main image container */}
                            <div className="relative overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="/assets/img/printer.jpg"
                                    alt="Artist Community"
                                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover transition-all duration-500 h-48 sm:h-64 md:h-80 lg:h-[50vh]"
                                    style={{
                                        objectPosition: 'center'
                                    }}
                                />
                            </div>

                            {/* Floating text elements - hide on xs screens for better mobile UX */}
                            <div className="absolute -top-6 -left-8 bg-white px-4 py-2 shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300 hidden sm:block">
                                <span className="text-black font-bold text-sm">ART</span>
                            </div>
                            <div className="absolute -bottom-4 -right-6 bg-red-600 text-white px-4 py-2 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300 hidden sm:block">
                                <span className="font-bold text-sm">COMMUNITY</span>
                            </div>
                            <div className="absolute top-1/2 -left-12 bg-black text-white px-3 py-1 shadow-lg transform -rotate-90 hover:rotate-0 transition-transform duration-300 hidden sm:block">
                                <span className="font-bold text-xs">CREATIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom text marquee */}
            <div
                className={`w-full absolute bottom-0 left-0 overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '0.6s' }}
            >
                <div className="relative py-4 bg-black text-white">
                    <div className="flex whitespace-nowrap overflow-hidden">
                        <div className="animate-marquee whitespace-nowrap flex items-center">
                            {Array(8).fill().map((_, i) => (
                                <span key={i} className="inline-flex items-center mx-8">
                                    <span className="text-white font-bold text-lg">CREATIVE EXPRESSION</span>
                                    <span className="mx-4 text-red-600 text-2xl">●</span>
                                    <span className="text-white font-bold text-lg">ARTISTIC INNOVATION</span>
                                    <span className="mx-4 text-red-600 text-2xl">●</span>
                                    <span className="text-white font-bold text-lg">COMMUNITY DRIVEN</span>
                                    <span className="mx-4 text-red-600 text-2xl">●</span>
                                </span>
                            ))}
                        </div>
                        <div className="animate-marquee whitespace-nowrap flex items-center">
                            {Array(8).fill().map((_, i) => (
                                <span key={`dup-${i}`} className="inline-flex items-center mx-8">
                                    <span className="text-white font-bold text-lg">CREATIVE EXPRESSION</span>
                                    <span className="mx-4 text-red-600 text-2xl">●</span>
                                    <span className="text-white font-bold text-lg">ARTISTIC INNOVATION</span>
                                    <span className="mx-4 text-red-600 text-2xl">●</span>
                                    <span className="text-white font-bold text-lg">COMMUNITY DRIVEN</span>
                                    <span className="mx-4 text-red-600 text-2xl">●</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                
                @keyframes blink {
                    0%, 50% {
                        opacity: 1;
                    }
                    51%, 100% {
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
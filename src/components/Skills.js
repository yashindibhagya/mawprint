import React, { useRef } from 'react';

const galleryImages = [
    {
        src: `${process.env.PUBLIC_URL}/assets/img/maw.png`,
        title: 'Business Logo'
    },
    {
        src: `${process.env.PUBLIC_URL}/assets/img/maw full.png`,
        title: 'Full Logo'
    },
    {
        src: `${process.env.PUBLIC_URL}/assets/img/printer.jpg`,
        title: 'Printer in Action'
    },
    {
        src: `${process.env.PUBLIC_URL}/assets/img/Portfolio.png`,
        title: 'Portfolio Showcase'
    },
    {
        src: `${process.env.PUBLIC_URL}/assets/img/pic.png`,
        title: 'Team Photo'
    },
    {
        src: `${process.env.PUBLIC_URL}/assets/img/Remove.png`,
        title: 'Creative Work'
    },
    {
        src: `${process.env.PUBLIC_URL}/assets/img/_1___1_-r.png`,
        title: 'Business Event'
    },
];

const SCROLL_AMOUNT = 320;

const Skills = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
        }
    };
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
        }
    };

    return (
        <section id="gallery" className="py-12 sm:py-16 md:py-20 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 sm:mb-16 md:mb-20 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 bg-gradient-to-l from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] bg-clip-text text-transparent">
                        Business Photo Gallery
                    </h2>
                    <p className="mt-2 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base text-white opacity-80">
                        Explore moments from our business journey, creative work, and team culture.
                    </p>
                </div>
                {/* Horizontal Scroll Gallery with Arrows */}
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        aria-label="Scroll left"
                        onClick={scrollLeft}
                        className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all duration-200 shadow-lg focus:outline-none"
                        style={{ backdropFilter: 'blur(4px)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    {/* Right Arrow */}
                    <button
                        aria-label="Scroll right"
                        onClick={scrollRight}
                        className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all duration-200 shadow-lg focus:outline-none"
                        style={{ backdropFilter: 'blur(4px)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div
                        ref={scrollRef}
                        className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                        style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
                    >
                        {galleryImages.map((img, idx) => (
                            <div
                                key={img.src}
                                className="group min-w-[280px] max-w-xs flex-shrink-0 snap-center bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer flex flex-col items-center"
                            >
                                {/* Image */}
                                <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                {/* Caption */}
                                <div className="p-4 w-full text-center">
                                    <h3 className="text-lg font-semibold text-white mb-1">{img.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Hide scrollbar for all browsers */}
                    <style>{`
                        .scrollbar-hide::-webkit-scrollbar { display: none; }
                        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                </div>
            </div>
        </section>
    );
};

export default Skills;
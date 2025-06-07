import React, { useState, useEffect } from 'react';

const About = () => {
    // Small decorative dots that appear in the background
    const renderDecorationDots = () => {
        return (
            <>
                {/* Responsive dot positioning with smaller sizes on mobile */}
                <div className="absolute top-20 left-10 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full opacity-30"></div>
                <div className="absolute bottom-40 right-20 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-20"></div>
                <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-40"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-30"></div>
                <div className="absolute top-2/3 right-10 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full opacity-25"></div>
            </>
        );
    };

    // State for the slow animated dots
    const [dots, setDots] = useState(() =>
        Array(60).fill().map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            opacity: Math.random() * 0.5 + 0.2,
            size: 1 // keep all dots the same size of 1px
        }))
    );

    // Effect for slow animated dots
    useEffect(() => {
        // Function to update random dots
        const updateRandomDots = () => {
            setDots(prevDots => {
                return prevDots.map(dot => {
                    // Randomly decide which dots to update (only 10% chance to make it slower)
                    if (Math.random() < 0.1) {
                        return {
                            ...dot,
                            top: Math.random() * 100,
                            left: Math.random() * 100,
                            opacity: Math.random() * 0.5 + 0.2
                        };
                    }
                    return dot;
                });
            });
        };

        // Set interval to update dots every 5 seconds (slower update interval)
        const intervalId = setInterval(updateRandomDots, 50000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section id="about" className="min-h-screen text-white relative py-12 md:py-16 lg:py-20 ">
            {renderDecorationDots()}

            <div className="absolute inset-0 pointer-events-none">
                {dots.map((dot, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-gray-400 rounded-full"
                        style={{
                            top: `${dot.top}%`,
                            left: `${dot.left}%`,
                            opacity: dot.opacity,
                            // Add a very slow transition effect (8 seconds)
                            transition: 'all 1s ease-in-out'
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Responsive title with adjusted sizing */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] bg-clip-text text-transparent">
                        Who Am I
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
                        {/* Text content with responsive padding and sizing */}
                        <div className="max-w-full md:max-w-3xl px-4 sm:px-6 md:px-8">
                            <p className="mb-4 sm:mb-6 text-base sm:text-lg">
                                Hey, I'm <span className="font-bold">Dasun Lakshan</span>, a passionate UI/UX Designer, Web Developer, Front-End Developer, Graphic Designer, Video Editor, and Visual Storyteller from Sri Lanka.
                            </p>

                            <p className="mb-4 sm:mb-6 text-gray-300 leading-relaxed text-sm sm:text-base">
                                As a full-time freelancer, I thrive on crafting seamless digital experiences that merge creativity with functionality. With a Higher National Diploma in Information Technology (HNDIT) and a strong foundation in design and development, I continuously push my boundaries as a self-learner, exploring the latest trends and technologies to bring ideas to life.
                            </p>

                            <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                                My approach combines technical expertise with aesthetic sensibility, ensuring that every project not only looks beautiful but also functions flawlessly. I believe in creating user-centered designs that engage, inspire, and deliver measurable results.
                            </p>

                            {/* Social Icons with responsive spacing */}
                            <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
                                <button
                                    onClick={() => window.open('https://instagram.com/username', '_blank')}
                                    className="text-white hover:text-[#ff58d8] transition-colors"
                                    aria-label="Instagram Profile"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => window.open('https://dribbble.com/username', '_blank')}
                                    className="text-white hover:text-[#ff58d8] transition-colors"
                                    aria-label="Dribbble Portfolio"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => window.open('https://github.com/username', '_blank')}
                                    className="text-white hover:text-[#ff58d8] transition-colors"
                                    aria-label="GitHub Profile"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => window.open('https://linkedin.com/in/username', '_blank')}
                                    className="text-white hover:text-[#ff58d8] transition-colors"
                                    aria-label="LinkedIn Profile"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2V9zm4-3a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar with responsive width */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative h-1 w-full bg-gray-800 rounded-full overflow-hidden my-6 sm:my-8 lg:my-10">
                        <div className="w-full h-full bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] p-4 text-white rounded-lg rounded-full relative">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
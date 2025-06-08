import React, { useEffect } from 'react';

const EducationExperience = () => {
    // Add the flow animation keyframes to the document only once
    useEffect(() => {
        if (!document.getElementById('flow-animation-style')) {
            const style = document.createElement('style');
            style.id = 'flow-animation-style';
            style.innerHTML = `
                @keyframes flow {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                
                .animate-flow {
                    display: inline-flex;
                    width: 200%;
                    animation: flow 20s linear infinite;
                }
                
                /* Prevent horizontal scrolling on the entire page */
                html, body {
                    overflow-x: hidden;
                    width: 100%;
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    return (
        <section className="py-12 sm:py-16 md:py-8 relative">
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-gray-400 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                    />
                ))}
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto">
                    {/* Education Section */}
                    <div>
                        <div className="flex items-center mb-8">
                            <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold bg-gradient-to-l from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] bg-clip-text text-transparent">
                                Education
                            </h2>
                        </div>
                        <div className="space-y-8">
                            {/* BSc Degree */}
                            <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b from-[#ff58d8] to-[#4f4cfa]">
                                <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-[#ff58d8]"></div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 transition-all duration-300 hover:border-white/20 hover:transform hover:-translate-y-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        BSc (Hons) Computer Science
                                    </h3>
                                    <p className="text-sm text-gray-300 font-medium mb-1">
                                        National School of Business Management (Undergraduate)
                                    </p>
                                    <p className="text-xs text-teal-300 mb-3 font-medium">
                                        2022-2025
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Focused on software development, algorithms, and advanced computer science concepts. Specializing in UI/UX design and modern web technologies.
                                    </p>
                                </div>
                            </div>

                            {/* Advanced Level */}
                            <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b from-[#bc50ff] to-[#4f4cfa]">
                                <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-[#bc50ff]"></div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 transition-all duration-300 hover:border-white/20 hover:transform hover:-translate-y-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        G.C.E. Advanced Level
                                    </h3>
                                    <p className="text-sm text-gray-300 font-medium mb-1">
                                        Sujatha Vidalaya, Nugegoda
                                    </p>
                                    <p className="text-xs text-teal-300 mb-3 font-medium">
                                        2018-2021
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Excelled in Combined Mathematics stream with a strong foundation in analytical thinking and problem-solving skills.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div>
                        <div className="flex items-center mb-8">
                            <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] bg-clip-text text-transparent">
                                Experience
                            </h2>
                        </div>
                        <div className="space-y-8">
                            {/* Amerck */}
                            <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b from-[#ff58d8] to-[#bc50ff]">
                                <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-[#ff58d8]"></div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 transition-all duration-300 hover:border-white/20 hover:transform hover:-translate-y-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        UI/UX Designer
                                    </h3>
                                    <p className="text-sm text-gray-300 font-medium mb-1">
                                        Amerck
                                    </p>
                                    <p className="text-xs text-teal-300 mb-3 font-medium">
                                        2025 May - Present
                                    </p>
                                    <ul className="text-sm text-gray-400 space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-teal-300 mr-2">•</span>
                                            Designed responsive user interfaces for cross-platform web and mobile applications across healthcare.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-teal-300 mr-2">•</span>
                                            Conducted user research and usability testing to inform design decisions
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-teal-300 mr-2">•</span>
                                            Collaborated with development team to ensure pixel-perfect implementation
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* New Pacific Systems */}
                            <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b from-[#bc50ff] to-[#4f4cfa]">
                                <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-[#bc50ff]"></div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 transition-all duration-300 hover:border-white/20 hover:transform hover:-translate-y-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        UI/UX Designer
                                    </h3>
                                    <p className="text-sm text-gray-300 font-medium mb-1">
                                        New Pacific Systems
                                    </p>
                                    <p className="text-xs text-teal-300 mb-3 font-medium">
                                        2023 Jan - 2023 Dec
                                    </p>
                                    <ul className="text-sm text-gray-400 space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-teal-300 mr-2">•</span>
                                            Designed responsive web and mobile interfaces for enterprise clients
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-teal-300 mr-2">•</span>
                                            Created and maintained design system documentation
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-teal-300 mr-2">•</span>
                                            Facilitated design workshops and stakeholder presentations
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Bar */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
                <div className="relative w-full h-8 sm:h-12 lg:h-16 overflow-hidden">
                    <div className="animate-flow whitespace-nowrap text-transparent font-extrabold tracking-wider flex items-center h-full" style={{ fontSize: '2.7rem', WebkitTextStroke: '0.5px white' }}>
                        <span className="mx-2 sm:mx-4">PIXEL-PERFECT PRECISION</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">CREATIVE PROBLEM-SOLVING</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">RESPONSIVE DESIGN</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">PIXEL-PERFECT PRECISION</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">CREATIVE PROBLEM-SOLVING</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">RESPONSIVE DESIGN</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="relative h-1 w-full bg-gray-800 rounded-full overflow-hidden my-6 sm:my-8 lg:my-10">
                    <div className="w-full h-full bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] p-4 text-white rounded-lg rounded-full relative">
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationExperience;
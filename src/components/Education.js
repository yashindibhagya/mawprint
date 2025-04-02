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
                        <div className="flex items-center mb-6">
                            <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 bg-gradient-to-l from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] bg-clip-text text-transparent">
                                Education
                            </h2>
                        </div>
                        <div className="pl-4 space-y-6">
                            {/* BSc Degree */}
                            <div className="text-white">
                                <h3 className="text-base sm:text-lg font-semibold">
                                    BSc (Hons) Computer Science
                                </h3>
                                <p className="text-sm">
                                    National School of Business Management (Undergraduate)
                                </p>
                                <p className="text-xs text-teal-300 mt-1">
                                    2022-2025 Present
                                </p>
                                <p className="text-sm mt-2">
                                    Focused on software development and computer science.
                                </p>
                            </div>

                            {/* Graduate Diploma */}
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold">
                                    G.C.E. Advanced Level
                                </h3>
                                <p className="text-sm">
                                    Sujatha Vidalaya, Nugegoda
                                </p>
                                <p className="text-xs text-teal-300 mt-1">
                                    2018-2021
                                </p>
                                <p className="text-sm mt-2">
                                    Combined Mathematics Stream
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div>
                        <div className="flex items-center mb-6 text-white">
                            <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] bg-clip-text text-transparent">
                                Experience
                            </h2>
                        </div>
                        <div className="pl-4">
                            <h3 className="text-base sm:text-lg font-semibold">
                                New Pacific Systems
                            </h3>
                            <p className="text-sm">
                                UI/UX Designer
                            </p>
                            <p className="text-xs text-teal-300 mt-1">
                                2024 Jan - 2025 Jan
                            </p>
                            <p className="text-sm mt-2">
                                Designed and optimized intuitive user experiences for web and mobile applications. Led user research, wireframing, and prototyping to enhance usability and accessibility. Collaborated with developers to ensure seamless implementation of design solutions while maintaining brand consistency.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Bar - Fixed width container with CSS animation */}
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
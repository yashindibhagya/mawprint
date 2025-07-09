import React from 'react';

const cardImages = [
    // SVG placeholders for each card
    (
        <svg viewBox="0 0 1200 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="300" rx="32" fill="#a7f3d0" />
            <circle cx="200" cy="150" r="80" fill="#38bdf8" opacity="0.5" />
            <rect x="900" y="60" width="180" height="180" rx="40" fill="#facc15" opacity="0.4" />
            <ellipse cx="600" cy="220" rx="180" ry="60" fill="#f472b6" opacity="0.3" />
        </svg>
    ),
    (
        <svg viewBox="0 0 1200 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="300" rx="32" fill="#dbeafe" />
            <circle cx="1000" cy="100" r="90" fill="#818cf8" opacity="0.4" />
            <rect x="100" y="120" width="200" height="120" rx="40" fill="#f472b6" opacity="0.3" />
            <ellipse cx="600" cy="80" rx="160" ry="50" fill="#38bdf8" opacity="0.3" />
        </svg>
    ),
    (
        <svg viewBox="0 0 1200 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="300" rx="32" fill="#ede9fe" />
            <circle cx="600" cy="150" r="120" fill="#a78bfa" opacity="0.4" />
            <rect x="900" y="40" width="120" height="220" rx="40" fill="#facc15" opacity="0.2" />
            <ellipse cx="300" cy="220" rx="120" ry="40" fill="#f472b6" opacity="0.2" />
        </svg>
    ),
];

const DigitalTransformationSection = () => {
    // Only 3 services for the sticky stacker effect
    const services = [
        {
            title: "Machine vision system development",
            description: "Newnop provide data annotation, image/video processing and custom AI solutions to identify, recognize and categories defects and objects for various industrial applications.",
            color: "bg-green-50",
            borderColor: "border-green-200"
        },
        {
            title: "Automated Quality Control",
            description: "Advanced computer vision systems for real-time quality inspection and defect detection in manufacturing processes with high accuracy and speed.",
            color: "bg-blue-50",
            borderColor: "border-blue-200"
        },
        {
            title: "Predictive Maintenance",
            description: "AI-powered monitoring systems that predict equipment failures before they occur, reducing downtime and maintenance costs significantly.",
            color: "bg-purple-50",
            borderColor: "border-purple-200"
        }
    ];

    return (
        <div className="relative bg-gray-50">
            {/* Header Section */}
            <div className="py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block px-6 py-2 bg-green-400 text-white rounded-full text-sm font-medium mb-8">
                        Our Solutions
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Digital Transformation Solutions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We develop factory and industry automation solutions with state-of-the-art machine vision
                        systems and AI and AI-agentic workflows.
                    </p>
                </div>
            </div>

            {/* Sticky Stacker Service Cards - Full Width with Image */}
            <div className="relative min-h-[180vh]">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`sticky top-32 mb-16 w-full flex justify-center`}
                        style={{ zIndex: 10 + index }}
                    >
                        <div className={`w-full max-w-7xl px-4 ${service.color} ${service.borderColor} border-2 rounded-3xl shadow-2xl backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-500`}>
                            {/* Full-width image */}
                            <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden mb-8">
                                {cardImages[index]}
                            </div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                                Service {index + 1} of 3
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 text-center">
                                {service.title}
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                                {service.description}
                            </p>
                            <button className="inline-flex items-center px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200">
                                Learn More
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DigitalTransformationSection;
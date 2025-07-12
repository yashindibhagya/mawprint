import React from 'react';

// eslint-disable-next-line no-unused-vars
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
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Automated Quality Control",
            description: "Advanced computer vision systems for real-time quality inspection and defect detection in manufacturing processes with high accuracy and speed.",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Predictive Maintenance",
            description: "AI-powered monitoring systems that predict equipment failures before they occur, reducing downtime and maintenance costs significantly.",
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <section id="services" className="relative bg-gray-50">
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
                        <div
                            className="w-full max-w-7xl px-4 rounded-3xl shadow-2xl flex flex-col items-center justify-end transition-all duration-500 h-96 relative overflow-hidden"
                            style={{ backgroundImage: `url('${service.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            {/* Bottom Gradient Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center text-center text-white pb-8 z-10">
                                <div className="text-sm font-medium uppercase tracking-wider mb-2 opacity-80">
                                    Service {index + 1} of 3
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-2">{service.title}</h3>
                                <p className="mb-4 text-base md:text-lg">{service.description}</p>
                                <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">Learn More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DigitalTransformationSection;
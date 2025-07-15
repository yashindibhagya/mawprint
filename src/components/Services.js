import React from 'react';

const DigitalTransformationSection = () => {
    // Updated services with modern content
    const services = [
        {
            title: "Machine Vision System Development",
            description: "Advanced data annotation, image/video processing, and custom AI solutions for industrial object recognition, defect detection, and automated categorization.",
            image: "/assets/img/1.jpg",
            accent: "from-cyan-500 to-blue-600"
        },
        {
            title: "Automated Quality Control",
            description: "Real-time computer vision systems delivering precision quality inspection with ML-powered defect detection for manufacturing excellence.",
            image: "/assets/img/6.png",
            accent: "from-violet-500 to-purple-600"
        },
        {
            title: "Predictive Maintenance",
            description: "AI-driven monitoring ecosystems that anticipate equipment failures, optimize maintenance schedules, and minimize operational downtime.",
            image: "/assets/img/5.png",
            accent: "from-emerald-500 to-teal-600"
        }
    ];

    return (
        <section id="services" className="relative bg-gradient-to-br from-slate-50 via-white to-gray-50">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="relative py-24 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Modern badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full mb-8 border border-gray-200/50 shadow-lg">
                        <div className="relative">
                            <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse" />
                            <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-ping opacity-75" />
                        </div>
                        <span className="text-sm font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent uppercase tracking-wide">
                            Our Solutions
                        </span>
                    </div>

                    {/* Modern typography */}
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-8 leading-tight">
                        Industrial AI,
                        <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            Redefined
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                        We deliver cutting-edge AI solutions with unmatched precision, reliability, and scalability —
                        transforming industries through intelligent automation.
                    </p>
                </div>
            </div>

            {/* Enhanced Sticky Stacker Service Cards */}
            <div className="relative min-h-[200vh]">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`sticky top-24 mb-20 w-full flex justify-center`}
                        style={{ zIndex: 10 + index }}
                    >
                        <div className="w-full max-w-7xl px-4 group">
                            <div className="relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 h-[28rem] overflow-hidden bg-white border border-gray-200/50 backdrop-blur-sm">
                                {/* Animated background gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                {/* Glass morphism overlay */}
                                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative flex flex-col md:flex-row items-stretch h-full">
                                    {/* Enhanced Image Section */}
                                    <div className="md:w-1/2 w-full h-1/2 md:h-full relative overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Image overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

                                        {/* Floating number badge */}
                                        <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                            <span className={`text-lg font-bold bg-gradient-to-r ${service.accent} bg-clip-text text-transparent`}>
                                                {index + 1}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Enhanced Text Section */}
                                    <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:p-12 relative">
                                        {/* Service indicator */}
                                        <div className="inline-flex items-center gap-2 mb-4">
                                            <div className={`w-8 h-0.5 bg-gradient-to-r ${service.accent} rounded-full`} />
                                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                                                Service {index + 1} of 3
                                            </span>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                            {service.title}
                                        </h3>

                                        <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                                            {service.description}
                                        </p>

                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -top-px left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                                <div className="absolute -bottom-px left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </section>
    );
};

export default DigitalTransformationSection;
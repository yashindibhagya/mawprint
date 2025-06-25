import React from "react";
import { Search, Printer, Truck, RotateCcw, Headphones } from 'lucide-react';

const steps = [
    {
        icon: <Search className="w-8 h-8" />,
        title: "Fast Ordering Now",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
        color: "from-red-500 to-red-700"
    },
    {
        icon: <Printer className="w-8 h-8" />,
        title: "Online Designing",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
        color: "from-gray-800 to-black"
    },
    {
        icon: <Truck className="w-8 h-8" />,
        title: "Express Shipping",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
        color: "from-red-600 to-red-800"
    },
    {
        icon: <RotateCcw className="w-8 h-8" />,
        title: "Satisfaction is 100% Guaranteed",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
        color: "from-black to-gray-700"
    },
    {
        icon: <Headphones className="w-8 h-8" />,
        title: "Free Delivery",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
        color: "from-red-700 to-black"
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div>
                        <span className="text-sm text-red-600 font-semibold tracking-wide uppercase">
                            Let's Get Printing
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                        Reasons to get{" "}
                        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                            printing started
                        </span>
                        <br />
                        with us
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Our dedicated staff makes it easy for you to create a unique design that will
                        impress your clients and make you stand out from the crowd.
                    </p>
                </div>

                {/* Services Grid - Column Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group relative bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-red-400/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Gradient Background Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${step.color} rounded-xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {step.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-black mb-4 group-hover:text-red-600 transition-colors duration-300">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                {step.description}
                            </p>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-4 left-4 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

                            {/* Bottom Border Accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;
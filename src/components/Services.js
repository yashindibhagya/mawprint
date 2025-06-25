import React from 'react';
import { TrendingUp, MessageSquare, Mail, Users, Target, Zap } from 'lucide-react';

const ProductGrid = () => {
    const services = [
        {
            title: "Social Media Marketing",
            description: "Amplify your brand presence across all social platforms with strategic content and engagement campaigns that drive real results.",
            icon: <Users className="w-8 h-8" />,
            gradient: "from-blue-500 to-purple-600",
            bgGradient: "from-blue-500/10 to-purple-600/10",
            borderGradient: "from-blue-500/20 to-purple-600/20",
            iconBg: "from-blue-500 to-purple-600",
            highlight: false,
            features: ["Instagram & Facebook Ads", "Content Strategy", "Community Management"]
        },
        {
            title: "Content Marketing",
            description: "Create compelling, value-driven content that resonates with your audience and establishes your brand as an industry authority.",
            icon: <MessageSquare className="w-8 h-8" />,
            gradient: "from-red-500 to-orange-600",
            bgGradient: "from-red-500/10 to-orange-600/10",
            borderGradient: "from-red-500/20 to-orange-600/20",
            iconBg: "from-red-500 to-orange-600",
            highlight: true,
            features: ["Blog Writing", "Video Content", "SEO Optimization"]
        },
        {
            title: "Email Marketing",
            description: "Build meaningful relationships with personalized email campaigns that convert subscribers into loyal customers and brand advocates.",
            icon: <Mail className="w-8 h-8" />,
            gradient: "from-green-500 to-teal-600",
            bgGradient: "from-green-500/10 to-teal-600/10",
            borderGradient: "from-green-500/20 to-teal-600/20",
            iconBg: "from-green-500 to-teal-600",
            highlight: false,
            features: ["Automated Sequences", "A/B Testing", "Analytics & Reporting"]
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-50 via-transparent to-transparent"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-red-100 to-transparent rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-100 to-transparent rounded-full blur-3xl opacity-30"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div >
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-600 font-semibold tracking-wide uppercase">
                            Our Services
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                        Boost Your{" "}
                        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                            Brand
                        </span>
                        <br />
                        with Our Expertise
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Transform your business with our comprehensive digital marketing solutions designed
                        to drive growth, engagement, and measurable results.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-transparent hover:border-red-400/30 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 ${service.highlight ? 'ring-2 ring-red-500/20 shadow-red-500/10' : ''
                                }`}
                            style={{
                                background: service.highlight
                                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.02) 0%, rgba(185, 28, 28, 0.05) 100%)'
                                    : 'rgba(255, 255, 255, 0.8)'
                            }}
                        >
                            {/* Gradient Background Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`}></div>

                            {/* Highlight Badge */}
                            {service.highlight && (
                                <div className="absolute -top-3 -right-3 z-10">
                                    <div className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        Popular
                                    </div>
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.iconBg} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                {service.icon}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-red-600 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                                    {service.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full mr-3`}></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button className="group/btn relative overflow-hidden w-full bg-gradient-to-r from-gray-900 to-black text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:from-red-600 hover:to-black hover:shadow-lg">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Learn More
                                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-6 left-6 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

                            {/* Bottom Border Accent */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}></div>

                            {/* Floating Accent */}
                            <div className={`absolute -top-1 -left-1 w-8 h-8 bg-gradient-to-br ${service.gradient} rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 blur-sm`}></div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="inline-flex flex-col sm:flex-row gap-4">
                        <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-black text-white font-semibold rounded-full hover:from-red-500 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-red-500/30">
                            <span>Get Started Today</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
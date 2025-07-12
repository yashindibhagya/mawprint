import React from 'react';

export default function impactdrivenhero() {
    return (
        <section id="hero">
            <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 pt-32 md:pt-40">
                <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(300px);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-300px);
            opacity: 0;
          }
        }
        
        .floating-dot {
          animation: floatUp linear infinite;
        }
      `}</style>
                <div className="max-w-6xl w-full text-center">

                    {/* Trust Badge */}
                    <div className="flex justify-center mb-8 md:mb-12 relative">
                        <div className="bg-black rounded-full px-4 py-2 md:px-6 md:py-3 flex items-center space-x-2 relative z-10">
                            {/* Customer avatars */}
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 border-2 border-white"></div>
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 border-2 border-white"></div>
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-white"></div>
                            </div>
                            <span className="text-white text-sm md:text-base font-medium">
                                Trusted by 100+ customers
                            </span>
                        </div>

                        {/* Animated Dots */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(80)].map((_, i) => (
                                <div
                                    key={i}
                                    className="floating-dot absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-gradient-to-r from-red-600 to-black rounded-full opacity-60"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 4}s`,
                                        animationDuration: `${3 + Math.random() * 2}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
                            We are a Creative-Driven
                        </h1>

                        {/* Highlighted tags */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
                            <span className="bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl lg:text-1xl font-semibold">
                                Sublimation Printing
                            </span>
                            <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">&</span>
                            <span className="border-2 border-gray-300 text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl lg:text-2xl font-semibold">
                                Branding
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                            Solutions Company
                        </h2>
                    </div>

                    {/* Description */}
                    <div className="mb-8 md:mb-8">
                        <p className="text-gray-600 text-lg md:text-xl lg:text-1xl max-w-2xl mx-auto leading-relaxed px-1">
                            Mawprint turns your ideas into eye-catching prints. Whether it's a flag, banner, or apparel, we deliver bold, custom designs with quality that speaks for itself.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <button
                            className="group bg-gradient-to-r from-red-600 to-black hover:from-black hover:to-red-600 text-white font-semibold px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-3"
                            onClick={() => {
                                const el = document.getElementById('contact');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                        >
                            <span>Let&apos;s Talk</span>
                            <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
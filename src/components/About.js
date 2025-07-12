import React, { useState, useEffect } from 'react';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0); // eslint-disable-line no-unused-vars
    const [animatedStats, setAnimatedStats] = useState({
        projects: 0,
        team: 0,
        customers: 0,
        experience: 0
    });

    // Slideshow images for About section
    const slideshowImages = [
        `${process.env.PUBLIC_URL}/assets/img/flag.png`,
        `${process.env.PUBLIC_URL}/assets/img/maw full.png`,
        `${process.env.PUBLIC_URL}/assets/img/Portfolio.png`,
        `${process.env.PUBLIC_URL}/assets/img/pic.png`
    ];

    // Auto-advance slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === slideshowImages.length - 1 ? 0 : prevSlide + 1
            );
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [slideshowImages.length]);

    useEffect(() => {
        setIsVisible(true);
        const targets = { projects: 3000, team: 200, customers: 350, experience: 16 };
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setAnimatedStats({
                projects: Math.floor(targets.projects * progress),
                team: Math.floor(targets.team * progress),
                customers: Math.floor(targets.customers * progress),
                experience: Math.floor(targets.experience * progress)
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedStats(targets);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, []);

    const stats = [
        {
            number: `${animatedStats.projects}`,
            label: "Successful Projects",
            suffix: "k",
            color: "from-red-500 to-red-700"
        },
        {
            number: `${animatedStats.team}`,
            label: "Expert Team",
            suffix: "",
            color: "from-gray-800 to-black"
        },
        {
            number: `${animatedStats.customers}`,
            label: "Happy Customers",
            suffix: "",
        },
        {
            number: `${animatedStats.experience}`,
            label: "Years of Experience",
            suffix: "",
        }
    ];

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-black rounded-full mb-6 border border-red-500/20">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-white font-semibold tracking-wide uppercase">
                            About Our Company
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                        Empowering Your{" "}
                        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                            Success
                        </span><br />
                        with Digital Expertise
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-16">
                        Our dedicated team makes it easy for you to achieve outstanding results with
                        innovative solutions that will impress your clients and make you stand out from the crowd.
                    </p>


                </div>



                {/* Achievements */}
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="group relative bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-red-400/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color || ''} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                                <div className="mb-4"></div> {/* Removed square */}

                                <div className="flex flex-col items-center justify-center mb-2">
                                    <div className="text-3xl sm:text-4xl font-bold text-black flex items-end group-hover:text-red-600 transition-colors duration-300">
                                        {stat.number}
                                        {stat.suffix && <span className="text-red-500">{stat.suffix}</span>}
                                        <span className="text-red-500">+</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 font-medium text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">{stat.label}</p>

                                <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
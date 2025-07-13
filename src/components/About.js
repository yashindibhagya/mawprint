import React, { useState, useEffect } from 'react';

const About = () => {
    const [scrollY, setScrollY] = useState(0);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);
    const [animatedStats, setAnimatedStats] = useState({
        projects: 0,
        customers: 0,
        experience: 0
    });

    // Parallax scroll
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for animating on view
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.target.classList.contains('header-section'))
                        setHeaderVisible(entry.isIntersecting);
                    if (entry.target.classList.contains('stats-section'))
                        setStatsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
        );

        const header = document.querySelector('.header-section');
        const stats = document.querySelector('.stats-section');

        if (header) observer.observe(header);
        if (stats) observer.observe(stats);

        return () => {
            if (header) observer.unobserve(header);
            if (stats) observer.unobserve(stats);
        };
    }, []);

    // Animate stats when visible
    useEffect(() => {
        if (!statsVisible) return;
        const targetStats = {
            projects: 3000,
            customers: 350,
            experience: 30
        };
        const duration = 2000;
        const steps = 60;
        const intervalTime = duration / steps;
        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setAnimatedStats({
                projects: Math.floor(targetStats.projects * progress),
                customers: Math.floor(targetStats.customers * progress),
                experience: Math.floor(targetStats.experience * progress)
            });
            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedStats(targetStats);
            }
        }, intervalTime);
        return () => clearInterval(timer);
    }, [statsVisible]);

    const stats = [
        { number: animatedStats.projects, label: "Successful Projects", suffix: "k", color: "from-red-500 to-red-700" },
        { number: animatedStats.customers, label: "Happy Customers" },
        { number: animatedStats.experience, label: "Years of Experience" }
    ];

    const parallaxStyle = {
        backgroundColor: '#fff',
        transform: `translateY(${scrollY * 0.2}px)`
    };

    return (
        <section id="about" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
            {/* White Background */}
            <div className="absolute inset-0 z-0" style={{ ...parallaxStyle }} />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className={`header-section text-center mb-16 transition-all duration-[1200ms] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-black rounded-full mb-6 border border-red-500/20">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        <span className="text-sm text-white font-semibold uppercase tracking-wide">About Our Company</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                        Empowering Your{" "}
                        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Brand</span>
                        <br />
                        with Vibrant Print Solutions
                    </h2>

                    <p className="text-lg sm:text-xl text-black max-w-3xl mx-auto leading-relaxed">
                        Our dedicated team brings your ideas to life through high-quality sublimation printing — delivering eye-catching banners, custom apparel, and promotional flags that make your brand stand out from the crowd.
                    </p>
                </div>

                {/* Stats Section - Better Alignment */}
                <div className={`stats-section flex flex-wrap justify-center gap-8 transition-all duration-[1200ms] ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`group relative text-center p-8 rounded-2xl border border-gray-200 bg-black shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 min-w-[250px] flex-1 max-w-[300px]`}
                            style={{
                                transitionDelay: `${0.5 + i * 0.15}s`
                            }}
                        >
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 bg-gradient-to-r ${stat.color || ''} transition-opacity duration-300`} />

                            <div className="text-4xl sm:text-5xl font-bold text-white flex items-end justify-center mb-4 group-hover:text-red-400 transition-colors">
                                {stat.number}
                                {stat.suffix && <span className="text-red-500">{stat.suffix}</span>}
                                <span className="text-red-500">+</span>
                            </div>

                            <p className="text-gray-200 font-medium text-base group-hover:text-white transition-colors">{stat.label}</p>

                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
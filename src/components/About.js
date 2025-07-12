import React, { useState, useEffect } from 'react';

const About = () => {
    const [scrollY, setScrollY] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0); // reserved for future slide logic
    const [headerVisible, setHeaderVisible] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);
    const [animatedStats, setAnimatedStats] = useState({
        projects: 0,
        team: 0,
        customers: 0,
        experience: 0
    });

    const slideshowImages = [
        "/assets/img/flag.png",
        "/assets/img/maw full.png",
        "/assets/img/Portfolio.png",
        "/assets/img/pic.png"
    ];

    const targetStats = {
        projects: 3000,
        team: 200,
        customers: 350,
        experience: 16
    };

    // Scroll handler for parallax
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Slideshow auto advance
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slideshowImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slideshowImages.length]);

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

        const duration = 2000;
        const steps = 60;
        const intervalTime = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setAnimatedStats({
                projects: Math.floor(targetStats.projects * progress),
                team: Math.floor(targetStats.team * progress),
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
        { number: animatedStats.team, label: "Expert Team", color: "from-gray-800 to-black" },
        { number: animatedStats.customers, label: "Happy Customers" },
        { number: animatedStats.experience, label: "Years of Experience" }
    ];

    const parallaxStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/parallax-bg.jpg)`,
        transform: `translateY(${scrollY * 0.2}px)`
    };

    return (
        <section id="about" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
            {/* Parallax Background */}
            <div className="absolute inset-0 z-0" style={{ ...parallaxStyle, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className={`header-section text-center mb-16 transition-all duration-[1200ms] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-black rounded-full mb-6 border border-red-500/20">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        <span className="text-sm text-white font-semibold uppercase tracking-wide">About Our Company</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                        Empowering Your{" "}
                        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Success</span>
                        <br />
                        with Digital Expertise
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        Our dedicated team makes it easy for you to achieve outstanding results with
                        innovative solutions that will impress your clients and make you stand out from the crowd.
                    </p>
                </div>

                {/* Stats Section */}
                <div className={`stats-section grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-[1200ms] ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`group relative text-center p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
                            style={{
                                transitionDelay: `${0.5 + i * 0.15}s`
                            }}
                        >
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 bg-gradient-to-r ${stat.color || ''} transition-opacity duration-300`} />

                            <div className="text-3xl sm:text-4xl font-bold text-white flex items-end justify-center mb-2 group-hover:text-red-400 transition-colors">
                                {stat.number}
                                {stat.suffix && <span className="text-red-500">{stat.suffix}</span>}
                                <span className="text-red-500">+</span>
                            </div>

                            <p className="text-gray-200 font-medium text-sm sm:text-base group-hover:text-white transition-colors">{stat.label}</p>

                            {/* Decorative dots */}
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
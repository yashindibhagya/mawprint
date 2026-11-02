import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Work from './components/Work';
import Services from './components/Services';
import Process from './components/Process';
import Why from './components/Why';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEO from './components/SEO';
import { initializeSEO } from './utils/seo';
import { initializePerformance } from './utils/performance';
import { initializeAnalytics } from './config/analytics';
import { brand } from './content/site';

function useActiveSection() {
    const [active, setActive] = useState('hero');
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('main section[id]'));
        if (!('IntersectionObserver' in window) || sections.length === 0) return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);
    return active;
}

function Home() {
    const active = useActiveSection();
    return (
        <>
            <SEO
                title="MawPrint — Sublimation banners, flags & DTF printing in Colombo"
                description="In-house sublimation and DTF printing in Colombo. Banners, flags, land-sale signage and DTF transfers for companies across Sri Lanka. Quotes within one working day."
                keywords="sublimation printing Sri Lanka, banner printing Colombo, flag printing, land sale banners, DTF transfer film, event backdrops"
                pageName="Homepage"
                structuredData={{
                    type: 'LocalBusiness',
                    data: {
                        name: brand.name,
                        description: 'Sublimation and DTF printing for businesses in Sri Lanka.',
                        url: brand.siteUrl,
                        telephone: brand.phone,
                        email: brand.email,
                        address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
                        serviceType: 'Printing Services',
                        areaServed: 'Sri Lanka',
                    },
                }}
            />
            <Header activeSection={active} />
            <main id="main">
                <Hero />
                <Clients />
                <Work />
                <Services />
                <Process />
                <Why />
                <FAQ />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default function App() {
    useEffect(() => {
        initializeSEO();
        initializePerformance();
        initializeAnalytics();
    }, []);

    return (
        <BrowserRouter>
            <div id="top" className="grain relative min-h-screen bg-paper text-ink">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

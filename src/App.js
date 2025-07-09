import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Services from './components/Services';
import Education from './components/Education';
import SEO from './components/SEO';
import { initializeSEO } from './utils/seo';
import { initializePerformance } from './utils/performance';
import { initializeAnalytics } from './config/analytics';
import AutoScrollImages from './components/AutoScrollImages';

function App() {
  // We're only keeping track of active section now, removed darkMode state
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Initialize SEO for the application
    initializeSEO();

    // Initialize performance optimizations
    initializePerformance();

    // Initialize analytics
    initializeAnalytics();

    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to restore scroll position and active tab if coming from project details
  useEffect(() => {
    // Check if we're returning from project details
    const savedPosition = sessionStorage.getItem('scrollPosition');
    const savedTab = sessionStorage.getItem('activeTab');

    if (savedPosition && window.location.pathname === '/') {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
        if (savedTab) {
          setActiveSection(savedTab);
        }
      }, 100);

      // Clear the saved position after restoring
      sessionStorage.removeItem('scrollPosition');
      sessionStorage.removeItem('activeTab');
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black relative">
        {/* Background gradients */}
        <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          {/* Primary gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-50 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-red-100 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        </div>

        {/* Main content wrapper with consistent max-width */}
        <div className="relative z-10">
          <Routes>
            <Route path="/project/:id" element={
              <>
                <SEO
                  title="Project Details - MawPrint | Sublimation Printing Solutions"
                  description="Explore our detailed project showcase featuring custom sublimation printing solutions, banners, and flags. See our work in action."
                  keywords="project showcase, sublimation printing examples, sublimation banner, sublimation flag, flags printing, banner printing, dtf t shirt, fabric banner, flags, custom banners, printing portfolio"
                  pageName="Project Details"
                  structuredData={{
                    type: "CreativeWork",
                    data: {
                      name: "MawPrint Project Showcase",
                      description: "Custom sublimation printing project showcase",
                      creator: {
                        "@type": "Organization",
                        "name": "MawPrint"
                      }
                    }
                  }}
                />
                <Header
                  activeSection={activeSection}
                  isProjectPage={true}
                />
                <main>

                </main>
                <Footer />
              </>
            } />
            <Route path="/" element={
              <>
                <SEO
                  title="MawPrint - Premium Sublimation Printing Solutions | Banners, Flags & More"
                  description="Transform your ideas into stunning visual experiences with MawPrint's cutting-edge sublimation printing technology. Specializing in banners, flags, and custom printing solutions with 500+ projects completed and 98% client satisfaction."
                  keywords="sublimation printing, sublimation banner, sublimation flag, flags printing, banner printing, dtf t shirt, fabric banner, flags, custom banners, printing services, digital printing, custom flags, promotional materials, printing company, sublimation technology, visual branding"
                  pageName="Homepage"
                  structuredData={{
                    type: "LocalBusiness",
                    data: {
                      name: "MawPrint",
                      description: "Premium sublimation printing solutions",
                      url: "https://mawprint.vercel.app",
                      telephone: "+1-XXX-XXX-XXXX",
                      telephone: "+94-772-223-230",
                      address: {
                        "@type": "PostalAddress",
                        "addressCountry": "SL"
                      },
                      serviceType: "Printing Services",
                      areaServed: "Worldwide"
                    }
                  }}
                />
                <Header
                  activeSection={activeSection}
                />
                <main>
                  <Hero />
                  <AutoScrollImages />
                  <About />
                  <Services />
                  <Education />
                  <Contact />
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
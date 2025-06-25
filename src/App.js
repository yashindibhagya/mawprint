import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Services from './components/Services';
import Education from './components/Education';

function App() {
  // We're only keeping track of active section now, removed darkMode state
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
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
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* Primary gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-50 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-red-100 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        </div>

        {/* Main content wrapper with consistent max-width */}
        <div className="relative z-10">
          <Routes>
            <Route path="/project/:id" element={
              <div>
                <Header
                  activeSection={activeSection}
                  isProjectPage={true}
                />
                <ProjectDetails />
                <Footer />
              </div>
            } />
            <Route path="/" element={
              <div>
                <Header
                  activeSection={activeSection}
                />
                <Hero />
                <About />
                <Services />
                <Education />
                <Skills />
                <Contact />
                <Footer />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
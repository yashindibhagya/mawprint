import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import data from data file
import { projectsData, mockScreens } from '../data/projectsData';

// Lightbox component for displaying images in fullscreen
const ImageLightbox = ({ image, title, isOpen, onClose }) => {
    // Prevent scrolling when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="relative w-full max-w-5xl mx-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative"
                >
                    <img
                        src={image}
                        alt={title || "Image"}
                        className="max-h-[90vh] mx-auto object-contain"
                    />
                    {title && (
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <div className="inline-block px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full">
                                {title}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hoverStates, setHoverStates] = useState({
        category: false,
        client: false,
        startDate: false,
        softwares: false
    });

    // State for lightbox
    const [lightbox, setLightbox] = useState({
        isOpen: false,
        image: null,
        title: null
    });

    // Make sure we always start at the top of the page when viewing details
    useEffect(() => {
        // This will ensure we're at the top of the page
        window.scrollTo(0, 0);

        // We must use a timeout to ensure the scroll happens after the page renders
        const topScrollTimeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);

        return () => clearTimeout(topScrollTimeout);
    }, [id]);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchProject = () => {
            setLoading(true);
            // Find the project with the matching ID
            const foundProject = projectsData.find(p => p.id === parseInt(id));

            // Update the tools array to include specific software names for proper icon rendering
            if (foundProject) {
                // Make sure the tools are properly named for icon rendering
                foundProject.tools = foundProject.tools.map(tool => {
                    if (tool.toLowerCase().includes('figma')) return 'Figma';
                    if (tool.toLowerCase().includes('photoshop')) return 'Adobe Photoshop';
                    return tool;
                });
            }

            // Simulate network delay
            setTimeout(() => {
                setProject(foundProject);
                setLoading(false);
            }, 300);
        };

        fetchProject();
    }, [id]);

    // Function to handle hover states
    const handleHover = (section, isHovered) => {
        setHoverStates(prev => ({
            ...prev,
            [section]: isHovered
        }));
    };

    // Function to open the lightbox
    const openLightbox = (image, title) => {
        setLightbox({
            isOpen: true,
            image,
            title
        });
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        setLightbox({
            ...lightbox,
            isOpen: false
        });
    };

    // Function to handle "Back to Projects" navigation
    const handleBackToProjects = () => {
        // Get the stored position if available
        const projectsSection = sessionStorage.getItem('projectsSectionPosition');

        // Navigate back to main page
        navigate('/');

        // Use setTimeout to ensure navigation completes first
        setTimeout(() => {
            // Try to find the projects section
            const workSection = document.getElementById('work');

            if (workSection && projectsSection) {
                // Scroll to the exact position the user was at in the projects section
                window.scrollTo({
                    top: parseInt(projectsSection),
                    behavior: 'auto' // Use auto for immediate positioning
                });
            } else if (workSection) {
                // If we don't have a saved position, just scroll to the work section
                workSection.scrollIntoView({ behavior: 'auto' });
            }
        }, 150); // Give the page a bit more time to load
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black">
                <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-l-transparent border-lime-500 rounded-full animate-spin"></div>
                    <div className="absolute top-2 left-2 w-16 h-16 border-4 border-t-transparent border-l-transparent border-purple-500 rounded-full animate-spin-slow"></div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-black text-white">
                <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={handleBackToProjects}
                    className="px-6 py-3 bg-lime-500 text-black rounded-full hover:shadow-lg hover:bg-lime-400 transition-all duration-300"
                >
                    Back to Projects
                </button>
            </div>
        );
    }

    return (
        <div className="bg-black text-white overflow-hidden relative">
            {/* Lightbox component - it will only show when lightbox.isOpen is true */}
            <AnimatePresence>
                {lightbox.isOpen && (
                    <ImageLightbox
                        image={lightbox.image}
                        title={lightbox.title}
                        isOpen={lightbox.isOpen}
                        onClose={closeLightbox}
                    />
                )}
            </AnimatePresence>

            {/* Starry background effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="stars absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(2px 2px at 40px 60px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 100px 150px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 200px 80px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 300px 250px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 400px 100px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 500px 200px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 300px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 150px 400px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 250px 500px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 350px 50px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 450px 350px, #fff, rgba(0,0,0,0))',
                    backgroundSize: '550px 550px'
                }}></div>
            </div>

            {/* Back Button - Aligned with container instead of fixed left position */}
            <div className="container mx-auto px-4 relative z-40 mt-24 mb-8">
                <button
                    onClick={handleBackToProjects}
                    className="flex items-center space-x-2 px-4 py-2 backdrop-blur-md text-lime-500 border border-lime-500 rounded-full hover:bg-lime-500 hover:text-black transition-all duration-300 shadow-lg shadow-lime-500/20 group"
                >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>BACK</span>
                </button>
            </div>

            {/* Header Section - Reduced vertical spacing */}
            <div className="relative pt-4 pb-8 px-4 overflow-hidden">
                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <div className="text-center mb-3">
                            <div className="text-sm uppercase tracking-widest text-gray-400">{project.category}</div>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold text-lime-500 my-4 tracking-wider">
                            {project.title}
                        </h1>
                        <div className="text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto">
                            {project.description}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Project Info Section - Evenly spaced columns with proper alignment */}
            <div className="relative py-8 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="container mx-auto max-w-6xl border-y border-gray-800 py-8"
                >
                    <div className="grid grid-cols-3 gap-0">
                        <div
                            className="text-center"
                            onMouseEnter={() => handleHover('category', true)}
                            onMouseLeave={() => handleHover('category', false)}
                        >
                            <div className="uppercase text-gray-400 font-bold mb-3 tracking-wider">CATEGORY</div>
                            <div className={`text-lg font-medium transition-colors duration-300 ${hoverStates.category ? 'text-lime-500' : 'text-white'}`}>
                                UI/UX DESIGN | WEB DESIGN
                            </div>
                        </div>

                        <div
                            className="text-center"
                            onMouseEnter={() => handleHover('startDate', true)}
                            onMouseLeave={() => handleHover('startDate', false)}
                        >
                            <div className="uppercase text-gray-400 font-bold mb-3 tracking-wider">START DATE</div>
                            <div className={`text-lg font-medium transition-colors duration-300 ${hoverStates.startDate ? 'text-lime-500' : 'text-white'}`}>
                                {project.duration}
                            </div>
                        </div>

                        <div
                            className="text-center"
                            onMouseEnter={() => handleHover('softwares', true)}
                            onMouseLeave={() => handleHover('softwares', false)}
                        >
                            <div className="uppercase text-gray-400 font-bold mb-3 tracking-wider">SOFTWARES</div>
                            <div className={`flex justify-center gap-4 transition-all duration-300 ${hoverStates.softwares ? 'scale-110' : ''}`}>
                                {project.tools.includes("Figma") && (
                                    <div className="w-10 h-10 rounded bg-transparent flex items-center justify-center">
                                        <svg viewBox="0 0 38 57" className="w-7 h-7">
                                            <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
                                            <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
                                            <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
                                            <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
                                            <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
                                        </svg>
                                    </div>
                                )}
                                {project.tools.includes("Adobe Photoshop") && (
                                    <div className="w-10 h-10 rounded bg-transparent flex items-center justify-center">
                                        <svg viewBox="0 0 240 234" className="w-7 h-7">
                                            <path fill="#001E36" d="M42.5 0h155C221 0 240 19 240 42.5v149c0 23.5-19 42.5-42.5 42.5h-155C19 234 0 215 0 191.5v-149C0 19 19 0 42.5 0z" />
                                            <path fill="#31A8FF" d="M54 164.1V61.8c0-.7.3-1.1 1-1.1 1.7 0 3.3 0 5.6-.1 2.4-.1 4.9-.1 7.6-.1 2.7 0 5.6 0 8.7.1 3.1.1 6 .3 8.5.6 2.5.3 4.8.8 6.8 1.5 2 .7 3.7 1.7 5.1 2.9 1.4 1.2 2.6 2.7 3.5 4.6.9 1.9 1.3 4 1.3 6.5 0 2.8-.5 5.1-1.6 7-.1.3-.3.5-.4.7-.1.2-.3.4-.4.6-.1.2-.3.4-.5.6-.2.2-.3.5-.5.7-1.9 2.2-4.2 3.8-6.7 4.7-2.6.9-5.5 1.4-8.6 1.4-1.6 0-3 0-4.2-.1-1.2-.1-2.3-.1-3.2-.2-.9-.1-1.7-.1-2.4-.2-.7 0-1.4-.1-2.1-.1v33.9c0 .8-.3 1.2-1 1.2h-15c-.8 0-1.2-.4-1.2-1.2zm16.4-84.3v24.3c.6.1 1.2.1 1.7.1.5 0 1.1.1 1.8.1 2.1 0 4.1-.2 6.1-.7 2-.5 3.8-1.3 5.3-2.5 1.5-1.1 2.7-2.6 3.6-4.4.9-1.8 1.4-4.1 1.4-6.8 0-2-.3-3.8-1-5.4-.7-1.6-1.6-2.9-2.8-3.9-1.2-1.1-2.7-1.8-4.3-2.4-1.7-.5-3.5-.8-5.5-.8-1.8 0-3.4.1-4.9.2-1.5.1-2.7.3-3.7.5-1 .3-1.8.5-2.4.8-.5.3-.9.5-1.1.7-.3.2-.5.5-.7.9-.2.4-.3.9-.3 1.6-.2-.1-.2.4-.2.9zm77.7 48.8c-3.7 5.2-8.4 9.1-14.1 11.7-5.7 2.6-12.1 3.9-19.1 3.9-3.3 0-6.6-.3-9.9-.8-3.3-.5-6.5-1.5-9.7-2.9-3.2-1.4-6.2-3.2-9-5.5-2.8-2.3-5.3-5.3-7.5-8.8-2.2-3.6-3.9-7.6-5.2-12.2-1.3-4.6-1.9-9.8-1.9-15.5 0-5.6.6-10.8 1.8-15.5 1.2-4.8 2.9-8.9 5-12.5 2.2-3.6 4.7-6.7 7.6-9.2 2.9-2.5 6-4.6 9.3-6.1 3.4-1.5 6.9-2.6 10.6-3.2 3.7-.6 7.2-.9 10.6-.9 5.6 0 10.6.7 15.1 2 4.5 1.4 8.3 3.3 11.5 5.9 3.2 2.6 5.7 5.8 7.6 9.5 1.8 3.7 2.7 7.9 2.7 12.5 0 2.5-.2 4.7-.7 6.6-.5 1.9-1.2 3.5-2.2 4.8-1 1.3-2.1 2.3-3.4 3-1.3.7-2.8 1-4.4 1h-38.8c-.1 5.9 1.2 10.2 3.9 13 2.7 2.7 6.8 4.1 12.1 4.1 3.1 0 5.8-.5 8.2-1.6 2.4-1.1 4.4-2.4 6.1-4.1.6-.7 1.2-1 1.8-1 .8 0 1.6.4 2.4 1.2l7.5 7.4c.6.5.9 1.1.9 1.7.1.7-.3 1.4-1 2.1zm-12.1-34.3c.9-1.4 1.4-3.3 1.4-5.8 0-3.3-.9-6-2.8-8.1-1.9-2.1-4.7-3.1-8.4-3.1-4.9 0-8.4 1.4-10.6 4.3-2.2 2.9-3.5 6.5-3.8 10.8h23c.4-.1.8-.5 1.2-1.3z" />
                                        </svg>
                                    </div>
                                )}
                                {project.tools.includes("Illustrator") && (
                                    <div className="w-10 h-10 rounded bg-transparent flex items-center justify-center">
                                        <svg viewBox="0 0 240 234" className="w-7 h-7">
                                            <path fill="#330000" d="M42.5 0h155C221 0 240 19 240 42.5v149c0 23.5-19 42.5-42.5 42.5h-155C19 234 0 215 0 191.5v-149C0 19 19 0 42.5 0z" />
                                            <path fill="#FF9A00" d="M116 140H78.8V58H116v82zm36.3 0l-20.2-33.8L112 140h40.3zm-21.6-47c0-11.2 5.6-17.8 15.6-17.8 9.1 0 13.5 6.9 13.5 17.8 0 12.1-5.3 18-14.2 18-8.9 0-15-6.8-15-18zM155 58h34.3v82H155V58z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Project Showcase - Smaller Size and reduced vertical spacing */}
            <div className="relative py-8 px-4 overflow-hidden">
                {/* Animated network lines in background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg width="100%" height="100%" className="absolute inset-0">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff41c8" />
                                <stop offset="100%" stopColor="#21d4fd" />
                            </linearGradient>
                        </defs>
                        <g stroke="url(#grad1)" strokeWidth="0.5">
                            <motion.path
                                d="M0,50 Q250,150 500,50 T1000,50"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M0,150 Q250,50 500,150 T1000,150"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M-100,100 L1100,100"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                            />
                        </g>
                    </svg>
                </div>

                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative rounded-xl overflow-hidden max-w-3xl mx-auto"
                    >
                        <img
                            src={project.mockupImage || project.image}
                            alt={project.title}
                            className="w-full h-auto rounded-xl shadow-2xl shadow-purple-500/10 cursor-pointer"
                            onClick={() => openLightbox(project.mockupImage || project.image, project.title)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </motion.div>
                </div>
            </div>

            {/* Brand Overview Section - Reduced vertical spacing */}
            <div className="relative py-8 px-4 border-t border-gray-800">
                <div className="container mx-auto max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-lime-500 mb-4 hover:text-white transition-colors duration-300">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            VISIT WEBSITE
                        </a>
                        <h2 className="text-3xl md:text-4xl font-bold text-lime-500 mb-4">
                            BRAND OVERVIEW
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed max-w-4xl mx-auto">
                            {project.brandOverview}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Challenge & Solution - Reduced vertical spacing */}
            <div className="relative py-8 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[100px] rounded-full"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl font-bold text-white border-l-4 border-lime-500 pl-4">THE CHALLENGE</h2>
                            <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl font-bold text-white border-l-4 border-lime-500 pl-4">THE SOLUTION</h2>
                            <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Section - Reduced vertical spacing */}
            <div className="relative py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl font-bold text-white border-l-4 border-lime-500 pl-4 mb-6">KEY FEATURES</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                    ease: [0.25, 0.1, 0.25, 1.0]
                                }}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 0 20px rgba(132, 204, 22, 0.2)"
                                }}
                                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-5 hover:border-lime-500/50 transition-all duration-300"
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="w-9 h-9 rounded-full bg-lime-500 flex items-center justify-center text-black font-bold">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <p className="text-gray-300">{feature}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* UI Screens Section - Proportional sizing based on width */}
            <div className="relative py-8 px-4">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl font-bold text-lime-500 mb-6 text-center">
                            PAGES
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                        {project.uiScreens.map((screen, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                className="relative flex flex-col"
                            >
                                <div
                                    className="rounded-xl overflow-hidden border border-purple-500/20 hover:border-lime-500/50 transition-all duration-300 shadow-lg shadow-purple-500/5 hover:shadow-lime-500/15 cursor-pointer bg-black/40 backdrop-blur-sm p-1"
                                    onClick={() => openLightbox(screen.image)}
                                >
                                    {/* Maintaining mobile device aspect ratio */}
                                    <div className="w-full" style={{ aspectRatio: '0.5' }}>
                                        <img
                                            src={screen.image}
                                            alt={screen.title}
                                            className="w-full h-full object-contain"
                                            style={{
                                                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Conclusion Section - Reduced vertical spacing */}
            <div className="relative py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold text-lime-500 mb-6 inline-block relative">
                            PROJECT CONCLUSION
                            <motion.span
                                className="absolute bottom-0 left-0 h-0.5 bg-lime-500/50"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            ></motion.span>
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
                            {project.conclusion}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Visit Website Banner - Slight reduction in margin */}
            <div className="relative mt-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-6 bg-lime-500 text-black font-bold text-center text-xl uppercase tracking-widest hover:bg-lime-400 transition-colors duration-300 relative overflow-hidden group"
                    >
                        <div className="flex items-center justify-center">
                            <span className="mx-2">✧</span>
                            <span>VISIT WEBSITE</span>
                            <span className="mx-2">✧</span>
                            <span>VISIT WEBSITE</span>
                            <span className="mx-2">✧</span>
                            <span>VISIT WEBSITE</span>
                            <span className="mx-2">✧</span>
                            <span>VISIT WEBSITE</span>
                            <span className="mx-2">✧</span>
                        </div>

                        {/* Animated hover effect */}
                        <motion.div
                            className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetails;
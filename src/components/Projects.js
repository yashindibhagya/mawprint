import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import your image
import nikeImage from '../assets/img/nike.png';
import bakeryImage from '../assets/img/bakery.png';
import doctorImage from '../assets/img/doctor.png';
import forestImage from '../assets/img/forest.png';
import plantImage from '../assets/img/plant.png';
import dashboardImage from '../assets/img/dashboard.png';
import learningImage from '../assets/img/e-learning.png';
import hotelImage from '../assets/img/hotel.png';
import natureImage from '../assets/img/nature.png';
import waterImage from '../assets/img/water.png';
import taskImage from '../assets/img/task.png';
import burgerImage from '../assets/img/burger.png';
import gestureImage from '../assets/img/gesture.png';


const Projects = () => {
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();

    // Project data with unique IDs and updated for portfolio style
    const projects = [
        {
            id: 1,
            title: "NEXTURNA",
            subtitle: "Future-Forward Software Beyond Limits",
            category: "UI/UX Design",
            type: "uiux",
            image: nikeImage,
            description: "A software company website with modern design and interactive elements."
        },
        {
            id: 2,
            title: "VIVAYAM",
            subtitle: "Traditional Dhotis",
            category: "E-Commerce",
            type: "uiux",
            image: burgerImage,
            description: "E-commerce platform for traditional clothing with a contemporary interface."
        },
        {
            id: 3,
            title: "STYLADE",
            subtitle: "Curate Your Fashion Styles",
            category: "Mobile App",
            type: "uiux",
            image: doctorImage,
            description: "Fashion curation mobile application with personalized recommendations."
        },
        {
            id: 4,
            title: "PARICHA",
            subtitle: "Online Shopping Platform",
            category: "E-Commerce",
            type: "uiux",
            image: bakeryImage,
            description: "Full-featured e-commerce platform with advanced filtering and search."
        },
        {
            id: 5,
            title: "EDWINN",
            subtitle: "Designs by Edwinn",
            category: "Portfolio",
            type: "uiux",
            image: plantImage,
            description: "Designer portfolio website showcasing creative work and services."
        },
        {
            id: 6,
            title: "DIPESHA",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "mobile",
            image: learningImage,
            description: "Home appliances e-commerce store with modern user interface."
        },
        {
            id: 7,
            title: "DIPESHA",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "mobile",
            image: taskImage,
            description: "Home appliances e-commerce store with modern user interface."
        },
        {
            id: 8,
            title: "GESTURECONNECT",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "mobile",
            image: gestureImage,
            description: "Home appliances e-commerce store with modern user interface."
        },
        {
            id: 9,
            title: "DIPESHA",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: natureImage,
            description: "Home appliances e-commerce store with modern user interface."
        },
        {
            id: 10,
            title: "DIPESHA",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: dashboardImage,
            description: "Home appliances e-commerce store with modern user interface."
        },
        {
            id: 11,
            title: "DIPESHA",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: hotelImage,
            description: "Home appliances e-commerce store with modern user interface."
        },
        {
            id: 12,
            title: "DIPESHA",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: waterImage,
            description: "Home appliances e-commerce store with modern user interface."
        },
        {
            id: 12,
            title: "DIPESHA",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: forestImage,
            description: "Home appliances e-commerce store with modern user interface."
        },
    ];

    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(project => project.type === activeTab);

    const handleProjectClick = (projectId) => {
        // Save current scroll position before navigating
        sessionStorage.setItem('scrollPosition', window.pageYOffset.toString());
        // Save active tab to restore it when coming back
        sessionStorage.setItem('activeTab', activeTab);

        // Navigate to project details
        navigate(`/project/${projectId}`);
    };

    // Function to handle image errors
    const handleImageError = (e) => {
        console.log("Image failed to load");
        e.target.src = "/assets/img/placeholder.png"; // Fallback image
    };

    return (
        <section id="work" className="py-12 sm:py-16 md:py-20 transition-colors duration-300 ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Responsive Title Section */}
                <div className="mb-12 sm:mb-16 md:mb-20 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 bg-gradient-to-l from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] bg-clip-text text-transparent">
                        Projects
                    </h2>
                    <p className="mt-2 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base text-white opacity-80">
                        Showcasing my latest designs and development projects with a focus on user experience,
                        visual aesthetics, and functional excellence.
                    </p>
                </div>

                {/* Responsive Tab Navigation */}
                <div className="flex justify-center mb-12 sm:mb-16">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 sm:px-8 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${activeTab === 'all'
                                ? 'text-white bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa]'
                                : 'text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab('uiux')}
                            className={`px-6 sm:px-8 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${activeTab === 'uiux'
                                ? 'text-white bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa]'
                                : 'text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            UI/UX Designs
                        </button>
                        <button
                            onClick={() => setActiveTab('webdesign')}
                            className={`px-6 sm:px-8 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${activeTab === 'webdesign'
                                ? 'text-white bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa]'
                                : 'text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            Web Design
                        </button>
                        <button
                            onClick={() => setActiveTab('mobile')}
                            className={`px-6 sm:px-8 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${activeTab === 'mobile'
                                ? 'text-white bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa]'
                                : 'text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            Mobile Apps
                        </button>
                    </div>
                </div>

                {/* Check if there are projects to display */}
                {filteredProjects.length > 0 ? (
                    /* Portfolio-style Projects Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-4 max-w-6xl mx-auto">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[4/3]"
                                onClick={() => handleProjectClick(project.id)}
                            >
                                {/* Simple Image Card */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    onError={handleImageError}
                                />

                                {/* Title overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 z-30 bg-gradient-to-t from-black/90 to-transparent">
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mb-1 leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-white/80 mb-2">
                                        {project.subtitle}
                                    </p>
                                    <div className="inline-block px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs text-white">
                                        {project.category}
                                    </div>
                                </div>

                                {/* Hover effect with solid button */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-40">
                                    <span className="px-8 py-3 bg-white rounded-full text-sm font-bold text-gray-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                                        View Project
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* No Projects Yet Message */
                    <div className="max-w-4xl mx-auto text-center py-20 px-4">
                        <h3 className="text-1xl sm:text-2xl font-bold text-white mb-4">No Projects Yet</h3>
                        <p className="text-gray-400 max-w-lg mx-auto text-0xl sm:text-1xl">
                            There are no projects available in this category at the moment. Check back soon as new projects are being added regularly.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
import React from "react";
import { motion } from "framer-motion";

const steps = [
    {
        image: "/assets/img/1.jpg",
        title: "Lower Prices, Higher Value",
        description: "We offer competitive rates without compromising on print quality — perfect for bulk or custom orders."
    },
    {
        image: "/assets/img/2.jpg",
        title: "Fast & Reliable Delivery",
        description: "Your orders are processed quickly and delivered on time, every time — no delays, no hassle."
    },
    {
        image: "/assets/img/3.jpg",
        title: "Satisfaction Guaranteed",
        description: "We stand by our work. If you're not happy, we'll make it right — your satisfaction is our priority."
    },
    {
        image: "/assets/img/4.jpg",
        title: "Vivid, Long-Lasting Prints",
        description: "We use high-grade sublimation techniques that ensure your prints stay vibrant and durable over time."
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: i * 0.12
        }
    }),
    hover: { scale: 1.05, transition: { duration: 0.3 } }
};

const EducationGrid = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-black rounded-full mb-6 border border-red-500/20">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        <span className="text-sm text-white font-semibold uppercase tracking-wide">Let's Get Printing</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                        Reasons to get {" "}
                        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                            printing started
                        </span>
                        <br />
                        with us
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Our dedicated staff makes it easy for you to create a unique design that will
                        impress your clients and make you stand out from the crowd.
                    </p>
                </div>
                {/* Animated Card Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-2xl shadow-lg p-6 w-full flex flex-col items-center group cursor-pointer transition-all duration-300"
                            custom={i}
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <img
                                src={step.image}
                                alt={step.title}
                                className="rounded-xl mb-4 w-full h-40 object-cover"
                            />
                            <h3 className="text-lg font-bold text-black mb-2 group-hover:text-red-600 transition-colors duration-300 text-center">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-center">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default EducationGrid;
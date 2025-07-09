import React from "react";
import { motion } from "framer-motion";

const steps = [
    {
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        title: "Fast Ordering Now",
        description: "Order your prints quickly and easily with our streamlined process."
    },
    {
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        title: "Online Designing",
        description: "Design online with our intuitive tools and get instant previews."
    },
    {
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        title: "Express Shipping",
        description: "Get your prints delivered fast with our express shipping options."
    },
    {
        image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
        title: "Satisfaction Guaranteed",
        description: "We guarantee your satisfaction with every order, every time."
    },
    {
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        title: "Free Delivery",
        description: "Enjoy free delivery on qualifying orders."
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
                    <span className="text-sm text-red-600 font-semibold tracking-wide uppercase">
                        Let's Get Printing
                    </span>
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
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
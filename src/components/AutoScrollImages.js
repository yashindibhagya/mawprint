import React from 'react';

const images = [
    "/assets/img/flag.png",
    "/assets/img/maw full.png",
    "/assets/img/maw.png",
    "/assets/img/printer.jpg",
    "/assets/img/Remove.png",
    "/assets/img/Portfolio.png",
    "/assets/img/pic.png",
    "/assets/img/_1___1_-r.png",
];

// Duplicate images for seamless looping
const allImages = [...images, ...images];

function AutoScrollImages() {
    return (
        <section className="w-full py-8 md:py-12 bg-white">
            <div className="overflow-x-hidden">
                <div
                    className="flex gap-8 md:gap-12 items-center whitespace-nowrap animate-auto-scroll"
                    style={{
                        width: 'max-content',
                        animation: 'auto-scroll 32s linear infinite',
                    }}
                >
                    {allImages.map((src, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 rounded-2xl shadow-lg bg-white"
                            style={{ width: 340, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <img
                                src={src}
                                alt="Showcase"
                                className="object-contain w-full h-full rounded-2xl select-none pointer-events-none"
                                draggable="false"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes auto-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}

export default AutoScrollImages; 
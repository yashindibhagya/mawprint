import React from 'react';

const images = [
    "/assets/img/1.jpg",
    "/assets/img/2.jpg",
    "/assets/img/4.jpg",
    "/assets/img/5.png",
    "/assets/img/6.png",
    "/assets/img/7.jpg",
    "/assets/img/8.png",
    "/assets/img/9.png",
    "/assets/img/10.png",
    "/assets/img/11.webp",
    "/assets/img/12.png",
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
                                className="object-cover w-full h-full rounded-2xl select-none pointer-events-none"
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
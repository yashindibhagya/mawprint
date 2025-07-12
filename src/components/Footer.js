import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
                {/* Brand Column */}
                <div className="space-y-4">
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/img/maw.png`}
                        alt="Printify Logo"
                        className="h-12 w-auto"
                    />
                    <p className="text-sm text-gray-600 leading-relaxed">
                        High-quality sublimation & fabric printing solutions to bring your brand to life.
                    </p>
                </div>

                {/* Company Links */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Company</h4>
                    <ul className="text-sm space-y-2">
                        <li><button type="button" className="hover:text-red-600 transition">About Us</button></li>
                        <li><button type="button" className="hover:text-red-600 transition">Services</button></li>
                        <li><button type="button" className="hover:text-red-600 transition">Portfolio</button></li>
                        <li><button type="button" className="hover:text-red-600 transition">Contact</button></li>
                    </ul>
                </div>

                {/* Services Links */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Services</h4>
                    <ul className="text-sm space-y-2">
                        <li><button type="button" className="hover:text-red-600 transition">Banner Printing</button></li>
                        <li><button type="button" className="hover:text-red-600 transition">Flag Printing</button></li>
                        <li><button type="button" className="hover:text-red-600 transition">T-Shirt Transfers</button></li>
                        <li><button type="button" className="hover:text-red-600 transition">Marketing</button></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Printify. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

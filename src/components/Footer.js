import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Quick links
    const links = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#work' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' }
    ];

    // Social media icons
    const socials = [
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/in/yashindibhagya',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        },
        {
            name: 'GitHub',
            href: 'https://github.com/yashindibhagya',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
            )
        },
        {
            name: 'Behance',
            href: 'https://behance.net/yashindibhagya1',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                </svg>
            )
        },
        {
            name: 'WhatsApp',
            href: 'https://wa.me/94714294531',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            )
        }
    ];

    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* Subtle gradient background shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-900/10 to-fuchsia-900/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-900/10 to-indigo-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            {/* Subtle divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">YB</span>
                            </div>
                            <h2 className="text-2xl font-extrabold tracking-tight">YASHINDI</h2>
                        </div>

                        <p className="text-gray-400 mb-6 max-w-md">
                            Crafting intuitive digital experiences through innovative UI/UX design and mobile app development. Let's create something amazing together.
                        </p>

                        {/* Social links */}
                        <div className="flex space-x-4">
                            {socials.map(social => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-300 group"
                                    aria-label={social.name}
                                >
                                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links section - Now properly aligned */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold mb-6 border-b border-gray-800 pb-2">Quick Links</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
                            {links.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                                >
                                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#ff58d8] to-[#4f4cfa] rounded-full mr-2"></span>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-200 text-sm mb-4 sm:mb-0">
                        &copy; {currentYear} Yashindi. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-200">
                        {/* Fixed: Changed from <a href="#"> to <Link to="/privacy-policy"> 
                        <Link
                            to="/privacy-policy"
                            className="hover:text-white transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>

                        {/* Fixed: Changed from <a href="#"> to <Link to="/terms"> 
                        <Link
                            to="/terms"
                            className="hover:text-white transition-colors duration-200"
                        >
                            Terms of Service
                        </Link>*/}

                        <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                            <span>Available for Work</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient line */}
            <div className="w-full h-1 bg-gradient-to-r from-[#ff58d8] via-[#bc50ff] to-[#4f4cfa]"></div>
        </footer>
    );
};

export default Footer;
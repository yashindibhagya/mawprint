import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser'; // Install with: npm install @emailjs/browser

const Contact = () => {
    const form = useRef();
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Form status states
    const [formStatus, setFormStatus] = useState({
        status: 'idle', // idle, validating, submitting, success, error
        message: ''
    });

    // Typing animation state
    const [typingIndex, setTypingIndex] = useState(0);
    const typingText = "Let's build something amazing together";

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init("VqmLO9PXzRgCoE7z1"); // Your public key
    }, []);

    // Social links with modern technical styling
    const socialLinks = [
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/yashindibhagya",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
            gradient: "from-blue-500 to-blue-600"
        },
        {
            name: "GitHub",
            url: "https://github.com/yashindibhagya",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
            ),
            gradient: "from-gray-700 to-gray-900"
        },
        {
            name: "Behance",
            url: "https://behance.net/yashindibhagya1",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                </svg>
            ),
            gradient: "from-blue-600 to-indigo-600"
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/94714294531",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            gradient: "from-green-500 to-green-600"
        }
    ];

    // Email validation function
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Map the EmailJS field names to our form state
        const fieldMap = {
            from_name: 'name',
            from_email: 'email',
            subject: 'subject',
            message: 'message'
        };

        setFormData({
            ...formData,
            [fieldMap[name] || name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submission started');

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setFormStatus({
                status: 'error',
                message: 'Please fill in all fields'
            });
            return;
        }

        if (!validateEmail(formData.email)) {
            setFormStatus({
                status: 'error',
                message: 'Please enter a valid email address'
            });
            return;
        }

        // Submit form
        setFormStatus({
            status: 'submitting',
            message: 'Sending message...'
        });

        try {
            console.log('Preparing to send email...');

            // Prepare email parameters
            const templateParams = {
                to_email: 'yashindibhagya@gmail.com',
                from_name: formData.name,
                reply_to: formData.email,
                subject: formData.subject,
                message: formData.message
            };

            console.log('Sending with params:', templateParams);

            // Send email using EmailJS
            const result = await emailjs.send(
                'service_lx3foyj',
                'template_4qyx2dj',
                templateParams,
                'VqmLO9PXzRgCoE7z1'
            );

            console.log('EmailJS response:', result);

            // Success handling
            setFormStatus({
                status: 'success',
                message: 'Message sent successfully!'
            });

            // Reset form after delay
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setFormStatus({
                    status: 'idle',
                    message: ''
                });
            }, 5000);
        } catch (error) {
            console.error('Detailed error:', error);

            // Error handling
            setFormStatus({
                status: 'error',
                message: error.message || 'Failed to send message. Please try again later.'
            });
        }
    };

    // Typing effect
    useEffect(() => {
        if (typingIndex < typingText.length) {
            const timer = setTimeout(() => {
                setTypingIndex(typingIndex + 1);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [typingIndex, typingText]);

    // Render contact information card with technical style
    const ContactCard = ({ icon, title, value, accent }) => (
        <div className="flex items-center p-6 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 transition-all hover:border-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8B5CF6]/5 duration-300">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl mr-4 bg-gradient-to-br ${accent}`}>
                {icon}
            </div>
            <div>
                <div className="text-xs uppercase tracking-wider text-indigo-300 mb-1">{title}</div>
                <div className="text-white font-medium">{value}</div>
            </div>
        </div>
    );

    return (
        <section id="contact" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none">
                {/* Grid pattern */}
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-5xl mx-auto">
                    {/* Section header with typing effect */}
                    <div className="text-center mb-16">
                        <div className="inline-block text-sm py-1 px-3 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-md border border-purple-500/20 text-purple-300 mb-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse mr-2"></div>
                                <span>Contact.connect()</span>
                            </div>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-4">
                            Let's Connect
                        </h2>

                        <div className="text-indigo-300 text-lg">
                            <span>{typingText.substring(0, typingIndex)}</span>
                            <span className="inline-block w-0.5 h-5 bg-indigo-400 ml-0.5 animate-blink"></span>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Contact info section */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="space-y-6">
                                <ContactCard
                                    icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>}
                                    title="Email"
                                    value="yashindibhagya@gmail.com"
                                    accent="from-indigo-500 to-purple-600"
                                />

                                <ContactCard
                                    icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>}
                                    title="Phone"
                                    value="+94 71 429 4531"
                                    accent="from-blue-500 to-cyan-500"
                                />

                                <ContactCard
                                    icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>}
                                    title="Location"
                                    value="Colombo, Sri Lanka"
                                    accent="from-pink-500 to-rose-500"
                                />
                            </div>

                            {/* Social links */}
                            <div className="pt-6 border-t border-white/10">
                                <h3 className="text-white text-lg font-medium mb-4">Find me on</h3>
                                <div className="flex flex-wrap gap-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group"
                                        >
                                            <div className={`p-3 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 transition-all duration-300 
                                            hover:bg-gradient-to-br ${social.gradient} hover:border-white/0 hover:scale-105 hover:shadow-lg`}>
                                                <div className="text-white/70 group-hover:text-white transition-colors">
                                                    {social.icon}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                {/* Status indicator */}
                                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-500/20">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></div>
                                        <div className="text-xs text-emerald-400 font-mono">Status: <span className="text-emerald-300">Available for work</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact form */}
                        <div className="lg:col-span-7">
                            <div className="p-1 rounded-2xl bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50">
                                <div className="bg-[#0F172A]/95 backdrop-blur-xl p-6 sm:p-8 rounded-xl">
                                    <div className="flex items-center mb-6">
                                        <div className="h-8 flex items-center px-3 rounded-md bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 9L12 12.5L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            <span className="font-mono">new Message();</span>
                                        </div>
                                    </div>

                                    {formStatus.status === 'success' ? (
                                        <div className="flex flex-col items-center justify-center py-10 text-center">
                                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500/20 text-green-400 mb-4">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                                            <p className="text-indigo-300 mb-6">Thanks for reaching out. I'll get back to you shortly.</p>
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm font-mono">
                                                <span className="text-green-400">200 OK</span> · Message delivered successfully
                                            </div>
                                        </div>
                                    ) : (
                                        <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-xs text-indigo-300 mb-2 font-medium">
                                                        <span className="font-mono">NAME</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="from_name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                                                        placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                                                        placeholder="John Doe"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs text-indigo-300 mb-2 font-medium">
                                                        <span className="font-mono">EMAIL</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="from_email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                                                        placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                                                        placeholder="john@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs text-indigo-300 mb-2 font-medium">
                                                    <span className="font-mono">SUBJECT</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                                                    placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                                                    placeholder="Project Inquiry"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs text-indigo-300 mb-2 font-medium">
                                                    <span className="font-mono">MESSAGE</span>
                                                </label>
                                                <div className="relative">
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        rows={5}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                                                        placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all resize-none"
                                                        placeholder="Your message here..."
                                                        required
                                                    ></textarea>

                                                    <div className="absolute right-3 bottom-3 text-xs text-indigo-400/70 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded">
                                                        {formData.message.length} chars
                                                    </div>
                                                </div>
                                            </div>

                                            {formStatus.status === 'error' && (
                                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        <span>{formStatus.message}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={formStatus.status === 'submitting'}
                                                className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium 
                                                hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg 
                                                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#0F172A] 
                                                disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                            >
                                                {formStatus.status === 'submitting' ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Sending Message...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Send Message</span>
                                                        <div className="ml-2 bg-white/20 rounded-full p-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                            </svg>
                                                        </div>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser'; // Install with: npm install @emailjs/browser
import { socialLinks, contactInfo } from '../config/socialLinks';

const Contact = () => {
    const form = useRef();
    const fileInputRef = useRef();

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // File upload state
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isDragOver, setIsDragOver] = useState(false);

    // Form status states
    const [formStatus, setFormStatus] = useState({
        status: 'idle', // idle, validating, submitting, success, error
        message: ''
    });

    // Typing animation state
    const [typingIndex, setTypingIndex] = useState(0);
    const typingText = "Let's build something amazing together";

    // Allowed file types and max size (10MB)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/x-photoshop', 'image/vnd.adobe.photoshop', '.psd', '.cdr', 'application/x-coreldraw'];
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const maxFiles = 5;

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init("VqmLO9PXzRgCoE7z1"); // Your public key
    }, []);

    // Email validation function
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // File validation function
    const validateFile = (file) => {
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        const isValidType = allowedTypes.some(type =>
            file.type === type || fileExtension === type ||
            (type === '.psd' && (fileExtension === '.psd' || file.type === 'application/x-photoshop')) ||
            (type === '.cdr' && fileExtension === '.cdr')
        );

        if (!isValidType) {
            return { valid: false, error: `File type not supported. Allowed: JPG, PNG, GIF, WebP, PDF, PSD, CDR` };
        }

        if (file.size > maxFileSize) {
            return { valid: false, error: `File size too large. Maximum: 10MB` };
        }

        return { valid: true };
    };

    // Handle file selection
    const handleFileSelect = (files) => {
        const fileArray = Array.from(files);

        if (uploadedFiles.length + fileArray.length > maxFiles) {
            setFormStatus({
                status: 'error',
                message: `Maximum ${maxFiles} files allowed`
            });
            return;
        }

        const validFiles = [];
        const errors = [];

        fileArray.forEach(file => {
            const validation = validateFile(file);
            if (validation.valid) {
                // Create file object with preview
                const fileObj = {
                    id: Date.now() + Math.random(),
                    file: file,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    preview: null
                };

                // Create preview for images
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setUploadedFiles(prev =>
                            prev.map(f => f.id === fileObj.id ? { ...f, preview: e.target.result } : f)
                        );
                    };
                    reader.readAsDataURL(file);
                }

                validFiles.push(fileObj);
            } else {
                errors.push(`${file.name}: ${validation.error}`);
            }
        });

        if (validFiles.length > 0) {
            setUploadedFiles(prev => [...prev, ...validFiles]);
        }

        if (errors.length > 0) {
            setFormStatus({
                status: 'error',
                message: errors.join('; ')
            });
        }
    };

    // Handle file input change
    const handleFileInputChange = (e) => {
        handleFileSelect(e.target.files);
    };

    // Handle drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFileSelect(e.dataTransfer.files);
    };

    // Remove file
    const removeFile = (fileId) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Convert file to base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
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
                message: formData.message,
                attachments_info: uploadedFiles.length > 0 ?
                    `\n\nAttached Files (${uploadedFiles.length}):\n${uploadedFiles.map(f => `- ${f.name} (${formatFileSize(f.size)})`).join('\n')}`
                    : ''
            };

            // Convert files to base64 and add to template params
            if (uploadedFiles.length > 0) {
                for (let i = 0; i < uploadedFiles.length; i++) {
                    const file = uploadedFiles[i];
                    try {
                        const base64 = await fileToBase64(file.file);
                        templateParams[`attachment_${i + 1}`] = base64;
                        templateParams[`attachment_${i + 1}_name`] = file.name;
                    } catch (error) {
                        console.error(`Error converting file ${file.name} to base64:`, error);
                    }
                }
            }

            console.log('Sending with params:', { ...templateParams, attachments: `${uploadedFiles.length} files` });

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
                setUploadedFiles([]);
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

    // Get file icon based on type
    const getFileIcon = (file) => {
        const extension = file.name.split('.').pop().toLowerCase();

        if (file.type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
            return (
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            );
        } else if (extension === 'pdf') {
            return (
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        } else if (extension === 'psd') {
            return (
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4" />
                </svg>
            );
        } else {
            return (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        }
    };

    // Render contact information card with technical style
    const ContactCard = ({ icon, title, value, accent }) => (
        <div className="flex items-center p-6 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 transition-all hover:border-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8B5CF6]/5 duration-300">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl mr-4 bg-gradient-to-br ${accent}`}>
                {icon}
            </div>
            <div>
                <div className="text-xs uppercase tracking-wider text-indigo-300 mb-1">{title}</div>
                <div className="text-black font-medium">{value}</div>
            </div>
        </div>
    );

    return (
        <section id="contact" className="py-20 sm:py-28 relative overflow-hidden bg-white">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none">
                {/* Grid pattern or subtle background if needed */}
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-5xl mx-auto">
                    {/* Section header with typing effect */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-black rounded-full mb-6 border border-red-500/20">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-white font-semibold tracking-wide uppercase">
                                Contact.connect()
                            </span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight mb-4">
                            Let's <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Connect</span>
                        </h2>
                        <div className="text-gray-800 text-lg">
                            <span>{typingText.substring(0, typingIndex)}</span>
                            <span className="inline-block w-0.5 h-5 bg-red-600 ml-0.5 animate-blink"></span>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Contact info section */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="space-y-6">
                                <ContactCard
                                    icon={<svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>}
                                    title="Email"
                                    value={contactInfo.email}
                                    accent="from-red-500 to-red-700"
                                />
                                <ContactCard
                                    icon={<svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>}
                                    title="Phone"
                                    value={contactInfo.phone}
                                    accent="from-black to-red-700"
                                />
                                <ContactCard
                                    icon={<svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>}
                                    title="Location"
                                    value={contactInfo.location}
                                    accent="from-red-600 to-black"
                                />
                            </div>
                            {/* Social links */}
                            <div className="flex gap-4">
                                {socialLinks.map(social => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-black to-red-700 rounded-lg blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                        <div className="relative w-10 h-10 rounded-lg bg-white border border-gray-300 group-hover:border-red-400/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                            <span className="text-black group-hover:text-red-600 transition-colors duration-300">
                                                {social.icon}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                        {/* Contact form */}
                        <div className="lg:col-span-7">
                            <div className="p-1 rounded-2xl bg-gradient-to-br from-red-500/20 via-black/10 to-red-700/20">
                                <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200">
                                    <div className="flex items-center mb-6">
                                        <div className="h-8 flex items-center px-3 rounded-md bg-gradient-to-r from-red-500/10 to-black/10 border border-red-500/20 text-red-600 text-sm">
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
                                            <h3 className="text-xl font-semibold text-black mb-2">Message Sent!</h3>
                                            <p className="text-gray-600 mb-6">Thanks for reaching out. I'll get back to you shortly.</p>
                                            <div className="p-3 rounded-lg bg-white/5 border border-gray-200 text-gray-400 text-sm font-mono">
                                                <span className="text-green-400">200 OK</span> · Message delivered successfully
                                            </div>
                                        </div>
                                    ) : (
                                        <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-xs text-red-600 mb-2 font-medium">
                                                        <span className="font-mono">NAME</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="from_name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-black 
                                                        placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.06] transition-all"
                                                        placeholder="John Doe"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-red-600 mb-2 font-medium">
                                                        <span className="font-mono">EMAIL</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="from_email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-black 
                                                        placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.06] transition-all"
                                                        placeholder="john@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-red-600 mb-2 font-medium">
                                                    <span className="font-mono">SUBJECT</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-black 
                                                    placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.06] transition-all"
                                                    placeholder="Project Inquiry"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-red-600 mb-2 font-medium">
                                                    <span className="font-mono">MESSAGE</span>
                                                </label>
                                                <div className="relative">
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        rows={5}
                                                        className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-black 
                                                        placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.06] transition-all resize-none"
                                                        placeholder="Your message here..."
                                                        required
                                                    ></textarea>
                                                    <div className="absolute right-3 bottom-3 text-xs text-red-600/70 bg-black/10 backdrop-blur-sm px-2 py-0.5 rounded">
                                                        {formData.message.length} chars
                                                    </div>
                                                </div>
                                            </div>
                                            {/* File Upload Section */}
                                            <div>
                                                <label className="block text-xs text-red-600 mb-2 font-medium">
                                                    <span className="font-mono">ATTACHMENTS</span>
                                                    <span className="ml-2 text-gray-400">({uploadedFiles.length}/{maxFiles})</span>
                                                </label>
                                                {/* Upload Area */}
                                                <div
                                                    className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${isDragOver
                                                        ? 'border-red-400 bg-red-500/10'
                                                        : uploadedFiles.length < maxFiles
                                                            ? 'border-gray-200 hover:border-red-400/50 bg-white/[0.02] hover:bg-white/[0.04]'
                                                            : 'border-gray-100 bg-white/[0.01] opacity-50'
                                                        }`}
                                                    onDragOver={handleDragOver}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={handleDrop}
                                                >
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        multiple
                                                        accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.psd,.cdr"
                                                        onChange={handleFileInputChange}
                                                        className="hidden"
                                                        disabled={uploadedFiles.length >= maxFiles}
                                                    />
                                                    <div className="text-center">
                                                        <div className="flex justify-center mb-3">
                                                            <svg className={`w-8 h-8 ${uploadedFiles.length < maxFiles ? 'text-red-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                        </div>
                                                        {uploadedFiles.length < maxFiles ? (
                                                            <>
                                                                <p className="text-black/70 mb-1">
                                                                    Drag & drop files here or{' '}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => fileInputRef.current?.click()}
                                                                        className="text-red-600 hover:text-red-500 underline focus:outline-none"
                                                                    >
                                                                        browse
                                                                    </button>
                                                                </p>
                                                                <p className="text-xs text-gray-400">
                                                                    JPG, PNG, GIF, WebP, PDF, PSD, CDR • Max 10MB per file • Max {maxFiles} files
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <p className="text-gray-400">Maximum files reached</p>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Uploaded Files List */}
                                                {uploadedFiles.length > 0 && (
                                                    <div className="mt-4 space-y-2">
                                                        {uploadedFiles.map((file) => (
                                                            <div key={file.id} className="flex items-center justify-between p-3 bg-white/[0.02] border border-gray-200 rounded-lg">
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="flex-shrink-0">
                                                                        {file.preview ? (
                                                                            <img
                                                                                src={file.preview}
                                                                                alt={file.name}
                                                                                className="w-10 h-10 object-cover rounded-lg"
                                                                            />
                                                                        ) : (
                                                                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                                                                                {getFileIcon(file)}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm text-black truncate">{file.name}</p>
                                                                        <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeFile(file.id)}
                                                                    className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {formStatus.status === 'error' && (
                                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-600 text-sm">
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
                                                className="w-full py-3.5 px-4 rounded-lg border-2 border-black text-black font-medium 
                                                hover:bg-black hover:text-white transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg 
                                                focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-white 
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
                                                        {uploadedFiles.length > 0 && (
                                                            <span className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-xs">
                                                                +{uploadedFiles.length}
                                                            </span>
                                                        )}
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
            <style jsx>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 1s infinite;
                }
            `}</style>
        </section>
    );
};

export default Contact;
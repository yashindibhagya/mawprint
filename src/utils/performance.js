// Performance Optimization Utilities for MawPrint

/**
 * Lazy load images with intersection observer
 * @param {string} selector - CSS selector for images to lazy load
 */
export const lazyLoadImages = (selector = 'img[data-src]') => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll(selector);
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        const images = document.querySelectorAll(selector);
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
};

/**
 * Preload critical images
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
    imageUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
    });
};

/**
 * Optimize images with WebP support detection
 * @param {string} originalSrc - Original image source
 * @param {string} webpSrc - WebP version source
 * @returns {string} Optimized image source
 */
export const getOptimizedImageSrc = (originalSrc, webpSrc = null) => {
    // Check if browser supports WebP
    const supportsWebP = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    if (webpSrc && supportsWebP()) {
        return webpSrc;
    }
    return originalSrc;
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Optimize scroll events
 * @param {Function} callback - Scroll callback function
 * @param {number} throttleTime - Throttle time in milliseconds
 * @returns {Function} Optimized scroll handler
 */
export const optimizeScroll = (callback, throttleTime = 16) => {
    return throttle(callback, throttleTime);
};

/**
 * Load CSS asynchronously
 * @param {string} href - CSS file URL
 * @param {string} media - Media query (optional)
 */
export const loadCSS = (href, media = 'all') => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = media;
    document.head.appendChild(link);
};

/**
 * Load JavaScript asynchronously
 * @param {string} src - JavaScript file URL
 * @param {Function} callback - Callback function after load
 */
export const loadJS = (src, callback = null) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    if (callback) {
        script.onload = callback;
    }
    document.head.appendChild(script);
};

/**
 * Optimize font loading
 * @param {string} fontFamily - Font family name
 * @param {string} fontUrl - Font file URL
 */
export const optimizeFontLoading = (fontFamily, fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = fontUrl;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
};

/**
 * Measure Core Web Vitals
 */
export const measureCoreWebVitals = () => {
    // LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);

            // Send to analytics
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'LCP', {
                    value: Math.round(lastEntry.startTime),
                    event_category: 'Web Vitals'
                });
            }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // FID (First Input Delay)
    if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);

                // Send to analytics
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'FID', {
                        value: Math.round(entry.processingStart - entry.startTime),
                        event_category: 'Web Vitals'
                    });
                }
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
    }

    // CLS (Cumulative Layout Shift)
    if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Report CLS when page is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                console.log('CLS:', clsValue);

                // Send to analytics
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'CLS', {
                        value: Math.round(clsValue * 1000) / 1000,
                        event_category: 'Web Vitals'
                    });
                }
            }
        });
    }
};

/**
 * Initialize performance optimizations
 */
export const initializePerformance = () => {
    // Measure Core Web Vitals
    measureCoreWebVitals();

    // Preload critical images
    preloadImages([
        '/assets/img/flag.png',
        '/assets/img/maw full.png'
    ]);

    // Optimize font loading
    optimizeFontLoading('Inter', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    // Initialize lazy loading
    lazyLoadImages();
}; 
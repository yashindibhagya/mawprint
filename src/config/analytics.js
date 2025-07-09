// Analytics Configuration for MawPrint

// Google Analytics Configuration
export const googleAnalyticsConfig = {
    // Replace with your actual GA4 Measurement ID
    measurementId: 'GA_MEASUREMENT_ID',

    // Custom dimensions and metrics
    customDimensions: {
        userType: 'dimension1',
        pageSection: 'dimension2',
        projectCategory: 'dimension3'
    },

    // Enhanced ecommerce tracking
    ecommerce: {
        enabled: true,
        currency: 'USD'
    },

    // Custom events
    events: {
        pageView: 'page_view',
        scrollDepth: 'scroll_depth',
        formSubmission: 'form_submission',
        projectView: 'project_view',
        contactClick: 'contact_click',
        serviceView: 'service_view'
    }
};

// Google Search Console Configuration
export const searchConsoleConfig = {
    // Replace with your actual verification code
    verificationCode: 'your-verification-code',

    // Site verification methods
    verificationMethods: {
        meta: 'your-meta-verification-code',
        html: 'your-html-verification-code'
    }
};

// Plausible Analytics Configuration
export const plausibleConfig = {
    // Replace with your actual Plausible domain
    domain: 'mawprint.vercel.app',

    // Custom events
    events: {
        projectView: 'Project View',
        contactForm: 'Contact Form Submission',
        serviceInquiry: 'Service Inquiry'
    }
};

// Ahrefs Configuration
export const ahrefsConfig = {
    // Ahrefs Site Audit tracking
    siteAudit: {
        enabled: true,
        projectId: 'your-project-id'
    }
};

// SEMrush Configuration
export const semrushConfig = {
    // SEMrush Position Tracking
    positionTracking: {
        enabled: true,
        projectId: 'your-project-id'
    }
};

/**
 * Initialize Google Analytics
 * @param {string} measurementId - GA4 Measurement ID
 */
export const initializeGoogleAnalytics = (measurementId = googleAnalyticsConfig.measurementId) => {
    if (typeof window !== 'undefined' && measurementId !== 'GA_MEASUREMENT_ID') {
        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', measurementId, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: googleAnalyticsConfig.customDimensions
        });

        // Make gtag globally available
        window.gtag = gtag;
    }
};

/**
 * Initialize Plausible Analytics
 * @param {string} domain - Plausible domain
 */
export const initializePlausible = (domain = plausibleConfig.domain) => {
    if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.defer = true;
        script.setAttribute('data-domain', domain);
        script.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(script);
    }
};

/**
 * Track custom events
 * @param {string} eventName - Event name
 * @param {object} parameters - Event parameters
 */
export const trackEvent = (eventName, parameters = {}) => {
    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
    }

    // Plausible tracking
    if (typeof window !== 'undefined' && window.plausible) {
        window.plausible(eventName, { props: parameters });
    }

    // Custom tracking for other tools
    if (window.dataLayer) {
        window.dataLayer.push({
            event: eventName,
            ...parameters
        });
    }
};

/**
 * Track page views
 * @param {string} pageTitle - Page title
 * @param {string} pagePath - Page path
 */
export const trackPageView = (pageTitle, pagePath = window.location.pathname) => {
    trackEvent(googleAnalyticsConfig.events.pageView, {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath
    });
};

/**
 * Track scroll depth
 * @param {number} depth - Scroll depth percentage
 */
export const trackScrollDepth = (depth) => {
    trackEvent(googleAnalyticsConfig.events.scrollDepth, {
        scroll_depth: depth
    });
};

/**
 * Track form submissions
 * @param {string} formName - Form name
 * @param {string} formType - Form type (contact, quote, etc.)
 */
export const trackFormSubmission = (formName, formType) => {
    trackEvent(googleAnalyticsConfig.events.formSubmission, {
        form_name: formName,
        form_type: formType
    });
};

/**
 * Track project views
 * @param {string} projectId - Project ID
 * @param {string} projectName - Project name
 * @param {string} projectCategory - Project category
 */
export const trackProjectView = (projectId, projectName, projectCategory) => {
    trackEvent(googleAnalyticsConfig.events.projectView, {
        project_id: projectId,
        project_name: projectName,
        project_category: projectCategory
    });
};

/**
 * Track contact clicks
 * @param {string} contactMethod - Contact method (phone, email, form)
 */
export const trackContactClick = (contactMethod) => {
    trackEvent(googleAnalyticsConfig.events.contactClick, {
        contact_method: contactMethod
    });
};

/**
 * Track service views
 * @param {string} serviceName - Service name
 * @param {string} serviceCategory - Service category
 */
export const trackServiceView = (serviceName, serviceCategory) => {
    trackEvent(googleAnalyticsConfig.events.serviceView, {
        service_name: serviceName,
        service_category: serviceCategory
    });
};

/**
 * Initialize all analytics
 */
export const initializeAnalytics = () => {
    // Initialize Google Analytics
    initializeGoogleAnalytics();

    // Initialize Plausible
    initializePlausible();

    // Track initial page view
    trackPageView(document.title);

    // Set up scroll depth tracking
    let maxScrollDepth = 0;
    const trackScroll = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);

        if (scrollPercent > maxScrollDepth) {
            maxScrollDepth = scrollPercent;

            // Track at 25%, 50%, 75%, and 100%
            if ([25, 50, 75, 100].includes(scrollPercent)) {
                trackScrollDepth(scrollPercent);
            }
        }
    };

    // Throttle scroll tracking
    let ticking = false;
    const throttledTrackScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                trackScroll();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', throttledTrackScroll);
};

// Export default configuration
export default {
    googleAnalytics: googleAnalyticsConfig,
    searchConsole: searchConsoleConfig,
    plausible: plausibleConfig,
    ahrefs: ahrefsConfig,
    semrush: semrushConfig
}; 
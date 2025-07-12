// SEO Utility Functions for MawPrint

/**
 * Update document title and meta description
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} keywords - Meta keywords (optional)
 */
export const updateSEO = (title, description, keywords = '') => {
    // Update title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }

    // Update meta keywords if provided
    if (keywords) {
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords);
        }
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDescription) ogDescription.setAttribute('content', description);

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');

    if (twitterTitle) twitterTitle.setAttribute('content', title);
    if (twitterDescription) twitterDescription.setAttribute('content', description);
};

/**
 * Update canonical URL
 * @param {string} url - Canonical URL
 */
export const updateCanonical = (url) => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = url;
};

/**
 * Generate structured data for different page types
 * @param {string} type - Type of structured data
 * @param {object} data - Data for structured data
 */
export const generateStructuredData = (type, data) => {
    const baseData = {
        "@context": "https://schema.org",
        "@type": type,
        ...data
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
        existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(baseData);
    document.head.appendChild(script);
};

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb items
 */
export const generateBreadcrumbs = (breadcrumbs) => {
    const breadcrumbData = {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    generateStructuredData("BreadcrumbList", breadcrumbData);
};

/**
 * Track page view for analytics
 * @param {string} page - Page name
 * @param {object} additionalData - Additional tracking data
 */
export const trackPageView = (page, additionalData = {}) => {
    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: page,
            page_location: window.location.href,
            ...additionalData
        });
    }

    // Plausible Analytics tracking
    if (typeof window !== 'undefined' && window.plausible) {
        window.plausible(page, { props: additionalData });
    }

    // Custom tracking for other analytics tools
    if (window.dataLayer) {
        window.dataLayer.push({
            event: 'page_view',
            page: page,
            ...additionalData
        });
    }
};

/**
 * Preload critical resources for better performance
 * @param {Array} resources - Array of resource URLs to preload
 */
export const preloadResources = (resources) => {
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.url;
        link.as = resource.as || 'fetch';
        if (resource.crossorigin) {
            link.crossOrigin = resource.crossorigin;
        }
        document.head.appendChild(link);
    });
};

/**
 * Add meta tags for social sharing
 * @param {object} socialData - Social media data
 */
export const addSocialMetaTags = (socialData) => {
    const { title, description, image, url, type = 'website' } = socialData;

    // Open Graph tags
    const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:url', content: url },
        { property: 'og:type', content: type }
    ];

    // Twitter Card tags
    const twitterTags = [
        { property: 'twitter:title', content: title },
        { property: 'twitter:description', content: description },
        { property: 'twitter:image', content: image },
        { property: 'twitter:url', content: url }
    ];

    [...ogTags, ...twitterTags].forEach(tag => {
        let meta = document.querySelector(`meta[property="${tag.property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', tag.property);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', tag.content);
    });
};

/**
 * Initialize SEO for the application
 */
export const initializeSEO = () => {
    // Set default SEO data
    updateSEO(
        'MawPrint - Premium Sublimation Printing Solutions | Banners, Flags & More',
        'Transform your ideas into stunning visual experiences with MawPrint\'s cutting-edge sublimation printing technology. Specializing in banners, flags, and custom printing solutions.',
        'sublimation printing, sublimation banner, sublimation flag, flags printing, banner printing, dtf t shirt, fabric banner, flags, custom banners, printing services, digital printing'
    );

    // Track initial page view
    trackPageView('Homepage');

    // Preload critical resources
    preloadResources([
        { url: `${process.env.PUBLIC_URL}/assets/img/flag.png`, as: 'image' },
        { url: `${process.env.PUBLIC_URL}/assets/img/maw full.png`, as: 'image' }
    ]);
};

// Default SEO configuration
export const defaultSEO = {
    title: 'MawPrint - Premium Sublimation Printing Solutions',
    description: 'Transform your ideas into stunning visual experiences with our cutting-edge sublimation printing technology.',
    keywords: 'sublimation printing, sublimation banner, sublimation flag, flags printing, banner printing, dtf t shirt, fabric banner, flags, custom banners, printing services',
    image: `${process.env.PUBLIC_URL}/assets/img/maw full.png`,
    url: 'https://mawprint.vercel.app'
}; 
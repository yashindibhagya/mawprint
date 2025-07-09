import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO, updateCanonical, generateStructuredData, trackPageView } from '../utils/seo';

/**
 * SEO Component for dynamic meta tag management
 * @param {object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.image - Social sharing image
 * @param {string} props.type - Content type (article, website, etc.)
 * @param {object} props.structuredData - Structured data object
 * @param {string} props.pageName - Page name for analytics
 */
const SEO = ({
    title,
    description,
    keywords = '',
    image = '/assets/img/maw full.png',
    type = 'website',
    structuredData = null,
    pageName = 'Page'
}) => {
    const location = useLocation();

    useEffect(() => {
        // Update SEO meta tags
        updateSEO(title, description, keywords);

        // Update canonical URL
        const canonicalUrl = `https://mawprint.vercel.app${location.pathname}`;
        updateCanonical(canonicalUrl);

        // Generate structured data if provided
        if (structuredData) {
            generateStructuredData(structuredData.type, structuredData.data);
        }

        // Track page view
        trackPageView(pageName, {
            page_path: location.pathname,
            page_title: title
        });

        // Update social meta tags
        const socialData = {
            title,
            description,
            image: `https://mawprint.vercel.app${image}`,
            url: canonicalUrl,
            type
        };

        // Update Open Graph and Twitter Card tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        const ogType = document.querySelector('meta[property="og:type"]');

        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        const twitterImage = document.querySelector('meta[property="twitter:image"]');
        const twitterUrl = document.querySelector('meta[property="twitter:url"]');

        if (ogTitle) ogTitle.setAttribute('content', socialData.title);
        if (ogDescription) ogDescription.setAttribute('content', socialData.description);
        if (ogImage) ogImage.setAttribute('content', socialData.image);
        if (ogUrl) ogUrl.setAttribute('content', socialData.url);
        if (ogType) ogType.setAttribute('content', socialData.type);

        if (twitterTitle) twitterTitle.setAttribute('content', socialData.title);
        if (twitterDescription) twitterDescription.setAttribute('content', socialData.description);
        if (twitterImage) twitterImage.setAttribute('content', socialData.image);
        if (twitterUrl) twitterUrl.setAttribute('content', socialData.url);

    }, [title, description, keywords, image, type, structuredData, pageName, location.pathname]);

    // This component doesn't render anything visible
    return null;
};

export default SEO; 
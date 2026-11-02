/**
 * Single source of truth for everything written on the site.
 * Anything marked TODO is a placeholder waiting for real figures/names.
 */

export const brand = {
    name: 'MawPrint',
    legalName: 'M.A.W. Printing',
    tagline: 'Sublimation · DTF',
    city: 'Colombo, Sri Lanka',
    foundedYear: 2000, // 25+ years in business as of 2026 — TODO: confirm the exact year
    email: 'mawprint@gmail.com',
    phone: '+94 77 222 3230',
    phoneHref: 'tel:+94772223230',
    whatsapp: '+94 71 429 4531', // TODO: confirm which number should receive WhatsApp enquiries
    whatsappHref: 'https://wa.me/94714294531?text=Hi%20MawPrint%2C%20I%27d%20like%20a%20quote%20for',
    hours: 'Mon – Sat · 8.30am – 6.00pm',
    siteUrl: 'https://mawprint.com',
};

export const nav = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Why us', href: '#why' },
    { label: 'FAQ', href: '#faq' },
];

export const hero = {
    eyebrow: 'Print production partner for brands in Sri Lanka · 25+ years',
    headline: ['Print that makes', 'your brand impossible', 'to ignore.'],
    lede: 'Banners, flags and DTF transfers — produced in-house in Colombo with colour that holds up outdoors, in bulk, and on deadline.',
    primaryCta: 'Request a quote',
    secondaryCta: 'See our work',
    ticker: ['Sublimation banners', 'Feather & pole flags', 'DTF transfer films', 'Event backdrops', 'Land-sale banners', 'Property signage'],
};

// Logos live in /public/assets/clients/. `dark: true` gives the tile a black background
// for logos that are supplied on a black canvas.
export const clients = {
    heading: 'Trusted by teams',
    moreLabel: '& many more',
    logos: [
        { name: 'Wickramage Property', src: '/assets/clients/wickramage-property.jpg' },
        { name: 'Tharanga Lands', src: '/assets/clients/tharanga-lands.jpg', dark: true },
        { name: 'Prime Lands', src: '/assets/clients/prime-lands.jpg' },
    ],
};

export const workCategories = [
    { id: 'all', label: 'All work' },
    { id: 'banners', label: 'Banners' },
    { id: 'flags', label: 'Flags' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'dtf', label: 'DTF' },
];

// TODO: swap mock-up images for photos of real jobs; keep the same shape.
export const work = [
    { id: 'w1', src: '/assets/img/flag.png', alt: 'Blue pole-mounted fabric banner with MawPrint artwork on a building facade', category: 'banners', title: 'Facade pole banner', spec: 'Sublimation · 110gsm knitted polyester · 60 × 90 cm', ratio: 'square' },
    { id: 'w2', src: '/assets/img/6.png', alt: 'Three tall vertical flags reading Quality, Responsibility, Innovation', category: 'flags', title: 'Corporate pole flags', spec: 'Sublimation · 3 m drop · double-sided', ratio: 'tall' },
    { id: 'w3', src: '/assets/img/1.jpg', alt: 'Three colourful vertical banners against a blue sky', category: 'banners', title: 'Event pole banners', spec: 'Sublimation · outdoor polyester · 1.2 × 3 m', ratio: 'wide' },
    { id: 'w4', src: '/assets/img/5.png', alt: 'Person wearing a cream t-shirt with a large printed back design', category: 'apparel', title: 'Back-print tee', spec: 'DTF transfer · 180gsm cotton · full-colour', ratio: 'tall' },
    { id: 'w5', src: '/assets/img/2.jpg', alt: 'Three bright teal and pink vertical banners in front of a building', category: 'banners', title: 'Retail pole banners', spec: 'Sublimation · outdoor polyester · 0.9 × 2.4 m', ratio: 'wide' },
    { id: 'w6', src: '/assets/img/8.png', alt: 'Heat press applying a pink astronaut design onto a black t-shirt', category: 'dtf', title: 'DTF heat-press transfer', spec: 'DTF film · hot peel · black garment', ratio: 'wide' },
    { id: 'w7', src: '/assets/img/9.png', alt: 'Red corporate flag with a white logo flying in front of city towers', category: 'flags', title: 'Corporate flag', spec: 'Sublimation · 120 × 180 cm · brass grommets', ratio: 'square' },
    { id: 'w8', src: '/assets/img/7.jpg', alt: 'Person holding up a white t-shirt with a geometric multicolour print', category: 'apparel', title: 'Full-front graphic tee', spec: 'Sublimation · polyester jersey', ratio: 'tall' },
    { id: 'w9', src: '/assets/img/4.jpg', alt: 'Colourful printed flag on a wooden pole against a blue sky', category: 'flags', title: 'Printed fabric flag', spec: 'Sublimation · 100 × 150 cm · sleeve finish', ratio: 'wide' },
    { id: 'w10', src: '/assets/img/12.png', alt: 'Grey t-shirt on a hanger with a Spaced Out astronaut print', category: 'dtf', title: 'DTF on heather grey', spec: 'DTF film · soft-hand finish', ratio: 'wide' },
    { id: 'w11', src: '/assets/img/10.png', alt: 'Row of white and red branded pole flags outside a store', category: 'flags', title: 'Storefront flag run', spec: 'Sublimation · 12-unit run · pole pockets', ratio: 'wide' },
    { id: 'w12', src: '/assets/img/11.webp', alt: 'Three red and white vertical flags with brand slogans', category: 'flags', title: 'Branded pole flags', spec: 'Sublimation · 3 m drop', ratio: 'square' },
];

export const services = {
    eyebrow: 'What we produce',
    heading: 'Three production lines, one point of contact.',
    intro: 'Every job runs through the same in-house team: artwork check, colour proof, print, finish, dispatch. No middlemen, no surprises.',
    items: [
        {
            n: '01',
            title: 'Sublimation banners & flags',
            blurb: 'Dye-sublimated fabric with colour that goes into the fibre, not on top of it — so it won’t crack, peel or fade outdoors.',
            points: ['Pole, feather & teardrop flags', 'Event & exhibition backdrops', 'Table covers and tear-drops', 'Double-sided with block-out'],
            spec: ['110–260gsm polyester', 'Up to 3.2 m wide seamless', 'Hems, grommets, pole pockets'],
            image: '/assets/img/6.png',
        },
        {
            n: '02',
            title: 'Land-sale & property banners',
            blurb: 'Large-format site banners built for weeks in sun and rain: bold type, readable from the road, finished for quick mounting on fences and frames.',
            points: ['Site-boundary and fence banners', 'Plot-number and price signage', 'Directional flags for open days', 'Repeat runs for multi-site sales'],
            spec: ['Outdoor-rated fabric or PVC', 'Reinforced edges, eyelets every 50 cm', 'Rope and tie kit on request'],
            image: '/assets/img/1.jpg',
        },
        {
            n: '03',
            title: 'DTF transfer films',
            blurb: 'Printed, powdered and cured transfer films ready for your heat press. Full colour, fine detail, works on cotton, blends and dark garments.',
            points: ['Gang sheets to your layout', 'No minimum colour count', 'Hot or cold peel', 'Ships rolled, press within 6 months'],
            spec: ['Up to 60 cm wide', 'White under-base included', 'Press: 150–160 °C, 10–15 s'],
            image: '/assets/img/8.png',
        },
    ],
};

export const process = {
    eyebrow: 'How a job runs',
    heading: 'Brief on Monday. Hanging by Friday.',
    steps: [
        { n: '01', title: 'Brief & quote', text: 'Send sizes, quantities and artwork (or a sketch). You get a line-item quote within one working day.' },
        { n: '02', title: 'Artwork & proof', text: 'We prepare print-ready files, flag anything that won’t print well, and send a digital proof — or a physical swatch for colour-critical jobs.' },
        { n: '03', title: 'Print & finish', text: 'Production runs in-house: print, press, cut, hem, grommet. Every piece is checked against the proof before packing.' },
        { n: '04', title: 'Deliver & install', text: 'Collected, couriered island-wide, or installed on site by our team for flags and large banners.' },
    ],
};

export const why = {
    eyebrow: 'Why companies choose MawPrint',
    heading: 'More than 25 years in print. Built for repeat orders, not one-off favours.',
    // Only one figure is highlighted on purpose. Add more entries here if you ever want them.
    stats: [
        { value: 25, suffix: '+', label: 'Years in print', note: 'Production experience in sublimation and DTF.' },
    ],
    statsArePlaceholder: false,
    points: [
        { title: 'A quarter-century at the press', text: 'More than 25 years of production experience means we’ve already solved the problems that slow other printers down — on fabric and film.' },
        { title: 'Colour you can approve', text: 'Proof first, print second. We match brand colours on the actual substrate, so what you sign off is what arrives.' },
        { title: 'Pricing that scales', text: 'Transparent per-unit pricing with volume breaks. Bulk runs for events, branches and campaigns stay predictable.' },
        { title: 'Deadlines, kept', text: 'In-house production means no waiting on a third party. Rush slots are available for event week.' },
        { title: 'One accountable team', text: 'A single contact from quote to delivery. If something isn’t right, we reprint it — no debate.' },
    ],
    // The 5th point drops to a full-width row on tablets; keep the count at 5 or 4 — both lay out cleanly.
};

// TODO: replace with real quotes, names and companies (ask clients for permission to publish)
export const testimonials = {
    eyebrow: 'From our clients',
    heading: 'What it’s like to work with us.',
    isPlaceholder: true,
    items: [
        { quote: 'Our launch banners were printed, finished and hanging in three days. Colour matched our brand guide exactly.', name: 'Client name', role: 'Marketing Manager', company: 'Company' },
        { quote: 'We order staff uniforms for four branches every quarter. Same quality every time, and the invoice is always what was quoted.', name: 'Client name', role: 'Operations Lead', company: 'Company' },
        { quote: 'They caught a low-resolution logo before printing and fixed it for us. That saved an expensive reprint.', name: 'Client name', role: 'Founder', company: 'Company' },
    ],
};

export const faq = {
    eyebrow: 'Questions buyers ask',
    heading: 'The practical details.',
    items: [
        { q: 'What are your minimum order quantities?', a: 'Banners and flags: no minimum — single pieces are fine. DTF films: no minimum; we charge by the metre of gang sheet.' }, // TODO: confirm MOQs
        { q: 'How fast can you deliver?', a: 'Standard turnaround is 2–4 working days after artwork approval. Rush jobs can often be done in 24–48 hours — tell us the date and we’ll confirm before you commit.' }, // TODO: confirm turnaround
        { q: 'What artwork do you need from us?', a: 'Vector files (AI, EPS, PDF, SVG) are ideal. High-resolution PNG or JPG at 150 dpi at final size also works. If you only have a logo or a sketch, our team can prepare print-ready artwork.' },
        { q: 'Can you match our brand colours?', a: 'Yes. Send Pantone or CMYK references and we’ll proof on the actual material. For colour-critical work we can print a physical swatch before the full run.' },
        { q: 'Do you deliver outside Colombo?', a: 'Yes — island-wide by courier, with installation available in and around Colombo for flags and large banners.' },
        { q: 'How do I get a quote?', a: 'Use the form below or message us on WhatsApp with sizes, quantities and a rough deadline. You’ll have a line-item quote within one working day.' },
    ],
};

export const contact = {
    eyebrow: 'Request a quote',
    heading: 'Tell us what you need printed.',
    lede: 'Share sizes, quantities and a deadline. Attach artwork if you have it. We reply within one working day.',
    serviceOptions: [
        'Sublimation banners',
        'Flags (pole / feather / teardrop)',
        'Land-sale & property banners',
        'DTF transfer films',
        'Something else',
    ],
};

export const footer = {
    blurb: 'In-house sublimation and DTF printing in Colombo. Serving businesses, events and property developers across Sri Lanka.',
    columns: [
        { title: 'Services', links: [
            { label: 'Banners & flags', href: '#services' },
            { label: 'Land-sale banners', href: '#services' },
            { label: 'DTF films', href: '#services' },
        ]},
        { title: 'Company', links: [
            { label: 'Our work', href: '#work' },
            { label: 'Process', href: '#process' },
            { label: 'Why MawPrint', href: '#why' },
            { label: 'FAQ', href: '#faq' },
        ]},
    ],
};

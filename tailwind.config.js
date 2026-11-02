/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                xs: '480px',
            },
            colors: {
                paper: {
                    DEFAULT: '#F6F4EF',
                    2: '#EDE9E1',
                    3: '#E3DED3',
                },
                ink: {
                    DEFAULT: '#141311',
                    soft: '#3E3A35',
                    muted: '#6F6962',
                },
                line: '#D9D3C8',
                red: {
                    DEFAULT: '#D7262B',
                    deep: '#B01E22',
                    tint: '#FBE9E9',
                },
            },
            fontFamily: {
                display: ['Fraunces', 'Georgia', 'serif'],
                sans: ['Manrope', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            },
            fontSize: {
                'display-xl': ['clamp(2.75rem, 7.2vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
                'display-lg': ['clamp(2.25rem, 4.6vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
                'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
            },
            maxWidth: {
                shell: '82rem',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                marquee: 'marquee 40s linear infinite',
            },
            boxShadow: {
                lift: '0 20px 50px -24px rgba(20, 19, 17, 0.35)',
                card: '0 1px 0 rgba(20,19,17,0.04), 0 12px 32px -20px rgba(20,19,17,0.25)',
            },
        },
    },
    plugins: [],
};

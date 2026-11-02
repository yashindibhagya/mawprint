import React from 'react';

/**
 * Infinite horizontal ticker. Content is duplicated for the seamless loop;
 * the copy is aria-hidden so screen readers read it once.
 */
export default function Marquee({ items, className = '', separator = '•' }) {
    const row = (hidden) => (
        <ul className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
            {items.map((item, i) => (
                <li key={i} className="flex items-center gap-8 whitespace-nowrap">
                    <span>{item}</span>
                    <span className="text-red" aria-hidden="true">{separator}</span>
                </li>
            ))}
        </ul>
    );
    return (
        <div className={`marquee overflow-hidden ${className}`}>
            <div className="marquee-track flex w-max animate-marquee">
                {row(false)}
                {row(true)}
            </div>
        </div>
    );
}

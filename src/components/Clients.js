import React from 'react';
import Reveal from './ui/Reveal';
import { clients } from '../content/site';

/**
 * "Trusted by" strip: client logos in uniform tiles, plus a "& many more" tile.
 * Add a logo by dropping a file in /public/assets/clients and listing it in src/content/site.js.
 */
export default function Clients() {
    return (
        <section aria-labelledby="clients-heading" className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-16">
            <Reveal>
                <h2 id="clients-heading" className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                    {clients.heading}
                </h2>
            </Reveal>
            <Reveal delay={0.1}>
                <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                    {clients.logos.map((logo) => (
                        <li
                            key={logo.name}
                            className={`flex aspect-[5/3] items-center justify-center overflow-hidden rounded-[6px] border border-line p-5 ${
                                logo.dark ? 'bg-black' : 'bg-white'
                            }`}
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}
                                loading="lazy"
                                className="max-h-full max-w-full object-contain"
                            />
                        </li>
                    ))}
                    <li className="flex aspect-[5/3] flex-col items-center justify-center rounded-[6px] border border-dashed border-ink/25 text-center">
                        <span className="font-display text-3xl leading-none text-ink">+</span>
                        <span className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">{clients.moreLabel}</span>
                    </li>
                </ul>
            </Reveal>
        </section>
    );
}

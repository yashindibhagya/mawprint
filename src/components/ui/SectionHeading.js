import React from 'react';
import Reveal from './Reveal';

/**
 * Eyebrow (mono, numbered) + display heading + optional intro.
 */
export default function SectionHeading({ index, eyebrow, heading, intro, align = 'left', light = false }) {
    const center = align === 'center';
    return (
        <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
            <Reveal>
                <p className={`font-mono text-[11px] tracking-[0.22em] uppercase ${light ? 'text-paper-3' : 'text-ink-muted'} flex items-center ${center ? 'justify-center' : ''} gap-3`}>
                    {index && <span className="text-red">{index}</span>}
                    <span>{eyebrow}</span>
                </p>
            </Reveal>
            <Reveal delay={0.08}>
                <h2 className={`font-display text-display-lg mt-4 ${light ? 'text-paper' : 'text-ink'}`}>{heading}</h2>
            </Reveal>
            {intro && (
                <Reveal delay={0.16}>
                    <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-paper-3' : 'text-ink-soft'}`}>{intro}</p>
                </Reveal>
            )}
        </div>
    );
}

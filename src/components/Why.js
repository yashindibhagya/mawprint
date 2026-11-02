import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import useCountUp from '../hooks/useCountUp';
import { why } from '../content/site';

function Stat({ value, suffix, label, note, hero = false }) {
    const [ref, n] = useCountUp(value);
    return (
        <div ref={ref} className="border-l-2 border-red pl-5">
            <p className={`font-display tracking-tight text-ink ${hero ? 'text-7xl md:text-8xl' : 'text-5xl md:text-6xl'}`}>
                {n}
                <span className="text-red">{suffix}</span>
            </p>
            <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">{label}</p>
            {note && <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-ink-soft">{note}</p>}
        </div>
    );
}

export default function Why() {
    return (
        <section id="why" className="border-y border-line bg-paper-2/50">
            <div className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <SectionHeading index="04" eyebrow={why.eyebrow} heading={why.heading} />
                        <Reveal delay={0.2}>
                            <div className={`mt-12 grid gap-x-6 gap-y-10 ${why.stats.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                {why.stats.map((s) => (
                                    <Stat key={s.label} {...s} hero={why.stats.length === 1} />
                                ))}
                            </div>
                            {why.statsArePlaceholder && (
                                <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted/60">
                                    {/* Visible reminder; delete once real figures are in src/content/site.js */}
                                    Figures to be confirmed
                                </p>
                            )}
                        </Reveal>
                    </div>

                    <ul className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:pt-16">
                        {why.points.map((p, i) => (
                            <Reveal as="li" key={p.title} delay={0.1 + i * 0.07}>
                                <span className="font-mono text-xs text-red">0{i + 1}</span>
                                <h3 className="mt-3 font-display text-2xl text-ink">{p.title}</h3>
                                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{p.text}</p>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

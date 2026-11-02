import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { testimonials } from '../content/site';

export default function Testimonials() {
    return (
        <section id="testimonials" className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
            <SectionHeading index="05" eyebrow={testimonials.eyebrow} heading={testimonials.heading} />

            <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
                {testimonials.items.map((t, i) => (
                    <Reveal as="li" key={i} delay={i * 0.08} className="flex flex-col justify-between rounded-[6px] border border-line bg-white p-7 shadow-card">
                        <blockquote>
                            <span className="font-display text-5xl leading-none text-red" aria-hidden="true">“</span>
                            <p className="-mt-3 font-display text-[21px] leading-snug text-ink">{t.quote}</p>
                        </blockquote>
                        <footer className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-2 font-mono text-xs text-ink-muted" aria-hidden="true">
                                {t.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                            </span>
                            <div className={testimonials.isPlaceholder ? 'text-ink/50' : ''}>
                                <p className="text-[14.5px] font-semibold">{t.name}</p>
                                <p className="text-[13px] text-ink-muted">{t.role}, {t.company}</p>
                            </div>
                        </footer>
                    </Reveal>
                ))}
            </ul>
        </section>
    );
}

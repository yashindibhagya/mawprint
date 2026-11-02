import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { process } from '../content/site';

export default function Process() {
    return (
        <section id="process" className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
            <SectionHeading index="03" eyebrow={process.eyebrow} heading={process.heading} />

            <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[6px] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
                {process.steps.map((s, i) => (
                    <Reveal as="li" key={s.n} delay={i * 0.08} className="group relative bg-paper p-7 transition-colors hover:bg-white">
                        <div className="flex items-center justify-between">
                            <span className="font-display text-5xl leading-none text-ink/15 transition-colors group-hover:text-red">{s.n}</span>
                            <span className="h-[1px] flex-1 translate-y-[1px] bg-line ml-5" aria-hidden="true" />
                        </div>
                        <h3 className="mt-10 font-display text-2xl text-ink">{s.title}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
                    </Reveal>
                ))}
            </ol>
        </section>
    );
}

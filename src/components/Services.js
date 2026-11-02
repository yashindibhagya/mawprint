import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import CropMarks from './ui/CropMarks';
import { services } from '../content/site';

/**
 * Services as a "spec sheet": a vertical index on the left, the active
 * service's image + details on the right. Collapses to stacked cards on mobile.
 */
export default function Services() {
    const [active, setActive] = useState(0);
    const reduce = useReducedMotion();
    const item = services.items[active];

    return (
        <section id="services" className="bg-ink text-paper">
            <div className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
                <SectionHeading
                    index="02"
                    eyebrow={services.eyebrow}
                    heading={services.heading}
                    intro={services.intro}
                    light
                />

                {/* Desktop: index + detail */}
                <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-12">
                    <ul className="lg:col-span-5" role="tablist" aria-label="Services">
                        {services.items.map((s, i) => {
                            const on = i === active;
                            return (
                                <li key={s.n} className="border-t border-paper/15 last:border-b">
                                    <button
                                        role="tab"
                                        aria-selected={on}
                                        aria-controls={`service-panel-${i}`}
                                        id={`service-tab-${i}`}
                                        onClick={() => setActive(i)}
                                        onMouseEnter={() => setActive(i)}
                                        className="group flex w-full items-start gap-5 py-6 text-left transition-colors"
                                    >
                                        <span className={`font-mono text-xs pt-1.5 ${on ? 'text-red' : 'text-paper/40'}`}>{s.n}</span>
                                        <span className="flex-1">
                                            <span className={`block font-display text-2xl transition-colors xl:text-3xl ${on ? 'text-paper' : 'text-paper/55 group-hover:text-paper/85'}`}>
                                                {s.title}
                                            </span>
                                            <AnimatePresence initial={false}>
                                                {on && (
                                                    <motion.span
                                                        key="blurb"
                                                        initial={reduce ? false : { opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                                        className="block overflow-hidden"
                                                    >
                                                        <span className="mt-3 block max-w-md text-[15px] leading-relaxed text-paper-3">{s.blurb}</span>
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </span>
                                        <ArrowUpRight
                                            size={18}
                                            className={`mt-2 shrink-0 transition-all ${on ? 'text-red opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
                                            aria-hidden="true"
                                        />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="lg:col-span-7" id={`service-panel-${active}`} role="tabpanel" aria-labelledby={`service-tab-${active}`}>
                        <div className="grid grid-cols-7 gap-6">
                            <div className="relative col-span-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={item.image}
                                        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.35 }}
                                        className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-paper/5"
                                    >
                                        <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                                        <CropMarks className="text-paper/60" inset={-8} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="col-span-3 flex flex-col justify-between">
                                <div>
                                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper/50">Includes</p>
                                    <ul className="mt-3 space-y-2.5">
                                        {item.points.map((p) => (
                                            <li key={p} className="flex items-start gap-2.5 text-[15px] text-paper">
                                                <Check size={15} className="mt-[3px] shrink-0 text-red" aria-hidden="true" />
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-8 border-t border-paper/15 pt-5">
                                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper/50">Spec</p>
                                    <ul className="mt-3 space-y-1.5 font-mono text-[12px] text-paper-3">
                                        {item.spec.map((s) => (
                                            <li key={s}>— {s}</li>
                                        ))}
                                    </ul>
                                    <a href="#contact" className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-paper underline decoration-red decoration-2 underline-offset-[6px] hover:decoration-paper">
                                        Get a quote for this
                                        <ArrowUpRight size={16} aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile / tablet: stacked cards */}
                <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
                    {services.items.map((s, i) => (
                        <Reveal as="li" key={s.n} delay={i * 0.05} className="overflow-hidden rounded-[6px] border border-paper/15">
                            <div className="relative aspect-[16/10] bg-paper/5">
                                <img src={s.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                            </div>
                            <div className="p-5">
                                <p className="font-mono text-xs text-red">{s.n}</p>
                                <h3 className="mt-2 font-display text-2xl">{s.title}</h3>
                                <p className="mt-3 text-[15px] leading-relaxed text-paper-3">{s.blurb}</p>
                                <ul className="mt-4 space-y-2">
                                    {s.points.map((p) => (
                                        <li key={p} className="flex items-start gap-2.5 text-[14.5px]">
                                            <Check size={15} className="mt-[3px] shrink-0 text-red" aria-hidden="true" />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                                <ul className="mt-4 border-t border-paper/15 pt-4 font-mono text-[11.5px] text-paper/60">
                                    {s.spec.map((x) => <li key={x}>— {x}</li>)}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}

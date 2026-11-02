import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { faq } from '../content/site';

export default function FAQ() {
    const [open, setOpen] = useState(0);
    const reduce = useReducedMotion();

    return (
        <section id="faq" className="border-t border-line">
            <div className="mx-auto grid max-w-shell grid-cols-1 gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <SectionHeading index="05" eyebrow={faq.eyebrow} heading={faq.heading} />
                </div>
                <Reveal className="lg:col-span-8" delay={0.1}>
                    <ul className="divide-y divide-line border-y border-line">
                        {faq.items.map((item, i) => {
                            const on = open === i;
                            return (
                                <li key={i}>
                                    <h3>
                                        <button
                                            type="button"
                                            onClick={() => setOpen(on ? -1 : i)}
                                            aria-expanded={on}
                                            aria-controls={`faq-panel-${i}`}
                                            id={`faq-button-${i}`}
                                            className="flex w-full items-center justify-between gap-6 py-5 text-left"
                                        >
                                            <span className="font-display text-xl text-ink md:text-2xl">{item.q}</span>
                                            <span
                                                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                                    on ? 'rotate-45 border-red bg-red text-white' : 'border-line text-ink'
                                                }`}
                                                aria-hidden="true"
                                            >
                                                <Plus size={16} />
                                            </span>
                                        </button>
                                    </h3>
                                    <AnimatePresence initial={false}>
                                        {on && (
                                            <motion.div
                                                id={`faq-panel-${i}`}
                                                role="region"
                                                aria-labelledby={`faq-button-${i}`}
                                                initial={reduce ? false : { height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p className="max-w-2xl pb-6 text-[15.5px] leading-relaxed text-ink-soft">{item.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            );
                        })}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}

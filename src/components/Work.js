import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import CropMarks from './ui/CropMarks';
import { work, workCategories } from '../content/site';

// Phones & tablets: uniform square tiles in a two-column grid (images are object-cover).
// lg+: fixed 300px rows with a dense flow; tall items span two rows — no ragged gaps.
const ratioClass = {
    tall: 'aspect-square lg:aspect-auto lg:h-full',
    wide: 'aspect-square lg:aspect-auto lg:h-full',
    square: 'aspect-square lg:aspect-auto lg:h-full',
};

export default function Work() {
    const [filter, setFilter] = useState('all');
    const [lightbox, setLightbox] = useState(null); // index within visible list
    const reduce = useReducedMotion();

    const visible = filter === 'all' ? work : work.filter((w) => w.category === filter);

    const close = useCallback(() => setLightbox(null), []);
    const step = useCallback(
        (dir) => setLightbox((i) => (i === null ? null : (i + dir + visible.length) % visible.length)),
        [visible.length]
    );

    useEffect(() => {
        if (lightbox === null) return;
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [lightbox, close, step]);

    return (
        <section id="work" className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <SectionHeading
                    index="01"
                    eyebrow="Selected work"
                    heading="Printed, finished, and out in the world."
                />
                <Reveal delay={0.1}>
                    <div role="tablist" aria-label="Filter work by category" className="flex flex-wrap gap-2">
                        {workCategories.map((c) => {
                            const active = c.id === filter;
                            return (
                                <button
                                    key={c.id}
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setFilter(c.id)}
                                    className={`min-h-[40px] rounded-full border px-4 text-[13.5px] font-medium transition-colors ${
                                        active
                                            ? 'border-ink bg-ink text-paper'
                                            : 'border-line bg-transparent text-ink-soft hover:border-ink/40 hover:text-ink'
                                    }`}
                                >
                                    {c.label}
                                </button>
                            );
                        })}
                    </div>
                </Reveal>
            </div>

            <motion.ul layout className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-flow-dense lg:auto-rows-[300px] lg:grid-cols-3 lg:gap-5">
                <AnimatePresence mode="popLayout">
                    {visible.map((item, i) => (
                        <motion.li
                            key={item.id}
                            layout
                            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className={`group relative flex flex-col ${item.ratio === 'tall' ? 'lg:row-span-2' : ''}`}
                        >
                            <button
                                type="button"
                                onClick={() => setLightbox(i)}
                                className="relative block w-full flex-1 overflow-hidden rounded-[6px] bg-paper-2 text-left"
                                aria-label={`Open ${item.title}`}
                            >
                                <div className={`relative ${ratioClass[item.ratio]}`}>
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-paper opacity-0 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                                        <div>
                                            <p className="font-display text-lg leading-tight">{item.title}</p>
                                            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper-3">{item.spec}</p>
                                        </div>
                                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink">
                                            <Plus size={16} aria-hidden="true" />
                                        </span>
                                    </div>
                                </div>
                            </button>
                            {/* Caption visible on touch devices / always below on mobile */}
                            <div className="mt-2 flex items-baseline justify-between gap-2 lg:hidden">
                                <p className="truncate text-[13px] font-medium text-ink sm:text-[14px]">{item.title}</p>
                                <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted sm:block">{workCategories.find((c) => c.id === item.category)?.label}</p>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>

            <AnimatePresence>
                {lightbox !== null && visible[lightbox] && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={visible[lightbox].title}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 md:p-10"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={close}
                    >
                        <button
                            type="button"
                            onClick={close}
                            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); step(-1); }}
                            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20 md:inline-flex"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); step(1); }}
                            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20 md:inline-flex"
                            aria-label="Next"
                        >
                            <ChevronRight size={20} />
                        </button>

                        <motion.figure
                            key={visible[lightbox].id}
                            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-h-full max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <img
                                    src={visible[lightbox].src}
                                    alt={visible[lightbox].alt}
                                    className="max-h-[75vh] w-auto rounded-[4px] object-contain"
                                />
                                <CropMarks className="text-paper/70" inset={-8} />
                            </div>
                            <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-2 text-paper">
                                <span className="font-display text-xl">{visible[lightbox].title}</span>
                                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-3">
                                    {visible[lightbox].spec} · {lightbox + 1}/{visible.length}
                                </span>
                            </figcaption>
                        </motion.figure>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

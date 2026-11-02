import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Button from './ui/Button';
import Marquee from './ui/Marquee';
import CropMarks, { RegMark } from './ui/CropMarks';
import { brand, hero, work } from '../content/site';

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
    const reduce = useReducedMotion();
    const rise = (delay) => ({
        initial: reduce ? false : { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease },
    });

    const tiles = [work[0], work[1], work[3]];

    return (
        <section id="hero" className="relative overflow-hidden pt-[72px]">
            {/* Faint registration marks in the corners */}
            <RegMark className="absolute left-5 top-24 text-ink/20 md:left-8" />
            <RegMark className="absolute right-5 top-24 text-ink/20 md:right-8" />

            <div className="mx-auto grid max-w-shell grid-cols-1 gap-12 px-5 pb-16 pt-14 md:px-8 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-24">
                {/* Copy */}
                <div className="lg:col-span-7">
                    <motion.p {...rise(0)} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                        <span className="inline-block h-[6px] w-[6px] rounded-full bg-red" aria-hidden="true" />
                        {hero.eyebrow}
                    </motion.p>

                    <h1 className="mt-6 font-display text-display-xl text-ink">
                        {hero.headline.map((line, i) => (
                            <motion.span key={i} {...rise(0.08 + i * 0.09)} className="block">
                                {i === 1 ? (
                                    <>
                                        {line.split(' ').slice(0, 2).join(' ')}{' '}
                                        <em className="font-light italic text-red">{line.split(' ').slice(2).join(' ')}</em>
                                    </>
                                ) : line}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p {...rise(0.4)} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
                        {hero.lede}
                    </motion.p>

                    <motion.div {...rise(0.5)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button href="#contact" variant="primary" arrow>
                            {hero.primaryCta}
                        </Button>
                        <Button href="#work" variant="ghost">
                            {hero.secondaryCta}
                        </Button>
                    </motion.div>

                    <motion.dl {...rise(0.6)} className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
                        <div>
                            <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">Based in</dt>
                            <dd className="mt-1.5 flex items-center gap-1.5 text-[15px] font-medium text-ink">
                                <MapPin size={14} className="text-red" aria-hidden="true" />
                                {brand.city}
                            </dd>
                        </div>
                        <div>
                            <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">Production</dt>
                            <dd className="mt-1.5 text-[15px] font-medium text-ink">100% in-house</dd>
                        </div>
                        <div>
                            <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">Quotes</dt>
                            <dd className="mt-1.5 text-[15px] font-medium text-ink">Within 1 working day</dd>
                        </div>
                    </motion.dl>
                </div>

                {/* Image composition */}
                <div className="relative lg:col-span-5">
                    <div className="grid grid-cols-5 grid-rows-6 gap-3 md:gap-4" style={{ aspectRatio: '5 / 6' }}>
                        <motion.figure
                            {...rise(0.25)}
                            className="relative col-span-3 row-span-4 overflow-hidden rounded-[6px] bg-paper-2"
                        >
                            <img src={tiles[0].src} alt={tiles[0].alt} className="h-full w-full object-cover" loading="eager" fetchPriority="high" />
                            <CropMarks className="text-ink/60" inset={-6} />
                        </motion.figure>
                        <motion.figure
                            {...rise(0.38)}
                            className="relative col-span-2 row-span-3 overflow-hidden rounded-[6px] bg-paper-2"
                        >
                            <img src={tiles[1].src} alt={tiles[1].alt} className="h-full w-full object-cover" loading="eager" />
                        </motion.figure>
                        <motion.figure
                            {...rise(0.5)}
                            className="relative col-span-2 row-span-3 overflow-hidden rounded-[6px] bg-paper-2"
                        >
                            <img src={tiles[2].src} alt={tiles[2].alt} className="h-full w-full object-cover" loading="lazy" />
                        </motion.figure>
                        <motion.div
                            {...rise(0.6)}
                            className="col-span-3 row-span-2 flex flex-col justify-between rounded-[6px] bg-ink p-4 text-paper sm:p-5"
                        >
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-3 sm:text-[10.5px]">Job sheet</p>
                            <div>
                                <p className="font-display text-[19px] leading-tight sm:text-2xl">Proof → Print → Hang</p>
                                <p className="mt-1 text-[12px] leading-snug text-paper-3 sm:text-[13px]">48h turnaround after approval.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Ticker */}
            <div className="border-y border-line bg-paper-2/60">
                <Marquee
                    items={hero.ticker}
                    className="mx-auto max-w-shell py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-soft"
                />
            </div>
        </section>
    );
}

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import Wordmark from './ui/Wordmark';
import Button from './ui/Button';
import { brand, nav } from '../content/site';

export default function Header({ activeSection }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const reduce = useReducedMotion();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll while the mobile sheet is open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-40">
            <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
                Skip to content
            </a>
            <div
                className={`transition-[background-color,box-shadow,border-color] duration-300 border-b ${
                    scrolled ? 'bg-paper/85 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
                }`}
            >
                <div className="mx-auto flex h-[72px] max-w-shell items-center justify-between px-5 md:px-8">
                    <Wordmark />

                    <nav className="hidden lg:block" aria-label="Primary">
                        <ul className="flex items-center gap-1">
                            {nav.map((item) => {
                                const active = activeSection === item.href.slice(1);
                                return (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            aria-current={active ? 'true' : undefined}
                                            className={`relative inline-flex min-h-[44px] items-center px-3.5 text-[14.5px] font-medium transition-colors ${
                                                active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                                            }`}
                                        >
                                            {item.label}
                                            <span
                                                className={`absolute inset-x-3.5 bottom-2 h-[1.5px] origin-left bg-red transition-transform duration-300 ${
                                                    active ? 'scale-x-100' : 'scale-x-0'
                                                }`}
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="hidden items-center gap-2 lg:flex">
                        <a
                            href={brand.whatsappHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-2 px-3 text-[14.5px] font-medium text-ink-muted transition-colors hover:text-ink"
                        >
                            <MessageCircle size={17} aria-hidden="true" />
                            WhatsApp
                        </a>
                        <Button href="#contact" variant="primary" className="!min-h-[44px] !px-5 text-[14px]">
                            Request a quote
                        </Button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
                        aria-label="Open menu"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex h-[72px] items-center justify-between px-5">
                            <Wordmark />
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15"
                                aria-label="Close menu"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Mobile">
                            <ul className="space-y-1">
                                {nav.map((item, i) => (
                                    <motion.li
                                        key={item.href}
                                        initial={reduce ? false : { opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="flex items-baseline gap-4 py-3 font-display text-4xl text-ink"
                                        >
                                            <span className="font-mono text-xs text-red">0{i + 1}</span>
                                            {item.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>
                        <div className="space-y-3 border-t border-line px-6 py-6">
                            <Button href="#contact" onClick={() => setOpen(false)} variant="primary" className="w-full">
                                Request a quote
                            </Button>
                            <Button href={brand.whatsappHref} target="_blank" rel="noreferrer" variant="ghost" className="w-full">
                                Chat on WhatsApp
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

import React from 'react';
import Wordmark from './ui/Wordmark';
import { RegMark } from './ui/CropMarks';
import { brand, footer } from '../content/site';
import { socialLinks } from '../config/socialLinks';

export default function Footer() {
    return (
        <footer className="bg-ink text-paper">
            <div className="mx-auto max-w-shell px-5 pb-10 pt-16 md:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Wordmark variant="full" invert />
                        <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-paper-3">{footer.blurb}</p>
                        <ul className="mt-6 flex gap-2">
                            {socialLinks.map((s) => (
                                <li key={s.name}>
                                    <a
                                        href={s.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.name}
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-paper-3 transition-colors hover:border-paper hover:text-paper"
                                    >
                                        {s.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {footer.columns.map((col) => (
                        <div key={col.title} className="md:col-span-2">
                            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper/50">{col.title}</p>
                            <ul className="mt-4 space-y-2.5">
                                {col.links.map((l) => (
                                    <li key={l.label}>
                                        <a href={l.href} className="text-[15px] text-paper-3 transition-colors hover:text-paper">{l.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="md:col-span-3">
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper/50">Contact</p>
                        <ul className="mt-4 space-y-2.5 text-[15px] text-paper-3">
                            <li><a href={`mailto:${brand.email}`} className="hover:text-paper">{brand.email}</a></li>
                            <li><a href={brand.phoneHref} className="hover:text-paper">{brand.phone}</a></li>
                            <li><a href={brand.whatsappHref} target="_blank" rel="noreferrer" className="hover:text-paper">WhatsApp {brand.whatsapp}</a></li>
                            <li>{brand.city}</li>
                            <li className="font-mono text-[12px] text-paper/60">{brand.hours}</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-4 border-t border-paper/15 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50 md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
                    <p className="flex items-center gap-3">
                        <RegMark size={16} className="text-paper/40" />
                        Sublimation · DTF · Colombo
                    </p>
                </div>
            </div>
        </footer>
    );
}

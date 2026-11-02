import React from 'react';
import { brand } from '../../content/site';

/**
 * The original MawPrint logo files, unchanged:
 *  - header uses /assets/img/maw.png (icon), as before
 *  - footer uses /assets/img/maw full.png (full wordmark), as before
 */
export default function Wordmark({ className = '', variant = 'icon', invert = false }) {
    const full = variant === 'full';
    return (
        <a href="#top" className={`inline-flex items-center gap-3 ${className}`} aria-label={`${brand.name} — home`}>
            {full ? (
                <span className={`inline-flex items-center rounded-[4px] px-2.5 py-1.5 ${invert ? 'bg-white' : ''}`}>
                    <img src="/assets/img/maw full.png" alt="M.A.W. Printing" className="h-8 w-auto" width="263" height="38" />
                </span>
            ) : (
                <>
                    <img src="/assets/img/maw.png" alt="" className="h-9 w-auto object-contain" width="57" height="31" />
                    <span className={`font-display text-[21px] leading-none tracking-tight ${invert ? 'text-paper' : 'text-ink'}`}>
                        Maw<span className="italic font-light">Print</span>
                    </span>
                </>
            )}
        </a>
    );
}

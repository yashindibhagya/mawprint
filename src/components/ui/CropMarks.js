import React from 'react';

/**
 * Printer's crop marks — the site's visual signature.
 * Absolutely positioned inside a `relative` parent.
 */
export default function CropMarks({ className = '', color = 'currentColor', size = 14, inset = 10 }) {
    const s = size;
    const Mark = ({ pos }) => {
        const style = {
            position: 'absolute',
            width: s,
            height: s,
            ...(pos.includes('t') ? { top: -inset } : { bottom: -inset }),
            ...(pos.includes('l') ? { left: -inset } : { right: -inset }),
        };
        const flipX = pos.includes('r') ? -1 : 1;
        const flipY = pos.includes('b') ? -1 : 1;
        return (
            <svg style={style} viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <g transform={`translate(${flipX < 0 ? 14 : 0} ${flipY < 0 ? 14 : 0}) scale(${flipX} ${flipY})`}>
                    <path d="M0 9H9V0" stroke={color} strokeWidth="1" />
                </g>
            </svg>
        );
    };
    return (
        <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
            <Mark pos="tl" /><Mark pos="tr" /><Mark pos="bl" /><Mark pos="br" />
        </div>
    );
}

/** Registration mark (circle + crosshair), for decorative corners. */
export function RegMark({ className = '', size = 22 }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1" />
            <path d="M11 0v22M0 11h22" stroke="currentColor" strokeWidth="1" />
        </svg>
    );
}

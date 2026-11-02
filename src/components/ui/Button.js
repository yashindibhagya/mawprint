import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const base = 'group inline-flex items-center justify-center gap-2 rounded-full font-medium text-[15px] transition-all duration-200 ease-out select-none min-h-[48px] px-6 cursor-pointer';

const variants = {
    primary: 'bg-ink text-paper hover:bg-red hover:text-white active:scale-[0.98]',
    red: 'bg-red text-white hover:bg-red-deep active:scale-[0.98]',
    ghost: 'bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink/[0.03]',
    paper: 'bg-paper text-ink hover:bg-white',
};

export default function Button({ as = 'a', variant = 'primary', arrow = false, className = '', children, ...rest }) {
    const Tag = as;
    return (
        <Tag className={`${base} ${variants[variant]} ${className}`} {...rest}>
            <span>{children}</span>
            {arrow && (
                <ArrowUpRight
                    size={18}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                />
            )}
        </Tag>
    );
}

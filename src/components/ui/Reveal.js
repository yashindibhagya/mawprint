import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fade-and-rise on scroll. Renders final state immediately under reduced motion.
 */
export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div', once = true, ...rest }) {
    const reduce = useReducedMotion();
    const Tag = motion[as] || motion.div;
    return (
        <Tag
            className={className}
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            {...rest}
        >
            {children}
        </Tag>
    );
}

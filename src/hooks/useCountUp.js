import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/** Counts from 0 to `target` once the element scrolls into view. */
export default function useCountUp(target, duration = 1400) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
    const reduce = useReducedMotion();
    const [value, setValue] = useState(reduce ? target : 0);

    useEffect(() => {
        if (!inView) return;
        if (reduce) { setValue(target); return; }
        let raf;
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(target * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, target, duration, reduce]);

    return [ref, value];
}

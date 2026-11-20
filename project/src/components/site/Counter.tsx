import { useEffect, useRef, useState } from "react";

export default function Counter({ to, suffix = "", prefix = "", duration = 1800, decimals = 0 }: { to: number; suffix?: string; prefix?: string; duration?: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

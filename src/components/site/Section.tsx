import { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold uppercase tracking-widest">
      <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> {children}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-12 reveal`}>
      {eyebrow && <div className="mb-4 flex justify-center"><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-[1.1]">{title}</h2>
      {subtitle && <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode }) {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,hsl(var(--primary-glow)/0.5),transparent_45%),radial-gradient(circle_at_80%_70%,hsl(var(--secondary)/0.45),transparent_50%)]" />
      <div className="container relative py-24 md:py-32 max-w-4xl text-center">
        {eyebrow && <div className="mb-5 flex justify-center"><span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs uppercase tracking-widest font-semibold">{eyebrow}</span></div>}
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] animate-fade-in">{title}</h1>
        {subtitle && <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 animate-fade-in" style={{ animationDelay: "120ms" }}>{subtitle}</p>}
      </div>
    </section>
  );
}

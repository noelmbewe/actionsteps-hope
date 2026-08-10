import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { CheckCircle2, Quote } from "lucide-react";
import { ascendTestimonies } from "@/data/testimonies";

const pillars = [
  "Monthly Sessions",
  "Sobriety Accountability",
  "Community ",
  "Drug Testing",
  "Court Reviews",
];

const timeline = [
  "Monthly aftercare meetings",
  "Monthly individual session to check-in",
  'Share recovery story in "Landing Group" to new participants',
  "Continued drug testing at the lab",
  "Attend required court reviews",
];

export default function Ascend() {
  return (
    <Layout>
      <PageHero eyebrow="ASCEND Aftercare" title={<>10 months that make recovery <span className="text-secondary">stick</span>.</>} subtitle="Aftercare is where lasting change is built. Monthly sessions, accountability, mentorship, and court reviews keep graduates rising." />

      <section className="py-24">
        <div className="container max-w-5xl">
          <SectionHeader eyebrow="What's Included" title={<>The <span className="text-gradient">5 pillars</span> of ASCEND.</>} />
          <div className="grid md:grid-cols-5 gap-4">
            {pillars.map((p, i) => (
              <div key={p} className="reveal bg-gradient-hero text-primary-foreground rounded-2xl p-5 text-center shadow-elegant" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="font-display text-lg font-semibold">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-soft">
        <div className="container max-w-3xl">
          <SectionHeader eyebrow="Aftercare Timeline" title={<>Your <span className="text-gradient">aftercare</span> journey.</>} />
          <div className="mt-10 space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="reveal bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-elegant transition flex items-start gap-3" style={{ transitionDelay: `${i * 60}ms` }}>
                <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIES */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_30%,hsl(var(--primary-glow)/0.5),transparent_45%),radial-gradient(circle_at_80%_70%,hsl(var(--secondary)/0.4),transparent_50%)]" />
        <div className="container relative max-w-4xl">
          <div className="text-center reveal">
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs uppercase tracking-widest font-semibold">Voices of ASCEND</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold leading-[1.1]">Aftercare that <span className="text-secondary">sticks</span>.</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {ascendTestimonies.map((s, i) => (
              <div key={i} className="reveal bg-white/10 border border-white/15 rounded-2xl p-8 backdrop-blur" style={{ transitionDelay: `${i * 60}ms` }}>
                <Quote className="h-8 w-8 text-secondary" />
                <p className="mt-4 text-primary-foreground/90 leading-relaxed">"{s.quote}"</p>
                <div className="mt-6 pt-5 border-t border-white/15">
                  <div className="font-semibold text-secondary">{s.name}</div>
                  <div className="text-sm text-primary-foreground/70">{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

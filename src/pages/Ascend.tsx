import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { CheckCircle2 } from "lucide-react";

const months = [
  "Welcome back: alumni reconnection + sobriety check-in",
  "Trauma & resilience workshop + drug test",
  "Family wellness session + court review",
  "Career advancement: resumes, raises, promotions",
  "Financial wellness: budgeting, savings, credit",
  "Mentorship pairing: become a mentor for a Level 1",
  "Mental health deep-dive + community service",
  "Healthy relationships workshop + drug test",
  "Long-term planning: education, housing, family",
  "Graduation: ASCEND Alumni Council induction",
];

export default function Ascend() {
  return (
    <Layout>
      <PageHero eyebrow="ASCEND Aftercare" title={<>10 months that make recovery <span className="text-secondary">stick</span>.</>} subtitle="Aftercare is where lasting change is built. Monthly sessions, accountability, mentorship, and court reviews keep graduates rising." />

      <section className="py-24">
        <div className="container max-w-5xl">
          <SectionHeader eyebrow="What's Included" title={<>The <span className="text-gradient">5 pillars</span> of ASCEND.</>} />
          <div className="grid md:grid-cols-5 gap-4">
            {[
              "Monthly Sessions",
              "Sobriety Accountability",
              "Community Mentorship",
              "Drug Testing",
              "Court Reviews",
            ].map((p, i) => (
              <div key={p} className="reveal bg-gradient-hero text-primary-foreground rounded-2xl p-5 text-center shadow-elegant" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="font-display text-lg font-semibold">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-soft">
        <div className="container max-w-3xl">
          <SectionHeader eyebrow="10-Month Journey" title={<>Month-by-month <span className="text-gradient">aftercare</span>.</>} />
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-3 md:left-5 top-2 bottom-2 w-1 bg-gradient-swoosh rounded-full" />
            {months.map((m, i) => (
              <div key={i} className="reveal relative pb-8 last:pb-0" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="absolute -left-6 md:-left-8 top-1 h-7 w-7 rounded-full bg-gradient-hero text-white text-xs font-bold font-display flex items-center justify-center shadow-soft border-2 border-background">{i + 1}</div>
                <div className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-elegant transition">
                  <div className="text-xs uppercase tracking-widest text-secondary font-semibold">Month {i + 1}</div>
                  <div className="mt-1 text-foreground flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />{m}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

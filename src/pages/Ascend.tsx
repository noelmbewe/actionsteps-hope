import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { CheckCircle2 } from "lucide-react";

const pillars = [
  "Monthly Sessions",
  "Sobriety Accountability",
  "Community Mentorship",
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
    </Layout>
  );
}

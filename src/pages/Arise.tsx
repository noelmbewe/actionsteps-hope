import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { CheckCircle2, FileText, Briefcase, Home, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const eligibility = [
  "Non-violent felony or misdemeanor charges related to substance use",
  "Drug court, diversion, or DA referral",
  "Adults committed to long-term recovery",
  "Tulsa County and surrounding areas",
];
const services = [
  { icon: FileText, title: "Curriculum & Counseling", desc: "Group + individual therapy, trauma-informed care, relapse prevention." },
  { icon: Users, title: "Case Management", desc: "Personalized roadmap with weekly check-ins and accountability." },
  { icon: Home, title: "Housing Support", desc: "Connections to safe, sober housing for stability from day one." },
  { icon: Briefcase, title: "Employment Support", desc: "Job-readiness training, placement, and employer partnerships." },
  { icon: ShieldCheck, title: "Drug Testing & Compliance", desc: "Regular testing with court-quality reporting." },
  { icon: CheckCircle2, title: "Court Liaison", desc: "Direct communication with courts and probation throughout." },
];
const levels = [
  { name: "Level 1", title: "Stabilization", duration: "Months 1–3", points: ["Intake & assessment", "Daily group therapy", "Crisis stabilization", "Safe housing placement"] },
  { name: "Level 2", title: "Foundation", duration: "Months 4–6", points: ["Trauma-informed therapy", "Peer support groups", "Family reunification work", "Employment prep"] },
  { name: "Level 3", title: "Growth", duration: "Months 7–10", points: ["Active employment", "Financial literacy", "Relapse prevention", "Mentorship"] },
  { name: "Level 4", title: "Reintegration", duration: "Months 11–14", points: ["Independent living", "Community leadership", "Court completion", "Graduation"] },
  { name: "ASCEND", title: "Aftercare", duration: "10 months", points: ["Monthly sessions", "Continued accountability", "Alumni community"] },
];

export default function Arise() {
  return (
    <Layout>
      <PageHero eyebrow="ARISE Program" title={<>A 14-month path from <span className="text-secondary">charges</span> to <span className="text-secondary">freedom</span>.</>} subtitle="Comprehensive criminal justice diversion combining recovery, accountability, housing, and employment — with court-recognized outcomes." />

      <section className="py-24">
        <div className="container grid lg:grid-cols-2 gap-12">
          <div className="reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">Who is ARISE for?</h2>
            <p className="mt-4 text-muted-foreground text-lg">ARISE serves adults with criminal charges who are ready to commit to lasting change.</p>
            <ul className="mt-6 space-y-3">
              {eligibility.map((e) => (
                <li key={e} className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" /><span>{e}</span></li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg" className="mt-8"><Link to="/contact">How to Enroll <ArrowRight /></Link></Button>
          </div>
          <div className="reveal bg-gradient-hero text-primary-foreground rounded-3xl p-10 shadow-elegant">
            <h3 className="font-display text-2xl font-bold">Why ARISE works</h3>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div><div className="font-display text-4xl font-bold text-secondary">6%</div><div className="text-sm opacity-80 mt-1">Recidivism (vs 23% state avg)</div></div>
              <div><div className="font-display text-4xl font-bold text-secondary">14mo</div><div className="text-sm opacity-80 mt-1">Total program length</div></div>
              <div><div className="font-display text-4xl font-bold text-secondary">100%</div><div className="text-sm opacity-80 mt-1">Housed at completion</div></div>
              <div><div className="font-display text-4xl font-bold text-secondary">100%</div><div className="text-sm opacity-80 mt-1">Employed at completion</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-soft">
        <div className="container">
          <SectionHeader eyebrow="Services Offered" title={<>Wraparound care, all under <span className="text-gradient">one roof</span>.</>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="reveal bg-card border border-border rounded-2xl p-7 hover:shadow-elegant hover:-translate-y-1 transition">
                <div className="h-12 w-12 rounded-xl bg-gradient-swoosh text-white flex items-center justify-center"><s.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-display text-xl font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <SectionHeader eyebrow="Program Timeline" title={<>The <span className="text-gradient">4 levels</span> + ASCEND aftercare.</>} subtitle="Progressive milestones build skills, community, and confidence — every step measurable." />

          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-9 h-1 bg-gradient-swoosh rounded-full" />
            <div className="grid md:grid-cols-5 gap-6">
              {levels.map((l, i) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="relative flex items-center justify-center">
                    <div className="h-18 w-18 rounded-full bg-gradient-hero text-white font-display font-bold text-lg flex items-center justify-center shadow-elegant border-4 border-background w-18 h-18 p-5">
                      {i + 1}
                    </div>
                  </div>
                  <div className="mt-4 bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-elegant transition">
                    <div className="text-xs uppercase tracking-widest font-semibold text-secondary">{l.name}</div>
                    <div className="font-display text-lg font-bold text-primary mt-1">{l.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{l.duration}</div>
                    <ul className="mt-3 space-y-1.5">
                      {l.points.map((p) => (
                        <li key={p} className="text-xs text-foreground/80 flex gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-secondary mt-0.5 shrink-0" />{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

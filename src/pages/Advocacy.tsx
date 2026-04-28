import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Megaphone, FileDown, Newspaper, DollarSign, ArrowRight } from "lucide-react";

const releases = [
  { date: "March 2026", title: "ActionSteps Graduates Save Oklahoma $9.1M Annually", tag: "Press Release" },
  { date: "January 2026", title: "Tulsa Diversion Model Featured in National Reform Report", tag: "Press" },
  { date: "November 2025", title: "ActionSteps Reaches 200 Active Clients Milestone", tag: "News" },
];

export default function Advocacy() {
  return (
    <Layout>
      <PageHero eyebrow="Legislative Advocacy" title={<>Smart on crime. <span className="text-secondary">Strong on outcomes.</span></>} subtitle="We work alongside legislators, judges, and community leaders to expand evidence-based diversion across Oklahoma." />

      <section className="py-24">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            { icon: Megaphone, title: "Contact Legislators", desc: "Make your voice heard. Use our toolkit to reach Oklahoma representatives.", cta: "Open Toolkit" },
            { icon: FileDown, title: "Download Reports", desc: "Annual impact reports, recidivism studies, and fiscal analyses.", cta: "Download" },
            { icon: DollarSign, title: "State Savings Data", desc: "Detailed cost-benefit analysis comparing diversion vs incarceration.", cta: "View Data" },
          ].map((c, i) => (
            <div key={i} className="reveal bg-card border border-border rounded-2xl p-7 hover:shadow-elegant transition" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="h-12 w-12 rounded-xl bg-gradient-swoosh text-white flex items-center justify-center"><c.icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-display text-xl font-bold text-primary">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <Button variant="outline" className="mt-5 rounded-full">{c.cta} <ArrowRight className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gradient-soft">
        <div className="container max-w-4xl">
          <SectionHeader eyebrow="Press Room" title={<>Latest <span className="text-gradient">news & releases</span>.</>} />
          <div className="space-y-4">
            {releases.map((r, i) => (
              <div key={i} className="reveal bg-card border border-border rounded-2xl p-6 flex items-center justify-between gap-4 hover:shadow-elegant transition">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent text-primary flex items-center justify-center"><Newspaper className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-secondary font-semibold">{r.tag} · {r.date}</div>
                    <div className="font-display text-lg font-bold text-primary mt-1">{r.title}</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

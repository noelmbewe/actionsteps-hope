import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import Counter from "@/components/site/Counter";
import { TrendingDown, DollarSign, Home, Briefcase, Brain, Shield } from "lucide-react";

const bigStats = [
  { icon: TrendingDown, label: "Recidivism Rate", value: 6, suffix: "%", desc: "vs 23% Oklahoma state average" },
  { icon: DollarSign, label: "Estimated State Savings", value: 9.1, suffix: "M+", prefix: "$", decimals: 1, desc: "Reduced incarceration & recidivism costs" },
  { icon: Home, label: "Safe Housing", value: 100, suffix: "%", desc: "Of program completers" },
  { icon: Briefcase, label: "Employed at Completion", value: 100, suffix: "%", desc: "Stable jobs, real wages" },
];

export default function Impact() {
  return (
    <Layout>
      <PageHero eyebrow="Our Impact" title={<>The <span className="text-secondary">data</span> tells a story Oklahoma can't ignore.</>} subtitle="Evidence-based diversion isn't just compassionate — it's the most fiscally responsible public safety investment Oklahoma can make." />

      <section className="py-24">
        <div className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bigStats.map((s, i) => (
            <div key={i} className="reveal bg-card border border-border rounded-2xl p-7 shadow-soft hover:shadow-elegant transition" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="h-12 w-12 rounded-xl bg-gradient-swoosh text-white flex items-center justify-center"><s.icon className="h-5 w-5" /></div>
              <div className="mt-5 font-display text-5xl font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals || 0} />
              </div>
              <div className="mt-2 font-semibold text-primary">{s.label}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recidivism comparison bar */}
      <section className="py-24 bg-gradient-soft">
        <div className="container max-w-4xl">
          <SectionHeader eyebrow="Recidivism Comparison" title={<>A <span className="text-gradient">4x improvement</span> over the state average.</>} subtitle="When people complete ARISE + ASCEND, they don't come back through the justice system." />

          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-elegant border border-border reveal">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="font-semibold">ActionSteps Graduates</div>
                  <div className="font-display text-2xl font-bold text-secondary">6%</div>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-swoosh rounded-full transition-all duration-1000" style={{ width: "6%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="font-semibold text-muted-foreground">Oklahoma State Average</div>
                  <div className="font-display text-2xl font-bold text-foreground/70">23%</div>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-foreground/40 rounded-full transition-all duration-1000" style={{ width: "23%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="font-semibold text-muted-foreground">National Average</div>
                  <div className="font-display text-2xl font-bold text-foreground/70">44%</div>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-foreground/30 rounded-full transition-all duration-1000" style={{ width: "44%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container grid md:grid-cols-2 gap-8">
          <div className="reveal bg-gradient-hero text-primary-foreground rounded-3xl p-10 shadow-elegant">
            <Brain className="h-10 w-10 text-secondary" />
            <h3 className="mt-4 font-display text-3xl font-bold">ACE Trauma Reality</h3>
            <p className="mt-3 text-primary-foreground/85">Over 80% of our clients report 4+ Adverse Childhood Experiences. Trauma-informed care is non-negotiable for sustainable recovery.</p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div><div className="font-display text-4xl font-bold text-secondary"><Counter to={80} suffix="%" /></div><div className="text-xs opacity-80">4+ ACE scores</div></div>
              <div><div className="font-display text-4xl font-bold text-secondary"><Counter to={92} suffix="%" /></div><div className="text-xs opacity-80">Trauma history</div></div>
              <div><div className="font-display text-4xl font-bold text-secondary"><Counter to={68} suffix="%" /></div><div className="text-xs opacity-80">Co-occurring MH</div></div>
            </div>
          </div>
          <div className="reveal bg-card border border-border rounded-3xl p-10 shadow-soft">
            <Shield className="h-10 w-10 text-primary" />
            <h3 className="mt-4 font-display text-3xl font-bold text-primary">Violent vs Non-Violent</h3>
            <p className="mt-3 text-muted-foreground">ARISE graduates show dramatic reductions in both violent and non-violent re-offense rates compared to traditional incarceration outcomes.</p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1"><span>Violent re-offense</span><span className="font-bold text-secondary">2%</span></div>
                <div className="h-3 bg-muted rounded-full overflow-hidden"><div className="h-full bg-gradient-swoosh" style={{ width: "2%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span>Non-violent re-offense</span><span className="font-bold text-secondary">4%</span></div>
                <div className="h-3 bg-muted rounded-full overflow-hidden"><div className="h-full bg-gradient-swoosh" style={{ width: "4%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-muted-foreground"><span>State avg total</span><span className="font-bold">23%</span></div>
                <div className="h-3 bg-muted rounded-full overflow-hidden"><div className="h-full bg-foreground/40" style={{ width: "23%" }} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

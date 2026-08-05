import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import Counter from "@/components/site/Counter";
import { TrendingDown, DollarSign, Home, Briefcase, Brain, Shield, Users, GraduationCap, ArrowRight } from "lucide-react";

const bigStats = [
  { icon: TrendingDown, label: "Recidivism Rate", value: 6, suffix: "%", desc: "vs 23% Oklahoma state average" },
  { icon: DollarSign, label: "Taxpayer Savings", value: 9.1, suffix: "M+", prefix: "$", decimals: 1, desc: "In estimated state savings from reduced incarceration costs" },
  { icon: Home, label: "Safe Housing", value: 100, suffix: "%", desc: "Of program completers housed at completion" },
  { icon: Briefcase, label: "Employed at Completion", value: 100, suffix: "%", desc: "Stable jobs, real wages" },
];

const violentCharges = [
  { label: "Trafficking Drugs", percent: 25 },
  { label: "Domestic A&B", percent: 13.3 },
  { label: "Eluding Police", percent: 11.7 },
  { label: "Poss. of Firearm in Commission of Felony", percent: 11.7 },
  { label: "Burglary 1st Degree", percent: 8.3 },
  { label: "Robbery", percent: 8.3 },
  { label: "A&B on Police", percent: 6.7 },
  { label: "Pointing Firearm", percent: 3.3 },
  { label: "Unauthorized Use of Vehicle", percent: 2.9 },
  { label: "Other", percent: 8.8 },
];

const nonViolentCharges = [
  { label: "Poss. of Firearm AFCF", percent: 16.4 },
  { label: "Burglary", percent: 14.9 },
  { label: "DUI", percent: 11.2 },
  { label: "Stolen Vehicle", percent: 10.4 },
  { label: "Poss. of Drug", percent: 8.2 },
  { label: "Larceny", percent: 8.2 },
  { label: "Identity Theft", percent: 3.7 },
  { label: "Poss. of Firearm While Under Supervision", percent: 3.6 },
  { label: "Threaten Violence", percent: 2.2 },
  { label: "False Pretense", percent: 2.2 },
  { label: "Other", percent: 19 },
];

const ageDistribution = [
  { range: "19–28", percent: 21.7 },
  { range: "29–40", percent: 50.9 },
  { range: "41–50", percent: 18.3 },
  { range: "51+", percent: 9.1 },
];

const educationLevels = [
  { label: "No Diploma/GED", percent: 37.9 },
  { label: "GED", percent: 24.1 },
  { label: "GED in Prison", percent: 23 },
  { label: "High School Diploma", percent: 14.9 },
];

export default function Impact() {
  return (
    <Layout>
      <PageHero eyebrow="Our Impact" title={<>The <span className="text-secondary">data</span> tells a story Oklahoma can't ignore.</>} subtitle="Evidence-based diversion isn't just compassionate — it's the most fiscally responsible public safety investment Oklahoma can make." />

      {/* Big Stats */}
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

      {/* Recidivism Comparison */}
      <section className="py-24 bg-gradient-soft">
        <div className="container max-w-4xl">
          <SectionHeader eyebrow="Recidivism Comparison" title={<>A <span className="text-gradient">4x improvement</span> over the state average.</>} subtitle="When people complete ARISE + ASCEND, they don't come back through the justice system." />

          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-elegant border border-border reveal">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="font-semibold">ARISE Program</div>
                  <div className="font-display text-2xl font-bold text-secondary">6%</div>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-swoosh rounded-full transition-all duration-1000" style={{ width: "6%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="font-semibold text-muted-foreground">Drug Court</div>
                  <div className="font-display text-2xl font-bold text-foreground/70">8%</div>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-foreground/40 rounded-full transition-all duration-1000" style={{ width: "8%" }} />
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
            </div>
            <p className="mt-6 text-xs text-muted-foreground">*Relapse into criminal behavior, reoffending</p>
          </div>
        </div>
      </section>

      {/* Violent Charges Analysis */}
      <section className="py-24">
        <div className="container">
          <SectionHeader eyebrow="Violent Charges" title={<>Serving those the system <span className="text-gradient">calls hardest</span>.</>} subtitle="ARISE is one of the few treatment options available for those charged with violent offenses. Many deal with co-occurring disorders — substance abuse and mental health." />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Violent charges breakdown */}
            <div className="reveal bg-card border border-border rounded-3xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-secondary" />
                <div>
                  <h3 className="font-display text-xl font-bold text-primary">Violent Charges</h3>
                  <p className="text-sm text-muted-foreground">60 total violent charges across completers</p>
                </div>
              </div>
              <div className="space-y-3">
                {violentCharges.map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground/80">{c.label}</span>
                      <span className="font-bold text-secondary">{c.percent}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-swoosh rounded-full" style={{ width: `${c.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-violent charges breakdown */}
            <div className="reveal bg-card border border-border rounded-3xl p-8 shadow-soft" style={{ transitionDelay: "100ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-display text-xl font-bold text-primary">Non-Violent Charges</h3>
                  <p className="text-sm text-muted-foreground">Substance-related and property offenses</p>
                </div>
              </div>
              <div className="space-y-3">
                {nonViolentCharges.map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground/80">{c.label}</span>
                      <span className="font-bold text-secondary">{c.percent}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-swoosh rounded-full" style={{ width: `${c.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key stats */}
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="reveal bg-gradient-hero text-primary-foreground rounded-3xl p-8 text-center shadow-elegant">
              <div className="font-display text-5xl font-bold text-secondary"><Counter to={3} suffix="%" /></div>
              <div className="mt-2 font-semibold">Violent Reoffense Rate</div>
              <div className="text-sm text-primary-foreground/80 mt-1">After completing ARISE</div>
            </div>
            <div className="reveal bg-card border border-border rounded-3xl p-8 text-center shadow-soft" style={{ transitionDelay: "60ms" }}>
              <div className="font-display text-5xl font-bold text-gradient">30%</div>
              <div className="mt-2 font-semibold text-primary">Never Had Prior Treatment</div>
              <div className="text-sm text-muted-foreground mt-1">Of violent offenders in ARISE</div>
            </div>
            <div className="reveal bg-card border border-border rounded-3xl p-8 text-center shadow-soft" style={{ transitionDelay: "120ms" }}>
              <div className="font-display text-5xl font-bold text-gradient">5.4</div>
              <div className="mt-2 font-semibold text-primary">Avg. Years Sentenced</div>
              <div className="text-sm text-muted-foreground mt-1">Median: 5 years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Housing & Employment Transformation */}
      <section className="py-24 bg-gradient-soft">
        <div className="container max-w-5xl">
          <SectionHeader eyebrow="Transformation" title={<>From homeless to <span className="text-gradient">home</span>. From unemployed to <span className="text-gradient">employed</span>.</>} subtitle="Many entering ARISE are homeless due to unsafe living options and lack of finances. The program has been 100% successful in helping every completer secure housing and a job." />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Housing */}
            <div className="reveal bg-card border border-border rounded-3xl p-8 shadow-soft">
              <Home className="h-10 w-10 text-secondary" />
              <h3 className="mt-4 font-display text-2xl font-bold text-primary">Housing</h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-destructive/10 rounded-2xl p-5 text-center">
                  <div className="font-display text-4xl font-bold text-destructive"><Counter to={100} suffix="%" /></div>
                  <div className="text-sm font-semibold mt-1">Homeless at Entry</div>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-5 text-center">
                  <div className="font-display text-4xl font-bold text-secondary"><Counter to={100} suffix="%" /></div>
                  <div className="text-sm font-semibold mt-1">Housed at Completion</div>
                </div>
              </div>
            </div>

            {/* Employment */}
            <div className="reveal bg-card border border-border rounded-3xl p-8 shadow-soft" style={{ transitionDelay: "100ms" }}>
              <Briefcase className="h-10 w-10 text-secondary" />
              <h3 className="mt-4 font-display text-2xl font-bold text-primary">Employment</h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-destructive/10 rounded-2xl p-5 text-center">
                  <div className="font-display text-4xl font-bold text-destructive"><Counter to={73} suffix="%" /></div>
                  <div className="text-sm font-semibold mt-1">Unemployed at Entry</div>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-5 text-center">
                  <div className="font-display text-4xl font-bold text-secondary"><Counter to={100} suffix="%" /></div>
                  <div className="text-sm font-semibold mt-1">Employed at Completion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACE Trauma Data */}
      <section className="py-24">
        <div className="container max-w-5xl">
          <SectionHeader eyebrow="Adverse Childhood Experiences" title={<>Trauma is at the root of <span className="text-gradient">addiction</span>.</>} subtitle="The ACE Questionnaire measures childhood trauma. People with 5+ ACEs are 7 to 10 times more likely to report drug use problems and addiction." />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* ACE Comparison */}
            <div className="reveal bg-gradient-hero text-primary-foreground rounded-3xl p-10 shadow-elegant">
              <Brain className="h-10 w-10 text-secondary" />
              <h3 className="mt-4 font-display text-3xl font-bold">ACE Score {'>'} 5</h3>
              <p className="mt-3 text-primary-foreground/85">1 in 3 ARISE completers had significant childhood trauma — nearly double the Oklahoma average.</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-5 text-center">
                  <div className="font-display text-4xl font-bold text-secondary"><Counter to={18.3} suffix="%" decimals={1} /></div>
                  <div className="text-xs opacity-80 mt-1">Oklahoma Population</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 text-center">
                  <div className="font-display text-4xl font-bold text-secondary"><Counter to={33} suffix="%" /></div>
                  <div className="text-xs opacity-80 mt-1">ARISE Completers</div>
                </div>
              </div>
            </div>

            {/* ACE Risk Factors */}
            <div className="reveal bg-card border border-border rounded-3xl p-10 shadow-soft" style={{ transitionDelay: "100ms" }}>
              <h3 className="font-display text-2xl font-bold text-primary">What ACE Measures</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  "Emotional abuse",
                  "Physical abuse",
                  "Sexual abuse",
                  "Emotional neglect",
                  "Physical neglect",
                  "Parental separation/divorce",
                  "Household physical violence",
                  "Household substance abuse",
                  "Household mental illness",
                  "Incarcerated household member",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground">Compared with people with 0 ACEs, those with 5+ were <span className="font-bold text-primary">7 to 10 times</span> more likely to report illicit drug use and addiction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Savings */}
      <section className="py-24 bg-gradient-soft">
        <div className="container max-w-5xl">
          <SectionHeader eyebrow="Counting the Cost" title={<>Every dollar invested returns <span className="text-gradient">$7+ to taxpayers</span>.</>} subtitle="The ARISE program has saved the state an estimated $9.1 million through reduced incarceration costs." />

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cost per person */}
            <div className="reveal bg-card border border-border rounded-3xl p-8 shadow-soft text-center">
              <DollarSign className="h-10 w-10 text-secondary mx-auto" />
              <h3 className="mt-4 font-display text-xl font-bold text-primary">Cost Per Person / Year</h3>
              <div className="mt-6 space-y-4">
                <div className="bg-destructive/10 rounded-2xl p-4">
                  <div className="font-display text-3xl font-bold text-destructive">$24,269</div>
                  <div className="text-xs font-semibold mt-1">Incarceration</div>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-4">
                  <div className="font-display text-3xl font-bold text-secondary">$9,000</div>
                  <div className="text-xs font-semibold mt-1">ARISE Program</div>
                </div>
              </div>
            </div>

            {/* 177 Completers */}
            <div className="reveal bg-card border border-border rounded-3xl p-8 shadow-soft text-center" style={{ transitionDelay: "60ms" }}>
              <Users className="h-10 w-10 text-secondary mx-auto" />
              <h3 className="mt-4 font-display text-xl font-bold text-primary">177 ARISE Completers</h3>
              <div className="mt-6 space-y-4">
                <div className="bg-destructive/10 rounded-2xl p-4">
                  <div className="font-display text-3xl font-bold text-destructive">$20.6M</div>
                  <div className="text-xs font-semibold mt-1">Would Have Cost in Prison</div>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-4">
                  <div className="font-display text-3xl font-bold text-secondary">$1.7M</div>
                  <div className="text-xs font-semibold mt-1">Actual ARISE Cost</div>
                </div>
              </div>
            </div>

            {/* Total savings */}
            <div className="reveal bg-gradient-hero text-primary-foreground rounded-3xl p-8 shadow-elegant text-center" style={{ transitionDelay: "120ms" }}>
              <TrendingDown className="h-10 w-10 text-secondary mx-auto" />
              <h3 className="mt-4 font-display text-xl font-bold">Total State Savings</h3>
              <div className="mt-6">
                <div className="font-display text-5xl font-bold text-secondary">$9.1M – $18.9M</div>
                <div className="text-sm text-primary-foreground/80 mt-2">Depending on sentence percentage served</div>
              </div>
              <div className="mt-6 bg-white/10 rounded-2xl p-4">
                <div className="text-sm opacity-80">Total years sentenced</div>
                <div className="font-display text-2xl font-bold">848 years</div>
                <div className="text-sm opacity-80 mt-2">If served 52% of sentence</div>
                <div className="font-display text-2xl font-bold">445 years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demographics */}
      <section className="py-24">
        <div className="container max-w-5xl">
          <SectionHeader eyebrow="Demographics" title={<>Who <span className="text-gradient">completes</span> ARISE.</>} />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Age Distribution */}
            <div className="reveal bg-card border border-border rounded-3xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-8 w-8 text-secondary" />
                <h3 className="font-display text-xl font-bold text-primary">Age Distribution</h3>
              </div>
              <div className="space-y-4">
                {ageDistribution.map((a, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold">{a.range}</span>
                      <span className="text-secondary font-bold">{a.percent}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-swoosh rounded-full" style={{ width: `${a.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Levels */}
            <div className="reveal bg-card border border-border rounded-3xl p-8 shadow-soft" style={{ transitionDelay: "100ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-8 w-8 text-secondary" />
                <h3 className="font-display text-xl font-bold text-primary">Education Levels</h3>
              </div>
              <div className="space-y-4">
                {educationLevels.map((e, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold">{e.label}</span>
                      <span className="text-secondary font-bold">{e.percent}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-swoosh rounded-full" style={{ width: `${e.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

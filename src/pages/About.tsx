import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { Heart, Scale, Home, Shield, Users, Sparkles } from "lucide-react";
import recovery from "@/assets/recovery-hope.jpg";

const pillars = [
  { icon: Heart, title: "Compassion", desc: "Every person deserves dignity, support, and a real path forward." },
  { icon: Scale, title: "Justice Reform", desc: "Diversion that protects communities and reduces incarceration." },
  { icon: Home, title: "Family Restoration", desc: "Reuniting parents with children and rebuilding stable homes." },
  { icon: Shield, title: "Public Safety", desc: "Lower recidivism is the strongest crime-prevention strategy." },
  { icon: Users, title: "Community", desc: "Mentorship, peer support, and accountability that lasts." },
  { icon: Sparkles, title: "Evidence-Based", desc: "Outcomes measured, refined, and proven year after year." },
];

export default function About() {
  return (
    <Layout>
      <PageHero eyebrow="About Us" title={<>Living the <span className="text-secondary">Dream</span>.</>} subtitle="ActionSteps Counseling, Inc. is a Tulsa-based nonprofit transforming the criminal justice system one life at a time." />

      <section className="py-24">
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal relative">
            <div className="absolute -inset-4 bg-gradient-swoosh opacity-15 blur-3xl rounded-full" />
            <img src={recovery} alt="A new beginning at sunrise" loading="lazy" width={1280} height={960} className="relative rounded-3xl shadow-elegant w-full h-[480px] object-cover" />
          </div>
          <div className="reveal">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">A mission born from <span className="text-gradient">lived experience</span>.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Founded to break the cycle of addiction and incarceration in Oklahoma, ActionSteps Counseling has built one of the most effective diversion programs in the state. We pair clinical excellence with deep human connection — because data alone doesn't restore a family.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              From our home in Tulsa, we serve adults facing criminal charges related to substance use, equipping them with the tools, treatment, and community needed to thrive — and stay free.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-soft">
        <div className="container">
          <SectionHeader eyebrow="What we stand for" title={<>Six pillars of our <span className="text-gradient">approach</span>.</>} />
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="reveal bg-card border border-border rounded-2xl p-7 hover:shadow-elegant transition" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="h-12 w-12 rounded-xl bg-gradient-swoosh text-white flex items-center justify-center"><p.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-display text-xl font-bold text-primary">{p.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

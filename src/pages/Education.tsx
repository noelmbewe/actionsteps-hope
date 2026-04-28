import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { Brain, HeartPulse, Scale, Shield, Users, Home, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const topics = [
  { icon: Brain, title: "Addiction as a Brain Disease", desc: "Understand the neurobiology of substance use disorder — and why willpower alone isn't enough." },
  { icon: HeartPulse, title: "Trauma & ACE Scores", desc: "How adverse childhood experiences shape addiction risk, and why trauma-informed care matters." },
  { icon: BookOpen, title: "Myths vs Facts", desc: "Bust the most common misconceptions about recovery, relapse, and rehabilitation." },
  { icon: Scale, title: "Restorative Justice", desc: "Why diversion outperforms incarceration on every measurable outcome." },
  { icon: Shield, title: "Public Safety", desc: "Lower recidivism = safer communities. The data behind smart-on-crime policy." },
  { icon: Users, title: "Helping Loved Ones", desc: "Practical guidance for families supporting someone in recovery." },
  { icon: Home, title: "Safe Housing", desc: "Why housing stability is the #1 predictor of long-term recovery success." },
];

export default function Education() {
  return (
    <Layout>
      <PageHero eyebrow="Knowledge Center" title={<>Addiction <span className="text-secondary">Education</span> Hub.</>} subtitle="Evidence-based education for clients, families, communities, and policymakers." />
      <section className="py-24">
        <div className="container">
          <SectionHeader eyebrow="Learn" title={<>Topics that <span className="text-gradient">change minds</span>.</>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((t, i) => (
              <Link to="/contact" key={i} className="reveal group" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="h-full bg-card border border-border rounded-2xl p-7 hover:shadow-elegant hover:-translate-y-1 transition">
                  <div className="h-12 w-12 rounded-xl bg-gradient-swoosh text-white flex items-center justify-center"><t.icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 font-display text-xl font-bold text-primary">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-secondary transition">Read more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

import Layout from "@/components/site/Layout";
import { PageHero } from "@/components/site/Section";
import { Quote } from "lucide-react";

const stories = [
  { name: "Client, Age 31", role: "ARISE Graduate · Tulsa, OK", quote: "After experiencing 6 failed attempts at treatment, I have never seen or experienced such a caring, knowledgeable, and helpful staff. Through treatment I was able to get my family, job, drivers license, self-love, confidence and life back." },
  { name: "Jasmine R.", role: "ARISE Graduate · Tulsa", quote: "ActionSteps gave me back my life — and gave my children their mom back. I have a job, a home, and three years sober." },
  { name: "Marcus T.", role: "Father · ASCEND Alumni", quote: "I was facing 10 years. Today I'm a foreman with health insurance, a sponsor, and a family that trusts me again." },
  { name: "Linda H.", role: "Mother of a Graduate", quote: "I got my son back. Real, present, and healthy. I'll spend the rest of my life telling people about ActionSteps." },
  { name: "DeShawn K.", role: "ARISE Graduate", quote: "It was the first place that treated me like a human being instead of a case file. That changed everything." },
  { name: "Hon. R. Mitchell", role: "Tulsa County Court", quote: "The outcomes ActionSteps produces are unmatched. I send people there with confidence." },
  { name: "Renee M.", role: "Employer Partner", quote: "ASCEND alumni are some of my most reliable, dedicated employees. We hire from this program every year." },
];

export default function Testimonies() {
  return (
    <Layout>
      <PageHero eyebrow="Testimonies" title={<>Stories of <span className="text-secondary">Restoration</span>.</>} subtitle="Client stories and voices from program completers — behind every statistic is a person, a family, and a community that got a second chance." />
      <section className="py-24">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <div key={i} className="reveal bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-elegant transition" style={{ transitionDelay: `${i * 60}ms` }}>
              <Quote className="h-8 w-8 text-secondary" />
              <p className="mt-4 text-foreground/90 leading-relaxed">"{s.quote}"</p>
              <div className="mt-6 pt-5 border-t border-border">
                <div className="font-semibold text-primary">{s.name}</div>
                <div className="text-sm text-muted-foreground">{s.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

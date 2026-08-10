import Layout from "@/components/site/Layout";
import { PageHero } from "@/components/site/Section";
import { Quote } from "lucide-react";
import { allTestimonies as stories } from "@/data/testimonies";

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

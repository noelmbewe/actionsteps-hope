import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Megaphone, FileDown, DollarSign, ArrowRight, Calendar, Clock, User } from "lucide-react";

const posts = [
  {
    date: "March 18, 2026",
    readTime: "6 min read",
    author: "ActionSteps Policy Team",
    category: "Impact Report",
    title: "ActionSteps Graduates Save Oklahoma $9.1M Annually",
    excerpt:
      "A new independent fiscal analysis confirms what our families already know: every dollar invested in diversion returns nearly seven to taxpayers — and gives Oklahomans their lives back.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    date: "January 24, 2026",
    readTime: "4 min read",
    author: "Communications",
    category: "In The News",
    title: "Tulsa Diversion Model Featured in National Reform Report",
    excerpt:
      "The Council of State Governments highlights ARISE as one of the most effective community-based alternatives to incarceration in the nation.",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    date: "November 02, 2025",
    readTime: "3 min read",
    author: "Executive Director",
    category: "Milestone",
    title: "ActionSteps Reaches 200 Active Clients Milestone",
    excerpt:
      "Two hundred Oklahomans are right now choosing recovery over incarceration through ARISE and ASCEND. Here's what that means for our community.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    date: "September 12, 2025",
    readTime: "5 min read",
    author: "Clinical Team",
    category: "Research",
    title: "Trauma-Informed Care: Why It Works for Justice-Involved Adults",
    excerpt:
      "An inside look at the clinical framework powering our 6% recidivism rate — and why understanding trauma is the missing key in criminal justice reform.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
  },
  {
    date: "July 30, 2025",
    readTime: "4 min read",
    author: "Advocacy Team",
    category: "Legislative",
    title: "What Oklahoma's New Diversion Funding Means for Families",
    excerpt:
      "The 2025 legislative session expanded access to community-based alternatives. We break down what changed and how to take advantage of it.",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
  },
];

const featured = posts.find((p) => p.featured)!;
const rest = posts.filter((p) => !p.featured);

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
        <div className="container">
          <SectionHeader
            eyebrow="The ActionSteps Blog"
            title={<>Stories, research & <span className="text-gradient">reform insights</span>.</>}
            subtitle="Field reports from the front lines of recovery, diversion, and justice reform in Oklahoma."
          />

          {/* Featured post */}
          <article className="reveal group grid lg:grid-cols-2 gap-8 lg:gap-12 bg-card border border-border rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition mb-14">
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-5 left-5 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-3">
                {featured.category}
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-primary leading-tight">
                {featured.title}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {featured.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
              </div>
              <Button variant="hero" className="mt-7 rounded-full self-start">
                Read the full story <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </article>

          {/* Blog grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p, i) => (
              <article
                key={i}
                className="reveal group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-elegant transition"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-background/90 backdrop-blur text-primary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.excerpt}</p>
                  <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="rounded-full">
              View all articles <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

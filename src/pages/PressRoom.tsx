import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { Megaphone, ArrowRight, Calendar, Clock, User } from "lucide-react";

const pressReleases = [
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

const featured = pressReleases.find((p) => p.featured)!;
const rest = pressReleases.filter((p) => !p.featured);

export default function PressRoom() {
  return (
    <Layout>
      <PageHero eyebrow="Press Room" title={<>News & <span className="text-secondary">Press Releases</span>.</>} subtitle="Latest news, press releases, and media coverage of our advocacy work and program outcomes." />

      <section className="py-24">
        <div className="container">
          {/* Featured press release */}
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
            </div>
          </article>

          {/* Press release grid */}
          <SectionHeader
            eyebrow="All Releases"
            title={<>Latest <span className="text-gradient">news</span>.</>}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

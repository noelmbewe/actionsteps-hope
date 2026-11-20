import { useEffect, useState } from "react";
import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { Brain, HeartPulse, Scale, Shield, Users, Home, BookOpen, ArrowRight, Calendar, Newspaper, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { getArticles, type ArticleListItem } from "@/lib/api";

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
  const [articles, setArticles] = useState<ArticleListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles("Article")
      .then((res) => setArticles(res.articles))
      .catch((e) => setError(e.message || "Could not load articles."))
      .finally(() => setLoading(false));
  }, []);

  const latest = articles?.slice(0, 3) ?? [];

  return (
    <Layout>
      <PageHero eyebrow="Knowledge Center" title={<>Understanding <span className="text-secondary">Addiction</span>.</>} subtitle="Addiction Education Hub — evidence-based education for clients, families, communities, and policymakers." />

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

      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeader
              eyebrow="Articles"
              title={<>Latest <span className="text-gradient">articles</span>.</>}
            />
            <Link to="/articles" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-colors shrink-0 -mt-6 sm:mt-0">
              View all articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <RefreshCw className="h-5 w-5 animate-spin mr-3" /> Loading articles…
            </div>
          )}

          {error && !loading && (
            <div className="mx-auto max-w-xl bg-card border border-border rounded-2xl p-8 text-center shadow-soft">
              <Newspaper className="h-10 w-10 mx-auto text-secondary mb-4" />
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          )}

          {!loading && !error && latest.length === 0 && (
            <div className="mx-auto max-w-xl bg-card border border-border rounded-2xl p-10 text-center shadow-soft">
              <Newspaper className="h-10 w-10 mx-auto text-secondary mb-4" />
              <h3 className="font-display text-xl font-bold text-primary">No articles yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Check back soon for new stories and insights.</p>
            </div>
          )}

          {!loading && !error && latest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((a, i) => (
                <Link
                  key={a.id}
                  to={`/articles/${a.slug}`}
                  className="reveal group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-elegant transition"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {a.cover_image ? (
                      <img
                        src={a.cover_image}
                        alt={a.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 h-full w-full bg-gradient-swoosh" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.date}</span>
                      <span className="flex items-center gap-1">{a.author}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
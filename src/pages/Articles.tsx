import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/site/Layout";
import { PageHero } from "@/components/site/Section";
import { Calendar, User, Clock, Newspaper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticles, type ArticleListItem } from "@/lib/api";

function readTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

export default function Articles() {
  const [articles, setArticles] = useState<ArticleListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError(null);
    getArticles()
      .then((res) => setArticles(res.articles))
      .catch((e) => setError(e.message || "Could not load articles."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const featured = articles?.find((a) => a.featured === 1);
  const rest = articles?.filter((a) => a !== featured) ?? [];

  return (
    <Layout>
      <PageHero
        eyebrow="Articles"
        title={<>Insights & <span className="text-secondary">Stories</span>.</>}
        subtitle="Evidence, recovery stories, and news from the front lines of criminal justice diversion and treatment in Oklahoma."
      />

      <section className="py-24">
        <div className="container">
          {loading && (
            <div className="flex items-center justify-center py-24 text-muted-foreground">
              <RefreshCw className="h-5 w-5 animate-spin mr-3" /> Loading articles…
            </div>
          )}

          {error && !loading && (
            <div className="mx-auto max-w-xl bg-card border border-border rounded-2xl p-8 text-center shadow-soft">
              <Newspaper className="h-10 w-10 mx-auto text-secondary mb-4" />
              <h3 className="font-display text-xl font-bold text-primary">Couldn't load articles</h3>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              <Button variant="hero" className="mt-5 rounded-full" onClick={load}>
                Try again
              </Button>
            </div>
          )}

          {!loading && !error && articles && articles.length === 0 && (
            <div className="mx-auto max-w-xl bg-card border border-border rounded-2xl p-10 text-center shadow-soft">
              <Newspaper className="h-10 w-10 mx-auto text-secondary mb-4" />
              <h3 className="font-display text-xl font-bold text-primary">No articles yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Check back soon for new stories and insights.</p>
            </div>
          )}

          {!loading && !error && articles && articles.length > 0 && (
            <>
              {featured && (
                <article className="reveal group grid lg:grid-cols-2 gap-8 lg:gap-12 bg-card border border-border rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition mb-14">
                  <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                    {featured.cover_image ? (
                      <img
                        src={featured.cover_image}
                        alt={featured.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 h-full w-full bg-gradient-hero" />
                    )}
                    <span className="absolute top-5 left-5 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-3">
                      {featured.category}
                    </div>
                    <Link to={`/articles/${featured.slug}`}>
                      <h3 className="font-display text-3xl lg:text-4xl font-bold text-primary leading-tight group-hover:text-secondary transition-colors">
                        {featured.title}
                      </h3>
                    </Link>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {featured.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {readTime(featured.excerpt)}</span>
                    </div>
                  </div>
                </article>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((a, i) => (
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
                      <span className="absolute top-4 left-4 bg-background/90 backdrop-blur text-primary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {a.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readTime(a.excerpt)}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

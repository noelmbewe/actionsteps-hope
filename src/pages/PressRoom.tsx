import { useEffect, useState, type ReactNode } from "react";
import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { Megaphone, ArrowRight, Calendar, User, ExternalLink, Newspaper, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { getArticles, type ArticleListItem } from "@/lib/api";

function CardLink({ entry, children, className }: { entry: ArticleListItem; children: ReactNode; className?: string }) {
  if (entry.external_url) {
    return (
      <a href={entry.external_url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={`/articles/${entry.slug}`} className={className}>
      {children}
    </Link>
  );
}

export default function PressRoom() {
  const [items, setItems] = useState<ArticleListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError(null);
    getArticles("Press")
      .then((res) => setItems(res.articles))
      .catch((e) => setError(e.message || "Could not load news."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const featured = items?.find((a) => a.featured === 1);
  const rest = items?.filter((a) => a !== featured) ?? [];

  return (
    <Layout>
      <PageHero eyebrow="Press Room" title={<>News & <span className="text-secondary">Press Releases</span>.</>} subtitle="Latest news, press releases, and media coverage of our advocacy work and program outcomes." />

      {loading && (
        <section className="py-24">
          <div className="container flex items-center justify-center text-muted-foreground">
            <RefreshCw className="h-5 w-5 animate-spin mr-3" /> Loading news…
          </div>
        </section>
      )}

      {error && !loading && (
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-xl bg-card border border-border rounded-2xl p-8 text-center shadow-soft">
              <Newspaper className="h-10 w-10 mx-auto text-secondary mb-4" />
              <h3 className="font-display text-xl font-bold text-primary">Couldn't load the news</h3>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              <button onClick={load} className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-swoosh text-white px-6 py-2.5 text-sm font-semibold">Try again</button>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && items && items.length === 0 && (
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-xl bg-card border border-border rounded-2xl p-10 text-center shadow-soft">
              <Megaphone className="h-10 w-10 mx-auto text-secondary mb-4" />
              <h3 className="font-display text-xl font-bold text-primary">No press releases yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Check back soon for news and media coverage.</p>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && items && items.length > 0 && (
        <section className="py-24">
          <div className="container">
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
                  <CardLink entry={featured}>
                    <h3 className="font-display text-3xl lg:text-4xl font-bold text-primary leading-tight group-hover:text-secondary transition-colors">
                      {featured.title}
                    </h3>
                  </CardLink>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {featured.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                    {featured.external_url && (
                      <span className="flex items-center gap-1.5 text-secondary font-semibold">
                        <ExternalLink className="h-3.5 w-3.5" /> Open source
                      </span>
                    )}
                  </div>
                </div>
              </article>
            )}

            <SectionHeader eyebrow="All Releases" title={<>Latest <span className="text-gradient">news</span>.</>} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {rest.map((p, i) => (
                <CardLink
                  key={p.id}
                  entry={p}
                  className="reveal group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-elegant transition"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {p.cover_image ? (
                      <img
                        src={p.cover_image}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 h-full w-full bg-gradient-swoosh" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                      {p.external_url && (
                        <span className="flex items-center gap-1 text-secondary"><ExternalLink className="h-3 w-3" /> Source</span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.excerpt}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary pt-2">
                      {p.external_url ? "Read the story" : "Read more"} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </CardLink>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
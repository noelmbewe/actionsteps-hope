import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/site/Layout";
import { Calendar, User, Clock, ArrowLeft, Share2, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticle, type Article } from "@/lib/api";
import { toast } from "sonner";

function readTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setArticle(null);
    setError(null);
    getArticle(slug)
      .then(setArticle)
      .catch((e) => setError(e.message || "Article not found."));
  }, [slug]);

  if (error) {
    return (
      <Layout>
        <section className="py-32">
          <div className="container max-w-xl text-center">
            <Newspaper className="h-12 w-12 mx-auto text-secondary mb-4" />
            <h1 className="font-display text-3xl font-bold text-primary">Article not found</h1>
            <p className="mt-3 text-muted-foreground">{error}</p>
            <Button asChild variant="hero" className="mt-6 rounded-full">
              <Link to="/articles">Back to Articles</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="py-32 flex justify-center text-muted-foreground">Loading article…</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-24">
        <div className="container max-w-3xl">
          <Link to="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> All Articles
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="bg-accent text-primary px-3 py-1 rounded-full font-bold uppercase tracking-widest">{article.category}</span>
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {article.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {readTime(article.body)}</span>
          </div>

          <h1 className="mt-5 font-display text-4xl md:text-5xl font-bold text-primary leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-5 text-xl text-muted-foreground leading-relaxed">{article.excerpt}</p>
          )}
        </div>

        {article.cover_image && (
          <div className="container max-w-4xl mt-10">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full aspect-[16/8] object-cover rounded-3xl shadow-elegant"
            />
          </div>
        )}
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <div
            className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-secondary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          <div className="flex items-center justify-between border-t border-border mt-12 pt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/articles">Back to all articles</Link>
            </Button>
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success("Link copied to clipboard");
              }}
            >
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

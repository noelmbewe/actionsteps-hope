import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Eye, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { adminGetArticle, adminCreateArticle, adminUpdateArticle } from "@/lib/api";

export default function AdminArticleForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Article");
  const [author, setAuthor] = useState("ActionSteps Counseling");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featured, setFeatured] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("actionsteps_token")) {
      navigate("/admin/login");
      return;
    }
    if (editing && id) {
      adminGetArticle(Number(id))
        .then((a) => {
          setTitle(a.title);
          setSlug(a.slug);
          setCategory(a.category);
          setAuthor(a.author);
          setCoverImage(a.cover_image ?? "");
          setStatus(a.status);
          setFeatured(a.featured === 1);
          setExcerpt(a.excerpt);
          setBody(a.body);
        })
        .catch((e) => toast.error((e as Error).message))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, editing]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title,
      slug,
      category,
      author,
      cover_image: coverImage,
      status,
      featured: featured ? 1 : 0,
      excerpt,
      body,
    };
    try {
      if (editing && id) {
        await adminUpdateArticle(Number(id), { ...payload, id: Number(id) } as never);
        toast.success("Article updated");
      } else {
        const res = await adminCreateArticle(payload);
        toast.success("Article created");
        navigate(`/admin/articles/${res.id}/edit`);
        return;
      }
    } catch (err) {
      toast.error((err as Error).message);
      setSaving(false);
      return;
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-32 text-center text-muted-foreground">Loading article…</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-3xl">
          <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to articles
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-8">
            {editing ? "Edit Article" : "New Article"}
          </h1>

          <form onSubmit={onSubmit} className="bg-card border border-border rounded-3xl p-8 shadow-soft space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (optional)</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Article", "News", "Recovery", "Research", "Program", "Impact Report", "Legislative"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover image URL (optional)</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://…" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt / summary</Label>
              <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Body (HTML) *</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={16}
                placeholder="<p>Write your article content here. HTML is supported (e.g. <h2>, <p>, <ul>, <strong>).</p>"
                required
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Content is rendered with HTML. Use &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a&gt;, &lt;blockquote&gt;, &lt;img&gt;.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Checkbox id="featured" checked={featured} onCheckedChange={(v) => setFeatured(Boolean(v))} />
              <Label htmlFor="featured" className="font-normal">Feature this article</Label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button type="submit" variant="hero" className="rounded-full" disabled={saving}>
                <Save className="h-4 w-4" /> {saving ? "Saving…" : (editing ? "Save Changes" : "Create Article")}
              </Button>
              {editing && (
                <Button asChild variant="outline" className="rounded-full">
                  <Link to={`/articles/${slug || "preview"}`}>
                    <Eye className="h-4 w-4" /> View live
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

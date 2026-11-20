import { FormEvent, lazy, Suspense, useEffect, useState } from "react";
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
import { ArrowLeft, Save, Eye, UploadCloud, X, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  adminGetArticle,
  adminCreateArticle,
  adminUpdateArticle,
  adminUploadImage,
} from "@/lib/api";

// TipTap is only needed on this page, so it loads lazily to keep the public
// site fast (it never enters the main bundle).
const RichTextEditor = lazy(() => import("@/components/admin/RichTextEditor"));

export default function AdminArticleForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("Article");
  const [externalUrl, setExternalUrl] = useState("");
  const [author, setAuthor] = useState("ActionSteps Counseling");
  const [coverImage, setCoverImage] = useState("");
  const [currentSlug, setCurrentSlug] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featured, setFeatured] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("actionsteps_token")) {
      navigate("/admin/login");
      return;
    }
    if (editing && id) {
      adminGetArticle(Number(id))
        .then((a) => {
          setTitle(a.title);
          setCurrentSlug(a.slug);
          setCategory(a.category);
          setExternalUrl(a.external_url ?? "");
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

  const handleCoverUpload = async (file: File) => {
    setUploading(true);
    try {
      const res = await adminUploadImage(file);
      setCoverImage(res.url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!body.trim() && category !== "Press") {
      toast.error("Article body is required");
      return;
    }
    if (category === "Press" && !body.trim() && !externalUrl.trim()) {
      toast.error("Add a source link or write the story body");
      return;
    }
    setSaving(true);
    const payload = {
      title,
      slug: "",
      category,
      external_url: externalUrl,
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
              <p className="text-xs text-muted-foreground">The web address (slug) is generated automatically from the title.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Where does this appear?</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Article">Article (Education tab)</SelectItem>
                    <SelectItem value="Press">Press / News (Press Room tab)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {category === "Press" && (
              <div className="space-y-2">
                <Label htmlFor="external_url">Source / external link (optional)</Label>
                <Input
                  id="external_url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://news-site.com/your-story"
                />
                <p className="text-xs text-muted-foreground">
                  If set, the Press Room will open this link in a new tab instead of your article page.
                  Leave empty to publish the full story on your site.
                </p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
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
              <div className="space-y-2">
                <Label></Label>
                <div className="flex items-center gap-3 pt-3">
                  <Checkbox id="featured" checked={featured} onCheckedChange={(v) => setFeatured(Boolean(v))} />
                  <Label htmlFor="featured" className="font-normal">Feature this article</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover image (optional)</Label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="relative w-full sm:w-40 h-28 rounded-xl border border-dashed border-border bg-muted/40 flex items-center justify-center overflow-hidden shrink-0">
                  {coverImage ? (
                    <>
                      <img src={coverImage} alt="Cover preview" className="absolute inset-0 h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setCoverImage("")}
                        className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/90 flex items-center justify-center shadow-soft hover:bg-background"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="cover-upload"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-6 h-12 text-sm font-medium hover:bg-accent cursor-pointer transition-colors"
                  >
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                    {uploading ? "Uploading…" : "Choose image"}
                  </label>
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleCoverUpload(f);
                      e.target.value = "";
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG, WEBP or GIF up to 8MB. The image is uploaded and stored on your site.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt / summary</Label>
              <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Body *</Label>
              <Suspense
                fallback={
                  <div className="border border-input rounded-xl h-[280px] flex items-center justify-center text-sm text-muted-foreground">
                    Loading editor…
                  </div>
                }
              >
                <RichTextEditor value={body} onChange={setBody} />
              </Suspense>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button type="submit" variant="hero" className="rounded-full" disabled={saving}>
                <Save className="h-4 w-4" /> {saving ? "Saving…" : (editing ? "Save Changes" : "Create Article")}
              </Button>
              {editing && (
                <Button asChild variant="outline" className="rounded-full">
                  <Link to={`/articles/${currentSlug || "preview"}`}>
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
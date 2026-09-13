import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/site/Layout";
import AdminNav from "@/components/site/AdminNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, LogOut, Pencil, Trash2, FileText, Star } from "lucide-react";
import { toast } from "sonner";
import { adminListArticles, adminDeleteArticle, type ArticleListItem } from "@/lib/api";

export default function AdminArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArticleListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    adminListArticles()
      .then((res) => setArticles(res.articles))
      .catch((e) => {
        if ((e as { status?: number }).status === 401) {
          navigate("/admin/login");
        } else {
          setError(e.message || "Could not load articles.");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!localStorage.getItem("actionsteps_token")) {
      navigate("/admin/login");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmDelete = async () => {
    if (deleteId == null) return;
    try {
      await adminDeleteArticle(deleteId);
      toast.success("Article deleted");
      setArticles((prev) => prev?.filter((a) => a.id !== deleteId) ?? prev);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setDeleteId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("actionsteps_token");
    navigate("/admin/login");
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Admin</div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">Manage Articles</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="hero" className="rounded-full">
                <Link to="/admin/articles/new"><Plus className="h-4 w-4" /> New Article</Link>
              </Button>
              <Button variant="outline" className="rounded-full" onClick={logout}>
                <LogOut className="h-4 w-4" /> Log out
              </Button>
            </div>
          </div>

          <AdminNav />

          <div className="bg-card border border-border rounded-3xl shadow-soft overflow-hidden">
            {loading && (
              <div className="p-16 text-center text-muted-foreground">Loading articles…</div>
            )}

            {!loading && error && (
              <div className="p-16 text-center">
                <p className="text-muted-foreground">{error}</p>
                <Button variant="hero" className="mt-5 rounded-full" onClick={load}>Retry</Button>
              </div>
            )}

            {!loading && !error && articles && articles.length === 0 && (
              <div className="p-16 text-center">
                <FileText className="h-10 w-10 mx-auto text-secondary mb-4" />
                <p className="text-muted-foreground">No articles yet. Create your first one.</p>
                <Button asChild variant="hero" className="mt-5 rounded-full">
                  <Link to="/admin/articles/new"><Plus className="h-4 w-4" /> New Article</Link>
                </Button>
              </div>
            )}

            {!loading && !error && articles && articles.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium text-primary">
                        <Link to={`/articles/${a.slug}`} className="hover:text-secondary transition-colors">
                          {a.title}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{a.category}</TableCell>
                      <TableCell>
                        <Badge variant={a.status === "published" ? "secondary" : "outline"}>
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{a.featured === 1 && <Star className="h-4 w-4 text-secondary" />}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button asChild variant="ghost" size="icon" className="rounded-full">
                            <Link to={`/admin/articles/${a.id}/edit`} aria-label="Edit">
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-full text-destructive" onClick={() => setDeleteId(a.id)} aria-label="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </section>

      <AlertDialog open={deleteId != null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this article?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The article will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}

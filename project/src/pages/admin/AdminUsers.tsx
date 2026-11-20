import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Users, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {
  adminListUsers,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,
  type AdminUser,
} from "@/lib/api";

type EditorState = { mode: "create" } | { mode: "edit"; user: AdminUser } | null;
type NonNullEditorState = { mode: "create" } | { mode: "edit"; user: AdminUser };

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState<EditorState>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    adminListUsers()
      .then((res) => setUsers(res.users))
      .catch((e) => {
        if ((e as { status?: number }).status === 401) navigate("/admin/login");
        else toast.error((e as Error).message);
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

  const handleDelete = async (id: number) => {
    try {
      await adminDeleteUser(id);
      toast.success("User deleted");
      setUsers((prev) => prev?.filter((u) => u.id !== id) ?? prev);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-4xl">
          <AdminNav />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Admin</div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">Admin Users</h1>
            </div>
            <Button variant="hero" className="rounded-full" onClick={() => setEditor({ mode: "create" })}>
              <Plus className="h-4 w-4" /> Add User
            </Button>
          </div>

          <div className="bg-card border border-border rounded-3xl shadow-soft overflow-hidden">
            {loading && <div className="p-16 text-center text-muted-foreground">Loading users…</div>}

            {!loading && users && users.length === 0 && (
              <div className="p-16 text-center">
                <Users className="h-10 w-10 mx-auto text-secondary mb-4" />
                <p className="text-muted-foreground">No admin users found.</p>
              </div>
            )}

            {!loading && users && users.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium text-primary">
                        <span className="inline-flex items-center gap-1.5">
                          <ShieldCheck className="h-4 w-4 text-secondary" /> {u.username}
                          {u.id === currentUserId() && <span className="text-xs text-muted-foreground">(you)</span>}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{u.email ?? "—"}</TableCell>
                      <TableCell>
                        <Badge variant={u.is_active === 1 ? "secondary" : "outline"}>
                          {u.is_active === 1 ? "active" : "inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{u.created ?? "—"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setEditor({ mode: "edit", user: u })} aria-label="Edit">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-full text-destructive" onClick={() => handleDelete(u.id)} aria-label="Delete">
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

      {editor && (
        <UserEditorDialog
          state={editor}
          saving={saving}
          onSave={async (payload) => {
            setSaving(true);
            try {
              if (editor.mode === "create") {
                if (!payload.password) {
                  toast.error("Password is required");
                  setSaving(false);
                  return;
                }
                await adminCreateUser({ username: payload.username, email: payload.email, password: payload.password });
                toast.success("User created");
              } else {
                await adminUpdateUser(editor.user.id, payload);
                toast.success("User updated");
              }
              setEditor(null);
              load();
            } catch (e) {
              toast.error((e as Error).message);
            } finally {
              setSaving(false);
            }
          }}
          onClose={() => setEditor(null)}
        />
      )}
    </Layout>
  );
}

function currentUserId(): number | null {
  try {
    const raw = sessionStorage.getItem("actionsteps_user");
    return raw ? (JSON.parse(raw) as AdminUser).id : null;
  } catch {
    return null;
  }
}

function UserEditorDialog({
  state,
  saving,
  onSave,
  onClose,
}: {
  state: NonNullEditorState;
  saving: boolean;
  onSave: (data: { username: string; email?: string; password?: string; is_active?: number }) => void;
  onClose: () => void;
}) {
  const editing = state.mode === "edit";
  const [username, setUsername] = useState(editing ? state.user.username : "");
  const [email, setEmail] = useState(editing ? (state.user.email ?? "") : "");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(editing ? state.user.is_active === 1 : true);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      username,
      email,
      is_active: isActive ? 1 : 0,
      ...(password ? { password } : {}),
    });
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Admin User" : "Add Admin User"}</DialogTitle>
          <DialogDescription>
            {editing ? "Update this user's details. Leave the password blank to keep it unchanged." : "Create a new administrator account."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="u-username">Username</Label>
            <Input id="u-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="u-email">Email (optional)</Label>
            <Input id="u-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="u-password">{editing ? "New password" : "Password"} {editing && "(optional)"}</Label>
            <Input
              id="u-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={editing ? "Leave blank to keep current" : "Min 6 characters"}
              required={!editing}
              minLength={6}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-input accent-secondary"
            />
            Active account
          </label>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-full" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="hero" className="rounded-full" disabled={saving}>
              {saving ? "Saving…" : (editing ? "Save Changes" : "Add User")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
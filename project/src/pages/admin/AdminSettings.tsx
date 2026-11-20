import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/site/Layout";
import AdminNav from "@/components/site/AdminNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { toast } from "sonner";
import { adminGetMe, adminUpdateMe, type AdminUser } from "@/lib/api";

export default function AdminSettings() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("actionsteps_token")) {
      navigate("/admin/login");
      return;
    }
    adminGetMe()
      .then((me: AdminUser) => {
        setUsername(me.username);
        setEmail(me.email ?? "");
      })
      .catch((e) => {
        if ((e as { status?: number }).status === 401) navigate("/admin/login");
        else toast.error((e as Error).message);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    setSaving(true);
    try {
      const me = await adminUpdateMe({
        username,
        email,
        ...(newPassword ? { current_password: currentPassword, new_password: newPassword } : {}),
      });
      sessionStorage.setItem("actionsteps_user", JSON.stringify(me));
      toast.success("Account settings saved");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-32 text-center text-muted-foreground">Loading…</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-lg">
          <AdminNav />
          <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-swoosh text-white mb-6 mx-auto">
            <User className="h-5 w-5" />
          </div>
          <h1 className="font-display text-3xl font-bold text-primary text-center">Account Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">Update your profile and password.</p>

          <form onSubmit={onSubmit} className="mt-8 bg-card border border-border rounded-3xl p-8 space-y-5 shadow-soft">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="border-t border-border pt-5">
              <h2 className="font-display text-lg font-bold text-primary mb-3">Change password</h2>
              <p className="text-xs text-muted-foreground mb-4">Leave the new password fields blank to keep your current password.</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm new password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full rounded-full" disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
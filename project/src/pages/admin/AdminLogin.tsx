import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, UserIcon } from "lucide-react";
import { toast } from "sonner";
import { adminLogin } from "@/lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(username, password);
      localStorage.setItem("actionsteps_token", res.token);
      sessionStorage.setItem("actionsteps_user", JSON.stringify(res.user));
      toast.success("Signed in successfully");
      navigate("/admin");
    } catch (err) {
      toast.error((err as Error).message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-32">
        <div className="container max-w-md">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-elegant">
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-swoosh text-white mb-6 mx-auto">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="font-display text-2xl font-bold text-primary text-center">Admin Sign In</h1>
            <p className="mt-2 text-sm text-muted-foreground text-center">Manage ActionSteps articles</p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button type="submit" variant="hero" className="w-full rounded-full" disabled={loading}>
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

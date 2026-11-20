import { Link } from "react-router-dom";
import { FileText, Users, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Articles", icon: FileText },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: UserCog },
];

export default function AdminNav() {
  return (
    <nav className="flex flex-wrap items-center gap-2 mb-8">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
            isActivePath(l.to) ? "bg-gradient-swoosh text-primary-foreground shadow-soft" : "bg-accent text-primary hover:bg-accent/70",
          )}
        >
          <l.icon className="h-4 w-4" /> {l.label}
        </Link>
      ))}
    </nav>
  );
}

function isActivePath(to: string): boolean {
  if (to === "/admin") {
    return window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/articles");
  }
  if (to === "/admin/users") {
    return window.location.pathname.startsWith("/admin/users");
  }
  return window.location.pathname.startsWith("/admin/settings");
}
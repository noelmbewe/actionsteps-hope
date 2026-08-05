import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs/arise", label: "ARISE" },
  { to: "/programs/ascend", label: "ASCEND" },
  { to: "/impact", label: "Impact" },
  { to: "/education", label: "Education" },
  { to: "/press-room", label: "Press Room" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-soft transition-all duration-300">
      <div className="container flex items-center justify-between h-18 py-3">
        <Link to="/" className="flex items-center gap-2 group" aria-label="ActionSteps Counseling home">
          <img src={logo} alt="ActionSteps Counseling, Inc. — Living the Dream" className="h-12 w-auto object-contain" height={48} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-primary bg-accent" 
                    : scrolled 
                      ? "text-foreground/75 hover:text-primary hover:bg-accent/60"
                      : "text-foreground hover:text-primary hover:bg-accent"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:9182310195" className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Phone className="h-4 w-4" /> 918-231-0195
          </a>
          <Button asChild variant="hero" size="default" className="rounded-full">
            <Link to="/donate">Donate</Link>
          </Button>
        </div>

        <button
          aria-label="Open menu"
          className="lg:hidden p-2 rounded-full bg-accent text-primary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium ${isActive ? "bg-accent text-primary" : "text-foreground/80"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild variant="hero" className="mt-2 rounded-full">
              <Link to="/donate">Donate Now</Link>
            </Button>
            <a href="tel:9182310195" className="text-center mt-2 text-primary font-semibold">918-231-0195</a>
          </div>
        </div>
      )}
    </header>
  );
}

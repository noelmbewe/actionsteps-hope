import { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const programs = [
  { to: "/programs/arise", label: "ARISE" },
  { to: "/programs/ascend", label: "ASCEND" },
];

type NavItem = { to: string; label: string } | { type: "programs"; label: string };

const navItems: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { type: "programs", label: "Programs" },
  { to: "/impact", label: "Impact" },
  { to: "/education", label: "Education" },
  { to: "/articles", label: "Articles" },
  { to: "/press-room", label: "Press Room" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const programsActive = pathname.startsWith("/programs");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? "text-primary bg-accent"
        : scrolled
          ? "text-foreground/75 hover:text-primary hover:bg-accent/60"
          : "text-foreground hover:text-primary hover:bg-accent"
    }`;

  const triggerClass = cn(
    "rounded-full px-3 py-2 h-auto text-sm font-medium transition-colors bg-transparent",
    programsActive
      ? "text-primary bg-accent"
      : scrolled
        ? "text-foreground/75 hover:text-primary hover:bg-accent/60"
        : "text-foreground hover:text-primary hover:bg-accent",
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-soft transition-all duration-300">
      <div className="container flex items-center justify-between h-18 py-3">
        <Link to="/" className="flex items-center gap-2 group" aria-label="ActionSteps Counseling home">
          <img src={logo} alt="ActionSteps Counseling, Inc. — Living the Dream" className="h-12 w-auto object-contain" height={48} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Fragment key={item.label}>
              {"type" in item ? (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className={triggerClass}>
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-56 gap-1 p-3">
                          {programs.map((p) => (
                            <li key={p.to}>
                              <NavLink
                                to={p.to}
                                className={({ isActive }) =>
                                  `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive
                                      ? "bg-accent text-primary"
                                      : "text-foreground/80 hover:bg-accent/60 hover:text-primary"
                                  }`
                                }
                              >
                                {p.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={linkClass}
                >
                  {item.label}
                </NavLink>
              )}
            </Fragment>
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
            {navItems.map((item) =>
              "type" in item ? (
                <div key={item.label}>
                  <div className="px-4 py-3 rounded-xl font-medium text-foreground/80">Programs</div>
                  <div className="flex flex-col gap-1 pl-4 border-l-2 border-accent ml-5">
                    {programs.map((p) => (
                      <NavLink
                        key={p.to}
                        to={p.to}
                        className={({ isActive }) =>
                          `px-4 py-3 rounded-xl font-medium ${isActive ? "bg-accent text-primary" : "text-foreground/80"}`
                        }
                      >
                        {p.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium ${isActive ? "bg-accent text-primary" : "text-foreground/80"}`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
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

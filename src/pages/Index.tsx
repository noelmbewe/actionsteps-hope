import { Link } from "react-router-dom";
import { ArrowRight, Heart, GraduationCap, BookOpen, Calendar, Quote, HandCoins, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/site/Layout";
import Counter from "@/components/site/Counter";
import { SectionHeader, Eyebrow } from "@/components/site/Section";
import hero from "@/assets/hero-counseling.jpg";
import recovery from "@/assets/recovery-hope.jpg";
import videoSrc from "@/assets/video.mp4";

const stats = [
  { value: 6, suffix: "%", label: "Recidivism", sub: "Arise program vs 23% state average" },
  { value: 9.1, suffix: "M+", prefix: "$", decimals: 1, label: "Taxpayer Savings", sub: "In estimated state savings from reduced incarceration costs" },
];

const programs = [
  { icon: Sparkles, title: "ASCEND Aftercare", desc: "10-month aftercare with monthly sessions, sobriety accountability and community mentorship.", to: "/programs/ascend", accent: "from-secondary to-primary-glow" },
  { icon: GraduationCap, title: "Addiction Education", desc: "Helping people understand addiction as a brain disease, the impact of trauma and restorative justice.", to: "/education", accent: "from-primary to-secondary" },
  { icon: BookOpen, title: "Resources", desc: "Reports, downloadable guides, and tools for clients, families, and policymakers.", to: "/impact", accent: "from-primary-glow to-secondary" },
  { icon: Calendar, title: "Events", desc: "Community events, fundraisers, and legislative briefings throughout the year.", to: "/contact", accent: "from-secondary to-primary" },
  { icon: HandCoins, title: "Donate", desc: "Support recovery and treatment. Every dollar transforms lives.", to: "/donate", accent: "from-secondary to-primary-glow" },
];

const Index = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 bg-gradient-hero" />
        <img src={hero} alt="Group counseling session showing hope and recovery" width={1920} height={1280} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/85" />

        <div className="container relative py-24 md:py-36 text-primary-foreground">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest">Tulsa, Oklahoma · Since 2010</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] animate-fade-in">
              Restoring Lives.<br />
              Strengthening Families.<br />
              <span className="bg-gradient-to-r from-secondary to-white bg-clip-text text-transparent">Changing Oklahoma.</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl max-w-2xl text-primary-foreground/90 animate-fade-in" style={{ animationDelay: "150ms" }}>
              ActionSteps Counseling provides men with evidence-based addiction recovery and criminal justice diversion programs that transform lives and improve public safety.
            </p>
            <div className="mt-9 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">Get Help Now <ArrowRight className="ml-1" /></Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/donate">Support Our Mission <Heart className="ml-1" /></Link>
              </Button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid sm:grid-cols-2 gap-4 mt-16 animate-fade-in" style={{ animationDelay: "450ms" }}>
            {stats.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-foreground hover:-translate-y-1 transition-transform duration-300">
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals || 0} />
                </div>
                <div className="mt-2 font-semibold text-primary">{s.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative swoosh */}
        <svg className="absolute -bottom-1 left-0 w-full text-background" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
          <path fill="currentColor" d="M0,32 C360,96 1080,0 1440,48 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="reveal max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-video">
              <video
                src={videoSrc}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                poster=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / MISSION */}
      <section className="py-24 bg-background">
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <Eyebrow>Our Mission</Eyebrow>
            <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold text-primary leading-[1.05]">
              We believe every person deserves a <span className="text-gradient">second chance</span> at a meaningful life.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              ActionSteps Counseling exists at the intersection of addiction treatment and criminal justice reform. We restore families, rebuild communities, and prove that compassionate, evidence-based care creates safer streets and stronger futures than incarceration ever could.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Evidence-based addiction treatment",
                "Criminal justice diversion that works",
                "Family restoration and child reunification",
                "Public safety through proven outcomes",
              ].map((t) => (
                <li key={t} className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-secondary shrink-0" />
                  <span className="text-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-2xl italic text-primary">"Living the Dream"</p>
          </div>

          <div className="relative reveal">
            <div className="absolute -inset-4 bg-gradient-swoosh opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img src={recovery} alt="Silhouette at sunrise representing recovery and new beginnings" width={1280} height={960} loading="lazy" className="w-full h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
                <div className="text-sm font-semibold uppercase tracking-widest text-secondary">Tulsa, OK</div>
                <div className="font-display text-2xl font-bold mt-1">Hope is the first action step.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="py-24 bg-gradient-soft">
        <div className="container">
          <SectionHeader eyebrow="What we do" title={<>Programs that <span className="text-gradient">change everything</span>.</>} subtitle="From the first day of diversion through long-term aftercare, every program is designed for measurable, lasting transformation." />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <Link key={i} to={p.to} className="group reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="h-full bg-card rounded-2xl p-7 border border-border hover:border-secondary hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.accent} text-white shadow-soft`}>
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-secondary transition">
                    Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_30%,hsl(var(--primary-glow)/0.5),transparent_45%),radial-gradient(circle_at_80%_70%,hsl(var(--secondary)/0.4),transparent_50%)]" />
        <div className="container relative max-w-4xl text-center">
          <Quote className="h-12 w-12 mx-auto text-secondary" />
          <blockquote className="mt-6 font-display text-3xl md:text-4xl font-semibold leading-tight">
            "After experiencing 6 failed attempts at treatment, I have never seen or experienced such a caring, knowledgeable, and helpful staff. Through treatment I was able to get my family, job, drivers license, self-love, confidence and life back."
          </blockquote>
          <div className="mt-8">
            <div className="font-semibold text-secondary">— Client, Age 31</div>
            <div className="text-primary-foreground/70 text-sm">ARISE Graduate – Tulsa, OK</div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-3xl bg-gradient-hero text-primary-foreground p-10 md:p-16 shadow-elegant grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Eyebrow><span className="text-primary">Take Action</span></Eyebrow>
              <h3 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight">Your support helps someone break the cycle — today.</h3>
              <p className="mt-3 text-primary-foreground/85">Every donation sponsors recovery and treatment that prevents incarceration and rebuilds communities.</p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Button asChild variant="cta" size="xl"><Link to="/donate">Donate Now <Heart /></Link></Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

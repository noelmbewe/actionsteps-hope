import Layout from "@/components/site/Layout";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Heart, Home, Pill, GraduationCap, Check } from "lucide-react";
import { useState } from "react";

const tiers = [
  { amount: 25, icon: GraduationCap, title: "Educate", desc: "Funds recovery education materials for one client." },
  { amount: 100, icon: Pill, title: "Treat", desc: "Sponsors one week of treatment services." },
  { amount: 500, icon: Home, title: "House", desc: "Provides one month of safe sober housing." },
  { amount: 1500, icon: Heart, title: "Restore", desc: "Sponsors a full ARISE level for one person." },
];

export default function Donate() {
  const [selected, setSelected] = useState<number>(100);
  const [custom, setCustom] = useState("");

  return (
    <Layout>
      <PageHero eyebrow="Support Our Mission" title={<>Your gift funds someone's <span className="text-secondary">freedom</span>.</>} subtitle="Every dollar directly funds recovery, housing, treatment, and the proven diversion programs that change Oklahoma." />

      <section className="py-24">
        <div className="container max-w-5xl">
          <SectionHeader eyebrow="Sponsor Recovery" title={<>Choose your <span className="text-gradient">impact</span>.</>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {tiers.map((t) => {
              const active = selected === t.amount;
              return (
                <button
                  key={t.amount}
                  onClick={() => { setSelected(t.amount); setCustom(""); }}
                  className={`text-left rounded-2xl p-6 border transition-all reveal ${
                    active ? "bg-gradient-hero text-primary-foreground border-transparent shadow-elegant -translate-y-1" : "bg-card border-border hover:shadow-elegant hover:-translate-y-1"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${active ? "bg-white/20 text-white" : "bg-gradient-swoosh text-white"}`}>
                    <t.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 font-display text-3xl font-bold">${t.amount}</div>
                  <div className={`mt-1 font-semibold ${active ? "" : "text-primary"}`}>{t.title}</div>
                  <div className={`mt-1 text-sm ${active ? "opacity-85" : "text-muted-foreground"}`}>{t.desc}</div>
                  {active && <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-secondary"><Check className="h-3.5 w-3.5" /> Selected</div>}
                </button>
              );
            })}
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-elegant reveal">
            <label className="block text-sm font-semibold text-primary mb-3">Or enter a custom amount</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                <input
                  type="number"
                  min={1}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="100"
                  className="w-full h-14 pl-9 pr-4 rounded-full border border-input bg-background text-lg font-semibold focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
              <Button variant="hero" size="xl" className="sm:w-auto">
                Donate ${custom || selected} <Heart />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">ActionSteps Counseling, Inc. is a 501(c)(3) nonprofit. All donations are tax-deductible to the fullest extent allowed by law.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-soft">
        <div className="container max-w-4xl text-center reveal">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">Why your donation <span className="text-gradient">multiplies</span>.</h2>
          <p className="mt-5 text-lg text-muted-foreground">Every $1 invested in ActionSteps generates an estimated $7+ in taxpayer savings through reduced incarceration, court costs, and recidivism. Your gift isn't charity — it's the smartest public safety investment in Oklahoma.</p>
        </div>
      </section>
    </Layout>
  );
}

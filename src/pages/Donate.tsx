import Layout from "@/components/site/Layout";
import ZeffyDonateModal, { openZeffyDonate } from "@/components/site/ZeffyDonateModal";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Heart, Home, Pill, GraduationCap } from "lucide-react";

const tiers = [
  { amount: 10737, icon: GraduationCap, title: "Educate", desc: "Fully funds one man's two-year journey" },
  { amount: 5000, icon: Pill, title: "Treat", desc: "Covers nearly half a man's path to recovery" },
  { amount: 500, icon: Home, title: "House", desc: "Keeps a man in Arise for two weeks" },
  { amount: 50, icon: Heart, title: "Restore", desc: "Funds recovery education materials for one client." },
];

export default function Donate() {
  return (
    <Layout>
      <PageHero eyebrow="Support Our Mission" title={<>Your support funds the road <span className="text-secondary">home</span>.</>} subtitle="Your support funds the road home — today. Every dollar directly funds recovery, treatment, and the proven diversion programs that change Oklahoma." />

      <section className="py-24">
        <div className="container max-w-5xl">
          <SectionHeader eyebrow="Sponsor Recovery" title={<>Choose your <span className="text-gradient">impact</span>.</>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {tiers.map((t) => (
              <div
                key={t.amount}
                className="text-left rounded-2xl p-6 border border-border bg-card hover:shadow-elegant hover:-translate-y-1 transition-all reveal"
              >
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-swoosh text-white">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-3xl font-bold">${t.amount}</div>
                <div className="mt-1 font-semibold text-primary">{t.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 text-center shadow-elegant reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> 100% free online giving
            </div>
            <p className="mt-5 text-lg text-muted-foreground mb-6">
              Support recovery, treatment, and the proven diversion programs that change Oklahoma. Select your gift amount — every dollar counts.
            </p>
            <Button variant="hero" size="xl" className="sm:w-auto" onClick={openZeffyDonate}>
              Donate Now <Heart />
            </Button>
            <p className="text-xs text-muted-foreground mt-4">ActionSteps Counseling, Inc. is a 501(c)(3) nonprofit. All donations are tax-deductible to the fullest extent allowed by law.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-soft">
        <div className="container max-w-4xl text-center reveal">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">Why your donation <span className="text-gradient">multiplies</span>.</h2>
          <p className="mt-5 text-lg text-muted-foreground">Every $1 invested in ActionSteps generates an estimated $7+ in taxpayer savings through reduced incarceration, court costs, and recidivism. Your gift isn't charity — it's the smartest public safety investment in Oklahoma.</p>
          <Button variant="cta" size="xl" className="mt-8" onClick={openZeffyDonate}>
            Donate Now <Heart />
          </Button>
        </div>
      </section>
      <ZeffyDonateModal />
    </Layout>
  );
}

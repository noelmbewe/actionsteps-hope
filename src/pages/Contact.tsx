import Layout from "@/components/site/Layout";
import { PageHero } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Thank you — we'll be in touch within 1 business day.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <Layout>
      <PageHero eyebrow="Contact" title={<>We're here when you're <span className="text-secondary">ready</span>.</>} subtitle="Whether you're seeking help, a family member, a partner, or media — reach out. We respond within one business day." />

      <section className="py-24">
        <div className="container grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="reveal bg-gradient-hero text-primary-foreground rounded-3xl p-8 shadow-elegant">
              <AlertCircle className="h-8 w-8 text-secondary" />
              <h3 className="mt-3 font-display text-2xl font-bold">Need help now?</h3>
              <p className="mt-2 text-primary-foreground/85 text-sm">Call us directly. Confidential intake line available during business hours.</p>
              <Button asChild variant="cta" size="lg" className="mt-5 w-full">
                <a href="tel:9182310195"><Phone /> 918-231-0195</a>
              </Button>
            </div>

            <div className="reveal bg-card border border-border rounded-3xl p-8 shadow-soft space-y-5">
              <div className="flex gap-3"><MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" /><div><div className="font-semibold text-primary">Office</div><div className="text-sm text-muted-foreground">6016 S 66th East Ave<br />Tulsa, OK 74145</div></div></div>
              <div className="flex gap-3"><Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" /><div><div className="font-semibold text-primary">Phone</div><a href="tel:9182310195" className="text-sm text-muted-foreground hover:text-primary">918-231-0195</a></div></div>
              <div className="flex gap-3"><Mail className="h-5 w-5 text-secondary shrink-0 mt-0.5" /><div><div className="font-semibold text-primary">Email</div><a href="mailto:info@actionstepscounseling.org" className="text-sm text-muted-foreground hover:text-primary">info@actionstepscounseling.org</a></div></div>
              <div className="flex gap-3"><Clock className="h-5 w-5 text-secondary shrink-0 mt-0.5" /><div><div className="font-semibold text-primary">Hours</div><div className="text-sm text-muted-foreground">Mon–Fri · 8am–6pm CT</div></div></div>
            </div>
          </div>

          <div className="lg:col-span-2 reveal">
            <form onSubmit={onSubmit} className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-soft space-y-5">
              <h3 className="font-display text-2xl font-bold text-primary">Request a Consultation</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" name="first" required />
                <Field label="Last name" name="last" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">I'm reaching out about</label>
                <select required className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring focus:outline-none">
                  <option>Enrolling in ARISE</option>
                  <option>Helping a loved one</option>
                  <option>Court / legal referral</option>
                  <option>Donating</option>
                  <option>Press or advocacy</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Message</label>
                <textarea required rows={5} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring focus:outline-none resize-none" placeholder="Tell us a bit about your situation..." />
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={sending} className="w-full sm:w-auto">
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="rounded-3xl overflow-hidden shadow-elegant border border-border reveal">
            <iframe
              title="ActionSteps Counseling location map"
              src="https://www.google.com/maps?q=6016+S+66th+East+Ave,+Tulsa,+OK+74145&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-primary mb-2">{label}{required && <span className="text-secondary"> *</span>}</label>
      <input name={name} type={type} required={required} className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring focus:outline-none" />
    </div>
  );
}

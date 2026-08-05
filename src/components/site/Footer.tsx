import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-4 inline-block bg-white rounded-xl p-3">
            <img src={logo} alt="ActionSteps Counseling, Inc." className="h-12 w-auto object-contain" height={48} loading="lazy" />
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            A mission born from clinical experience — and a gap that couldn't be ignored.
          </p>
          <p className="mt-4 text-secondary font-display italic">"Living the Dream"</p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-secondary">Programs</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/programs/arise" className="hover:text-secondary transition">ARISE Program</Link></li>
            <li><Link to="/programs/ascend" className="hover:text-secondary transition">ASCEND Aftercare</Link></li>
            <li><Link to="/education" className="hover:text-secondary transition">Addiction Education</Link></li>
            <li><Link to="/impact" className="hover:text-secondary transition">Impact & Data</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-secondary">Get Involved</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/donate" className="hover:text-secondary transition">Donate</Link></li>
            <li><Link to="/testimonies" className="hover:text-secondary transition">Stories</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-secondary">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-secondary" /> 6016 S 66th East Ave, Tulsa, OK 74145</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-secondary" /> <a href="tel:9182310195" className="hover:text-secondary">918-231-0195</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-secondary" /> <a href="mailto:office@actionstepscounseling.org" className="hover:text-secondary">office@actionstepscounseling.org</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} ActionSteps Counseling, Inc. All rights reserved.</p>
          <p>501(c)(3) Nonprofit Organization · Tulsa, Oklahoma</p>
        </div>
      </div>
    </footer>
  );
}

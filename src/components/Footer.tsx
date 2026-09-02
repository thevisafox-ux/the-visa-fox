import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => (
  <footer className="bg-[#07182e] text-white">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_0.8fr_0.8fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3"><Logo size="lg" /><div><div className="text-xl font-black">THE VISA FOX</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#e4c47e]">Navigating borders, delivering dreams</div></div></div>
          <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">Professional visa consultancy, documentation and overseas career guidance for students, professionals and families.</p>
          <div className="mt-7 flex gap-3">
            <a href="https://facebook.com/thevisafox" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-link"><Facebook size={18} /></a>
            <a href="https://instagram.com/thevisafox" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link"><Instagram size={18} /></a>
          </div>
        </div>
        <div>
          <h3 className="footer-heading">Quick Links</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300"><Link to="/">Home</Link><Link to="/checklist">Visa Checklist</Link><Link to="/sop-generator">SOP Generator</Link><Link to="/blogs">Blogs</Link></div>
        </div>
        <div>
          <h3 className="footer-heading">Services</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300"><Link to="/contact">Work Visa Guidance</Link><Link to="/contact">Tourist Visa</Link><Link to="/contact">Study Visa</Link><Link to="/contact">Documentation</Link><Link to="/sop-generator">SOP Writing</Link></div>
        </div>
        <div>
          <h3 className="footer-heading">Popular Countries</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300"><a href="/#countries">Albania</a><a href="/#countries">Azerbaijan</a><a href="/#countries">Malta</a><a href="/#countries">Poland</a><a href="/#countries">New Zealand</a></div>
        </div>
        <div>
          <h3 className="footer-heading">Contact</h3>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <a href="tel:01723196794" className="flex items-start gap-3"><Phone className="mt-0.5 shrink-0 text-[#e4c47e]" size={17} /> 0172 319 6794</a>
            <a href="mailto:info@thevisafox.com" className="flex items-start gap-3"><Mail className="mt-0.5 shrink-0 text-[#e4c47e]" size={17} /> info@thevisafox.com</a>
            <div className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-[#e4c47e]" size={17} /> SCO 103, Phase 7, Mohali, Punjab</div>
            <div className="flex items-start gap-3"><Clock className="mt-0.5 shrink-0 text-[#e4c47e]" size={17} /> Mon–Sat, 9:00 AM–6:00 PM</div>
          </div>
        </div>
      </div>
      <div className="mt-14 border-t border-white/10 pt-7 text-xs leading-5 text-slate-400">
        <p className="max-w-4xl">The Visa Fox provides consultancy and documentation guidance. Visa approvals, immigration decisions and processing times remain solely with the relevant embassy, consulate or immigration authority.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} The Visa Fox. All rights reserved.</p><div className="flex gap-5"><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms">Terms</Link></div></div>
      </div>
    </div>
  </footer>
);

export default Footer;

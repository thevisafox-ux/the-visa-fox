import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Briefcase, Check, FileCheck2, GraduationCap, Headphones, MapPin, Plane, SearchCheck, ShieldCheck, Sparkles } from 'lucide-react';

const services = [
  { icon: Briefcase, title: 'Work Visa Guidance', text: 'Profile assessment, documentation support and process guidance for overseas opportunities.' },
  { icon: Plane, title: 'Visitor & Tourist Visa', text: 'Clear guidance for individual, couple and family travel applications.' },
  { icon: GraduationCap, title: 'Study Visa Support', text: 'Course-focused counselling, documentation and application support for students.' },
  { icon: FileCheck2, title: 'SOP & Documentation', text: 'Professional application documents prepared with clarity and attention to detail.' },
];

const destinations = [
  { name: 'Albania', code: 'AL', text: 'Work opportunities' },
  { name: 'Azerbaijan', code: 'AZ', text: 'Employment guidance' },
  { name: 'Malta', code: 'MT', text: 'Work & travel' },
  { name: 'Poland', code: 'PL', text: 'Career pathways' },
  { name: 'New Zealand', code: 'NZ', text: 'Study & work' },
  { name: 'United Kingdom', code: 'UK', text: 'Study & visitor' },
];

const steps = [
  { icon: SearchCheck, number: '01', title: 'Profile Review', text: 'We understand your background, goal and preferred destination.' },
  { icon: FileCheck2, number: '02', title: 'Document Plan', text: 'You receive a clear checklist and step-by-step application roadmap.' },
  { icon: Headphones, number: '03', title: 'Application Support', text: 'Our team guides you through preparation and submission stages.' },
  { icon: ShieldCheck, number: '04', title: 'Status Guidance', text: 'We keep the process organized until the authority’s final decision.' },
];

const reveal = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.55 } };

const Home: React.FC = () => (
  <div className="home-page overflow-hidden bg-white">
    <section className="relative min-h-[690px] bg-[#07182e] text-white lg:min-h-[740px]">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=85" alt="Professional immigration consultation" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07182e] via-[#07182e]/90 to-[#07182e]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182e]/80 via-transparent to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[690px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:min-h-[740px] lg:px-8">
        <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d5b26b]/40 bg-[#d5b26b]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-[#f0d89e]"><Sparkles size={15} /> Overseas career & visa guidance</div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Your global journey,<span className="block text-[#e4c47e]">planned with clarity.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">The Visa Fox helps students, professionals and families understand their options and move forward with organized documentation and expert guidance.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8f1633] px-7 py-4 text-sm font-extrabold text-white shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#a21c3d]">Start Free Assessment <ArrowRight size={18} /></Link>
            <Link to="/checklist" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-md transition hover:bg-white/20">Check Visa Documents</Link>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 text-sm text-slate-200 sm:grid-cols-3">
            {['Profile-based guidance', 'Clear documentation plan', 'Support at every stage'].map((item) => <div key={item} className="flex items-center gap-2"><BadgeCheck className="text-[#e4c47e]" size={18} /> {item}</div>)}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-900/10 sm:grid-cols-3">
        <div className="p-6 sm:p-7"><div className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87920]">Office</div><div className="mt-2 flex items-center gap-2 font-bold text-[#0b1f3a]"><MapPin size={18} /> Phase 7, Mohali, Punjab</div></div>
        <div className="border-y border-slate-100 p-6 sm:border-x sm:border-y-0 sm:p-7"><div className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87920]">Consultation</div><div className="mt-2 font-bold text-[#0b1f3a]">Profile-first guidance</div></div>
        <div className="p-6 sm:p-7"><div className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87920]">Support</div><div className="mt-2 font-bold text-[#0b1f3a]">Monday to Saturday</div></div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div {...reveal} className="max-w-2xl"><span className="eyebrow">What we do</span><h2 className="section-title">One trusted place for your visa journey</h2><p className="section-copy">Straightforward support built around your profile—not a one-size-fits-all promise.</p></motion.div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.article key={service.title} {...reveal} transition={{ duration: 0.5, delay: index * 0.08 }} className="group rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-2 hover:border-[#d5b26b] hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7f1e5] text-[#8f1633] transition group-hover:bg-[#8f1633] group-hover:text-white"><service.icon size={23} /></div>
            <h3 className="mt-6 text-lg font-extrabold text-[#0b1f3a]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{service.text}</p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8f1633]">Discuss your profile <ArrowRight size={16} /></Link>
          </motion.article>
        ))}
      </div>
    </section>

    <section className="bg-[#f5f7fa] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...reveal} className="text-center"><span className="eyebrow">Explore opportunities</span><h2 className="section-title mx-auto">Popular destinations</h2><p className="section-copy mx-auto">Country options depend on your profile, experience, documents and current immigration requirements.</p></motion.div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((country, index) => (
            <motion.div key={country.name} {...reveal} transition={{ duration: 0.45, delay: index * 0.06 }} className="flex items-center justify-between rounded-2xl border border-white bg-white p-5 shadow-sm transition hover:border-[#d5b26b] hover:shadow-lg">
              <div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b1f3a] text-sm font-black text-[#e4c47e]">{country.code}</div><div><h3 className="font-extrabold text-[#0b1f3a]">{country.name}</h3><p className="mt-1 text-sm text-slate-500">{country.text}</p></div></div><ArrowRight className="text-slate-300" size={19} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div {...reveal}><span className="eyebrow">Our process</span><h2 className="section-title">Simple steps. Clear communication.</h2><p className="section-copy">Know what happens next, what documents are needed and where your application stands.</p>
          <div className="mt-8 space-y-3">{['Transparent process guidance', 'Document checklist tailored to your case', 'No false visa guarantees'].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#edf7f1] text-emerald-700"><Check size={14} /></span>{item}</div>)}</div>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div key={step.number} {...reveal} transition={{ duration: 0.45, delay: index * 0.07 }} className="rounded-3xl bg-[#0b1f3a] p-7 text-white"><div className="flex items-center justify-between"><step.icon className="text-[#e4c47e]" size={26} /><span className="text-3xl font-black text-white/15">{step.number}</span></div><h3 className="mt-7 text-lg font-extrabold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{step.text}</p></motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <motion.div {...reveal} className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#8f1633] px-6 py-12 text-white shadow-2xl shadow-[#8f1633]/20 sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-14">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f0d89e]">Ready to begin?</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Let’s review your profile first.</h2><p className="mt-3 text-white/80">Share your goal and our team will guide you toward the next practical step.</p></div>
        <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#8f1633] transition hover:-translate-y-1 lg:mt-0">Book Consultation <ArrowRight size={18} /></Link>
      </motion.div>
    </section>

    <div className="border-t border-slate-200 bg-slate-50 px-4 py-5 text-center text-xs leading-5 text-slate-500">Visa approvals and processing times are decided solely by the relevant embassy, consulate or immigration authority. The Visa Fox provides consultancy and documentation guidance.</div>
  </div>
);

export default Home;

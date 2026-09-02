import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  Check,
  FileCheck2,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  Home as HomeIcon,
  MapPin,
  MessageCircle,
  Plane,
  Search,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

const services = [
  { icon: Briefcase, title: 'Work Visa Guidance', text: 'Profile assessment, document planning and process guidance for overseas career opportunities.' },
  { icon: Plane, title: 'Visitor & Tourist Visa', text: 'Application guidance for individuals, couples and families planning international travel.' },
  { icon: GraduationCap, title: 'Study Visa Support', text: 'Course-focused counselling, admission document support and visa application preparation.' },
  { icon: Globe2, title: 'Overseas Career Guidance', text: 'Practical country and role guidance aligned with your qualifications and experience.' },
  { icon: BookOpen, title: 'SOP Writing', text: 'Clear, personalized statements of purpose built around your academic and career story.' },
  { icon: FileCheck2, title: 'Documentation Support', text: 'Organized checklists and document review to reduce confusion and avoidable omissions.' },
  { icon: FileText, title: 'Sponsor & Invitation Letters', text: 'Professional guidance for sponsor, invitation and supporting travel documents.' },
  { icon: HomeIcon, title: 'TRC Guidance', text: 'Step-by-step information and documentation support for residence-card processes.' },
];

const countries = [
  { name: 'Canada', code: 'ca', text: 'Study, work & visitor', tags: ['Study', 'Work', 'Tourist'] },
  { name: 'Australia', code: 'au', text: 'Study, work & visitor', tags: ['Study', 'Work', 'Tourist'] },
  { name: 'United Kingdom', code: 'gb', text: 'Study & visitor', tags: ['Europe', 'Study', 'Tourist'] },
  { name: 'United States', code: 'us', text: 'Study & visitor', tags: ['Study', 'Tourist'] },
  { name: 'Germany', code: 'de', text: 'Study & skilled pathways', tags: ['Europe', 'Schengen', 'Study', 'Work'] },
  { name: 'New Zealand', code: 'nz', text: 'Study & work', tags: ['Study', 'Work'] },
  { name: 'Albania', code: 'al', text: 'Overseas career guidance', tags: ['Europe', 'Work'] },
  { name: 'Azerbaijan', code: 'az', text: 'Work & visitor guidance', tags: ['Work', 'Tourist'] },
  { name: 'Malta', code: 'mt', text: 'Study & work', tags: ['Europe', 'Schengen', 'Study', 'Work'] },
  { name: 'Poland', code: 'pl', text: 'Study & work', tags: ['Europe', 'Schengen', 'Study', 'Work'] },
  { name: 'France', code: 'fr', text: 'Study & visitor', tags: ['Europe', 'Schengen', 'Study', 'Tourist'] },
  { name: 'Italy', code: 'it', text: 'Work & visitor', tags: ['Europe', 'Schengen', 'Work', 'Tourist'] },
  { name: 'Spain', code: 'es', text: 'Study & visitor', tags: ['Europe', 'Schengen', 'Study', 'Tourist'] },
  { name: 'Netherlands', code: 'nl', text: 'Study & work', tags: ['Europe', 'Schengen', 'Study', 'Work'] },
  { name: 'Ireland', code: 'ie', text: 'Study & work', tags: ['Europe', 'Study', 'Work'] },
  { name: 'UAE', code: 'ae', text: 'Work & visitor', tags: ['Middle East', 'Work', 'Tourist'] },
  { name: 'Qatar', code: 'qa', text: 'Career guidance', tags: ['Middle East', 'Work'] },
  { name: 'Saudi Arabia', code: 'sa', text: 'Career guidance', tags: ['Middle East', 'Work'] },
];

const filters = ['All', 'Europe', 'Schengen', 'Middle East', 'Study', 'Work', 'Tourist'];

const steps = [
  { icon: SearchCheck, number: '01', title: 'Profile Assessment', text: 'We understand your background, goals and preferred destination.' },
  { icon: FileCheck2, number: '02', title: 'Document Planning', text: 'You receive a clear checklist and practical application roadmap.' },
  { icon: Headphones, number: '03', title: 'Application Preparation', text: 'Our team helps organize and prepare the required application material.' },
  { icon: ShieldCheck, number: '04', title: 'Submission & Status Guidance', text: 'We guide you through the next steps until the authority’s decision.' },
];

const reasons = [
  { icon: Users, title: 'Profile-based guidance', text: 'Recommendations shaped around your education, experience and travel goal.' },
  { icon: BadgeCheck, title: 'Transparent process', text: 'Clear explanations of documentation, stages, costs and responsibilities.' },
  { icon: FileCheck2, title: 'Document support', text: 'Structured checklists and careful review before important submissions.' },
  { icon: Globe2, title: 'Country-specific assistance', text: 'Guidance organized by destination, visa category and applicant profile.' },
  { icon: MessageCircle, title: 'Clear communication', text: 'Simple updates and practical answers without confusing terminology.' },
  { icon: Building2, title: 'Dedicated consultation', text: 'A focused discussion to identify the most suitable next step for you.' },
];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.5 },
};

const Flag = ({ code, name }: { code: string; name: string }) => (
  <div className="h-11 w-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
    <img
      src={`https://flagcdn.com/w160/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 1x, https://flagcdn.com/w160/${code}.png 2x`}
      alt={`${name} flag`}
      width="64"
      height="44"
      loading="lazy"
      className="h-full w-full object-cover"
    />
  </div>
);

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('');

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return countries.filter((country) => {
      const matchesSearch = !normalizedQuery || country.name.toLowerCase().includes(normalizedQuery);
      const matchesFilter = activeFilter === 'All' || country.tags.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, query]);

  return (
    <div className="home-page overflow-hidden bg-white">
      <section className="relative min-h-[700px] bg-[#07182e] text-white lg:min-h-[760px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=82"
            alt="Professional visa consultation for international opportunities"
            width="2000"
            height="1250"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07182e] via-[#07182e]/92 to-[#07182e]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182e]/90 via-transparent to-[#07182e]/20" />
        </div>
        <div className="relative mx-auto flex min-h-[700px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:min-h-[760px] lg:px-8">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d5b26b]/40 bg-[#d5b26b]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#f0d89e]"><Sparkles size={15} /> Immigration & overseas career guidance</div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">Your global journey,<span className="block text-[#e4c47e]">planned with clarity.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">Practical visa, documentation and overseas career guidance for students, professionals, couples and families—built around your profile and goals.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="button-primary">Start Free Assessment <ArrowRight size={18} /></Link>
              <Link to="/checklist" className="button-secondary-on-dark">Check Visa Documents</Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 text-sm text-slate-200 sm:grid-cols-3">
              {['Profile-based guidance', 'Clear document planning', 'Support at every stage'].map((item) => <div key={item} className="flex items-center gap-2"><BadgeCheck className="shrink-0 text-[#e4c47e]" size={19} /> {item}</div>)}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8" aria-label="Business information">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-900/10 sm:grid-cols-3">
          <div className="p-6 sm:p-7"><div className="info-label">Office</div><div className="mt-2 flex items-center gap-2 font-bold text-[#0b1f3a]"><MapPin size={18} /> Phase 7, Mohali, Punjab</div></div>
          <div className="border-y border-slate-100 p-6 sm:border-x sm:border-y-0 sm:p-7"><div className="info-label">Consultation</div><div className="mt-2 font-bold text-[#0b1f3a]">Profile-first guidance</div></div>
          <div className="p-6 sm:p-7"><div className="info-label">Support</div><div className="mt-2 font-bold text-[#0b1f3a]">Monday to Saturday</div></div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl"><span className="eyebrow">What we do</span><h2 className="section-title">One trusted place for your international journey</h2><p className="section-copy">Straightforward support built around your profile—not a one-size-fits-all promise.</p></motion.div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.article key={service.title} {...reveal} transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }} className="service-card">
                <div className="service-icon"><service.icon size={23} /></div>
                <h3 className="mt-6 text-lg font-extrabold text-[#0b1f3a]">{service.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">{service.text}</p>
                <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8f1633]">Discuss your profile <ArrowRight size={16} /></Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="countries" className="scroll-mt-24 bg-[#f5f7fa] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="text-center"><span className="eyebrow">Explore destinations</span><h2 className="section-title mx-auto">Find a country that matches your goal</h2><p className="section-copy mx-auto">Use the filters to explore common destinations. Final options depend on your profile and current immigration requirements.</p></motion.div>

          <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <label className="relative block" htmlFor="country-search">
              <span className="sr-only">Search countries</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input id="country-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a country..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-base text-[#0b1f3a] outline-none transition focus:border-[#a87920] focus:bg-white focus:ring-4 focus:ring-[#a87920]/10" />
            </label>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Country filters">
              {filters.map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-[#a87920]/20 ${activeFilter === filter ? 'bg-[#8f1633] text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-[#d5b26b] hover:text-[#0b1f3a]'}`}>{filter}</button>)}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCountries.map((country, index) => {
              const selected = selectedCountry === country.name;
              return (
                <motion.button key={country.name} type="button" onClick={() => setSelectedCountry(country.name)} {...reveal} transition={{ duration: 0.4, delay: Math.min(index * 0.035, 0.18) }} className={`group flex min-h-[108px] items-center justify-between rounded-2xl border p-5 text-left transition focus:outline-none focus:ring-4 focus:ring-[#a87920]/20 ${selected ? 'border-[#8f1633] bg-[#fff7f8] shadow-lg shadow-[#8f1633]/10' : 'border-white bg-white shadow-sm hover:-translate-y-1 hover:border-[#d5b26b] hover:shadow-lg'}`} aria-pressed={selected}>
                  <div className="flex items-center gap-4"><Flag code={country.code} name={country.name} /><div><h3 className={`font-extrabold ${selected ? 'text-[#8f1633]' : 'text-[#0b1f3a]'}`}>{country.name}</h3><p className="mt-1 text-sm text-slate-500">{country.text}</p></div></div>
                  {selected ? <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8f1633] text-white"><Check size={15} strokeWidth={3} /></span> : <ArrowRight className="shrink-0 text-slate-300 transition group-hover:text-[#a87920]" size={19} />}
                </motion.button>
              );
            })}
          </div>
          {filteredCountries.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">No countries match your search. Try another name or filter.</div>}
          <div className="mt-8 flex min-h-[52px] justify-center">
            {selectedCountry && <Link to="/checklist" className="button-primary">View {selectedCountry} visa checklist <ArrowRight size={18} /></Link>}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <motion.div {...reveal}><span className="eyebrow">Our process</span><h2 className="section-title">Simple steps. Clear communication.</h2><p className="section-copy">Know what happens next, what documents are needed and where your application stands.</p><div className="mt-8 space-y-3">{['Transparent process guidance', 'Document checklist tailored to your case', 'No false visa guarantees'].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Check size={14} /></span>{item}</div>)}</div></motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => <motion.div key={step.number} {...reveal} transition={{ duration: 0.42, delay: index * 0.06 }} className="rounded-3xl bg-[#0b1f3a] p-7 text-white"><div className="flex items-center justify-between"><step.icon className="text-[#e4c47e]" size={26} /><span className="text-3xl font-black text-white/15">{step.number}</span></div><h3 className="mt-7 text-lg font-extrabold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{step.text}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#07182e] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl"><span className="eyebrow text-[#e4c47e]">Why The Visa Fox</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Guidance built on clarity and preparation</h2><p className="mt-5 text-base leading-8 text-slate-300">No invented success claims—just practical support designed to help you understand and prepare for the process.</p></motion.div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => <div key={reason.title} className="bg-[#07182e] p-7 transition hover:bg-[#0c213d]"><reason.icon className="text-[#e4c47e]" size={25} /><h3 className="mt-5 text-lg font-extrabold">{reason.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{reason.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...reveal} className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#8f1633] px-6 py-12 text-white shadow-2xl shadow-[#8f1633]/20 sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-14">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f0d89e]">Ready to begin?</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Let’s review your profile first.</h2><p className="mt-3 leading-7 text-white/80">Share your goal and our team will guide you toward the next practical step.</p></div>
          <Link to="/contact" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#8f1633] transition hover:-translate-y-1 lg:mt-0">Book Consultation <ArrowRight size={18} /></Link>
        </motion.div>
      </section>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-5 text-center text-xs leading-5 text-slate-500">Visa approvals and processing times are decided solely by the relevant embassy, consulate or immigration authority. The Visa Fox provides consultancy and documentation guidance.</div>
    </div>
  );
};

export default Home;

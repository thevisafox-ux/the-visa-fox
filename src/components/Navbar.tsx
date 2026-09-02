import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';

const routeLinks = [
  { label: 'Home', to: '/' },
  { label: 'Visa Checklist', to: '/checklist' },
  { label: 'SOP Generator', to: '/sop-generator' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact', to: '/contact' },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a87920]/20" onClick={() => setOpen(false)} aria-label="The Visa Fox home">
          <Logo size="lg" />
          <div className="leading-none">
            <div className="text-lg font-extrabold tracking-tight text-[#0b1f3a] sm:text-xl">THE VISA FOX</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a87920]">Navigating borders</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'text-[#8f1633]' : ''}`}>Home</NavLink>
          <a href="/#services" className="nav-link">Services</a>
          <a href="/#countries" className="nav-link">Countries</a>
          {routeLinks.slice(1).map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'text-[#8f1633]' : ''}`}>{link.label}</NavLink>)}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a href="tel:01723196794" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-[#0b1f3a] transition hover:border-[#d5b26b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a87920]/20"><Phone size={16} /> 0172 319 6794</a>
          <Link to="/contact?service=eligibility-check" className="inline-flex rounded-full bg-[#8f1633] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#8f1633]/20 transition hover:-translate-y-0.5 hover:bg-[#761029] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8f1633]/25">Free Profile Assessment</Link>
        </div>

        <button type="button" className="rounded-xl border border-slate-200 p-2.5 text-[#0b1f3a] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a87920]/20 xl:hidden" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-100 bg-white px-4 py-5 shadow-xl xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            <NavLink to="/" onClick={() => setOpen(false)} className="mobile-nav-link">Home</NavLink>
            <a href="/#services" onClick={() => setOpen(false)} className="mobile-nav-link">Services</a>
            <a href="/#countries" onClick={() => setOpen(false)} className="mobile-nav-link">Countries</a>
            {routeLinks.slice(1).map((link) => <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="mobile-nav-link">{link.label}</NavLink>)}
            <a href="tel:01723196794" className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#0b1f3a]"><Phone size={17} /> Call 0172 319 6794</a>
            <Link to="/contact?service=eligibility-check" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-[#8f1633] px-4 py-3 text-center text-sm font-bold text-white">Free Profile Assessment</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

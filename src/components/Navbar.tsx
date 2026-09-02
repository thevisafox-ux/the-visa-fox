import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Visa Checklist', to: '/checklist' },
  { label: 'SOP Generator', to: '/sop-generator' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact', to: '/contact' },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo size="lg" />
          <div className="leading-none">
            <div className="text-lg font-extrabold tracking-tight text-[#0b1f3a] sm:text-xl">THE VISA FOX</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a87920]">Navigating borders</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-sm font-semibold transition-colors ${isActive ? 'text-[#a87920]' : 'text-slate-600 hover:text-[#0b1f3a]'}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:01723196794" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-[#0b1f3a] hover:border-[#d5b26b]">
            <Phone size={16} /> 0172 319 6794
          </a>
          <Link to="/contact" className="rounded-full bg-[#8f1633] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#8f1633]/20 transition hover:-translate-y-0.5 hover:bg-[#761029]">Free Assessment</Link>
        </div>

        <button type="button" className="rounded-xl border border-slate-200 p-2.5 text-[#0b1f3a] lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-5 shadow-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-[#f7f1e5] text-[#8f1633]' : 'text-slate-700 hover:bg-slate-50'}`}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-3 rounded-xl bg-[#8f1633] px-4 py-3 text-center text-sm font-bold text-white">Get Free Assessment</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

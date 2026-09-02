import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageMeta from './components/PageMeta';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Checklist from './pages/Checklist';
import SopGenerator from './pages/SopGenerator';
import CacheManagement from './pages/CacheManagement';
import Legal from './pages/Legal';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [pathname]);
  return null;
};

const SiteRoutes = () => (
  <div className="min-h-screen bg-white text-slate-900">
    <ScrollToTop />
    <PageMeta />
    <Navbar />
    <main className="pt-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/sop-generator" element={<SopGenerator />} />
        <Route path="/cache-management" element={<CacheManagement />} />
        <Route path="/privacy-policy" element={<Legal type="privacy" />} />
        <Route path="/terms" element={<Legal type="terms" />} />
      </Routes>
    </main>
    <Footer />
    <a href="tel:01723196794" className="floating-call" aria-label="Call The Visa Fox" title="Call The Visa Fox">
      <Phone size={21} />
    </a>
  </div>
);

function App() {
  return <BrowserRouter><SiteRoutes /></BrowserRouter>;
}

export default App;

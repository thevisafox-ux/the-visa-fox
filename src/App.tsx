import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// Components
import Logo from './components/Logo';
import Footer from './components/Footer';
import VisaEligibilityModal from './components/VisaEligibilityModal';
import LoadingSpinner from './components/LoadingSpinner';

// Website Pages
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Checklist from './pages/Checklist';
import SopGenerator from './pages/SopGenerator';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Router>
      <div className="App bg-gray-50 min-h-screen">
        {/* Loading Spinner */}
        <LoadingSpinner isVisible={isLoading} />
        
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <DesktopLayout setIsLoading={setIsLoading} />
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden">
          <TabletLayout setIsLoading={setIsLoading} />
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <MobileLayout setIsLoading={setIsLoading} />
        </div>
      </div>
    </Router>
  );
}

// Desktop Layout Component
const DesktopLayout: React.FC<{ setIsLoading: (loading: boolean) => void }> = ({ setIsLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading]);

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Header */}
      <header className="bg-gradient-to-r from-navy via-navy/95 to-saffron text-white shadow-xl border-b border-white/10 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
          <div className="absolute top-20 right-10 w-24 h-24 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 left-20 w-16 h-16 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              onClick={() => {
                if (location.pathname !== '/') {
                  setIsLoading(true);
                }
              }}
              className="flex items-center space-x-4 group cursor-pointer"
            >
              <Logo size="lg" className="transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 logo-3d drop-shadow-lg" />
              <div className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent drop-shadow-sm">
                  The Visa Fox
                </h1>
                <p className="text-sm opacity-80 font-medium tracking-wide leading-tight">
                  Navigating Borders<br />
                  Delivering Dreams
                </p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8">
              <NavLink to="/" label="Home" setIsLoading={setIsLoading} />
              <NavLink to="/sop-generator" label="SOP Generator" setIsLoading={setIsLoading} />
              <NavLink to="/checklist" label="Checklist" setIsLoading={setIsLoading} />
              <NavLink to="/blogs" label="Blogs" setIsLoading={setIsLoading} />
              <NavLink to="/contact" label="Contact" setIsLoading={setIsLoading} />
              <VisaEligibilityButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Desktop Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/sop-generator" element={<SopGenerator />} />
        </Routes>
      </main>

      {/* Desktop Footer */}
      <Footer />
    </div>
  );
};

// Tablet Layout Component
const TabletLayout: React.FC<{ setIsLoading: (loading: boolean) => void }> = ({ setIsLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading]);

  return (
    <div className="min-h-screen bg-white">
      {/* Tablet Header */}
      <header className="bg-gradient-to-r from-navy via-navy/95 to-saffron text-white shadow-xl border-b border-white/10 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12 animate-pulse"></div>
          <div className="absolute top-16 right-8 w-20 h-20 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-8 left-16 w-12 h-12 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 py-5 relative z-10">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              onClick={() => {
                if (location.pathname !== '/') {
                  setIsLoading(true);
                }
              }}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <Logo size="md" className="transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 logo-3d drop-shadow-lg" />
                          <div className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent drop-shadow-sm">
                The Visa Fox
              </h1>
              <p className="text-xs opacity-80 font-medium tracking-wide leading-tight">
                Navigating Borders<br />
                Delivering Dreams
              </p>
            </div>
            </Link>
            
            {/* Tablet Navigation */}
            <nav className="flex items-center space-x-6">
              <NavLink to="/" label="Home" setIsLoading={setIsLoading} />
              <NavLink to="/sop-generator" label="SOP" setIsLoading={setIsLoading} />
              <NavLink to="/checklist" label="Checklist" setIsLoading={setIsLoading} />
              <NavLink to="/blogs" label="Blogs" setIsLoading={setIsLoading} />
              <NavLink to="/contact" label="Contact" setIsLoading={setIsLoading} />
              <VisaEligibilityButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Tablet Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/sop-generator" element={<SopGenerator />} />
        </Routes>
      </main>

      {/* Tablet Footer */}
      <Footer />
    </div>
  );
};

// Mobile Layout Component
const MobileLayout: React.FC<{ setIsLoading: (loading: boolean) => void }> = ({ setIsLoading }) => {
  const [isVisaModalOpen, setIsVisaModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading]);
  
  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-gray-50 to-white shadow-2xl min-h-screen relative overflow-hidden mobile-smooth-scroll mobile-tap-highlight">
      {/* Mobile App Header - Normal Position */}
      <div className="w-full max-w-sm mx-auto bg-gradient-to-r from-navy via-navy/95 to-saffron text-white shadow-lg border-b border-white/20 mobile-header-refined relative overflow-hidden rounded-b-3xl">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-2 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-4 w-12 h-12 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-2 left-8 w-8 h-8 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Subtle Animated Glow/Particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-2 left-6 w-16 h-16 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-8 right-8 w-10 h-10 bg-yellow-300/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-2 left-1/2 w-12 h-12 bg-blue-400/10 rounded-full blur-lg animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>
        
        <div className="flex items-center justify-between px-4 py-3 relative z-10">
          <Link 
            to="/" 
            onClick={() => {
              if (location.pathname !== '/') {
                setIsLoading(true);
              }
            }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <Logo size="md" className="transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 logo-3d drop-shadow-lg" />
            <div className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-base md:text-lg font-bold bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent drop-shadow-sm mobile-text-optimization">
                The Visa Fox
              </h1>
              <p className="text-[8px] md:text-[10px] opacity-80 font-medium tracking-wide mobile-text-optimization leading-tight">
                Navigating Borders<br />
                Delivering Dreams
              </p>
            </div>
          </Link>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsVisaModalOpen(true)}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-xs font-bold transition-all duration-300 transform hover:scale-105 shadow-lg border border-green-300/30"
            >
              🔍 Visa Check
            </button>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse shadow-sm"></div>
              <div className="w-2 h-2 bg-yellow-200 rounded-full opacity-60 animate-pulse shadow-sm" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-yellow-200 rounded-full opacity-30 animate-pulse shadow-sm" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Main Content - Optimized Spacing */}
      <main className="pt-4 pb-20 px-2 mobile-smooth-scroll min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/sop-generator" element={<SopGenerator />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation - 3D Design */}
      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-10/12 max-w-xs bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl mobile-nav-3d z-50 mobile-nav-refined rounded-3xl transition-all duration-300">
        <div className="flex items-center justify-around py-2 px-3 relative">
          {/* 3D Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-saffron/10 via-yellow-200/5 to-saffron/10 rounded-3xl blur-sm"></div>
          {/* 3D Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-saffron/20 via-yellow-200/10 to-saffron/20 rounded-3xl opacity-50"></div>
          <MobileNavLink to="/" icon="🏠" label="Home" setIsLoading={setIsLoading} />
          <MobileNavLink to="/sop-generator" icon="✍️" label="SOP" setIsLoading={setIsLoading} />
          <MobileNavLink to="/checklist" icon="📋" label="Checklist" setIsLoading={setIsLoading} />
          <MobileNavLink to="/blogs" icon="📚" label="Blogs" setIsLoading={setIsLoading} />
          <MobileNavLink to="/contact" icon="💬" label="Contact" setIsLoading={setIsLoading} />
        </div>
      </div>

      {/* Mobile Footer - Optimized Spacing */}
      <div className="pb-24">
        <Footer />
      </div>

      {/* Visa Eligibility Modal */}
      <VisaEligibilityModal 
        isOpen={isVisaModalOpen} 
        onClose={() => setIsVisaModalOpen(false)} 
      />
    </div>
  );
};

// Desktop/Tablet Navigation Link Component
const NavLink: React.FC<{ to: string; label: string; setIsLoading?: (loading: boolean) => void }> = ({ to, label, setIsLoading }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const handleClick = () => {
    if (setIsLoading && location.pathname !== to) {
      setIsLoading(true);
    }
  };
  
  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`font-medium transition-all duration-300 group relative ${
        isActive 
          ? 'text-yellow-200' 
          : 'text-white hover:text-yellow-200'
      }`}
    >
      <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
      {isActive && (
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-200 rounded-full animate-pulse"></div>
      )}
    </Link>
  );
};

// Mobile Navigation Link Component
const MobileNavLink: React.FC<{ to: string; icon: string; label: string; setIsLoading?: (loading: boolean) => void }> = ({ to, icon, label, setIsLoading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;
  
  const handleClick = () => {
    // Show loading spinner if navigating to different page
    if (setIsLoading && location.pathname !== to) {
      setIsLoading(true);
    }
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Navigate to the route
    navigate(to);
  };
  
  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center justify-center py-1 px-1 md:py-2 md:px-2 rounded-2xl transition-all duration-300 group relative mobile-button-3d w-12 h-12 md:w-14 md:h-14 transform-gpu hover:scale-110 active:scale-95 ${
        isActive 
          ? 'text-saffron bg-gradient-to-r from-saffron/20 to-yellow-200/20 shadow-xl mobile-nav-active border-2 border-saffron/30 rounded-2xl relative overflow-hidden' 
          : 'text-gray-600 hover:text-saffron hover:bg-gradient-to-r hover:from-gray-50/90 hover:to-saffron/10 mobile-nav-inactive rounded-2xl relative overflow-hidden'
      }`}
    >
      {/* 3D Shimmer Effect for Active State */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-2xl"></div>
      )}
      <span className={`text-lg md:text-xl mb-1 transform transition-all duration-300 drop-shadow-sm relative z-10 ${
        isActive 
          ? 'group-hover:scale-110 group-hover:rotate-3' 
          : 'group-hover:scale-105 group-hover:rotate-2'
      }`}>{icon}</span>
      <span className={`text-[9px] md:text-[10px] font-semibold transition-transform duration-300 tracking-wide leading-tight ${
        isActive 
          ? 'group-hover:translate-y-0.5 text-saffron' 
          : 'group-hover:translate-y-0.5 text-gray-500'
      }`}>{label}</span>
      {isActive && (
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-saffron rounded-full animate-pulse shadow-sm"></div>
      )}
    </button>
  );
};

// Visa Eligibility Check Button Component
const VisaEligibilityButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button 
        onClick={handleClick}
        className="visa-check-button text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 group relative overflow-hidden shadow-lg"
      >
        {/* Shimmer Effect */}
        <div className="shimmer-effect"></div>
        
        {/* Icon with enhanced animation */}
        <span className="text-xl group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 drop-shadow-lg relative z-10 text-white">🔍</span>
        
        {/* Text with better styling */}
        <span className="font-bold text-sm tracking-wide group-hover:translate-x-1 transition-transform duration-300 relative z-10 text-white">
          Visa Eligibility Check
        </span>
        
        {/* Pulse effect for active state */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </button>
      
      <VisaEligibilityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

// Mobile Visa Eligibility Check Button Component
const MobileVisaEligibilityButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleClick = () => {
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsModalOpen(true);
  };

  return (
    <>
      <button 
        onClick={handleClick}
        data-mobile-visa-button
        className="visa-check-button flex flex-col items-center justify-center py-2 px-2 rounded-2xl transition-all duration-300 group bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 hover:from-green-500 hover:via-emerald-600 hover:to-green-700 text-white shadow-lg relative overflow-hidden mobile-button-3d w-16 h-16 border border-green-300/30"
      >
        {/* Shimmer Effect */}
        <div className="shimmer-effect"></div>
        
        {/* Icon with enhanced animation */}
        <span className="text-lg mb-1 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 drop-shadow-sm relative z-10">🔍</span>
        
        {/* Text with better styling */}
        <span className="text-[10px] font-bold tracking-wide leading-tight group-hover:translate-y-0.5 transition-transform duration-300 relative z-10">
          Visa Check
        </span>
        
        {/* Pulse effect for active state */}
        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse shadow-sm"></div>
      </button>
      
      <VisaEligibilityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Mail, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'SOP Generator', path: '/sop-generator', icon: '✍️' },
        { name: 'Visa Checklist', path: '/checklist', icon: '📋' },
        { name: 'Student Visa', path: '/contact', icon: '🎓' },
        { name: 'Work Visa Guidance', path: '/contact', icon: '💼' },
        { name: 'PR Services', path: '/contact', icon: '🏠' },
      ]
    },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/contact' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Logo size="lg" className="logo-3d group-hover:scale-105 transition-transform duration-300" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-navy group-hover:text-saffron transition-colors duration-300">
                The Visa Fox
              </h1>
              <p className="text-xs text-gray-600">Navigating Borders, Delivering Dreams</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="flex items-center space-x-1 cursor-pointer font-medium transition-colors duration-200 text-gray-700 hover:text-saffron"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      isServicesDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`font-medium transition-all duration-200 relative ${
                      isActive(item.path)
                        ? 'text-saffron'
                        : 'text-gray-700 hover:text-saffron'
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-saffron"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
                
                {/* Services Dropdown */}
                {item.hasDropdown && isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.path}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-saffron hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="text-lg">{dropdownItem.icon}</span>
                        <span className="font-medium">{dropdownItem.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-saffron transition-colors duration-200">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-saffron transition-colors duration-200">
              <Mail className="w-4 h-4" />
              <span>info@thevisafox.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-saffron transition-colors duration-200">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat: 9AM-6PM</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-2 font-medium text-gray-700">
                          <span>{item.name}</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="pl-4 space-y-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center space-x-3 py-2 text-gray-600 hover:text-saffron transition-colors duration-200"
                            >
                              <span className="text-lg">{dropdownItem.icon}</span>
                              <span>{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-2 font-medium transition-colors duration-200 ${
                          isActive(item.path)
                            ? 'text-saffron border-l-4 border-saffron pl-4'
                            : 'text-gray-700 hover:text-saffron pl-4'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-6 border-t border-gray-200 space-y-4">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-saffron" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-saffron" />
                    <span>info@thevisafox.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-saffron" />
                    <span>Mon-Sat: 9AM-6PM</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-saffron" />
                    <span>SCO 103, Phase 7, Mohali, Punjab</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 
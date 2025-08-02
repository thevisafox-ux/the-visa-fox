import React from 'react';
import { MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, Phone, Clock, Award, Users } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-navy via-navy/95 to-saffron text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="section-padding">
          {/* Logo and Description - Top Section */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="group cursor-pointer flex justify-center mb-6">
              <Logo size="lg" className="logo-3d transform group-hover:scale-110 transition-all duration-300" />
            </div>
            <p className="text-gray-200 leading-relaxed text-base lg:text-lg text-center max-w-3xl mx-auto">
              Your trusted partner for visa guidance and immigration consulting. 
              We help Indian students and professionals achieve their international dreams through expert guidance.
            </p>
          </div>

          {/* Main Footer Content - Desktop Optimized */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Info - Desktop Enhanced */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center space-x-3">
                  <span className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
                    <span className="text-sm text-navy font-bold">🏢</span>
                  </span>
                  <span>About Us</span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Leading visa guidance and immigration consulting services for Indian students and professionals.
                </p>
              </div>
              
              {/* Contact Details - Desktop Optimized */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-saffron">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 group">
                    <MapPin className="w-5 h-5 text-saffron group-hover:scale-110 transition-transform duration-200 flex-shrink-0 mt-0.5" />
                    <span className="group-hover:text-saffron transition-colors text-sm">SCO 103, Phase 7, Mohali, Punjab</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <Mail className="w-5 h-5 text-saffron group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                    <span className="group-hover:text-saffron transition-colors text-sm">info@thevisafox.com</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <Phone className="w-5 h-5 text-saffron group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                    <span className="group-hover:text-saffron transition-colors text-sm">+91 98765 43210</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links - Desktop Enhanced */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center space-x-3">
                <span className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
                  <span className="text-sm text-navy font-bold">⚡</span>
                </span>
                <span>Quick Links</span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">Home</span>
                  </a>
                </li>
                <li>
                  <a href="/checklist" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">Visa Checklist</span>
                  </a>
                </li>
                <li>
                  <a href="/sop-generator" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">SOP Generator</span>
                  </a>
                </li>
                <li>
                  <a href="/blogs" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">Blogs</span>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">Contact</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Visa Guidance - Desktop Enhanced */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center space-x-3">
                <span className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
                  <span className="text-sm text-navy font-bold">🎯</span>
                </span>
                <span>Visa Guidance</span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/sop-generator" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">Student Visa</span>
                  </a>
                </li>
                <li>
                  <a href="/checklist" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">Work Visa Guidance</span>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">Tourist Visa</span>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">Permanent Residency</span>
                  </a>
                </li>
                <li>
                  <a href="/sop-generator" className="text-gray-300 hover:text-saffron transition-all duration-200 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 bg-saffron rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">SOP Writing</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Get Free Consultation - Desktop Enhanced */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center space-x-3">
                <span className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
                  <span className="text-sm text-navy font-bold">🎁</span>
                </span>
                <span>Free Consultation</span>
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ready to start your visa journey? Get expert guidance today.
                </p>
                <div className="space-y-3">
                  <a 
                    href="/contact" 
                    className="inline-block bg-gradient-to-r from-saffron to-fox-orange hover:from-fox-orange hover:to-saffron text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg text-sm w-full text-center"
                  >
                    Contact Now
                  </a>
                  <p className="text-xs text-gray-400 text-center">
                    No hidden charges • Expert guidance • 24/7 support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Connect With Us and Social Media - Desktop Enhanced */}
          <div className="text-center border-t border-white/10 pt-8">
            <h3 className="text-xl font-bold flex items-center space-x-3 justify-center mb-6">
              <span className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
                <span className="text-sm text-navy font-bold">💬</span>
              </span>
              <span>Connect With Us</span>
            </h3>
            <div className="flex space-x-6 justify-center mb-6">
              <a href="https://facebook.com/thevisafox" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-saffron transition-all duration-200 transform hover:scale-110 hover:rotate-3 bg-white/5 hover:bg-white/10 p-3 rounded-full">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/thevisafox" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-saffron transition-all duration-200 transform hover:scale-110 hover:rotate-3 bg-white/5 hover:bg-white/10 p-3 rounded-full">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/thevisafox" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-saffron transition-all duration-200 transform hover:scale-110 hover:rotate-3 bg-white/5 hover:bg-white/10 p-3 rounded-full">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/company/thevisafox" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-saffron transition-all duration-200 transform hover:scale-110 hover:rotate-3 bg-white/5 hover:bg-white/10 p-3 rounded-full">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://youtube.com/thevisafox" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-saffron transition-all duration-200 transform hover:scale-110 hover:rotate-3 bg-white/5 hover:bg-white/10 p-3 rounded-full">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Bottom Bar - Desktop Enhanced */}
          <div className="border-t border-white/20 mt-8 pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <p className="text-gray-300 text-sm">
                © {currentYear} The Visa Fox. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center space-x-6 text-sm">
                <a href="/privacy-policy" className="text-gray-300 hover:text-saffron transition-colors duration-200">Privacy Policy</a>
                <span className="text-gray-500 hidden lg:inline">|</span>
                <a href="/terms-of-service" className="text-gray-300 hover:text-saffron transition-colors duration-200">Terms of Service</a>
                <span className="text-gray-500 hidden lg:inline">|</span>
                <a href="/cookie-policy" className="text-gray-300 hover:text-saffron transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
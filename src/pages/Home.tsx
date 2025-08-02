import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Plane, 
  Briefcase, 
  Home as HomeIcon, 
  FileText, 
  CheckCircle, 
  Star, 
  MapPin, 
  Users,
  Award,
  Clock,
  Shield,
  ArrowRight
} from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import CountriesCarousel from '../components/CountriesCarousel';

const Home: React.FC = () => {
  const [showEligibilityPopup, setShowEligibilityPopup] = useState(false);
  const [eligibilityFormData, setEligibilityFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    city: '',
    pincode: '',
    state: '',
    requiredVisa: '',
    purposeOfVisa: '',
    income: '',
    visaBudget: '',
    education: '',
    workExperience: '',
    englishProficiency: '',
    familyAbroad: '',
    travelHistory: '',
    additionalInfo: ''
  });
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);

  // Carousel slides data
  const carouselSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Study Abroad Dreams',
      subtitle: 'Get your student visa with expert guidance from The Visa Fox',
      ctaText: 'Apply Now',
      ctaLink: '/sop-generator'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      title: 'Work Visa Guidance',
      subtitle: 'Get expert guidance for your work visa application as immigration consultants',
      ctaText: 'Get Started',
      ctaLink: '/checklist'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Permanent Residency',
      subtitle: 'Build your future in your dream country with our expert guidance',
      ctaText: 'Learn More',
      ctaLink: '/contact'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Professional SOP Writing',
      subtitle: 'Get your Statement of Purpose written by immigration experts',
      ctaText: 'Write SOP',
      ctaLink: '/sop-generator'
    }
  ];

  const countries = [
    { name: 'Canada', flag: '/canada-flag.png', emoji: '🇨🇦', visa: 'Student, Work, PR' },
    { name: 'Australia', flag: '/Australia-flag.png', emoji: '🇦🇺', visa: 'Student, Work, PR' },
    { name: 'UK', flag: '/UK-flag.png', emoji: '🇬🇧', visa: 'Student, Work, Tourist' },
    { name: 'USA', flag: '/USA-flag.png', emoji: '🇺🇸', visa: 'Student, Work, Tourist' },
    { name: 'Germany', flag: '/Germany-flag.png', emoji: '🇩🇪', visa: 'Student, Work, PR' },
    { name: 'New Zealand', flag: '/New-Zealand-flag.png', emoji: '🇳🇿', visa: 'Student, Work, PR' },
  ];

  const visaTypes = [
    { icon: GraduationCap, title: 'Student Visa', desc: 'Study abroad with expert guidance', color: 'from-blue-500 to-blue-600' },
    { icon: Briefcase, title: 'Work Visa Guidance', desc: 'Get expert guidance for work visa applications', color: 'from-green-500 to-green-600' },
    { icon: Plane, title: 'Tourist Visa', desc: 'Travel with confidence', color: 'from-purple-500 to-purple-600' },
    { icon: HomeIcon, title: 'Permanent Residency', desc: 'Build your future abroad', color: 'from-orange-500 to-orange-600' },
    { icon: FileText, title: 'SOP Writing', desc: 'Professional statement of purpose', color: 'from-red-500 to-red-600' },
  ];

  const whyChooseUs = [
    { icon: Users, title: 'Expert Team', desc: 'Certified immigration consultants' },
    { icon: Award, title: 'High Success Rate', desc: '95% visa approval rate' },
    { icon: Clock, title: 'Quick Processing', desc: 'Fast and efficient guidance' },
    { icon: Shield, title: 'Trusted Partner', desc: '10+ years of experience' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      city: 'Delhi',
      country: 'Canada',
      countryFlag: '/canada-flag.png',
      rating: 5,
      text: 'The Visa Fox helped me get my student visa for Canada. Their guidance was exceptional!',
      image: '👩‍🎓'
    },
    {
      name: 'Rahul Kumar',
      city: 'Mumbai',
      country: 'Australia',
      countryFlag: '/Australia-flag.png',
      rating: 5,
      text: 'Professional service and excellent support throughout my PR application process.',
      image: '👨‍💼'
    },
    {
      name: 'Anjali Patel',
      city: 'Bangalore',
      country: 'UK',
      countryFlag: '/UK-flag.png',
      rating: 5,
      text: 'Highly recommend! They made my UK student visa process smooth and stress-free.',
      image: '👩‍🎓'
    },
  ];

  const handleEligibilityFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Eligibility Form Data:', eligibilityFormData);
    // Here you would typically send the data to your backend
    alert('Thank you! We will contact you soon.');
    setShowEligibilityPopup(false);
    setEligibilityFormData({
      name: '', email: '', phone: '', dob: '', city: '', pincode: '', state: '',
      requiredVisa: '', purposeOfVisa: '', income: '', visaBudget: '', education: '',
      workExperience: '', englishProficiency: '', familyAbroad: '', travelHistory: '', additionalInfo: ''
    });
  };

  const handlePincodeChange = async (pincode: string) => {
    setEligibilityFormData(prev => ({ ...prev, pincode }));
    if (pincode.length === 6) {
      setIsLoadingPincode(true);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        if (data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          setEligibilityFormData(prev => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State
          }));
        }
      } catch (error) {
        console.error('Error fetching pincode data:', error);
      } finally {
        setIsLoadingPincode(false);
      }
    }
  };

  return (
    <div className="pb-20">
      {/* Image Carousel */}
      <div className="p-2 mb-4">
        <ImageCarousel slides={carouselSlides} autoPlayInterval={6000} />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy via-navy to-saffron text-white p-3 rounded-b-3xl">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Navigating Borders</h1>
            <p className="text-base md:text-lg opacity-90 mb-4 md:mb-6">Delivering Dreams</p>
            
            <div className="flex items-center justify-center space-x-4 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>SCO 103, Phase 7, Mohali, Punjab</span>
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={() => setShowEligibilityPopup(true)}
            className="app-button w-full max-w-sm mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle className="w-5 h-5 inline mr-2" />
            Check Visa Eligibility
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-2">

        {/* Popular Countries */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-navy mb-4">Popular Countries</h2>
          
          {/* All Screen Sizes - Auto-sliding Carousel */}
          <CountriesCarousel countries={countries} autoPlayInterval={2000} />
        </div>

        {/* Visa Services */}
        <div className="mb-4">
          <h2 className="text-lg md:text-xl font-bold text-navy mb-3 md:mb-4">Our Services</h2>
          <div className="space-y-2 md:space-y-3">
            {visaTypes.map((service, index) => (
              <motion.div
                key={service.title}
                className="app-card flex items-center space-x-3 md:space-x-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 p-3 md:p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  if (service.title === 'SOP Writing') {
                    window.location.href = '/sop-generator';
                  } else if (service.title === 'Student Visa' || service.title === 'Work Visa Guidance' || service.title === 'Tourist Visa' || service.title === 'Permanent Residency') {
                    window.location.href = '/checklist';
                  }
                }}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white`}>
                  <service.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-navy text-sm md:text-base mb-1">{service.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-tight">{service.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-4">
          <h2 className="text-lg md:text-xl font-bold text-navy mb-3 md:mb-4">Why Choose Us</h2>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {whyChooseUs.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="app-card text-center p-3 md:p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2 text-saffron" />
                <h3 className="font-semibold text-xs md:text-sm mb-1">{feature.title}</h3>
                <p className="text-[10px] md:text-xs text-gray-600 leading-tight">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-4">
          <h2 className="text-lg md:text-xl font-bold text-navy mb-3 md:mb-4">What Our Clients Say</h2>
          <div className="space-y-2 md:space-y-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="app-card p-3 md:p-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-2 md:space-x-3">
                  <div className="text-xl md:text-2xl">{testimonial.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1 md:mb-2">
                      <h3 className="font-semibold text-navy text-sm md:text-base">{testimonial.name}</h3>
                      <div className="flex items-center space-x-0.5 md:space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 leading-tight">{testimonial.text}</p>
                    <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500">
                      <span>{testimonial.city}</span>
                      <span>{testimonial.country}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Eligibility Form Popup */}
      {showEligibilityPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowEligibilityPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy">Visa Eligibility Check</h2>
                <button
                  onClick={() => setShowEligibilityPopup(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleEligibilityFormSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="app-section">
                  <h3 className="text-lg font-semibold text-navy mb-4 flex items-center">
                    <span className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={eligibilityFormData.name}
                      onChange={(e) => setEligibilityFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="app-input"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={eligibilityFormData.email}
                      onChange={(e) => setEligibilityFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="app-input"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={eligibilityFormData.phone}
                      onChange={(e) => setEligibilityFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="app-input"
                      required
                    />
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      value={eligibilityFormData.dob}
                      onChange={(e) => setEligibilityFormData(prev => ({ ...prev, dob: e.target.value }))}
                      className="app-input"
                      required
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="app-section">
                  <h3 className="text-lg font-semibold text-navy mb-4 flex items-center">
                    <span className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                    Location Information
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={eligibilityFormData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className="app-input"
                      maxLength={6}
                      required
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={eligibilityFormData.city}
                      readOnly={isLoadingPincode}
                      className="app-input"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={eligibilityFormData.state}
                      readOnly={isLoadingPincode}
                      className="app-input"
                      required
                    />
                  </div>
                </div>

                {/* Visa Information */}
                <div className="app-section">
                  <h3 className="text-lg font-semibold text-navy mb-4 flex items-center">
                    <span className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                    Visa Information
                  </h3>
                  <div className="space-y-3">
                    <select
                      value={eligibilityFormData.requiredVisa}
                      onChange={(e) => setEligibilityFormData(prev => ({ ...prev, requiredVisa: e.target.value }))}
                      className="app-input"
                      required
                    >
                      <option value="">Select Required Visa</option>
                      <option value="student">Student Visa</option>
                      <option value="work">Work Visa Guidance</option>
                      <option value="tourist">Tourist Visa</option>
                      <option value="pr">Permanent Residency</option>
                    </select>
                    <select
                      value={eligibilityFormData.purposeOfVisa}
                      onChange={(e) => setEligibilityFormData(prev => ({ ...prev, purposeOfVisa: e.target.value }))}
                      className="app-input"
                      required
                    >
                      <option value="">Purpose of Visa</option>
                      <option value="study">Study Abroad</option>
                      <option value="work">Work Abroad</option>
                      <option value="tourism">Tourism</option>
                      <option value="family">Family Reunion</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="app-section">
                  <h3 className="text-lg font-semibold text-navy mb-4 flex items-center">
                    <span className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                    Financial Information
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Annual Income (₹)"
                      value={eligibilityFormData.income}
                      onChange={(e) => setEligibilityFormData(prev => ({ ...prev, income: e.target.value }))}
                      className="app-input"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Visa Budget (₹)"
                      value={eligibilityFormData.visaBudget}
                      onChange={(e) => setEligibilityFormData(prev => ({ ...prev, visaBudget: e.target.value }))}
                      className="app-input"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="app-button w-full"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home; 
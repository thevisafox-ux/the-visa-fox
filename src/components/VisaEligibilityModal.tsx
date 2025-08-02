import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, GraduationCap, Briefcase, Plane, CheckCircle, AlertCircle } from 'lucide-react';

interface VisaEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisaEligibilityModal: React.FC<VisaEligibilityModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentCountry: '',
    targetCountry: '',
    visaType: '',
    education: '',
    workExperience: '',
    age: '',
    budget: '',
    timeline: '',
    additionalInfo: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const countries = [
    'India', 'Canada', 'USA', 'UK', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 
    'Japan', 'Singapore', 'New Zealand', 'Ireland', 'Netherlands', 'Sweden', 'Norway', 
    'Denmark', 'Finland', 'Switzerland', 'Austria', 'Belgium', 'Poland', 'Czech Republic', 
    'Hungary', 'Portugal', 'Greece', 'South Korea', 'Malaysia', 'Thailand', 'Qatar', 
    'Saudi Arabia', 'Kuwait', 'Oman', 'Bahrain', 'UAE'
  ];

  const visaTypes = [
    { value: 'student', label: 'Student Visa', icon: GraduationCap, color: 'from-blue-500 to-blue-600' },
    { value: 'tourist', label: 'Tourist Visa', icon: Plane, color: 'from-purple-500 to-purple-600' },
    { value: 'work', label: 'Work Visa Guidance', icon: Briefcase, color: 'from-green-500 to-green-600' },
    { value: 'business', label: 'Business Visa', icon: Globe, color: 'from-orange-500 to-orange-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Eligibility check submitted:', formData);
      setSubmitted(true);
      setIsSubmitting(false);
      
      // Show success notification
      setSuccessMessage('Thank you! Your eligibility check request has been submitted. We will contact you within 24 hours with a detailed assessment.');
      setShowSuccessNotification(true);
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setSuccessMessage('Sorry, there was an error. Please try again or contact us directly.');
      setShowSuccessNotification(true);
      
      // Auto-hide error notification after 4 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 4000);
    }
  };

  const nextStep = async () => {
    if (currentStep < 3) {
      setIsLoading(true);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentStep(currentStep + 1);
      setIsLoading(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', email: '', phone: '', currentCountry: '', targetCountry: '',
      visaType: '', education: '', workExperience: '', age: '', budget: '', timeline: '', additionalInfo: ''
    });
    setCurrentStep(1);
    setSubmitted(false);
    setShowSuccessNotification(false);
    setSuccessMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-start justify-center p-1 md:p-4 pt-2 md:pt-0 pb-20 md:pb-4"
          onClick={onClose}
        >
                     <motion.div
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9, y: 20 }}
             className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] md:max-h-[95vh] overflow-y-auto relative mx-1 md:mx-0"
             onClick={(e) => e.stopPropagation()}
           >
             {/* Success Notification */}
             <AnimatePresence>
               {showSuccessNotification && (
                 <motion.div
                   initial={{ opacity: 0, y: -20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="absolute top-4 left-4 right-4 z-20"
                 >
                   <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
                     <div className="flex items-start space-x-3">
                       <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                       <div className="flex-1">
                         <p className="text-sm text-green-800 font-medium">{successMessage}</p>
                       </div>
                       <button
                         onClick={() => setShowSuccessNotification(false)}
                         className="text-green-600 hover:text-green-800 transition-colors"
                       >
                         <X className="w-4 h-4" />
                       </button>
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-saffron border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-gray-700 font-semibold">Processing your information...</p>
                </div>
              </div>
            )}
            {/* Header */}
                         <div className="bg-gradient-to-r from-navy to-saffron text-white p-2 md:p-4 lg:p-6 rounded-t-xl md:rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Globe className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold">Visa Eligibility Assessment</h2>
                    <p className="text-[10px] md:text-xs lg:text-sm opacity-90">Get your personalized visa guidance & requirements</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
                         <div className="px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 bg-gray-50">
              <div className="flex items-center justify-between mb-1 md:mb-2">
                <span className="text-[10px] md:text-xs lg:text-sm font-semibold text-gray-700">Step {currentStep} of 3</span>
                <span className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-600">{Math.round((currentStep / 3) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                <motion.div
                  className="bg-gradient-to-r from-navy to-saffron h-1.5 md:h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Content */}
                         <div className="p-2 md:p-4 lg:p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 md:py-8"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">
                    Assessment Request Submitted!
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                    Thank you for your submission. Our visa experts will analyze your profile and contact you within 24 hours with personalized guidance and requirements.
                  </p>
                                     <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-700">
                     <p className="font-semibold text-gray-800">What happens next?</p>
                     <ul className="text-left space-y-0.5 md:space-y-1">
                       <li>• Profile analysis by visa experts</li>
                       <li>• Personalized visa strategy</li>
                       <li>• Document requirements list</li>
                       <li>• Timeline and cost estimate</li>
                     </ul>
                   </div>
                </motion.div>
              ) : (
                                 <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                                         <motion.div
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="space-y-2 md:space-y-3"
                     >
                       <h3 className="text-base md:text-lg font-semibold text-gray-800">Basic Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4">
                                                 <input
                           type="text"
                           required
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           className="w-full px-2 md:px-3 lg:px-4 py-2 md:py-2.5 lg:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-xs md:text-sm lg:text-base text-gray-900 placeholder-gray-500"
                           placeholder="Full Name"
                         />
                                                 <input
                           type="email"
                           required
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           className="w-full px-2 md:px-3 lg:px-4 py-2 md:py-2.5 lg:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-xs md:text-sm lg:text-base text-gray-900 placeholder-gray-500"
                           placeholder="Email Address"
                         />
                                                 <input
                           type="tel"
                           value={formData.phone}
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                           className="w-full px-2 md:px-3 lg:px-4 py-2 md:py-2.5 lg:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-xs md:text-sm lg:text-base text-gray-900 placeholder-gray-500"
                           placeholder="Phone Number"
                         />
                         <input
                           type="number"
                           value={formData.age}
                           onChange={(e) => setFormData({...formData, age: e.target.value})}
                           className="w-full px-2 md:px-3 lg:px-4 py-2 md:py-2.5 lg:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-xs md:text-sm lg:text-base text-gray-900 placeholder-gray-500"
                           placeholder="Age"
                         />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4">
                                                 <select
                           required
                           value={formData.currentCountry}
                           onChange={(e) => setFormData({...formData, currentCountry: e.target.value})}
                           className="w-full px-2 md:px-3 lg:px-4 py-2 md:py-2.5 lg:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-xs md:text-sm lg:text-base text-gray-900"
                         >
                          <option value="" className="text-gray-500">Current Country</option>
                          {countries.map(country => (
                            <option key={country} value={country} className="text-gray-900">{country}</option>
                          ))}
                        </select>
                                                 <select
                           required
                           value={formData.targetCountry}
                           onChange={(e) => setFormData({...formData, targetCountry: e.target.value})}
                           className="w-full px-2 md:px-3 lg:px-4 py-2 md:py-2.5 lg:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-xs md:text-sm lg:text-base text-gray-900"
                         >
                          <option value="" className="text-gray-500">Target Country</option>
                          {countries.filter(c => c !== formData.currentCountry).map(country => (
                            <option key={country} value={country} className="text-gray-900">{country}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Visa Type & Background */}
                  {currentStep === 2 && (
                                         <motion.div
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="space-y-3"
                     >
                       <h3 className="text-lg font-semibold text-gray-800">Visa Type & Background</h3>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Select Visa Type</label>
                                                 <div className="grid grid-cols-2 gap-3">
                          {visaTypes.map((visa) => (
                            <button
                              key={visa.value}
                              type="button"
                              onClick={() => setFormData({...formData, visaType: visa.value})}
                                                             className={`p-2 md:p-3 rounded-lg border-2 transition-all duration-200 ${
                                 formData.visaType === visa.value
                                   ? 'border-navy bg-navy/10'
                                   : 'border-gray-200 hover:border-gray-300'
                               }`}
                            >
                                                             <div className="flex flex-col items-center space-y-1">
                                 <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${visa.color} rounded-lg flex items-center justify-center text-white`}>
                                   <visa.icon className="w-4 h-4 md:w-5 md:h-5" />
                                 </div>
                                 <span className="font-semibold text-gray-900 text-xs md:text-sm text-center">{visa.label}</span>
                               </div>
                            </button>
                          ))}
                        </div>
                      </div>

                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                         <select
                           value={formData.education}
                           onChange={(e) => setFormData({...formData, education: e.target.value})}
                           className="w-full px-3 py-3 md:px-4 md:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-sm md:text-base text-gray-900"
                         >
                           <option value="" className="text-gray-500">Highest Education</option>
                           <option value="High School" className="text-gray-900">High School</option>
                           <option value="Diploma" className="text-gray-900">Diploma</option>
                           <option value="Bachelor's" className="text-gray-900">Bachelor's Degree</option>
                           <option value="Master's" className="text-gray-900">Master's Degree</option>
                           <option value="PhD" className="text-gray-900">PhD</option>
                         </select>
                         <select
                           value={formData.workExperience}
                           onChange={(e) => setFormData({...formData, workExperience: e.target.value})}
                           className="w-full px-3 py-3 md:px-4 md:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-sm md:text-base text-gray-900"
                         >
                           <option value="" className="text-gray-500">Work Experience</option>
                           <option value="No Experience" className="text-gray-900">No Experience</option>
                           <option value="1-2 years" className="text-gray-900">1-2 years</option>
                           <option value="3-5 years" className="text-gray-900">3-5 years</option>
                           <option value="5+ years" className="text-gray-900">5+ years</option>
                         </select>
                       </div>
                    </motion.div>
                  )}

                  {/* Step 3: Additional Details */}
                  {currentStep === 3 && (
                                         <motion.div
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="space-y-3"
                     >
                       <h3 className="text-lg font-semibold text-gray-800">Additional Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="w-full px-3 py-3 md:px-4 md:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-sm md:text-base text-gray-900"
                        >
                          <option value="" className="text-gray-500">Budget Range</option>
                          <option value="Under 5 Lakhs" className="text-gray-900">Under ₹5 Lakhs</option>
                          <option value="5-10 Lakhs" className="text-gray-900">₹5-10 Lakhs</option>
                          <option value="10-20 Lakhs" className="text-gray-900">₹10-20 Lakhs</option>
                          <option value="20+ Lakhs" className="text-gray-900">₹20+ Lakhs</option>
                        </select>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                          className="w-full px-3 py-3 md:px-4 md:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-sm md:text-base text-gray-900"
                        >
                          <option value="" className="text-gray-500">Timeline</option>
                          <option value="Immediate" className="text-gray-900">Immediate (1-3 months)</option>
                          <option value="3-6 months" className="text-gray-900">3-6 months</option>
                          <option value="6-12 months" className="text-gray-900">6-12 months</option>
                          <option value="1+ years" className="text-gray-900">1+ years</option>
                        </select>
                      </div>

                      <textarea
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                        className="w-full px-3 py-3 md:px-4 md:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all duration-200 text-sm md:text-base text-gray-900 placeholder-gray-500"
                        rows={4}
                        placeholder="Any additional information about your profile, goals, or specific requirements..."
                      />

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Important Note:</p>
                            <p>We provide visa guidance and consulting services. We do not provide visas directly but help you understand requirements and prepare documentation.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 md:px-6 py-2 text-gray-700 hover:text-gray-900 font-semibold transition-colors text-sm md:text-base"
                      >
                        Previous
                      </button>
                    )}
                    
                    <div className="flex space-x-2 md:space-x-3">
                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={isLoading}
                          className="bg-navy hover:bg-indian-blue text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center space-x-2 text-sm md:text-base"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            'Next'
                          )}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-navy hover:bg-indian-blue text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 text-sm md:text-base"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Assessment Request'}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VisaEligibilityModal; 
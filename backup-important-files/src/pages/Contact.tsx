import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Check if user came from eligibility check button
  useEffect(() => {
    const service = searchParams.get('service');
    if (service === 'eligibility-check') {
      setFormData(prev => ({
        ...prev,
        subject: 'Visa Eligibility Check Request',
        message: 'I would like to check my visa eligibility. Please contact me for a consultation.'
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call with better error handling
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 90% success rate
          if (Math.random() > 0.1) {
            resolve('success');
          } else {
            reject(new Error('Network error'));
          }
        }, 2000);
      });
      
      console.log('Contact form submitted:', formData);
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Show success message
      alert('Thank you! Your message has been sent successfully. We will contact you within 24 hours.');
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['info@thevisafox.com'],
      action: 'mailto:info@thevisafox.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['SCO 103, Phase 7', 'Mohali, Punjab 160062'],
      action: 'https://maps.google.com/?q=SCO+103,+Phase+7,+Mohali,+Punjab',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Friday: 9:00 AM - 7:00 PM', 'Saturday: 9:00 AM - 5:00 PM'],
      action: null,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy via-navy to-saffron text-white p-3 md:p-6 rounded-xl md:rounded-b-3xl">
        <div className="text-center space-y-2 md:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">Contact Us</h1>
            <p className="text-sm md:text-base lg:text-lg opacity-90">Get in touch with our immigration consultants</p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-2 md:p-4 space-y-3 md:space-y-4">
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              className="app-card hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className={`w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r ${info.color} rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  <info.icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-navy text-base md:text-lg">{info.title}</h3>
                  <div className="space-y-0.5 md:space-y-1 mt-1 md:mt-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-xs md:text-sm text-gray-600 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
                {info.action && (
                  <a
                    href={info.action}
                    target={info.action.startsWith('http') ? '_blank' : undefined}
                    rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="bg-saffron hover:bg-fox-orange text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold transition-colors text-xs md:text-sm"
                  >
                    {info.title === 'Email' ? 'Send Email' : 
                     info.title === 'Office Address' ? 'View Map' : 'Learn More'}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          className="app-card bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-4 md:mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-navy to-saffron rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Mail className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-navy mb-1 md:mb-2">Send us a Message</h2>
            <p className="text-sm md:text-base text-gray-600">We'll get back to you within 24 hours</p>
          </div>
          
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 md:py-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-navy mb-1 md:mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="app-button"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="app-input"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="app-input"
                  placeholder="Email Address"
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="app-input"
                  placeholder="Phone Number (Optional)"
                />
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="app-input"
                >
                  <option value="">Select Subject</option>
                  <option value="Student Visa">Student Visa</option>
                  <option value="Work Visa Guidance">Work Visa Guidance</option>
                  <option value="Tourist Visa">Tourist Visa</option>
                  <option value="Permanent Residency">Permanent Residency</option>
                  <option value="SOP Writing">SOP Writing</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="app-input"
                  placeholder="Tell us about your visa requirements..."
                />
              </div>

                              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="app-button w-full text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                      <span className="text-xs md:text-sm">Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-xs md:text-sm">Send Message</span>
                    </div>
                  )}
                </button>
            </form>
          )}
        </motion.div>

        {/* WhatsApp Contact */}
        <motion.div
          className="app-card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-xl md:text-2xl">💬</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-navy mb-1 md:mb-2">
              WhatsApp Consultation
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              Get instant answers to your visa questions via WhatsApp. Our experts are available 24/7 for quick consultations.
            </p>
            <div className="space-y-2 md:space-y-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 md:space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
              >
                <span className="text-lg md:text-xl">📱</span>
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-[10px] md:text-xs text-gray-500">Response within 5 minutes</p>
            </div>
          </div>
        </motion.div>

        {/* Office Location with Map */}
        <motion.div
          className="app-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-base md:text-lg font-semibold text-navy mb-3 md:mb-4">Visit Our Office</h2>
          
          {/* Map Container */}
          <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.5!2d76.7!3d30.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzAwLjAiTiA3NsKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Visa Fox Office Location"
              className="w-full h-64 rounded-lg"
            ></iframe>
          </div>
          
          <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-600">
            <div className="flex items-start space-x-2 md:space-x-3">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-saffron mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy text-xs md:text-sm">Office Address</p>
                <p className="text-xs md:text-sm">SCO 103, Phase 7, Mohali, Punjab 160062</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 md:space-x-3">
              <div className="w-4 h-4 md:w-5 md:h-5 text-saffron mt-0.5 flex-shrink-0">📍</div>
              <div>
                <p className="font-semibold text-navy text-xs md:text-sm">Landmark</p>
                <p className="text-xs md:text-sm">Near Phase 7 Market, Mohali</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 md:space-x-3">
              <div className="w-4 h-4 md:w-5 md:h-5 text-saffron mt-0.5 flex-shrink-0">🅿️</div>
              <div>
                <p className="font-semibold text-navy text-xs md:text-sm">Parking</p>
                <p className="text-xs md:text-sm">Available on premises</p>
              </div>
            </div>
          </div>
          
          <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-3">
            <a
              href="https://maps.google.com/?q=SCO+103,+Phase+7,+Mohali,+Punjab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 md:space-x-2 bg-saffron hover:bg-fox-orange text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold transition-colors text-xs md:text-sm"
            >
              <MapPin className="w-3 h-3 md:w-4 md:h-4" />
              <span>Get Directions</span>
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center space-x-1 md:space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold transition-colors text-xs md:text-sm"
            >
              <span>📞</span>
              <span>Call Now</span>
            </a>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="app-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-base md:text-lg font-semibold text-navy mb-3 md:mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3 md:space-y-4">
            {[
              {
                q: "How long does it take to get a response?",
                a: "We typically respond to all inquiries within 24 hours during business days."
              },
              {
                q: "Do you offer free consultation?",
                a: "Yes, we provide a free initial consultation to assess your visa requirements."
              },
              {
                q: "Can I schedule an appointment?",
                a: "Absolutely! You can call us or use the contact form to schedule a consultation."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-2 md:pb-3 last:border-b-0">
                <h3 className="font-semibold text-navy text-xs md:text-sm mb-0.5 md:mb-1">{faq.q}</h3>
                <p className="text-xs md:text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 
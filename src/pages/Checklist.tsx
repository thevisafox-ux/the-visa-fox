import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckSquare, Download, MapPin, GraduationCap, Briefcase, Plane, X } from 'lucide-react';

// Type definitions
interface ChecklistItem {
  category: string;
  items: string[];
}

interface VisaTypeData {
  [key: string]: ChecklistItem[];
}

interface ChecklistData {
  [key: string]: VisaTypeData;
}

const Checklist: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState('');
  const [showVisaTypePopup, setShowVisaTypePopup] = useState(false);
  const [showChecklistPopup, setShowChecklistPopup] = useState(false);
  const [clickedCountry, setClickedCountry] = useState('');

  const countries = [
    { name: 'Canada', code: 'ca', emoji: '🇨🇦' },
    { name: 'Australia', code: 'au', emoji: '🇦🇺' },
    { name: 'UK', code: 'gb', emoji: '🇬🇧' },
    { name: 'USA', code: 'us', emoji: '🇺🇸' },
    { name: 'Germany', code: 'de', emoji: '🇩🇪' },
    { name: 'New Zealand', code: 'nz', emoji: '🇳🇿' },
    { name: 'Ireland', code: 'ie', emoji: '🇮🇪' },
    { name: 'Netherlands', code: 'nl', emoji: '🇳🇱' },
    { name: 'France', code: 'fr', emoji: '🇫🇷' },
    { name: 'Italy', code: 'it', emoji: '🇮🇹' },
    { name: 'Spain', code: 'es', emoji: '🇪🇸' },
    { name: 'Sweden', code: 'se', emoji: '🇸🇪' },
    { name: 'Norway', code: 'no', emoji: '🇳🇴' },
    { name: 'Denmark', code: 'dk', emoji: '🇩🇰' },
    { name: 'Finland', code: 'fi', emoji: '🇫🇮' },
    { name: 'Switzerland', code: 'ch', emoji: '🇨🇭' },
    { name: 'Austria', code: 'at', emoji: '🇦🇹' },
    { name: 'Belgium', code: 'be', emoji: '🇧🇪' },
    { name: 'Poland', code: 'pl', emoji: '🇵🇱' },
    { name: 'Czech Republic', code: 'cz', emoji: '🇨🇿' },
    { name: 'Hungary', code: 'hu', emoji: '🇭🇺' },
    { name: 'Portugal', code: 'pt', emoji: '🇵🇹' },
    { name: 'Greece', code: 'gr', emoji: '🇬🇷' },
    { name: 'Japan', code: 'jp', emoji: '🇯🇵' },
    { name: 'South Korea', code: 'kr', emoji: '🇰🇷' },
    { name: 'Singapore', code: 'sg', emoji: '🇸🇬' },
    { name: 'Malaysia', code: 'my', emoji: '🇲🇾' },
    { name: 'Thailand', code: 'th', emoji: '🇹🇭' },
    { name: 'UAE', code: 'ae', emoji: '🇦🇪' },
    { name: 'Qatar', code: 'qa', emoji: '🇶🇦' },
    { name: 'Saudi Arabia', code: 'sa', emoji: '🇸🇦' },
    { name: 'Kuwait', code: 'kw', emoji: '🇰🇼' },
    { name: 'Oman', code: 'om', emoji: '🇴🇲' },
    { name: 'Bahrain', code: 'bh', emoji: '🇧🇭' }
  ];

  const visaTypes = [
    { type: 'Student Visa', icon: GraduationCap, color: 'from-blue-500 to-blue-600' },
    { type: 'Work Visa Guidance', icon: Briefcase, color: 'from-green-500 to-green-600' },
    { type: 'Tourist Visa', icon: Plane, color: 'from-purple-500 to-purple-600' },
    { type: 'Permanent Residency', icon: MapPin, color: 'from-orange-500 to-orange-600' }
  ];

  const checklistData: ChecklistData = {
    'Canada': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Passport-size photographs (2 copies, 35x45mm)',
          'Completed IMM 5257 Application Form',
          'Family Information Form (IMM 5645)',
          'Travel History (previous passports/visas)',
          'Marriage Certificate (if applicable)',
          'Birth Certificate'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 4 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents (if showing as financial support)',
          'Investment Portfolio Statements'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum $100,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter'
        ]},
        { category: 'Additional Requirements', items: [
          'Medical Examination (if staying more than 6 months)',
          'Police Clearance Certificate',
          'Proof of Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Educational Documents (if student)'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity)',
          'Passport-size photographs (6 copies)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'English Language Test Scores (IELTS/TOEFL)',
          'Letter of Acceptance from Canadian Institution',
          'Statement of Purpose',
          'Academic Resume/CV'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 4 months)',
          'Fixed Deposit Certificates',
          'Education Loan Sanction Letter (if applicable)',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Property Documents (if showing as financial support)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Visa Application Form (IMM 1294)',
          'Family Information Form (IMM 5707)',
          'Proof of Payment of Tuition Fees',
          'GIC Certificate (if applicable)'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Note', items: [
          'We provide expert guidance for work visa applications as immigration consultants',
          'We help you understand requirements and prepare your application',
          'We do not provide work permits directly - we guide you through the process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity)',
          'Passport-size photographs (6 copies)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'Employment Offer Letter from Canadian Employer',
          'LMIA (Labour Market Impact Assessment)',
          'All Academic and Professional Certificates',
          'Detailed Resume/CV',
          'Reference Letters from Previous Employers'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Salary Slips (last 12 months)',
          'Income Tax Returns (last 3 years)',
          'Employment Contracts'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Visa Application Forms',
          'Proof of Work Experience',
          'Employment Reference Letters'
        ]}
      ]
    },
    'USA': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'DS-160 Confirmation Page',
          'Visa Application Fee Receipt',
          'Passport-size photographs (2x2 inches, white background)',
          'Previous US Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'English Language Test Scores (TOEFL/IELTS)',
          'I-20 Form from US Institution',
          'SEVIS Fee Receipt',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 3 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Sponsor Affidavit of Support (I-134)',
          'Proof of Payment of Tuition Fees'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Visa Interview Appointment Letter',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'DS-160 Confirmation Page',
          'Visa Application Fee Receipt',
          'Passport-size photographs (2x2 inches, white background)',
          'Previous US Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 3 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ]
    },
    'UK': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Online Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (45x35mm)',
          'Previous UK Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'English Language Test Scores (IELTS/TOEFL)',
          'CAS (Confirmation of Acceptance for Studies)',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'ATAS Certificate (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Maintenance Funds Evidence'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Tuberculosis Test Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Online Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (45x35mm)',
          'Previous UK Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ]
    },
    'Australia': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Online Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (45x35mm)',
          'Previous Australian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport',
          'Passport-size photographs',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'English Language Test Scores (IELTS/TOEFL)',
          'Confirmation of Enrolment (CoE)',
          'Statement of Purpose',
          'Academic Resume/CV'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Financial Declaration Form',
          'Evidence of Financial Capacity',
          'Income Tax Returns'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Visa Application Form',
          'Overseas Student Health Cover (OSHC)',
          'Genuine Temporary Entrant (GTE) Statement'
        ]}
      ]
    },
    'New Zealand': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (45x35mm)',
          'Previous New Zealand Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'English Language Test Scores (IELTS/TOEFL)',
          'Offer of Place from NZ Institution',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'NZQA Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (NZ$20,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Chest X-ray Certificate',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Germany': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed National Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous German Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'German Language Test Scores (TestDaF/DSH)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'APS Certificate (for Indian students)'
        ]},
        { category: 'Financial Documents', items: [
          'Blocked Account (Sperrkonto) - €11,208',
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ]
    },
    'France': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous French Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'French Language Test Scores (TCF/TEF)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Campus France Certificate'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ]
    },
    'Ireland': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Irish Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'English Language Test Scores (IELTS/TOEFL)',
          'Letter of Acceptance from Irish Institution',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Evidence of Living Costs (€7,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Netherlands': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed MVV/Residence Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Dutch Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'English Language Test Scores (IELTS/TOEFL)',
          'Dutch Language Test Scores (if required)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Nuffic Certificate (for non-EU students)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€10,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Italy': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Italian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Italian Language Test Scores (CELI/CILS)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Declaration of Value (Dichiarazione di Valore)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€6,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ]
    },
    'Sweden': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Residence Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Swedish Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Swedish Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (SEK 8,514 per month)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Norway': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Residence Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Norwegian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Norwegian Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (NOK 123,519 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Denmark': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Residence Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Danish Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Danish Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (DKK 6,397 per month)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Finland': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Residence Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Finnish Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Finnish Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€6,720 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Switzerland': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Swiss Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'German/French/Italian Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (CHF 21,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Spain': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Spanish Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Spanish Language Test Scores (DELE)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Credential Evaluation (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€6,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Japan': {
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (45x35mm)',
          'Previous Japanese Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Japanese Language Test Scores (JLPT)',
          'English Language Test Scores (IELTS/TOEFL)',
          'Certificate of Eligibility (CoE)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (45x35mm)',
          'Previous Japanese Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ]
    },
    'Austria': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Austrian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'German Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€11,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Austrian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Belgium': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Belgian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Dutch/French Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€7,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Belgian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Poland': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Polish Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Polish Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€6,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Polish Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Czech Republic': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Czech Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Czech Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€5,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Czech Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Hungary': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Hungarian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Hungarian Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€6,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Hungarian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Portugal': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Portuguese Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Portuguese Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€7,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Portuguese Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Greece': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Schengen Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Schengen Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance (minimum €30,000 coverage)',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Long-Stay Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Greek Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Greek Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (€6,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 3 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Greek Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'South Korea': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Korean Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Korean Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Korean Language Test Scores (TOPIK)',
          'English Language Test Scores (IELTS/TOEFL)',
          'Certificate of Admission',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (KRW 20,000,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Korean Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Malaysia': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Malaysian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Pass Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Malaysian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'English Language Test Scores (IELTS/TOEFL)',
          'Malaysian Language Test Scores (if required)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (MYR 15,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Malaysian Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Thailand': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Thai Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Thai Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Thai Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (THB 200,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Thai Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Singapore': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Singapore Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Pass Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Singapore Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'English Language Test Scores (IELTS/TOEFL)',
          'In-Principle Approval (IPA) Letter',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ]
    },
    'Qatar': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Qatari Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Qatari Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Arabic Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (QAR 50,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Qatari Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Saudi Arabia': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Saudi Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Saudi Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Arabic Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (SAR 30,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Saudi Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Kuwait': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Kuwaiti Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Kuwaiti Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Arabic Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (KWD 3,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Kuwaiti Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Oman': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Omani Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Omani Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Arabic Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (OMR 3,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Omani Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'Bahrain': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Bahraini Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Bahraini Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Arabic Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (BHD 3,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (35x45mm)',
          'Previous Bahraini Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    },
    'UAE': {
      'Tourist Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (43x55mm)',
          'Previous UAE Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 3 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Business Registration (if self-employed)'
        ]},
        { category: 'Travel Documents', items: [
          'Detailed Travel Itinerary',
          'Flight Reservations (round-trip)',
          'Hotel Bookings/Accommodation Details',
          'Travel Insurance',
          'Invitation Letter (if visiting family/friends)',
          'Purpose of Visit Letter',
          'Employment Letter (confirming leave approval)'
        ]},
        { category: 'Additional Requirements', items: [
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents'
        ]}
      ],
      'Student Visa': [
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Student Visa Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (43x55mm)',
          'Previous UAE Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Academic Documents', items: [
          'All Academic Transcripts and Certificates',
          'Arabic Language Test Scores (if required)',
          'English Language Test Scores (IELTS/TOEFL)',
          'University Admission Letter',
          'Statement of Purpose',
          'Academic Resume/CV',
          'Letters of Recommendation',
          'Portfolio (for arts/design courses)',
          'Educational Credential Assessment'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Education Loan Sanction Letter (if applicable)',
          'Proof of Payment of Tuition Fees',
          'Financial Guarantee Letter',
          'Evidence of Living Costs (AED 30,000 per year)'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Educational Documents (if student)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ],
      'Work Visa Guidance': [
        { category: 'Important Note', items: [
          '⚠️ We provide guidance and consulting services for work visa applications',
          '⚠️ We do not provide work permits or visas directly',
          '⚠️ We help you understand requirements and prepare documentation',
          '⚠️ We guide you through the application process'
        ]},
        { category: 'Personal Documents', items: [
          'Valid Passport (minimum 6 months validity beyond stay)',
          'Completed Work Permit Application Form',
          'Visa Application Fee Receipt',
          'Passport-size photographs (43x55mm)',
          'Previous UAE Visas (if any)',
          'Travel History (previous passports/visas)',
          'Birth Certificate',
          'Marriage Certificate (if applicable)',
          'Police Clearance Certificate'
        ]},
        { category: 'Professional Documents', items: [
          'All Academic Transcripts and Certificates',
          'Professional Qualifications and Certifications',
          'Work Experience Certificates',
          'Employment Contracts or Job Offers',
          'CV/Resume with detailed work history',
          'Letters of Recommendation from Previous Employers',
          'Professional Portfolio (if applicable)',
          'Skills Assessment (if required)'
        ]},
        { category: 'Financial Documents', items: [
          'Bank Statements (last 6 months)',
          'Fixed Deposit Certificates',
          'Income Tax Returns (last 2 years)',
          'Salary Slips (last 6 months)',
          'Employment Letter with salary details',
          'Property Documents',
          'Investment Portfolio Statements',
          'Proof of Financial Stability'
        ]},
        { category: 'Additional Documents', items: [
          'Medical Examination Report',
          'Health Insurance Certificate',
          'Proof of Strong Ties to Home Country',
          'Employment Letter (confirming leave approval)',
          'Business Registration (if self-employed)',
          'Family Photos',
          'Property Documents',
          'Accommodation Confirmation'
        ]}
      ]
    }
  };

  const handleCountryClick = (countryName: string) => {
    setClickedCountry(countryName);
    setSelectedCountry(countryName);
    setSelectedVisaType('');
    setShowVisaTypePopup(true);
  };

  const handleVisaTypeSelect = (visaType: string) => {
    setSelectedVisaType(visaType);
    setShowVisaTypePopup(false);
    setShowChecklistPopup(true);
  };

  const downloadChecklist = () => {
    const checklist = getCurrentChecklist();
    if (!checklist) return;

    try {
    let content = `Visa Checklist - ${selectedCountry} ${selectedVisaType}\n\n`;
    
    checklist.forEach((section, index) => {
      content += `${index + 1}. ${section.category}\n`;
      section.items.forEach((item, itemIndex) => {
        content += `   ${itemIndex + 1}. ${item}\n`;
      });
      content += '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCountry}-${selectedVisaType}-Checklist.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
      
      // Show success message
      alert('Checklist downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      alert('Sorry, there was an error downloading the checklist. Please try again.');
    }
  };

  const getCurrentChecklist = (): ChecklistItem[] | null => {
    if (!selectedCountry || !selectedVisaType) return null;
    return checklistData[selectedCountry]?.[selectedVisaType] || null;
  };

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
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">Visa Checklist</h1>
            <p className="text-xs md:text-sm lg:text-lg opacity-90">Complete document checklist for your visa application</p>
          </motion.div>
        </div>
      </div>

      {/* Selection Section */}
      <div className="p-2 md:p-4 space-y-3 md:space-y-4">
        {/* Country Selection */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 bg-gradient-to-r from-[#f8fafc] to-[#f7f1e5] px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
            <div>
              <h2 className="text-lg font-extrabold text-[#0b1f3a] md:text-xl">Select Country</h2>
              <p className="mt-1 text-xs text-slate-500 md:text-sm">Choose a destination to view its visa document checklist</p>
            </div>
            <div className="w-fit rounded-full border border-[#d5b26b]/40 bg-white px-3 py-1.5 text-xs font-bold text-[#8f1633]">
              {countries.length} destinations
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:p-6 lg:grid-cols-4 xl:grid-cols-6">
            {countries.map((country, index) => {
              const isSelected = selectedCountry === country.name;
              return (
                <motion.button
                  key={country.name}
                  type="button"
                  onClick={() => handleCountryClick(country.name)}
                  className={`group relative min-h-[132px] overflow-hidden rounded-2xl border p-4 text-center transition-colors focus:outline-none focus:ring-4 focus:ring-[#a87920]/20 ${
                    isSelected
                      ? 'border-[#8f1633] bg-[#fff7f8] shadow-lg shadow-[#8f1633]/10'
                      : 'border-slate-200 bg-white hover:border-[#d5b26b] hover:bg-[#fffdf8] hover:shadow-lg'
                  }`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.025, 0.35), duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <span className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#8f1633] text-white shadow-md">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                  )}
                  <div className="mx-auto flex h-14 w-[74px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition-transform group-hover:scale-105">
                    <img
                      src={`https://flagcdn.com/w160/${country.code}.png`}
                      srcSet={`https://flagcdn.com/w80/${country.code}.png 1x, https://flagcdn.com/w160/${country.code}.png 2x`}
                      width="74"
                      height="48"
                      loading="lazy"
                      alt={`${country.name} flag`}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                        const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
                        fallback?.classList.remove('hidden');
                      }}
                    />
                    <span className="hidden text-3xl" aria-hidden="true">{country.emoji}</span>
                  </div>
                  <h3 className={`mt-3 break-words text-sm font-extrabold leading-tight ${isSelected ? 'text-[#8f1633]' : 'text-[#0b1f3a]'}`}>{country.name}</h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">View checklist</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        

        

                 

         {/* Visa Type Selection Popup */}
         {showVisaTypePopup && (
           <motion.div
             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-2 pb-20 md:pb-4"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
             <motion.div
               className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 w-full max-w-md mx-2 md:mx-4 relative"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
             >
               {/* Close Button */}
               <button
                 onClick={() => setShowVisaTypePopup(false)}
                 className="absolute top-2 right-2 md:top-4 md:right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
               
               <div className="text-center mb-3 md:mb-6">
                 <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-navy mb-1 md:mb-2">Select Visa Type</h2>
                 <p className="text-xs md:text-sm lg:text-base text-gray-600">Choose your visa type for {clickedCountry}</p>
               </div>
               
               <div className="space-y-2 md:space-y-3">
                 {visaTypes.map((visa, index) => (
                   <motion.button
                     key={visa.type}
                     onClick={() => handleVisaTypeSelect(visa.type)}
                     className="w-full flex items-center space-x-2 md:space-x-3 lg:space-x-4 p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl transition-all bg-gray-50 hover:bg-gray-100 hover:scale-105"
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.1 }}
                   >
                     <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${visa.color} rounded-lg md:rounded-xl flex items-center justify-center text-white`}>
                       <visa.icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                     </div>
                     <div className="flex-1 text-left">
                       <h3 className="font-semibold text-navy text-xs md:text-sm lg:text-base">{visa.type}</h3>
                     </div>
                   </motion.button>
                 ))}
               </div>
               

             </motion.div>
           </motion.div>
                    )}

         {/* Checklist Display Popup */}
         {showChecklistPopup && (
           <motion.div
             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-2 pb-20 md:pb-4"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
             <motion.div
               className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 w-full max-w-4xl mx-2 md:mx-4 max-h-[70vh] md:max-h-[90vh] overflow-y-auto relative"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
             >
               {/* Close Button */}
               <button
                 onClick={() => setShowChecklistPopup(false)}
                 className="absolute top-2 right-2 md:top-4 md:right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
               >
                 <X className="w-5 h-5" />
               </button>
               
               <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-6 space-y-2 md:space-y-0">
                 <div>
                   <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-navy">
                     {selectedCountry} - {selectedVisaType} Checklist
                   </h2>
                   <p className="text-xs md:text-sm lg:text-base text-gray-600">Complete document checklist for your visa application</p>
                 </div>
                 <button
                   onClick={downloadChecklist}
                   className="flex items-center space-x-2 text-saffron hover:text-saffron/80 bg-saffron/10 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg self-start md:self-auto"
                 >
                   <Download className="w-3 h-3 md:w-4 md:h-4" />
                   <span className="text-xs md:text-sm font-medium">Download</span>
                 </button>
               </div>

               <div className="space-y-2 md:space-y-3 lg:space-y-4">
                 {getCurrentChecklist()?.map((section, sectionIndex) => (
                   <div key={sectionIndex} className="border border-gray-200 rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 bg-gray-50">
                     <h3 className="font-semibold text-navy mb-1.5 md:mb-2 lg:mb-3 flex items-center">
                       <span className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-navy text-white rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold mr-1.5 md:mr-2 lg:mr-3">
                         {sectionIndex + 1}
                       </span>
                       <span className="text-xs md:text-sm lg:text-base">{section.category}</span>
                     </h3>
                     <div className="space-y-1 md:space-y-1.5 lg:space-y-2">
                       {section.items.map((item, itemIndex) => (
                         <div key={itemIndex} className="flex items-start space-x-1.5 md:space-x-2 lg:space-x-3">
                           <CheckSquare className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                           <span className="text-[10px] md:text-xs lg:text-sm text-gray-700">{item}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-6 flex justify-center">
                 <button
                   onClick={() => setShowChecklistPopup(false)}
                   className="px-6 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                 >
                   Close
                 </button>
               </div>
             </motion.div>
           </motion.div>
         )}
       </div>
     </div>
   );
 };

export default Checklist;

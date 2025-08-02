import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Copy, CheckCircle, ArrowRight, Sparkles, BookOpen, Target, Zap, ChevronDown, FileDown, Clock } from 'lucide-react';
import jsPDF from 'jspdf';

const SopGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    university: '',
    course: '',
    purpose: ''
  });
  const [generatedSOP, setGeneratedSOP] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [courseSearch, setCourseSearch] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [universitySearch, setUniversitySearch] = useState('');
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);
  const [showSOPModal, setShowSOPModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const countries = [
    // Popular countries with available flag images
    { name: 'Canada', flag: '/canada-flag.png', emoji: '🇨🇦' },
    { name: 'Australia', flag: '/Australia-flag.png', emoji: '🇦🇺' },
    { name: 'UK', flag: '/UK-flag.png', emoji: '🇬🇧' },
    { name: 'USA', flag: '/USA-flag.png', emoji: '🇺🇸' },
    { name: 'Germany', flag: '/Germany-flag.png', emoji: '🇩🇪' },
    { name: 'New Zealand', flag: '/New-Zealand-flag.png', emoji: '🇳🇿' },
    // Other countries without flags (will use emoji only)
    { name: 'India', flag: '', emoji: '🇮🇳' },
    { name: 'China', flag: '', emoji: '🇨🇳' },
    { name: 'Japan', flag: '', emoji: '🇯🇵' },
    { name: 'South Korea', flag: '', emoji: '🇰🇷' },
    { name: 'Singapore', flag: '', emoji: '🇸🇬' },
    { name: 'Malaysia', flag: '', emoji: '🇲🇾' },
    { name: 'UAE', flag: '', emoji: '🇦🇪' },
    { name: 'Qatar', flag: '', emoji: '🇶🇦' },
    { name: 'Saudi Arabia', flag: '', emoji: '🇸🇦' },
    { name: 'France', flag: '', emoji: '🇫🇷' },
    { name: 'Italy', flag: '', emoji: '🇮🇹' },
    { name: 'Spain', flag: '', emoji: '🇪🇸' },
    { name: 'Netherlands', flag: '', emoji: '🇳🇱' },
    { name: 'Sweden', flag: '', emoji: '🇸🇪' },
    { name: 'Denmark', flag: '', emoji: '🇩🇰' },
    { name: 'Norway', flag: '', emoji: '🇳🇴' },
    { name: 'Finland', flag: '', emoji: '🇫🇮' },
    { name: 'Switzerland', flag: '', emoji: '🇨🇭' },
    { name: 'Austria', flag: '', emoji: '🇦🇹' },
    { name: 'Belgium', flag: '', emoji: '🇧🇪' },
    { name: 'Portugal', flag: '', emoji: '🇵🇹' },
    { name: 'Ireland', flag: '', emoji: '🇮🇪' },
    { name: 'Poland', flag: '', emoji: '🇵🇱' },
    { name: 'Czech Republic', flag: '', emoji: '🇨🇿' },
    { name: 'Hungary', flag: '', emoji: '🇭🇺' },
    { name: 'Slovakia', flag: '', emoji: '🇸🇰' },
    { name: 'Slovenia', flag: '', emoji: '🇸🇮' },
    { name: 'Estonia', flag: '', emoji: '🇪🇪' },
    { name: 'Latvia', flag: '', emoji: '🇱🇻' },
    { name: 'Lithuania', flag: '', emoji: '🇱🇹' },
  ];

  const universities = [
    // Top Global Universities
    'Harvard University', 'Stanford University', 'Massachusetts Institute of Technology (MIT)', 'University of Cambridge', 'University of Oxford',
    'California Institute of Technology (Caltech)', 'University of California, Berkeley', 'Yale University', 'Princeton University', 'Columbia University',
    'University of Chicago', 'University of Pennsylvania', 'University of California, Los Angeles (UCLA)', 'University of California, San Diego', 'Cornell University',
    'University of Michigan', 'University of Washington', 'Duke University', 'Johns Hopkins University', 'Northwestern University', 'University of Texas at Austin',
    'University of Illinois at Urbana-Champaign', 'University of Wisconsin-Madison', 'University of California, Davis', 'University of California, Irvine',
    'University of Minnesota', 'University of Maryland', 'University of North Carolina at Chapel Hill', 'University of Virginia', 'University of Florida',
    'University of Pittsburgh', 'University of Southern California', 'New York University', 'Boston University', 'University of Rochester',
    'University of California, Santa Barbara', 'University of California, Santa Cruz', 'University of Colorado Boulder', 'University of Arizona', 'University of Utah',
    
    // UK Universities
    'Imperial College London', 'University College London (UCL)', 'London School of Economics and Political Science (LSE)', 'King\'s College London',
    'University of Edinburgh', 'University of Manchester', 'University of Bristol', 'University of Warwick', 'University of Glasgow', 'University of Birmingham',
    'University of Sheffield', 'University of Nottingham', 'University of Leeds', 'University of Southampton', 'University of York', 'University of Liverpool',
    'University of Newcastle', 'University of Durham', 'University of Exeter', 'University of Bath', 'University of Reading', 'University of Surrey',
    'University of Sussex', 'University of East Anglia', 'University of Leicester', 'University of St Andrews', 'University of Aberdeen', 'University of Dundee',
    'University of Strathclyde', 'University of Stirling', 'University of Heriot-Watt', 'University of Glasgow Caledonian', 'University of Abertay Dundee',
    
    // Canadian Universities
    'University of Toronto', 'University of British Columbia', 'McGill University', 'University of Alberta', 'University of Montreal',
    'University of Waterloo', 'University of Calgary', 'University of Ottawa', 'University of Western Ontario', 'Queen\'s University',
    'University of Manitoba', 'University of Saskatchewan', 'University of New Brunswick', 'University of Victoria', 'Dalhousie University',
    'University of Guelph', 'University of Windsor', 'University of Regina', 'University of Prince Edward Island', 'Memorial University of Newfoundland',
    'University of Northern British Columbia', 'University of Lethbridge', 'University of Moncton', 'University of Sherbrooke', 'University of Quebec',
    
    // Australian Universities
    'University of Melbourne', 'Australian National University', 'University of Sydney', 'University of Queensland', 'University of New South Wales',
    'Monash University', 'University of Western Australia', 'University of Adelaide', 'University of Technology Sydney', 'Queensland University of Technology',
    'RMIT University', 'University of Newcastle', 'University of Wollongong', 'University of South Australia', 'Curtin University',
    'Deakin University', 'Griffith University', 'La Trobe University', 'Macquarie University', 'Swinburne University of Technology',
    'University of Tasmania', 'University of Canberra', 'Charles Darwin University', 'James Cook University', 'University of Southern Queensland',
    
    // German Universities
    'Technical University of Munich', 'Ludwig Maximilian University of Munich', 'Heidelberg University', 'Humboldt University of Berlin',
    'Free University of Berlin', 'University of Bonn', 'University of Hamburg', 'University of Cologne', 'University of Frankfurt',
    'University of Göttingen', 'University of Tübingen', 'University of Freiburg', 'University of Mannheim', 'University of Konstanz',
    'University of Bayreuth', 'University of Bielefeld', 'University of Bochum', 'University of Dortmund', 'University of Duisburg-Essen',
    'University of Düsseldorf', 'University of Erlangen-Nuremberg', 'University of Giessen', 'University of Hannover', 'University of Jena',
    'University of Kiel', 'University of Leipzig', 'University of Mainz', 'University of Marburg', 'University of Münster',
    'University of Oldenburg', 'University of Osnabrück', 'University of Paderborn', 'University of Passau', 'University of Potsdam',
    'University of Regensburg', 'University of Rostock', 'University of Saarland', 'University of Siegen', 'University of Stuttgart',
    'University of Ulm', 'University of Wuppertal', 'University of Würzburg', 'University of Augsburg', 'University of Bamberg',
    
    // Other European Universities
    'ETH Zurich', 'University of Zurich', 'University of Geneva', 'University of Lausanne', 'University of Bern', 'University of Basel',
    'University of Amsterdam', 'Delft University of Technology', 'Eindhoven University of Technology', 'Leiden University', 'Utrecht University',
    'University of Groningen', 'Radboud University', 'Wageningen University', 'Tilburg University', 'Erasmus University Rotterdam',
    'University of Paris-Saclay', 'Sorbonne University', 'École Normale Supérieure', 'École Polytechnique', 'Sciences Po',
    'University of Lyon', 'University of Strasbourg', 'University of Bordeaux', 'University of Toulouse', 'University of Lille',
    'University of Nice', 'University of Montpellier', 'University of Nantes', 'University of Rennes', 'University of Grenoble',
    'University of Aix-Marseille', 'University of Poitiers', 'University of Tours', 'University of Orléans', 'University of Reims',
    'University of Angers', 'University of Besançon', 'University of Brest', 'University of Caen', 'University of Clermont-Ferrand',
    'University of Dijon', 'University of Limoges', 'University of Metz', 'University of Mulhouse', 'University of Nancy',
    'University of Perpignan', 'University of Rouen', 'University of Saint-Étienne', 'University of Valenciennes', 'University of Versailles',
    
    // Asian Universities
    'National University of Singapore', 'Nanyang Technological University', 'Singapore Management University', 'Singapore University of Technology and Design',
    'University of Tokyo', 'Kyoto University', 'Osaka University', 'Tohoku University', 'Tokyo Institute of Technology', 'Hokkaido University',
    'Kyushu University', 'Nagoya University', 'Waseda University', 'Keio University', 'Hiroshima University', 'Tokyo University of Science',
    'Kobe University', 'Chiba University', 'Yokohama National University', 'Tokyo Medical and Dental University', 'Tokyo University of Agriculture and Technology',
    'Seoul National University', 'Korea Advanced Institute of Science and Technology', 'Yonsei University', 'Korea University', 'Sungkyunkwan University',
    'Hanyang University', 'Kyung Hee University', 'Pusan National University', 'Chung-Ang University', 'Ewha Womans University',
    'Tsinghua University', 'Peking University', 'Fudan University', 'Shanghai Jiao Tong University', 'Zhejiang University',
    'University of Science and Technology of China', 'Nanjing University', 'Sun Yat-sen University', 'Huazhong University of Science and Technology',
    'Wuhan University', 'Xi\'an Jiaotong University', 'Harbin Institute of Technology', 'Tongji University', 'Sichuan University',
    'Beijing Normal University', 'East China Normal University', 'Central South University', 'South China University of Technology',
    'University of Hong Kong', 'Chinese University of Hong Kong', 'Hong Kong University of Science and Technology', 'City University of Hong Kong',
    'Hong Kong Polytechnic University', 'Hong Kong Baptist University', 'Lingnan University', 'Education University of Hong Kong',
    'National Taiwan University', 'National Tsing Hua University', 'National Chiao Tung University', 'National Cheng Kung University',
    'National Yang Ming Chiao Tung University', 'National Central University', 'National Sun Yat-sen University', 'National Taiwan Normal University',
    
    // Indian Universities
    'Indian Institute of Technology Bombay', 'Indian Institute of Technology Delhi', 'Indian Institute of Technology Madras', 'Indian Institute of Technology Kanpur',
    'Indian Institute of Technology Kharagpur', 'Indian Institute of Technology Roorkee', 'Indian Institute of Technology Guwahati', 'Indian Institute of Technology Hyderabad',
    'Indian Institute of Technology Indore', 'Indian Institute of Technology Jodhpur', 'Indian Institute of Technology Patna', 'Indian Institute of Technology Ropar',
    'Indian Institute of Technology Bhubaneswar', 'Indian Institute of Technology Gandhinagar', 'Indian Institute of Technology Mandi', 'Indian Institute of Technology Palakkad',
    'Indian Institute of Technology Tirupati', 'Indian Institute of Technology Dhanbad', 'Indian Institute of Technology Bhilai', 'Indian Institute of Technology Goa',
    'Indian Institute of Technology Jammu', 'Indian Institute of Technology Dharwad', 'Indian Institute of Technology Varanasi', 'Indian Institute of Technology Ropar',
    'Delhi University', 'Jawaharlal Nehru University', 'Banaras Hindu University', 'University of Calcutta', 'University of Mumbai',
    'University of Madras', 'University of Mysore', 'University of Pune', 'University of Allahabad', 'University of Lucknow',
    'Aligarh Muslim University', 'Jamia Millia Islamia', 'Jamia Hamdard', 'Amrita Vishwa Vidyapeetham', 'VIT University',
    'Manipal University', 'BITS Pilani', 'Thapar University', 'SRM University', 'KIIT University',
    'Symbiosis International University', 'NMIMS University', 'Amity University', 'Lovely Professional University', 'Chandigarh University',
    
    // Other International Universities
    'University of Auckland', 'University of Otago', 'University of Canterbury', 'Victoria University of Wellington', 'Massey University',
    'University of Waikato', 'Lincoln University', 'Auckland University of Technology', 'University of the South Pacific',
    'University of Cape Town', 'University of Witwatersrand', 'University of Stellenbosch', 'University of Pretoria', 'University of KwaZulu-Natal',
    'University of Johannesburg', 'University of the Western Cape', 'University of Fort Hare', 'University of Venda', 'University of Limpopo',
    'University of Zululand', 'University of the Free State', 'University of Mpumalanga', 'University of South Africa', 'Rhodes University',
    'University of the North West', 'University of Technology', 'Cape Peninsula University of Technology', 'Durban University of Technology',
    'Tshwane University of Technology', 'Vaal University of Technology', 'Central University of Technology', 'Mangosuthu University of Technology',
    'University of São Paulo', 'University of Campinas', 'Federal University of Rio de Janeiro', 'University of Brasília', 'Federal University of Minas Gerais',
    'University of Buenos Aires', 'National University of Córdoba', 'National University of La Plata', 'University of Chile', 'Pontifical Catholic University of Chile',
    'National University of Colombia', 'University of the Andes', 'National University of Mexico', 'Autonomous University of Mexico', 'University of Guadalajara',
    'University of Costa Rica', 'University of Panama', 'University of Havana', 'University of the West Indies', 'University of Puerto Rico',
    'University of the Philippines', 'Chulalongkorn University', 'Mahidol University', 'Thammasat University', 'Kasetsart University',
    'University of Malaya', 'Universiti Kebangsaan Malaysia', 'Universiti Putra Malaysia', 'Universiti Sains Malaysia', 'Universiti Teknologi Malaysia',
    'National University of Singapore', 'Nanyang Technological University', 'Singapore Management University', 'Singapore University of Technology and Design',
    'University of Indonesia', 'Gadjah Mada University', 'Bandung Institute of Technology', 'Bogor Agricultural University', 'University of Airlangga',
    'University of Brawijaya', 'University of Diponegoro', 'University of Hasanuddin', 'University of Padjadjaran', 'University of Sebelas Maret',
    'University of Sumatera Utara', 'University of Syiah Kuala', 'University of Udayana', 'University of Udayana', 'University of Udayana',
    
    // Specialized Institutions
    'Massachusetts Institute of Technology (MIT)', 'California Institute of Technology (Caltech)', 'Imperial College London', 'ETH Zurich',
    'Technical University of Munich', 'Delft University of Technology', 'Eindhoven University of Technology', 'KTH Royal Institute of Technology',
    'Chalmers University of Technology', 'Norwegian University of Science and Technology', 'Technical University of Denmark', 'Aalto University',
    'University of Technology Sydney', 'Queensland University of Technology', 'RMIT University', 'Swinburne University of Technology',
    'University of Technology Malaysia', 'King Mongkut\'s University of Technology Thonburi', 'King Mongkut\'s Institute of Technology Ladkrabang',
    'King Mongkut\'s University of Technology North Bangkok', 'Suranaree University of Technology', 'Mahanakorn University of Technology',
    'Asian Institute of Technology', 'International Islamic University Malaysia', 'Universiti Teknologi MARA', 'Universiti Malaysia Perlis',
    'Universiti Malaysia Pahang', 'Universiti Malaysia Terengganu', 'Universiti Malaysia Kelantan', 'Universiti Malaysia Sabah',
    'Universiti Malaysia Sarawak', 'Universiti Tun Hussein Onn Malaysia', 'Universiti Teknikal Malaysia Melaka', 'Universiti Sultan Zainal Abidin',
    'Universiti Malaysia Terengganu', 'Universiti Malaysia Kelantan', 'Universiti Malaysia Sabah', 'Universiti Malaysia Sarawak',
    'Universiti Tun Hussein Onn Malaysia', 'Universiti Teknikal Malaysia Melaka', 'Universiti Sultan Zainal Abidin', 'Universiti Malaysia Terengganu',
    'Universiti Malaysia Kelantan', 'Universiti Malaysia Sabah', 'Universiti Malaysia Sarawak', 'Universiti Tun Hussein Onn Malaysia',
    'Universiti Teknikal Malaysia Melaka', 'Universiti Sultan Zainal Abidin', 'Universiti Malaysia Terengganu', 'Universiti Malaysia Kelantan',
    'Universiti Malaysia Sabah', 'Universiti Malaysia Sarawak', 'Universiti Tun Hussein Onn Malaysia', 'Universiti Teknikal Malaysia Melaka',
    'Universiti Sultan Zainal Abidin', 'Universiti Malaysia Terengganu', 'Universiti Malaysia Kelantan', 'Universiti Malaysia Sabah',
    'Universiti Malaysia Sarawak', 'Universiti Tun Hussein Onn Malaysia', 'Universiti Teknikal Malaysia Melaka', 'Universiti Sultan Zainal Abidin'
  ];

  const courses = [
    // Computer Science & Technology
    'Computer Science', 'Software Engineering', 'Information Technology', 'Computer Engineering',
    'Data Science', 'Data Analytics', 'Artificial Intelligence', 'Machine Learning',
    'Cybersecurity', 'Network Engineering', 'Web Development', 'Mobile App Development',
    'Cloud Computing', 'Database Management', 'Game Development', 'Digital Forensics',
    
    // Engineering
    'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Chemical Engineering',
    'Aerospace Engineering', 'Biomedical Engineering', 'Environmental Engineering', 'Industrial Engineering',
    'Petroleum Engineering', 'Nuclear Engineering', 'Materials Science', 'Robotics Engineering',
    'Automotive Engineering', 'Marine Engineering', 'Mining Engineering', 'Textile Engineering',
    
    // Business & Management
    'Business Administration', 'Business Management', 'International Business', 'Finance',
    'Accounting', 'Marketing', 'Human Resource Management', 'Supply Chain Management',
    'Project Management', 'Entrepreneurship', 'Economics', 'Public Administration',
    'Hospitality Management', 'Tourism Management', 'Event Management', 'Sports Management',
    
    // Medicine & Healthcare
    'Medicine (MBBS)', 'Dentistry', 'Pharmacy', 'Nursing', 'Physiotherapy',
    'Occupational Therapy', 'Medical Laboratory Science', 'Radiology', 'Anesthesiology',
    'Cardiology', 'Neurology', 'Pediatrics', 'Psychiatry', 'Surgery', 'Oncology',
    'Public Health', 'Biomedical Sciences', 'Nutrition', 'Dietetics',
    
    // Law & Legal Studies
    'Law (LLB)', 'Criminal Law', 'Corporate Law', 'International Law', 'Human Rights Law',
    'Environmental Law', 'Tax Law', 'Intellectual Property Law', 'Constitutional Law',
    'Family Law', 'Labor Law', 'Immigration Law', 'Criminal Justice',
    
    // Arts & Humanities
    'English Literature', 'History', 'Philosophy', 'Political Science', 'Sociology',
    'Anthropology', 'Archaeology', 'Classical Studies', 'Religious Studies', 'Linguistics',
    'Journalism', 'Mass Communication', 'Media Studies', 'Film Studies', 'Theater Arts',
    'Music', 'Fine Arts', 'Creative Writing', 'Translation Studies',
    
    // Design & Architecture
    'Architecture', 'Interior Design', 'Graphic Design', 'Fashion Design', 'Industrial Design',
    'Landscape Architecture', 'Urban Planning', 'Product Design', 'Game Design', 'UI/UX Design',
    'Animation', 'Visual Arts', 'Photography', 'Digital Arts', 'Textile Design',
    
    // Psychology & Social Sciences
    'Psychology', 'Clinical Psychology', 'Counseling Psychology', 'Educational Psychology',
    'Industrial Psychology', 'Social Work', 'Criminology', 'Social Psychology', 'Child Psychology',
    'Forensic Psychology', 'Sports Psychology', 'Health Psychology',
    
    // Education
    'Education', 'Early Childhood Education', 'Elementary Education', 'Secondary Education',
    'Special Education', 'Educational Leadership', 'Curriculum Development', 'Educational Technology',
    'Adult Education', 'TESOL (Teaching English)', 'Physical Education',
    
    // Science
    'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Statistics', 'Astronomy',
    'Geology', 'Meteorology', 'Oceanography', 'Botany', 'Zoology', 'Microbiology',
    'Biochemistry', 'Biotechnology', 'Environmental Science', 'Marine Biology',
    
    // Agriculture & Food
    'Agriculture', 'Agricultural Engineering', 'Food Science', 'Horticulture', 'Animal Science',
    'Dairy Technology', 'Fisheries', 'Forestry', 'Soil Science', 'Agricultural Economics',
    
    // Aviation & Transportation
    'Aviation Management', 'Aeronautical Engineering', 'Air Traffic Control', 'Pilot Training',
    'Logistics Management', 'Transportation Engineering', 'Maritime Studies',
    
    // Fashion & Beauty
    'Fashion Design', 'Fashion Merchandising', 'Cosmetology', 'Beauty Therapy', 'Textile Technology',
    'Fashion Marketing', 'Jewelry Design', 'Fashion Styling',
    
    // Sports & Fitness
    'Sports Science', 'Physical Education', 'Sports Management', 'Exercise Science', 'Athletic Training',
    'Sports Medicine', 'Fitness Management', 'Recreation Management',
    
    // Environmental & Sustainability
    'Environmental Science', 'Environmental Engineering', 'Sustainability Studies', 'Climate Science',
    'Renewable Energy', 'Waste Management', 'Environmental Policy', 'Conservation Biology',
    
    // Media & Communication
    'Journalism', 'Broadcasting', 'Public Relations', 'Advertising', 'Digital Marketing',
    'Film Production', 'Television Production', 'Radio Production', 'Media Management',
    
    // Hospitality & Tourism
    'Hospitality Management', 'Tourism Management', 'Hotel Management', 'Restaurant Management',
    'Event Management', 'Travel Management', 'Culinary Arts', 'Food Service Management',
    
    // Other Professional Programs
    'Library Science', 'Information Management', 'Archival Studies', 'Museum Studies',
    'Urban Studies', 'Regional Planning', 'Disaster Management', 'Security Studies',
    'Intelligence Studies', 'Military Science', 'Fire Science', 'Emergency Management'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowFullScreenLoader(true);
    setAiProgress(0);

    // Enhanced AI loading animation with progress simulation
    const progressInterval = setInterval(() => {
      setAiProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // Simulate AI processing with different stages
    setTimeout(() => {
      clearInterval(progressInterval);
      setAiProgress(100);

    setTimeout(() => {
      const sop = generateSOP(formData);
      setGeneratedSOP(sop);
      setIsGenerating(false);
        setShowFullScreenLoader(false);
        setShowSOPModal(true);
        setAiProgress(0);
      }, 500);
    }, 15000); // Changed to 15 seconds
  };

  const generateSOP = (data: typeof formData) => {
    return `Statement of Purpose

Dear Admissions Committee,

My name is ${data.name}, and I am writing to express my sincere interest in pursuing ${data.course} at your esteemed institution in ${data.country}. This opportunity represents a significant step in my academic and professional journey, and I am excited to contribute to the diverse and dynamic learning environment at ${data.university}.

Academic Background and Motivation

My academic journey has been driven by a deep passion for ${data.course.toLowerCase()}. Throughout my undergraduate studies, I have consistently demonstrated strong analytical skills and a commitment to excellence. My coursework in related subjects has provided me with a solid foundation, and I am eager to build upon this knowledge through advanced studies.

Why ${data.country}?

I have chosen to pursue my education in ${data.country} because of its world-class education system, cutting-edge research facilities, and multicultural environment. The country's commitment to innovation and academic excellence aligns perfectly with my career aspirations. Additionally, ${data.country}'s strong industry connections and opportunities for practical experience will be invaluable for my professional development.

Why This University?

${data.university} stands out as my preferred choice due to its exceptional faculty, state-of-the-art facilities, and strong emphasis on research and innovation. The university's commitment to fostering critical thinking and practical skills development resonates with my learning objectives. I am particularly drawn to the university's collaborative learning environment and its strong connections with industry leaders.

Career Goals

Upon completion of my studies, I aspire to ${data.purpose}. I believe that the knowledge and skills I will acquire through this program will equip me to make meaningful contributions to my field and society at large. My long-term goal is to leverage my education to address real-world challenges and create positive impact in my chosen domain.

Personal Qualities and Extracurricular Activities

Beyond academics, I have actively participated in various extracurricular activities that have shaped my leadership skills and ability to work effectively in diverse teams. These experiences have taught me the importance of collaboration, adaptability, and continuous learning – qualities that I believe will enhance my contribution to the university community.

Conclusion

I am confident that my academic background, passion for learning, and clear career objectives make me a strong candidate for this program. I am excited about the opportunity to contribute to the university's academic community while pursuing my educational and professional goals.

I look forward to the opportunity to discuss my application in person and am grateful for your consideration of my candidacy.

Sincerely,
${data.name}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedSOP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setSuccessMessage('SOP copied to clipboard successfully!');
      setShowSuccessNotification(true);
      
      // Auto hide notification after 3 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setSuccessMessage('Sorry, there was an error copying the SOP. Please try again.');
      setShowSuccessNotification(true);
      
      // Auto hide notification after 3 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
    }
  };

  const downloadSOP = () => {
    try {
      let blob: Blob;
      let filename: string;
      let mimeType: string;

      switch (downloadFormat) {
        case 'pdf':
          // Generate actual PDF using jsPDF
          const pdf = new jsPDF();
          
          // Set font and size
          pdf.setFont('helvetica');
          pdf.setFontSize(16);
          
          // Add title
          pdf.setTextColor(31, 41, 55); // Dark gray color
          pdf.text('Statement of Purpose', 105, 20, { align: 'center' });
          
          // Add line under title
          pdf.setDrawColor(245, 158, 11); // Saffron color
          pdf.setLineWidth(0.5);
          pdf.line(20, 25, 190, 25);
          
          // Set font size for content
          pdf.setFontSize(12);
          pdf.setTextColor(75, 85, 99); // Medium gray
          
          // Add header information
          let yPosition = 40;
          pdf.setFontSize(11);
          pdf.text(`Name: ${formData.name}`, 20, yPosition);
          yPosition += 8;
          pdf.text(`Country: ${formData.country}`, 20, yPosition);
          yPosition += 8;
          pdf.text(`University: ${formData.university}`, 20, yPosition);
          yPosition += 8;
          pdf.text(`Course: ${formData.course}`, 20, yPosition);
          yPosition += 15;
          
          // Add line separator
          pdf.setDrawColor(229, 231, 235); // Light gray
          pdf.setLineWidth(0.2);
          pdf.line(20, yPosition, 190, yPosition);
          yPosition += 10;
          
          // Add SOP content
          pdf.setFontSize(11);
          pdf.setTextColor(31, 41, 55); // Dark gray for content
          
          // Split SOP text into lines that fit the page width
          const maxWidth = 170; // Maximum width for text
          const lines = pdf.splitTextToSize(generatedSOP, maxWidth);
          
          // Add lines to PDF
          for (let i = 0; i < lines.length; i++) {
            if (yPosition > 270) { // Check if we need a new page
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(lines[i], 20, yPosition);
            yPosition += 6;
          }
          
          // Save the PDF
          pdf.save(`${formData.name}_SOP.pdf`);
          setSuccessMessage('SOP downloaded successfully as PDF!');
          setShowSuccessNotification(true);
          
          // Auto hide notification after 3 seconds
          setTimeout(() => {
            setShowSuccessNotification(false);
          }, 3000);
          return; // Exit early since we're using pdf.save()
          break;
        
        case 'docx':
          // For Word, we'll create a simple text file that can be opened in Word
          const wordContent = `Statement of Purpose\n\nName: ${formData.name}\nCountry: ${formData.country}\nUniversity: ${formData.university}\nCourse: ${formData.course}\n\n${generatedSOP}`;
          blob = new Blob([wordContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
          filename = `${formData.name}_SOP.docx`;
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        
        default: // txt
          blob = new Blob([generatedSOP], { type: 'text/plain' });
          filename = `${formData.name}_SOP.txt`;
          mimeType = 'text/plain';
      }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
      a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

      setSuccessMessage(`SOP downloaded successfully as ${downloadFormat.toUpperCase()}!`);
      setShowSuccessNotification(true);
      
      // Auto hide notification after 3 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
    } catch (error) {
      console.error('Download error:', error);
      setSuccessMessage('Sorry, there was an error downloading the SOP. Please try again.');
      setShowSuccessNotification(true);
      
      // Auto hide notification after 3 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredUniversities = universities.filter(university =>
    university.toLowerCase().includes(universitySearch.toLowerCase())
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const universityDropdownRef = useRef<HTMLDivElement>(null);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);

  const handleCourseSelect = (course: string) => {
    setFormData({...formData, course});
    setShowCourseDropdown(false);
    setCourseSearch('');
  };

  const handleCountrySelect = (country: string) => {
    setFormData({...formData, country});
    setShowCountryDropdown(false);
    setCountrySearch('');
  };

  const handleUniversitySelect = (university: string) => {
    setFormData({...formData, university});
    setShowUniversityDropdown(false);
    setUniversitySearch('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCourseDropdown(false);
        setCourseSearch('');
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
        setCountrySearch('');
      }
      if (universityDropdownRef.current && !universityDropdownRef.current.contains(event.target as Node)) {
        setShowUniversityDropdown(false);
        setUniversitySearch('');
      }
      if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(event.target as Node)) {
        setShowDownloadOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-indian-blue to-saffron text-white overflow-hidden py-4 md:py-8 rounded-xl md:rounded-2xl mx-1 md:mx-4 my-2 md:my-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10"></div>
          <div className="absolute top-16 right-8 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-8 left-16 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-white rounded-full"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="section-padding">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto px-4"
            >
              <motion.div 
                className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 md:mb-8 border-2 border-white/30 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </motion.div>
              
              <motion.h1 
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-white to-saffron bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                SOP Generator
              </motion.h1>
              
              <motion.p 
                className="text-xs md:text-sm lg:text-base xl:text-lg text-white/95 max-w-xs md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed mb-3 md:mb-6 px-2 md:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Create compelling Statements of Purpose with our AI-powered tool. 
                Get personalized SOPs for your university applications in minutes.
              </motion.p>
              
              {/* Enhanced Features Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-6 px-2 md:px-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/15 backdrop-blur-md rounded-lg p-2 md:p-4 border border-white/10 shadow-lg"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-navy to-indian-blue rounded-lg flex items-center justify-center mb-1 md:mb-2 lg:mb-3 mx-auto shadow-lg">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <h3 className="text-xs md:text-sm lg:text-base font-bold text-white mb-1">AI-Powered</h3>
                  <p className="text-white/90 text-[10px] md:text-xs leading-relaxed">
                    Advanced AI technology creates unique, compelling content tailored to your academic background and career goals.
              </p>
            </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/15 backdrop-blur-md rounded-lg p-2 md:p-4 border border-white/10 shadow-lg"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-indian-blue to-saffron rounded-lg flex items-center justify-center mb-1 md:mb-2 lg:mb-3 mx-auto shadow-lg">
                    <Zap className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <h3 className="text-xs md:text-sm lg:text-base font-bold text-white mb-1">Instant Results</h3>
                  <p className="text-[10px] md:text-xs leading-relaxed text-white/90">
                    Get your personalized SOP in just minutes, not hours or days. Quick turnaround for urgent applications.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/15 backdrop-blur-md rounded-lg p-2 md:p-4 border border-white/10 shadow-lg"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-saffron to-yellow-500 rounded-lg flex items-center justify-center mb-1 md:mb-2 lg:mb-3 mx-auto shadow-lg">
                    <Target className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <h3 className="text-xs md:text-sm lg:text-base font-bold text-white mb-1">Personalized</h3>
                  <p className="text-white/90 text-[10px] md:text-xs leading-relaxed">
                    Every SOP is customized to your background, goals, and target university. No generic templates.
                  </p>
                </motion.div>
              </motion.div>

              {/* Additional Benefits */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto">
                    <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <p className="text-white/90 text-xs md:text-sm font-medium">100% Unique</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto">
                    <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <p className="text-white/90 text-xs md:text-sm font-medium">Plagiarism Free</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto">
                    <Download className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <p className="text-white/90 text-xs md:text-sm font-medium">Multiple Formats</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto">
                    <Clock className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <p className="text-white/90 text-xs md:text-sm font-medium">24/7 Available</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container-custom">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            {/* Enhanced Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 border border-gray-100 relative overflow-hidden">
                {/* Form Header */}
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-navy to-indian-blue rounded-lg md:rounded-xl flex items-center justify-center">
                      <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-2xl font-bold text-navy">
                  Generate Your SOP
                </h2>
                      <p className="text-gray-600 text-xs md:text-sm">Fill in your details below</p>
                    </div>
                  </div>
                  
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {/* Enhanced Name Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 md:px-4 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-4 focus:ring-navy/20 focus:border-navy transition-all duration-300 bg-gray-50 hover:bg-white text-sm md:text-base"
                      placeholder="Enter your full name"
                    />
                    </motion.div>

                    {/* Enhanced Course Input with Real-time Search */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course/Program *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.course}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({...formData, course: value});
                          setCourseSearch(value);
                          
                          // Check if typed value exists in filtered courses
                          const filtered = courses.filter(course =>
                            course.toLowerCase().includes(value.toLowerCase())
                          );
                          
                          if (value.length > 0 && filtered.length > 0) {
                            setShowCourseDropdown(true);
                          } else {
                            setShowCourseDropdown(false);
                          }
                        }}
                        onFocus={() => {
                          const filtered = courses.filter(course =>
                            course.toLowerCase().includes(formData.course.toLowerCase())
                          );
                          if (formData.course.length > 0 && filtered.length > 0) {
                            setShowCourseDropdown(true);
                          }
                        }}
                        onBlur={() => {
                          // Hide dropdown after a longer delay to allow clicking on suggestions
                          setTimeout(() => {
                            setShowCourseDropdown(false);
                          }, 300);
                        }}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-navy/20 focus:border-navy transition-all duration-300 bg-gray-50 hover:bg-white"
                        placeholder="Type to search courses..."
                      />
                      
                      {showCourseDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-hidden"
                          >
                          <div className="max-h-48 overflow-y-auto">
                            {filteredCourses.length > 0 ? (
                              filteredCourses.map((course) => (
                                <button
                                  key={course}
                                  type="button"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setFormData({...formData, course: course});
                                      setShowCourseDropdown(false);
                                      setCourseSearch('');
                                    }}
                                    className="w-full px-4 py-4 text-left hover:bg-navy/10 focus:bg-navy/10 focus:outline-none transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                >
                                  {course}
                                </button>
                              ))
                            ) : (
                                  <div className="px-4 py-6 text-gray-500 text-center">
                                No courses found
                              </div>
                            )}
                          </div>
                          </motion.div>
                      )}
                    </div>
                    </motion.div>

                                        {/* Enhanced Country Input with Real-time Search */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({...formData, country: value});
                          setCountrySearch(value);
                          
                          // Check if typed value exists in filtered countries
                          const filtered = countries.filter(country =>
                            country.name.toLowerCase().includes(value.toLowerCase())
                          );
                          
                          if (value.length > 0 && filtered.length > 0) {
                            setShowCountryDropdown(true);
                          } else {
                            setShowCountryDropdown(false);
                          }
                        }}
                        onFocus={() => {
                          const filtered = countries.filter(country =>
                            country.name.toLowerCase().includes(formData.country.toLowerCase())
                          );
                          if (formData.country.length > 0 && filtered.length > 0) {
                            setShowCountryDropdown(true);
                          }
                        }}
                        onBlur={() => {
                          // Hide dropdown after a longer delay to allow clicking on suggestions
                          setTimeout(() => {
                            setShowCountryDropdown(false);
                          }, 300);
                        }}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-navy/20 focus:border-navy transition-all duration-300 bg-gray-50 hover:bg-white"
                        placeholder="Type to search countries..."
                      />
                      
                      {showCountryDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-hidden"
                          >
                          <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <button
                                  key={country.name}
                                  type="button"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setFormData({...formData, country: country.name});
                                      setShowCountryDropdown(false);
                                      setCountrySearch('');
                                    }}
                                    className="w-full px-4 py-4 text-left hover:bg-navy/10 focus:bg-navy/10 focus:outline-none transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
                                  >
                                    <span className="text-xl">{country.emoji}</span>
                                  <span>{country.name}</span>
                                </button>
                              ))
                            ) : (
                                  <div className="px-4 py-6 text-gray-500 text-center">
                                No countries found
                              </div>
                            )}
                          </div>
                          </motion.div>
                      )}
                    </div>
                    </motion.div>

                    {/* Enhanced University Input with Real-time Search */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                      University/Institution *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.university}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({...formData, university: value});
                          setUniversitySearch(value);
                          
                          // Check if typed value exists in filtered universities
                          const filtered = universities.filter(university =>
                            university.toLowerCase().includes(value.toLowerCase())
                          );
                          
                          if (value.length > 0 && filtered.length > 0) {
                            setShowUniversityDropdown(true);
                          } else {
                            setShowUniversityDropdown(false);
                          }
                        }}
                        onFocus={() => {
                          const filtered = universities.filter(university =>
                            university.toLowerCase().includes(formData.university.toLowerCase())
                          );
                          if (formData.university.length > 0 && filtered.length > 0) {
                            setShowUniversityDropdown(true);
                          }
                        }}
                        onBlur={() => {
                          // Hide dropdown after a longer delay to allow clicking on suggestions
                          setTimeout(() => {
                            setShowUniversityDropdown(false);
                          }, 300);
                        }}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-saffron/20 focus:border-saffron transition-all duration-300 bg-gray-50 hover:bg-white"
                        placeholder="Type to search universities..."
                      />
                      
                      {showUniversityDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-hidden"
                          >
                          <div className="max-h-48 overflow-y-auto">
                            {filteredUniversities.length > 0 ? (
                              filteredUniversities.map((university) => (
                                <button
                                  key={university}
                                  type="button"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setFormData({...formData, university: university});
                                      setShowUniversityDropdown(false);
                                      setUniversitySearch('');
                                    }}
                                    className="w-full px-4 py-4 text-left hover:bg-saffron/10 focus:bg-saffron/10 focus:outline-none transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                >
                                  {university}
                                </button>
                              ))
                            ) : (
                                  <div className="px-4 py-6 text-gray-500 text-center">
                                No universities found
                              </div>
                            )}
                          </div>
                          </motion.div>
                      )}
                    </div>
                    </motion.div>

                    {/* Enhanced Purpose Textarea */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Career Purpose *
                    </label>
                    <textarea
                      required
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      rows={4}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-saffron/20 focus:border-saffron transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                      placeholder="Describe your career goals and what you plan to achieve after completing your studies"
                    />
                    </motion.div>

                    {/* Enhanced Submit Button */}
                    <motion.button
                    type="submit"
                    disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-saffron to-fox-orange hover:from-fox-orange hover:to-saffron disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                  >
                    {isGenerating ? (
                      <>
                         <div className="flex items-center space-x-3">
                           <div className="relative">
                             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                             <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
                           </div>
                           <span className="text-lg font-semibold">Processing...</span>
                         </div>
                      </>
                    ) : (
                      <>
                         <Sparkles className="w-6 h-6" />
                         <span className="text-lg">Generate SOP</span>
                         <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                    </motion.button>
                </form>
                </div>
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-saffron/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-navy/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
              </div>
            </motion.div>

            {/* Enhanced Generated SOP Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {generatedSOP ? (
                <motion.div 
                  className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="flex items-center justify-between mb-6"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                    <h2 className="text-2xl font-bold text-navy">
                      Generated SOP
                    </h2>
                          <p className="text-gray-600 text-sm">Your personalized statement of purpose</p>
                        </div>
                      </div>
                    <div className="flex space-x-3">
                        <motion.button
                        onClick={copyToClipboard}
                          className="flex items-center space-x-2 bg-navy text-white px-4 py-3 rounded-lg hover:bg-indian-blue transition-all duration-300 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                      >
                        {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span className="font-medium">{copied ? 'Copied!' : 'Copy'}</span>
                        </motion.button>
                        <div className="relative" ref={downloadDropdownRef}>
                          <motion.button
                            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-saffron to-fox-orange text-white px-4 py-3 rounded-lg hover:from-fox-orange hover:to-saffron transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            <FileDown className="w-4 h-4" />
                            <span className="font-medium">Download</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDownloadOptions ? 'rotate-180' : ''}`} />
                          </motion.button>
                          
                          <AnimatePresence>
                            {showDownloadOptions && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[200px]"
                              >
                                <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                                  Choose Format:
                                </div>
                                {[
                                  { value: 'txt', label: 'Text File (.txt)', icon: '📄' },
                                  { value: 'pdf', label: 'PDF (.pdf)', icon: '📋' },
                                  { value: 'docx', label: 'Word Document (.docx)', icon: '📝' }
                                ].map((format) => (
                      <button
                                    key={format.value}
                                    onClick={() => {
                                      setDownloadFormat(format.value);
                                      setShowDownloadOptions(false);
                                      downloadSOP();
                                    }}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
                                  >
                                    <span className="text-lg">{format.icon}</span>
                                    <span className="text-sm font-medium text-gray-700">{format.label}</span>
                                    {downloadFormat === format.value && (
                                      <CheckCircle className="w-4 h-4 text-saffron ml-auto" />
                                    )}
                      </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                    </div>
                  </div>
                    </motion.div>
                    <motion.div 
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 max-h-96 overflow-y-auto border border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                      {generatedSOP}
                    </pre>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden border border-gray-100">
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="text-8xl mb-6"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      📝
                    </motion.div>
                    <h3 className="text-2xl font-bold text-navy mb-4">
                    Your SOP Will Appear Here
                  </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                    Fill out the form on the left and click "Generate SOP" to create your personalized Statement of Purpose.
                  </p>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="text-sm font-medium text-blue-800">Quick Generation</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="text-sm font-medium text-green-800">Personalized</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <div className="text-2xl mb-2">📈</div>
                        <div className="text-sm font-medium text-purple-800">High Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Enhanced Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-navy mb-6"
                initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
                Why Use Our SOP Generator?
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Professional, personalized, and optimized for success. Get the edge you need for your university applications.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  desc: 'Get your SOP in minutes, not hours. Our AI-powered system generates high-quality content instantly.',
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  icon: Target,
                  title: 'Personalized Content',
                  desc: 'Tailored to your specific course, university, and career goals. No generic templates.',
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  icon: Sparkles,
                  title: 'High Success Rate',
                  desc: 'Optimized for university acceptance with proven formats and compelling narratives.',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Screen AI Loading Overlay */}
      <AnimatePresence>
        {showFullScreenLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full mx-4 text-center"
            >
              {/* 6 Rings Animation */}
              <div className="relative mb-6">
                <div className="w-40 h-40 mx-auto relative">
                  {/* Ring 1 - Clockwise */}
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-saffron animate-spin" style={{ animationDuration: '2s' }}></div>
                  
                  {/* Ring 2 - Anti-clockwise */}
                  <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-fox-orange animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.8s' }}></div>
                  
                  {/* Ring 3 - Clockwise */}
                  <div className="absolute inset-6 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" style={{ animationDuration: '1.6s' }}></div>
                  
                  {/* Ring 4 - Anti-clockwise */}
                  <div className="absolute inset-9 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.4s' }}></div>
                  
                  {/* Ring 5 - Clockwise */}
                  <div className="absolute inset-12 rounded-full border-4 border-transparent border-t-green-500 animate-spin" style={{ animationDuration: '1.2s' }}></div>
                  
                  {/* Ring 6 - Anti-clockwise */}
                  <div className="absolute inset-15 rounded-full border-4 border-transparent border-t-pink-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                  
                  {/* AI Text in Center */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-gray-800 font-bold text-lg z-10"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    AI
                  </motion.div>
                </div>
              </div>

              {/* Clean Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-saffron to-fox-orange"
                    initial={{ width: 0 }}
                    animate={{ width: `${aiProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-2 font-medium">
                  {aiProgress.toFixed(0)}% Complete
                </div>
              </div>

              {/* Clean Status Text */}
              <motion.div
                key={aiProgress}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg font-semibold text-gray-800 mb-2"
              >
                Creating Your SOP
              </motion.div>
              
              <motion.div
                key={`status-${aiProgress}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-gray-600"
              >
                {aiProgress < 25 ? 'Analyzing your profile...' :
                 aiProgress < 50 ? 'Crafting content...' :
                 aiProgress < 75 ? 'Finalizing...' :
                 'Almost ready...'}
              </motion.div>

              {/* Simple animated dots */}
              <div className="flex justify-center space-x-1 mt-4">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-saffron rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: index * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOP Full Screen Modal */}
      <AnimatePresence>
        {showSOPModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-60 flex items-center justify-center p-2 md:p-4 pb-20 md:pb-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[80vh] overflow-hidden relative mx-2 md:mx-0 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSOPModal(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="p-3 md:p-4 border-b border-gray-200 bg-gradient-to-r from-navy via-indian-blue to-saffron">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-saffron" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-2xl font-bold text-white">
                      Your Generated SOP
                    </h2>
                    <p className="text-white/90 text-xs md:text-sm">
                      {formData.name} - {formData.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Moved to Top */}
              <div className="p-2 md:p-3 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <motion.button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center space-x-2 bg-navy text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-indian-blue transition-all duration-300 text-sm md:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="font-medium">{copied ? 'Copied!' : 'Copy'}</span>
                  </motion.button>

                  <div className="relative" ref={downloadDropdownRef}>
                    <button
                      onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                      className="flex items-center justify-between space-x-1 bg-white border-2 border-gray-300 rounded-lg px-2 py-2 hover:border-saffron focus:border-saffron focus:outline-none transition-colors duration-200 min-w-[80px] md:min-w-[100px] text-xs md:text-sm"
                    >
                      <span className="text-gray-700 truncate">
                        {downloadFormat === 'txt' ? 'TXT' :
                         downloadFormat === 'pdf' ? 'PDF' :
                         downloadFormat === 'docx' ? 'DOCX' : 'Format'}
                      </span>
                      <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${showDownloadOptions ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showDownloadOptions && (
                      <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[200px]">
                        <div className="px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            <span>Choose Format:</span>
                          </div>
                        </div>
                        {[
                          { value: 'txt', label: 'Text File (.txt)', icon: '📄' },
                          { value: 'pdf', label: 'PDF (.pdf)', icon: '📋' },
                          { value: 'docx', label: 'Word Document (.docx)', icon: '📝' }
                        ].map((format) => (
                          <button
                            key={format.value}
                            onClick={() => {
                              setDownloadFormat(format.value);
                              setShowDownloadOptions(false);
                            }}
                            className={`w-full px-4 py-3 text-left transition-colors flex items-center space-x-3 border-b border-gray-100 last:border-b-0 ${
                              downloadFormat === format.value 
                                ? 'bg-navy/10 text-navy font-medium' 
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <span className="text-lg">{format.icon}</span>
                            <span className="text-sm font-medium">{format.label}</span>
                            {downloadFormat === format.value && (
                              <CheckCircle className="w-4 h-4 text-navy ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <motion.button
                    onClick={downloadSOP}
                    className="flex items-center justify-center space-x-1 bg-green-600 text-white px-2 py-2 md:px-3 md:py-2 rounded-lg hover:bg-green-700 transition-all duration-300 text-xs md:text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileDown className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">Download</span>
                  </motion.button>
                </div>
              </div>

              {/* SOP Content - Moved Below */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4">
                <div className="bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200">
                  <div className="mb-3 md:mb-4">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Statement of Purpose</h3>
                    <div className="text-xs md:text-sm text-gray-600 space-y-1">
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Country:</strong> {formData.country}</p>
                      <p><strong>University:</strong> {formData.university}</p>
                      <p><strong>Course:</strong> {formData.course}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 md:pt-4">
                    <pre className="whitespace-pre-wrap text-xs md:text-sm text-gray-800 font-mono leading-relaxed">
                      {generatedSOP}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    {/* Success Notification */}
    <AnimatePresence>
      {showSuccessNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
            <button
              onClick={() => setShowSuccessNotification(false)}
              className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress bar for auto-hide */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-green-400"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
};

export default SopGenerator; 
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Tag, Clock } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock blog data - in a real app, this would come from an API
  const blog = {
    id: parseInt(id || '1'),
    title: 'Complete Guide to Canada Student Visa 2024',
    content: `
      <h2>Introduction</h2>
      <p>Canada has become one of the most popular destinations for international students seeking quality education and promising career opportunities. With its world-class universities, multicultural environment, and post-graduation work opportunities, Canada offers an excellent pathway for Indian students to achieve their academic and professional goals.</p>

      <h2>Why Choose Canada for Higher Education?</h2>
      <p>Canada's education system is globally recognized for its high standards and innovative teaching methods. Here are some compelling reasons why Indian students choose Canada:</p>
      <ul>
        <li><strong>Quality Education:</strong> Canadian universities consistently rank among the world's best institutions</li>
        <li><strong>Affordable Tuition:</strong> Compared to other popular destinations, Canada offers competitive tuition fees</li>
        <li><strong>Work Opportunities:</strong> Students can work part-time during studies and full-time during breaks</li>
        <li><strong>Post-Graduation Work Permit:</strong> Up to 3 years of work experience after graduation (we provide guidance on PGWP applications)</li>
        <li><strong>Pathway to PR:</strong> Canadian education and work experience can lead to permanent residency</li>
      </ul>

      <h2>Types of Student Visas in Canada</h2>
      <p>There are several types of study permits available for international students:</p>
      
      <h3>1. Regular Study Permit</h3>
      <p>This is the most common type of student visa for programs longer than 6 months. It allows students to:</p>
      <ul>
        <li>Study at designated learning institutions (DLI)</li>
        <li>Work up to 20 hours per week during academic sessions</li>
        <li>Work full-time during scheduled breaks</li>
        <li>Bring family members to Canada</li>
      </ul>

      <h3>2. Student Direct Stream (SDS)</h3>
      <p>The SDS program offers faster processing for students from certain countries, including India. Requirements include:</p>
      <ul>
        <li>IELTS score of 6.0 or higher in each band</li>
        <li>Guaranteed Investment Certificate (GIC) of CAD 10,000</li>
        <li>Payment of first year's tuition fees</li>
        <li>Medical examination</li>
      </ul>

      <h2>Eligibility Requirements</h2>
      <p>To be eligible for a Canadian student visa, you must meet the following criteria:</p>
      
      <h3>Academic Requirements</h3>
      <ul>
        <li>Letter of Acceptance from a Designated Learning Institution (DLI)</li>
        <li>Proof of sufficient academic qualifications</li>
        <li>English/French language proficiency test scores</li>
        <li>Statement of Purpose explaining your study plans</li>
      </ul>

      <h3>Financial Requirements</h3>
      <ul>
        <li>Proof of sufficient funds to cover tuition fees</li>
        <li>Living expenses for the duration of your stay</li>
        <li>Return transportation costs</li>
        <li>Bank statements showing financial stability</li>
      </ul>

      <h3>Health and Character Requirements</h3>
      <ul>
        <li>Medical examination certificate</li>
        <li>Police clearance certificate</li>
        <li>No criminal record</li>
        <li>Good health condition</li>
      </ul>

      <h2>Application Process</h2>
      <p>The application process for a Canadian student visa involves several steps:</p>

      <h3>Step 1: Choose Your Program and Institution</h3>
      <p>Research and select a program that aligns with your career goals. Ensure the institution is a Designated Learning Institution (DLI).</p>

      <h3>Step 2: Apply to the Institution</h3>
      <p>Submit your application to the chosen Canadian institution. You'll need to provide:</p>
      <ul>
        <li>Academic transcripts and certificates</li>
        <li>English language test scores</li>
        <li>Statement of Purpose</li>
        <li>Letters of recommendation</li>
      </ul>

      <h3>Step 3: Receive Letter of Acceptance</h3>
      <p>Once accepted, you'll receive a Letter of Acceptance (LOA) from the institution. This is required for your visa application.</p>

      <h3>Step 4: Prepare Required Documents</h3>
      <p>Gather all necessary documents including:</p>
      <ul>
        <li>Valid passport</li>
        <li>Letter of Acceptance</li>
        <li>Proof of financial support</li>
        <li>Medical examination results</li>
        <li>Police clearance certificate</li>
        <li>Photographs</li>
      </ul>

      <h3>Step 5: Submit Visa Application</h3>
      <p>Apply online through the Immigration, Refugees and Citizenship Canada (IRCC) website or through a Visa Application Centre (VAC).</p>

      <h3>Step 6: Attend Biometrics Appointment</h3>
      <p>Provide biometric information (fingerprints and photograph) at a designated location.</p>

      <h3>Step 7: Wait for Decision</h3>
      <p>Processing times vary but typically take 4-8 weeks. You can track your application online.</p>

      <h2>Required Documents Checklist</h2>
      <p>Ensure you have all the following documents ready:</p>

      <h3>Personal Documents</h3>
      <ul>
        <li>Valid passport (minimum 6 months validity)</li>
        <li>Passport-size photographs (6 copies)</li>
        <li>Birth certificate</li>
        <li>Marriage certificate (if applicable)</li>
        <li>Police clearance certificate</li>
      </ul>

      <h3>Academic Documents</h3>
      <ul>
        <li>All academic transcripts and certificates</li>
        <li>English language test scores (IELTS/TOEFL)</li>
        <li>Letter of Acceptance from Canadian institution</li>
        <li>Statement of Purpose</li>
        <li>Academic resume/CV</li>
      </ul>

      <h3>Financial Documents</h3>
      <ul>
        <li>Bank statements (last 4 months)</li>
        <li>Fixed deposit certificates</li>
        <li>Education loan sanction letter (if applicable)</li>
        <li>Income tax returns (last 2 years)</li>
        <li>Salary slips (last 6 months)</li>
        <li>Property documents (if showing as financial support)</li>
      </ul>

      <h2>Tips for a Successful Application</h2>
      <p>Follow these tips to increase your chances of visa approval:</p>

      <h3>1. Start Early</h3>
      <p>Begin your application process at least 6-8 months before your intended start date. This gives you ample time to gather documents and handle any delays.</p>

      <h3>2. Choose the Right Program</h3>
      <p>Select a program that aligns with your previous education and future career goals. This shows logical progression in your academic journey.</p>

      <h3>3. Write a Strong Statement of Purpose</h3>
      <p>Your SOP should clearly explain:</p>
      <ul>
        <li>Why you chose Canada</li>
        <li>Why you selected the specific program</li>
        <li>How the program fits your career goals</li>
        <li>Your plans after graduation</li>
      </ul>

      <h3>4. Demonstrate Strong Financial Support</h3>
      <p>Show sufficient funds to cover all expenses. Include multiple sources of funding if possible.</p>

      <h3>5. Maintain Academic Consistency</p>
      <p>Ensure your academic background supports your chosen program. Address any gaps or inconsistencies in your application.</p>

      <h3>6. Be Honest and Transparent</h3>
      <p>Provide accurate information and be prepared to explain any discrepancies during the interview.</p>

      <h2>Common Reasons for Visa Rejection</h2>
      <p>Understanding common rejection reasons can help you avoid them:</p>

      <ul>
        <li><strong>Insufficient Financial Support:</strong> Not showing enough funds to cover expenses</li>
        <li><strong>Weak Statement of Purpose:</strong> Unclear or unconvincing study plans</li>
        <li><strong>Academic Mismatch:</strong> Choosing a program unrelated to previous education</li>
        <li><strong>Poor Language Scores:</strong> Not meeting minimum language requirements</li>
        <li><strong>Incomplete Documentation:</strong> Missing or incorrect documents</li>
        <li><strong>Immigration Intent:</strong> Suspected intention to stay permanently</li>
      </ul>

      <h2>Post-Approval Steps</h2>
      <p>Once your visa is approved, follow these steps:</p>

      <h3>1. Book Your Travel</h3>
      <p>Plan your arrival to coincide with your program start date. Don't arrive too early.</p>

      <h3>2. Arrange Accommodation</h3>
      <p>Secure housing before arrival. Many universities offer on-campus accommodation.</p>

      <h3>3. Purchase Health Insurance</h3>
      <p>Ensure you have adequate health coverage during your stay.</p>

      <h3>4. Prepare for Arrival</h3>
      <p>Pack essential documents and items. Research local customs and regulations.</p>

      <h2>Working While Studying</h2>
      <p>Canadian student visas allow you to work while studying:</p>

      <ul>
        <li><strong>On-Campus Work:</strong> Unlimited hours at your institution</li>
        <li><strong>Off-Campus Work:</strong> Up to 20 hours per week during academic sessions</li>
        <li><strong>Full-Time Work:</strong> During scheduled breaks (summer, winter holidays)</li>
        <li><strong>Co-op/Internship:</strong> If your program includes work terms</li>
      </ul>

      <h2>Post-Graduation Opportunities</h2>
      <p>After completing your studies, you have several options:</p>

      <h3>Post-Graduation Work Permit (PGWP)</h3>
      <p>The PGWP allows you to work in Canada for up to 3 years after graduation, depending on your program length. Our consultants provide expert guidance on PGWP applications.</p>

      <h3>Permanent Residency Pathways</h3>
      <p>Canadian education and work experience can help you qualify for permanent residency through:</p>
      <ul>
        <li>Express Entry (Federal Skilled Worker Program)</li>
        <li>Provincial Nominee Programs (PNP)</li>
        <li>Canadian Experience Class</li>
      </ul>

      <h2>Conclusion</h2>
      <p>A Canadian student visa opens doors to world-class education and promising career opportunities. By understanding the requirements, preparing thoroughly, and following the application process carefully, you can successfully obtain your student visa and begin your educational journey in Canada.</p>

      <p>Remember, the key to success is early preparation, complete documentation, and demonstrating genuine study intentions. With proper planning and guidance, your Canadian education dream can become a reality.</p>
    `,
    author: 'The Visa Fox Team',
    date: '2024-01-15',
    category: 'Student Visa',
    image: '🇨🇦',
    readTime: '8 min read',
    tags: ['Canada', 'Student Visa', 'Guide', 'Education'],
    excerpt: 'Everything you need to know about applying for a Canadian student visa, including requirements, documents, and tips for success.'
  };

  const relatedArticles = [
    {
      id: 2,
      title: 'Australia Work Visa Guidance: Your Path to Professional Success',
      excerpt: 'Comprehensive guide to Australian work visa guidance including skilled worker programs, employer sponsorship, and application process.',
      image: '🇦🇺',
      category: 'Work Visa Guidance'
    },
    {
      id: 5,
      title: 'Top 10 Tips for a Successful Visa Interview',
      excerpt: 'Essential tips and strategies to ace your visa interview, including common questions and how to prepare effectively.',
      image: '💼',
      category: 'Tips & Advice'
    },
    {
      id: 8,
      title: 'Writing a Winning Statement of Purpose',
      excerpt: 'Expert tips and templates for writing a compelling Statement of Purpose that will help you stand out in your visa application.',
      image: '📝',
      category: 'Tips & Advice'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy to-indian-blue text-white">
        <div className="container-custom">
          <div className="section-padding">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/blogs" className="inline-flex items-center space-x-2 text-white hover:text-saffron transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blogs</span>
              </Link>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <span className="inline-block bg-saffron text-white text-sm px-4 py-2 rounded-full mb-4">
                      {blog.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {blog.title}
                    </h1>
                    <p className="text-xl text-gray-200 mb-6">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center lg:text-left">
                  <div className="w-32 h-32 bg-gradient-to-br from-saffron to-fox-orange rounded-2xl flex items-center justify-center text-6xl mx-auto lg:mx-0">
                    {blog.image}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container-custom">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="card p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                    >
                      <Tag className="w-4 h-4" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-navy">Share this article</h3>
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Author Info */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-navy mb-4">About the Author</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron to-fox-orange rounded-full flex items-center justify-center text-white font-bold">
                    VF
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy">{blog.author}</h4>
                    <p className="text-sm text-gray-600">Immigration Expert</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Our team of certified immigration consultants has helped thousands of students achieve their dreams of studying abroad.
                </p>
              </div>

              {/* Related Articles */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-navy mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/blogs/${article.id}`}
                      className="block hover:bg-gray-50 rounded-lg p-3 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-saffron to-fox-orange rounded-lg flex items-center justify-center text-2xl">
                          {article.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-navy text-sm line-clamp-2">
                            {article.title}
                          </h4>
                          <span className="text-xs text-saffron">{article.category}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="card p-6 bg-gradient-to-br from-saffron to-fox-orange text-white">
                <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                <p className="text-sm mb-4 opacity-90">
                  Get the latest visa updates and tips delivered to your inbox
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-navy hover:bg-indian-blue text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 
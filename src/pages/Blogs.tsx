import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Student Visa', 'Work Visa Guidance', 'Tourist Visa', 'PR', 'Tips & Advice'];

  const blogs = [
    {
      id: 1,
      title: 'Complete Guide to Canada Student Visa 2024',
      excerpt: 'Everything you need to know about applying for a Canadian student visa, including requirements, documents, and tips for success.',
      author: 'The Visa Fox Team',
      date: '2024-01-15',
      category: 'Student Visa',
      image: '🇨🇦',
      readTime: '8 min read',
      tags: ['Canada', 'Student Visa', 'Guide']
    },
    {
      id: 2,
          title: 'Australia Work Visa Guidance: Your Path to Professional Success',
    excerpt: 'Comprehensive guide to Australian work visa guidance including skilled worker programs, employer sponsorship, and application process.',
    author: 'Immigration Expert',
    date: '2024-01-12',
    category: 'Work Visa Guidance',
    image: '🇦🇺',
    readTime: '10 min read',
    tags: ['Australia', 'Work Visa Guidance', 'Skilled Worker']
    },
    {
      id: 3,
      title: 'UK Tourist Visa: Planning Your Perfect Trip',
      excerpt: 'Step-by-step guide to obtaining a UK tourist visa, including application process, required documents, and interview tips.',
      author: 'Travel Specialist',
      date: '2024-01-10',
      category: 'Tourist Visa',
      image: '🇬🇧',
      readTime: '6 min read',
      tags: ['UK', 'Tourist Visa', 'Travel']
    },
    {
      id: 4,
      title: 'Permanent Residency in Canada: Express Entry Guide',
      excerpt: 'Complete overview of Canada\'s Express Entry system for permanent residency, including CRS points calculation and strategies.',
      author: 'PR Consultant',
      date: '2024-01-08',
      category: 'PR',
      image: '🇨🇦',
      readTime: '12 min read',
      tags: ['Canada', 'PR', 'Express Entry']
    },
    {
      id: 5,
      title: 'Top 10 Tips for a Successful Visa Interview',
      excerpt: 'Essential tips and strategies to ace your visa interview, including common questions and how to prepare effectively.',
      author: 'Interview Coach',
      date: '2024-01-05',
      category: 'Tips & Advice',
      image: '💼',
      readTime: '7 min read',
      tags: ['Interview', 'Tips', 'Preparation']
    },
    {
      id: 6,
      title: 'Germany Student Visa: Study in Europe\'s Economic Powerhouse',
      excerpt: 'Complete guide to studying in Germany, including visa requirements, university applications, and living costs.',
      author: 'European Education Expert',
      date: '2024-01-03',
      category: 'Student Visa',
      image: '🇩🇪',
      readTime: '9 min read',
      tags: ['Germany', 'Student Visa', 'Europe']
    },
    {
      id: 7,
          title: 'New Zealand Work Visa Guidance: Opportunities in the Land of Kiwis',
    excerpt: 'Explore work opportunities in New Zealand with our comprehensive guide to various work visa guidance categories and requirements.',
    author: 'NZ Immigration Specialist',
    date: '2023-12-28',
    category: 'Work Visa Guidance',
    image: '🇳🇿',
    readTime: '8 min read',
    tags: ['New Zealand', 'Work Visa Guidance', 'Opportunities']
    },
    {
      id: 8,
      title: 'Writing a Winning Statement of Purpose',
      excerpt: 'Expert tips and templates for writing a compelling Statement of Purpose that will help you stand out in your visa application.',
      author: 'SOP Expert',
      date: '2023-12-25',
      category: 'Tips & Advice',
      image: '📝',
      readTime: '11 min read',
      tags: ['SOP', 'Writing', 'Application']
    }
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              className="text-center"
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-6">
                Visa & Immigration Blog
              </h1>
              <p className="text-sm md:text-base lg:text-xl text-gray-200 max-w-3xl mx-auto px-2 md:px-0">
                Expert insights, guides, and tips for your visa journey. 
                Stay updated with the latest immigration news and requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container-custom">
        <div className="section-padding">
          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-12"
          >
            <div className="card p-3 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent text-sm md:text-base"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent text-sm md:text-base"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Blog Image */}
                <div className="h-32 md:h-48 bg-gradient-to-br from-saffron to-fox-orange flex items-center justify-center text-4xl md:text-6xl">
                  {blog.image}
                </div>

                {/* Blog Content */}
                <div className="p-3 md:p-6">
                  {/* Category Badge */}
                  <div className="mb-2 md:mb-3">
                    <span className="inline-block bg-navy text-white text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-navy mb-2 md:mb-3 line-clamp-2">
                    <Link to={`/blogs/${blog.id}`} className="hover:text-saffron transition-colors">
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-3 md:mb-4 line-clamp-3 text-xs md:text-sm">
                    {blog.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                    <div className="flex items-center space-x-4">
                                              <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="text-[10px] md:text-xs">{blog.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="text-[10px] md:text-xs">{formatDate(blog.date)}</span>
                        </div>
                    </div>
                                          <span className="text-saffron font-medium text-[10px] md:text-xs">{blog.readTime}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 bg-gray-100 text-gray-600 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded"
                      >
                        <Tag className="w-2 h-2 md:w-3 md:h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="inline-flex items-center space-x-2 text-saffron font-semibold hover:text-fox-orange transition-colors text-xs md:text-sm"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredBlogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-navy mb-2">No articles found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter
              </p>
            </motion.div>
          )}

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 md:mt-16"
          >
            <div className="card p-4 md:p-8 bg-gradient-to-r from-saffron to-fox-orange text-white">
              <div className="text-center">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-4">
                  Stay Updated with Visa News
                </h3>
                <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 opacity-90">
                  Get the latest visa updates, tips, and guides delivered to your inbox
                </p>
                <div className="max-w-md mx-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                  />
                  <button className="bg-navy hover:bg-indian-blue text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Blogs; 
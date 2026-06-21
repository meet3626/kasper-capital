import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogData } from '../data/blogData';
import OptimizedImage from '../components/OptimizedImage';

const Blog = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-24 pb-12">
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-bold tracking-widest text-white mb-6 uppercase">
              Our Blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[800] uppercase tracking-wider mb-6 leading-tight">
              Latest Insights <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">& News</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest trends, regulatory changes, and expert advice on running a successful Forex brokerage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-12 bg-[#121212]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="bg-[#0B0B0B] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 group flex flex-col h-full cursor-pointer"
              >
                {/* Image Container with Zoom effect */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <OptimizedImage 
                    src={post.image} 
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-accent-cyan text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-accent-cyan transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-accent-cyan transition-colors mt-auto w-fit">
                    READ MORE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold uppercase tracking-widest text-sm transition-colors">
              Load More Posts
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Blog;

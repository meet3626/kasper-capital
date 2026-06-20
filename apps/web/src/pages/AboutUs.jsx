import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import OptimizedImage from '../components/OptimizedImage';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-32 pb-12">
      <SEOHead 
        title="About Us | KAPSERFX IT SOLUTIONS EST"
        description="Learn about our mission to help businesses streamline operations and accelerate growth with expert technology consulting."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden mb-20">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-bold tracking-widest text-white mb-6 uppercase">
              About Us
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[800] uppercase tracking-wider mb-6 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">KAPSERFX</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              At KAPSERFX, we specialize in providing technology consulting, infrastructure solutions, operational support, and business advisory services to financial institutions, brokerage firms, fintech companies, and corporate clients worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Image + Text Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 relative"
            >
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80" 
                alt="KAPSERFX Overview" 
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight uppercase tracking-wider">
                Streamline & <span className="text-accent-cyan">Accelerate Growth</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  Our mission is to help businesses streamline operations, implement scalable technology solutions, improve efficiency, and accelerate growth through expert consulting and innovative systems.
                </p>
                <p>
                  With extensive industry experience, we provide a wide range of services including CRM implementation, website development, infrastructure consulting, licensing advisory, payment solution consulting, back-office support, technical training, and digital growth solutions.
                </p>
                <p>
                  We work closely with our clients to design, implement, and optimize the technology and operational frameworks required to build sustainable and scalable businesses.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 relative overflow-hidden bg-[#121212]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0B0B0B] p-10 rounded-3xl border border-white/5 hover:border-accent-cyan/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center mb-8">
                <OptimizedImage src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=80&auto=format&fit=crop&q=80" alt="Vision" className="w-10 h-10 object-contain" width={40} height={40} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-4">Our Vision</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                To become a trusted global technology and consulting partner for businesses seeking innovative infrastructure, operational excellence, and sustainable growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#0B0B0B] p-10 rounded-3xl border border-white/5 hover:border-accent-cyan/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-4">Our Mission</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                To deliver reliable technology solutions, operational expertise, and strategic consulting services that help businesses improve efficiency, strengthen their infrastructure, and achieve long-term success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 overflow-hidden"
            >
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1024&auto=format&fit=crop&q=80" 
                alt="Team" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-white/10 overflow-hidden"
            >
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1024&auto=format&fit=crop&q=80" 
                alt="Office" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="p-10 border border-white/10 rounded-3xl bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan to-accent-purple"></div>
            <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">Statement</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              KAPSERFX is a technology consulting and business services company. We do not operate a brokerage, provide trading services, offer investment advice, manage client funds, or provide financial products. All services are provided exclusively to businesses, licensed institutions, and corporate clients.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;

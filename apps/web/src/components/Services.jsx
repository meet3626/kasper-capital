import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Users, LineChart, Shield, Server, Briefcase } from 'lucide-react';

const servicesData = [
  { icon: LineChart, title: 'Multi-Asset Liquidity', desc: 'Connect your brokerage to deep Tier-1 liquidity pools offering 80+ FX pairs, Commodities, and Crypto CFDs with aggregated feeds and tight institutional spreads.' },
  { icon: Monitor, title: 'White-Label MT5 Platform', desc: 'Deploy a fully branded MT5 trading environment complete with advanced admin controls, manager terminals, and custom plugins tailored for your brokerage.' },
  { icon: Users, title: 'Branded CRM & Client Portal', desc: 'Streamline your back-office operations with an intelligent portal featuring automated KYC/AML onboarding, multi-tier IB management, and integrated payment gateways.' },
  { icon: Server, title: 'Ultra-Low Latency VPS', desc: 'Provide your traders with sub-millisecond execution speeds via our globally distributed, co-located servers adjacent to major liquidity providers.' },
  { icon: Shield, title: 'Risk Management & Centroid', desc: 'Safeguard your brokerage with sophisticated risk management bridging and Centroid integration, offering real-time exposure monitoring to mitigate toxic flow.' },
  { icon: Briefcase, title: 'Islamic Compliance Setup', desc: 'Expand your regional market share by easily configuring swap-free, Sharia-compliant trading accounts for your clients without complex administrative overhead.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#080B10] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Turnkey Solutions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Complete Brokerage <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">Infrastructure</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Launch and scale your forex brand with our comprehensive suite of B2B technology, Tier-1 liquidity, and operational management tools.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-cyan/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-cyan/20 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5A378A] to-[#EE7448] flex items-center justify-center mb-6 text-white shadow-lg shadow-accent-purple/20">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
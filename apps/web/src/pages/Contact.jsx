import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const ContactInfoBlock = ({ title, lines, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5, delay }} 
    className="mb-8"
  >
    <h3 className="uppercase text-sm text-gray-400 mb-2 tracking-widest">{title}</h3>
    <div className="space-y-1">
      {lines.map((line, index) => <p key={index} className="text-lg text-gray-200">{line}</p>)}
    </div>
  </motion.div>
);

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Save to localStorage for Admin Panel
      const existingLeads = JSON.parse(localStorage.getItem('adminLeads') || '[]');
      const newLead = {
        ...data,
        id: Date.now(),
        status: 'New',
        interest: 'General Inquiry', // Default or derived
        date: new Date().toLocaleString(),
        source: 'Contact Page / Lets Talk'
      };
      localStorage.setItem('adminLeads', JSON.stringify([newLead, ...existingLeads]));

      // Optionally still try the fetch if they have a backend, but we don't block success on it
      try {
        await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead)
        });
      } catch (e) {
        // Ignore backend error for now since we rely on localStorage
      }
      
      toast({
        title: "Message Sent! 🚀",
        description: "We've received your request and will be in touch shortly.",
      });
      reset();
      
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to process your request.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}>
      <Helmet>
        <title>Connect With Us | KAPSERFX IT SOLUTIONS EST</title>
      </Helmet>
      
      <section className="bg-[#0C0D0D] text-white py-32 sm:py-40 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 className="text-5xl md:text-7xl font-bold text-white uppercase mb-6 leading-tight tracking-wider">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">Talk</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-sm mb-16">
                Ready to start your project? Drop us a message and we'll get back to you to discuss your requirements.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div>
                  <ContactInfoBlock title="Email Us" lines={["enquiry@kapserfx.com"]} delay={0.4} />
                  <ContactInfoBlock title="Call Us" lines={["+971568795828"]} delay={0.6} />
                </div>
                <div>
                  <ContactInfoBlock title="Visit Us" lines={["2807, Churchill Executive Tower", "Business Bay, Dubai, UAE"]} delay={0.5} />
                </div>
              </div>
            </motion.div>

            {/* Right Column (Form) */}
            <motion.div 
              className="bg-[#121620] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Name</label>
                    <input 
                      type="text" 
                      {...register("name", { required: "Name is required" })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                    <input 
                      type="tel" 
                      {...register("phone", { 
                        required: "Phone is required",
                        pattern: { value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/, message: "Invalid phone number" }
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone.message}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
                  <input 
                    type="email" 
                    {...register("email", { 
                      required: "Email is required",
                      pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email address" }
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    {...register("message", { required: "Message is required" })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                  {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-bold text-lg py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <><Loader2 className="animate-spin" /> Sending...</> : 'Send Message'}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
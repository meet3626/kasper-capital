import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const testimonials = [
  {
    id: 1,
    name: 'Tariq Al-Fayed',
    role: 'Institutional Broker CEO, Dubai',
    content: 'KAPSERFX transformed our go-to-market strategy. Their rapid corporate structuring combined with a flawless MT5 turnkey deployment meant we launched our brokerage in under four weeks. The operational stability has been exceptional from day one.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'Fintech Founder, Cyprus',
    content: 'Building an institutional framework from scratch was daunting until we partnered with KAPSERFX. Their CySEC License Ready infrastructure and deep regulatory knowledge cut our time-to-market by 70%. A truly indispensable B2B partner.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Wei Chen',
    role: 'Brokerage Operations Manager, Singapore',
    content: 'The backend ecosystem provided by KAPSERFX is phenomenal. The seamless integration between the Techysquad CRM, our liquidity pools, and multi-currency payment gateways has completely automated our client onboarding and retention workflows.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Marcus Thorne',
    role: 'Prop Firm Founder, London',
    content: 'As a proprietary trading firm, execution latency and liquidity depth are non-negotiable. KAPSERFX’s Tier-1 liquidity bridges and ultra-low latency VPS have handled our high-frequency EA trading volume flawlessly without a single bottleneck.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const Testimonials = () => {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < testimonials.length - itemsPerPage;

  const scroll = (direction) => {
    let newIndex = currentIndex;
    if (direction === 'left' && canScrollLeft) {
      newIndex = Math.max(0, currentIndex - 1);
    } else if (direction === 'right' && canScrollRight) {
      newIndex = Math.min(testimonials.length - itemsPerPage, currentIndex + 1);
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      if (scrollContainerRef.current) {
        const card = scrollContainerRef.current.children[newIndex];
        if(card) {
          scrollContainerRef.current.scrollTo({
            left: card.offsetLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <section id="testimonials" className="py-32 bg-[#0B0B0B] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-[800] text-white leading-tight uppercase tracking-[0.15em] max-w-2xl">
            Trusted by <span className="text-accent-cyan">industry leaders</span>
          </h2>
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-4 rounded-full bg-[#121212] border border-[#ffffff15] text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-4 rounded-full bg-[#121212] border border-[#ffffff15] text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div
          ref={scrollContainerRef}
          // Removed -mx-6 and adjusted card width for proper alignment with px-6 on parent
          className="flex flex-nowrap gap-8 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              // Adjusting width to be responsive to the parent's padding
              className="flex-shrink-0 w-[calc(100%-48px)] md:w-[calc(50%-16px)] snap-start"
            >
              <div className="bg-[#121620] p-10 rounded-3xl h-full flex flex-col border border-white/5 hover:border-accent-cyan/30 transition-colors">
                <div className="flex items-center mb-8">
                  <OptimizedImage width={56} height={56} className="w-14 h-14 rounded-full mr-5 object-cover border border-white/10" alt={testimonial.name} src={testimonial.avatar} />
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-sm">{testimonial.name}</p>
                    <p className="text-sm text-[#A0A0A0]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white text-lg leading-relaxed font-medium">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-end md:hidden">
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-4 rounded-full bg-[#121212] border border-[#ffffff15] text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-4 rounded-full bg-[#121212] border border-[#ffffff15] text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Camera, Clapperboard, Sparkles } from 'lucide-react';
import BackgroundFrames from './BackgroundFrames';

gsap.registerPlugin(ScrollTrigger);

/* ── Deliverables Shuffler: cycles through deliverables for each service ── */
function DeliverablesShuffler({ serviceType }) {
  const serviceItems = {
    cinematic: [
      'Branded Films', 'Recruitment Videos', 'Testimonials',
      'Social Content', 'Event Recaps', 'Aerial Footage',
      'Product Showcases', 'Culture Videos', 'Launch Films',
    ],
    commercial: [
      'Product Launches', 'Corporate Profiles', 'Brand Stories',
      'Sales Videos', 'Training Content', 'Case Studies',
      'Promotional Reels', 'Social Campaigns', 'Demo Videos',
    ],
    events: [
      'Live Coverage', 'Highlight Reels', 'Speaker Spotlights',
      'Venue Tours', 'Behind Scenes', 'Audience Reactions',
      'Keynote Captures', 'Interview Segments', 'Event Recaps',
    ]
  };

  const items = serviceItems[serviceType] || serviceItems.cinematic;
  const [current, setCurrent] = useState(0);
  const [shuffling, setShuffling] = useState(false);

  const shuffle = useCallback(() => {
    setShuffling(true);
    let count = 0;
    const interval = setInterval(() => {
      setCurrent(Math.floor(Math.random() * items.length));
      count++;
      if (count > 6) {
        clearInterval(interval);
        setShuffling(false);
      }
    }, 80);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(shuffle, 4000 + Math.random() * 2000); // Slightly different timing for each
    shuffle();
    return () => clearInterval(timer);
  }, [shuffle]);

  return (
    <div className="mt-6 space-y-2">
      <div className="text-[10px] uppercase tracking-[0.2em] text-brand-muted mb-3">Deliverables</div>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, i) => (
          <div
            key={item}
            className={`px-3 py-2 rounded-xl text-[11px] font-medium text-center transition-all duration-300 ${
              i === current
                ? 'bg-brand-gold/20 text-brand-gold border border-brand-gold/30'
                : 'bg-brand-surface/50 text-brand-muted border border-transparent'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EnhancedServices() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance animation
      gsap.fromTo('.service-card', {
        y: 100,
        opacity: 0,
        rotateX: 15
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse'
        }
      });

      // Header animation
      gsap.fromTo('.services-header > *', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 80%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Film,
      title: 'Cinematic Production',
      description: 'Feature-quality video production that elevates your brand story with professional cinematography and expert post-production.',
      backgroundImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
      serviceType: 'cinematic'
    },
    {
      icon: Camera,
      title: 'Commercial Content',
      description: 'From product launches to corporate profiles, we create compelling visual content that drives engagement and converts viewers.',
      backgroundImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop',
      serviceType: 'commercial'
    },
    {
      icon: Clapperboard,
      title: 'Event Documentation',
      description: 'Capture the energy and emotion of your events with documentary-style coverage that tells the complete story.',
      backgroundImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
      serviceType: 'events'
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-brand-black relative overflow-hidden">
      {/* Background Frames */}
      <BackgroundFrames />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-surface/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="services-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-white/5 border border-brand-white/10 text-brand-subtle text-xs font-medium uppercase tracking-widest mb-6">
            <Sparkles size={12} />
            What We Create
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-brand-cream mb-6 leading-tight">
            More Than Video.<br />
            <span className="text-brand-gold">Visual Stories</span>
          </h2>
          <p className="text-brand-cream/70 text-lg md:text-xl max-w-2xl mx-auto">
            Every project is crafted with the precision of a feature film and the impact of a marketing masterpiece.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service.title} className="service-card group">
              <div className="relative bg-brand-surface/10 backdrop-blur-sm rounded-xl overflow-hidden border border-brand-white/5 hover:border-brand-gold/20 transition-all duration-500">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundImage: `url(${service.backgroundImage})` }}
                />
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-6 group-hover:bg-brand-gold/30 transition-colors duration-300">
                    <service.icon size={24} className="text-brand-gold" />
                  </div>
                  
                  <h3 className="text-brand-cream font-heading font-bold text-xl mb-4 group-hover:text-brand-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-brand-cream/70 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Deliverables shuffler for all cards */}
                  <DeliverablesShuffler serviceType={service.serviceType} />
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-brand-cream/60 text-sm mb-6">
            Ready to bring your vision to life?
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSct52Me94yEhMbtStfjIuilCXiRU5finN0kwklpJA6k_Jq8MA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/20 transition-colors duration-300 text-sm font-medium"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
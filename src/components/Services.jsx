import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Camera, Clapperboard, Sparkles, Play, Award, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const [activeDeliverable, setActiveDeliverable] = useState(0);

  // Cinematic Production deliverables (rotating)
  const cinematicDeliverables = [
    'Branded Films', 'Recruitment Videos', 'Testimonials', 'Social Content', 
    'Event Recaps', 'Aerial Footage', 'Product Showcases', 'Culture Videos', 'Launch Films'
  ];

  useEffect(() => {
    // Rotate deliverables every 3 seconds
    const interval = setInterval(() => {
      setActiveDeliverable(prev => (prev + 1) % cinematicDeliverables.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-heading', start: 'top 85%' },
        }
      );

      gsap.fromTo('.service-item',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: '.services-container', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="services-heading mb-16 md:mb-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/5 border border-brand-gold/15 text-brand-gold text-[11px] font-medium uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} />
            What I Do
          </span>
          <h2 className="section-title font-heading font-bold text-brand-white">
            Cinematic storytelling<br />
            <span className="text-brand-gold">built for your brand.</span>
          </h2>
        </div>

        <div className="services-container space-y-8">
          {/* 1. Cinematic Production - Full width hero style */}
          <div className="service-item relative bg-gradient-to-r from-brand-deep via-brand-deep/95 to-transparent rounded-[3rem] overflow-hidden border border-brand-border/20 hover:border-brand-gold/30 transition-all duration-700">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10 p-12 lg:p-16">
              <div className="flex items-start justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-3xl bg-brand-gold/10 flex items-center justify-center">
                      <Film size={28} className="text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-3xl text-brand-white mb-2">
                        Cinematic Production
                      </h3>
                      <p className="text-brand-gold text-sm uppercase tracking-wider">Feature-Quality Video Production</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-brand-subtle leading-relaxed mb-8">
                    Feature-quality video production that elevates your brand story with professional 
                    cinematography and expert post-production.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-brand-black/40 rounded-2xl p-4 border border-brand-border/20">
                      <div className="text-brand-gold font-bold text-lg">4K</div>
                      <div className="text-brand-muted text-sm">Cinema Quality</div>
                    </div>
                    <div className="bg-brand-black/40 rounded-2xl p-4 border border-brand-border/20">
                      <div className="text-brand-gold font-bold text-lg">24-70mm</div>
                      <div className="text-brand-muted text-sm">Pro Lenses</div>
                    </div>
                    <div className="bg-brand-black/40 rounded-2xl p-4 border border-brand-border/20">
                      <div className="text-brand-gold font-bold text-lg">Pro Audio</div>
                      <div className="text-brand-muted text-sm">Broadcast Quality</div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-brand-black/60 rounded-2xl p-6 border border-brand-border/30 min-w-[280px]">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-brand-muted mb-4">Current Focus</div>
                    <div className="text-xl font-heading font-bold text-brand-white mb-2 transition-all duration-500">
                      {cinematicDeliverables[activeDeliverable]}
                    </div>
                    <div className="text-sm text-brand-subtle">
                      Crafting compelling visual narratives that connect with your audience.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Two column layout for Commercial Content & Event Documentation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Commercial Content - Left side */}
            <div className="service-item bg-brand-deep rounded-[2rem] p-8 border border-brand-border/20 hover:border-brand-gold/30 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-500">
                  <Camera size={22} className="text-brand-gold" />
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-white">
                  Commercial Content
                </h3>
              </div>

              <p className="text-brand-subtle mb-8 leading-relaxed">
                From product launches to corporate profiles, we create compelling visual 
                content that drives engagement and converts viewers.
              </p>

              <div className="space-y-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-brand-muted mb-3">Deliverables</div>
                {['Product Launches', 'Corporate Profiles', 'Brand Stories', 'Sales Videos', 'Training Content', 'Social Campaigns'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 bg-brand-surface/20 rounded-xl">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span className="text-sm text-brand-cream">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Documentation - Right side */}
            <div className="service-item bg-gradient-to-br from-brand-gold/5 to-brand-deep rounded-[2rem] p-8 border border-brand-gold/20 hover:border-brand-gold/40 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold/30 transition-colors duration-500">
                  <Clapperboard size={22} className="text-brand-gold" />
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-white">
                  Event Documentation
                </h3>
              </div>

              <p className="text-brand-subtle mb-8 leading-relaxed">
                Capture the energy and emotion of your events with documentary-style 
                coverage that tells the complete story.
              </p>

              {/* Timeline style for events */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-brand-muted mb-3">Event Timeline</div>
                {[
                  { time: 'Pre-Event', task: 'Setup & Logistics' },
                  { time: 'Live', task: 'Multi-Camera Coverage' },
                  { time: 'Highlights', task: 'Key Moment Capture' },
                  { time: 'Post', task: 'Fast Turnaround Edit' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-brand-gold/10 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-brand-gold rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-brand-gold text-xs font-mono font-bold">{step.time}</div>
                      <div className="text-brand-cream text-sm">{step.task}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Post-Production - Horizontal layout with stats */}
          <div className="service-item bg-brand-black/40 rounded-[2rem] p-8 lg:p-12 border border-brand-border/20 hover:border-brand-gold/30 transition-all duration-500">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:max-w-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                    <Award size={22} className="text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-brand-white">
                      Post-Production & Delivery
                    </h3>
                    <p className="text-brand-gold text-sm">Professional Editing • Color Grading • Sound Design</p>
                  </div>
                </div>

                <p className="text-brand-subtle mb-6 leading-relaxed">
                  Transform raw footage into polished content with professional editing, 
                  color grading, and sound design that makes your brand unforgettable.
                </p>
              </div>

              <div className="lg:ml-12 mt-8 lg:mt-0">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-gold mb-2">4K</div>
                    <div className="text-brand-muted text-sm">Master Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-gold mb-2">48h</div>
                    <div className="text-brand-muted text-sm">Turnaround</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-gold mb-2">15+</div>
                    <div className="text-brand-muted text-sm">Export Formats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-gold mb-2">∞</div>
                    <div className="text-brand-muted text-sm">Revisions</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-brand-border/20">
              <div className="flex flex-wrap gap-3">
                {['Color Grading', 'Sound Design', 'Motion Graphics', 'Social Cuts', 'YouTube Optimization', 'Closed Captions'].map((service) => (
                  <span key={service} className="px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-medium border border-brand-gold/20">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Maximize2, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Sample frame data - you can replace these with your actual video frames
const videoFrames = [
  {
    id: 1,
    src: '/images/frames/frame1.jpg',
    project: 'Political Campaign',
    description: 'Capturing the decisive moment',
    fallback: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop'
  },
  {
    id: 2,
    src: '/images/frames/frame2.jpg',
    project: 'Real Estate Showcase',
    description: 'Architectural elegance',
    fallback: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=450&fit=crop'
  },
  {
    id: 3,
    src: '/images/frames/frame3.jpg',
    project: 'Construction Documentary',
    description: 'Industrial precision',
    fallback: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=450&fit=crop'
  },
  {
    id: 4,
    src: '/images/frames/frame4.jpg',
    project: 'Event Coverage',
    description: 'Emotional storytelling',
    fallback: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=450&fit=crop'
  },
  {
    id: 5,
    src: '/images/frames/frame5.jpg',
    project: 'Law Firm Profile',
    description: 'Professional authority',
    fallback: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop'
  },
  {
    id: 6,
    src: '/images/frames/frame6.jpg',
    project: 'Landscape Project',
    description: 'Natural beauty captured',
    fallback: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop'
  }
];

const FrameGallery = () => {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const containerRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the entire gallery
      gsap.to(galleryRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Stagger animation for frame cards
      gsap.fromTo('.frame-card', {
        y: 60,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openModal = (frame) => {
    setSelectedFrame(frame);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedFrame(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section ref={containerRef} className="py-20 bg-brand-black relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-surface/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-white/5 border border-brand-white/10 text-brand-subtle text-xs font-medium uppercase tracking-widest mb-6">
            <Camera size={12} />
            Visual Excellence
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
            Frames That Tell Stories
          </h2>
          <p className="text-brand-cream/70 text-lg max-w-2xl mx-auto">
            Every frame is carefully composed to capture the essence of your story. 
            Here are some standout moments from recent projects.
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videoFrames.map((frame) => (
            <div
              key={frame.id}
              className="frame-card group cursor-pointer relative overflow-hidden rounded-lg bg-brand-surface/10 aspect-video"
              onClick={() => openModal(frame)}
            >
              <img
                src={frame.fallback}
                alt={frame.description}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = frame.fallback;
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-brand-cream font-heading font-semibold text-lg mb-1">
                    {frame.project}
                  </h3>
                  <p className="text-brand-cream/70 text-sm">
                    {frame.description}
                  </p>
                </div>
                
                <div className="absolute top-4 right-4">
                  <Maximize2 className="w-5 h-5 text-brand-cream/80" />
                </div>
              </div>

              {/* Film grain effect */}
              <div className="absolute inset-0 bg-noise opacity-10 mix-blend-multiply group-hover:opacity-5 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedFrame && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="bg-brand-surface/10 backdrop-blur-sm rounded-lg overflow-hidden">
              <img
                src={selectedFrame.fallback}
                alt={selectedFrame.description}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              <div className="p-6">
                <h3 className="text-brand-cream font-heading font-bold text-2xl mb-2">
                  {selectedFrame.project}
                </h3>
                <p className="text-brand-cream/70 text-lg">
                  {selectedFrame.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FrameGallery;
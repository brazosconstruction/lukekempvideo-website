import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Floating background frames for visual interest
const BackgroundFrames = () => {
  const containerRef = useRef(null);

  // Video frame images that will float in the background
  const backgroundFrames = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
      size: 'w-32 h-24',
      position: 'top-20 left-10',
      delay: 0
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop',
      size: 'w-28 h-20',
      position: 'top-40 right-20',
      delay: 0.5
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
      size: 'w-36 h-24',
      position: 'top-96 left-1/4',
      delay: 1
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
      size: 'w-24 h-18',
      position: 'bottom-40 right-10',
      delay: 1.5
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      backgroundFrames.forEach((frame, index) => {
        const element = containerRef.current?.querySelector(`[data-frame="${frame.id}"]`);
        if (!element) return;

        // Floating animation
        gsap.to(element, {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          rotation: "random(-2, 2)",
          duration: "random(3, 6)",
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: frame.delay
        });

        // Parallax scroll effect
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Fade in on scroll
        gsap.fromTo(element, {
          opacity: 0,
          scale: 0.8
        }, {
          opacity: 0.15,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {backgroundFrames.map((frame) => (
        <div
          key={frame.id}
          data-frame={frame.id}
          className={`absolute ${frame.position} ${frame.size} rounded-lg overflow-hidden shadow-2xl`}
          style={{ filter: 'blur(0.5px)' }}
        >
          <img
            src={frame.src}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Film frame overlay */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-lg" />
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 to-transparent rounded-lg" />
          
          {/* Film grain */}
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default BackgroundFrames;
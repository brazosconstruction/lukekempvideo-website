import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Cinematic section divider with video frame background
const SectionDivider = ({ 
  backgroundImage = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=400&fit=crop',
  height = 'h-32',
  opacity = 0.1 
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Fade in animation
      gsap.fromTo(imageRef.current, {
        opacity: 0,
        scale: 1.1
      }, {
        opacity: opacity,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [opacity]);

  return (
    <div ref={containerRef} className={`relative ${height} overflow-hidden`}>
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient overlays for seamless blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
      
      {/* Film grain texture */}
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-multiply" />
      
      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
    </div>
  );
};

export default SectionDivider;
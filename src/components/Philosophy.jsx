import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_1 = "I create videos that feel cinematic, clean, and effortlessly polished. My work is simple on purpose. No gimmicks. No clutter. Just real storytelling paired with powerful audio and visuals that make people stop and pay attention.";
const STATEMENT_2 = "I work with clients all across Texas and travel anywhere a story needs to be told. From law firms to real estate teams to growing companies and larger firms, I help people share who they are in a way that feels honest, exciting, and high end.";

function WordReveal({ text, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current.querySelectorAll('.word-item');

      gsap.fromTo(words,
        { opacity: 0.12 },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 50%',
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <p ref={containerRef} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="word-item inline-block mr-[0.3em] opacity-[0.12]">
          {word}
        </span>
      ))}
    </p>
  );
}

export default function Philosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.phil-badge',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.phil-badge', start: 'top 85%' },
        }
      );

      gsap.fromTo('.phil-divider',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.phil-divider', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-12 overflow-hidden">
      {/* Parallax Texture Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A97E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-5xl mx-auto">
        {/* Badge */}
        <div className="phil-badge text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/5 border border-brand-gold/15 text-brand-gold text-[11px] font-medium uppercase tracking-[0.2em]">
            The Craft
          </span>
        </div>

        {/* Statement 1 */}
        <WordReveal
          text={STATEMENT_1}
          className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight text-brand-white mb-16 md:mb-20"
        />

        {/* Divider */}
        <div className="phil-divider h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mb-16 md:mb-20 origin-left" />

        {/* Statement 2 */}
        <WordReveal
          text={STATEMENT_2}
          className="text-xl md:text-2xl lg:text-3xl font-body font-light leading-relaxed text-brand-light/90"
        />

        {/* Accent detail */}
        <div className="mt-20 flex items-center gap-4 justify-center">
          <div className="w-8 h-px bg-brand-gold/40" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-muted font-heading">Luke Kemp</span>
          <div className="w-8 h-px bg-brand-gold/40" />
        </div>
      </div>
    </section>
  );
}

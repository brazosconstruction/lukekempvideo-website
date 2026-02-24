import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSct52Me94yEhMbtStfjIuilCXiRU5finN0kwklpJA6k_Jq8MA/viewform';

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-content > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.footer-content', start: 'top 90%' },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative mt-20">
      <div className="bg-brand-deep rounded-t-[3rem] md:rounded-t-[4rem] border-t border-brand-border/10">
        <div className="footer-content max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            {/* Left — CTA */}
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-white mb-6 leading-tight">
                Ready to tell<br />
                <span className="text-brand-gold">your story?</span>
              </h2>
              <p className="text-brand-subtle text-base leading-relaxed mb-8 max-w-md">
                I work with clients all across Texas and travel anywhere a story needs to be told. Let's create something that makes people stop and pay attention.
              </p>
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-gold text-brand-black font-heading font-semibold text-sm uppercase tracking-wider"
              >
                <span className="btn-bg bg-brand-white" />
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Right — Contact Info */}
            <div className="flex flex-col justify-center">
              <div className="space-y-5">
                <a href="tel:9402288547" className="link-lift flex items-center gap-4 text-brand-light hover:text-brand-gold transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-brand-surface flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                    <Phone size={16} className="text-brand-gold" />
                  </div>
                  <span className="text-base font-medium">(940) 228-8547</span>
                </a>

                <a href="mailto:LukeKemp@tamu.edu" className="link-lift flex items-center gap-4 text-brand-light hover:text-brand-gold transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-brand-surface flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                    <Mail size={16} className="text-brand-gold" />
                  </div>
                  <span className="text-base font-medium">LukeKemp@tamu.edu</span>
                </a>

                <a href="https://instagram.com/lukekempvideo" target="_blank" rel="noopener noreferrer" className="link-lift flex items-center gap-4 text-brand-light hover:text-brand-gold transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-brand-surface flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                    <Instagram size={16} className="text-brand-gold" />
                  </div>
                  <span className="text-base font-medium">@lukekempvideo</span>
                </a>

                <div className="flex items-center gap-4 text-brand-subtle">
                  <div className="w-10 h-10 rounded-xl bg-brand-surface flex items-center justify-center">
                    <MapPin size={16} className="text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-base font-medium text-brand-light">College Station, TX</span>
                    <br />
                    <span className="text-sm text-brand-muted">102 Redmond Dr, 77840</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-brand-border/20 mb-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="status-dot" />
              <span className="text-sm text-brand-muted">Available for new projects</span>
            </div>

            <span className="font-heading font-bold text-sm text-brand-muted tracking-tight">
              LUKE KEMP
            </span>

            <span className="text-xs text-brand-muted/60">
              © {new Date().getFullYear()} Luke Kemp Video. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

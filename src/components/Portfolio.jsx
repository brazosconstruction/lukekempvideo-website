import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';
import { Play, Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_HLS = 'https://video.squarespace-cdn.com/content/v1/691b710f0a0a7e6079cf212f/d2d17372-31ff-4748-86b6-17b92ef24c44/playlist.m3u8';
const RE_VIDEO_HLS = 'https://video.squarespace-cdn.com/content/v1/691b710f0a0a7e6079cf212f/abd9a6cb-3815-4bf9-b0f1-c87f50100c7f/playlist.m3u8';

const CONTACT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSct52Me94yEhMbtStfjIuilCXiRU5finN0kwklpJA6k_Jq8MA/viewform';

function HLSVideo({ src, className = '', poster }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`portfolio-item relative cursor-pointer group ${className}`} onClick={togglePlay}>
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        className="w-full h-full object-cover"
        onMouseEnter={(e) => { e.target.muted = true; e.target.play().catch(() => {}); }}
        onMouseLeave={(e) => { if (!isPlaying) { e.target.pause(); e.target.currentTime = 0; } }}
      />
      {/* Play overlay */}
      <div className={`absolute inset-0 flex items-center justify-center bg-brand-black/40 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <div className="w-16 h-16 rounded-full bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Play size={24} className="text-brand-gold ml-1" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-heading', start: 'top 85%' },
        }
      );

      gsap.fromTo('.portfolio-grid-item',
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%' },
        }
      );

      gsap.fromTo('.portfolio-cta',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-cta', start: 'top 90%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="portfolio-heading mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/5 border border-brand-gold/15 text-brand-gold text-[11px] font-medium uppercase tracking-[0.2em] mb-6">
            <Film size={12} />
            Selected Work
          </span>
          <h2 className="section-title font-heading font-bold text-brand-white">
            See the work<br />
            <span className="text-brand-gold">in motion.</span>
          </h2>
        </div>

        {/* Video Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Showreel — Large */}
          <div className="portfolio-grid-item md:col-span-2">
            <HLSVideo
              src={HERO_VIDEO_HLS}
              className="rounded-[2rem] overflow-hidden aspect-video"
            />
            <div className="mt-4 flex items-center justify-between px-2">
              <div>
                <h3 className="font-heading font-bold text-lg text-brand-white">Showreel 2025</h3>
                <p className="text-sm text-brand-muted">A cinematic compilation of recent work</p>
              </div>
              <span className="text-[11px] uppercase tracking-[0.15em] text-brand-gold font-medium px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                Featured
              </span>
            </div>
          </div>

          {/* Real Estate Video */}
          <div className="portfolio-grid-item">
            <HLSVideo
              src={RE_VIDEO_HLS}
              className="rounded-[2rem] overflow-hidden aspect-video"
            />
            <div className="mt-4 px-2">
              <h3 className="font-heading font-bold text-lg text-brand-white">Real Estate Films</h3>
              <p className="text-sm text-brand-muted">Luxury property walkthroughs & listing videos</p>
            </div>
          </div>

          {/* CTA Card */}
          <div className="portfolio-grid-item flex items-center justify-center">
            <div className="w-full h-full min-h-[300px] rounded-[2rem] bg-gradient-to-br from-brand-deep to-brand-card border border-brand-border/20 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6">
                <Play size={28} className="text-brand-gold ml-1" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-brand-white mb-3">
                Your Story Next?
              </h3>
              <p className="text-brand-subtle text-sm max-w-xs mb-6">
                Every project starts with a conversation. Let's talk about what you're building.
              </p>
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold text-brand-black font-heading font-semibold text-sm"
              >
                <span className="btn-bg bg-brand-white" />
                <span>Start a Project</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="portfolio-cta mt-20 text-center">
          <p className="text-brand-subtle text-base mb-6">
            These are just highlights. Every project is different — and that's the point.
          </p>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-lift inline-flex items-center gap-2 text-brand-gold font-heading font-semibold text-sm uppercase tracking-wider"
          >
            Let's Create Something Together
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Hls from 'hls.js';
import { Play, ChevronDown } from 'lucide-react';

const HERO_VIDEO_HLS = 'https://video.squarespace-cdn.com/content/v1/691b710f0a0a7e6079cf212f/d2d17372-31ff-4748-86b6-17b92ef24c44/playlist.m3u8';
const CONTACT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSct52Me94yEhMbtStfjIuilCXiRU5finN0kwklpJA6k_Jq8MA/viewform';

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // HLS Video Setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        maxBufferLength: 30,
      });
      hls.loadSource(HERO_VIDEO_HLS);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.muted = true;
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HERO_VIDEO_HLS;
      video.muted = true;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
      );

      tl.fromTo('.hero-title-line',
        { y: 80, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.08 },
        '-=0.4'
      );

      tl.fromTo('.hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        '-=0.4'
      );

      tl.fromTo('.hero-scroll',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] flex items-end pb-20 md:pb-28 overflow-hidden">
      {/* Background Video */}
      <div className="hero-video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Badge */}
        <div className="hero-badge mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-white/5 border border-brand-white/10 text-brand-subtle text-xs font-medium uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            Texas-Based Filmmaker
          </span>
        </div>

        {/* Title */}
        <h1 className="hero-title font-heading font-bold text-brand-white mb-6">
          <span className="hero-title-line block">Turning</span>
          <span className="hero-title-line block">Vision Into{' '}
            <span className="text-brand-gold">Film</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle max-w-xl text-lg md:text-xl text-brand-light/80 font-light leading-relaxed mb-10">
          Cinematic video production that feels polished, honest, and impossible to ignore. No gimmicks. Just real storytelling.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-gold text-brand-black font-heading font-semibold text-sm uppercase tracking-wider"
          >
            <span className="btn-bg bg-brand-white" />
            <span className="flex items-center gap-3">
              Start a Project
              <ArrowRight size={16} />
            </span>
          </a>
          <a
            href="#portfolio"
            className="hero-cta btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full border border-brand-white/20 text-brand-cream font-heading font-medium text-sm uppercase tracking-wider"
          >
            <span className="btn-bg bg-brand-white/10" />
            <span className="flex items-center gap-3">
              <Play size={16} fill="currentColor" />
              Watch Reel
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ── SVG Animations for each process card ── */
function DiscoverySVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="40" stroke="#C8A97E" strokeWidth="1" strokeDasharray="4 4" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" values="0 60 60;360 60 60" dur="20s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="60" r="25" stroke="#C8A97E" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="r" values="25;28;25" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="60" r="4" fill="#C8A97E" opacity="0.9">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
      </circle>
      <line x1="60" y1="36" x2="60" y2="42" stroke="#C8A97E" strokeWidth="1" opacity="0.5"/>
      <line x1="60" y1="78" x2="60" y2="84" stroke="#C8A97E" strokeWidth="1" opacity="0.5"/>
      <line x1="36" y1="60" x2="42" y2="60" stroke="#C8A97E" strokeWidth="1" opacity="0.5"/>
      <line x1="78" y1="60" x2="84" y2="60" stroke="#C8A97E" strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

function ProductionSVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Film frame */}
      <rect x="25" y="35" width="70" height="50" rx="4" stroke="#C8A97E" strokeWidth="1.5" opacity="0.6"/>
      {/* Lens */}
      <circle cx="60" cy="60" r="16" stroke="#C8A97E" strokeWidth="1.5" opacity="0.7">
        <animate attributeName="r" values="16;18;16" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="60" r="8" stroke="#C8A97E" strokeWidth="1" opacity="0.4"/>
      <circle cx="60" cy="60" r="3" fill="#C8A97E" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* Recording dot */}
      <circle cx="88" cy="42" r="3" fill="#ef4444" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      {/* Film strip perfs */}
      <rect x="27" y="37" width="4" height="3" rx="0.5" fill="#C8A97E" opacity="0.3"/>
      <rect x="27" y="43" width="4" height="3" rx="0.5" fill="#C8A97E" opacity="0.3"/>
      <rect x="27" y="49" width="4" height="3" rx="0.5" fill="#C8A97E" opacity="0.3"/>
      <rect x="89" y="37" width="4" height="3" rx="0.5" fill="#C8A97E" opacity="0.3"/>
      <rect x="89" y="43" width="4" height="3" rx="0.5" fill="#C8A97E" opacity="0.3"/>
      <rect x="89" y="49" width="4" height="3" rx="0.5" fill="#C8A97E" opacity="0.3"/>
    </svg>
  );
}

function DeliverySVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Play button */}
      <polygon points="50,40 80,60 50,80" stroke="#C8A97E" strokeWidth="1.5" fill="none" opacity="0.7">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
      </polygon>
      {/* Orbit ring 1 */}
      <circle cx="60" cy="60" r="45" stroke="#C8A97E" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.2">
        <animateTransform attributeName="transform" type="rotate" values="0 60 60;360 60 60" dur="15s" repeatCount="indefinite"/>
      </circle>
      {/* Orbit ring 2 */}
      <circle cx="60" cy="60" r="52" stroke="#C8A97E" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.15">
        <animateTransform attributeName="transform" type="rotate" values="360 60 60;0 60 60" dur="25s" repeatCount="indefinite"/>
      </circle>
      {/* Delivery nodes */}
      <circle cx="105" cy="60" r="3" fill="#C8A97E" opacity="0.5">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="15" r="2.5" fill="#C8A97E" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="15" cy="60" r="2" fill="#C8A97E" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Vision',
    desc: 'We start with a conversation. I learn your brand, your goals, and the story you want to tell. Every great film begins with a clear vision — we\'ll build yours together before a single camera rolls.',
    detail: 'Includes creative brief, mood board, location scouting, and shot list.',
    svg: DiscoverySVG,
  },
  {
    number: '02',
    title: 'Production Day',
    desc: 'This is where the magic happens. Cinema-grade cameras, professional audio, and intentional lighting transform your vision into raw footage that already feels cinematic. I direct, I shoot, I capture.',
    detail: 'Sony FX series cameras, wireless audio, drone footage, and on-location direction.',
    svg: ProductionSVG,
  },
  {
    number: '03',
    title: 'Edit & Deliver',
    desc: 'Raw footage becomes a polished film. Professional editing, cinematic color grading, and sound design. You get a master file plus cuts optimized for every platform — web, social, presentations.',
    detail: 'Typically 2–3 week turnaround. Revisions included until you\'re thrilled.',
    svg: DeliverySVG,
  },
];

export default function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-heading', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="process-heading mb-20 md:mb-28">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/5 border border-brand-gold/15 text-brand-gold text-[11px] font-medium uppercase tracking-[0.2em] mb-6">
            <Eye size={12} />
            How It Works
          </span>
          <h2 className="section-title font-heading font-bold text-brand-white">
            From concept<br />
            <span className="text-brand-gold">to final cut.</span>
          </h2>
        </div>

        {/* Sticky Stacking Cards */}
        <div className="relative space-y-6">
          {processSteps.map((step, i) => {
            const SVGComponent = step.svg;
            return (
              <div
                key={i}
                className="sticky-card bg-brand-deep rounded-[2rem] md:rounded-[3rem] border border-brand-border/20 p-8 md:p-12"
                style={{
                  top: `${120 + i * 40}px`,
                  zIndex: 10 + i,
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                  {/* SVG Animation */}
                  <div className="flex-shrink-0">
                    <SVGComponent />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-brand-gold font-heading font-bold text-sm tracking-wider">
                        {step.number}
                      </span>
                      <div className="w-8 h-px bg-brand-gold/30" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-brand-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-brand-subtle text-base leading-relaxed mb-4">
                      {step.desc}
                    </p>
                    <p className="text-brand-muted text-sm italic">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

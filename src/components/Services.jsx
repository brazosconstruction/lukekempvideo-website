import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Camera, Clapperboard, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ── Diagnostic Shuffler: cycles through deliverables ── */
function DiagnosticShuffler() {
  const items = [
    'Branded Films', 'Recruitment Videos', 'Testimonials',
    'Social Content', 'Event Recaps', 'Aerial Footage',
    'Product Showcases', 'Culture Videos', 'Launch Films',
  ];
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
  }, []);

  useEffect(() => {
    const timer = setInterval(shuffle, 4000);
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

/* ── Telemetry Typewriter: types out the process ── */
function TelemetryTypewriter() {
  const lines = [
    '> Location scouted: Downtown Fort Worth',
    '> Camera: Sony FX6 — 4K Cinema',
    '> Lens: 24-70mm f/2.8 GM II',
    '> Audio: Wireless lav + shotgun boom',
    '> Color grade: Cinematic warm tone',
    '> Delivery: 4K master + social cuts',
  ];
  const [displayLines, setDisplayLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) {
      const timer = setTimeout(() => {
        setDisplayLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 3000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      if (currentChar < lines[currentLine].length) {
        setDisplayLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = lines[currentLine].slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      } else {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }
    }, currentChar === 0 ? 400 : 25);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar]);

  return (
    <div className="mt-6 bg-brand-black/60 rounded-2xl p-4 border border-brand-border/30 font-mono text-[11px] leading-relaxed min-h-[180px]">
      {displayLines.map((line, i) => (
        <div key={i} className="text-brand-gold/80">
          {line}
          {i === displayLines.length - 1 && currentLine < lines.length && (
            <span className="typewriter-cursor" />
          )}
        </div>
      ))}
      {displayLines.length === 0 && (
        <div className="text-brand-muted">
          {'> Initializing shoot...'}
          <span className="typewriter-cursor" />
        </div>
      )}
    </div>
  );
}

/* ── Protocol Scheduler: timeline of shoot day ── */
function ProtocolScheduler() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { time: '06:00', label: 'Golden hour setup', status: 'complete' },
    { time: '08:00', label: 'A-roll interviews', status: 'complete' },
    { time: '10:30', label: 'B-roll & aerials', status: 'active' },
    { time: '14:00', label: 'Review & pickup shots', status: 'pending' },
    { time: '16:00', label: 'Wrap & backup', status: 'pending' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-6 space-y-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-brand-muted mb-3">Shoot Day Timeline</div>
      {steps.map((step, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-500 ${
            i === activeStep
              ? 'bg-brand-gold/10 border border-brand-gold/30'
              : i < activeStep
              ? 'bg-brand-surface/30 border border-transparent opacity-60'
              : 'bg-brand-surface/20 border border-transparent opacity-40'
          }`}
        >
          <span className={`text-xs font-mono font-bold ${i === activeStep ? 'text-brand-gold' : 'text-brand-muted'}`}>
            {step.time}
          </span>
          <div className={`w-2 h-2 rounded-full ${
            i === activeStep ? 'bg-brand-gold' : i < activeStep ? 'bg-brand-gold-dim' : 'bg-brand-border'
          }`} />
          <span className={`text-sm ${i === activeStep ? 'text-brand-cream font-medium' : 'text-brand-muted'}`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Main Services Section ── */
const services = [
  {
    icon: Film,
    title: 'Brand Films',
    desc: 'High-end cinematic films that capture your brand\'s story. From law firms to real estate teams, I help companies share who they are in a way that feels honest, exciting, and premium.',
    component: DiagnosticShuffler,
  },
  {
    icon: Camera,
    title: 'Production',
    desc: 'Full-service video production with cinema-grade equipment. Every shoot is planned, lit, and captured with the same precision as a feature film — because your brand deserves it.',
    component: TelemetryTypewriter,
  },
  {
    icon: Clapperboard,
    title: 'Post & Delivery',
    desc: 'Professional editing, color grading, and sound design that transforms raw footage into something people can\'t stop watching. Delivered in every format you need.',
    component: ProtocolScheduler,
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-heading', start: 'top 85%' },
        }
      );

      gsap.fromTo('.service-card-item',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.service-cards-container', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="services-heading mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/5 border border-brand-gold/15 text-brand-gold text-[11px] font-medium uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} />
            What I Do
          </span>
          <h2 className="section-title font-heading font-bold text-brand-white">
            Cinematic storytelling<br />
            <span className="text-brand-gold">built for your brand.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="service-cards-container grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            const Interactive = service.component;
            return (
              <div
                key={i}
                className="service-card-item service-card group bg-brand-deep rounded-[2rem] p-8 border border-brand-border/20 hover:border-brand-gold/30 transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors duration-500">
                  <Icon size={22} className="text-brand-gold" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-brand-white mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-brand-subtle leading-relaxed">
                  {service.desc}
                </p>

                {/* Interactive Component */}
                <Interactive />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

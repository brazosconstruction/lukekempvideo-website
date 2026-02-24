import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const CONTACT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSct52Me94yEhMbtStfjIuilCXiRU5finN0kwklpJA6k_Jq8MA/viewform';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Work', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#philosophy' },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out
          ${scrolled
            ? 'navbar-blur border border-brand-border/40 shadow-2xl shadow-black/30 rounded-full px-6 py-3'
            : 'bg-transparent px-6 py-4 rounded-full'
          }`}
        style={{ width: 'min(92vw, 800px)' }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-heading font-bold text-lg tracking-tight text-brand-cream hover:text-brand-gold transition-colors duration-300">
            LUKE KEMP
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="link-lift text-sm font-medium text-brand-subtle hover:text-brand-gold transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold/60 text-brand-gold text-sm font-semibold"
            >
              <span className="btn-bg bg-brand-gold" />
              <span className="transition-colors duration-300 group-hover:text-brand-black">Contact</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-brand-cream"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="font-heading text-3xl font-bold text-brand-cream hover:text-brand-gold transition-colors"
          >
            {item.label}
          </a>
        ))}
        <a
          href={CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-magnetic mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-full border border-brand-gold text-brand-gold text-lg font-semibold"
        >
          <span className="btn-bg bg-brand-gold" />
          <span>Contact</span>
        </a>
      </div>
    </>
  );
}

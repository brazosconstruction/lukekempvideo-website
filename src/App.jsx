import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Play, Film, Camera, Clapperboard, ArrowRight, MapPin, Phone, Mail,
  Instagram, Menu, X, ChevronDown, Aperture, Video, Sparkles, Eye
} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EnhancedServices from './components/EnhancedServices';
import Philosophy from './components/Philosophy';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import LatestProjects from './components/LatestProjects';
import FrameGallery from './components/FrameGallery';
import SectionDivider from './components/SectionDivider';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════
   LUKE KEMP VIDEO — Cinematic Landing Page
   
   Brand palette derived from lukekempvideo.com:
   Original: Pure monochrome (black/white/grey)
   Enhanced: Deep blacks with warm cinematic gold
   Fonts: Poppins (heading) + Manrope (body)
   ═══════════════════════════════════════════════ */

export default function App() {
  return (
    <div className="relative min-h-screen bg-brand-black text-brand-cream font-body">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <SectionDivider backgroundImage="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&h=400&fit=crop" />
      <EnhancedServices />
      <SectionDivider backgroundImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=400&fit=crop" />
      <Philosophy />
      <SectionDivider backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=400&fit=crop" />
      <Process />
      <SectionDivider backgroundImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=400&fit=crop" />
      <LatestProjects />
      <SectionDivider backgroundImage="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=400&fit=crop" />
      <FrameGallery />
      <SectionDivider backgroundImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=400&fit=crop" />
      <Portfolio />
      <Footer />
    </div>
  );
}

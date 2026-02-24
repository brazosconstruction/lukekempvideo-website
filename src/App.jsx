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
      <SectionDivider backgroundImage="/images/dividers/frame-1.jpg" />
      <EnhancedServices />
      <SectionDivider backgroundImage="/images/dividers/frame-2.jpg" />
      <Philosophy />
      <SectionDivider backgroundImage="/images/dividers/frame-3.jpg" />
      <Process />
      <SectionDivider backgroundImage="/images/dividers/frame-4.jpg" />
      <LatestProjects />
      <SectionDivider backgroundImage="/images/dividers/frame-5.jpg" />
      <FrameGallery />
      <SectionDivider backgroundImage="/images/dividers/frame-1.jpg" />
      <Portfolio />
      <Footer />
    </div>
  );
}

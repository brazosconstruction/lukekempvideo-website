import React, { useState, useEffect } from 'react';

const FrameGallery = () => {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use Luke's actual frames
  const frames = [
    { id: 1, src: '/images/frames/frame-1.jpg', alt: 'Professional Video Production' },
    { id: 2, src: '/images/frames/frame-2.jpg', alt: 'Cinematic Storytelling' },
    { id: 3, src: '/images/frames/frame-3.jpg', alt: 'Corporate Content' },
    { id: 4, src: '/images/frames/frame-4.jpg', alt: 'Event Documentation' },
    { id: 5, src: '/images/frames/frame-5.jpg', alt: 'Creative Production' },
    { id: 6, src: '/images/frames/frame-6.jpg', alt: 'Visual Excellence' }
  ];

  const openLightbox = (frame, index) => {
    setSelectedFrame(frame);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedFrame(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % frames.length;
    setCurrentIndex(nextIndex);
    setSelectedFrame(frames[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + frames.length) % frames.length;
    setCurrentIndex(prevIndex);
    setSelectedFrame(frames[prevIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedFrame) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedFrame, currentIndex]);

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frame Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-amber-300 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of professional video production excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frames.map((frame, index) => (
            <div
              key={frame.id}
              className="group relative overflow-hidden rounded-lg bg-gray-900 cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => openLightbox(frame, index)}
            >
              <div className="aspect-video relative">
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">View Full Frame</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedFrame && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl max-h-full">
              <img
                src={selectedFrame.src}
                alt={selectedFrame.alt}
                className="max-w-full max-h-[90vh] object-contain"
              />
              
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gold transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gold transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gold transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FrameGallery;
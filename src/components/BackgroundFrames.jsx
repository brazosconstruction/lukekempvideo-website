import React, { useState, useEffect } from 'react';

const BackgroundFrames = () => {
  const [frames] = useState([
    { id: 1, src: '/images/backgrounds/frame-1.jpg', style: { top: '10%', left: '5%', width: '120px', opacity: 0.15 }},
    { id: 2, src: '/images/backgrounds/frame-2.jpg', style: { top: '25%', right: '8%', width: '140px', opacity: 0.12 }},
    { id: 3, src: '/images/backgrounds/frame-3.jpg', style: { top: '45%', left: '3%', width: '100px', opacity: 0.18 }},
    { id: 4, src: '/images/backgrounds/frame-4.jpg', style: { top: '60%', right: '12%', width: '160px', opacity: 0.1 }},
    { id: 5, src: '/images/backgrounds/frame-5.jpg', style: { top: '75%', left: '10%', width: '110px', opacity: 0.16 }},
    { id: 6, src: '/images/backgrounds/frame-6.jpg', style: { top: '35%', right: '25%', width: '90px', opacity: 0.14 }},
    { id: 7, src: '/images/backgrounds/frame-7.jpg', style: { top: '15%', left: '30%', width: '130px', opacity: 0.11 }},
    { id: 8, src: '/images/backgrounds/frame-8.jpg', style: { top: '55%', right: '30%', width: '95px', opacity: 0.17 }},
    { id: 9, src: '/images/backgrounds/frame-9.jpg', style: { top: '80%', right: '5%', width: '125px', opacity: 0.13 }}
  ]);

  const [visibleFrames, setVisibleFrames] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleFrames(frames);
    }, 1000);

    return () => clearTimeout(timer);
  }, [frames]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {visibleFrames.map((frame, index) => (
        <div
          key={frame.id}
          className="absolute transition-all duration-1000 ease-out transform hover:scale-110"
          style={{
            ...frame.style,
            animation: `float-${index % 3} ${6 + (index % 4)}s ease-in-out infinite`,
            animationDelay: `${index * 0.5}s`
          }}
        >
          <img
            src={frame.src}
            alt=""
            className="w-full h-auto object-cover rounded-lg shadow-2xl filter blur-sm"
            loading="lazy"
          />
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default BackgroundFrames;
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const ticker = gsap.ticker.add(() => {
      // Dot follows exactly
      gsap.set(dotRef.current, { x: mouseX, y: mouseY });
      
      // Ring lerps
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ringRef.current, { x: ringX, y: ringY });
    });

    const hoverElements = document.querySelectorAll('a, button, .hover-target');
    const projectCards = document.querySelectorAll('.project-card');

    const handleHover = () => {
      gsap.to(ringRef.current, { scale: 1.5, backgroundColor: 'rgba(212, 255, 0, 0.2)', borderColor: 'transparent', duration: 0.3 });
      gsap.to(dotRef.current, { opacity: 0, duration: 0.1 });
    };

    const handleLeave = () => {
      gsap.to(ringRef.current, { scale: 1, backgroundColor: 'transparent', borderColor: 'var(--acid-yellow)', borderRadius: '50%', width: '40px', height: '40px', duration: 0.3 });
      gsap.to(dotRef.current, { opacity: 1, duration: 0.1 });
    };

    const handleCardHover = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const aspect = rect.width / rect.height;
      gsap.to(ringRef.current, { 
        width: rect.width * 0.1, 
        height: rect.height * 0.1, 
        borderRadius: '4px',
        backgroundColor: 'rgba(212, 255, 0, 0.1)',
        borderColor: 'var(--acid-yellow)',
        duration: 0.3 
      });
      gsap.to(dotRef.current, { opacity: 0, duration: 0.1 });
    };

    const handleClick = () => {
      gsap.fromTo(ringRef.current, { scale: 2 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    projectCards.forEach(el => {
      el.addEventListener('mouseenter', handleCardHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', handleClick);
      gsap.ticker.remove(ticker);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
      projectCards.forEach(el => {
        el.removeEventListener('mouseenter', handleCardHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}

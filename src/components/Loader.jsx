import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { personalInfo } from '../data/content';
import './Loader.css';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const avatarRef = useRef(null);
  const introContainerRef = useRef(null);
  
  const [typedText, setTypedText] = useState('');
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    const tlIntro = gsap.timeline({
      onComplete: () => {
        setShowTyping(true);
      }
    });

    // Avatar intro sequence
    tlIntro.fromTo(avatarRef.current, 
      { scale: 0, rotation: -20, opacity: 0 }, 
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)' }
    )
    .to(avatarRef.current, {
      scale: 1.2, opacity: 0, duration: 0.6, ease: 'power2.in', delay: 1.5
    })
    .to(introContainerRef.current, {
      display: 'none', duration: 0
    });

  }, []);

  useEffect(() => {
    if (!showTyping) return;

    const fullName = personalInfo.name;
    let currentText = '';
    let i = 0;
    
    // Typewriter effect
    const typeInterval = setInterval(() => {
      if (i < fullName.length) {
        currentText += fullName.charAt(i);
        setTypedText(currentText);
        i++;
      } else {
        clearInterval(typeInterval);
        
        // After typing, stretch the line and count up
        const tl = gsap.timeline();
        
        tl.to(lineRef.current, {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut'
        }, 0);

        tl.to(counterRef.current, {
          innerText: 100,
          duration: 1.2,
          snap: { innerText: 1 },
          ease: 'power3.inOut'
        }, 0);

        // Slide up the entire loader
        tl.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: onComplete
        }, '+=0.2');
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [showTyping, onComplete]);

  return (
    <div className="loader-container" ref={containerRef}>
      
      {!showTyping && (
        <div className="avatar-intro-container" ref={introContainerRef}>
          <div className="avatar-wrapper" ref={avatarRef}>
            <img src="/akdas-avatar.png" alt="Akdas Coding" className="avatar-img" />
            <div className="avatar-ring"></div>
          </div>
        </div>
      )}

      {showTyping && (
        <>
          <div className="loader-content">
            <h1 className="loader-name" ref={textRef}>
              {typedText}
              <span className="cursor"></span>
            </h1>
            <div className="loader-line-container">
              <div className="loader-line" ref={lineRef}></div>
            </div>
          </div>
          <div className="loader-counter">
            <span ref={counterRef}>0</span>%
          </div>
        </>
      )}
    </div>
  );
}

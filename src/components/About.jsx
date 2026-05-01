import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/content';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Text Reveal
    const textLines = textRef.current.querySelectorAll('.line-inner');
    gsap.fromTo(textLines, 
      { yPercent: 100 },
      {
        yPercent: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      }
    );

    // Image Wipe
    gsap.fromTo(imageRef.current,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        }
      }
    );

    // Stats Count Up
    const stats = statsRef.current.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const endValue = stat.getAttribute('data-value');
      if (endValue === '∞') return;
      
      const parsed = parseFloat(endValue);
      if (isNaN(parsed)) return;

      gsap.fromTo(stat, 
        { innerText: 0 },
        {
          innerText: parsed,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: parsed % 1 !== 0 ? 0.01 : 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          }
        }
      );
    });

  }, []);

  return (
    <section id="about" className="about-section" ref={containerRef}>
      <div className="section-number">01</div>
      <div className="container">
        <h2 className="section-title">
          <span className="line-inner">About Me</span>
          <div className="title-line"></div>
        </h2>
        
        <div className="about-grid">
          <div className="about-text" ref={textRef}>
            {personalInfo.bio.split('\n\n').map((paragraph, i) => (
              <div key={i} className="line-mask">
                <p className="line-inner">{paragraph}</p>
              </div>
            ))}
            
            <div className="stats-row" ref={statsRef}>
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <h3 className="stat-number" data-value={stat.number.replace(/[^0-9.]/g, '')}>
                    {stat.number === '∞' ? '∞' : '0'}
                    {stat.number.includes('+') ? '+' : ''}
                  </h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="about-visual">
            <div className="image-wrapper" ref={imageRef}>
              <img src="/akdas-clean.png" alt="Akdas Ansari" className="profile-img" loading="lazy" width="400" height="400" />
              <div className="image-overlay"></div>
            </div>
            <div className="decorative-lines"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

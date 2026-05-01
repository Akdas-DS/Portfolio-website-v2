import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/content';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.project-card');
    
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );

      // 3D Tilt Effect
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        gsap.to(card, {
          rotateX,
          rotateY,
          translateZ: 20,
          duration: 0.5,
          ease: 'power2.out'
        });

        const gloss = card.querySelector('.card-gloss');
        if (gloss) {
          gsap.to(gloss, {
            x: (x - centerX) * -0.5,
            y: (y - centerY) * -0.5,
            opacity: 0.1,
            duration: 0.5
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)'
        });
        
        const gloss = card.querySelector('.card-gloss');
        if (gloss) {
          gsap.to(gloss, { opacity: 0, duration: 0.5 });
        }
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <section id="projects" className="projects-section" ref={containerRef}>
      <div className="section-number">03</div>
      <div className="container">
        <h2 className="section-title">Selected Work</h2>
        
        <div className="featured-project-container project-card hover-target">
          <div className="card-gloss"></div>
          <div className="featured-number">01</div>
          <div className="featured-content">
            <p className="project-subtitle">{featuredProject.subtitle}</p>
            <h3 className="project-title">{featuredProject.title}</h3>
            <p className="project-desc">{featuredProject.description}</p>
            <div className="project-tags">
              {featuredProject.tags.map((tag, i) => <span key={i}>{tag}</span>)}
            </div>
            <div className="project-links">
              <a href={featuredProject.github} target="_blank" rel="noreferrer" className="icon-link">GitHub</a>
              {featuredProject.demo && <a href={featuredProject.demo} target="_blank" rel="noreferrer" className="icon-link">Demo</a>}
            </div>
          </div>
        </div>

        <div className="projects-grid">
          {otherProjects.map((p, index) => (
            <div key={p.id} className="project-card hover-target">
              <div className="card-gloss"></div>
              <div className="card-inner-content">
                <p className="project-subtitle">{p.subtitle}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-hover-overlay">
                  <div className="project-tags">
                    {p.tags.slice(0,3).map((tag, i) => <span key={i}>{tag}</span>)}
                  </div>
                  <div className="project-links mt-auto">
                    <a href={p.github} target="_blank" rel="noreferrer" className="icon-link">GitHub</a>
                    <a href={p.linkedin} target="_blank" rel="noreferrer" className="icon-link">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="https://github.com/Akdas-DS" target="_blank" rel="noreferrer" className="view-all-link">
            View All on GitHub <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

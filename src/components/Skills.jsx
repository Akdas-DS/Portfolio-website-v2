import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/content';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef(null);
  const cloudRef = useRef(null);

  useEffect(() => {
    const pills = cloudRef.current.querySelectorAll('.skill-pill');
    
    gsap.fromTo(pills,
      { 
        opacity: 0, 
        scale: 0,
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 200
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 1,
        stagger: 0.02,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, []);

  const getColorClass = (category) => {
    switch(category) {
      case 'core': return 'skill-blue';
      case 'ml': return 'skill-orange';
      case 'dl': return 'skill-coral';
      case 'tools': return 'skill-yellow';
      default: return '';
    }
  };

  const getSizeClass = (level) => {
    switch(level) {
      case 'expert': return 'skill-lg';
      case 'proficient': return 'skill-md';
      case 'learning': return 'skill-sm';
      default: return 'skill-md';
    }
  };

  return (
    <section id="skills" className="skills-section" ref={containerRef}>
      <div className="section-number">02</div>
      <div className="container">
        <h2 className="section-title">Capabilities</h2>
        
        <div className="skills-cloud" ref={cloudRef}>
          {skills.map((skill, i) => (
            <div 
              key={i} 
              className={`skill-pill ${getColorClass(skill.category)} ${getSizeClass(skill.level)} hover-target`}
              data-level={skill.level}
            >
              {skill.name}
              <div className="skill-tooltip">{skill.level}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

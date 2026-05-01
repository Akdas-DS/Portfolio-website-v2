import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, education, certifications } from '../data/content';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll('.timeline-item');
    items.forEach(item => {
      const dot = item.querySelector('.timeline-dot');
      
      gsap.fromTo(item,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        }
      );

      if (dot) {
        gsap.to(dot, {
          scale: 1.5,
          opacity: 0.5,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        });
      }
    });
  }, []);

  return (
    <section id="experience" className="exp-section" ref={containerRef}>
      <div className="section-number">04</div>
      <div className="container">
        <h2 className="section-title">Experience & Education</h2>
        
        <div className="timeline-grid">
          <div className="timeline-col">
            <h3 className="col-heading">Work Experience</h3>
            <div className="timeline-wrap">
              {experience.map((exp, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="exp-period">{exp.period}</span>
                    <h4 className="exp-title">{exp.title}</h4>
                    <p className="exp-org">{exp.organization} — {exp.location}</p>
                    <ul className="exp-bullets">
                      {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="timeline-col">
            <h3 className="col-heading">Education & Certs</h3>
            <div className="timeline-wrap">
              {education.map((edu, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="exp-period">{edu.period}</span>
                    <h4 className="exp-title">{edu.degree}</h4>
                    <p className="exp-org">{edu.institution}</p>
                    <p className="exp-gpa">{edu.gpa}</p>
                  </div>
                </div>
              ))}
              
              <div className="cert-wrap">
                <h4 className="cert-heading">Certifications</h4>
                {certifications.map((cert, i) => (
                  <div key={i} className="cert-item timeline-item">
                     <p className="cert-name">{cert.name}</p>
                     <span className="cert-issuer">{cert.issuer} • {cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

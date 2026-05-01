import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/content';
import MagneticWrapper from './MagneticWrapper';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState('idle'); // idle, loading, success
  const headingRef = useRef(null);

  useEffect(() => {
    const lines = headingRef.current.querySelectorAll('.contact-line');
    gsap.fromTo(lines,
      { yPercent: 100 },
      {
        yPercent: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    
    // Simulate network request
    setTimeout(() => {
      setFormState('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#FF4D00', '#0057FF']
      });
      
      // Reset form
      e.target.reset();
      setTimeout(() => setFormState('idle'), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-number">05</div>
      <div className="container">
        <h2 className="massive-heading" ref={headingRef}>
          <div className="line-mask"><span className="contact-line">Let's Build</span></div>
          <div className="line-mask"><span className="contact-line">Something.</span></div>
        </h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="email-copy-wrap">
              <span className="email-text">{personalInfo.email}</span>
              <button 
                className={`copy-btn hover-target ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <div className="social-links">
              <MagneticWrapper>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="social-icon linkedin hover-target">LI</a>
              </MagneticWrapper>
              <MagneticWrapper>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="social-icon github hover-target">GH</a>
              </MagneticWrapper>
            </div>
          </div>
          
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" id="name" required placeholder=" " />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" required placeholder=" " />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-group">
                <textarea id="message" rows="4" required placeholder=" "></textarea>
                <label htmlFor="message">Message</label>
              </div>
              
              <button 
                type="submit" 
                className={`submit-btn hover-target ${formState}`}
                disabled={formState !== 'idle'}
              >
                <span className="btn-text">
                  {formState === 'idle' && 'Send Message'}
                  {formState === 'loading' && 'Sending...'}
                  {formState === 'success' && 'Sent Successfully!'}
                </span>
                <span className="btn-bg"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

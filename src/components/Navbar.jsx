import { useEffect, useState } from 'react';
import { personalInfo } from '../data/content';
import './Navbar.css';

export default function Navbar({ activeSection, lenis }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (lenis.current) {
      lenis.current.scrollTo(`#${id}`, { offset: -80 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = ['about', 'skills', 'projects', 'experience', 'contact'];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => scrollTo('home')}>
        {personalInfo.initials}
      </div>
      <div className="nav-links">
        {navItems.map(item => (
          <button 
            key={item} 
            className={`nav-link ${activeSection === item ? 'active' : ''}`}
            onClick={() => scrollTo(item)}
          >
            <span className="nav-link-inner" data-text={item}>{item}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

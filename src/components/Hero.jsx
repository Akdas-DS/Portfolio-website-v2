import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { personalInfo } from '../data/content';
import './Hero.css';

import MagneticWrapper from './MagneticWrapper';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const rolesRef = useRef(null);


  useEffect(() => {
    // 3D Particles Background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 30;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.2,
      color: 0xF2EFE9,
      transparent: true,
      opacity: 0.4
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.001;
      
      // Mouse interaction
      particlesMesh.rotation.x += mouseY * 0.03;
      particlesMesh.rotation.y += mouseX * 0.03;
      
      renderer.render(scene, camera);
    };
    animate();

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Text Animation (falling blocks)
    const chars = textRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'power4.out', delay: 0.5 }
    );

    // Role Cycling
    let roleIndex = 0;
    const roles = personalInfo.roles;
    const cycleRole = () => {
      if (!rolesRef.current) return;
      gsap.to(rolesRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          roleIndex = (roleIndex + 1) % roles.length;
          rolesRef.current.innerText = roles[roleIndex];
          gsap.to(rolesRef.current, {
            clipPath: 'inset(0 0 0 0)',
            duration: 0.5,
            ease: 'power2.inOut'
          });
        }
      });
    };
    const roleInterval = setInterval(cycleRole, 3000);

    // Parallax on Scroll
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      },
      y: 150,
      scale: 0.95,
      opacity: 0.2
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      clearInterval(roleInterval);
    };
  }, []);

  return (
    <section id="home" className="hero-section" ref={containerRef}>
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      
      <div className="hero-content">
        <h1 className="hero-title" ref={textRef}>
          {personalInfo.name.split('').map((char, i) => (
            <span key={i} className="char" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        
        <div className="hero-subtitle">
          <span ref={rolesRef} style={{ clipPath: 'inset(0 0 0 0)' }}>{personalInfo.roles[0]}</span>
        </div>
        
        <div className="hero-ctas">
          <MagneticWrapper>
            <a href="#projects" className="cta-primary hover-target">See My Work</a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="#contact" className="cta-secondary hover-target">Get In Touch</a>
          </MagneticWrapper>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div className="arrow"></div>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          {personalInfo.marqueeText.repeat(5)}
        </div>
      </div>
    </section>
  );
}

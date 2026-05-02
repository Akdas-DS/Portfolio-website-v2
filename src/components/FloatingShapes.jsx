import { useEffect, useRef } from 'react';

export default function FloatingShapes() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const shapes = [];
    const colors = ['#FFC300', '#FF5E00'];
    const types = ['circle', 'triangle', 'square', 'plus'];

    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.02
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const drawShape = (s) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = 0.08;

      ctx.beginPath();
      if (s.type === 'circle') {
        ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.type === 'square') {
        ctx.rect(-s.size, -s.size, s.size * 2, s.size * 2);
        ctx.fill();
      } else if (s.type === 'triangle') {
        ctx.moveTo(0, -s.size);
        ctx.lineTo(s.size, s.size);
        ctx.lineTo(-s.size, s.size);
        ctx.closePath();
        ctx.fill();
      } else if (s.type === 'plus') {
        const thickness = s.size / 3;
        ctx.rect(-s.size, -thickness, s.size * 2, thickness * 2);
        ctx.rect(-thickness, -s.size, thickness * 2, s.size * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(s => {
        // Physics update
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vrot;

        // Antigravity (repulsion from mouse)
        const dx = s.x - mouseX;
        const dy = s.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          s.vx += (dx / dist) * force * 0.5;
          s.vy += (dy / dist) * force * 0.5;
        }

        // Friction & drift
        s.vx *= 0.98;
        s.vy *= 0.98;
        
        // Base drift
        s.vx += (Math.random() - 0.5) * 0.05;
        s.vy += (Math.random() - 0.5) * 0.05;

        // Bounds bounce
        if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.vy *= -1;

        drawShape(s);
      });

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}

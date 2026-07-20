/**
 * S6N6FG6D Production Homepage
 * Vanilla JS — GPU-accelerated animations, seamless infinite motion
 * No frameworks. Deploy-ready.
 */

(() => {
  'use strict';

  // ============================================
  // SVG CENTERPIECE — LIVING OCCULT MACHINE
  // ============================================
  const svg = document.getElementById('occult-machine');
  if (!svg) return;

  // Select key groups for independent animation
  const outerGeometry   = svg.getElementById('outer-geometry');
  const structuralRings = svg.getElementById('structural-rings');
  const emeraldStructs  = svg.getElementById('emerald-structures');
  const transmission    = svg.getElementById('transmission-array');
  const coreAssembly    = svg.getElementById('core-assembly');
  const innerLattice    = svg.getElementById('inner-lattice');
  const chromaticCyan   = svg.getElementById('chromatic-fringe-cyan');
  const chromaticMagenta= svg.getElementById('chromatic-fringe-magenta');

  // Helper: apply seamless infinite transform animations via CSS
  function animateElement(el, keyframes, duration, options = {}) {
    if (!el) return;
    const anim = el.animate(keyframes, {
      duration,
      iterations: Infinity,
      easing: options.easing || 'ease-in-out',
      direction: options.direction || 'normal',
      fill: 'both'
    });
    // Prevent animation from ever visibly resetting
    anim.onfinish = () => { /* never restart visibly */ };
    return anim;
  }

  // 1. Whole SVG subtle floating (breathing lift) — 13s independent cycle
  animateElement(svg, [
    { transform: 'translateY(0px) scale(1)' },
    { transform: 'translateY(-7.5px) scale(1.003)' },
    { transform: 'translateY(0px) scale(1)' }
  ], 13000, { easing: 'ease-in-out' });

  // 2. Outer decorative geometry — extremely slow counter-rotation
  if (outerGeometry) {
    animateElement(outerGeometry, [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(-360deg)' }
    ], 184000, { easing: 'linear' });
  }

  // 3. Structural rings — slow independent rotation (47s cycle)
  if (structuralRings) {
    animateElement(structuralRings, [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ], 47000, { easing: 'linear' });
  }

  // 4. Emerald internal structures — gentle opposite drift
  if (emeraldStructs) {
    animateElement(emeraldStructs, [
      { transform: 'rotate(0deg) scale(1)' },
      { transform: 'rotate(-360deg) scale(1.015)' },
      { transform: 'rotate(0deg) scale(1)' }
    ], 97000, { easing: 'ease-in-out' });
  }

  // 5. Transmission array (conduits + nodes) — slow breathing + micro rotation
  if (transmission) {
    animateElement(transmission, [
      { transform: 'rotate(0deg) scale(1)' },
      { transform: 'rotate(1.8deg) scale(1.008)' },
      { transform: 'rotate(0deg) scale(1)' }
    ], 68000, { easing: 'ease-in-out' });
  }

  // 6. Core assembly — primary breathing pulse (heart of the machine) — 11s
  if (coreAssembly) {
    animateElement(coreAssembly, [
      { transform: 'scale(1)' },
      { transform: 'scale(1.032)' },
      { transform: 'scale(1)' }
    ], 11000, { easing: 'ease-in-out' });
  }

  // 7. Inner lattice — very slow micro rotation for depth
  if (innerLattice) {
    animateElement(innerLattice, [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ], 215000, { easing: 'linear' });
  }

  // 8. Chromatic fringe layers — independent micro-float for premium aberration feel
  if (chromaticCyan) {
    animateElement(chromaticCyan, [
      { transform: 'translate(1.2px, -0.8px)' },
      { transform: 'translate(-0.6px, 1.1px)' },
      { transform: 'translate(1.2px, -0.8px)' }
    ], 31000, { easing: 'ease-in-out' });
  }

  if (chromaticMagenta) {
    animateElement(chromaticMagenta, [
      { transform: 'translate(-1.1px, 0.9px)' },
      { transform: 'translate(0.7px, -1.3px)' },
      { transform: 'translate(-1.1px, 0.9px)' }
    ], 27000, { easing: 'ease-in-out' });
  }

  // Subtle continuous energy flow on conduits (dash animation via stroke-dashoffset)
  const conduits = svg.getElementById('conduits');
  if (conduits) {
    // Add dash pattern dynamically for flow effect
    const paths = conduits.querySelectorAll('path');
    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length * 0.22} ${length * 0.78}`;
      path.style.strokeDashoffset = '0';

      // Different phase per conduit for organic feel
      const phase = i * 180;
      animateElement(path, [
        { strokeDashoffset: `${phase}` },
        { strokeDashoffset: `${phase - length * 1.6}` }
      ], 18500 + (i * 420), { easing: 'linear' });
    });
  }

  // ============================================
  // FLOATING DUST / PARTICLES
  // ============================================
  const particleCanvas = document.getElementById('particles');
  const ctx = particleCanvas.getContext('2d', { alpha: true });
  let particles = [];
  let mouseX = 0, mouseY = 0;
  let mouseActive = false;

  function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();

  // Create elegant, sparse dust
  function createParticles(count = 68) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.18 - 0.04, // slight upward drift
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.55 + 0.25,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.018 + Math.random() * 0.014
      });
    }
  }
  createParticles();

  // Very gentle mouse influence (premium interactive dust)
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouseActive = false;
  });

  function drawParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    const w = particleCanvas.width;
    const h = particleCanvas.height;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Gentle mouse repulsion / attraction (very subtle)
      if (mouseActive) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 220) {
          const force = (220 - dist) / 220 * 0.018;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }
      }

      // Soft wrap around edges (infinite space feel)
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // Very slow velocity damping for organic drift
      p.vx *= 0.995;
      p.vy *= 0.994;

      // Twinkle
      p.twinkle += p.twinkleSpeed;
      const twinkleAlpha = p.alpha * (0.65 + Math.sin(p.twinkle) * 0.35);

      // Draw
      ctx.save();
      ctx.globalAlpha = twinkleAlpha;
      ctx.fillStyle = '#E6D6B0';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Tiny bright core on some particles
      if (p.size > 1.6) {
        ctx.globalAlpha = twinkleAlpha * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(drawParticles);
  }

  // Start particle system
  drawParticles();

  // Occasional gentle velocity injection so dust never feels static
  setInterval(() => {
    for (let i = 0; i < particles.length; i++) {
      if (Math.random() < 0.18) {
        particles[i].vx += (Math.random() - 0.5) * 0.035;
        particles[i].vy += (Math.random() - 0.5) * 0.028;
      }
    }
  }, 4200);

  // ============================================
  // ENHANCED GRAIN (subtle extra movement)
  // ============================================
  const grain = document.getElementById('grain');
  if (grain) {
    // Random micro shifts to grain for more analog life
    setInterval(() => {
      const x = (Math.random() - 0.5) * 1.8;
      const y = (Math.random() - 0.5) * 1.8;
      grain.style.backgroundPosition = `${x}px ${y}px`;
    }, 1650);
  }

  // ============================================
  // CARD HOVER — EXTRA PREMIUM CHROMATIC + GLOW
  // ============================================
  const cards = document.querySelectorAll('.nav-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Intensify the internal glow slightly on hover
      const glow = card.querySelector('.card-glow');
      if (glow) glow.style.transitionDuration = '220ms';
    });

    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.card-glow');
      if (glow) glow.style.transitionDuration = '380ms';
    });
  });

  // ============================================
  // ACCESSIBILITY & PERFORMANCE
  // ============================================
  // Respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    // Disable heavy animations
    if (svg) svg.style.animation = 'none';
    document.querySelectorAll('.rainbow-band').forEach(b => b.style.animation = 'none');
    if (grain) grain.style.animation = 'none';
    document.querySelectorAll('.scanlines').forEach(s => s.style.animation = 'none');
  }

  // Pause heavy animations when tab is hidden (battery/performance)
  document.addEventListener('visibilitychange', () => {
    const paused = document.hidden;
    if (svg) svg.style.animationPlayState = paused ? 'paused' : 'running';
    document.querySelectorAll('.rainbow-band').forEach(b => {
      b.style.animationPlayState = paused ? 'paused' : 'running';
    });
  });

  // Keyboard accessibility for cards
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const dest = card.dataset.destination;
        // Future: window.location = `/${dest}` or modal
        console.log(`[S6N6FG6D] Navigating to: ${dest}`);
      }
    });
  });

  // Boot log (silent in production)
  console.log('%c[S6N6FG6D] Production homepage initialized — seamless analog transmission active.', 'color:#3a3a3a;font-size:9px');
})();
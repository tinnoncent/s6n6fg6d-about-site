/**
 * s6n6fg6d Landing — Production Script
 * Minimal vanilla JS. Cinematic interactions only.
 * No frameworks. No libraries.
 */

(() => {
  'use strict';

  // DOM Ready
  const ready = (fn) => {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };

  ready(() => {
    const body = document.body;
    const sigil = document.getElementById('sigil');
    const wordmark = document.getElementById('wordmark');
    const grainCanvas = document.getElementById('grain-canvas');
    const portals = document.querySelectorAll('.portal');

    // ============================================
    // 1. ENTRANCE ANIMATION
    // ============================================
    const triggerEntrance = () => {
      body.classList.add('loaded');

      // Stagger portal entrance
      portals.forEach((portal, index) => {
        portal.style.opacity = '0';
        portal.style.transform = 'translateY(18px)';
        portal.style.transition = 'none';

        setTimeout(() => {
          portal.style.transition = 'opacity 680ms var(--ease-premium), transform 680ms var(--ease-premium)';
          portal.style.opacity = '1';
          portal.style.transform = 'translateY(0)';
        }, 420 + (index * 95));
      });
    };

    // ============================================
    // 2. CRT GRAIN CANVAS (Subtle Animated)
    // ============================================
    const initGrain = () => {
      if (!grainCanvas) return;

      const ctx = grainCanvas.getContext('2d', { alpha: true });
      let width = 0;
      let height = 0;
      let frame = 0;

      const resize = () => {
        width = grainCanvas.width = window.innerWidth;
        height = grainCanvas.height = window.innerHeight;
      };

      const drawGrain = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#E6D6B0';

        const density = 0.032; // Very subtle
        const pixelCount = Math.floor((width * height) * density);

        for (let i = 0; i < pixelCount; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const alpha = Math.random() * 0.55 + 0.12;
          const size = Math.random() > 0.92 ? 1.6 : 1;

          ctx.globalAlpha = alpha;
          ctx.fillRect(x, y, size, size);
        }

        ctx.globalAlpha = 1;
      };

      const animateGrain = () => {
        // Redraw at low frequency for performance & analog feel
        if (frame % 7 === 0) {
          drawGrain();
        }
        frame++;
        requestAnimationFrame(animateGrain);
      };

      window.addEventListener('resize', () => {
        resize();
        drawGrain();
      }, { passive: true });

      resize();
      drawGrain();
      animateGrain();
    };

    // ============================================
    // 3. WORDMARK RGB GLITCH (Periodic)
    // ============================================
    const initWordmarkGlitch = () => {
      if (!wordmark) return;

      const triggerGlitch = () => {
        if (!wordmark.classList.contains('glitching')) {
          wordmark.classList.add('glitching');
          setTimeout(() => {
            wordmark.classList.remove('glitching');
          }, 260);
        }
      };

      // First glitch after load
      setTimeout(triggerGlitch, 1850);

      // Recurring every 23-38 seconds
      const scheduleNext = () => {
        const delay = 23000 + Math.random() * 15000;
        setTimeout(() => {
          triggerGlitch();
          scheduleNext();
        }, delay);
      };

      scheduleNext();
    };

    // ============================================
    // 4. SIGIL ELECTRICAL FLICKERS
    // ============================================
    const initSigilFlickers = () => {
      if (!sigil) return;

      const coreGroup = sigil.querySelector('#core-group');
      if (!coreGroup) return;

      const flickerElements = coreGroup.querySelectorAll('line, path, circle');

      const doFlicker = () => {
        if (flickerElements.length === 0) return;

        // Pick 1-2 random elements
        const count = Math.random() > 0.6 ? 2 : 1;
        const picked = [];

        for (let i = 0; i < count; i++) {
          const el = flickerElements[Math.floor(Math.random() * flickerElements.length)];
          if (!picked.includes(el)) {
            picked.push(el);
            const originalOpacity = el.getAttribute('opacity') || '1';

            el.style.transition = 'opacity 70ms linear';
            el.setAttribute('opacity', '0.18');

            setTimeout(() => {
              el.setAttribute('opacity', originalOpacity);
              setTimeout(() => {
                el.style.transition = '';
              }, 80);
            }, 95 + Math.random() * 55);
          }
        }
      };

      // Occasional flickers
      const scheduleFlicker = () => {
        const delay = 1250 + Math.random() * 2400;
        setTimeout(() => {
          doFlicker();
          scheduleFlicker();
        }, delay);
      };

      // Start after entrance
      setTimeout(scheduleFlicker, 2400);
    };

    // ============================================
    // 5. PORTAL HOVER ENHANCEMENTS (Extra Polish)
    // ============================================
    const initPortalInteractions = () => {
      portals.forEach((portal) => {
        // Subtle number pulse on hover
        const number = portal.querySelector('.portal-number');
        if (number) {
          portal.addEventListener('mouseenter', () => {
            number.style.transitionDuration = '180ms';
            number.style.transform = 'translateY(-1px)';
          });
          portal.addEventListener('mouseleave', () => {
            number.style.transform = 'translateY(0)';
          });
        }

        // Keyboard accessibility hint
        portal.setAttribute('tabindex', '0');
      });
    };

    // ============================================
    // 6. SUBTLE ANALOG INSTABILITY (Hero Drift)
    // ============================================
    const initAnalogDrift = () => {
      const heroInner = document.querySelector('.hero-inner');
      if (!heroInner) return;

      let driftFrame = 0;

      const applyDrift = () => {
        driftFrame++;
        // Very rare, very subtle drift every ~18 seconds
        if (driftFrame % 1100 === 0) {
          const x = (Math.random() - 0.5) * 0.9;
          const y = (Math.random() - 0.5) * 0.6;
          heroInner.style.transition = 'transform 4200ms var(--ease-premium)';
          heroInner.style.transform = `translate(${x}px, ${y}px)`;

          setTimeout(() => {
            heroInner.style.transform = 'translate(0, 0)';
            setTimeout(() => {
              heroInner.style.transition = '';
            }, 4200);
          }, 4200);
        }
        requestAnimationFrame(applyDrift);
      };

      applyDrift();
    };

    // ============================================
    // INITIALIZE EVERYTHING
    // ============================================
    const init = () => {
      initGrain();
      initWordmarkGlitch();
      initSigilFlickers();
      initPortalInteractions();
      initAnalogDrift();

      // Trigger entrance after fonts & paint settle
      setTimeout(triggerEntrance, 120);
    };

    init();
  });
})();
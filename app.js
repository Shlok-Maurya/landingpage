
/* ============================================
   ExamForge AI — Main Application Script
   Dark theme + Scrollytelling animation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // 1. REGISTER GSAP PLUGINS
  // ========================================
  gsap.registerPlugin(ScrollTrigger);

  // ========================================
  // 2. LENIS SMOOTH SCROLL
  // ========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // ========================================
  // 3. HERO ENTRANCE ANIMATION
  // ========================================
  const heroTimeline = gsap.timeline({
    defaults: { ease: 'power4.out' },
    delay: 0.3,
  });

  heroTimeline
    .to('#hero-glow', { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }, 0)
    .to('.hero-line:nth-child(1) .hero-text', { y: 0, duration: 1 }, 0.2)
    .to('.hero-line:nth-child(2) .hero-text', { y: 0, duration: 1.1 }, 0.35)
    .to('.hero-line:nth-child(3) .hero-text', { y: 0, duration: 1.1 }, 0.5)
    .to('.hero-line:nth-child(4) .hero-text', { y: 0, duration: 1.1 }, 0.65)
    .to('.hero-line:nth-child(5) .hero-text', { y: 0, duration: 1, ease: 'power3.out' }, 0.8)
    .to('.hero-line:nth-child(6) .hero-text', { y: 0, duration: 1, ease: 'power3.out' }, 0.8);

  // ========================================
  // 4. SCROLLYTELLING ANIMATION
  // ========================================
  const scrollyPin = document.querySelector('#scrolly-pin');
  const statusEl = document.querySelector('#scrolly-status');
  const progressEl = document.querySelector('#scrolly-progress');
  const bars = document.querySelectorAll('.scrolly-bar');

  if (scrollyPin) {
    const statusMessages = [
      'UPLOAD YOUR TEXTBOOK...',
      'SCANNING PAGE 1 OF 3...',
      'SCANNING PAGE 2 OF 3...',
      'SCANNING PAGE 3 OF 3...',
      'GENERATING QUESTION PAPERS...',
      '3 QUESTION PAPERS READY'
    ];

    let currentStatus = '';
    const thumb1 = document.querySelector('#thumb-1');
    const thumb2 = document.querySelector('#thumb-2');
    const thumb3 = document.querySelector('#thumb-3');

    function updateStatus(msg, activeBars) {
      if (msg === currentStatus) return;
      currentStatus = msg;
      if (statusEl) statusEl.textContent = msg;
      bars.forEach((bar, i) => {
        if (i < activeBars) {
          bar.classList.add('active');
        } else {
          bar.classList.remove('active');
        }
      });
    }

    function setThumbState(phase) {
      // Phase 1: thumb-1 active
      // Phase 2: thumb-1 done, thumb-2 active
      // Phase 3: thumb-1 done, thumb-2 done, thumb-3 active
      // Phase 4+: all done
      [thumb1, thumb2, thumb3].forEach(t => { if(t) { t.classList.remove('active', 'done'); } });
      if (phase >= 1 && thumb1) { thumb1.classList.add(phase === 1 ? 'active' : 'done'); }
      if (phase >= 2 && thumb2) { thumb2.classList.add(phase === 2 ? 'active' : 'done'); }
      if (phase >= 3 && thumb3) { thumb3.classList.add(phase >= 3 ? (phase === 3 ? 'active' : 'done') : ''); }
    }

    const scrollyTL = gsap.timeline({
      scrollTrigger: {
        trigger: scrollyPin,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (progressEl) progressEl.style.width = (p * 100) + '%';

          if (p < 0.05) { updateStatus(statusMessages[0], 0); setThumbState(0); }
          else if (p < 0.20) { updateStatus(statusMessages[1], 1); setThumbState(1); }
          else if (p < 0.40) { updateStatus(statusMessages[2], 2); setThumbState(2); }
          else if (p < 0.60) { updateStatus(statusMessages[3], 3); setThumbState(3); }
          else if (p < 0.82) { updateStatus(statusMessages[4], 4); setThumbState(4); }
          else { updateStatus(statusMessages[5], 5); setThumbState(4); }
        }
      }
    });

    // ---- PAGE 1: Data Structures (0 - 20) ----
    scrollyTL.to('#scrolly-page1', {
      opacity: 1, duration: 5, ease: 'power2.out',
      yPercent: -50,
      onStart: () => { gsap.set('#scrolly-page1', { transform: 'translate(-50%, -50%)' }); }
    }, 0);
    scrollyTL.to('#scrolly-scanline', { opacity: 1, duration: 1 }, 5);
    scrollyTL.fromTo('#scrolly-scanline', { top: '22%' }, { top: '75%', duration: 8, ease: 'none' }, 6);
    scrollyTL.to('#scrolly-scanline', { opacity: 0, duration: 1 }, 14);
    scrollyTL.to('#scrolly-thumbs', { opacity: 1, x: 0, duration: 4, ease: 'power2.out' }, 8);
    scrollyTL.to('#scrolly-page1', { opacity: 0, y: -40, duration: 4, ease: 'power2.in' }, 16);

    // ---- PAGE 2: Operating Systems (20 - 40) ----
    scrollyTL.to('#scrolly-page2', {
      opacity: 1, duration: 5, ease: 'power2.out',
      yPercent: -50,
      onStart: () => { gsap.set('#scrolly-page2', { transform: 'translate(-50%, -50%)' }); }
    }, 20);
    scrollyTL.to('#scrolly-scanline', { opacity: 1, duration: 1 }, 25);
    scrollyTL.fromTo('#scrolly-scanline', { top: '22%' }, { top: '75%', duration: 8, ease: 'none' }, 26);
    scrollyTL.to('#scrolly-scanline', { opacity: 0, duration: 1 }, 34);
    scrollyTL.to('#scrolly-page2', { opacity: 0, y: -40, duration: 4, ease: 'power2.in' }, 36);

    // ---- PAGE 3: Computer Networks (40 - 60) ----
    scrollyTL.to('#scrolly-page3', {
      opacity: 1, duration: 5, ease: 'power2.out',
      yPercent: -50,
      onStart: () => { gsap.set('#scrolly-page3', { transform: 'translate(-50%, -50%)' }); }
    }, 40);
    scrollyTL.to('#scrolly-scanline', { opacity: 1, duration: 1 }, 45);
    scrollyTL.fromTo('#scrolly-scanline', { top: '22%' }, { top: '75%', duration: 8, ease: 'none' }, 46);
    scrollyTL.to('#scrolly-scanline', { opacity: 0, duration: 1 }, 54);
    scrollyTL.to('#scrolly-page3', { opacity: 0, scale: 0.9, duration: 5, ease: 'power2.in' }, 56);
    scrollyTL.to('#scrolly-thumbs', { opacity: 0, duration: 3, ease: 'power2.in' }, 56);

    // ---- 3 QUESTION PAPERS SIDE BY SIDE (60 - 82) ----
    // Left paper (QP2 - OS) tilted left
    scrollyTL.to('#scrolly-qp2', {
      opacity: 1, scale: 0.8,
      xPercent: -50, yPercent: -50,
      x: -150, y: -20, rotation: -6,
      duration: 8, ease: 'power3.out'
    }, 62);
    // Center paper (QP1 - DS) straight
    scrollyTL.to('#scrolly-qp1', {
      opacity: 1, scale: 0.8,
      xPercent: -50, yPercent: -50,
      x: 0, y: 0, rotation: 0,
      duration: 8, ease: 'power3.out'
    }, 65);
    // Right paper (QP3 - CN) tilted right
    scrollyTL.to('#scrolly-qp3', {
      opacity: 1, scale: 0.8,
      xPercent: -50, yPercent: -50,
      x: 150, y: -20, rotation: 6,
      duration: 8, ease: 'power3.out'
    }, 68);

    // ---- COMPLETION (82 - 100) ----
    // Fade all 3 papers
    scrollyTL.to('#scrolly-qp1', { opacity: 0, y: -30, duration: 5, ease: 'power2.in' }, 82);
    scrollyTL.to('#scrolly-qp2', { opacity: 0, y: -30, duration: 5, ease: 'power2.in' }, 82);
    scrollyTL.to('#scrolly-qp3', { opacity: 0, y: -30, duration: 5, ease: 'power2.in' }, 82);
    // Checkmark
    scrollyTL.to('#scrolly-complete', {
      opacity: 1, scale: 1,
      duration: 10, ease: 'back.out(1.7)'
    }, 85);
    scrollyTL.to('#scrolly-complete', {
      opacity: 0, duration: 5, ease: 'power2.in'
    }, 95);

    // Set initial state for thumbs
    gsap.set('#scrolly-thumbs', { x: -30 });
  }

  // ========================================
  // 5. SCROLL-TRIGGERED REVEALS
  // ========================================
  const stepElements = document.querySelectorAll('.step-reveal');

  stepElements.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 80, rotateX: 8 });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        end: 'top 60%',
        toggleActions: 'play none none none',
      },
    });
  });

  // ========================================
  // 6. HORIZONTAL SCROLL SECTION
  // ========================================
  const horizontalSection = document.querySelector('#horizontal-section');
  const horizontalTrack = document.querySelector('#horizontal-track');

  if (horizontalSection && horizontalTrack) {
    const getScrollDistance = () => horizontalTrack.scrollWidth - window.innerWidth;

    const horizontalTween = gsap.to(horizontalTrack, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    const formatCards = document.querySelectorAll('.format-card');
    formatCards.forEach((card) => {
      gsap.from(card, {
        opacity: 0.3,
        scale: 0.95,
        duration: 0.5,
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontalTween,
          start: 'left 80%',
          end: 'left 50%',
          scrub: true,
        },
      });
    });
  }

  // ========================================
  // 7. PARALLAX FLOATING ELEMENTS
  // ========================================
  const parallaxElements = document.querySelectorAll('.parallax-el');

  parallaxElements.forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;

    gsap.to(el, {
      y: () => -ScrollTrigger.maxScroll(window) * speed * 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
  });

  // ========================================
  // 8. NAVBAR SCROLL STATE
  // ========================================
  const navbar = document.querySelector('#navbar');

  ScrollTrigger.create({
    trigger: document.body,
    start: '80px top',
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  });

  // ========================================
  // 9. SCROLL INDICATOR FADE OUT
  // ========================================
  gsap.to('#scroll-indicator', {
    opacity: 0,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '+=200',
      scrub: true,
    },
  });

  // ========================================
  // 10. FEATURE CARDS STAGGER
  // ========================================
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length > 0) {
    ScrollTrigger.batch(featureCards, {
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: 60,
          rotateX: 5,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
      start: 'top 85%',
      once: true,
    });
  }

  // ========================================
  // 11. SMOOTH ANCHOR SCROLLING
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        lenis.scrollTo(target, { offset: -80, duration: 1.5 });
      }
    });
  });

  // ========================================
  // 12. MOBILE MENU TOGGLE
  // ========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ========================================
  // CLEANUP
  // ========================================
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

});

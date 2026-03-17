/* ============================================================
   MAXLAMM.DE — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile project nav auto-hide --- */
  const floatNavs = document.querySelectorAll('.project-float-nav');
  if (floatNavs.length && window.innerWidth <= 768) {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      floatNavs.forEach(el => el.classList.toggle('nav-hidden', currentY > lastY && currentY > 80));
      lastY = currentY;
    }, { passive: true });
  }

  /* --- Sticky Nav scroll state --- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
      const threshold = hero ? hero.offsetHeight - nav.offsetHeight - 40 : 80;
      nav.classList.toggle('scrolled', window.scrollY > threshold);
    }, { passive: true });
  }

  /* --- Scroll to top --- */
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Lightbox for gallery images --- */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox__close');

  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.dataset.full || img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* --- Video poster click-to-play --- */
  document.querySelectorAll('.video-poster').forEach(poster => {
    poster.addEventListener('click', () => {
      const src = poster.dataset.src || '';
      const service = src.includes('vimeo') ? 'vimeo' : 'youtube';

      const manager = window.klaro?.getManager?.();
      if (manager && !manager.getConsent(service)) {
        window.klaro.show();
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.allow = 'autoplay; fullscreen';
      iframe.allowFullscreen = true;
      iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;';
      poster.replaceWith(iframe);
    });
  });

  /* --- Contact Form (sends to email handler or Formspree) --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = 'Sende...';
      btn.disabled = true;

      const data = new FormData(form);

      try {
        // Option 1: Use your own email handler endpoint
        // Option 2: Use Formspree or similar
        const resp = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (resp.ok) {
          btn.textContent = '✓ Gesendet!';
          form.reset();
          setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 3000);
        } else {
          throw new Error('Send failed');
        }
      } catch (err) {
        btn.textContent = 'Fehler – bitte erneut versuchen';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = originalText; }, 3000);
      }
    });
  }

  /* --- Projects section fade-in on scroll --- */
  const projectsSection = document.querySelector('.projects-section');
  if (projectsSection) {
    const onGridScroll = () => {
      if (window.scrollY > 80) {
        projectsSection.classList.add('section-visible');
        window.removeEventListener('scroll', onGridScroll);
      }
    };
    window.addEventListener('scroll', onGridScroll, { passive: true });
  }

  /* --- Hero video fade-out on scroll --- */
  const heroVideo = document.querySelector('.hero__video');
  const heroEl = document.querySelector('.hero');
  if (heroVideo && heroEl) {
    window.addEventListener('scroll', () => {
      const heroH = heroEl.offsetHeight;
      const scrolled = window.scrollY;
      const fadeStart = heroH * 0.5;
      const fadeEnd = heroH * 0.8;
      if (scrolled <= fadeStart) {
        heroVideo.style.opacity = 1;
      } else if (scrolled >= fadeEnd) {
        heroVideo.style.opacity = 0;
      } else {
        heroVideo.style.opacity = 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart);
      }
    }, { passive: true });
  }

  /* --- Project category filter --- */
  const filterBtns = document.querySelectorAll('.filter-badge');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          if (!b.classList.contains('badge--outline')) {
            b.classList.add('badge--outline');
          }
        });
        btn.classList.add('active');
        btn.classList.remove('badge--outline');
        const cat = btn.dataset.cat;
        const cards = document.querySelectorAll('#projects-grid .project-card');

        /* FIRST — record current positions */
        const firstRects = new Map();
        cards.forEach(c => firstRects.set(c, c.getBoundingClientRect()));

        /* fade-out + zoom-out cards to hide */
        const toHide = [];
        cards.forEach(card => {
          const cats = card.dataset.cats ? card.dataset.cats.split(',') : [];
          if (cat !== 'all' && !cats.includes(cat)) {
            card.classList.add('card-hidden');
            toHide.push(card);
          }
        });

        /* after fade-out: reflow grid, then FLIP visible cards */
        setTimeout(() => {
          /* toggle display */
          toHide.forEach(c => c.style.display = 'none');
          cards.forEach(card => {
            const cats = card.dataset.cats ? card.dataset.cats.split(',') : [];
            const show = cat === 'all' || cats.includes(cat);
            if (show) {
              card.style.display = '';
              card.classList.remove('card-hidden');
            }
          });

          /* LAST — record new positions & INVERT */
          cards.forEach(card => {
            if (card.style.display === 'none') return;
            const first = firstRects.get(card);
            const last = card.getBoundingClientRect();
            const dx = first.left - last.left;
            const dy = first.top - last.top;
            if (dx === 0 && dy === 0) return;
            card.style.transform = `translate(${dx}px, ${dy}px)`;
            card.style.transition = 'none';
          });

          /* PLAY — animate to final position */
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              cards.forEach(card => {
                if (card.style.display === 'none') return;
                card.style.transform = '';
                card.style.transition = 'transform .35s ease, opacity .25s ease';
              });
              /* clean up inline styles after animation */
              setTimeout(() => {
                cards.forEach(card => {
                  card.style.transition = '';
                  card.style.transform = '';
                });
              }, 400);
            });
          });
        }, 250);
      });
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

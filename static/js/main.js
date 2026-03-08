/* ============================================================
   MAXLAMM.DE — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky Nav scroll state --- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
      const threshold = hero ? hero.offsetHeight : 80;
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
        lightboxImg.src = img.src;
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
      const iframe = document.createElement('iframe');
      iframe.src = poster.dataset.src;
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
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        document.querySelectorAll('#projects-grid .project-card').forEach(card => {
          const cats = card.dataset.cats ? card.dataset.cats.split(',') : [];
          card.style.display = (cat === 'all' || cats.includes(cat)) ? '' : 'none';
        });
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

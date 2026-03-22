/* ============================================================
   MAXLAMM.DE — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Hamburger menu (mobile dropdown card) --- */
  const burger = document.querySelector('.site-nav__burger');
  const dropdown = document.querySelector('.site-nav__dropdown');
  if (burger && dropdown) {
    burger.addEventListener('click', () => {
      const open = dropdown.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    // Close on link click
    dropdown.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        dropdown.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
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
  const lightboxPrev = lightbox?.querySelector('.lightbox__prev');
  const lightboxNext = lightbox?.querySelector('.lightbox__next');

  let galleryImages = [];
  let currentIndex = 0;

  function updateLightbox(index) {
    currentIndex = index;
    const img = galleryImages[index];
    lightboxImg.src = img.dataset.full || img.src;
    lightboxImg.alt = img.alt || '';
    // Hide arrows at boundaries
    lightboxPrev?.classList.toggle('hidden', index === 0);
    lightboxNext?.classList.toggle('hidden', index === galleryImages.length - 1);
    // Preload adjacent images
    if (index > 0) { new Image().src = galleryImages[index - 1].dataset.full || galleryImages[index - 1].src; }
    if (index < galleryImages.length - 1) { new Image().src = galleryImages[index + 1].dataset.full || galleryImages[index + 1].src; }
  }

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    updateLightbox(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Bind gallery images
  galleryImages = [...document.querySelectorAll('.gallery-grid img')];
  galleryImages.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
  });

  // Close handlers
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || lightboxClose?.contains(e.target)) closeLightbox();
  });

  // Prev/next button clicks
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex > 0) updateLightbox(currentIndex - 1);
  });
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex < galleryImages.length - 1) updateLightbox(currentIndex + 1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && currentIndex > 0) updateLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) updateLightbox(currentIndex + 1);
  });

  // Mobile swipe on lightbox
  if (lightbox) {
    let lbStartX = 0, lbDeltaX = 0;
    lightboxImg?.addEventListener('touchstart', (e) => {
      lbStartX = e.touches[0].clientX;
      lbDeltaX = 0;
    }, { passive: true });
    lightboxImg?.addEventListener('touchmove', (e) => {
      lbDeltaX = e.touches[0].clientX - lbStartX;
    }, { passive: true });
    lightboxImg?.addEventListener('touchend', () => {
      const SWIPE_THRESHOLD = 50;
      if (lbDeltaX > SWIPE_THRESHOLD && currentIndex > 0) {
        updateLightbox(currentIndex - 1);
      } else if (lbDeltaX < -SWIPE_THRESHOLD && currentIndex < galleryImages.length - 1) {
        updateLightbox(currentIndex + 1);
      }
    }, { passive: true });
  }

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

  /* --- Contact Form --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    const lang = document.documentElement.lang || 'de';
    const i18n = {
      de: { sending: 'Sende...', sent: '\u2713 Gesendet!', error: 'Fehler \u2013 bitte erneut versuchen' },
      en: { sending: 'Sending...', sent: '\u2713 Sent!', error: 'Error \u2013 please try again' }
    };
    const t = i18n[lang] || i18n.de;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const formGroups = form.querySelectorAll('.form-group');
      const originalText = btn.textContent;

      // Sending state
      btn.textContent = t.sending;
      btn.disabled = true;
      btn.classList.add('btn--sending');

      const data = new FormData(form);

      try {
        const resp = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (resp.ok) {
          // Success state
          btn.classList.remove('btn--sending');
          btn.classList.add('btn--success');
          btn.textContent = t.sent;

          // Fade out form groups
          formGroups.forEach(g => g.classList.add('fade-out'));

          // After delay: slide button away, then reset everything
          setTimeout(() => {
            btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(10px)';

            setTimeout(() => {
              // Reset form and classes
              btn.classList.remove('btn--success');
              btn.textContent = originalText;
              btn.disabled = false;
              btn.style.opacity = '';
              btn.style.transform = '';
              btn.style.transition = '';
              form.reset();

              // Fade form groups back in
              formGroups.forEach(g => {
                g.classList.remove('fade-out');
                g.classList.add('fade-in');
              });
              setTimeout(() => formGroups.forEach(g => g.classList.remove('fade-in')), 300);
            }, 300);
          }, 2500);
        } else {
          throw new Error('Send failed');
        }
      } catch (err) {
        // Error state
        btn.classList.remove('btn--sending');
        btn.classList.add('btn--error');
        btn.textContent = t.error;
        btn.disabled = false;
        setTimeout(() => {
          btn.classList.remove('btn--error');
          btn.textContent = originalText;
        }, 3000);
      }
    });
  }

  /* --- Projects section fade-in on scroll --- */
  const projectsSection = document.querySelector('.projects-section');
  if (projectsSection) {
    const onGridScroll = () => {
      if (window.scrollY > 222) {
        projectsSection.classList.add('section-visible');
        window.removeEventListener('scroll', onGridScroll);
      }
    };
    window.addEventListener('scroll', onGridScroll, { passive: true });
  }

  /* --- Hero video / background fade-out on scroll --- */
  const heroVideo = document.querySelector('.hero__video');
  const heroBg = document.querySelector('.hero__bg');
  const heroEl = document.querySelector('.hero');
  const homeFilter = document.querySelector('.home-filter');
  if ((heroVideo || heroBg) && heroEl) {
    window.addEventListener('scroll', () => {
      const heroH = heroEl.offsetHeight;
      const scrolled = window.scrollY;
      const fadeStart = heroH * 0.5;
      const fadeEnd = heroH * 0.8;
      let opacity;
      if (scrolled <= fadeStart) {
        opacity = 1;
      } else if (scrolled >= fadeEnd) {
        opacity = 0;
      } else {
        opacity = 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart);
      }
      if (heroVideo) heroVideo.style.opacity = opacity;
      if (heroBg) heroBg.style.opacity = opacity;
      if (homeFilter) homeFilter.style.opacity = 1 - opacity;
    }, { passive: true });
  }

  /* --- Reusable FLIP category filter --- */
  function initCategoryFilter(filterBtns, gridSelector) {
    if (!filterBtns.length) return;

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
        const cards = document.querySelectorAll(`${gridSelector} .project-card`);

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

  /* --- /work/ page filter with URL persistence --- */
  const workFilterBtns = document.querySelectorAll('.filter-badge');
  initCategoryFilter(workFilterBtns, '#projects-grid');

  if (workFilterBtns.length) {
    // Add URL persistence on click
    workFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        const url = cat === 'all'
          ? window.location.pathname
          : `${window.location.pathname}?cat=${cat}`;
        history.replaceState(null, '', url);
      });
    });

    // Auto-activate filter from URL param
    const urlCat = new URLSearchParams(window.location.search).get('cat');
    if (urlCat) {
      const target = [...workFilterBtns].find(b => b.dataset.cat === urlCat);
      if (target) target.click();
    }
  }

  /* --- Homepage filter (keeps grid at 6 mobile / 9 desktop, fills from reserve) --- */
  function getHomeLimit() {
    return window.innerWidth <= 768 ? 6 : 9;
  }

  function initHomeCategoryFilter(filterBtns, gridSelector) {
    if (!filterBtns.length) return;
    const grid = document.querySelector(gridSelector);
    if (!grid) return;

    function showFiltered(cat) {
      const limit = getHomeLimit();
      const all = [...grid.querySelectorAll('.project-card')];
      const primary = all.filter(c => !c.dataset.reserve);
      const reserve = all.filter(c => c.dataset.reserve);

      let pool;
      if (cat === 'all') {
        pool = primary.slice(0, limit);
      } else {
        const match = c => (c.dataset.cats || '').split(',').includes(cat);
        pool = [...primary.filter(match), ...reserve.filter(match)].slice(0, limit);
      }
      const poolSet = new Set(pool);

      // FIRST — record positions of currently visible cards
      const firstRects = new Map();
      all.forEach(c => {
        if (c.style.display !== 'none') firstRects.set(c, c.getBoundingClientRect());
      });

      // Fade out departing cards
      const toHide = all.filter(c => !poolSet.has(c) && c.style.display !== 'none');
      toHide.forEach(c => c.classList.add('card-hidden'));

      setTimeout(() => {
        all.forEach(c => {
          if (poolSet.has(c)) {
            c.style.display = '';
            c.classList.remove('card-hidden');
          } else {
            c.style.display = 'none';
          }
        });

        // FLIP animate cards that were already visible
        pool.forEach(card => {
          const first = firstRects.get(card);
          if (!first) return; // newly surfaced reserve card — just appear
          const last = card.getBoundingClientRect();
          const dx = first.left - last.left;
          const dy = first.top - last.top;
          if (dx === 0 && dy === 0) return;
          card.style.transform = `translate(${dx}px, ${dy}px)`;
          card.style.transition = 'none';
        });

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            pool.forEach(card => {
              card.style.transform = '';
              card.style.transition = 'transform .35s ease, opacity .25s ease';
            });
            setTimeout(() => {
              pool.forEach(card => {
                card.style.transition = '';
                card.style.transform = '';
              });
            }, 400);
          });
        });
      }, 250);
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.classList.add('badge--outline');
        });
        btn.classList.add('active');
        btn.classList.remove('badge--outline');
        showFiltered(btn.dataset.cat);
      });
    });

    // Apply initial limit on mobile (cards 7-9 hidden)
    if (getHomeLimit() < 9) {
      const primary = [...grid.querySelectorAll('.project-card:not([data-reserve])')];
      primary.slice(getHomeLimit()).forEach(c => c.style.display = 'none');
    }

    // Re-apply filter when crossing the 768px breakpoint on resize
    let prevLimit = getHomeLimit();
    window.addEventListener('resize', () => {
      const newLimit = getHomeLimit();
      if (newLimit !== prevLimit) {
        prevLimit = newLimit;
        const activeBtn = document.querySelector('.home-filter-badge.active');
        if (activeBtn) activeBtn.click();
      }
    });
  }

  const homeFilterBtns = document.querySelectorAll('.home-filter-badge');
  initHomeCategoryFilter(homeFilterBtns, '#home-projects-grid');

  /* --- Language switch: preserve scroll position --- */
  const sectionIds = ['home', 'projects', 'about', 'contact'];
  const isHomepage = sectionIds.every(id => document.getElementById(id));

  if (isHomepage) {
    // Intercept language switch clicks — append current section hash
    document.querySelectorAll('.site-nav__lang a').forEach(link => {
      link.addEventListener('click', () => {
        const scrollY = window.scrollY;
        let closest = sectionIds[0];
        let closestDist = Infinity;
        sectionIds.forEach(id => {
          const el = document.getElementById(id);
          if (!el) return;
          const dist = Math.abs(el.offsetTop - scrollY);
          if (dist < closestDist) { closestDist = dist; closest = id; }
        });
        // Rewrite href with hash before navigation
        const url = new URL(link.href, window.location.origin);
        url.hash = closest;
        link.href = url.toString();
      });
    });

    // On load with section hash — already hidden via inline script on <html>
    const root = document.documentElement;
    const hash = window.location.hash.replace('#', '');
    if (sectionIds.includes(hash) && root.classList.contains('lang-entering')) {
      const target = document.getElementById(hash);
      if (target) {
        // Skip projects fade-in animation — show immediately
        if (projectsSection) projectsSection.classList.add('section-visible');
        // Scroll instantly while hidden
        window.scrollTo(0, target.offsetTop);
        // Fade in
        requestAnimationFrame(() => {
          root.classList.add('lang-ready');
          // Clean up after transition
          root.addEventListener('transitionend', () => {
            root.classList.remove('lang-entering', 'lang-ready');
          }, { once: true });
          // Clean the hash from URL
          history.replaceState(null, '', window.location.pathname + window.location.search);
        });
      }
    }
  }

  /* --- Preview video on hover (desktop only) --- */
  function initPreviewVideos() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.project-card__preview').forEach(video => {
      const card = video.closest('.project-card');

      card.addEventListener('mouseenter', () => {
        if (!video.src) video.src = video.dataset.src;
        video.play().then(() => {
          video.classList.add('is-playing');
        }).catch(() => {});
      });

      card.addEventListener('mouseleave', () => {
        video.classList.remove('is-playing');
        video.pause();
        video.currentTime = 0;
      });
    });
  }

  initPreviewVideos();

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

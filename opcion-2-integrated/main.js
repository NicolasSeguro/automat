(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menú hamburguesa (mobile)
  var header = document.querySelector('.header');
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  // Parallax en hero y CTA (imagen de fondo)
  var parallaxLayers = document.querySelectorAll('[data-parallax]');
  var ticking = false;
  function updateParallax() {
    if (reduceMotion) return;
    var scrollY = window.scrollY || window.pageYOffset;
    parallaxLayers.forEach(function (layer) {
      var section = layer.closest('.hero, .cta-section');
      if (!section) return;
      var rect = section.getBoundingClientRect();
      var center = rect.top + rect.height / 2;
      var vh = window.innerHeight;
      var viewportCenter = vh / 2;
      var move = (center - viewportCenter) * 0.15;
      layer.style.transform = 'translate3d(0, ' + move + 'px, 0)';
    });
    ticking = false;
  }
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  if (parallaxLayers.length && !reduceMotion) {
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    updateParallax();
  }

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      var el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // Reveal al scroll
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.05 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }
})();

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ——— Menú hamburguesa (mobile) ———
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

  // ——— Scroll suave para enlaces # ———
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      var el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // ——— Parallax al scroll (estilo moderno, sobrio); desactivado si prefers-reduced-motion ———
  var heroLayer = document.querySelector('[data-parallax="hero"]');
  var imageLayers = document.querySelectorAll('[data-parallax="image"]');
  var ticking = false;

  function updateParallax() {
    if (reduceMotion) return;
    var scrollY = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;

    if (heroLayer) {
      var heroRect = heroLayer.closest('.hero').getBoundingClientRect();
      if (heroRect.bottom > 0) {
        var offset = scrollY * 0.25;
        heroLayer.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
      }
    }

    imageLayers.forEach(function (wrap) {
      var block = wrap.closest('.service-block');
      if (!block) return;
      var rect = block.getBoundingClientRect();
      var center = rect.top + rect.height / 2;
      var viewportCenter = vh / 2;
      var move = (center - viewportCenter) * 0.08;
      wrap.style.transform = 'translate3d(0, ' + move + 'px, 0)';
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  if (!reduceMotion) {
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    updateParallax();
  }

  // ——— Reveal al scroll (microanimaciones sobrias) ———
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05
      }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ——— Nav activo según la sección visible ———
  var sections = [
    { id: '', name: 'hero' },
    { id: 'quienes-somos', name: 'quienes-somos' },
    { id: 'empresas', name: 'empresas' },
    { id: 'capacidad', name: 'capacidad' },
    { id: 'contacto', name: 'contacto' }
  ];
  var navLinks = document.querySelectorAll('.header .nav a[href^="#"]');

  function setActiveNav() {
    var scrollY = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;
    var hero = document.querySelector('.hero');
    var heroBottom = hero ? hero.offsetHeight : vh;

    var current = 'home';
    if (scrollY < heroBottom * 0.6) {
      current = 'home';
    } else {
      for (var i = sections.length - 1; i >= 1; i--) {
        var sec = document.getElementById(sections[i].id);
        if (sec && sec.getBoundingClientRect().top <= vh * 0.4) {
          current = sections[i].id;
          break;
        }
      }
    }

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      var isHome = href === '#' || href === '';
      if (current === 'home' && isHome) {
        link.classList.add('active');
      } else if (current !== 'home' && href === '#' + current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();
})();

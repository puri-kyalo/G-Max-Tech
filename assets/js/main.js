/**
* G-Max Tech Premium - Fixed Mobile Navigation & UI Logic
*/

(function () {
  "use strict";

  /* =====================================================
     SCROLL: Add .scrolled class to body
  ===================================================== */
  function toggleScrolled() {
    const body = document.querySelector('body');
    const header = document.querySelector('#header');
    if (!header) return;
    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /* =====================================================
     SCROLL PROGRESS BAR
  ===================================================== */
  function updateScrollProgress() {
    const indicator = document.getElementById("scrollIndicator");
    if (indicator) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      indicator.style.width = scrolled + "%";
    }
  }
  document.addEventListener('scroll', updateScrollProgress);

  /* =====================================================
     MOBILE NAV SIDEBAR — FIXED
  ===================================================== */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu');
  const body = document.querySelector('body');

  function openMobileNav() {
    body.classList.add('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.remove('bi-list');
      mobileNavToggleBtn.classList.add('bi-x');
    }
  }

  function closeMobileNav() {
    body.classList.remove('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.add('bi-list');
      mobileNavToggleBtn.classList.remove('bi-x');
    }
  }

  function mobileNavToggle() {
    if (body.classList.contains('mobile-nav-active')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileNavToggle();
    });
  }

  // Close nav when clicking the overlay (outside the sidebar)
  document.addEventListener('click', function (e) {
    if (!body.classList.contains('mobile-nav-active')) return;

    const clickedInsideNav = navMenu && navMenu.contains(e.target);
    const clickedToggle = mobileNavToggleBtn && mobileNavToggleBtn.contains(e.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMobileNav();
    }
  });

  // Close nav when a nav link (not a dropdown toggle) is clicked
  document.querySelectorAll('#navmenu a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      // Don't close if clicking the chevron / dropdown toggle
      if (e.target.classList.contains('toggle-dropdown') || e.target.closest('.toggle-dropdown')) return;
      if (body.classList.contains('mobile-nav-active')) {
        closeMobileNav();
      }
    });
  });

  /* =====================================================
     MOBILE DROPDOWN / MEGA MENU TOGGLE
  ===================================================== */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(function (toggleBtn) {
    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const parentLi = this.closest('li.dropdown');
      if (!parentLi) return;

      // Close siblings
      document.querySelectorAll('.navmenu li.dropdown.open').forEach(function (openItem) {
        if (openItem !== parentLi) {
          openItem.classList.remove('open');
        }
      });

      parentLi.classList.toggle('open');
    });
  });

  /* =====================================================
     PRELOADER
  ===================================================== */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(function () { preloader.remove(); }, 500);
      }, 300);
    });
  }

  /* =====================================================
     SCROLL TOP BUTTON
  ===================================================== */
  const scrollTopBtn = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTopBtn) {
      window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* =====================================================
     AOS ANIMATION INIT
  ===================================================== */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 50
      });
    }
  }
  window.addEventListener('load', aosInit);

  /* =====================================================
     SWIPER SLIDERS INIT
  ===================================================== */
  function initSwiper() {
    document.querySelectorAll(".init-swiper, .premium-swiper-container").forEach(function (swiperEl) {
      const configEl = swiperEl.querySelector(".swiper-config");
      if (configEl && typeof Swiper !== 'undefined') {
        try {
          const config = JSON.parse(configEl.innerHTML.trim());
          new Swiper(swiperEl, config);
        } catch (e) {
          console.warn('Swiper config parse error:', e);
        }
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /* =====================================================
     ISOTOPE PORTFOLIO FILTER
  ===================================================== */
  window.addEventListener('load', function () {
    document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
      const layout = isotopeItem.getAttribute('data-layout') || 'fitRows';
      const filter = isotopeItem.getAttribute('data-default-filter') || '*';
      const container = isotopeItem.querySelector('.isotope-container');
      if (!container || typeof Isotope === 'undefined') return;

      let initIsotope;

      function initIso() {
        initIsotope = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter
        });
      }

      if (typeof imagesLoaded !== 'undefined') {
        imagesLoaded(container, initIso);
      } else {
        initIso();
      }

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filterBtn) {
        filterBtn.addEventListener('click', function () {
          const activeFilter = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (activeFilter) activeFilter.classList.remove('filter-active');
          this.classList.add('filter-active');
          if (initIsotope) {
            initIsotope.arrange({ filter: this.getAttribute('data-filter') });
          }
        });
      });
    });
  });

  /* =====================================================
     FAQ ACCORDION
  ===================================================== */
  document.querySelectorAll('.faq-item .faq-header').forEach(function (faqHeader) {
    faqHeader.addEventListener('click', function () {
      const item = faqHeader.parentNode;

      document.querySelectorAll('.faq-item').forEach(function (i) {
        if (i !== item) {
          i.classList.remove('faq-active');
          const icon = i.querySelector('.faq-toggle i');
          if (icon) {
            icon.classList.remove('bi-chevron-up');
            icon.classList.add('bi-chevron-down');
          }
        }
      });

      item.classList.toggle('faq-active');
      const currentIcon = item.querySelector('.faq-toggle i');
      if (currentIcon) {
        if (item.classList.contains('faq-active')) {
          currentIcon.classList.replace('bi-chevron-down', 'bi-chevron-up');
        } else {
          currentIcon.classList.replace('bi-chevron-up', 'bi-chevron-down');
        }
      }
    });
  });

  /* =====================================================
     CHAT BOX TOGGLE
  ===================================================== */
  window.toggleChat = function () {
    const chat = document.getElementById("chatBox");
    if (!chat) return;

    if (chat.style.display === "flex") {
      chat.style.opacity = "0";
      setTimeout(function () { chat.style.display = "none"; }, 300);
    } else {
      chat.style.display = "flex";
      void chat.offsetWidth; // Force reflow
      chat.style.opacity = "1";
    }
  };

  /* =====================================================
     GLIGHTBOX INIT
  ===================================================== */
  window.addEventListener('load', function () {
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
    }
  });

  /* =====================================================
     TYPED.JS INIT
  ===================================================== */
  window.addEventListener('load', function () {
    const typedEl = document.querySelector('.typed');
    if (typedEl && typeof Typed !== 'undefined') {
      const strings = typedEl.getAttribute('data-typed-items');
      if (strings) {
        new Typed('.typed', {
          strings: strings.split(', '),
          typeSpeed: 50,
          backSpeed: 30,
          backDelay: 2000,
          loop: true,
          cursorChar: '|',
          autoInsertCss: true
        });
      }
    }
  });

  /* =====================================================
     HERO SLIDER (Simple CSS-based fallback)
  ===================================================== */
  const slides = document.querySelectorAll(".hero-slide");
  let slideIndex = 0;

  if (slides.length > 1) {
    setInterval(function () {
      slides[slideIndex].classList.remove("active");
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
    }, 6000);
  }

})();
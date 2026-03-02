/**
 * ============================================================================
 * G-MAX TECH PREMIUM MAIN JAVASCRIPT
 * Handles all interactive elements, animations, and sliders.
 * Canvas background completely removed for a cleaner experience.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /* ========================================================================
       1. PRELOADER
       ======================================================================== */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 500); // Slight delay for smooth transition
        });
    }

    /* ========================================================================
       2. PREMIUM HEADER SCROLL EFFECT
       ======================================================================== */
    const selectHeader = document.querySelector('.premium-header');
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 50) {
                selectHeader.classList.add('scrolled');
            } else {
                selectHeader.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', headerScrolled);
        headerScrolled(); // Init on load
    }

    /* ========================================================================
       3. MOBILE SIDEBAR NAVIGATION
       ======================================================================== */
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebar && sidebarToggle && sidebarClose && sidebarOverlay) {
        const openSidebar = () => {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        const closeSidebar = () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        sidebarToggle.addEventListener('click', openSidebar);
        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    /* ========================================================================
       4. SCROLL TO TOP BUTTON
       ======================================================================== */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        const toggleScrollTop = () => {
            if (window.scrollY > 300) {
                scrollTop.classList.add('active');
            } else {
                scrollTop.classList.remove('active');
            }
        };
        window.addEventListener('scroll', toggleScrollTop);
        
        scrollTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ========================================================================
       5. INITIALIZE AOS (Animate On Scroll)
       ======================================================================== */
    function aosInit() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                offset: 50
            });
        }
    }
    window.addEventListener('load', aosInit);

    /* ========================================================================
       6. INITIALIZE GLightbox
       ======================================================================== */
    if (typeof GLightbox !== 'undefined') {
        const glightbox = GLightbox({
            selector: '.glightbox',
            openEffect: 'zoom',
            closeEffect: 'fade'
        });
    }

    /* ========================================================================
       7. INITIALIZE SWIPER SLIDERS
       ======================================================================== */
    if (typeof Swiper !== 'undefined') {
        // Find all swiper containers with a JSON config inside
        document.querySelectorAll('.swiper').forEach(function(swiperElement) {
            let config = swiperElement.querySelector('.swiper-config');
            if (config) {
                let parsedConfig = JSON.parse(config.innerHTML.trim());
                new Swiper(swiperElement, parsedConfig);
            }
        });
    }

    /* ========================================================================
       8. ISOTOPE PORTFOLIO FILTERING
       ======================================================================== */
    let portfolioIsotope = document.querySelector('.isotope-container');
    if (portfolioIsotope && typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
        imagesLoaded(portfolioIsotope, function() {
            let isotopeInstance = new Isotope(portfolioIsotope, {
                itemSelector: '.isotope-item',
                layoutMode: portfolioIsotope.getAttribute('data-layout') || 'masonry',
                filter: portfolioIsotope.closest('.isotope-layout').getAttribute('data-default-filter') || '*'
            });

            let portfolioFilters = document.querySelectorAll('.isotope-filters li');

            portfolioFilters.forEach(function(filter) {
                filter.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all
                    portfolioFilters.forEach(function(el) {
                        el.classList.remove('filter-active');
                    });
                    
                    // Add active class to clicked
                    this.classList.add('filter-active');

                    // Filter items
                    isotopeInstance.arrange({
                        filter: this.getAttribute('data-filter')
                    });
                    
                    // Refresh AOS after filtering
                    if (typeof AOS !== 'undefined') {
                        setTimeout(() => { AOS.refresh(); }, 300);
                    }
                });
            });
        });
    }

    /* ========================================================================
       9. TYPED.JS (For Hero Section text typing effect)
       ======================================================================== */
    const typedElements = document.querySelectorAll('.typed');
    if (typedElements.length > 0 && typeof Typed !== 'undefined') {
        typedElements.forEach(el => {
            let typedItems = el.getAttribute('data-typed-items');
            if (typedItems) {
                typedItems = typedItems.split(',');
                new Typed(el, {
                    strings: typedItems,
                    loop: true,
                    typeSpeed: 80,
                    backSpeed: 40,
                    backDelay: 2000
                });
            }
        });
    }
});
/**
* G-Max Tech Multi-Page Global Logic (Swiftsync Sidebar integrated)
*/

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /* =====================================================
       1. PRELOADER
    ===================================================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => { preloader.remove(); }, 600);
            }, 300);
        });
    }

    /* =====================================================
       2. SWIFTSYNC SIDEBAR LOGIC (MOBILE NAV)
    ===================================================== */
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        if(sidebar) sidebar.classList.add('active');
        if(sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }

    function closeSidebar() {
        if(sidebar) sidebar.classList.remove('active');
        if(sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    /* =====================================================
       3. TOP NAVBAR SCROLL EFFECT
    ===================================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('glass-effect', 'shadow-sm');
            } else {
                // Remove effect if completely at top, or keep glass based on preference
                // navbar.classList.remove('shadow-sm'); 
            }
        }
    });

    /* =====================================================
       4. HERO SLIDER LOGIC
    ===================================================== */
    const slides = document.querySelectorAll(".hero-slide");
    if (slides.length > 1) {
        let slideIndex = 0;
        setInterval(() => {
            slides[slideIndex].classList.remove("active");
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add("active");
        }, 6000);
    }

    /* =====================================================
       5. INITIALIZE PLUGINS (AOS, Swiper, Typed, Isotope, GLightbox)
    ===================================================== */
    
    // AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });
    }

    // Typed.js
    if (typeof Typed !== 'undefined') {
        const typedEl = document.querySelector('.typed');
        if (typedEl) {
            const strings = typedEl.getAttribute('data-typed-items');
            if (strings) {
                new Typed('.typed', {
                    strings: strings.split(', '), typeSpeed: 50, backSpeed: 30, backDelay: 2000, loop: true, cursorChar: '|'
                });
            }
        }
    }

    // Swiper
    document.querySelectorAll(".premium-swiper-container").forEach((swiperEl) => {
        const configEl = swiperEl.querySelector(".swiper-config");
        if (configEl && typeof Swiper !== 'undefined') {
            try { new Swiper(swiperEl, JSON.parse(configEl.innerHTML.trim())); } 
            catch (e) { console.warn('Swiper parse error:', e); }
        }
    });

    // Isotope (Portfolio Filtering)
    if (typeof Isotope !== 'undefined') {
        const isoContainer = document.querySelector('.isotope-container');
        if (isoContainer) {
            // Wait for images to load if imagesLoaded is present
            let initIso = function() {
                let iso = new Isotope(isoContainer, {
                    itemSelector: '.isotope-item',
                    layoutMode: 'fitRows'
                });
                const filterButtons = document.querySelectorAll('.isotope-filters li');
                filterButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const filterValue = btn.getAttribute('data-filter');
                        iso.arrange({ filter: filterValue });
                        filterButtons.forEach(b => b.classList.remove('filter-active'));
                        btn.classList.add('filter-active');
                    });
                });
            };

            if(typeof imagesLoaded !== 'undefined') {
                imagesLoaded(isoContainer, initIso);
            } else {
                initIso();
            }
        }
    }

    // GLightbox
    if (typeof GLightbox !== 'undefined') {
        GLightbox({ selector: '.glightbox' });
    }

    /* =====================================================
       6. NEURON CANVAS BACKGROUND
    ===================================================== */
    const canvas = document.getElementById('neuron-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        const particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        }));

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 136, 112, 0.4)';
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    }
});
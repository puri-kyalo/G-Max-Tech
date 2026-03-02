================================================================================
G-MAX TECH - PREMIUM DIGITAL SOLUTIONS (WEBSITE)
================================================================================

PROJECT OVERVIEW
--------------------------------------------------------------------------------
G-Max Tech is a premium, dark-themed website designed for a modern digital 
agency based in Nairobi, Kenya. The site utilizes a sophisticated "Glassmorphism" 
design language, strict neon border glows, and highly interactive UI elements 
to showcase services like Graphic Design, Web Development, eCitizen Solutions, 
and IT Masterclasses.

FEATURES & RECENT UPDATES
--------------------------------------------------------------------------------
1. Navigation Architecture: 
   - Fully responsive Navbar with Desktop Dropdowns.
   - Mobile Sidebar Offcanvas menu.
   - "Services" dropdown contains: "Services" (main) & "More Services" (details).
   - "Portfolio" dropdown contains: "Portfolio" (main) & "See More" (details).

2. GSAP Animations:
   - Integrated GreenSock (GSAP) on the Homepage Hero Section.
   - Targeted infinite animations on specific letters of "Elevate Your Brand With":
     * 'E': Floats smoothly up and down.
     * 'Y': Rotates continuously on the Y-axis (3D flip).
     * 'B': Pulses (scales up and down).
     * 'W': Spins continuously on the Z-axis like a wheel.

3. Premium UI/UX:
   - Blurred glass panels (backdrop-filter).
   - Strict hover-based neon border glows (removing heavy background bleeds).
   - Isotope.js for seamless portfolio filtering.
   - Swiper.js for automatic client testimonial sliders.
   - Typed.js for dynamic hero text typing effects.
   - Scroll-based progress indicator (on details pages).

FILE STRUCTURE
--------------------------------------------------------------------------------
ROOT DIRECTORY:
│
├── index.html                - Main Homepage
├── about.html                - About Us & Company Genesis
├── service.html              - Main Services Grid 
├── service-details.html      - In-depth Service Breakdown
├── Portfolio.html            - Isotope Filtered Portfolio Gallery
├── portfolio-details.html    - Individual Case Study / Project Deep Dive
├── contact.html              - Contact Information & PHP form
│
├── forms/
│   └── contact.php           - Backend script to handle contact form emails
│
└── assets/
    ├── css/
    │   └── main.css          - Core custom stylesheet (Variables, Glass UI, Media Queries)
    │
    ├── js/
    │   └── main.js           - Core custom scripts (GSAP, Sidebar, Sliders, Preloader)
    │
    ├── img/                  - All project images, logos, and portfolio mockups
    │
    └── vendor/               - Third-party libraries (Bootstrap, AOS, GSAP, Swiper, etc.)

INSTALLATION & USAGE
--------------------------------------------------------------------------------
1. Local Viewing:
   Simply extract the folder and open `index.html` in any modern web browser 
   (Chrome, Firefox, Edge, Safari). No build tools are required for the frontend.

2. Live Server (Recommended for testing):
   For the best experience (and to avoid CORS warnings with certain JS libraries), 
   run the site using a local server.
   - VS Code: Install "Live Server" extension, right-click `index.html` -> "Open with Live Server".

3. Form Functionality:
   The contact form requires a server with PHP enabled to function properly. 
   Upload the site to a standard cPanel/Apache web hosting environment to test 
   the `forms/contact.php` submission.

CREDITS & LIBRARIES USED
--------------------------------------------------------------------------------
- Bootstrap 5.3.2 (Grid & Utilities)
- Bootstrap Icons & Google Material Icons (Typography/Icons)
- GSAP 3.12.2 (Advanced Animations)
- AOS - Animate On Scroll (Scroll Reveal Effects)
- Swiper.js (Sliders)
- Isotope.js (Masonry Layout & Filtering)
- GLightbox (Image Popups)
- Typed.js (Auto-typing effects)

================================================================================
© 2026 G-Max Tech. All Rights Reserved.
================================================================================
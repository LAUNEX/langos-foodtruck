/**
 * Lángos uf Tour - Main JavaScript
 * Retro Style with Modern Interactions
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const elements = {
        header: document.getElementById('header'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        navMobile: document.getElementById('navMobile'),
        mobileLinks: document.querySelectorAll('.nav-mobile-link'),
        fadeUpElements: document.querySelectorAll('.fade-up'),
        staggerElements: document.querySelectorAll('.stagger')
    };

    // ============================================
    // State
    // ============================================
    const state = {
        isMenuOpen: false,
        lastScrollY: 0
    };

    // ============================================
    // Mobile Menu
    // ============================================
    function toggleMobileMenu() {
        state.isMenuOpen = !state.isMenuOpen;

        elements.mobileMenuBtn.classList.toggle('active', state.isMenuOpen);
        elements.navMobile.classList.toggle('open', state.isMenuOpen);
        document.body.classList.toggle('menu-open', state.isMenuOpen);

        elements.mobileMenuBtn.setAttribute(
            'aria-label',
            state.isMenuOpen ? 'Menü schließen' : 'Menü öffnen'
        );
    }

    function closeMobileMenu() {
        if (state.isMenuOpen) {
            state.isMenuOpen = false;
            elements.mobileMenuBtn.classList.remove('active');
            elements.navMobile.classList.remove('open');
            document.body.classList.remove('menu-open');
            elements.mobileMenuBtn.setAttribute('aria-label', 'Menü öffnen');
        }
    }

    // ============================================
    // Header Scroll Effect
    // ============================================
    function handleScroll() {
        const scrollY = window.scrollY;

        // Add scrolled class after 50px
        if (scrollY > 50) {
            if (!elements.header.classList.contains('scrolled')) {
                elements.header.classList.add('scrolled');
            }
        } else {
            if (elements.header.classList.contains('scrolled')) {
                elements.header.classList.remove('scrolled');
            }
        }

        state.lastScrollY = scrollY;
    }

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Fade up animations
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.fadeUpElements.forEach(el => {
            fadeObserver.observe(el);
        });

        // Stagger animations
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.staggerElements.forEach(el => {
            staggerObserver.observe(el);
        });
    }

    // ============================================
    // Smooth Scroll
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const section = document.querySelector(href);
                if (section) {
                    e.preventDefault();
                    closeMobileMenu();

                    const headerHeight = elements.header.offsetHeight;
                    let scrollTarget = section;

                    // For menu section, scroll to the crest image
                    if (href === '#menu') {
                        const crest = section.querySelector('.section-crest');
                        if (crest) scrollTarget = crest;
                    }
                    // For drinks section, scroll to the section badge
                    else if (href === '#drinks') {
                        const badge = section.querySelector('.section-badge');
                        if (badge) scrollTarget = badge;
                    }
                    // For location section, scroll to the section badge
                    else if (href === '#location') {
                        const badge = section.querySelector('.section-badge');
                        if (badge) scrollTarget = badge;
                    }

                    // On mobile, use less offset for better positioning
                    const isMobile = window.innerWidth < 992;
                    const extraOffset = isMobile ? 10 : 20;
                    const targetPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraOffset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Keyboard Navigation
    // ============================================
    function initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    // ============================================
    // Touch Feedback (disabled to prevent scroll jitter on mobile)
    // ============================================
    function initTouchFeedback() {
        // Disabled - CSS :active states handle this without causing scroll issues
    }

    // ============================================
    // Parallax Effect for Hero (disabled to prevent flickering)
    // ============================================
    function initParallax() {
        // Parallax disabled to prevent header flickering
        // The hero content now stays static
    }


    // ============================================
    // Window Resize Handler
    // ============================================
    function initResizeHandler() {
        let resizeTimer;

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth >= 992) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }

    // ============================================
    // Event Listeners
    // ============================================
    function initEventListeners() {
        // Mobile menu toggle
        if (elements.mobileMenuBtn) {
            elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }

        // Close menu when clicking mobile links
        elements.mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Scroll handler (throttled)
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // Initialize
    // ============================================
    function init() {
        initEventListeners();
        initScrollAnimations();
        initSmoothScroll();
        initKeyboardNav();
        initTouchFeedback();
        initParallax();
        initResizeHandler();

        // Initial scroll check
        handleScroll();

        // Add loaded class to body for initial animations
        document.body.classList.add('loaded');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // Allergen Modal
    // ============================================
    function initAllergenModal() {
        const allergenBtn = document.getElementById('allergenBtn');
        const allergenModal = document.getElementById('allergenModal');
        const modalClose = document.getElementById('modalClose');

        if (!allergenBtn || !allergenModal) return;

        // Open modal
        allergenBtn.addEventListener('click', () => {
            allergenModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal with X button
        modalClose.addEventListener('click', () => {
            allergenModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside
        allergenModal.addEventListener('click', (e) => {
            if (e.target === allergenModal) {
                allergenModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && allergenModal.classList.contains('active')) {
                allergenModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Initialize allergen modal when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllergenModal);
    } else {
        initAllergenModal();
    }

})();

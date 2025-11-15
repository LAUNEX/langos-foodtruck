// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || this.id === 'hoursDropdownToggle') {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update opening status dynamically
function updateOpenStatus() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    const statusBadge = document.querySelector('.status-badge');
    const statusTime = document.querySelector('.status-time');
    
    let isOpen = false;
    let openingTime = '';
    
    // Monday-Friday: 11:00-20:00
    // Saturday-Sunday: 12:00-21:00
    if (day >= 1 && day <= 5) {
        isOpen = hour >= 11 && hour < 20;
        openingTime = '11:00 - 20:00 Uhr';
    } else {
        isOpen = hour >= 12 && hour < 21;
        openingTime = '12:00 - 21:00 Uhr';
    }
    
    if (statusBadge) {
        if (isOpen) {
            statusBadge.textContent = 'Jetzt geöffnet';
            statusBadge.classList.add('status-open');
            statusBadge.classList.remove('status-closed');
        } else {
            statusBadge.textContent = 'Geschlossen';
            statusBadge.classList.add('status-closed');
            statusBadge.classList.remove('status-open');
        }
    }
    
    if (statusTime) {
        statusTime.textContent = openingTime;
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateOpenStatus);

// Mobile VH fix
const vhFix = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', vhFix, { passive: true });
window.addEventListener('orientationchange', () => {
    setTimeout(vhFix, 100);
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    vhFix();
    
    // Smooth Preloader Progress Simulation
    const loader = document.getElementById('preloader');
    const progress = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');
    
    if (loader && progress && progressText) {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('fade-out');
                }, 300);
            } else {
                width += Math.random() * 15;
                if (width > 100) width = 100;
                progress.style.width = width + '%';
                progressText.innerText = Math.round(width) + '%';
            }
        }, 80);
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, { passive: true });

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Clone Review Cards for Seamless Marquee
const slider = document.getElementById('review-slider');
if (slider) {
    const cards = slider.innerHTML;
    slider.innerHTML += cards;
    const cardCount = slider.querySelectorAll('.review-card').length / 2;
    const duration = cardCount * 5;
    slider.style.animationDuration = `${duration}s`;
}

// Viewport Reveal Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .info-card, .img-reveal, .trainer-card, .facility-item').forEach(el => {
    observer.observe(el);
});

// Mobile Equipment Focus on Scroll
const equipObserverOptions = {
    threshold: 0.6, // Trigger when 60% of the card is visible
    rootMargin: "-10% 0px -10% 0px" // Slight contraction of viewport for focus zone
};

const equipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-focused');
        } else {
            entry.target.classList.remove('is-focused');
        }
    });
}, equipObserverOptions);

document.querySelectorAll('.equipment-card').forEach(card => {
    equipObserver.observe(card);
});

// Trial Form Submission
const trialForm = document.getElementById('trial-form');
if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = trialForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerText = 'Pass Secured! Check WhatsApp';
            btn.style.background = 'white';
            btn.style.color = 'var(--navy-dark)';
            trialForm.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.background = 'var(--neon-green)';
            }, 3000);
        }, 1500);
    });
}

// Section Stacking Effect (Reverse Parallax)
const sectionOptions = {
    threshold: 0.1, // Trigger earlier for smoother flow
    rootMargin: "0px"
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const section = entry.target;
        // Use intersectionRatio for more granular control
        if (entry.isIntersecting) {
            section.classList.add('is-active');
            section.classList.remove('is-past');
        } else if (entry.boundingClientRect.top < 0) {
            // Section is above the viewport
            section.classList.add('is-past');
            section.classList.remove('is-active');
        } else {
            // Section is below the viewport
            section.classList.remove('is-active', 'is-past');
        }
    });
}, sectionOptions);

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Global Scroll Progress
window.addEventListener('scroll', () => {
    const indicator = document.getElementById('scroll-indicator');
    if (indicator) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.height = scrolled + "%";
    }
}, { passive: true });

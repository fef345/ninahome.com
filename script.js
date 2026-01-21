// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

// Header scroll effect
const header = document.getElementById('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
});

// Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Testimonials carousel
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevArrow = document.querySelector('.arrow-prev');
const nextArrow = document.querySelector('.arrow-next');
let activeIndex = 0;
let autoPlayInterval;
const AUTOPLAY_DELAY = 5000;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    activeIndex = index;
}

function nextTestimonial() {
    const newIndex = (activeIndex + 1) % testimonials.length;
    showTestimonial(newIndex);
}

function prevTestimonial() {
    const newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(newIndex);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextTestimonial, AUTOPLAY_DELAY);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
        resetAutoPlay();
    });
});

function toggleFaq(button) {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    // Toggle current item
    if (isActive) {
        item.classList.remove('active');
    } else {
        item.classList.add('active');
    }
}

// Arrow navigation
if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        prevTestimonial();
        resetAutoPlay();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        nextTestimonial();
        resetAutoPlay();
    });
}

// Start autoplay
startAutoPlay();

// Pause autoplay on hover
const testimonialsSection = document.querySelector('.testimonials');
testimonialsSection.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

testimonialsSection.addEventListener('mouseleave', () => {
    startAutoPlay();
});

// Contact form
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const submitBtn = contactForm.querySelector('.btn-submit');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    submitBtn.classList.add('loading');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Reset form
    contactForm.reset();

    // Restore button
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = originalContent;
    submitBtn.disabled = false;

    // Show toast
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
});

// Current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Scroll reveal animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Make hero visible immediately
const hero = document.querySelector('.hero');
if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
}

function toggleChatPopup(show) {
    const popup = document.getElementById('chat-popup');
    if (show) {
        popup.classList.remove('hidden');
    } else {
        popup.classList.add('hidden');
    }
}
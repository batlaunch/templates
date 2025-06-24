// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');
const contactForm = document.querySelector('.contact-form');
const galleryItems = document.querySelectorAll('.gallery-item');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;
    
    navToggle.setAttribute('aria-expanded', newState);
    mobileMenu.setAttribute('aria-hidden', !newState);
    
    // Update tabindex for mobile menu links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.setAttribute('tabindex', newState ? '0' : '-1');
    });
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = newState ? 'hidden' : '';
}

// Event Listeners
navToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        if (navToggle.getAttribute('aria-expanded') === 'true') {
            toggleMobileMenu();
        }
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        toggleMobileMenu();
        navToggle.focus();
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (navToggle.getAttribute('aria-expanded') === 'true') {
                toggleMobileMenu();
            }
            
            // Calculate offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update focus for accessibility
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus();
            targetSection.addEventListener('blur', () => {
                targetSection.removeAttribute('tabindex');
            }, { once: true });
        }
    });
});

// Active navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 100;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active state for navigation links
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        link.classList.toggle('active', href === currentSection);
    });
}

// Navbar background on scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.style.background = scrolled 
        ? 'rgba(10, 10, 10, 0.98)' 
        : 'rgba(10, 10, 10, 0.95)';
}

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveNavigation();
    updateNavbarBackground();
});

// Gallery keyboard navigation
galleryItems.forEach(item => {
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Simulate click for keyboard users
            item.click();
        }
    });
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearFormErrors();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim(),
        service: formData.get('service'),
        message: formData.get('message').trim()
    };
    
    // Validate form
    const errors = validateForm(data);
    
    if (Object.keys(errors).length > 0) {
        displayFormErrors(errors);
        // Focus on first error field
        const firstErrorField = Object.keys(errors)[0];
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
            errorElement.focus();
        }
        return;
    }
    
    // Simulate form submission
    submitForm(data);
}

function validateForm(data) {
    const errors = {};
    
    // Name validation
    if (!data.name) {
        errors.name = 'Name is required';
    } else if (data.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!data.message) {
        errors.message = 'Message is required';
    } else if (data.message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    // Remove error styling
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    formFields.forEach(field => {
        field.style.borderColor = '';
    });
}

function displayFormErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const fieldElement = document.getElementById(fieldName);
        
        if (errorElement) {
            errorElement.textContent = errors[fieldName];
        }
        
        if (fieldElement) {
            fieldElement.style.borderColor = '#ffeb3b';
        }
    });
}

function submitForm(data) {
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Log form data (in real implementation, this would be sent to server)
        console.log('Form submitted:', data);
    }, 2000);
}

function showSuccessMessage() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4caf50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        text-align: center;
        font-weight: 500;
    `;
    successMessage.textContent = 'Thank you! We\'ll get back to you within 24 hours.';
    
    document.body.appendChild(successMessage);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .about-content, .contact-content');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Add keyboard navigation class for focus styling
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Lazy load images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            imageObserver.unobserve(img);
        }
    });
});

// lazyImages.forEach(img => imageObserver.observe(img));

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states
    updateActiveNavigation();
    updateNavbarBackground();
    
    // Ensure mobile menu is closed on page load
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Set initial tabindex for mobile menu links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.setAttribute('tabindex', '-1');
    });
    
    console.log('Ink & Iron Tattoo Studio website loaded successfully');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navToggle.getAttribute('aria-expanded') === 'true') {
        toggleMobileMenu();
    }
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/artist_at_work.jpg',
        'images/portrait_tattoo.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Start preloading after page load
window.addEventListener('load', preloadImages);


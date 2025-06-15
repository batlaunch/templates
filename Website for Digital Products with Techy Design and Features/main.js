// Main JavaScript file for Digital Products Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animate-fade-in');
            }
        });
    }
    
    // Run on initial load
    checkIfInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Create error message if it doesn't exist
                    let errorMessage = field.parentElement.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required';
                        field.parentElement.appendChild(errorMessage);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMessage = field.parentElement.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                    
                    // Email validation
                    if (field.type === 'email' && !validateEmail(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                        
                        let errorMessage = field.parentElement.querySelector('.error-message');
                        if (!errorMessage) {
                            errorMessage = document.createElement('div');
                            errorMessage.className = 'error-message';
                            errorMessage.textContent = 'Please enter a valid email address';
                            field.parentElement.appendChild(errorMessage);
                        } else {
                            errorMessage.textContent = 'Please enter a valid email address';
                        }
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Password strength indicator
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    passwordFields.forEach(field => {
        field.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Create strength indicator if it doesn't exist
            let strengthIndicator = this.parentElement.querySelector('.password-strength');
            if (!strengthIndicator) {
                strengthIndicator = document.createElement('div');
                strengthIndicator.className = 'password-strength';
                this.parentElement.appendChild(strengthIndicator);
            }
            
            // Check password strength
            if (password.length >= 8) strength += 1;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
            if (password.match(/\d/)) strength += 1;
            if (password.match(/[^a-zA-Z\d]/)) strength += 1;
            
            // Update strength indicator
            switch (strength) {
                case 0:
                    strengthIndicator.textContent = 'Very Weak';
                    strengthIndicator.className = 'password-strength very-weak';
                    break;
                case 1:
                    strengthIndicator.textContent = 'Weak';
                    strengthIndicator.className = 'password-strength weak';
                    break;
                case 2:
                    strengthIndicator.textContent = 'Medium';
                    strengthIndicator.className = 'password-strength medium';
                    break;
                case 3:
                    strengthIndicator.textContent = 'Strong';
                    strengthIndicator.className = 'password-strength strong';
                    break;
                case 4:
                    strengthIndicator.textContent = 'Very Strong';
                    strengthIndicator.className = 'password-strength very-strong';
                    break;
            }
        });
    });
    
    // Testimonial carousel
    const testimonialContainer = document.querySelector('.testimonial-carousel');
    if (testimonialContainer) {
        const testimonials = testimonialContainer.querySelectorAll('.testimonial-card');
        const prevBtn = testimonialContainer.querySelector('.prev-btn');
        const nextBtn = testimonialContainer.querySelector('.next-btn');
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        if (prevBtn && nextBtn && testimonials.length > 0) {
            showTestimonial(currentIndex);
            
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            });
        }
    }
    
    // Pricing toggle (monthly/yearly)
    const pricingToggle = document.querySelector('.pricing-toggle');
    if (pricingToggle) {
        const monthlyPrices = document.querySelectorAll('.price-monthly');
        const yearlyPrices = document.querySelectorAll('.price-yearly');
        const toggleCheckbox = pricingToggle.querySelector('input[type="checkbox"]');
        
        if (toggleCheckbox) {
            toggleCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    // Show yearly prices
                    monthlyPrices.forEach(price => price.style.display = 'none');
                    yearlyPrices.forEach(price => price.style.display = 'block');
                } else {
                    // Show monthly prices
                    monthlyPrices.forEach(price => price.style.display = 'block');
                    yearlyPrices.forEach(price => price.style.display = 'none');
                }
            });
        }
    }
    
    // Sticky header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('hide');
            } else {
                // Scrolling up
                header.classList.remove('hide');
            }
        } else {
            header.classList.remove('sticky');
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });
});

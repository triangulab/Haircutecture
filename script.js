// JAVASCRIPT FOR HAIRCUTECTURE WEBSITE

// Wait for the page to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Haircutecture website loaded successfully!');
    
    // Initialize all functionality
    initSmoothScrolling();
    initMobileMenu();
    initBookingButton();
    initServiceCards();
    initContactForm();
    initScrollEffects();
});

// SMOOTH SCROLLING FOR NAVIGATION LINKS
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the default jump behavior
            
            const targetId = this.getAttribute('href'); // Get the #section-name
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Smooth scrolling animation
                    block: 'start'      // Scroll to the top of the section
                });
            }
        });
    });
}

// MOBILE MENU FUNCTIONALITY
function initMobileMenu() {
    // Create a mobile menu button (hamburger menu)
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰'; // Hamburger icon
    mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    
    // Insert the button into the navigation
    nav.insertBefore(mobileMenuBtn, navLinks);
    
    // Toggle mobile menu when button is clicked
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-menu-open');
        this.classList.toggle('menu-open');
        
        // Change icon when menu is open/closed
        this.innerHTML = this.classList.contains('menu-open') ? '✕' : '☰';
    });
    
    // Close mobile menu when a link is clicked
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('mobile-menu-open');
            mobileMenuBtn.classList.remove('menu-open');
            mobileMenuBtn.innerHTML = '☰';
        }
    });
}

// BOOKING BUTTON FUNCTIONALITY
function initBookingButton() {
    const bookingBtn = document.querySelector('.cta-button');
    
    if (bookingBtn) {
        bookingBtn.addEventListener('click', function() {
            // Show booking modal or redirect to booking page
            alert('Booking system coming soon! Call (555) 123-4567 to book your appointment.');
            
            // You could replace this with:
            // - A modal popup
            // - Redirect to a booking page
            // - Integration with a booking service
            
            // Example of scrolling to contact section instead:
            // document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// SERVICE CARDS HOVER EFFECTS
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add hover effect with JavaScript
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click functionality
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            alert(`Learn more about our ${serviceName} service! Contact us for details.`);
        });
    });
}

// CONTACT FORM HANDLING (if you add a form later)
function initContactForm() {
    // This function is ready for when you add a contact form
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from submitting normally
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Here you would typically send the data to a server
            alert(`Thank you ${name}! We'll get back to you soon.`);
            this.reset(); // Clear the form
        });
    }
}

// SCROLL EFFECTS - FADE IN ANIMATIONS
function initScrollEffects() {
    // Create an Intersection Observer to animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,    // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'  // Trigger slightly before element enters viewport
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });
}

// UTILITY FUNCTIONS

// Function to get current time for business hours
function getBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Example business hours: Monday-Friday 9AM-7PM, Saturday 9AM-5PM, Closed Sunday
    if (day === 0) return "Closed today";
    if (day === 6) return hour >= 9 && hour < 17 ? "Open now" : "Closed";
    return hour >= 9 && hour < 19 ? "Open now" : "Closed";
}

// Function to format phone numbers
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Function to validate email addresses
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add business hours to contact section (example of dynamic content)
function updateBusinessHours() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const status = getBusinessHours();
        const statusElement = document.createElement('p');
        statusElement.textContent = `Status: ${status}`;
        statusElement.style.fontWeight = 'bold';
        statusElement.style.color = status.includes('Open') ? 'green' : 'red';
        
        // Add to contact section if not already there
        if (!contactSection.querySelector('.business-status')) {
            statusElement.className = 'business-status';
            contactSection.querySelector('.container').appendChild(statusElement);
        }
    }
}

// Call business hours update when page loads
document.addEventListener('DOMContentLoaded', updateBusinessHours);
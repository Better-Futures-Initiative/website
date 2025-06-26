// Better Future Robotics - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Tutorial filter functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    const tutorialItems = document.querySelectorAll('.tutorial-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter tutorial items
                tutorialItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-level') === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation and submission
    const contactForm = document.querySelector('form[method="POST"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            console.log('Form submission intercepted'); // Debug line
            const name = this.querySelector('#name');
            const email = this.querySelector('#email');
            const message = this.querySelector('#message');

            // Basic validation
            if (!name.value.trim()) {
                e.preventDefault();
                showAlert('Please enter your name', 'danger');
                name.focus();
                return;
            }

            if (!email.value.trim() || !isValidEmail(email.value)) {
                e.preventDefault();
                showAlert('Please enter a valid email address', 'danger');
                email.focus();
                return;
            }

            if (!message.value.trim() || message.value.trim().length < 10) {
                e.preventDefault();
                showAlert('Please enter a message with at least 10 characters', 'danger');
                message.focus();
                return;
            }

            console.log('Form validation passed, submitting...'); // Debug line
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('form[class*="row g-3"]');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]');

            if (!email.value.trim() || !isValidEmail(email.value)) {
                showAlert('Please enter a valid email address', 'danger');
                email.focus();
                return;
            }

            // Simulate successful subscription
            showAlert('Thank you for subscribing to our newsletter!', 'success');
            email.value = '';
        });
    }

    // Animated counters for stats
    const statNumbers = document.querySelectorAll('.display-4');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        if (stat.textContent.match(/^\d+/)) {
            statsObserver.observe(stat);
        }
    });

    // Hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading states for buttons
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-success');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit' || this.href) {
                addLoadingState(this);
            }
        });
    });

});

// Helper Functions

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message, type) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.match(/\d+/)[0]);
    const suffix = text.replace(/\d+/, '');

    let current = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 50);
}

function addLoadingState(button) {
    const originalText = button.innerHTML;
    const originalWidth = button.offsetWidth;

    button.style.width = originalWidth + 'px';
    button.innerHTML = '<span class="loading"></span> Loading...';
    button.disabled = true;

    // Remove loading state after 2 seconds (or when page loads)
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.style.width = 'auto';
    }, 2000);
}

// Intersection Observer for fade-in animations
const fadeInElements = document.querySelectorAll('.feature-card, .tutorial-card, .module-card');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize fade-in animations
fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// Mobile menu enhancements
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        setTimeout(() => {
            if (navbarCollapse.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }, 350);
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarToggler.click();
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Scroll-based navbar background
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        navbar.style.backgroundColor = 'rgba(37, 99, 235, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.backgroundColor = '';
        navbar.style.backdropFilter = '';
    }
});

// Copy to clipboard functionality for code blocks
const codeBlocks = document.querySelectorAll('.code-block');
codeBlocks.forEach(block => {
    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn-sm btn-outline-light position-absolute';
    copyButton.style.cssText = 'top: 10px; right: 10px;';
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.title = 'Copy to clipboard';

    block.style.position = 'relative';
    block.appendChild(copyButton);

    copyButton.addEventListener('click', function() {
        const text = block.textContent.replace('Copy to clipboard', '').trim();
        navigator.clipboard.writeText(text).then(() => {
            this.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    });
});

// Progress bar animation for tutorial completion
function updateProgress(percentage) {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = percentage + '%';
        bar.setAttribute('aria-valuenow', percentage);
    });
}

// Search functionality for tutorials (if search input exists)
const searchInput = document.querySelector('#tutorialSearch');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const tutorials = document.querySelectorAll('.tutorial-item');

        tutorials.forEach(tutorial => {
            const title = tutorial.querySelector('h5').textContent.toLowerCase();
            const description = tutorial.querySelector('p').textContent.toLowerCase();

            if (title.includes(query) || description.includes(query)) {
                tutorial.style.display = 'block';
            } else {
                tutorial.style.display = 'none';
            }
        });
    });
}

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Keyboard navigation enhancements
document.addEventListener('keydown', function(e) {
    // ESC key closes modals and mobile menu
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();
        });

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    }
});

// Print optimization
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }, 0);
    });
}
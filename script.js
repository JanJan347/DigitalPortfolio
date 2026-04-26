// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const lightModeBtn = document.getElementById('light-mode');
    const darkModeBtn = document.getElementById('dark-mode');
    const body = document.body;
    const navbar = document.querySelector('.navbar');

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        navbar.setAttribute('data-theme', theme); // Also apply to navbar
        localStorage.setItem('theme', theme);
        
        // Update button visibility
        if (theme === 'dark') {
            lightModeBtn.style.display = 'block';
            darkModeBtn.style.display = 'none';
        } else {
            lightModeBtn.style.display = 'none';
            darkModeBtn.style.display = 'block';
        }
    }

    // Theme toggle button listeners
    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', () => setTheme('light'));
    }
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => setTheme('dark'));
    }

    // Initialize theme buttons visibility
    if (currentTheme === 'dark') {
        if (lightModeBtn) lightModeBtn.style.display = 'block';
        if (darkModeBtn) darkModeBtn.style.display = 'none';
    } else {
        if (lightModeBtn) lightModeBtn.style.display = 'none';
        if (darkModeBtn) darkModeBtn.style.display = 'block';
    }

    // Smooth Scrolling for Navigation Links
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

    // Navbar Background on Scroll (theme-aware)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(25, 25, 25, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        } else {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(25, 25, 25, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Animate Skill Bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    // Trigger skill animation when skills section is visible
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Profile Image Load and Error Handling
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        profileImage.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x300/FF6B35/FFFFFF?text=John+Sandoval';
            this.style.opacity = '1';
        });
    }

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const originalBg = submitBtn.style.background;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! 🎉';
                submitBtn.style.background = '#27AE60';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = originalBg;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Parallax Effect for Home Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeSection = document.getElementById('home');
        const parallax = scrolled * 0.5;
        
        if (homeSection) {
            homeSection.style.transform = `translateY(${parallax}px)`;
        }
    });

    // Typing Effect for Home Title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after page load
    setTimeout(() => {
        const nameElement = document.querySelector('.home-content h1');
        if (nameElement) {
            typeWriter(nameElement, 'John Ismael G. Sandoval', 80);
        }
    }, 500);

    // Counter Animation for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + '+';
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + '+';
                }
            };
            updateCounter();
        });
    }

    // Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.project-card, .hobby-item, .contact-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });

    console.log('Portfolio loaded successfully! 🚀');
});

// Image Modal Functions
function openModal(imageSrc, captionText) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionTextElement = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    captionTextElement.innerHTML = captionText;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
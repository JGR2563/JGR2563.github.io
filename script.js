// Typing effect for the hero section
const typingText = document.querySelector('.typing-text');
const words = ['Desarrollador Web', 'Diseñador UI/UX', 'Freelancer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing effect
type();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skill-item')) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay}s`;
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .skill-item, .about-content').forEach((el, index) => {
    el.dataset.delay = index * 0.2;
    observer.observe(el);
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Aquí iría la lógica de envío del formulario
            // Por ahora solo simulamos un delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            this.reset();
        } catch (error) {
            showNotification('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Enviar';
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <p>${message}</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scrolling
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

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navLinks.style.display = 'none';
    }
});

// Scroll reveal animation
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Loader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Hover effect on links
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Navbar Background
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: {
        className: 'navbar--scrolled',
        targets: '.navbar'
    }
});

// Hero Animations
gsap.from('.hero-title .gradient-text', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

gsap.from('.hero-title .outline-text', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.7
});

gsap.from('.hero-subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.9
});

// Scroll Animations
const workItems = gsap.utils.toArray('.work-item');
workItems.forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: i * 0.2
    });
});

// About Section Animation
gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about-text',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about-image',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

// Skills Animation
const skills = document.querySelectorAll('.skill-bar');
skills.forEach(skill => {
    const level = skill.dataset.level;
    gsap.to(skill, {
        scrollTrigger: {
            trigger: skill,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        '--level': `${level}%`,
        duration: 1.5,
        ease: 'power4.out'
    });
});

// Contact Form Animation
const formGroups = gsap.utils.toArray('.form-group');
formGroups.forEach((group, i) => {
    gsap.from(group, {
        scrollTrigger: {
            trigger: group,
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power4.out'
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power4.inOut'
            });
        }
    });
});

// Work Item Hover Effect
workItems.forEach(item => {
    const color = item.dataset.color;
    const image = item.querySelector('img');
    
    item.addEventListener('mouseenter', () => {
        gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        gsap.to(item, {
            backgroundColor: color,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        gsap.to(item, {
            backgroundColor: '#111',
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

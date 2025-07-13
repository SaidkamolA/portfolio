// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const sections = document.querySelectorAll('section');
const serviceCards = document.querySelectorAll('.service-card');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.querySelector('.contact-form');
const backToTopBtn = document.getElementById('backToTop');
const filterBtns = document.querySelectorAll('.filter-btn');
const skillItems = document.querySelectorAll('.skill-item');

// Smooth scrolling for navigation links
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

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (window.scrollY > 100) {
        navbar.style.background = isDark ? 'rgba(24, 24, 36, 0.98)' : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = isDark ? '0 2px 20px rgba(0, 0, 0, 0.3)' : '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = isDark ? 'rgba(24, 24, 36, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe sections for animations
sections.forEach(section => {
    observer.observe(section);
});

// Service cards hover effects
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Portfolio items hover effects
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(0)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(100%)';
        }
    });
});

// Skills animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const subject = contactForm.querySelector('input[placeholder="Тема проекта"]').value;
        const projectType = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        const agreement = contactForm.querySelector('input[type="checkbox"]').checked;
        
        // Simple validation
        if (!name || !phone || !subject || !projectType || !message) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showNotification('Пожалуйста, введите корректный номер телефона', 'error');
            return;
        }
        
        if (!agreement) {
            showNotification('Необходимо согласие с обработкой персональных данных', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        
        try {
            // Prepare message for Telegram
            const telegramMessage = `🔔 *Новое сообщение с сайта*

👤 *Имя:* ${name}
📱 *Телефон:* ${phone}
📋 *Тема:* ${subject}
🛠 *Тип проекта:* ${projectType}
💬 *Сообщение:*
${message}

📅 *Дата:* ${new Date().toLocaleString('ru-RU')}
🌐 *Источник:* Портфолио сайт`;
            
            // Telegram Bot API - отправка напрямую в бот
            const botToken = '7590789624:AAEEQd90l1aE23nlaEkRaNSg0p6jZ3_FmZk'; // Замените на ваш токен
            const chatId = '7987962865'; // Замените на ваш chat_id
            
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                    parse_mode: 'Markdown'
                })
            });
            
            const result = await response.json();
            
            if (response.ok && result.ok) {
                showNotification('✅ Сообщение успешно отправлено разработчику!', 'success');
                contactForm.reset();
            } else {
                throw new Error(`Telegram API Error: ${result.description || 'Unknown error'}`);
            }
            
        } catch (error) {
            console.error('Error sending to Telegram:', error);
            showNotification('❌ Ошибка отправки. Попробуйте позже или свяжитесь напрямую.', 'error');
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Phone formatting function
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, ''); // Убираем все кроме цифр
    
    if (value.length > 0) {
        // Если номер начинается с 998, добавляем +
        if (value.startsWith('998')) {
            value = '+' + value;
        } else if (value.startsWith('98')) {
            value = '+9' + value;
        } else if (value.startsWith('8')) {
            value = '+998' + value.substring(1);
        } else if (!value.startsWith('+')) {
            value = '+998' + value;
        }
        
        // Форматируем номер с пробелами: +998 99 910 37 16
        let formatted = '';
        const digits = value.replace(/\D/g, ''); // Только цифры
        
        if (digits.length >= 1) {
            formatted = '+998';
        }
        if (digits.length >= 2) {
            formatted += ' ' + digits.substring(0, 2);
        }
        if (digits.length >= 5) {
            formatted += ' ' + digits.substring(2, 5);
        }
        if (digits.length >= 7) {
            formatted += ' ' + digits.substring(5, 7);
        }
        if (digits.length >= 9) {
            formatted += ' ' + digits.substring(7, 9);
        }
        
        input.value = formatted;
    }
}

// Phone validation
function isValidPhone(phone) {
    // Убираем все пробелы и проверяем формат
    const cleanPhone = phone.replace(/\s/g, '');
    // Проверяем что номер начинается с +998 и содержит 9 цифр после кода страны
    return /^\+998\d{9}$/.test(cleanPhone);
}

// Download CV function
function downloadCV() {
    showNotification('Подготовка CV для скачивания...', 'info');
    
    // Simulate CV download
    setTimeout(() => {
        showNotification('CV успешно скачан!', 'success');
        
        // Create a dummy CV file for download
        const cvContent = `
Saidkamolxon fullstack developer 

ОБРАЗОВАНИЕ:
- INHA UNIVERSITY
- ITSTEP ACADEMY

НАВЫКИ:
Frontend: React.js (95%), Vue.js (90%), Angular (85%), TypeScript (92%)
Backend: Node.js (93%), Python (88%), PHP (85%), Java (80%)
Базы данных: MongoDB (90%), PostgreSQL (87%), AWS (85%), Docker (88%)

ОПЫТ РАБОТЫ:
2022-настоящее время: Senior Full-Stack Developer, TechCorp Solutions
2020-2022: Frontend Team Lead, Digital Innovations
2018-2020: Full-Stack Developer, StartupHub
2016-2018: Junior Developer, WebStudio Pro

ПРОЕКТЫ:
- Luxury E-commerce Platform (React, Node.js, MongoDB)
- FinTech Mobile App (React Native, Firebase, AI)
- Analytics Dashboard (Vue.js, Python, Big Data)
- Fitness Tracker App (Flutter, Firebase)
- Restaurant Booking Platform (Angular, Laravel)
- AI Chat Assistant (React, Python, OpenAI)

КОНТАКТЫ:
Email: saidkamolagzamov7@gmail.com
Телефон: +998 95 001 37 16 
GitHub: github.com/Saidkamol......
LinkedIn: linkedin.com/in/saidkamol
        `;
        
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Saidkamolxon_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Floating cards animation enhancement
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) rotate(2deg)';
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.zIndex = '';
    });
});

// Typing effect for hero title
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Smooth reveal animation for service cards
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    serviceObserver.observe(card);
});

// Timeline animation
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 300);
        }
    });
}, { threshold: 0.1 });

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    
    .loading.hidden {
        opacity: 0;
        pointer-events: none;
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyles);

// Create loading screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading';
loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
document.body.appendChild(loadingScreen);

// Hide loading screen when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
});



// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16));

// Add section header animations
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    headerObserver.observe(header);
});

// Add skill item hover effects
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
        item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// Add floating shapes animation
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    shape.addEventListener('mouseenter', () => {
        shape.style.transform = 'scale(1.2) rotate(45deg)';
        shape.style.opacity = '0.3';
    });
    
    shape.addEventListener('mouseleave', () => {
        shape.style.transform = '';
        shape.style.opacity = '0.1';
    });
});

console.log('🚀 Саид Камол - Премиум веб-разработчик');
console.log('✨ Портфолио сайт загружен успешно!');
console.log('📧 Email: said.kamol@example.com');
console.log('📱 Телефон: +7 (999) 123-45-67');

// Education logos animation
function animateEducationLogos() {
    const logos = document.querySelectorAll('.education-logo');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    logos.forEach(logo => {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        logo.style.transition = 'all 0.6s ease';
        observer.observe(logo);
    });
}

// Enhanced mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Enhanced touch interactions for mobile
function initTouchOptimizations() {
    if ('ontouchstart' in window) {
        // Add touch-specific classes
        document.body.classList.add('touch-device');
        
        // Optimize hover effects for touch devices
        const hoverElements = document.querySelectorAll('.portfolio-item, .service-card, .skill-item');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
}

// Enhanced responsive image loading
function initResponsiveImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });
}

// Enhanced scroll performance
function initScrollOptimizations() {
    let ticking = false;
    
    function updateScroll() {
        ticking = false;
        
        // Update scroll-based animations
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes, .particles');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Enhanced form validation for mobile
function initMobileFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('error');
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (input.hasAttribute('required') && input.value.trim() === '') {
                    input.classList.add('error');
                    isValid = false;
                }
            });
            
            if (isValid) {
                showNotification('Сообщение отправлено!', 'success');
                form.reset();
            } else {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            }
        });
    }
}

// Initialize phone formatting
function initPhoneFormatting() {
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
        
        // Устанавливаем курсор после +998 при фокусе
        phoneInput.addEventListener('focus', function() {
            if (this.value === '+998 ') {
                this.setSelectionRange(5, 5); // Ставим курсор после +998 
            }
        });
    }
}

// Theme toggle logic
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
    // Init theme from localStorage or system
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved ? saved : (prefersDark ? 'dark' : 'light'));
    // Add event
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);
});

// --- MULTILANGUAGE LOGIC ---
async function loadTranslations() {
  const res = await fetch('translations.json');
  return await res.json();
}

function setLanguage(lang, translations) {
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
}

window.addEventListener('DOMContentLoaded', async () => {
  const translations = await loadTranslations();
  const savedLang = localStorage.getItem('lang') || 'ru';
  setLanguage(savedLang, translations);
  document.getElementById('lang-ru').onclick = () => setLanguage('ru', translations);
  document.getElementById('lang-en').onclick = () => setLanguage('en', translations);
});

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Existing initializations
    initTypingEffect();
    initScrollAnimations();
    initPortfolioFilters();
    initContactForm();
    initBackToTop();
    initCursorTrail();
    initFloatingShapes();
    initParticles();
    
    // New enhanced features
    initPhoneFormatting();
    animateEducationLogos();
    initMobileMenu();
    initTouchOptimizations();
    initResponsiveImages();
    initScrollOptimizations();
    initMobileFormValidation();
    
    // Enhanced intersection observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Quote system
const quotes = [
    {
        text: "Лучший код — это тот, который легко читать и понимать. Пишите код так, как будто его будет поддерживать психопат, который знает, где вы живете.",
        author: "Джон Вудс"
    },
    {
        text: "Программирование — это искусство создания чего-то из ничего и затем продажи этого.",
        author: "Митч Кейпор"
    },
    {
        text: "Любой дурак может написать код, который компьютер поймет. Хорошие программисты пишут код, который люди могут понять.",
        author: "Мартин Фаулер"
    },
    {
        text: "Иногда лучшее, что можно сделать — это начать заново.",
        author: "Стив Джобс"
    },
    {
        text: "Код никогда не лжет, комментарии иногда.",
        author: "Рон Джеффрис"
    },
    {
        text: "Программирование — это не о том, чтобы знать все. Это о том, чтобы знать, где найти ответ.",
        author: "Джон Зак"
    },
    {
        text: "Первый принцип: вы можете не знать, что делаете. Это нормально.",
        author: "Линда Райсман"
    },
    {
        text: "Технологии — это то, что уже было изобретено, когда вы родились.",
        author: "Алан Кей"
    },
    {
        text: "Будущее принадлежит тем, кто верит в красоту своих мечтаний.",
        author: "Элеонора Рузвельт"
    },
    {
        text: "Успех — это способность шагать от одной неудачи к другой, не теряя энтузиазма.",
        author: "Уинстон Черчилль"
    }
];

// Старая функциональность цитат удалена - теперь используется новая система



// Calculator Logic
const prices = {
    website: { simple: 500, medium: 1200, complex: 2500, expert: 5000 },
    app: { simple: 800, medium: 2000, complex: 4000, expert: 8000 },
    bot: { simple: 200, medium: 500, complex: 1000, expert: 2000 },
    api: { simple: 400, medium: 1000, complex: 2500, expert: 5000 },
    custom: { simple: 1000, medium: 2500, complex: 5000, expert: 10000 }
};

const addons = {
    design: 300,
    seo: 200,
    support: 150,
    hosting: 100
};

function calculatePrice() {
    const projectType = document.getElementById('projectType').value;
    const complexity = document.getElementById('complexity').value;
    const timeline = parseInt(document.getElementById('timeline').value) || 14;
    
    if (!projectType || !complexity) {
        showPlaceholder();
        return;
    }
    
    let basePrice = prices[projectType][complexity];
    
    // Сложность влияет на цену
    const complexityMultiplier = {
        simple: 1,
        medium: 1.2,
        complex: 1.5,
        expert: 2
    };
    
    basePrice *= complexityMultiplier[complexity];
    
    // Сроки влияют на цену
    const timelineMultiplier = timeline <= 7 ? 1.3 : timeline <= 14 ? 1.1 : 1;
    basePrice *= timelineMultiplier;
    
    // Дополнительные функции
    let addonsPrice = 0;
    const addonItems = [];
    
    if (document.getElementById('design').checked) {
        addonsPrice += addons.design;
        addonItems.push('Дизайн');
    }
    if (document.getElementById('seo').checked) {
        addonsPrice += addons.seo;
        addonItems.push('SEO');
    }
    if (document.getElementById('support').checked) {
        addonsPrice += addons.support;
        addonItems.push('Поддержка');
    }
    if (document.getElementById('hosting').checked) {
        addonsPrice += addons.hosting;
        addonItems.push('Хостинг');
    }
    
    const totalPrice = basePrice + addonsPrice;
    
    displayPrice(totalPrice, basePrice, addonsPrice, addonItems, timeline);
}

function displayPrice(total, base, addons, addonItems, timeline) {
    const resultDiv = document.getElementById('calculatorResult');
    
    const complexityText = {
        simple: 'Простая',
        medium: 'Средняя', 
        complex: 'Сложная',
        expert: 'Экспертная'
    };
    
    const projectText = {
        website: 'Веб-сайт',
        app: 'Мобильное приложение',
        bot: 'Telegram бот',
        api: 'API/Backend',
        custom: 'Кастомное решение'
    };
    
    const projectType = document.getElementById('projectType').value;
    const complexity = document.getElementById('complexity').value;
    
    resultDiv.innerHTML = `
        <div class="price-display">$${total.toLocaleString()}</div>
        <div class="price-breakdown">
            <p><strong>${projectText[projectType]}</strong> (${complexityText[complexity]})</p>
            <p>Базовая стоимость: $${base.toLocaleString()}</p>
            ${addonItems.length > 0 ? `<p>Дополнительно: ${addonItems.join(', ')} - $${addons.toLocaleString()}</p>` : ''}
            <p>Сроки: ${timeline} дней</p>
        </div>
    `;
    
    // Анимация появления
    resultDiv.style.opacity = '0';
    resultDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        resultDiv.style.transition = 'all 0.5s ease';
        resultDiv.style.opacity = '1';
        resultDiv.style.transform = 'translateY(0)';
    }, 100);
}

function showPlaceholder() {
    const resultDiv = document.getElementById('calculatorResult');
    resultDiv.innerHTML = `
        <div class="result-placeholder">
            <i class="fas fa-arrow-up"></i>
            <p>Выберите параметры для расчета</p>
        </div>
    `;
}

function getDiscount() {
    const resultDiv = document.getElementById('calculatorResult');
    const priceDisplay = resultDiv.querySelector('.price-display');
    
    if (!priceDisplay) {
        alert('Сначала рассчитайте стоимость проекта!');
        return;
    }
    
    const currentPrice = parseInt(priceDisplay.textContent.replace(/[^0-9]/g, ''));
    const discount = Math.floor(currentPrice * 0.15); // 15% скидка
    const finalPrice = currentPrice - discount;
    
    // Анимация скидки
    priceDisplay.style.transform = 'scale(1.1)';
    priceDisplay.style.color = '#10b981';
    
    setTimeout(() => {
        priceDisplay.innerHTML = `
            <div style="text-decoration: line-through; color: #ef4444; font-size: 1.5rem;">$${currentPrice.toLocaleString()}</div>
            <div style="color: #10b981; font-size: 2rem;">$${finalPrice.toLocaleString()}</div>
        `;
        priceDisplay.style.transform = 'scale(1)';
        
        // Показываем код скидки
        const discountCode = 'CALC15OFF';
        resultDiv.innerHTML += `
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.3);">
                <p style="margin: 0; color: #10b981; font-weight: 600;">🎉 Скидка 15% применена!</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: var(--text-secondary);">Код: <strong>${discountCode}</strong></p>
            </div>
        `;
        
        // Конфетти эффект
        showSuccessAnimation();
    }, 500);
}

// Quote functionality for the new quote section
const quoteData = [
    {
        text: "Успех — это способность шагать от одной неудачи к другой, не теряя энтузиазма.",
        author: "Уинстон Черчилль",
        title: "Премьер-министр Великобритании"
    }
];

// Убираем навигацию и автоматическое переключение, так как цитата одна
document.addEventListener('DOMContentLoaded', () => {
    // Скрываем навигационные элементы
    const quoteNav = document.querySelector('.quote-navigation');
    if (quoteNav) {
        quoteNav.style.display = 'none';
    }
});

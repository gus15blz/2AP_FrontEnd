// About Page JavaScript

// Toggle de tema
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

// Atualizar ícone do tema
function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    const isDark = document.body.classList.contains('dark-theme');
    const icon = themeToggle.querySelector('i');
    
    if (isDark) {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Alternar para tema claro';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Alternar para tema escuro';
    }
}

// Carregar tema salvo
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    updateThemeIcon();
}

// Animações de entrada
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.developer-card, .stat-card, .tech-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contador animado das estatísticas
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-content h3');
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000) {
                element.textContent = Math.floor(current) + '+';
            } else if (target >= 5) {
                element.textContent = Math.floor(current) + '★';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    // Animar contadores quando visíveis
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const text = statNumber.textContent;
                
                if (text.includes('+')) {
                    animateCounter(statNumber, 1000);
                } else if (text.includes('★')) {
                    animateCounter(statNumber, 5);
                } else {
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateCounter(statNumber, number);
                    }
                }
                
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Efeito parallax no hero
function setupParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.about-hero');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Hover effects para cards
function setupHoverEffects() {
    const developerCards = document.querySelectorAll('.developer-card');
    
    developerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Smooth scroll para links internos
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página Sobre Nós carregada!');
    
    // Carregar tema
    loadTheme();
    
    // Toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Configurar animações
    setupAnimations();
    
    // Animar contadores
    animateCounters();
    
    // Configurar parallax
    setupParallax();
    
    // Configurar hover effects
    setupHoverEffects();
    
    // Configurar smooth scroll
    setupSmoothScroll();
    
    // Animações de entrada da página
    const aboutContainer = document.querySelector('.about-hero');
    if (aboutContainer) {
        aboutContainer.style.opacity = '0';
        aboutContainer.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            aboutContainer.style.transition = 'all 0.8s ease';
            aboutContainer.style.opacity = '1';
            aboutContainer.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Efeito de digitação no título
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    // Adicionar efeito de partículas no background (opcional)
    createParticles();
});

// Função para criar partículas de fundo
function createParticles() {
    const heroSection = document.querySelector('.about-hero');
    if (!heroSection) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        heroSection.appendChild(particle);
    }
}

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const header = document.getElementById('header');
const loading = document.getElementById('loading');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Menu Toggle
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Counter Animation
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(statsSection);
}

// Modal Functionality
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

// Project Data
const projects = {
    project1: {
        title: 'Painel de Controle Industrial',
        image: 'assets/images/IMG_0515.jpeg',
        description: 'Sistema avançado de automação industrial com interface HMI (Human Machine Interface) para controle e monitoramento de processos industriais. O painel conta com display colorido, botões de comando e indicadores luminosos para operação segura e eficiente.',
        features: [
            'Interface HMI com display colorido',
            'Botões de emergência e controle',
            'Indicadores luminosos de status',
            'Sistema de monitoramento em tempo real',
            'Conformidade com normas de segurança'
        ],
        category: 'Automação Industrial'
    },
    project2: {
        title: 'Subestação Elétrica',
        image: 'assets/images/IMG_0518.jpeg',
        description: 'Instalação completa de subestação elétrica com equipamentos de alta tensão, sistemas de proteção e sinalização de segurança. Projeto executado seguindo rigorosamente as normas técnicas e de segurança.',
        features: [
            'Equipamentos de alta tensão',
            'Sistemas de proteção avançados',
            'Sinalização de segurança',
            'Aterramento e proteção',
            'Conformidade com NR-10'
        ],
        category: 'Elétrica Industrial'
    },
    project3: {
        title: 'Painel Elétrico Industrial',
        image: 'assets/images/IMG_0517.jpeg',
        description: 'Painel elétrico industrial com sistema de controle e comando, incluindo chaves de operação, indicadores e dispositivos de proteção. Instalação com foco na segurança operacional.',
        features: [
            'Chaves de controle e comando',
            'Dispositivos de proteção',
            'Indicadores de status',
            'Sistema de intertravamento',
            'Manutenção facilitada'
        ],
        category: 'Elétrica Industrial'
    },
    project4: {
        title: 'Sala Técnica Industrial',
        image: 'assets/images/IMG_0519.jpeg',
        description: 'Instalação completa de sala técnica com equipamentos elétricos especializados, incluindo inversores, controladores e sistemas de automação para ambiente industrial.',
        features: [
            'Equipamentos especializados',
            'Sistemas de automação',
            'Controle de temperatura',
            'Organização de cabos',
            'Acesso controlado'
        ],
        category: 'Elétrica Industrial'
    },
    project5: {
        title: 'Quadro Elétrico Industrial',
        image: 'assets/images/IMG_0522.jpeg',
        description: 'Quadro elétrico industrial completo com disjuntores, dispositivos de proteção e sistema de distribuição elétrica. Instalação organizada e segura para ambiente industrial.',
        features: [
            'Disjuntores de proteção',
            'Sistema de distribuição',
            'Organização de circuitos',
            'Identificação clara',
            'Fácil manutenção'
        ],
        category: 'Elétrica Industrial'
    },
    project6: {
        title: 'Equipamentos de Alta Tensão',
        image: 'assets/images/IMG_0520.jpeg',
        description: 'Instalação de equipamentos de alta tensão com todos os sistemas de segurança necessários, incluindo sinalização, proteções e acesso controlado conforme normas técnicas.',
        features: [
            'Equipamentos de alta tensão',
            'Sinalização de segurança',
            'Proteções adequadas',
            'Acesso controlado',
            'Conformidade normativa'
        ],
        category: 'Elétrica Industrial'
    }
};

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #d4af37; margin-bottom: 10px;">${project.title}</h2>
            <p style="color: #666; margin-bottom: 10px;"><strong>Categoria:</strong> ${project.category}</p>
            <p style="line-height: 1.6; margin-bottom: 20px;">${project.description}</p>
            <h3 style="color: #333; margin-bottom: 15px;">Características do Projeto:</h3>
            <ul style="list-style: none; padding: 0;">
                ${project.features.map(feature => `
                    <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                        <span style="position: absolute; left: 0; color: #d4af37; font-weight: bold;">✓</span>
                        ${feature}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Video Lazy Loading
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.addEventListener('loadstart', () => {
        video.style.opacity = '1';
    });
});

// Form Validation (if contact form exists)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Here you would typically send the form data to a server
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #d4af37;
    color: #000;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images
    const criticalImages = [
        'assets/images/logo.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// Error Handling for Videos
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('error', (e) => {
        console.warn('Erro ao carregar vídeo:', e.target.src);
        const container = e.target.parentElement;
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 250px; background: #f0f0f0; color: #666;">
                    <p>Vídeo não disponível</p>
                </div>
            `;
        }
    });
});

// Console Welcome Message
console.log(`
🎉 Site A.S Prestador carregado com sucesso!
⚡ Desenvolvido com tecnologias modernas
🔧 Automação | Elétrica | Climatização
`);

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;


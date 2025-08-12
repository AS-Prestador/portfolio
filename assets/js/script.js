// ======== script.js (com fix hamburger iPhone) ========
// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-slide');
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');

// Portfolio Carousel Elements
const carousel = document.getElementById('portfolio-carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
const totalSlides = portfolioItems.length;
let slidesToShow = 3; // Número de slides visíveis por vez

// Mobile Navigation
if (hamburger) {
  hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
  });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// iPhone/Safari: garantir toque no hamburger + fechar ao tocar fora
(function(){
  if(!hamburger || !navMenu) return;
  const toggle = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
  };
  // fallback touch
  hamburger.addEventListener('touchend', toggle, {passive:false});

  // fechar ao tocar fora
  document.addEventListener('click', (e)=>{
    if(!navMenu.classList.contains('active')) return;
    if(!navMenu.contains(e.target) && !hamburger.contains(e.target)){
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // fechar ao clicar no link dentro do menu
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', ()=>{
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
})();

// Portfolio Carousel Functionality
function updateCarousel() {
    const slideWidth = 100 / slidesToShow;
    const translateX = -(currentSlide * slideWidth);
    if (carousel) carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Update button states
    if (prevBtn) prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    if (nextBtn) nextBtn.style.opacity = currentSlide >= totalSlides - slidesToShow ? '0.5' : '1';
}

function nextSlide() {
    if (currentSlide < totalSlides - slidesToShow) {
        currentSlide++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex <= totalSlides - slidesToShow) {
        currentSlide = slideIndex;
        updateCarousel();
    }
}

// Event listeners for carousel
prevBtn?.addEventListener('click', prevSlide);
nextBtn?.addEventListener('click', nextSlide);

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
});

// Auto-play carousel (opcional)
let autoPlayInterval;
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        if (currentSlide >= totalSlides - slidesToShow) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateCarousel();
    }, 5000); // Muda slide a cada 5 segundos
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Pause auto-play on hover
carousel?.addEventListener('mouseenter', stopAutoPlay);
carousel?.addEventListener('mouseleave', startAutoPlay);

// Portfolio Filtering (adaptado para carrossel)
portfolioFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        portfolioFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');
        
        const filterValue = filter.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Reset carousel position after filtering
        currentSlide = 0;
        updateCarousel();
    });
});

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    startAutoPlay();
    
    // Responsive carousel
    function updateSlidesToShow() {
        const width = window.innerWidth;
        if (width <= 480) {
            slidesToShow = 1;
        } else if (width <= 768) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
        updateCarousel();
    }
    
    window.addEventListener('resize', updateSlidesToShow);
    updateSlidesToShow();
});

// Modal functionality
function openModal(projectId) {
    const projectData = getProjectData(projectId);
    modalContent.innerHTML = createModalContent(projectData);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal?.addEventListener('click', closeModalFunc);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Project data (can be expanded with real project information)
function getProjectData(projectId) {
    const projects = {
        project1: {
            title: 'Sistema de Automação Industrial',
            description: 'Implementação completa de sistema automatizado para indústria alimentícia, incluindo controle de processos, monitoramento em tempo real e integração com sistemas existentes.',
            technologies: ['PLC Siemens', 'SCADA', 'HMI', 'Sensores Industriais'],
            duration: '3 meses',
            client: 'Indústria Alimentícia XYZ',
            images: ['assets/images/automacao-industrial.jpg'],
            challenges: 'Integração com sistemas legados e minimização do tempo de parada da produção.',
            results: 'Aumento de 35% na eficiência produtiva e redução de 50% nos erros operacionais.'
        },
        project2: {
            title: 'Instalação Elétrica Comercial',
            description: 'Projeto completo de instalação elétrica para complexo comercial de 5.000m², incluindo sistema de iluminação LED, quadros de distribuição e sistema de emergência.',
            technologies: ['Quadros Elétricos', 'Iluminação LED', 'Sistema de Emergência', 'Automação Predial'],
            duration: '2 meses',
            client: 'Shopping Center ABC',
            images: ['assets/images/instalacoes-eletricas.jpg'],
            challenges: 'Adequação às normas de segurança e eficiência energética.',
            results: 'Redução de 40% no consumo energético e certificação de segurança aprovada.'
        },
        project3: {
            title: 'Sistema de Climatização HVAC',
            description: 'Instalação de sistema HVAC completo para edifício corporativo, incluindo controle de temperatura, umidade e qualidade do ar em todos os ambientes.',
            technologies: ['Sistema HVAC', 'Controle Automático', 'Sensores de Qualidade do Ar', 'Eficiência Energética'],
            duration: '4 meses',
            client: 'Edifício Corporativo DEF',
            images: ['assets/images/climatizacao.webp'],
            challenges: 'Balanceamento térmico e controle de umidade em diferentes zonas.',
            results: 'Melhoria de 60% na qualidade do ar e redução de 30% nos custos operacionais.'
        }
    };
    
    return projects[projectId] || {};
}

function createModalContent(project) {
    return `
        <h2>${project.title}</h2>
        <div class="project-details">
            <div class="project-image">
                <img src="${project.images[0]}" alt="${project.title}" style="width: 100%; border-radius: 8px; margin-bottom: 2rem;">
            </div>
            <div class="project-info">
                <p><strong>Descrição:</strong> ${project.description}</p>
                <p><strong>Cliente:</strong> ${project.client}</p>
                <p><strong>Duração:</strong> ${project.duration}</p>
                <p><strong>Desafios:</strong> ${project.challenges}</p>
                <p><strong>Resultados:</strong> ${project.results}</p>
                <div class="technologies">
                    <strong>Tecnologias Utilizadas:</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                        ${project.technologies.map(tech => `<span style="background: var(--primary-color); color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.9rem;">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Contact Form
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
    contactForm.reset();
});

// Scroll animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Export functions for external use
window.addVideo = function addVideo(){};
window.addPortfolioImage = function addPortfolioImage(){};
window.updateContactInfo = function updateContactInfo(){};
window.openModal = openModal;

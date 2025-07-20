// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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

// Portfolio Filtering
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
    });
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

closeModal.addEventListener('click', closeModalFunc);

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
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
    
    // Reset form
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

// Function to add video to the videos section
function addVideo(videoSrc, title, description) {
    const videosGrid = document.getElementById('videos-grid');
    const placeholder = videosGrid.querySelector('.video-placeholder');
    
    // Remove placeholder if it exists
    if (placeholder) {
        placeholder.remove();
    }
    
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.innerHTML = `
        <video controls>
            <source src="${videoSrc}" type="video/mp4">
            Seu navegador não suporta o elemento de vídeo.
        </video>
        <div class="video-info" style="padding: 1rem; background: white;">
            <h4>${title}</h4>
            <p>${description}</p>
        </div>
    `;
    
    videosGrid.appendChild(videoItem);
}

// Function to add image to portfolio
function addPortfolioImage(imageSrc, title, description, category) {
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.setAttribute('data-category', category);
    portfolioItem.innerHTML = `
        <div class="portfolio-image">
            <img src="${imageSrc}" alt="${title}">
            <div class="portfolio-overlay">
                <div class="portfolio-info">
                    <h4>${title}</h4>
                    <p>${description}</p>
                    <button class="view-project" onclick="openCustomModal('${title}', '${description}', '${imageSrc}')">Ver Detalhes</button>
                </div>
            </div>
        </div>
    `;
    
    portfolioGrid.appendChild(portfolioItem);
}

// Function to open custom modal for user-added content
function openCustomModal(title, description, imageSrc) {
    const customContent = `
        <h2>${title}</h2>
        <div class="project-details">
            <div class="project-image">
                <img src="${imageSrc}" alt="${title}" style="width: 100%; border-radius: 8px; margin-bottom: 2rem;">
            </div>
            <div class="project-info">
                <p>${description}</p>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = customContent;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Utility function to update contact information
function updateContactInfo(phone, email, address) {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        const details = item.querySelector('.contact-details p');
        
        if (icon.classList.contains('fa-phone') && phone) {
            details.textContent = phone;
        } else if (icon.classList.contains('fa-envelope') && email) {
            details.textContent = email;
        } else if (icon.classList.contains('fa-map-marker-alt') && address) {
            details.textContent = address;
        }
    });
    
    // Update footer contact info
    const footerContact = document.querySelector('.footer-contact p');
    if (phone || email || address) {
        let contactText = '';
        if (phone) contactText += `Tel: ${phone} `;
        if (email) contactText += `Email: ${email} `;
        if (address) contactText += `Endereço: ${address}`;
        footerContact.textContent = contactText;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('A.S Prestador Portfolio loaded successfully!');
});

// Export functions for external use (if needed)
window.addVideo = addVideo;
window.addPortfolioImage = addPortfolioImage;
window.updateContactInfo = updateContactInfo;
window.openModal = openModal;


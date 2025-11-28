/**
 * VetPraxis Landing - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initFloatingCTA();
  initSmoothScroll();
  initMasterclassSelector();
  initInscriptionModal();
});

/**
 * Masterclass content data
 */
const masterclassData = {
  1: {
    label: 'Clase 1 de 5',
    title: 'Finanzas para Clínicas Veterinarias',
    desc: 'Aprende a elaborar un presupuesto anual paso a paso, controlar tus gastos de forma efectiva, planificar compras estratégicas y tomar decisiones financieras más inteligentes. Descubre cómo proyectar ingresos, identificar gastos innecesarios y crear un plan financiero sólido para el 2026.',
    features: ['Presupuesto anual', 'Control de gastos', 'Plantilla incluida']
  },
  2: {
    label: 'Clase 2 de 5',
    title: 'Marketing Digital para Veterinarias',
    desc: 'Descubre estrategias simples y efectivas para atraer nuevos clientes sin gastar de más. Aprenderás a mejorar tu presencia en redes sociales, crear contenido que conecte con los tutores de mascotas, y técnicas de marketing local que realmente funcionan para clínicas veterinarias.',
    features: ['Redes sociales', 'Marketing local', 'Contenido efectivo']
  },
  3: {
    label: 'Clase 3 de 5',
    title: 'Fidelización de Clientes',
    desc: 'Aprende las técnicas más efectivas para que tus clientes regresen una y otra vez, y además recomienden tu clínica. Descubrirás cómo crear programas de fidelidad, reducir las ausencias a citas, mejorar la comunicación con los tutores y generar recomendaciones orgánicas.',
    features: ['Programas de fidelidad', 'Reducir ausencias', 'Más recomendaciones']
  },
  4: {
    label: 'Clase 4 de 5',
    title: 'Control Financiero e Inventario',
    desc: 'Domina tu flujo de caja y aprende a controlar tu inventario de manera eficiente. Te enseñamos a entender tus números sin ser contador, evitar pérdidas por vencimientos, optimizar tus compras y tener siempre el stock necesario sin sobrecostos.',
    features: ['Flujo de caja', 'Control de inventario', 'Evitar pérdidas']
  },
  5: {
    label: 'Clase 5 de 5',
    title: 'Procesos Clínicos Inteligentes',
    desc: 'Optimiza la atención en tu clínica con procesos simples y efectivos. Aprende a estandarizar consultas, cirugías e internamientos, mejorar los tiempos de atención, reducir errores y ofrecer una experiencia excepcional a cada paciente y tutor que te visite.',
    features: ['Procesos estandarizados', 'Mejor atención', 'Menos errores']
  }
};

/**
 * Header scroll effect
 */
function initHeader() {
  const header = document.getElementById('header');
  
  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');
  
  mobileMenuBtn.addEventListener('click', function() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  });
  
  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(function(element) {
    observer.observe(element);
  });
}

/**
 * Floating CTA visibility
 */
function initFloatingCTA() {
  const floatingCTA = document.getElementById('floatingCta');
  const closeBtn = document.getElementById('floatingCtaClose');
  let isDismissed = false;
  
  function handleScroll() {
    if (isDismissed) return;
    
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Show after scrolling past 80% of the first viewport
    if (scrollPosition > windowHeight * 0.8) {
      floatingCTA.classList.remove('hidden');
      floatingCTA.classList.add('visible');
    } else {
      floatingCTA.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Close button
  closeBtn.addEventListener('click', function() {
    isDismissed = true;
    floatingCTA.classList.remove('visible');
    setTimeout(function() {
      floatingCTA.classList.add('hidden');
    }, 500);
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Masterclass selector functionality
 */
function initMasterclassSelector() {
  const dateItems = document.querySelectorAll('.date-item');
  const contentLabel = document.getElementById('contentLabel');
  const contentTitle = document.getElementById('contentTitle');
  const contentDesc = document.getElementById('contentDesc');
  const contentFeatures = document.getElementById('contentFeatures');
  const windowContent = document.getElementById('windowContent');
  
  if (!dateItems.length || !contentLabel) return;
  
  dateItems.forEach(function(item) {
    item.addEventListener('click', function() {
      const classNum = this.getAttribute('data-class');
      const data = masterclassData[classNum];
      
      if (!data) return;
      
      // Remove active from all
      dateItems.forEach(function(d) {
        d.classList.remove('active');
      });
      
      // Add active to clicked
      this.classList.add('active');
      
      // Add transition class
      windowContent.classList.add('content-changing');
      
      // Update content after small delay for animation
      setTimeout(function() {
        contentLabel.textContent = data.label;
        contentTitle.textContent = data.title;
        contentDesc.textContent = data.desc;
        
        // Update features
        contentFeatures.innerHTML = data.features.map(function(feature) {
          return '<div class="feature-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>' + feature + '</div>';
        }).join('');
        
        // Remove transition class
        windowContent.classList.remove('content-changing');
      }, 150);
    });
  });
}

/**
 * Inscription Modal functionality
 */
function initInscriptionModal() {
  const modal = document.getElementById('inscriptionModal');
  const modalClose = document.getElementById('modalClose');
  const form = document.getElementById('inscriptionForm');
  const submitBtn = document.getElementById('submitBtn');
  const modalSuccess = document.getElementById('modalSuccess');
  const successClose = document.getElementById('successClose');
  
  if (!modal || !form) return;
  
  // Open modal when clicking inscription links
  const inscriptionLinks = document.querySelectorAll('a[href="#inscripcion"]');
  inscriptionLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });
  
  // Close modal handlers
  modalClose.addEventListener('click', closeModal);
  successClose.addEventListener('click', closeModal);
  
  // Close on overlay click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      country: document.getElementById('country').value,
      company: document.getElementById('company').value,
      phone: '99999999999',
      source_page: 'vetpraxis conferencia virtual',
      message: 'no aplica',
      assigned_to: 1
    };
    
    try {
      const response = await fetch('https://api-leads-roan.vercel.app/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Show success state
        form.style.display = 'none';
        modalSuccess.style.display = 'block';
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar tu inscripción. Por favor intenta de nuevo.');
      
      // Reset button state
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
  
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form after closing
    setTimeout(function() {
      form.reset();
      form.style.display = 'flex';
      modalSuccess.style.display = 'none';
      
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }, 300);
  }
}


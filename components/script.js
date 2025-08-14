// JavaScript Functions

// Toggle Dropdown Menu
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    
    // Close all other dropdowns
    allDropdowns.forEach(dd => {
        if (dd !== dropdown) {
            dd.classList.remove('show');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('show');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});

// Interactive Button Handler
let clickCount = 0;
function handleButtonClick(button) {
    clickCount++;
    button.classList.add('clicked');
    
    const statusDiv = document.getElementById('buttonStatus');
    const messages = [
        '¡Genial! Has hecho clic en el botón.',
        '¡Increíble! Segundo clic detectado.',
        '¡Fantástico! Te gusta hacer clic.',
        '¡Impresionante! Eres todo un clicker.',
        '¡Wow! Ya perdí la cuenta de tus clics.'
    ];
    
    const messageIndex = Math.min(clickCount - 1, messages.length - 1);
    statusDiv.textContent = messages[messageIndex];
    statusDiv.className = 'status-message info show';
    
    // Reset button color after animation
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 600);
    
    // Hide status message after 3 seconds
    setTimeout(() => {
        statusDiv.classList.remove('show');
    }, 3000);
}

// Form Submit Handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const statusDiv = document.getElementById('formStatus');
    const formData = new FormData(event.target);
    
    // Show loading message
    statusDiv.textContent = 'Enviando mensaje...';
    statusDiv.className = 'status-message info show';
    
    // Simulate form processing
    setTimeout(() => {
        statusDiv.textContent = '¡Mensaje enviado exitosamente! Te contactaremos pronto.';
        statusDiv.className = 'status-message success show';
        
        // Reset form
        event.target.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            statusDiv.classList.remove('show');
        }, 5000);
    }, 1500);
}

// Add some interactive effects on page load
document.addEventListener('DOMContentLoaded', function() {
    // Animate cards on scroll
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });

    // Initialize floating shapes animation after page load
    initializeFloatingShapes();
});

// Initialize floating shapes with random positions and animations
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Add random delay to make animations more natural
        const delay = Math.random() * 2;
        shape.style.animationDelay = `${delay}s`;
        
        // Add subtle opacity variation
        const opacity = 0.1 + Math.random() * 0.1;
        shape.style.background = `rgba(255, 255, 255, ${opacity})`;
    });
}

// Add floating animation to interactive button
setInterval(() => {
    const button = document.querySelector('.interactive-btn:not(.clicked)');
    if (button) {
        button.style.transform = 'translateY(-3px)';
        setTimeout(() => {
            button.style.transform = 'translateY(0)';
        }, 1000);
    }
}, 3000);

// Add dynamic background effects
function addDynamicEffects() {
    // Create additional moving elements
    const numParticles = 3;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: ${10 + Math.random() * 20}px;
            height: ${10 + Math.random() * 20}px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation: floatRandom ${15 + Math.random() * 10}s ease-in-out infinite;
        `;
        document.body.appendChild(particle);
    }
}

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-shape');
    
    parallax.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Enhanced dropdown functionality with keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close all dropdowns on ESC key
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
        
        // Close modal on ESC key
        closeModal();
    }
});

// Modal Functions
function openModal() {
    const modal = document.getElementById('magicModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add entrance animation to modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
}

function closeModal() {
    const modal = document.getElementById('magicModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Reset magic button state
    const magicBtn = document.querySelector('.modal-action-btn');
    magicBtn.classList.remove('magic-active');
    magicBtn.textContent = '✨ Activar Magia Especial';
}

function triggerMagicEffect() {
    const magicBtn = document.querySelector('.modal-action-btn');
    const magicCircles = document.querySelectorAll('.magic-circle');
    
    if (magicBtn.classList.contains('magic-active')) {
        // Deactivate magic
        magicBtn.classList.remove('magic-active');
        magicBtn.textContent = '✨ Activar Magia Especial';
        
        magicCircles.forEach(circle => {
            circle.style.animation = 'magicSpin 3s linear infinite';
        });
        
        showMagicMessage('Magia desactivada 😴', 'info');
    } else {
        // Activate magic
        magicBtn.classList.add('magic-active');
        magicBtn.textContent = '🌟 Magia Activada - Clic para Desactivar';
        
        // Enhance magic circles animation
        magicCircles.forEach((circle, index) => {
            circle.style.animation = `magicSpin 1s linear infinite`;
            circle.style.borderWidth = '4px';
            circle.style.filter = 'drop-shadow(0 0 10px currentColor)';
        });
        
        showMagicMessage('¡Magia activada! ✨🎆🌟', 'success');
        
        // Create magical particles
        createMagicalParticles();
    }
}

function showMagicMessage(message, type) {
    // Create temporary message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 2000);
}

function createMagicalParticles() {
    const modal = document.querySelector('.modal-content');
    const numParticles = 15;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${4 + Math.random() * 8}px;
            height: ${4 + Math.random() * 8}px;
            background: hsl(${Math.random() * 360}, 70%, 60%);
            border-radius: 50%;
            pointer-events: none;
            top: 50%;
            left: 50%;
            animation: particleFloat ${2 + Math.random() * 3}s ease-out forwards;
            z-index: 100;
        `;
        modal.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 5000);
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('magicModal');
    if (event.target === modal) {
        closeModal();
    }
});

// RGB Box hover effects
document.addEventListener('DOMContentLoaded', function() {
    const rgbCard = document.querySelector('.rgb-card');
    const interactiveTag = document.querySelector('.interactive-tag');
    
    if (rgbCard) {
        rgbCard.addEventListener('mouseenter', function() {
            this.style.animationDuration = '1s';
        });
        
        rgbCard.addEventListener('mouseleave', function() {
            this.style.animationDuration = '3s';
        });
    }
    
    // Add extra glow effect to interactive tag
    if (interactiveTag) {
        interactiveTag.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4), 0 0 30px rgba(255, 107, 107, 0.3)';
        });
        
        interactiveTag.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
        });
    }
});

// Add hover effects to navigation items
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.dropdown-btn');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Initialize dynamic effects when page loads
window.addEventListener('load', function() {
    addDynamicEffects();
    
    // Add entrance animation to main container
    const container = document.querySelector('.container');
    container.style.animation = 'fadeIn 1s ease-out';
});
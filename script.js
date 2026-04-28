// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Mobile Navigation Toggle
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

// Navigation and Section Switching
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active nav link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
        
        // Show target section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    });
});

// Prank Handler
function handlePrank(prankType) {
    const prankLinks = {
        'fake-app': 'cashwin-web.vercel.app',
        'fake-warning': 'instawarn.vercel.app',
        'fake-qr': 'https://scanpay-webs.vercel.app/',
        'fake-lottery': 'lotterywin-web.vercel.app'
    };

    const link = prankLinks[prankType];
    
    // Create share modal directly
    createShareModal(prankType, link);
}


// Create Share Modal
function createShareModal(prankType, link) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.share-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeShareModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Share Your Prank!</h3>
                <button class="modal-close" onclick="closeShareModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="prank-info">
                    <div class="prank-icon">
                        <i class="fas ${getPrankIcon(prankType)}"></i>
                    </div>
                    <h4>${getPrankTitle(prankType)}</h4>
                    <p>Share this link with your friends for a hilarious prank!</p>
                </div>
                <div class="share-link-container">
                    <input type="text" id="shareLink" value="${link}" readonly>
                    <button class="copy-btn" onclick="copyLink()">
                        <i class="fas fa-copy"></i>
                        Copy
                    </button>
                </div>
                <div class="share-buttons">
                    <button class="share-btn whatsapp" onclick="shareOnWhatsApp('${link}')">
                        <i class="fab fa-whatsapp"></i>
                        WhatsApp
                    </button>
                    <button class="share-btn telegram" onclick="shareOnTelegram('${link}')">
                        <i class="fab fa-telegram"></i>
                        Telegram
                    </button>
                    <button class="share-btn twitter" onclick="shareOnTwitter('${link}')">
                        <i class="fab fa-twitter"></i>
                        Twitter
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .share-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }

        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }

        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #f0f0f0;
        }

        .modal-header h3 {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 1.5rem;
            font-weight: 600;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-close:hover {
            background: #f0f0f0;
            color: #333;
        }

        .prank-info {
            text-align: center;
            margin-bottom: 2rem;
        }

        .prank-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .prank-icon i {
            font-size: 2rem;
            color: white;
        }

        .prank-info h4 {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
        }

        .prank-info p {
            color: #666;
            line-height: 1.5;
        }

        .share-link-container {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }

        .share-link-container input {
            flex: 1;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-family: inherit;
            font-size: 0.9rem;
            background: #f7fafc;
        }

        .copy-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .copy-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .share-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .share-btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: white;
        }

        .share-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .share-btn.whatsapp {
            background: #25D366;
        }

        .share-btn.telegram {
            background: #0088cc;
        }

        .share-btn.twitter {
            background: #1DA1F2;
        }

        @media (max-width: 480px) {
            .modal-content {
                padding: 1.5rem;
                margin: 1rem;
                max-width: calc(100vw - 2rem);
            }

            .modal-header {
                margin-bottom: 1rem;
            }

            .modal-header h3 {
                font-size: 1.3rem;
            }

            .prank-icon {
                width: 60px;
                height: 60px;
                margin-bottom: 1rem;
            }

            .prank-icon i {
                font-size: 1.5rem;
            }

            .prank-info h4 {
                font-size: 1.1rem;
            }

            .prank-info p {
                font-size: 0.9rem;
                margin-bottom: 1.5rem;
            }

            .share-link-container {
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }

            .share-link-container input {
                margin-bottom: 0.5rem;
            }

            .copy-btn {
                width: 100%;
            }

            .share-buttons {
                flex-direction: column;
                gap: 0.8rem;
            }

            .share-btn {
                width: 100%;
                justify-content: center;
                padding: 0.8rem 1rem;
                font-size: 0.9rem;
            }
        }

        @media (max-width: 360px) {
            .modal-content {
                padding: 1rem;
                margin: 0.5rem;
            }

            .modal-header h3 {
                font-size: 1.2rem;
            }

            .prank-icon {
                width: 50px;
                height: 50px;
            }

            .prank-icon i {
                font-size: 1.3rem;
            }

            .prank-info h4 {
                font-size: 1rem;
            }

            .prank-info p {
                font-size: 0.85rem;
            }

            .share-btn {
                padding: 0.7rem 0.8rem;
                font-size: 0.85rem;
            }
        }

        @media (max-width: 320px) {
            .modal-content {
                padding: 0.8rem;
                margin: 0.3rem;
            }

            .modal-header h3 {
                font-size: 1.1rem;
            }

            .prank-icon {
                width: 45px;
                height: 45px;
            }

            .prank-icon i {
                font-size: 1.2rem;
            }

            .prank-info h4 {
                font-size: 0.95rem;
            }

            .prank-info p {
                font-size: 0.8rem;
            }

            .share-btn {
                padding: 0.6rem 0.7rem;
                font-size: 0.8rem;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);
}

// Get Prank Icon
function getPrankIcon(prankType) {
    const icons = {
        'fake-app': 'fa-mobile-alt',
        'fake-warning': 'fa-exclamation-triangle',
        'fake-qr': 'fa-qrcode',
        'fake-lottery': 'fa-trophy'
    };
    return icons[prankType] || 'fa-laugh-beam';
}

// Get Prank Title
function getPrankTitle(prankType) {
    const titles = {
        'fake-app': 'Fake App Prank',
        'fake-warning': 'Fake Warning Prank',
        'fake-qr': 'Fake QR Code Prank',
        'fake-lottery': 'Fake Lottery Winner'
    };
    return titles[prankType] || 'Prank';
}

// Close Share Modal
function closeShareModal() {
    const modal = document.querySelector('.share-modal');
    if (modal) {
        modal.remove();
    }
}

// Copy Link to Clipboard
function copyLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');
    
    // Show copied feedback
    const copyBtn = document.querySelector('.copy-btn');
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    copyBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.background = '';
    }, 2000);
}

// Share on WhatsApp
function shareOnWhatsApp(link) {
    const text = `Check out this hilarious prank! ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// Share on Telegram
function shareOnTelegram(link) {
    const text = `Check out this hilarious prank! ${link}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`, '_blank');
}

// Share on Twitter
function shareOnTwitter(link) {
    const text = `Check out this hilarious prank! ${link}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
}

// Force enable contact form inputs
function enableContactFormInputs() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(input => {
        // Remove any event listeners that might prevent input
        input.removeEventListener('click', (e) => e.preventDefault());
        input.removeEventListener('keydown', (e) => e.preventDefault());
        input.removeEventListener('keypress', (e) => e.preventDefault());
        input.removeEventListener('input', (e) => e.preventDefault());
        
        // Force enable the input
        input.disabled = false;
        input.readOnly = false;
        input.style.pointerEvents = 'auto';
        input.style.userSelect = 'text';
        input.style.webkitUserSelect = 'text';
        input.style.mozUserSelect = 'text';
        input.style.msUserSelect = 'text';
        
        // Add event listeners to ensure input works
        input.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
        });
        
        input.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        console.log('Input enabled:', input.id);
    });
}

// Enable inputs when page loads and when switching to contact section
document.addEventListener('DOMContentLoaded', enableContactFormInputs);

// Also enable when contact section becomes active
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'contact' && mutation.target.classList.contains('active')) {
            setTimeout(enableContactFormInputs, 100);
        }
    });
});

// Start observing the contact section
const contactSection = document.getElementById('contact');
if (contactSection) {
    observer.observe(contactSection, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Contact Form Handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage
    let messages = JSON.parse(localStorage.getItem('foolypay_messages') || '[]');
    messages.push(data);
    localStorage.setItem('foolypay_messages', JSON.stringify(messages));
    
    // Show success message
    showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Show Form Message
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Smooth scroll behavior for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all sections
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

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe all prank cards
    document.querySelectorAll('.prank-card').forEach(card => {
        observer.observe(card);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key to close modal
    if (e.key === 'Escape') {
        closeShareModal();
    }
    
    // Ctrl/Cmd + K to open quick search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Future: Add quick search functionality
    }
});

// Add loading animation for better UX
window.addEventListener('load', () => {
    // Remove any loading screens if added in the future
    document.body.style.opacity = '1';
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add parallax effect to hero section (subtle)
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }
}, 10));

// Add hover sound effects (optional - can be enabled if desired)
function playHoverSound() {
    // Future: Add subtle sound effects for better interactivity
}

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    // Future: Add analytics tracking
    console.log('Event tracked:', eventName, properties);
}

// Track prank interactions
document.querySelectorAll('.btn-prank').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('prank_started', {
            prank_type: btn.closest('.prank-card').dataset.prank
        });
    });
});

// Initialize tooltips (future enhancement)
function initTooltips() {
    // Future: Add helpful tooltips for better UX
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Future: Add error reporting service
});

// Service Worker registration for PWA (future enhancement)
if ('serviceWorker' in navigator) {
    // Future: Add PWA capabilities
    console.log('Service Worker support detected');
}

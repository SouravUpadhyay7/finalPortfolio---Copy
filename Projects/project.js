// Function to set up the index for animations
function setupProjectIndexing() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
}

// Observer for animation on scroll
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

// Mouse move effect for cards
function setupMouseEffects() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
            }, 500);
        });
    });
}

// Filter projects by category
function setupCategoryFilter() {
    const categorySelect = document.getElementById('project-category');
    const projectCards = document.querySelectorAll('.project-card');
    
    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        
        projectCards.forEach(card => {
            if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
}

// Grid animation enhancement
function enhanceGridAnimation() {
    const grid = document.querySelector('.grid');
    
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 100;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 100;
        
        grid.style.transform = `translate(-50%, -50%) rotate(15deg) translate(${xAxis}px, ${yAxis}px) scale(1.1)`;
    });
    
    document.addEventListener('mouseleave', () => {
        grid.style.transform = 'translate(-50%, -50%) rotate(15deg)';
    });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setupProjectIndexing();
    setupScrollAnimations();
    setupMouseEffects();
    setupCategoryFilter();
    
    // Add click animation to home button
    const homeBtn = document.querySelector('.home-btn');
    homeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add a pulse animation
        homeBtn.style.animation = 'pulse 0.5s';
        
        // Reset the animation
        setTimeout(() => {
            homeBtn.style.animation = '';
        }, 500);
        
        // Redirect to home
        window.location.href = "../index.html";
    });
});

// Call the grid enhancement function on load
window.addEventListener('load', enhanceGridAnimation);
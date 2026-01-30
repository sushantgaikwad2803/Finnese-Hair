// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Page Navigation
document.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        document.getElementById(targetPage).classList.add('active');
        
        // Close mobile menu if open
        document.querySelector('nav ul').classList.remove('show');
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});

// Auto-Changing Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
let slideInterval;

// Function to show a specific slide
function showSlide(n) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Update current slide index
    currentSlide = (n + slides.length) % slides.length;
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Function to show next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Start auto-sliding
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Stop auto-sliding
function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopSlideShow();
        showSlide(index);
        startSlideShow();
    });
});

// Pause auto-sliding when user hovers over slider
const slider = document.querySelector('.hero-slider');
slider.addEventListener('mouseenter', stopSlideShow);
slider.addEventListener('mouseleave', startSlideShow);

// Initialize the slider
startSlideShow();

// FIXED: Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        // When scrolled - make header more solid/darker
        // header.style.backgroundColor = '#1a1a1a'; // Darker shade
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        // When at top - original color
        // header.style.backgroundColor = '#2c2c2c'; // Original color from CSS
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// The "Up and Down" Scroll Observer
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Triggers slightly before the element hits the bottom
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add class when scrolling INTO view
            entry.target.classList.add('active');
        } else {
            // Remove class when scrolling OUT of view 
            // This makes it work on UP and DOWN scroll
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

// Initialize after page loads
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.reveal');
    scrollElements.forEach(el => observer.observe(el));
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert("Thank you! Your message has been sent successfully.");
            form.reset();
        } else {
            alert("Something went wrong. Please try again.");
        }
    } catch (error) {
        alert("Network error. Please try later.");
    }
});


// Service Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter service cards
                serviceCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filterValue) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }
    
    // Animation for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = entry.target.getAttribute('data-delay') || '0s';
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards for animation
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
});




// Gallery Filtering
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    let currentItems = [];
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Get all visible items based on current filter
            const filterValue = document.querySelector('.gallery-filter .filter-btn.active').getAttribute('data-filter');
            currentItems = Array.from(galleryItems).filter(item => {
                if (filterValue === 'all') return true;
                return item.getAttribute('data-category') === filterValue;
            });
            
            currentIndex = currentItems.indexOf(item);
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
    
    function updateLightbox() {
        if (currentItems.length === 0) return;
        
        const currentItem = currentItems[currentIndex];
        const img = currentItem.querySelector('img');
        const caption = currentItem.querySelector('.gallery-caption');
        const category = currentItem.querySelector('.gallery-category-label');
        
        lightboxImg.src = img.src;
        lightboxTitle.textContent = caption ? caption.textContent : '';
        lightboxCategory.textContent = category ? category.textContent : '';
    }
    
    function showPrevImage() {
        if (currentItems.length === 0) return;
        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        updateLightbox();
    }
    
    function showNextImage() {
        if (currentItems.length === 0) return;
        currentIndex = (currentIndex + 1) % currentItems.length;
        updateLightbox();
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('gallery')) {
        initGalleryFilter();
        initLightbox();
    }
});
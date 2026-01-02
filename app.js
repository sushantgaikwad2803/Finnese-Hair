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

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

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Newsletter Form Submission
// document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Thank you for subscribing to our newsletter!');
//     this.reset();
// });
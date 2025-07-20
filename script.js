const carousels = {};
function initCarousel(carouselId) {
    carousels[carouselId] = {
        currentSlide: 0,
        totalSlides: document.querySelectorAll(`#${carouselId} .carousel-slide`).length
    };
}
function showSlide(carouselId, slideIndex) {
    const carousel = document.getElementById(carouselId);
    const totalSlides = carousels[carouselId].totalSlides;
    
    if (slideIndex >= totalSlides) {
        carousels[carouselId].currentSlide = 0;
    } else if (slideIndex < 0) {
        carousels[carouselId].currentSlide = totalSlides - 1;
    } else {
        carousels[carouselId].currentSlide = slideIndex;
    }
    
    const translateX = -carousels[carouselId].currentSlide * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    

    const container = carousel.closest('.carousel-container');
    const dots = container.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === carousels[carouselId].currentSlide);
    });
}
function nextSlide(carouselId) {
    showSlide(carouselId, carousels[carouselId].currentSlide + 1);
}
function prevSlide(carouselId) {
    showSlide(carouselId, carousels[carouselId].currentSlide - 1);
}
function currentSlide(carouselId, slideIndex) {
    showSlide(carouselId, slideIndex - 1);
}
// Inicializar carousel
document.addEventListener('DOMContentLoaded', function() {
    initCarousel('carousel1');
    initCarousel('carousel2');
    initCarousel('carousel3');
});

// Scrolling smooth
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

// Animação pro scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});


window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(33, 150, 243, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--dark-blue))';
    }
});

// Load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

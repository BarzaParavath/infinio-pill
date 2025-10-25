document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing slider...');
    
    // Hero Slider Functionality
    let currentSlide = 0;
    const slidesContainer = document.querySelector('.slides-container');
    const bullets = document.querySelectorAll('.swiper-pagination-bullet');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const totalSlides = 4;

    console.log('Elements found:', {
        slidesContainer: !!slidesContainer,
        bullets: bullets.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });

    function showSlide(index) {
        console.log('Showing slide:', index);
        
        // Remove active class from all bullets
        bullets.forEach(bullet => bullet.classList.remove('swiper-pagination-bullet-active'));
        
        // Add active class to current bullet
        if (bullets[index]) bullets[index].classList.add('swiper-pagination-bullet-active');
        
        // Move the slides container to show the correct slide
        if (slidesContainer) {
            // Remove all existing slide classes
            slidesContainer.classList.remove('sliding-to-slide-0', 'sliding-to-slide-1', 'sliding-to-slide-2', 'sliding-to-slide-3');
            // Add the new slide class
            slidesContainer.classList.add(`sliding-to-slide-${index}`);
            console.log('Applied class: sliding-to-slide-' + index);
        }
    }

    function nextSlide() {
        console.log('nextSlide called, current slide before:', currentSlide);
        currentSlide = (currentSlide + 1) % totalSlides;
        console.log('nextSlide called, current slide after:', currentSlide);
        showSlide(currentSlide);
    }

    function prevSlide() {
        console.log('prevSlide called, current slide before:', currentSlide);
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        console.log('prevSlide called, current slide after:', currentSlide);
        showSlide(currentSlide);
    }

    // Event listeners for navigation arrows
    if (nextBtn) {
        console.log('Next button found, adding event listener');
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button clicked!');
            nextSlide();
        });
    } else {
        console.log('Next button not found!');
    }
    
    if (prevBtn) {
        console.log('Prev button found, adding event listener');
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev button clicked!');
            prevSlide();
        });
    } else {
        console.log('Prev button not found!');
    }

    // Event listeners for swiper pagination bullets
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Bullet clicked:', index);
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-slide functionality
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Initialize first slide
    showSlide(0);
    
    // Start auto-slide
    startAutoSlide();

    // Pause auto-slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    if (heroSlider) {
        heroSlider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        heroSlider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Handle mobile contact button
    const contactBtnMobile = document.getElementById('contactBtnMobile');
    const contactBtn = document.getElementById('contactBtn');
    const contactModal = document.getElementById('contactModal');
    
    if (contactBtnMobile && contactBtn) {
        contactBtnMobile.addEventListener('click', function() {
            // Trigger the main contact button click event
            contactBtn.click();
        });
    }
});

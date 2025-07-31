document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const currentYearSpan = document.getElementById('current-year');
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-links');

    // Slideshow elements
    const serviceSlideshow = document.querySelector('.service-slideshow-container');
    const featuresSlideshow = document.querySelector('.features-slideshow-container');

    const slideshows = [serviceSlideshow, featuresSlideshow];

    // Smooth Scrolling & Active Nav Link
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close the mobile menu after a link is clicked
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('nav-active');
                    burgerMenu.classList.remove('toggle');
                    // Reset animation for next time
                    document.querySelectorAll('.nav-links li').forEach(item => {
                        item.style.animation = ''; 
                    });
                }
            }
        });
    });

    // Header Shrink & Nav Link Highlighting
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to Top button functionality
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Burger Menu Functionality (for mobile)
    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('nav-active');
        burgerMenu.classList.toggle('toggle');

        // Animate links
        document.querySelectorAll('.nav-links li').forEach((link, index) => {
            if (navMenu.classList.contains('nav-active')) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                link.style.animation = ''; // Reset animation to close
            }
        });
    });

    // Slideshow Functionality
    slideshows.forEach(slideshow => {
        if (slideshow) {
            const cards = slideshow.querySelectorAll(':scope > div');
            let currentCardIndex = 0;
            
            setInterval(() => {
                // Move to the next card, or loop back to the beginning
                currentCardIndex = (currentCardIndex + 1) % cards.length;
                const scrollAmount = cards[currentCardIndex].offsetLeft - slideshow.offsetLeft;
                
                slideshow.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }, 3000); // Change card every 3 seconds
        }
    });

    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
});

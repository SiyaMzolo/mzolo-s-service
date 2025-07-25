document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const currentYearSpan = document.getElementById('current-year');
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-links');
    const navMenuItems = document.querySelectorAll('.nav-links li');

    // --- MOBILE MENU FUNCTIONALITY ---
    const navSlide = () => {
        burgerMenu.addEventListener('click', () => {
            // Toggle Nav
            navMenu.classList.toggle('nav-active');

            // Animate Links
            navMenuItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burgerMenu.classList.toggle('toggle');
        });
    };

    // --- SMOOTH SCROLLING ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a link
            if (navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
                navMenuItems.forEach(item => item.style.animation = '');
            }
        });
    });

    // --- SCROLL-RELATED FUNCTIONALITY ---
    window.addEventListener('scroll', () => {
        // Sticky Header & Active Link
        header.classList.toggle('scrolled', window.pageYOffset > 50);

        // Show/Hide Scroll-to-Top Button
        scrollToTopBtn.style.display = (window.pageYOffset > 300) ? 'block' : 'none';

        // Active Navigation Link on Scroll
        let current = '';
        document.querySelectorAll('main section').forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50;
            if (pageYOffset >= sectionTop) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });

    // --- SCROLL TO TOP BUTTON CLICK ---
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- SET CURRENT YEAR IN FOOTER ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- INITIALIZE ALL FUNCTIONS ---
    navSlide(); // Call the mobile menu function to activate it.
});

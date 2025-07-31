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

    navSlide();

    // --- HEADER SCROLL EFFECT ---
    const headerScroll = () => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    headerScroll();

    // --- ACTIVE NAVIGATION LINK ---
    const highlightNav = () => {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                if (navMenu.classList.contains('nav-active')) {
                    navMenu.classList.remove('nav-active');
                    burgerMenu.classList.remove('toggle');
                }
            });
        });
    };

    highlightNav();

    // --- SCROLL TO TOP BUTTON ---
    const toggleScrollToTop = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    toggleScrollToTop();

    // --- DYNAMIC COPYRIGHT YEAR ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

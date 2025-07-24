document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const currentYearSpan = document.getElementById('current-year');
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm'); // Get the contact form

    // Smooth Scrolling for Navigation Links & Burger Menu toggle
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = header.offsetHeight;
            // Handle cases where targetElement might be null for non-section links
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Close burger menu if open and remove active class from all links
            if (navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Sticky Header & Active Navigation Link on Scroll
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Navigation Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for sticky header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Show/Hide Scroll to Top Button
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to Top Button functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Set Current Year in Footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Burger Menu Toggle
    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('nav-active');
        burgerMenu.classList.toggle('toggle');

        // Toggle body scroll for mobile menu
        if (navMenu.classList.contains('nav-active')) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        } else {
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            navLinks.forEach(link => {
                link.style.animation = ''; // Reset animation
            });
        }
    });

    // Contact Form Submission (for Email Client)
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        const recipientEmail = 'mbuyiswamzolo14@gmail.com'; // Your uncle's email
        const subject = encodeURIComponent(`Quote Request / Message from ${name}`);
        let body = `Name: ${name}\n`;
        body += `Email: ${email}\n`;
        if (phone) {
            body += `Phone: ${phone}\n`;
        }
        if (service) {
            body += `Service Interested In: ${service}\n`;
        }
        body += `\nMessage:\n${message}`;

        const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink; // Open default email client

        alert('Thank you for your message! Your email client should open shortly with your message pre-filled. Please send it from there.');
        contactForm.reset(); // Clear the form after submission
    });
});
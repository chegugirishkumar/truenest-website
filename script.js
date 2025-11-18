document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const slideOutMenu = document.querySelector('.slide-out-menu');
    const pageOverlay = document.querySelector('.page-overlay');
    const sections = document.querySelectorAll('section, header#hero');

    const closeMenu = () => {
        slideOutMenu.classList.remove('open');
        pageOverlay.classList.remove('active');
    };

    menuIcon.addEventListener('click', () => {
        slideOutMenu.classList.toggle('open');
        pageOverlay.classList.toggle('active');
    });

    pageOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.menu-content a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const isExternal = href.startsWith('index.html');

            closeMenu();

            if (isExternal) {
                // If on a project page, navigate to the main page and then scroll
                window.location.href = href;
            } else {
                // If on the main page, just scroll smoothly
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }, 300); // Wait for menu to close
                }
            }
        });
    });

    // Observer for menu icon color change
    let isOverLightSection = false;

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const isLight = section.classList.contains('about-us-section') || section.classList.contains('upcoming-projects-section');

                if (isLight) {
                    menuIcon.classList.add('dark');
                } else {
                    menuIcon.classList.remove('dark');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

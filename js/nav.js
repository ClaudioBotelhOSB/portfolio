/**
 * Initializes all navigation-related components and event listeners.
 * This includes the main header, mobile menu, side navigation, scroll-to-top FAB,
 * and the scroll progress bar.
 */
export function initNav() {
    initMobileMenu();
    initHeaderScrollEffect();
    initScrollProgressBar();
    initFab();
    // initSideNav must be called after sections are loaded and available in the DOM.
    // We also need to make sure the IntersectionObserver is set up for it.
    setupNavObservers();
}

/**
 * Sets up the click listener for the mobile menu button.
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }
}

/**
 * Adds a scroll listener to toggle the 'header-scrolled' class on the main header.
 */
function initHeaderScrollEffect() {
    const header = document.getElementById('main-header');
    const sideNav = document.getElementById('side-nav');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            if (sideNav) sideNav.style.display = 'block';
        } else {
            header.classList.remove('header-scrolled');
            if (sideNav) sideNav.style.display = 'none';
        }
    });
}

/**
 * Initializes the scroll-to-top Floating Action Button (FAB).
 */
function initFab() {
    const fab = document.getElementById('fab-to-top');
    if (!fab) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            fab.classList.add('visible');
        } else {
            fab.classList.remove('visible');
        }
    });
}

/**
 * Updates the scroll progress bar at the top of the page.
 */
function initScrollProgressBar() {
    const progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

/**
 * Creates the side navigation dots and uses an IntersectionObserver to highlight
 * the dot corresponding to the section currently in view. Also updates main nav
 * and page background color.
 */
function setupNavObservers() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const sideNavContainer = document.getElementById('side-nav');
    const mainNavLinks = document.querySelectorAll('#main-header nav a');
    const sideNavLinks = [];

    const sectionBackgrounds = {
        'sobre': '#0a0a0a',
        'filosofia': '#0a0a1a',      // Dark blue tint
        'metodologia': '#1a0a1a',   // Dark purple tint
        'toolbox': '#0a1a0a',        // Dark green tint
        'projetos': '#1a1a0a',       // Dark yellow tint
        'artigos': '#1a100a',        // Dark orange tint
        'testimonials': '#0a0a0a',   // Back to default
        'contato': '#100a1a'         // Dark pink/purple tint
    };

    // Dynamically create side nav links
    if (sideNavContainer) {
        const navList = document.createElement('ul');
        sections.forEach(section => {
            if (section.id) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `#${section.id}`;

                const tooltip = document.createElement('span');
                tooltip.className = 'nav-tooltip';
                const heading = section.querySelector('h2, h3, h4');
                tooltip.textContent = heading ? (heading.textContent.split(' ')[0] || section.id) : (section.id.charAt(0).toUpperCase() + section.id.slice(1));

                link.appendChild(tooltip);
                listItem.appendChild(link);
                navList.appendChild(listItem);
                sideNavLinks.push(link);
            }
        });
        sideNavContainer.innerHTML = '';
        sideNavContainer.appendChild(navList);
    }

    // Observer to track which section is visible
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Change body background color
                const newBgColor = sectionBackgrounds[id];
                if (newBgColor) {
                    document.body.style.backgroundColor = newBgColor;
                }

                // Update side nav active state
                sideNavLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });

                // Update main nav active state
                 mainNavLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -60% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));
}

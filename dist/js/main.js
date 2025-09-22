document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (main) {
        const colorStart = [14, 165, 233]; // RGB for --sky-500
        const colorEnd = [139, 92, 246]; // RGB for --purple-500

        main.addEventListener('mousemove', e => {
            const sections = document.querySelectorAll('.aurora-background');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const percent = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
                const r = Math.round(colorStart[0] * (1 - percent) + colorEnd[0] * percent);
                const g = Math.round(colorStart[1] * (1 - percent) + colorEnd[1] * percent);
                const b = Math.round(colorStart[2] * (1 - percent) + colorEnd[2] * percent);

                section.style.setProperty('--mouse-x', `${x}px`);
                section.style.setProperty('--mouse-y', `${y}px`);
                section.style.setProperty('--aurora-color', `rgba(${r}, ${g}, ${b}, 0.15)`);
            });
        });
    }

    const sections = [
        'home',
        'metodologia',
        'toolbox',
        'about_us',
        'process',
        'projects',
        'articles',
        'testimonials'
    ];

    const loadSections = sections.map(section => {
        return fetch(`src/sections/${section}.html`)
            .then(response => response.text())
            .then(data => {
                const placeholder = document.getElementById(`${section}-placeholder`);
                if (placeholder) {
                    placeholder.innerHTML = data;
                }
            });
    });

    Promise.all(loadSections).then(() => {
        console.log('All sections loaded');

        // Initialize a single IntersectionObserver for all fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

        // Initialize scripts for each section now that the HTML is in the DOM
        if (document.getElementById('home')) {
            initHome();
        }
        if (document.getElementById('metodologia')) {
            initMetodologia();
        }
        if (document.getElementById('toolbox')) {
            initToolbox();
        }
        if (document.getElementById('about_us')) {
            initAboutUs();
        }
        if (document.getElementById('process')) {
            initProcess();
        }
        if (document.getElementById('projects')) {
            initProjects();
        }
        if (document.getElementById('articles')) {
            initArticles();
        }
        if (document.getElementById('testimonials')) {
            initTestimonials();
        }
    }).catch(error => {
        console.error('Error loading sections:', error);
    });
});

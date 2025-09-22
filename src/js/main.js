document.addEventListener('DOMContentLoaded', () => {
    console.log('Main script loaded');

    // Initialize scripts for each section
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
});

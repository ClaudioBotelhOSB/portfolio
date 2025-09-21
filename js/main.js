import { loadSections } from './loader.js';
import { initNav } from './nav.js';
import { initEffects } from './effects.js';
import { observeForAnimation } from './scroll.js';
import { initProjects } from './projects.js';
import { initToolbox } from './toolbox.js';
import { initContactForm } from './contact.js';

/**
 * The main entry point for the application's JavaScript.
 * It waits for the DOM to be fully loaded, then triggers the loading of HTML sections.
 * Once sections are loaded, it initializes all interactive and visual modules.
 */
async function main() {
    // First, load all the HTML content for the sections
    await loadSections();

    // Now that all content is in the DOM, initialize the different modules
    // that attach event listeners to that content.
    initNav();
    initEffects();
    initProjects();
    initToolbox();
    initContactForm();

    // After all content is loaded and modules are initialized,
    // find all elements that need to be animated on scroll and observe them.
    observeForAnimation('.fade-in-up');

    console.log("All modules initialized and animations observed.");
}

// Wait for the initial DOM to be ready before starting the loading process.
document.addEventListener('DOMContentLoaded', main);

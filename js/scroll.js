/**
 * This module manages a single, performant IntersectionObserver to handle
 * scroll-triggered animations for any element that needs it.
 */

// Create one observer to be used for all scroll animations.
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the element is visible, add the 'visible' class to trigger the animation.
            entry.target.classList.add('visible');

            // Once the animation is triggered, we no longer need to observe it.
            // This is a performance optimization.
            observer.unobserve(entry.target);
        }
    });
}, {
    // Start loading the animation when the element is 20% visible.
    threshold: 0.2
});

/**
 * Finds all elements matching the provided selector and adds them to the observer.
 * @param {string} selector - The CSS selector for elements to be animated on scroll.
 */
export function observeForAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        scrollObserver.observe(el);
    });
}

/**
 * Initializes all visual effects for the page, including the Three.js background,
 * typewriter, ripple effect on buttons, and interactive borders on cards.
 */
export function initEffects() {
    initThreeJsBackground();
    initTypewriter();
    initRippleEffect();
    initInteractiveBorders();
}

/**
 * Sets up the Three.js animated particle background in the hero section.
 */
function initThreeJsBackground() {
    const heroCanvasContainer = document.getElementById('hero-canvas-container');
    // Check if THREE is loaded and the container exists
    if (!heroCanvasContainer || typeof THREE === 'undefined') {
        if (typeof THREE === 'undefined') console.error("Three.js library is not loaded.");
        return;
    }

    let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 300;

        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        heroCanvasContainer.appendChild(renderer.domElement);

        const particleCount = 5000;
        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 1000;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.5,
            color: 0x0ea5e9, // Uses the hex value from the --sky-500 var
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
        });

        particles = new THREE.Points(particlesGeometry, particleMaterial);
        scene.add(particles);

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) / 10;
        mouseY = (event.clientY - window.innerHeight / 2) / 10;
    }

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;

        if (camera) {
            camera.position.x += (mouseX - camera.position.x) * 0.01;
            camera.position.y += (-mouseY - camera.position.y) * 0.01;
            camera.lookAt(scene.position);
        }

        renderer.render(scene, camera);
    }

    init();
    animate();
}

/**
 * Initializes the typewriter effect for the hero section headline.
 */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const words = ["DevOps.", "Cloud.", "IA.", "Soluções Completas.", "Cybersecurity.", "Data Science.", "Automações."];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = "";
    let isDeleting = false;

    function type() {
        const speed = isDeleting ? 75 : 150;
        currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, letterIndex + 1);
            letterIndex++;
        }

        if (!isDeleting && letterIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, speed);
    }
    type();
}

/**
 * Adds a ripple effect to all buttons and specific anchor tags on click.
 */
function initRippleEffect() {
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }
        button.appendChild(circle);
    }

    // Use event delegation on the body to handle dynamically added elements
    document.body.addEventListener('click', (event) => {
        const target = event.target.closest('button, a.bg-sky-500');
        if (target) {
            createRipple(event);
        }
    });
}

/**
 * Adds mouse-tracking glow effect to elements with the .interactive-border class.
 */
function initInteractiveBorders() {
    // Use event delegation on the body to handle dynamically added elements
    document.body.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.interactive-border');
        if (card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });
}

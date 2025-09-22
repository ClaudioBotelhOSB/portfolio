function initHome() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('#home .fade-in-up').forEach(el => observer.observe(el));

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const words = ["Cloud & IA.", "DevSecOps.", "SRE.", "Resultados de Negócio."];
        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const speed = isDeleting ? 100 : 200;

            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
            }

            if (!isDeleting && letterIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            setTimeout(type, speed);
        }
        type();
    }

    // Three.js Hero Background
    const heroCanvasContainer = document.getElementById('hero-canvas-container');
    if (heroCanvasContainer && typeof THREE !== 'undefined') {
        let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 300;

            renderer = new THREE.WebGLRenderer({ canvas: document.createElement('canvas'), alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            heroCanvasContainer.appendChild(renderer.domElement);

            const particleCount = 7000;
            const particlesGeometry = new THREE.BufferGeometry();
            const posArray = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 1000;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.7,
                color: 0x0ea5e9, // --sky-500
                transparent: true,
                opacity: 0.7,
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
            mouseX = (event.clientX - windowHalfX) / 2;
            mouseY = (event.clientY - windowHalfY) / 2;
        }

        function animate() {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.00005;
            particles.rotation.y += 0.0001;

            camera.position.x += (mouseX - camera.position.x) * 0.005;
            camera.position.y += (-mouseY - camera.position.y) * 0.005;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        init();
        animate();
    }
}

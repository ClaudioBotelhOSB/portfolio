function initMetodologia() {
    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('#metodologia .fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Interactive Background
    const methodologySection = document.getElementById('metodologia');
    if (methodologySection) {
        const bg = methodologySection.querySelector('.dot-grid-background');
        methodologySection.addEventListener('mousemove', e => {
            const rect = methodologySection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (bg) {
                bg.style.setProperty('background-position', `-${x/20}px -${y/20}px`);
            }

            methodologySection.style.setProperty('--mouse-x', `${x}px`);
            methodologySection.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // Card Flip & 3D Hover Effect
    const cards = document.querySelectorAll('#metodologia .methodology-card');
    cards.forEach(card => {
        const cardInner = card.querySelector('.card-inner');

        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -15; // Less intense tilt
            const rotateY = (x / width - 0.5) * 15;

            let currentTransform = card.classList.contains('is-flipped') ? 'rotateY(180deg)' : 'rotateY(0deg)';
            cardInner.style.transition = 'transform 0.1s ease-out'; // Quick follow
            cardInner.style.transform = `perspective(1000px) ${currentTransform} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            // Smoothly transition back to the base flipped or unflipped state
            cardInner.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'; // Longer, smoother reset
             if (card.classList.contains('is-flipped')) {
                cardInner.style.transform = 'perspective(1000px) rotateY(180deg)';
            } else {
                cardInner.style.transform = 'perspective(1000px) rotateY(0deg)';
            }
        });
    });
}

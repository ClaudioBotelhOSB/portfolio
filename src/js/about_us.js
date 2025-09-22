function initAboutUs() {
    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('#about_us .fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Interactive Background
    const philosophySection = document.getElementById('about_us');
    if (philosophySection) {
        const colorStart = [14, 165, 233]; // RGB for --sky-500
        const colorEnd = [139, 92, 246]; // RGB for --purple-500

        philosophySection.addEventListener('mousemove', e => {
            const rect = philosophySection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            philosophySection.style.setProperty('--mouse-x', `${x}px`);
            philosophySection.style.setProperty('--mouse-y', `${y}px`);

            const percent = x / rect.width;
            const r = Math.round(colorStart[0] * (1 - percent) + colorEnd[0] * percent);
            const g = Math.round(colorStart[1] * (1 - percent) + colorEnd[1] * percent);
            const b = Math.round(colorStart[2] * (1 - percent) + colorEnd[2] * percent);

            philosophySection.style.setProperty('--aurora-color', `rgba(${r}, ${g}, ${b}, 0.15)`);
        });
    }

    // 3D Hover Effect
    const cards = document.querySelectorAll('#about_us .profile-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -15;
            const rotateY = (x / width - 0.5) * 15;

            card.style.transition = 'transform 0.1s ease-out';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

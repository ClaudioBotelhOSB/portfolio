function initTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials-container');

    function renderTestimonials() {
        if (!testimonialsContainer) return;
        testimonialsContainer.innerHTML = '';
        testimonialsData.forEach((testimonial, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            slide.innerHTML = `
                <div class="testimonial-card-container fade-in-up" style="transition-delay: ${300 + index * 100}ms;">
                    <div class="card-inner">
                        <div class="card-front interactive-border interactive-border-${testimonial.colorClass} p-8">
                            ${testimonial.type === 'video' ? `
                            <div class="video-thumbnail rounded-lg mb-6">
                                <img src="${testimonial.thumbnail}" class="w-full h-auto object-cover rounded-lg" alt="Video testimonial thumbnail" loading="lazy">
                                <div class="play-button">
                                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm8 7l-4 2.5V7.5L12 10z"></path></svg>
                                </div>
                            </div>` : ''}
                            <blockquote class="flex-grow">
                                <p class="text-xl lg:text-2xl text-white italic">“${testimonial.quote}”</p>
                            </blockquote>
                            <footer class="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                                <div>
                                    <div class="flex items-center gap-3">
                                        <h5 class="font-bold text-white">${testimonial.author}</h5>
                                        <a href="${testimonial.linkedin}" target="_blank" class="text-gray-400 hover:text-${testimonial.colorClass}-400 transition-transform duration-300 hover:scale-110">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                        </a>
                                    </div>
                                    <p class="text-sm text-${testimonial.colorClass}-400 font-medium">${testimonial.title}</p>
                                </div>
                                <img src="${testimonial.companyLogo}" class="h-8 object-contain" alt="Logo da empresa" loading="lazy">
                            </footer>
                            <button class="flip-button mt-4 text-xs text-center text-sky-400/70 hover:text-sky-400 transition">Ver projeto relacionado →</button>
                        </div>
                        <div class="card-back interactive-border interactive-border-${testimonial.colorClass} p-8 flex flex-col justify-center text-center">
                             <h5 class="text-lg font-bold text-gray-300">Projeto Relacionado</h5>
                             <p class="text-2xl font-bold text-${testimonial.colorClass}-400 mt-2">${testimonial.relatedProject.title}</p>
                             <p class="mt-2 text-gray-400">Resultado Chave: <span class="font-semibold text-white">${testimonial.relatedProject.metric}</span></p>
                             <button class="flip-button mt-6 text-xs text-center text-sky-400/70 hover:text-sky-400 transition">← Voltar ao testemunho</button>
                        </div>
                    </div>
                </div>
            `;
            testimonialsContainer.appendChild(slide);
        });
    }

    if (testimonialsContainer) {
        renderTestimonials();
    }

    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        const testimonialsBg = testimonialsSection.querySelector('.dot-grid-background');
        if (testimonialsBg) {
            testimonialsSection.addEventListener('mousemove', e => {
                const rect = testimonialsSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const bgX = -x / 20;
                const bgY = -y / 20;
                testimonialsBg.style.backgroundPosition = `${bgX}px ${bgY}px`;
            });
        }
    }

    function addCardEventListeners() {
        document.querySelectorAll('#testimonials .testimonial-card-container').forEach(cardContainer => {
            cardContainer.addEventListener('mousemove', (e) => {
                const rect = cardContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                cardContainer.style.setProperty('--mouse-x', `${x}px`);
                cardContainer.style.setProperty('--mouse-y', `${y}px`);
            });

            cardContainer.addEventListener('click', (e) => {
                if (e.target.closest('a')) {
                    return; // Allow links to work
                }
                if (e.target.closest('.flip-button') || !e.target.closest('a')) {
                     cardContainer.classList.toggle('is-flipped');
                }
            });
        });
    }
    addCardEventListeners();


    new Swiper('.testimonials-swiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
         breakpoints: {
            1024: {
                slidesPerView: 2,
            }
        }
    });
}

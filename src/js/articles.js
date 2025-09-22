function initArticles() {
    const articlesGrid = document.getElementById('articles-grid');

    function renderArticles() {
        if (!articlesGrid) return;
        articlesGrid.innerHTML = '';
        articlesData.forEach((article, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            const cardContainer = document.createElement('div');
            cardContainer.className = 'insight-card-container fade-in-up w-full';
            cardContainer.style.transitionDelay = `${300 + index * 100}ms`;
            cardContainer.dataset.articleId = article.id;

            cardContainer.innerHTML = `
                <div class="insight-card p-8 rounded-xl interactive-border interactive-border-${article.colorClass} flex flex-col">
                    <h4 class="text-2xl font-bold text-${article.colorClass}-400">${article.insight}</h4>
                    <p class="mt-4 text-sm text-gray-400 flex-grow">${article.description}</p>
                    <div class="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                        <span class="font-semibold text-sm text-gray-300">${article.title}</span>
                        <div class="text-${article.colorClass}-400 font-semibold text-sm flex items-center gap-1">
                            <span>Ver insight</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                         </div>
                    </div>
                </div>
            `;
            slide.appendChild(cardContainer);
            articlesGrid.appendChild(slide);
        });
    }

    if (articlesGrid) {
        renderArticles();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('#articles .fade-in-up').forEach(el => observer.observe(el));

    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
        const articlesBg = articlesSection.querySelector('.dot-grid-background');
        if (articlesBg) {
            articlesSection.addEventListener('mousemove', e => {
                const rect = articlesSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const bgX = -x / 20;
                const bgY = -y / 20;
                articlesBg.style.backgroundPosition = `${bgX}px ${bgY}px`;

                articlesSection.style.setProperty('--mouse-x', `${x}px`);
                articlesSection.style.setProperty('--mouse-y', `${y}px`);
            });
        }
    }

    const cards = document.querySelectorAll('#articles .insight-card-container');
    cards.forEach(cardContainer => {
        const card = cardContainer.querySelector('.insight-card');
        cardContainer.addEventListener('mousemove', (e) => {
            const rect = cardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -20;
            const rotateY = (x / width - 0.5) * 20;

            if(card) {
                card.style.transition = 'transform 0.1s ease-out';
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }
        });

        cardContainer.addEventListener('mouseleave', () => {
            if(card) {
                card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    });

    // Article Viewer Logic
    const overlay = document.getElementById('article-viewer-overlay');
    const viewerCard = document.getElementById('article-viewer-card');
    const closeBtn = document.getElementById('close-article-modal');
    let originalCard = null;

    function openArticle(articleId) {
        originalCard = document.querySelector(`.insight-card-container[data-article-id='${articleId}']`);
        if (!originalCard) return;

        const article = articlesData.find(a => a.id === parseInt(articleId));
        if (!article) return;

        // Populate viewer
        document.getElementById('article-modal-title').textContent = article.title;
        document.getElementById('article-modal-title').className = `text-3xl font-bold mb-4 text-${article.colorClass}-400`;
        document.getElementById('article-modal-category').textContent = article.category;
        document.getElementById('article-modal-category').className = `font-semibold uppercase tracking-wider text-sm mb-6 text-${article.colorClass}-400`;
        document.getElementById('article-modal-content').innerHTML = article.content;

        const rect = originalCard.getBoundingClientRect();

        viewerCard.style.position = 'fixed';
        viewerCard.style.top = `${rect.top}px`;
        viewerCard.style.left = `${rect.left}px`;
        viewerCard.style.width = `${rect.width}px`;
        viewerCard.style.height = `${rect.height}px`;
        viewerCard.className = `article-viewer-card insight-card p-8 rounded-xl interactive-border interactive-border-${article.colorClass}`;
        viewerCard.style.opacity = '1';
        viewerCard.style.pointerEvents = 'auto';

        originalCard.classList.add('hide-original');
        overlay.classList.add('visible');

        // Animate to center
        setTimeout(() => {
            viewerCard.style.transition = 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1)';
            const targetWidth = Math.min(900, window.innerWidth * 0.9);
            viewerCard.style.width = `${targetWidth}px`;
            viewerCard.style.height = 'auto';
            viewerCard.style.top = '50%';
            viewerCard.style.left = '50%';
            viewerCard.style.transform = 'translate(-50%, -50%)';
            viewerCard.classList.add('visible');
        }, 50);
    }

    function closeArticle() {
        if (!originalCard) return;

        const rect = originalCard.getBoundingClientRect();
        viewerCard.classList.remove('visible');
        viewerCard.style.transition = 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1)';
        viewerCard.style.top = `${rect.top}px`;
        viewerCard.style.left = `${rect.left}px`;
        viewerCard.style.width = `${rect.width}px`;
        viewerCard.style.height = `${rect.height}px`;
        viewerCard.style.transform = '';

        overlay.classList.remove('visible');

        setTimeout(() => {
            viewerCard.style.opacity = '0';
            viewerCard.style.pointerEvents = 'none';
            originalCard.classList.remove('hide-original');
            originalCard = null;
        }, 500);
    }

    if (articlesGrid) {
        articlesGrid.addEventListener('click', (e) => {
            const cardContainer = e.target.closest('.insight-card-container');
            if (cardContainer) {
                const articleId = cardContainer.dataset.articleId;
                openArticle(articleId);
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeArticle);
    }
    if (overlay) {
        overlay.addEventListener('click', closeArticle);
    }

     // Initialize Swiper
    new Swiper('.articles-swiper', {
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
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}

function initProjects() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        const bg = projectsSection.querySelector('.dot-grid-background');
        projectsSection.addEventListener('mousemove', e => {
            const rect = projectsSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (bg) {
                bg.style.setProperty('background-position', `-${x/20}px -${y/20}px`);
            }

            projectsSection.style.setProperty('--mouse-x', `${x}px`);
            projectsSection.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    const projectsContainer = document.getElementById('projects-container');
    if(projectsContainer){
        renderProjects();
    }

    function renderProjects() {
        if(!projectsContainer) return;

        projectsContainer.innerHTML = '';
        allProjects.forEach((project, index) => {
            const toolIcons = project.tools.map(tool => {
                let glowColor, glowColorTransparent;
                switch (tool.category) {
                    case 'IA & AIOps': glowColor = 'var(--purple-500)'; glowColorTransparent = 'rgba(139, 92, 246, 0.1)'; break;
                    case 'DevSecOps': glowColor = 'var(--green-400)'; glowColorTransparent = 'rgba(74, 222, 128, 0.1)'; break;
                    case 'Cloud & SRE': glowColor = 'var(--orange-400)'; glowColorTransparent = 'rgba(251, 146, 60, 0.1)'; break;
                    case 'Aplicação & Dados': glowColor = 'var(--yellow-400)'; glowColorTransparent = 'rgba(250, 204, 21, 0.1)'; break;
                    default: glowColor = 'var(--sky-500)'; glowColorTransparent = 'rgba(14, 165, 233, 0.1)';
                }

                const toolTitle = tool.name.charAt(0).toUpperCase() + tool.name.slice(1);

                return `
                <div class="tool-icon-container">
                    <img src="https://skillicons.dev/icons?i=${tool.name}" alt="${tool.name}" class="w-8 h-8 rounded-full bg-gray-700/50 p-1.5" loading="lazy">
                    <div class="tool-tooltip">
                        <div class="flex justify-between items-center mb-2">
                            <h6 class="font-bold text-white capitalize">${toolTitle}</h6>
                            <span class="project-category-tag !m-0 !py-0.5 !px-2 !text-xs" style="color:${glowColor}; background-color:${glowColorTransparent};">${tool.category}</span>
                        </div>
                        <p class="text-sm text-left">${tool.usage}</p>
                    </div>
                </div>
            `}).join('');

            let glowColor, glowColorTransparent;
            switch (project.borderColor) {
                case 'interactive-border-purple': glowColor = 'var(--purple-500)'; glowColorTransparent = 'rgba(139, 92, 246, 0.1)'; break;
                case 'interactive-border-green': glowColor = 'var(--green-400)'; glowColorTransparent = 'rgba(74, 222, 128, 0.1)'; break;
                case 'interactive-border-pink': glowColor = 'var(--pink-400)'; glowColorTransparent = 'rgba(244, 114, 182, 0.1)'; break;
                case 'interactive-border-yellow': glowColor = 'var(--yellow-400)'; glowColorTransparent = 'rgba(250, 204, 21, 0.1)'; break;
                default: glowColor = 'var(--sky-500)'; glowColorTransparent = 'rgba(14, 165, 233, 0.1)';
            }

            const breakdownTooltipContent = Object.entries(project.breakdown).map(([key, value]) => {
                 let categoryName, colorClass;
                 switch (key) {
                    case 'ai': categoryName = 'IA & AIOps'; colorClass = 'text-purple-400'; break;
                    case 'devops': categoryName = 'DevSecOps'; colorClass = 'text-green-400'; break;
                    case 'cloud': categoryName = 'Cloud & SRE'; colorClass = 'text-orange-400'; break;
                    case 'app_data': categoryName = 'Aplicação & Dados'; colorClass = 'text-yellow-400'; break;
                    case 'strategy': categoryName = 'Arquitetura'; colorClass = 'text-cyan-400'; break;
                 }
                 return `<li class="flex justify-between"><span>${categoryName}:</span><span class="font-bold ${colorClass}">${value}%</span></li>`;
            }).join('');

            const breakdownHtml = Object.entries(project.breakdown).map(([key, value]) => {
                 let bgColor;
                 switch (key) {
                    case 'ai': bgColor = 'var(--purple-500)'; break;
                    case 'devops': bgColor = 'var(--green-400)'; break;
                    case 'cloud': bgColor = 'var(--orange-400)'; break;
                    case 'app_data': bgColor = 'var(--yellow-400)'; break;
                    case 'strategy': bgColor = 'var(--cyan-400)'; break;
                    default: bgColor = 'var(--sky-500)';
                 }
                 return `<div style="width: ${value}%; background-color: ${bgColor};"></div>`;
            }).join('');

            const slide = document.createElement('div');
            slide.className = `swiper-slide fade-in-up`;
            slide.style.transitionDelay = `${index * 150}ms`;

            slide.innerHTML = `
                <div class="project-card" data-project-id="${project.id}">
                    <div class="card-inner">
                        <div class="card-front interactive-border ${project.borderColor}" style="--glow-color: ${glowColor};">
                            <div class="project-category-tag" style="color:${glowColor}; background-color:${glowColorTransparent};">${project.category}</div>
                            <h4 class="text-2xl font-bold text-white">${project.title}</h4>
                            <p class="mt-2 text-gray-400 flex-grow">${project.description}</p>
                            <div class="mt-auto pt-4 space-y-4">
                                 <div class="key-metric">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                        <p class="text-sm font-semibold text-gray-300">Resultado Chave:</p>
                                    </div>
                                    <div class="tool-icon-container">
                                        <p class="text-2xl font-bold text-white">${project.metric.value} <span class="text-lg font-medium text-gray-400">${project.metric.label}</span></p>
                                        <div class="tool-tooltip -translate-y-full">
                                            <p class="text-sm text-left">${project.metric.explanation}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="breakdown-bar-container">
                                    <p class="text-sm font-semibold mb-1 text-gray-300">Project Breakdown:</p>
                                    <div class="breakdown-bar">${breakdownHtml}</div>
                                    <div class="tool-tooltip -translate-y-2">
                                        <h6 class="font-bold text-white mb-2">Distribuição de Esforço</h6>
                                        <ul class="space-y-1">${breakdownTooltipContent}</ul>
                                    </div>
                                </div>
                                <div class="mt-4 tool-icon-container">
                                    <p class="text-sm font-semibold mb-2 text-gray-300">Tecnologias Utilizadas:</p>
                                    <div class="flex flex-wrap gap-2">${toolIcons}</div>
                                    <div class="tool-tooltip">
                                        <p class="text-sm text-left">As principais tecnologias e ferramentas que foram utilizadas para construir este projeto.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-back interactive-border ${project.borderColor}" style="--glow-color: ${glowColor};">
                            <div class="flex flex-col h-full">
                                <div>
                                    <h5 class="text-lg font-bold" style="color:${glowColor};">Desafio</h5>
                                    <p>${project.challenge}</p>
                                </div>
                                <div class="mt-4">
                                    <h5 class="text-lg font-bold" style="color:${glowColor};">Solução</h5>
                                    <p>${project.solution}</p>
                                </div>
                                <div class="mt-4 flex-grow">
                                    <h5 class="text-lg font-bold" style="color:${glowColor};">Resultado</h5>
                                    <p>${project.result}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(slide);
            observer.observe(slide);
        });

        initializeSwiper();
        addCardEventListeners();
    }

    function initializeSwiper() {
        new Swiper('.projects-swiper', {
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

    function addCardEventListeners() {
        const cards = document.querySelectorAll('#projects .project-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.tool-icon-container') || e.target.closest('.breakdown-bar-container') || e.target.closest('.key-metric')) return;
                card.classList.toggle('is-flipped');
            });

            card.querySelectorAll('.interactive-border').forEach(border => {
                border.addEventListener('mousemove', e => {
                    const rect = border.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    border.style.setProperty('--mouse-x', `${x}px`);
                    border.style.setProperty('--mouse-y', `${y}px`);
                });
            });
        });
    }
}

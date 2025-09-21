function initHome() {
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

function initMethodology() {
    const methodologySection = document.getElementById('methodology');
    if (methodologySection) {
        methodologySection.addEventListener('mousemove', e => {
            const rect = methodologySection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            methodologySection.style.setProperty('--mouse-x', `${x}px`);
            methodologySection.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    const cards = document.querySelectorAll('.methodology-card');
    cards.forEach(card => {
        const cardInner = card.querySelector('.card-inner');
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');

        // Set initial state
        cardFront.setAttribute('aria-hidden', 'false');
        cardBack.setAttribute('aria-hidden', 'true');

        card.addEventListener('click', () => {
            const isFlipped = card.classList.toggle('is-flipped');
            cardFront.setAttribute('aria-hidden', isFlipped ? 'true' : 'false');
            cardBack.setAttribute('aria-hidden', isFlipped ? 'false' : 'true');
        });

        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(pointer: coarse)').matches) return; // Don't run on touch devices
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -15;
            const rotateY = (x / width - 0.5) * 15;

            let currentTransform = card.classList.contains('is-flipped') ? 'rotateY(180deg)' : 'rotateY(0deg)';
            cardInner.style.transition = 'transform 0.1s ease-out';
            cardInner.style.transform = `perspective(1000px) ${currentTransform} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            cardInner.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
             if (card.classList.contains('is-flipped')) {
                cardInner.style.transform = 'perspective(1000px) rotateY(180deg)';
            } else {
                cardInner.style.transform = 'perspective(1000px) rotateY(0deg)';
            }
        });
    });
}

function initToolbox() {
    const filterContainer = document.getElementById('filter-container');
    const toolsGrid = document.getElementById('tools-grid');
    const proficiencyLegend = document.getElementById('proficiency-legend');
    let activeCard = null;

    if (!toolsGrid) return;

    function populateTools() {
        toolsGrid.innerHTML = '';
        toolsData.forEach(tool => {
            const card = document.createElement('div');
            card.className = `tool-card tool-card-${tool.category_short} rounded-xl flex flex-col items-center justify-center text-center fade-in-up interactive-border`;
            card.setAttribute('data-category', tool.category_short);
            card.setAttribute('data-name', tool.name.toLowerCase());
            card.setAttribute('data-related', tool.related ? tool.related.join(',') : '');
            card.setAttribute('data-proficiency', tool.proficiency);

            let borderColorClass = getBorderColorClass(tool.category_short);
            card.classList.add(borderColorClass);

            const iconHtml = tool.icon.startsWith('<svg')
                ? tool.icon
                : `<img src="${tool.icon}" alt="${tool.name} icon" class="tool-icon" loading="lazy">`;

            let proficiencyDots = '<div class="proficiency-dots">';
            for (let i = 0; i < 3; i++) {
                proficiencyDots += `<div class="dot ${i < tool.proficiency ? 'filled' : ''}" style="--glow-color: ${getGlowColor(tool.category_short)}"></div>`;
            }
            proficiencyDots += '</div>';

            const toolTitle = tool.name;
            const categoryTagColor = getGlowColor(tool.category_short);
            const categoryTagBg = categoryTagColor.replace(')', ', 0.1)').replace('rgb', 'rgba');

            card.innerHTML = `
                <div class="tool-icon-wrapper">
                    ${iconHtml}
                    <div class="tool-tooltip">
                        <div class="flex justify-between items-center mb-2">
                            <h6 class="font-bold text-white capitalize">${toolTitle}</h6>
                            <span class="project-category-tag !m-0 !py-0.5 !px-2 !text-xs" style="color:${categoryTagColor}; background-color:${categoryTagBg};">${tool.category_full}</span>
                        </div>
                        <p class="text-sm text-left">${tool.description}</p>
                    </div>
                </div>
                <h4 class="font-bold">${tool.name}</h4>
                ${proficiencyDots}
            `;
            toolsGrid.appendChild(card);
            // The general observer will pick this up
        });
        addInteractiveEffects();
    }

    function updateToolGrid() {
        const activeCategory = filterContainer.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        const activeProficiency = proficiencyLegend.querySelector('.proficiency-filter.active')?.dataset.proficiency || null;

        document.querySelectorAll('#tools-grid .tool-card').forEach(card => {
            const categoryMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
            const proficiencyMatch = !activeProficiency || card.dataset.proficiency === activeProficiency;
            card.style.display = (categoryMatch && proficiencyMatch) ? 'flex' : 'none';
        });
    }

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.filter-btn');
            if (button) {
                filterContainer.querySelector('.filter-btn.active').classList.remove('active');
                button.classList.add('active');
                updateToolGrid();
            }
        });
    }

    if (proficiencyLegend) {
        proficiencyLegend.addEventListener('click', (e) => {
            const filter = e.target.closest('.proficiency-filter');
            if (filter) {
                if (filter.classList.contains('active')) {
                    filter.classList.remove('active');
                } else {
                    proficiencyLegend.querySelectorAll('.proficiency-filter.active').forEach(el => el.classList.remove('active'));
                    filter.classList.add('active');
                }
                updateToolGrid();
            }
        });
    }

    function getGlowColor(category_short) {
        switch (category_short) {
            case 'ai': return 'var(--purple-500)';
            case 'devops': return 'var(--green-400)';
            case 'cloud': return 'var(--orange-400)';
            case 'app_data': return 'var(--yellow-400)';
            case 'strategy': return 'var(--cyan-400)';
            default: return 'var(--sky-500)';
        }
    }

     function getBorderColorClass(category_short) {
        switch (category_short) {
            case 'ai': return 'interactive-border-purple';
            case 'devops': return 'interactive-border-green';
            case 'cloud': return 'interactive-border-orange';
            case 'app_data': return 'interactive-border-yellow';
            case 'strategy': return 'interactive-border-cyan';
            default: return 'interactive-border-sky';
        }
    }

    function addInteractiveEffects() {
         document.querySelectorAll('#tools-grid .tool-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                if (window.matchMedia('(pointer: coarse)').matches) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                const { width, height } = rect;
                const rotateX = (y / height - 0.5) * -15;
                const rotateY = (x / width - 0.5) * 15;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                const iconWrapper = card.querySelector('.tool-icon-wrapper');
                if (iconWrapper) {
                     iconWrapper.style.transform = `translate(-50%, -50%) translateZ(40px) rotateX(${rotateX*0.5}deg) rotateY(${rotateY*0.5}deg)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                const iconWrapper = card.querySelector('.tool-icon-wrapper');
                if (iconWrapper) {
                    iconWrapper.style.transform = 'translate(-50%, -50%) translateZ(0px)';
                }
            });

            card.addEventListener('click', () => {
                if (activeCard === card) {
                    document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('dimmed', 'highlighted'));
                    activeCard = null;
                    return;
                }
                activeCard = card;
                const related = card.dataset.related.split(',');
                document.querySelectorAll('.tool-card').forEach(c => {
                    const cardName = c.dataset.name;
                    if (cardName === card.dataset.name || related.includes(cardName)) {
                        c.classList.remove('dimmed');
                        c.classList.add('highlighted');
                    } else {
                        c.classList.remove('highlighted');
                        c.classList.add('dimmed');
                    }
                });
            });
        });
    }

    populateTools();
}

function initAboutUs() {
    const philosophySection = document.getElementById('about-us');
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

    const cards = document.querySelectorAll('.profile-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(pointer: coarse)').matches) return;
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

function initProcess() {
    const timelineContainer = document.getElementById('timeline-container');
    const timelineProgress = document.getElementById('timeline-progress');

    if (!timelineContainer) return;

    if(timelineProgress) {
         timelineProgress.style.background = 'linear-gradient(to bottom, var(--orange-500), var(--pink-500))';
    }

    stepsData.forEach((step, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.style.setProperty('--color', step.color);
        item.style.transitionDelay = `${index * 50}ms`;

        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-card-header p-4 rounded-lg flex items-center gap-4 cursor-pointer bg-gray-900/50 border border-gray-800 transition-all duration-300">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: ${step.color}20; color: ${step.color};">
                    ${step.icon}
                </div>
                <h4 class="text-xl font-semibold">${step.id}. ${step.title}</h4>
            </div>
            <div class="timeline-card-details pl-4 pr-2 py-2">
                 <p class="text-gray-400">${step.details}</p>
            </div>
        `;
        timelineContainer.appendChild(item);
    });

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const itemRect = entry.target.getBoundingClientRect();
                const containerRect = timelineContainer.getBoundingClientRect();
                const newHeight = itemRect.top - containerRect.top + itemRect.height / 2;
                if (timelineProgress.offsetHeight < newHeight) {
                    timelineProgress.style.height = `${newHeight}px`;
                }
            }
        });
    }, { rootMargin: "0px 0px -150px 0px", threshold: 0.5 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });

    timelineContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.timeline-card-header');
        if (!header) return;

        const currentItem = header.parentElement;

        timelineContainer.querySelectorAll('.timeline-item').forEach(item => {
            if (item !== currentItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });

        currentItem.classList.toggle('active');
    });

    const processSection = document.getElementById('process');
    if (processSection) {
        const processBg = document.getElementById('process-bg');
        processSection.addEventListener('mousemove', e => {
            const rect = processSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if(processBg) processBg.style.backgroundPosition = `-${x/20}px -${y/20}px`;
        });
    }
}

function initProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if(!projectsContainer) return;

    allProjectsData.forEach((project, index) => {
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
                            <div class="mt-4">
                                <p class="text-sm font-semibold mb-2 text-gray-300">Tecnologias Utilizadas:</p>
                                <div class="flex flex-wrap gap-2">${toolIcons}</div>
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
    });

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

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');
        cardFront.setAttribute('aria-hidden', 'false');
        cardBack.setAttribute('aria-hidden', 'true');

        card.addEventListener('click', (e) => {
            if (e.target.closest('.tool-icon-container') || e.target.closest('.breakdown-bar-container') || e.target.closest('.key-metric')) return;
            const isFlipped = card.classList.toggle('is-flipped');
            cardFront.setAttribute('aria-hidden', isFlipped ? 'true' : 'false');
            cardBack.setAttribute('aria-hidden', isFlipped ? 'false' : 'true');
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

function initArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    if (!articlesGrid) return;

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

    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
        const articlesBg = document.getElementById('articles-bg');
        articlesSection.addEventListener('mousemove', e => {
            const rect = articlesSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const bgX = -x / 20;
            const bgY = -y / 20;
            if(articlesBg) articlesBg.style.setProperty('--bg-x', `${bgX}px`);
            if(articlesBg) articlesBg.style.setProperty('--bg-y', `${bgY}px`);

            articlesSection.style.setProperty('--mouse-x', `${x}px`);
            articlesSection.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    const cards = document.querySelectorAll('.insight-card-container');
    cards.forEach(cardContainer => {
        const card = cardContainer.querySelector('.insight-card');
        cardContainer.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(pointer: coarse)').matches) return;
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

    const overlay = document.getElementById('article-viewer-overlay');
    const viewerCard = document.getElementById('article-viewer-card');
    const closeBtn = document.getElementById('close-article-modal');
    let originalCard = null;

    function openArticle(articleId) {
        originalCard = document.querySelector(`.insight-card-container[data-article-id='${articleId}']`);
        if (!originalCard) return;

        const article = articlesData.find(a => a.id === parseInt(articleId));
        if (!article) return;

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

    articlesGrid.addEventListener('click', (e) => {
        const cardContainer = e.target.closest('.insight-card-container');
        if (cardContainer) {
            const articleId = cardContainer.dataset.articleId;
            openArticle(articleId);
        }
    });

    if(closeBtn) closeBtn.addEventListener('click', closeArticle);
    if(overlay) overlay.addEventListener('click', closeArticle);

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

function initTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (!testimonialsContainer) return;

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

    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        const testimonialsBg = document.getElementById('testimonials-bg');
        testimonialsSection.addEventListener('mousemove', e => {
            const rect = testimonialsSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const bgX = -x / 20;
            const bgY = -y / 20;
            if(testimonialsBg) testimonialsBg.style.setProperty('--bg-x', `${bgX}px`);
            if(testimonialsBg) testimonialsBg.style.setProperty('--bg-y', `${bgY}px`);
        });
    }

    document.querySelectorAll('.testimonial-card-container').forEach(cardContainer => {
        const cardFront = cardContainer.querySelector('.card-front');
        const cardBack = cardContainer.querySelector('.card-back');
        cardFront.setAttribute('aria-hidden', 'false');
        cardBack.setAttribute('aria-hidden', 'true');

        cardContainer.addEventListener('mousemove', (e) => {
            const rect = cardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cardContainer.style.setProperty('--mouse-x', `${x}px`);
            cardContainer.style.setProperty('--mouse-y', `${y}px`);
        });

        cardContainer.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                return;
            }
            if (e.target.closest('.flip-button') || !e.target.closest('a')) {
                 const isFlipped = cardContainer.classList.toggle('is-flipped');
                 cardFront.setAttribute('aria-hidden', isFlipped ? 'true' : 'false');
                 cardBack.setAttribute('aria-hidden', isFlipped ? 'false' : 'true');
            }
        });
    });

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

function initBackgroundTransitions() {
    const sections = document.querySelectorAll('main > section');
    const body = document.body;

    if(!sections.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const backgroundObserver = new IntersectionObserver((entries) => {
        let isAnySectionIntersecting = false;
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            if (entry.isIntersecting) {
                isAnySectionIntersecting = true;
                // Remove other section classes and add the current one
                body.className = body.className.replace(/\bbody-\S+/g, '');
                body.classList.add(`body-${sectionId}`);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        backgroundObserver.observe(section);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // General fade-in observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // Initialize all sections
    initHome();
    initMethodology();
    initToolbox();
    initAboutUs();
    initProcess();
    initProjects();
    initArticles();
    initTestimonials();
    initBackgroundTransitions();
});

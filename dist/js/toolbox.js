function initToolbox() {
    const toolboxSection = document.getElementById('toolbox');
    if (toolboxSection) {
        const bg = toolboxSection.querySelector('.dot-grid-background');
        toolboxSection.addEventListener('mousemove', e => {
            const rect = toolboxSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (bg) {
                bg.style.setProperty('background-position', `-${x/20}px -${y/20}px`);
            }

            toolboxSection.style.setProperty('--mouse-x', `${x}px`);
            toolboxSection.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    const filterContainer = document.getElementById('filter-container');
    const toolsGrid = document.getElementById('tools-grid');
    const proficiencyLegend = document.getElementById('proficiency-legend');
    let activeCard = null;

    function populateTools() {
        toolsGrid.innerHTML = '';
        tools.forEach(tool => {
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
                : `<img src="${tool.icon}" alt="${tool.name} icon" class="tool-icon">`;

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
            observer.observe(card);
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
         document.querySelectorAll('#toolbox .tool-card').forEach(card => {
            card.addEventListener('mousemove', e => {
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
                    document.querySelectorAll('#toolbox .tool-card').forEach(c => c.classList.remove('dimmed', 'highlighted'));
                    activeCard = null;
                    return;
                }
                activeCard = card;
                const related = card.dataset.related.split(',');
                document.querySelectorAll('#toolbox .tool-card').forEach(c => {
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

    if (toolsGrid) {
        populateTools();
    }
}

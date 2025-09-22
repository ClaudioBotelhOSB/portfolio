function initProcess() {
    const timelineContainer = document.getElementById('timeline-container');
    const timelineProgress = document.getElementById('timeline-progress');

    if (!timelineContainer) return;

    // --- OPÇÕES DE GRADIENTE ---
    // Para mudar o tema, copie uma das linhas de 'background' abaixo
    // e cole dentro do style de 'timeline-progress' no HTML
    // Ex: style="...; background: linear-gradient(to bottom, var(--green-500), var(--teal-500));"

    // Gradiente Padrão (Pôr do Sol): linear-gradient(to bottom, var(--orange-500), var(--pink-500))
    // Gradiente Original (Céu): linear-gradient(to bottom, var(--sky-500), var(--purple-500))
    // Gradiente Floresta: linear-gradient(to bottom, var(--green-500), var(--teal-500))
    // Gradiente Fogo: linear-gradient(to bottom, var(--red-500), var(--yellow-500))

    // Aplicando o gradiente padrão via JS
    if(timelineProgress) {
         timelineProgress.style.background = 'linear-gradient(to bottom, var(--orange-500), var(--pink-500))';
    }


    // 1. CRIAR OS ITENS DA LINHA DO TEMPO
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

    // 2. ANIMAR COM SCROLL USANDO INTERSECTION OBSERVER
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Atualiza a altura da linha de progresso
                const itemRect = entry.target.getBoundingClientRect();
                const containerRect = timelineContainer.getBoundingClientRect();
                const newHeight = itemRect.top - containerRect.top + itemRect.height / 2;
                if (timelineProgress.offsetHeight < newHeight) {
                    timelineProgress.style.height = `${newHeight}px`;
                }
            }
        });
    }, { rootMargin: "0px 0px -150px 0px", threshold: 0.5 });

    document.querySelectorAll('#process .timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });

    // 3. ADICIONAR LÓGICA DE CLIQUE PARA EXPANDIR
    timelineContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.timeline-card-header');
        if (!header) return;

        const currentItem = header.parentElement;

        // Fecha todos os outros itens antes de abrir o novo
        timelineContainer.querySelectorAll('.timeline-item').forEach(item => {
            if (item !== currentItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });

        // Alterna o estado do item clicado
        currentItem.classList.toggle('active');
    });

    // Fundo interativo (opcional)
    const processSection = document.getElementById('process');
    if (processSection) {
        const processBg = processSection.querySelector('.dot-grid-background');
        if (processBg) {
            processSection.addEventListener('mousemove', e => {
                const rect = processSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                processBg.style.backgroundPosition = `-${x/20}px -${y/20}px`;
            });
        }
    }
}

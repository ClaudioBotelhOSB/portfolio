const tools = [
    // AI
    { name: 'Datadog', category: 'ai', description: 'Observabilidade & AIOps' },
    { name: 'Dynatrace', category: 'ai', description: 'Performance & AIOps' },
    { name: 'Splunk', category: 'ai', description: 'SIEM & Análise com IA' },
    { name: 'Darktrace', category: 'ai', description: 'Cybersecurity com IA' },
    { name: 'Kubeflow', category: 'ai', description: 'Plataforma de MLOps' },
    { name: 'MLflow', category: 'ai', description: 'Ciclo de Vida de ML' },
    { name: 'Vertex AI', category: 'ai', description: 'Plataforma de ML do GCP' },
    { name: 'LangChain', category: 'ai', description: 'Framework para LLMs' },

    // DevSecOps
    { name: 'GitHub Actions', category: 'devops', description: 'CI/CD' },
    { name: 'Argo CD', category: 'devops', description: 'GitOps' },
    { name: 'Snyk', category: 'devops', description: 'Segurança de Código (SCA)' },
    { name: 'Trivy', category: 'devops', description: 'Scanner de Vulnerabilidades' },
    { name: 'Falco', category: 'devops', description: 'Segurança em Runtime' },
    { name: 'HashiCorp Vault', category: 'devops', description: 'Gestão de Segredos' },

    // Cloud
    { name: 'AWS', category: 'cloud', description: 'Provedor de Nuvem' },
    { name: 'GCP', category: 'cloud', description: 'Provedor de Nuvem' },
    { name: 'Azure', category: 'cloud', description: 'Provedor de Nuvem' },
    { name: 'Terraform', category: 'cloud', description: 'Infraestrutura como Código' },
    { name: 'Kubernetes', category: 'cloud', description: 'Orquestração de Contêineres' },
    { name: 'Docker', category: 'cloud', description: 'Gerenciamento de Contêineres' },
    { name: 'Prometheus', category: 'cloud', description: 'Monitoramento & Métricas' },
    { name: 'Grafana', category: 'cloud', description: 'Visualização de Dados' },

    // Aplicação & Dados
    { name: 'Python', category: 'app_data', description: 'Linguagem Backend/Dados' },
    { name: 'Go', category: 'app_data', description: 'Linguagem Backend' },
    { name: 'JavaScript', category: 'app_data', description: 'Linguagem Frontend' },
    { name: 'Cypress', category: 'app_data', description: 'Testes E2E' },
    { name: 'Selenium', category: 'app_data', description: 'Automação de Testes' },
    { name: 'k6', category: 'app_data', description: 'Testes de Carga' },
    { name: 'BigQuery', category: 'app_data', description: 'Data Warehouse' },
    { name: 'Pandas', category: 'app_data', description: 'Análise de Dados (Python)' },
];

export function initToolbox() {
    populateTools();
    initToolboxFilters();
}

function populateTools() {
    const toolsGrid = document.getElementById('tools-grid');
    if (!toolsGrid) return;

    toolsGrid.innerHTML = ''; // Clear existing

    tools.forEach((tool) => {
        const card = document.createElement('div');
        card.className = `tool-card tool-card-${tool.category} glass-effect p-4 rounded-xl flex flex-col items-center justify-center text-center fade-in-up`;
        card.setAttribute('data-category', tool.category);
        card.innerHTML = `<h4 class="font-bold text-lg text-white">${tool.name}</h4><p class="text-sm text-gray-400">${tool.description}</p>`;
        toolsGrid.appendChild(card);
    });
}

function initToolboxFilters() {
    const filterContainer = document.getElementById('filter-container');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
        const target = e.target.closest('button.filter-btn');
        if (target) {
            document.querySelector('.filter-btn.active')?.classList.remove('active');
            target.classList.add('active');
            const filter = target.getAttribute('data-filter');

            const cards = document.querySelectorAll('#tools-grid .tool-card');
            cards.forEach(card => {
                // Animate filtering
                card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                card.style.transform = 'scale(0.95)';
                card.style.opacity = '0';

                setTimeout(() => {
                    const shouldShow = (filter === 'all' || card.dataset.category === filter);
                    card.style.display = shouldShow ? 'flex' : 'none';
                    if(shouldShow) {
                       card.style.transform = 'scale(1)';
                       card.style.opacity = '1';
                    }
                }, 300);
            });
        }
    });
}

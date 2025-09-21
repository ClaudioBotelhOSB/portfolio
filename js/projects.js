const allProjects = [
    { id: 0, title: 'Sistema Preditivo de Falhas com AIOps', description: 'Sistema que usa ML para analisar métricas, prever anomalias e iniciar auto-remediação.', long_description: '<p><b>Desafio:</b> Reduzir o tempo de resolução (MTTR) de incidentes. <br><b>Solução:</b> Desenvolvi um serviço em Python que consome métricas do Prometheus. Utilizando a biblioteca Prophet, o sistema identifica anomalias. Ao detectar um padrão de falha conhecido (ex: memory leak), ele aciona um runbook do Ansible que reinicia o pod problemático. <br><b>Resultado:</b> Resolução de 80% dos incidentes comuns sem intervenção humana e redução do MTTR em 60%.</p>', tags: [{text: 'AIOps', color: 'purple'}, {text: 'Python', color: 'yellow'}] },
    { id: 1, title: 'Automação de Pipeline DevSecOps', description: 'Pipeline CI/CD seguro e agnóstico de nuvem (AWS/GCP) com GitHub Actions, Terraform e verificação de segurança (SCA, SAST).', long_description: '<p><b>Desafio:</b> Padronizar o processo de CI/CD para mais de 10 equipes. <br><b>Solução:</b> Criei um pipeline reutilizável com GitHub Actions e autenticação OIDC. Em cada pull request, o pipeline executa SAST (SonarQube), SCA (Snyk), e escaneia a imagem Docker (Trivy). <br><b>Resultado:</b> Apenas código verificado é enviado para o deploy via ArgoCD, aumentando a segurança.</p>', tags: [{text: 'GitHub Actions', color: 'sky'}] },
    { id: 2, title: 'Migração para Microsserviços K8s', description: 'Orquestração da migração de uma aplicação legada para microsserviços em Kubernetes, utilizando Kafka e Traefik.', long_description: '<p><b>Desafio:</b> Modernizar um monolito em Java, melhorando a escalabilidade e velocidade de deploy. <br><b>Solução:</b> Liderei a migração para microsserviços em Go no GKE. A fase inicial envolveu uma análise de dados de performance (usando BigQuery) para definir benchmarks. A comunicação assíncrona foi garantida com Kafka. Uma suíte de testes de regressão automatizados (Cypress) foi criada para validar a paridade de funcionalidades. <br><b>Resultado:</b> Aumento de 40% na velocidade de deploy e redução de 90% no tempo de inatividade, com zero regressões críticas.</p>', tags: [{text: 'Kubernetes', color: 'orange'}, {text: 'QA', color: 'green'}] },
    { id: 3, title: 'Plataforma de Self-Service com Backstage', description: 'Desenvolvimento de um portal interno para desenvolvedores provisionarem infraestrutura, templates e documentação.', long_description: '<p><b>Desafio:</b> Reduzir a dependência da equipe de infra e acelerar o onboarding. <br><b>Solução:</b> Implementamos o Backstage.io. Criei templates de software que geram um novo microsserviço com pipeline CI/CD e documentação com um clique. <br><b>Resultado:</b> Melhoria drástica na autonomia e produtividade dos times de desenvolvimento.</p>', tags: [{text: 'Backstage', color: 'blue'}, {text: 'TypeScript', color: 'blue'}] },
    { id: 4, title: 'Implementação de Zero Trust com Cilium', description: 'Segurança de rede granular em Kubernetes usando políticas de rede baseadas em identidade via eBPF.', long_description: '<p><b>Desafio:</b> Atender a requisitos de conformidade PCI-DSS. <br><b>Solução:</b> Substituímos o CNI padrão por Cilium. Usando eBPF, criamos políticas de rede de "negação por padrão", permitindo a comunicação apenas entre serviços autorizados com base em suas identidades, não em IPs. <br><b>Resultado:</b> Arquitetura Zero Trust implementada, tornando a segurança mais dinâmica e robusta.</p>', tags: [{text: 'Cilium', color: 'pink'}, {text: 'eBPF', color: 'pink'}] },
    { id: 5, title: 'Otimização de Custos Multi-Cloud (FinOps)', description: 'Redução de 35% nos custos de nuvem através da implementação de OpenCost e automação de instâncias spot.', long_description: '<p><b>Desafio:</b> Reduzir a fatura de nuvem sem impactar a performance. <br><b>Solução:</b> Adotei práticas de FinOps. Instalei o OpenCost em clusters Kubernetes para dar visibilidade de custos por time. Criei automações com Terraform para usar instâncias spot/preemptible em workloads não críticos. <br><b>Resultado:</b> Economia de 35% na fatura mensal.</p>', tags: [{text: 'FinOps', color: 'green'}, {text: 'Terraform', color: 'purple'}] },
    { id: 6, title: 'Pipeline de MLOps para Modelo de Fraude', description: 'Criação de um pipeline automatizado com Kubeflow para treinar e implantar um modelo de detecção de fraudes.', long_description: '<p><b>Desafio:</b> Acelerar o ciclo de vida de modelos de machine learning. <br><b>Solução:</b> Em colaboração com Data Science, construí um pipeline de MLOps no Kubeflow que automatiza a ingestão de dados, treinamento, versionamento com MLflow e deploy da API de inferência no Kubernetes. <br><b>Resultado:</b> Ciclo de "ideia ao deploy" de modelos reduzido de semanas para dias.</p>', tags: [{text: 'MLOps', color: 'purple'}, {text: 'Kubeflow', color: 'purple'}] },
    { id: 7, title: 'Disaster Recovery Automatizado em Azure', description: 'Plano de DR com failover automático entre regiões para uma aplicação crítica, usando Azure Site Recovery e Terraform.', long_description: '<p><b>Desafio:</b> Garantir a continuidade do negócio para uma aplicação financeira. <br><b>Solução:</b> Utilizando Terraform, provisionei a infraestrutura de replicação com Azure Site Recovery. Criei runbooks de automação que executam o failover para a região secundária em caso de falha. <br><b>Resultado:</b> RTO (Recovery Time Objective) de menos de 15 minutos alcançado.</p>', tags: [{text: 'Azure', color: 'blue'}, {text: 'SRE', color: 'orange'}] },
    { id: 8, title: 'Hardening de Imagens de Contêiner', description: 'Criação de um pipeline que usa Trivy e Snyk para escanear e corrigir vulnerabilidades em imagens Docker.', long_description: '<p><b>Desafio:</b> Reduzir a superfície de ataque em produção. <br><b>Solução:</b> Implementei "shift-left security" para contêineres. O pipeline de CI agora utiliza Trivy para escanear o SO base e Snyk para dependências. Imagens com vulnerabilidades críticas são bloqueadas. <br><b>Resultado:</b> Redução de 95% no número de vulnerabilidades em produção.</p>', tags: [{text: 'Trivy', color: 'pink'}, {text: 'Docker', color: 'blue'}] },
    { id: 9, title: 'Central de Segredos com HashiCorp Vault', description: 'Implementação de um cofre central para gerenciar segredos de aplicações, DBs e APIs de forma segura e auditável.', long_description: '<p><b>Desafio:</b> Eliminar segredos hardcoded e em variáveis de ambiente. <br><b>Solução:</b> Configurei um cluster de Vault. As aplicações agora se autenticam no Vault usando o provedor do Kubernetes para obter tokens e acessar seus segredos dinamicamente. <br><b>Resultado:</b> Melhoria drástica na postura de segurança e auditabilidade.</p>', tags: [{text: 'Vault', color: 'pink'}, {text: 'Security', color: 'pink'}] },
    { id: 10, title: 'Plataforma de Observabilidade Open-Source', description: 'Construção de uma stack completa (Prometheus, Grafana, Loki, Tempo) para substituir uma solução SaaS.', long_description: '<p><b>Desafio:</b> Reduzir os altos custos com uma ferramenta de observabilidade paga. <br><b>Solução:</b> Migramos para uma stack open-source. Configurei Prometheus para métricas, Loki para logs e Tempo para tracing, todos integrados em dashboards no Grafana. <br><b>Resultado:</b> Economia de 70% nos custos de monitoramento, com maior flexibilidade.</p>', tags: [{text: 'Grafana', color: 'yellow'}, {text: 'Prometheus', color: 'yellow'}] },
    { id: 11, title: 'Engenharia de Caos em Ambiente de Stage', description: 'Execução de experimentos de caos com Chaos Mesh para identificar proativamente pontos de falha na arquitetura.', long_description: '<p><b>Desafio:</b> Aumentar a resiliência da aplicação. <br><b>Solução:</b> Introduzi a prática de Engenharia de Caos. Usando o Chaos Mesh, injetamos falhas controladas (latência, falha de pods) no ambiente de staging. <br><b>Resultado:</b> Descoberta e correção de pontos fracos, como a falta de retries e timeouts adequados, antes que afetassem a produção.</p>', tags: [{text: 'Chaos Engineering', color: 'orange'}, {text: 'SRE', color: 'orange'}] },
    { id: 12, title: 'API Gateway Seguro com Kong', description: 'Configuração de um API Gateway para gerenciar autenticação (OAuth2), rate limiting e roteamento para dezenas de microsserviços.', long_description: '<p><b>Desafio:</b> Centralizar e proteger o acesso a dezenas de APIs. <br><b>Solução:</b> Implementei o Kong como API Gateway. Configurei plugins para autenticação OIDC com Keycloak, rate limiting e roteamento. <br><b>Resultado:</b> Simplificação da segurança e gerenciamento das APIs.</p>', tags: [{text: 'Kong', color: 'green'}, {text: 'Microservices', color: 'blue'}] },
    { id: 13, title: 'Automação de Conformidade com Checkov', description: 'Integração do Checkov no pipeline de IaC para garantir que a infraestrutura esteja em conformidade com o CIS Benchmark.', long_description: '<p><b>Desafio:</b> Garantir conformidade contínua com padrões de segurança. <br><b>Solução:</b> Integrei o Checkov ao pipeline de Terraform. Em cada pull request, o Checkov analisa o código IaC. Pull requests com violações são bloqueados. <br><b>Resultado:</b> Prevenção de riscos de segurança antes do provisionamento.</p>', tags: [{text: 'Checkov', color: 'pink'}, {text: 'Compliance', color: 'green'}] },
    { id: 14, title: 'Data Streaming com Kafka em K8s', description: 'Implantação de um cluster Kafka altamente disponível no Kubernetes usando o operador Strimzi.', long_description: '<p><b>Desafio:</b> Criar uma plataforma para processar milhões de eventos por dia em tempo real. <br><b>Solução:</b> Provisionei um cluster Kafka no Kubernetes utilizando o operador Strimzi para simplificar o gerenciamento. <br><b>Resultado:</b> O cluster serve como a espinha dorsal para análise de dados em tempo real e comunicação assíncrona, com alta escalabilidade e resiliência.</p>', tags: [{text: 'Kafka', color: 'gray'}, {text: 'Data Engineering', color: 'blue'}] },
];

const projectsPerPage = 6;
let currentPage = 1;

export function initProjects() {
    renderProjects();
    initPaginationControls();
    initProjectModal();
}

function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    const totalPages = Math.ceil(allProjects.length / projectsPerPage);
    const pageIndicator = document.getElementById('page-indicator');
    if(pageIndicator) pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;

    const start = (currentPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    const projectsToRender = allProjects.slice(start, end);

    projectsContainer.innerHTML = '';

    projectsToRender.forEach((project, index) => {
        const tagsHtml = project.tags.map(tag => {
            const colors = {
                purple: 'bg-purple-900/50 text-purple-300', sky: 'bg-sky-900/50 text-sky-300', orange: 'bg-orange-900/50 text-orange-300', blue: 'bg-blue-900/50 text-blue-300', pink: 'bg-pink-900/50 text-pink-300', green: 'bg-green-900/50 text-green-300', yellow: 'bg-yellow-900/50 text-yellow-300', gray: 'bg-gray-700 text-gray-300'
            };
            return `<span class="${colors[tag.color] || colors.gray} text-xs font-medium px-2.5 py-0.5 rounded-full">${tag.text}</span>`;
        }).join('');

        const card = document.createElement('div');
        const primaryTagColor = project.tags[0].color;
        const borderColorClass = `interactive-border-${primaryTagColor}`.replace('blue', 'sky'); // Fallback blue to sky

        card.className = `project-card glass-effect interactive-border ${borderColorClass} rounded-xl overflow-hidden fade-in-up`;
        card.style.transitionDelay = `${index * 100}ms`;
        card.innerHTML = `
            <div class="p-6 flex flex-col h-full">
                <h4 class="text-xl font-bold mb-2 text-sky-400">${project.title}</h4>
                <p class="text-gray-400 mb-4 text-sm flex-grow">${project.description}</p>
                <div class="flex flex-wrap gap-2 my-4">${tagsHtml}</div>
                <a href="#" class="font-semibold text-white hover:text-sky-400 mt-auto project-details-link" data-project-id="${project.id}">Ver Detalhes →</a>
            </div>
        `;
        projectsContainer.appendChild(card);
        // observer.observe(card);
    });

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    const totalPages = Math.ceil(allProjects.length / projectsPerPage);
    if(prevBtn) prevBtn.disabled = currentPage === 1;
    if(nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function initPaginationControls() {
    document.getElementById('prev-page-btn')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProjects();
        }
    });
    document.getElementById('next-page-btn')?.addEventListener('click', () => {
        const totalPages = Math.ceil(allProjects.length / projectsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProjects();
        }
    });
}

function initProjectModal() {
    const projectModal = document.getElementById('project-modal');
    if (!projectModal) return;

    const closeBtn = document.getElementById('close-project-modal');
    const modalTitle = document.getElementById('project-modal-title');
    const modalTags = document.getElementById('project-modal-tags');
    const modalDescription = document.getElementById('project-modal-description');

    const openModal = (projectId) => {
        const project = allProjects.find(p => p.id === projectId);
        if (!project) return;
        modalTitle.textContent = project.title;
        modalDescription.innerHTML = project.long_description;
        modalTags.innerHTML = project.tags.map(tag => {
             const colors = {
                purple: 'bg-purple-900/50 text-purple-300', sky: 'bg-sky-900/50 text-sky-300', orange: 'bg-orange-900/50 text-orange-300', blue: 'bg-blue-900/50 text-blue-300', pink: 'bg-pink-900/50 text-pink-300', green: 'bg-green-900/50 text-green-300', yellow: 'bg-yellow-900/50 text-yellow-300', gray: 'bg-gray-700 text-gray-300'
            };
            return `<span class="${colors[tag.color] || colors.gray} text-xs font-medium px-2.5 py-0.5 rounded-full">${tag.text}</span>`;
        }).join('');
        projectModal.classList.add('visible');
    };

    const closeModal = () => {
        projectModal.classList.remove('visible');
    };

    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('.project-details-link');
        if (link) {
            e.preventDefault();
            const projectId = parseInt(link.getAttribute('data-project-id'), 10);
            openModal(projectId);
        }
    });

    closeBtn?.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });
}
